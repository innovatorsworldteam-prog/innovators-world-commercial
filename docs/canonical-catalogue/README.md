# Canonical Career Catalogue — Editorial & Data Framework

This folder defines the editorial and data framework for building the canonical
**780-career universe across exactly 15 Career Worlds**, beginning with **World 01 —
Technology & Computing** as the reference World.

This framework is the *pre-import* design layer. It is approved for authoring but
does **not** yet represent the completed World 01 catalogue. The final count of 780
is enforced only when the complete canonical universe is assembled — never during
World 01's editorial build.

## Guardrails (unchanged from the prior stage)

- The canonical universe is **780 unique careers across exactly 15 Worlds**.
- **World allocation per World is variable**; the 780 count is a property of the
  whole universe, not of any single World.
- **Do not attempt to reach 780 at this stage.** Do not distribute an arbitrary
  number of careers across the 15 Worlds.
- **World 01 must first become editorially complete and defensible** as the
  reference World.
- **Do not manufacture speculative titles to inflate counts.** Every career must
  meet the inclusion criteria and carry evidence.
- Do not build Worlds 02–15 yet.
- Do not redesign IWDA yet.
- Do not remove legacy systems.

## Documents

| # | Document | Purpose |
|---|---|---|
| 01 | [World 01 Taxonomy](./01_world01_taxonomy.md) | Subcategories/clusters within Technology & Computing |
| 02 | [Inclusion Criteria](./02_inclusion_criteria.md) | Which careers qualify for the canonical catalogue |
| 03 | [Career-Profile Specification](./03_career_profile_spec.md) | Field-level data specification for each career |
| 04 | [Source & Provenance Rules](./04_source_provenance_rules.md) | How evidence, sources and attribution are recorded |
| 05 | [Editorial Workflow](./05_editorial_workflow.md) | Status lifecycle + review gates |
| 06 | [Research & Import Workflow](./06_research_import_workflow.md) | End-to-end authoring-to-database pipeline |
| 07 | [Dataset Structure](./07_dataset_structure.md) | File layout, schema-conformant sample, conventions |
| 08 | [Validation Requirements](./08_validation_requirements.md) | World 01–specific checks |
| 09 | [Catalogue Structure](./09_catalogue_structure.md) | Proposed DB/tables/API for the assembled catalogue |
| 10 | [PDF Pipeline](./10_pdf_pipeline.md) | Proposed data-to-render pipeline for PDF artefacts |

## Implementation anchors

The framework maps directly onto the code already on `feat/canonical-780-careers`:

- `migrations/0010_canonical_careers_v2.sql` — the schema the framework targets.
- `src/career/canonical.ts` — governance, IWDA-affinity, Discovery-signal, and
  provenance types.
- `src/career/worlds.ts` — the 15 fixed Worlds + SEO/legacy alias resolution.
- `src/career/validate.ts` — two-mode validation (development vs production).
- `src/data/canonical/worlds/world-01-seed.json` — the approved **5-career
  reference seed**; **not** the completed World 01 catalogue.

## Status of this folder

**Draft — awaiting review.** No additional careers have been mass-imported.
The next action after review is the World 01 research/editorial build using the
process defined in documents 02, 05, 06 and the data format in 03 and 07.
