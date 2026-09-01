/**
 * Canonical Career Catalogue — v2.0 types.
 *
 * Single source of truth for the 780-career universe across 15 fixed Career
 * Worlds. World 01 (Technology & Computing) is the reference implementation;
 * Worlds 02–15 are defined here but their catalogue generation is deferred.
 *
 * These types mirror the event-sourced, additive-ready shape of the existing
 * IWDA and Career Discovery stacks. They are intentionally anemic (plain data
 * rows) with the domain behaviour living in companion modules:
 *   - ./worlds   — the 15 canonical worlds + alias resolution
 *   - ./validate — schema + canonical validation
 *   - ./routes   — catalogue HTTP routes
 *   - ./discovery— the existing Career Discovery engine (preserved, unchanged)
 */

// ──────────────────────────────────────────────────────────────────────────────
// Governance enums
// ──────────────────────────────────────────────────────────────────────────────

/**
 * How the role sits within its career field today. This is distinct from
 * editorial_status (whether we have reviewed the record) and evidence_status
 * (how we know about the role at all).
 */
export type CareerStatus = "current" | "specialist" | "emerging" | "future";

/** Editorial governance state for a catalogue record. */
export type EditorialStatus = "draft" | "review" | "approved" | "published" | "retired";

/**
 * Evidence basis for a career record.
 *  - source_verified: backed by a named, checkable source (labour data, etc.)
 *  - expert_validated: reviewed by a domain expert
 *  - predictive: forward-looking / projected role, not yet observed at scale
 */
export type EvidenceStatus = "source_verified" | "expert_validated" | "predictive";

/** Relationship between two careers (bidirectional by convention). */
export type RelationType = "similar" | "complementary" | "prerequisite" | "alternative";

/** How one career leads to another on a progression path. */
export type ProgressionType = "advancement" | "specialization" | "lateral";

/** Lifecycle of an edition of the catalogue. */
export type CatalogueStatus = "draft" | "active" | "retired";

/** Outcome of a validation pass. */
export type ValidationOutcome = "pass" | "fail";

/**
 * The mode of a validation run. Development/schema mode performs structural
 * checks and never requires 780 careers to be present; production canonical
 * mode enforces the hard invariants (780 careers, 15 worlds, Σ = 780).
 */
export type ValidationMode = "development" | "production";

// ──────────────────────────────────────────────────────────────────────────────
// IWDA affinity integration
// ──────────────────────────────────────────────────────────────────────────────

/**
 * The four core Innovation DNA capabilities surfaced by the IWDA assessment.
 * Career profiles and Career Discovery signals reference these so catalogue
 * records can be recommendation-matched against assessment output.
 */
export type IWDADimensionCode =
  | "observe"
  | "question"
  | "create"
  | "test"
  | "impact"
  | "imagine";

/** A single IWDA affinity: dimension code -> strength score. */
export interface IWDAAffinity {
  code: IWDADimensionCode;
  /** 0–100 normalized affinity for this dimension. */
  score: number;
}

/** Map form used when a row stores one value per dimension. */
export type IWDADimensionMap = Partial<Record<IWDADimensionCode, number>>;

// ──────────────────────────────────────────────────────────────────────────────
// Career Discovery signal integration
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Career World signal codes emitted by Career Discovery. These are the
 * short identifiers used in option metadata (career_world_signals) and in
 * assessment results; they are the bridge between Discovery and the canonical
 * Worlds.
 */
export type CareerDiscoverySignalCode =
  | "technology"
  | "science"
  | "engineering"
  | "health"
  | "environment"
  | "business"
  | "finance"
  | "design"
  | "media"
  | "society"
  | "education"
  | "arts"
  | "hospitality"
  | "exploration"
  | "trades";

/** A single Discovery signal: short code -> accumulated signal strength. */
export interface CareerDiscoverySignal {
  code: CareerDiscoverySignalCode;
  signal_score: number;
}

/** Map form of Discovery signals. */
export type CareerDiscoverySignalMap = Partial<Record<CareerDiscoverySignalCode, number>>;

// ──────────────────────────────────────────────────────────────────────────────
// Provenance
// ──────────────────────────────────────────────────────────────────────────────

/** Structured provenance for a career record beyond the free-text `source`. */
export interface ProvenanceInfo {
  /** Where the information originates (labour survey, industry body, etc.). */
  source?: string | null;
  /** Publisher / organisation behind the source. */
  publisher?: string | null;
  /** When the source data was collected. */
  source_date?: string | null;
  /** Public URL or identifier of the source. */
  ref?: string | null;
  /** Free-form editorial notes. */
  notes?: string | null;
}

/** JSON metadata carried on a career_worlds row. */
export interface CareerWorldMetadata {
  /** SEO-facing aliases (from the 15-worlds SEO foundation). */
  seo_aliases?: string[];
  /** Legacy slugs referenced by the older 305-career catalogue. */
  legacy_aliases?: string[];
  [key: string]: unknown;
}

