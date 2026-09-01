/**
 * Canonical Career Catalogue validation — two distinct modes.
 *
 *   development: structural / schema checks only. Never requires 780 careers
 *                to be present. Used in tests and during authoring.
 *
 *   production : enforces the hard canonical invariants:
 *                - exactly 780 careers
 *                - exactly 15 worlds
 *                - world allocations sum to 780 (Σ = 780)
 *                - every career belongs to a valid world
 *                Used before activating a catalogue edition.
 *
 * Both modes share the structural checks; production adds the count/sum
 * invariants. A check list carries `name`, `passed`, `detail` for auditability
 * and is written to catalogue_status for the production path.
 */
import type { ValidationCheck, ValidationMode, ValidationReport } from "./canonical";
import { EXPECTED_WORLD_COUNT, CANONICAL_WORLDS } from "./worlds";

export const EXPECTED_CAREER_COUNT = 780;

const REQUIRED_CAREER_TABLES = [
  "career_worlds",
  "careers",
  "career_profiles",
  "career_relations",
  "career_progression",
  "catalogue_versions",
  "catalogue_status",
] as const;

const REQUIRED_CAREER_COLUMNS: Record<string, string[]> = {
  career_worlds:    ["id", "world_no", "canonical_name", "canonical_slug", "seo_slug", "legacy_slug", "tagline", "description", "display_order", "metadata_json", "created_at", "updated_at"],
  careers:          ["id", "canonical_slug", "canonical_name", "published_name", "world_id", "cluster", "career_status", "editorial_status", "evidence_status", "description", "source", "provenance", "catalogue_version", "metadata_json", "created_at", "updated_at"],
  career_profiles:  ["id", "career_id", "summary", "daily_work", "key_tasks_json", "skills_needed_json", "education_pathways_json", "learning_resources_json", "outlook", "attributes_json", "iwda_dimensions_json", "metadata_json", "created_at", "updated_at"],
  career_relations: ["id", "career_id", "related_career_id", "relation_type", "metadata_json", "created_at"],
  career_progression: ["id", "career_id", "next_career_id", "progression_type", "description", "metadata_json", "created_at"],
  catalogue_versions: ["id", "version", "status", "expected_career_count", "actual_career_count", "expected_world_count", "published_at", "created_at", "updated_at"],
  catalogue_status: ["id", "catalogue_version_id", "total_careers", "world_allocation_json", "validation_status", "validation_details_json", "checked_at"],
};

const REQUIRED_INDEXES = [
  "idx_career_worlds_order",
  "idx_careers_world",
  "idx_careers_status",
  "idx_career_profiles_career",
  "idx_career_relations_career",
  "idx_career_progression_career",
  "idx_catalogue_status_version",
] as const;

// ──────────────────────────────────────────────────────────────────────────────
// Structural helpers
// ──────────────────────────────────────────────────────────────────────────────

async function tableExists(db: D1Database, name: string): Promise<boolean> {
  const r = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=? LIMIT 1").bind(name).first<{ name: string }>();
  return Boolean(r?.name);
}

async function indexExists(db: D1Database, name: string): Promise<boolean> {
  const r = await db.prepare("SELECT name FROM sqlite_master WHERE type='index' AND name=? LIMIT 1").bind(name).first<{ name: string }>();
  return Boolean(r?.name);
}

async function getTableColumns(db: D1Database, table: string): Promise<Set<string>> {
  const rows = await db.prepare(`PRAGMA table_info(${table})`).all<{ name: string }>();
  return new Set((rows.results ?? []).map((r) => r.name));
}

// ──────────────────────────────────────────────────────────────────────────────
// Structural checks (shared by both modes)
// ──────────────────────────────────────────────────────────────────────────────

