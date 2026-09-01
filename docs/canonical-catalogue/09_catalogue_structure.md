# Canonical Catalogue — Proposed Catalogue Structure

## 1. Purpose

Describes the **target structure** of the assembled canonical career catalogue:
database tables, identity model, API surface, and the relationship between World
01 (reference) and the remaining Worlds. This is the blueprint the World 01 build
is working toward.

## 2. Identity model (unchanged from the approved v2.0)

- **780 canonical careers** across **exactly 15 fixed Worlds**.
- World allocation per World is **variable**; 780 is a universe-level constraint.
- `careers.world_id` is NOT NULL and is the single source of truth for World
  membership (no separate allocation table).
- Every career has a stable `canonical_slug` and `canonical_name`.

## 3. Database tables (already in migration 0010)

| Table | Role | Key uniqueness |
|---|---|---|
| `career_worlds` | 15 fixed Worlds + seo/legacy aliases | `world_no` (1–15), `canonical_slug`, `seo_slug`, `legacy_slug` |
| `careers` | One row per career | `canonical_slug`, `canonical_name` |
| `career_profiles` | 1:1 editorial content | `career_id` |
| `career_relations` | Related-career links | (career_id, related_career_id, relation_type) |
| `career_progression` | Advancement paths | (career_id, next_career_id, progression_type) |
| `catalogue_versions` | Catalogue editions | `version` |
| `catalogue_status` | Validation log | FK to catalogue_versions |

This schema already supports the full 780 universe without alteration.

## 4. Proposed query/API surface

Read-first, canonical, versioned endpoints (already partially implemented in
`src/career/catalogue-routes.ts`):

| Endpoint | Purpose |
|---|---|
| `GET /api/catalogue/worlds` | 15 Worlds + aliases |
| `GET /api/catalogue/worlds/{canonical-slug\|seo-slug\|legacy-slug}` | World + its careers |
| `GET /api/catalogue/careers/{id\|canonical-slug}` | Hydrated career detail (world+profile+relations+progression) |
| `POST /api/catalogue/validate` | development / production validation |
| `GET /api/catalogue/status` | edition + counts + world allocation |

## 5. Catalogue editions & activation

- A catalogue **edition** (`catalogue_versions`) records expected counts.
- The v2.0 **draft** edition currently expects 780; its `actual_career_count`
  stays as authored per World until full assembly.
- An edition becomes **active** only after the assembled universe passes the
  production invariants (doc 08 §3 / `validateProduction`).
- World 01 may publish as a **reference edition** (scoped activation) before
  full assembly, with `actual_career_count < 780` and the global gate recorded as
  future-checked.

## 6. World 01 as reference World

World 01's build defines:
- the **data specification** (doc 03) others will follow,
- the **cluster/taxonomy pattern** (doc 01) for other Worlds,
- the **provenance and validation standards** (docs 04, 08) reused everywhere.

When World 01 is editorially complete and defensible, its shape is locked and
its fields/codes become the model for Worlds 02–15. **Worlds 02–15 are not built
in this stage.**

## 7. Discovery & IWDA integration (unchanged, preserved)

- Career Discovery signals (15 codes) and IWDA capabilities remain as-is.
- Catalogue records reference them via `metadata_json.primary_signal` and
  `iwda_dimensions_json`; no redesign to IWDA or Discovery in this stage.

## 8. Cloudflare / deploy shape

- Migrations: D1 migrations applied via `wrangler d1 migrations apply`.
- API: the Worker serves the catalogue routes from existing `src/index.ts`.
- Static assets remain hosted via `ASSETS` binding; the catalogue is data-driven
  from D1, not from static files.

## 9. Open decisions
1. Whether to expose clusters as a first-class API filter or keep them embedded.
2. PDF artefacts (doc 10) as a separate render service vs. inside the Worker.