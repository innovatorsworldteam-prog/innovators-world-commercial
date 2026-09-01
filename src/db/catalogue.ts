/**
 * Canonical Career Catalogue — D1 access layer.
 *
 * Follows the conventions of ./assessment.ts: anemic row types, small focused
 * query functions, JSON columns stored as strings and parsed on read.
 */
import type {
  Career,
  CareerProfile,
  CareerRelation,
  CareerProgression,
  CareerWorld,
  CatalogueVersion,
  ParsedProfile,
  ValidationOutcome,
  WorldAllocationItem,
} from "../career/canonical";
import { parseJsonArray, parseJsonSafe, parseIWDAffinityMap } from "../career/canonical";
import type { WorldDefinition } from "../career/worlds";
import { CANONICAL_WORLDS, getWorldById } from "../career/worlds";

const now = () => new Date().toISOString();

// ──────────────────────────────────────────────────────────────────────────────
// Worlds
// ──────────────────────────────────────────────────────────────────────────────

export async function listWorlds(db: D1Database): Promise<CareerWorld[]> {
  const result = await db.prepare("SELECT * FROM career_worlds ORDER BY display_order ASC").all<CareerWorld>();
  return result.results ?? [];
}

export async function getWorld(db: D1Database, id: string): Promise<CareerWorld | null> {
  return db.prepare("SELECT * FROM career_worlds WHERE id = ? LIMIT 1").bind(id).first<CareerWorld>();
}

