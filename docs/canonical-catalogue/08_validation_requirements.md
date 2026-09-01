# World 01 — Validation Requirements

## 1. Purpose

Defines the validation specific to **World 01** as it is built, and how it relates
to the global validation. World 01 validation never requires 780 careers. It
enforces completeness, consistency, and internal correctness of the World 01
reference set.

## 2. Relationship to existing validate.ts

`src/career/validate.ts` already implements two modes:

- **development** — structural/schema checks; never requires 780 careers.
- **production** — hard invariants (780 careers, 15 worlds, Σ = 780).

World 01 validation sits **between** these: development checks + World 01
completeness/consistency checks. The global production invariants are **not run**
(and would fail) until full universe assembly.

## 3. Validation tiers for World 01

### Tier 0 — Structural (schema; always)
Already covered by `validateDevelopment`:
- all canonical tables/columns/indexes present,
- 15 worlds present with correct identity (incl. `seo_slug`/`legacy_slug`),
- no duplicate career IDs/slugs/names.

### Tier 1 — World 01 profile completeness
Proposed `validateWorldOne(db)` — for every World 01 career, assert:
- canonical name, slug, published_name present and non-empty;
- `world_id` = `world-01`;
- `cluster` is a known taxonomy key (doc 01 §3);
- `career_status`, `editorial_status`, `evidence_status` are valid enums;
- `description`, `source`, `provenance` present;
- a `career_profiles` row exists with `summary`, `daily_work`, non-empty
  `key_tasks`, `skills_needed`, `education_pathways`, `learning_resources`,
  `outlook`;
- `iwda_dimensions` present and all values 0–100;
- `metadata_json.primary_signal` is a valid Career Discovery signal code;
- a `last_reviewed_date` is set on the profile.

### Tier 2 — World 01 consistency
- Every `career_relations` target and `career_progression` target resolves to an
  existing career (within World 01 now; across Worlds later).
- No orphaned profiles (profile without a career) and no published career without
  a profile.
- Skill `type` values ∈ {technical, human}.
- IWDA affinity uses only IWDA capability codes.
- Progression/relations `relation_type`/`progression_type` are valid enums.

### Tier 3 — World 01 governance
- `approved`/`published` careers have `evidence_status` ∈
  {`source_verified`, `expert_validated`}.
- `future`/`predictive` careers have `evidence_status = predictive` **and** a
  recorded review note; they may be `approved` but flagged for specialist review.
- No World 01 career references another World's career before cross-World
  assembly (deferred).

## 4. Batch gate

A **cluster** or **edition** batch may move to `approved` when:
- Tier 0 passes,
- all careers in the batch pass Tier 1,
- Tier 2 passes for the batch,
- Tier 3 holds for every `approved`/`published` career.

## 5. Reporting & logging

Validation results are recorded to `catalogue_status`:
- `total_careers` = actual World 01 count,
- `world_allocation_json` = per-World counts (only World 01 populated now),
- `validation_status` = `pass`/`fail`,
- `validation_details_json` = the check list.

An edition may be activated with World 01 alone; the **global 780 production gate**
is recorded as `future` until the remaining 14 Worlds are assembled.

## 6. Proposed implementation note

Add a `validateWorldOne(db): ValidationReport` alongside `validateDevelopment` /
`validateProduction`. It reuses the structural helpers and adds Tier 1–3 checks
scoped to `world-01`. This is a **proposed** code addition for the build phase —
not required to author the framework.

## 7. Open decisions
1. Initial World 01 target **breadth** (how broad a set is "editorially complete"
   before it is declared the reference) — to be set by the data owner once the
   research candidate list is gathered.
2. Whether cluster-level, chapter-level, or whole-World editions gate publishing.
