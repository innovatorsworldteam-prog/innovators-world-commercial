# World 01 — Career-Profile Data Specification

## 1. Purpose

Defines, field by field, the canonical record for a single career. It maps is
directly onto the schema in `migrations/0010_canonical_careers_v2.sql` and the
types in `src/career/canonical.ts`. A career's "profile" is the union of the
`careers`, `career_profiles`, `career_relations`, `career_progression` rows plus
the parsed JSON payloads.

## 2. Field definition

| # | Field | Column / JSON key | Type | Required for include | Notes |
|---|---|---|---|---|---|
| 1 | Canonical career ID | `careers.id` | uuid | ✓ | Stable, never changes. |
| 2 | Canonical name | `careers.canonical_name` | text | ✓ | Unique; the stable research name. |
| 3 | Canonical slug | `careers.canonical_slug` | text | ✓ | Unique; URL-safe derived from canonical name. |
| 4 | Published name | `careers.published_name` | text | ✓ | User-facing; may differ from canonical (e.g. title-case). |
| 5 | Career status | `careers.career_status` | enum | ✓ | `current\|specialist\|emerging\|future`. |
| 6 | Editorial status | `careers.editorial_status` | enum | ✓ | `draft\|review\|approved\|published\|retired` (see doc 05). |
| 7 | Evidence status | `careers.evidence_status` | enum | ✓ | `source_verified\|expert_validated\|predictive` (see doc 04). |
| 8 | World assignment | `careers.world_id` | fk | ✓ | Exactly one World (always `world-01` here). |
| 9 | Cluster/subcategory | `careers.cluster` | text | ✓* | From the taxonomy (doc 01); `*` required before publishing. |
| 10 | Career summary | `careers.description` | text | ✓* | 1–2 sentence definition. (`*` before publishing.) |
| 11 | Source | `careers.source` | text | ✓ | Human-readable source attribution. |
| 12 | Provenance | `careers.provenance` | json | ✓ | Structured provenance (see doc 04). |
| 13 | Catalogue version | `careers.catalogue_version` | text | ✓ | `2.0` for this edition. |
| 14 | Metadata | `careers.metadata_json` | json | opt | e.g. `primary_signal`, links. |
| 15 | Profile summary | `career_profiles.summary` | text | ✓ | Extended 2–4 sentence overview. |
| 16 | What the professional does | `career_profiles.daily_work` | text | ✓ | Concrete day-to-day description. |
| 17 | Key tasks | `career_profiles.key_tasks_json` | json[] | ✓ | 5–8 concrete tasks. |
| 18 | Skills | `career_profiles.skills_needed_json` | json[] | ✓ | Combined skills list. |
| 19 | Technical skills | `career_profiles.skills_needed_json` (tagged) | json[] | ✓ | Technically-specific skills, tagged. |
| 20 | Human/transferable skills | `career_profiles.skills_needed_json` (tagged) | json[] | ✓ | Communication, collaboration, etc., tagged. |
| 21 | Education pathways | `career_profiles.education_pathways_json` | json[] | ✓ | Degree/bootcamp/apprenticeship paths. |
| 22 | Certifications | `career_profiles.education_pathways_json` (or metadata) | json[] | opt | Relevant professional certifications. |
| 23 | Learning pathways/resources | `career_profiles.learning_resources_json` | json[] | ✓ | Courses, platforms, communities. |
| 24 | Career progression | `career_progression` | rows | ✓ | advancement/specialization/lateral to other careers. |
| 25 | Related careers | `career_relations` | rows | ✓ | similar/complementary/prerequisite/alternative. |
| 26 | IWDA affinity | `career_profiles.iwda_dimensions_json` | json map | ✓ | observe/question/create/test/impact/imagine → 0–100. |
| 27 | Career Discovery signals | `careers.metadata_json.primary_signal` | enum | ✓ | One of the 15 Discovery signal codes. |
| 28 | Outlook | `career_profiles.outlook` | text | ✓* | Growth/hiring/demand outlook. (`*` before publishing.) |
| 29 | Verification state | `careers.evidence_status` + `catalogue_status` | see doc 04/05 | ✓ | Where verification level and checks live. |
| 30 | Last reviewed date | `career_profiles.metadata_json` (or `careers.updated_at`) | date | ✓ | Date of last factual review. |

### Skill tagging convention (fields 18–20)

To support both technical-skill and transferable-skill views from a single
column, skills are stored as taggable objects:

```json
[
  { "name": "Python", "type": "technical" },
  { "name": "Cross-team communication", "type": "human" }
]
```

This is a **JSON payload convention**; the `skills_needed_json` column stores the
array. Consumers may filter by `type`. A JSON-schema for this payload lives with
doc 07.

### IWDA affinity convention (field 26)

```json
{ "create": 75, "question": 90, "test": 85 }
```

Scores are 0–100, reflecting how strongly the role engages that dimension.
Dimensions not applicable may be omitted. These must align with the IWDA
capability vocabulary (`observe/question/create/test/impact/imagine`).

## 3. Completeness rule

A career is **profile-complete** (the unit of "editorially complete" in doc 02)
only when all `✓` fields are populated and validated. Fields marked `✓*` are
required before the career may reach `approved`/`published`.

## 4. Consistency invariants (enforced by validation, doc 08)

- `canonical_slug` and `canonical_name` are globally unique.
- `world_id` is a valid World and equals the World being authored.
- All `career_relations` and `career_progression` targets exist in the catalogue.
- `primary_signal` is a valid Career Discovery signal code.
- `iwda_dimensions` values are integers 0–100.
- Skill `type` values are drawn from `technical|human`.

## 5. Single source of truth

The **database is the single source of truth**. JSON seed files (doc 07) are the
*authoring interchange format*; they are imported into D1 via `seedCareerWorld`
and thereafter the DB owns the record.