async function structuralChecks(db: D1Database): Promise<ValidationCheck[]> {
  const checks: ValidationCheck[] = [];

  for (const table of REQUIRED_CAREER_TABLES) {
    const exists = await tableExists(db, table);
    checks.push({ name: `schema.table.${table}`, passed: exists, detail: exists ? `Table ${table} exists.` : `Table ${table} is missing.` });
    if (!exists) continue;
    const requiredCols = REQUIRED_CAREER_COLUMNS[table] ?? [];
    const cols = await getTableColumns(db, table);
    const missing = requiredCols.filter((c) => !cols.has(c));
    const schemaOk = missing.length === 0;
    checks.push({ name: `schema.columns.${table}`, passed: schemaOk, detail: schemaOk ? "All columns present." : `Missing columns: ${missing.join(", ")}` });
  }

  for (const idx of REQUIRED_INDEXES) {
    const exists = await indexExists(db, idx);
    checks.push({ name: `schema.index.${idx}`, passed: exists, detail: exists ? `Index ${idx} exists.` : `Index ${idx} is missing.` });
  }

  const worldCountResult = await db.prepare("SELECT COUNT(*) AS count FROM career_worlds").first<{ count: number }>();
  const worldCount = Number(worldCountResult?.count ?? 0);
  checks.push({ name: "structure.world_count", passed: worldCount === EXPECTED_WORLD_COUNT, detail: `Expected ${EXPECTED_WORLD_COUNT} worlds; found ${worldCount}.` });

  for (const w of CANONICAL_WORLDS) {
    const row = await db.prepare("SELECT id, canonical_name, canonical_slug, seo_slug, legacy_slug FROM career_worlds WHERE id=? LIMIT 1").bind(w.id).first<{ id: string; canonical_name: string; canonical_slug: string; seo_slug: string | null; legacy_slug: string | null }>();
    const ok = Boolean(
      row &&
      row.canonical_name === w.canonical_name &&
      row.canonical_slug === w.canonical_slug &&
      (w.seo_slug ?? null) === (row.seo_slug ?? null) &&
      (w.legacy_slug ?? null) === (row.legacy_slug ?? null)
    );
    checks.push({ name: `structure.world.${w.world_no}`, passed: ok, detail: ok ? `World ${w.world_no} (${w.canonical_name}) correct.` : `World ${w.world_no} mismatch or missing.` });
  }

  const careerCountResult = await db.prepare("SELECT COUNT(*) AS count FROM careers").first<{ count: number }>();
  const careerCount = Number(careerCountResult?.count ?? 0);

  const dupIdResult = await db.prepare("SELECT id, COUNT(*) AS c FROM careers GROUP BY id HAVING c > 1 LIMIT 1").first<{ id: string; c: number }>();
  const noDupIds = !dupIdResult?.id;
  checks.push({ name: "duplicate.career_id", passed: noDupIds, detail: noDupIds ? "No duplicate career IDs." : `Duplicate career ID: ${dupIdResult!.id}.` });

  const dupSlugResult = await db.prepare("SELECT canonical_slug, COUNT(*) AS c FROM careers GROUP BY canonical_slug HAVING c > 1 LIMIT 1").first<{ canonical_slug: string; c: number }>();
  const noDupSlugs = !dupSlugResult?.canonical_slug;
  checks.push({ name: "duplicate.career_slug", passed: noDupSlugs, detail: noDupSlugs ? "No duplicate career slugs." : `Duplicate career slug: ${dupSlugResult!.canonical_slug}.` });

  const dupNameResult = await db.prepare("SELECT canonical_name, COUNT(*) AS c FROM careers GROUP BY canonical_name HAVING c > 1 LIMIT 1").first<{ canonical_name: string; c: number }>();
  const noDupNames = !dupNameResult?.canonical_name;
  checks.push({ name: "duplicate.career_name", passed: noDupNames, detail: noDupNames ? "No duplicate career names." : `Duplicate career name: ${dupNameResult!.canonical_name}.` });

  if (careerCount > 0) {
    const orphanResult = await db.prepare("SELECT COUNT(*) AS c FROM careers c LEFT JOIN career_worlds w ON c.world_id = w.id WHERE w.id IS NULL").first<{ c: number }>();
    const orphans = Number(orphanResult?.c ?? 0);
    checks.push({ name: "consistency.world_membership", passed: orphans === 0, detail: orphans === 0 ? "All careers belong to a valid world." : `${orphans} career(s) with invalid world_id.` });

    const worldAlloc = await db.prepare("SELECT w.world_no, w.canonical_name, COUNT(c.id) AS count FROM career_worlds w LEFT JOIN careers c ON c.world_id = w.id GROUP BY w.world_no ORDER BY w.world_no").all<{ world_no: number; canonical_name: string; count: number }>();
    const allocMap: Record<number, number> = {};
    for (const row of worldAlloc.results ?? []) allocMap[row.world_no] = Number(row.count);
    const sum = Object.values(allocMap).reduce((a, b) => a + b, 0);
    checks.push({ name: "consistency.world_sum", passed: sum === careerCount, detail: sum === careerCount ? `World totals sum to ${sum}.` : `World totals sum to ${sum}; career count is ${careerCount}.` });

    const unpubResult = await db.prepare("SELECT COUNT(*) AS c FROM careers WHERE world_id IS NULL AND editorial_status IN ('published','approved')").first<{ c: number }>();
    const unpubCount = Number(unpubResult?.c ?? 0);
    checks.push({ name: "consistency.published_world_required", passed: unpubCount === 0, detail: unpubCount === 0 ? "All published/approved careers have a world." : `${unpubCount} published/approved career(s) lack a world.` });

    const profileOrphanResult = await db.prepare("SELECT COUNT(*) AS c FROM careers cr LEFT JOIN career_profiles cp ON cp.career_id = cr.id WHERE cp.id IS NULL AND cr.editorial_status = 'published'").first<{ c: number }>();
    const profileOrphans = Number(profileOrphanResult?.c ?? 0);
    checks.push({ name: "consistency.profile_for_published", passed: profileOrphans === 0, detail: profileOrphans === 0 ? "All published careers have a profile." : `${profileOrphans} published career(s) missing profile.` });
  }

  return checks;
}