/** Seeds identity rows for all 15 canonical worlds (idempotent). */
export async function seedWorlds(db: D1Database): Promise<void> {
  const statement = db.prepare(
    `INSERT OR IGNORE INTO career_worlds
      (id, world_no, canonical_name, canonical_slug, seo_slug, legacy_slug,
       tagline, description, display_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const rows = CANONICAL_WORLDS.map((w: WorldDefinition) =>
    statement.bind(
      w.id,
      w.world_no,
      w.canonical_name,
      w.canonical_slug,
      w.seo_slug ?? null,
      w.legacy_slug ?? null,
      w.tagline,
      w.description,
      w.world_no,
      now(),
      now()
    )
  );
  await db.batch(rows);
}

// ──────────────────────────────────────────────────────────────────────────────
// Careers
// ──────────────────────────────────────────────────────────────────────────────

export async function getCareer(db: D1Database, idOrSlug: string): Promise<Career | null> {
  return db.prepare("SELECT * FROM careers WHERE id = ? OR canonical_slug = ? LIMIT 1").bind(idOrSlug, idOrSlug).first<Career>();
}

export async function listCareersByWorld(db: D1Database, worldId: string): Promise<Career[]> {
  const result = await db.prepare("SELECT * FROM careers WHERE world_id = ? ORDER BY canonical_name ASC").bind(worldId).all<Career>();
  return result.results ?? [];
}

export async function countCareers(db: D1Database): Promise<number> {
  const r = await db.prepare("SELECT COUNT(*) AS count FROM careers").first<{ count: number }>();
  return Number(r?.count ?? 0);
}

export async function getWorldAllocation(db: D1Database): Promise<WorldAllocationItem[]> {
  const result = await db.prepare(
    `SELECT w.world_no, w.id, w.canonical_name, COUNT(c.id) AS career_count
     FROM career_worlds w
     LEFT JOIN careers c ON c.world_id = w.id
     GROUP BY w.id
     ORDER BY w.world_no ASC`
  ).all<WorldAllocationItem>();
  return result.results ?? [];
}

export async function insertCareer(
  db: D1Database,
  input: {
    id: string;
    canonical_slug: string;
    canonical_name: string;
    published_name: string;
    worldId: string;
    cluster?: string | null;
    careerStatus?: Career["career_status"];
    editorialStatus?: Career["editorial_status"];
    evidenceStatus?: Career["evidence_status"];
    description?: string | null;
    source?: string | null;
    provenance?: unknown;
    catalogueVersion?: string;
    metadata?: unknown;
  }
): Promise<Career> {
  const timestamp = now();
  await db.prepare(
    `INSERT INTO careers
      (id, canonical_slug, canonical_name, published_name, world_id, cluster,
       career_status, editorial_status, evidence_status, description, source,
       provenance, catalogue_version, metadata_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    input.id,
    input.canonical_slug,
    input.canonical_name,
    input.published_name,
    input.worldId,
    input.cluster ?? null,
    input.careerStatus ?? "current",
    input.editorialStatus ?? "draft",
    input.evidenceStatus ?? "source_verified",
    input.description ?? null,
    input.source ?? null,
    input.provenance === undefined ? null : JSON.stringify(input.provenance),
    input.catalogueVersion ?? "2.0",
    input.metadata === undefined ? null : JSON.stringify(input.metadata),
    timestamp,
    timestamp
  ).run();
  const career = await getCareer(db, input.id);
  if (!career) throw new Error("CANONICAL_CAREER_INSERT_FAILED");
  return career;
}

// ──────────────────────────────────────────────────────────────────────────────
// Profiles
// ──────────────────────────────────────────────────────────────────────────────

export async function getProfile(db: D1Database, careerId: string): Promise<CareerProfile | null> {
  return db.prepare("SELECT * FROM career_profiles WHERE career_id = ? LIMIT 1").bind(careerId).first<CareerProfile>();
}

export async function insertProfile(
  db: D1Database,
  input: {
    id: string;
    careerId: string;
    summary?: string | null;
    dailyWork?: string | null;
    keyTasks?: string[];
    skillsNeeded?: string[];
    educationPathways?: string[];
    learningResources?: string[];
    outlook?: string | null;
    attributes?: Record<string, unknown>;
    iwdaDimensions?: Record<string, number>;
    metadata?: unknown;
  }
): Promise<CareerProfile> {
  const timestamp = now();
  await db.prepare(
    `INSERT INTO career_profiles
      (id, career_id, summary, daily_work, key_tasks_json, skills_needed_json,
       education_pathways_json, learning_resources_json, outlook,
       attributes_json, iwda_dimensions_json, metadata_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    input.id,
    input.careerId,
    input.summary ?? null,
    input.dailyWork ?? null,
    JSON.stringify(input.keyTasks ?? []),
    JSON.stringify(input.skillsNeeded ?? []),
    JSON.stringify(input.educationPathways ?? []),
    JSON.stringify(input.learningResources ?? []),
    input.outlook ?? null,
    JSON.stringify(input.attributes ?? {}),
    JSON.stringify(input.iwdaDimensions ?? {}),
    input.metadata === undefined ? null : JSON.stringify(input.metadata),
    timestamp,
    timestamp
  ).run();
  const profile = await getProfile(db, input.careerId);
  if (!profile) throw new Error("CANONICAL_PROFILE_INSERT_FAILED");
  return profile;
}

/** Parse the JSON payloads of a profile row into a typed shape. */
export function parseProfile(profile: CareerProfile): ParsedProfile {
  return {
    key_tasks: parseJsonArray(profile.key_tasks_json) as string[],
    skills_needed: parseJsonArray(profile.skills_needed_json) as string[],
    education_pathways: parseJsonArray(profile.education_pathways_json) as string[],
    learning_resources: parseJsonArray(profile.learning_resources_json) as string[],
    attributes: parseJsonSafe(profile.attributes_json),
    iwda_dimensions: parseIWDAffinityMap(profile.iwda_dimensions_json),
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Relations & progression
// ──────────────────────────────────────────────────────────────────────────────

export async function listRelations(db: D1Database, careerId: string): Promise<CareerRelation[]> {
  const result = await db.prepare("SELECT * FROM career_relations WHERE career_id = ? ORDER BY relation_type ASC").bind(careerId).all<CareerRelation>();
  return result.results ?? [];
}

export async function listProgression(db: D1Database, careerId: string): Promise<CareerProgression[]> {
  const result = await db.prepare("SELECT * FROM career_progression WHERE career_id = ? ORDER BY progression_type ASC").bind(careerId).all<CareerProgression>();
  return result.results ?? [];
}

/** Hydrate a career with its world + profile for API responses. */
export async function getCareerDetail(db: D1Database, idOrSlug: string): Promise<{
  career: Career;
  world: CareerWorld | null;
  profile: CareerProfile | null;
} | null> {
  const career = await getCareer(db, idOrSlug);
  if (!career) return null;
  const world = await getWorld(db, career.world_id);
  const profile = await getProfile(db, career.id);
  return { career, world, profile };
}

// ──────────────────────────────────────────────────────────────────────────────
// Catalogue status
// ──────────────────────────────────────────────────────────────────────────────

export async function getActiveCatalogueVersion(db: D1Database): Promise<CatalogueVersion | null> {
  return db.prepare("SELECT * FROM catalogue_versions WHERE status = 'active' ORDER BY created_at DESC LIMIT 1").first<CatalogueVersion>();
}

export async function recordCatalogueStatus(
  db: D1Database,
  input: {
    id: string;
    catalogueVersionId: string;
    totalCareers: number;
    worldAllocation: WorldAllocationItem[];
    validationStatus: ValidationOutcome;
    validationDetails?: unknown;
  }
): Promise<void> {
  await db.prepare(
    `INSERT INTO catalogue_status
      (id, catalogue_version_id, total_careers, world_allocation_json,
       validation_status, validation_details_json, checked_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    input.id,
    input.catalogueVersionId,
    input.totalCareers,
    JSON.stringify(input.worldAllocation),
    input.validationStatus,
    input.validationDetails === undefined ? null : JSON.stringify(input.validationDetails),
    now()
  ).run();
}

/** Resolve a world by canonical id, falling back to canonical/alias slug. */
export function resolveWorldId(value: string): string | null {
  if (getWorldById(value)) return value;
  const match = getWorldById(value) ?? CANONICAL_WORLDS.find((w) => w.canonical_slug === value || w.seo_slug === value || (w as WorldDefinition).legacy_slug === value);
  return match ? match.id : null;
}

// ──────────────────────────────────────────────────────────────────────────────
// Seed loading (World 01 reference implementation)
// ──────────────────────────────────────────────────────────────────────────────

export interface CareerSeedItem {
  canonical_slug: string;
  canonical_name: string;
  published_name: string;
  cluster?: string | null;
  career_status?: Career["career_status"];
  editorial_status?: Career["editorial_status"];
  evidence_status?: Career["evidence_status"];
  description?: string | null;
  source?: string | null;
  provenance?: unknown;
  metadata_json?: unknown;
  profile?: {
    summary?: string | null;
    daily_work?: string | null;
    key_tasks?: string[];
    skills_needed?: string[];
    education_pathways?: string[];
    learning_resources?: string[];
    outlook?: string | null;
    attributes?: Record<string, unknown>;
    iwda_dimensions?: Record<string, number>;
  };
  relations?: Array<{ related_slug: string; relation_type: CareerRelation["relation_type"] }>;
  progression?: Array<{ next_slug: string; progression_type: CareerProgression["progression_type"] }>;
}

export interface CareerSeedFile {
  catalogue_version: string;
  world: { id: string; world_no: number; canonical_name: string; canonical_slug: string };
  careers: CareerSeedItem[];
}

/**
 * Loads a canonical World seed (JSON) into D1. Idempotent via the UNIQUE
 * constraints on canonical_slug / canonical_name. Relations and progression
 * reference sibling careers by canonical_slug and are resolved after insertion.
 */
export async function seedCareerWorld(
  db: D1Database,
  seed: CareerSeedFile
): Promise<{ inserted: number; duplicates: number }> {
  const worldId = seed.world.id;
  const world = await getWorld(db, worldId);
  if (!world) throw new Error(`CANONICAL_WORLD_MISSING:${worldId}`);

  let inserted = 0;
  let duplicates = 0;
  const slugToId = new Map<string, string>();

  for (const item of seed.careers) {
    const existing = await getCareer(db, item.canonical_slug);
    if (existing) {
      duplicates += 1;
      slugToId.set(item.canonical_slug, existing.id);
      continue;
    }
    const career = await insertCareer(db, {
      id: crypto.randomUUID(),
      canonical_slug: item.canonical_slug,
      canonical_name: item.canonical_name,
      published_name: item.published_name,
      worldId,
      cluster: item.cluster,
      careerStatus: item.career_status,
      editorialStatus: item.editorial_status,
      evidenceStatus: item.evidence_status,
      description: item.description,
      source: item.source,
      provenance: item.provenance,
      catalogueVersion: seed.catalogue_version,
      metadata: item.metadata_json,
    });
    if (item.profile) {
      await insertProfile(db, {
        id: crypto.randomUUID(),
        careerId: career.id,
        summary: item.profile.summary,
        dailyWork: item.profile.daily_work,
        keyTasks: item.profile.key_tasks,
        skillsNeeded: item.profile.skills_needed,
        educationPathways: item.profile.education_pathways,
        learningResources: item.profile.learning_resources,
        outlook: item.profile.outlook,
        attributes: item.profile.attributes,
        iwdaDimensions: item.profile.iwda_dimensions,
      });
    }
    slugToId.set(item.canonical_slug, career.id);
    inserted += 1;
  }

  for (const item of seed.careers) {
    const fromId = slugToId.get(item.canonical_slug);
    if (!fromId) continue;
    for (const rel of item.relations ?? []) {
      const toId = slugToId.get(rel.related_slug);
      if (!toId) continue;
      await db.prepare(
        `INSERT OR IGNORE INTO career_relations
          (id, career_id, related_career_id, relation_type, created_at)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), fromId, toId, rel.relation_type, now()).run();
    }
    for (const prog of item.progression ?? []) {
      const toId = slugToId.get(prog.next_slug);
      if (!toId) continue;
      await db.prepare(
        `INSERT OR IGNORE INTO career_progression
          (id, career_id, next_career_id, progression_type, created_at)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), fromId, toId, prog.progression_type, now()).run();
    }
  }

  return { inserted, duplicates };
}