/** JSON metadata carried on a careers row. */
export interface CareerMetadata {
  /** Discovery signal code this career primarily belongs to. */
  primary_signal?: CareerDiscoverySignalCode | null;
  /** Human-facing external links. */
  links?: Array<{ label: string; url: string }>;
  [key: string]: unknown;
}

// ──────────────────────────────────────────────────────────────────────────────
// Core row types (mirror the SQL schema in migrations/0010)
// ──────────────────────────────────────────────────────────────────────────────

export interface CareerWorld {
  id: string;
  world_no: number;
  canonical_name: string;
  canonical_slug: string;
  /** SEO slug alias pointing at this world (e.g. `technology` -> world-01). */
  seo_slug: string | null;
  /** Legacy catalogue slug alias (e.g. `tech` -> world-01), if any. */
  legacy_slug: string | null;
  tagline: string | null;
  description: string | null;
  display_order: number;
  metadata_json: string | null;
  created_at: string;
  updated_at: string;
}

export interface Career {
  id: string;
  canonical_slug: string;
  canonical_name: string;
  published_name: string;
  world_id: string;
  cluster: string | null;
  career_status: CareerStatus;
  editorial_status: EditorialStatus;
  evidence_status: EvidenceStatus;
  description: string | null;
  source: string | null;
  provenance: string | null;
  catalogue_version: string;
  metadata_json: string | null;
  created_at: string;
  updated_at: string;
}

export interface CareerProfile {
  id: string;
  career_id: string;
  summary: string | null;
  daily_work: string | null;
  key_tasks_json: string | null;
  skills_needed_json: string | null;
  education_pathways_json: string | null;
  learning_resources_json: string | null;
  outlook: string | null;
  attributes_json: string | null;
  iwda_dimensions_json: string | null;
  metadata_json: string | null;
  created_at: string;
  updated_at: string;
}

export interface CareerRelation {
  id: string;
  career_id: string;
  related_career_id: string;
  relation_type: RelationType;
  metadata_json: string | null;
  created_at: string;
}

export interface CareerProgression {
  id: string;
  career_id: string;
  next_career_id: string;
  progression_type: ProgressionType;
  description: string | null;
  metadata_json: string | null;
  created_at: string;
}

export interface CatalogueVersion {
  id: string;
  version: string;
  status: CatalogueStatus;
  expected_career_count: number;
  actual_career_count: number | null;
  expected_world_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CatalogueStatusRecord {
  id: string;
  catalogue_version_id: string;
  total_careers: number;
  world_allocation_json: string | null;
  validation_status: ValidationOutcome;
  validation_details_json: string | null;
  checked_at: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// Parsed / hydrated shapes
// ──────────────────────────────────────────────────────────────────────────────

/** The parsed JSON payloads stored on a career_profiles row. */
export interface ParsedProfile {
  key_tasks: string[];
  skills_needed: string[];
  education_pathways: string[];
  learning_resources: string[];
  attributes: Record<string, unknown>;
  iwda_dimensions: IWDADimensionMap;
}

/** A career hydrated with profile and world context for API responses. */
export interface CareerDetail extends Career {
  world?: CareerWorld | null;
  profile?: CareerProfile | null;
}

/** World allocation summary used in catalogue status. */
export interface WorldAllocationItem {
  world_no: number;
  id: string;
  canonical_name: string;
  career_count: number;
}

// ──────────────────────────────────────────────────────────────────────────────
// Validation
// ──────────────────────────────────────────────────────────────────────────────

export interface ValidationCheck {
  name: string;
  passed: boolean;
  detail: string;
}

export interface ValidationReport {
  /** Overall pass/fail for the requested mode. */
  passed: boolean;
  mode: ValidationMode;
  checked_at: string;
  checks: ValidationCheck[];
}

// ──────────────────────────────────────────────────────────────────────────────
// Utilities (duplicated deliberately so canonical.ts stays import-free and
// usable from both Worker and test contexts without bundling surprises)
// ──────────────────────────────────────────────────────────────────────────────

export function parseJsonSafe(value: string | null): Record<string, unknown> {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch { return {}; }
}

export function parseJsonArray(value: string | null): unknown[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function parseProvenance(value: string | null): ProvenanceInfo | null {
  if (!value) return null;
  const parsed = parseJsonSafe(value);
  if (!Object.keys(parsed).length) return null;
  return parsed as unknown as ProvenanceInfo;
}

export function parseIWDAffinityMap(value: string | null): IWDADimensionMap {
  const parsed = parseJsonSafe(value);
  const result: IWDADimensionMap = {};
  for (const key of Object.keys(parsed)) {
    if (typeof parsed[key] === "number") {
      result[key as IWDADimensionCode] = parsed[key] as number;
    }
  }
  return result;
}