// ──────────────────────────────────────────────────────────────────────────────
// Mode-specific entry points
// ──────────────────────────────────────────────────────────────────────────────

/** Structural validation only; never requires 780 careers. */
export async function validateDevelopment(db: D1Database): Promise<ValidationReport> {
  const checks = await structuralChecks(db);
  return { passed: checks.every((c) => c.passed), mode: "development", checked_at: new Date().toISOString(), checks };
}

/** Canonical invariants: 780 careers, 15 worlds, Σ = 780, valid membership. */
export async function validateProduction(db: D1Database): Promise<ValidationReport> {
  const checks = await structuralChecks(db);

  const careerCountResult = await db.prepare("SELECT COUNT(*) AS count FROM careers").first<{ count: number }>();
  const careerCount = Number(careerCountResult?.count ?? 0);
  checks.push({ name: "invariant.career_count", passed: careerCount === EXPECTED_CAREER_COUNT, detail: `Canonical requires exactly ${EXPECTED_CAREER_COUNT} careers; found ${careerCount}.` });

  const worldCountResult = await db.prepare("SELECT COUNT(*) AS count FROM career_worlds").first<{ count: number }>();
  const worldCount = Number(worldCountResult?.count ?? 0);
  checks.push({ name: "invariant.world_count", passed: worldCount === EXPECTED_WORLD_COUNT, detail: `Canonical requires exactly ${EXPECTED_WORLD_COUNT} worlds; found ${worldCount}.` });

  const worldAlloc = await db.prepare("SELECT w.world_no, w.canonical_name, COUNT(c.id) AS count FROM career_worlds w LEFT JOIN careers c ON c.world_id = w.id GROUP BY w.world_no ORDER BY w.world_no").all<{ world_no: number; canonical_name: string; count: number }>();
  const allocSum = (worldAlloc.results ?? []).reduce((a, r) => a + Number(r.count), 0);
  checks.push({ name: "invariant.world_sum", passed: allocSum === EXPECTED_CAREER_COUNT, detail: `Canonical requires world allocations to sum to ${EXPECTED_CAREER_COUNT}; sum is ${allocSum}.` });

  return { passed: checks.every((c) => c.passed), mode: "production", checked_at: new Date().toISOString(), checks };
}

/** Convenience: run development mode by default; production only when asked. */
export async function validateCanonicalCatalogue(db: D1Database, mode: ValidationMode = "development"): Promise<ValidationReport> {
  return mode === "production" ? validateProduction(db) : validateDevelopment(db);
}
