# Innovators World Assessment Platform — Database Architecture v1.0

## Status

**Canonical architecture version:** 1.0  
**Purpose:** Shared persistence foundation for IWDA, Career Discovery and future Innovators World assessments.

## Design principles

1. **Assessment products are first-class products.** IWDA and Career Discovery are separate assessments, not questionnaires attached to a single feature.
2. **Version everything that affects a result.** Assessment versions, methodology, scoring and matching versions are persisted so historical reports remain reproducible.
3. **Do not destroy existing IWDA data.** The initial migration is additive and does not rewrite the current IWDA tables.
4. **Content is data.** Questions, options, dimensions and scoring configuration belong in versioned database records rather than being hard-coded into HTTP handlers.
5. **Results are immutable records of an assessment event.** A later scoring change must not silently change a previously generated result.
6. **No deterministic career prediction.** Career Discovery produces exploration matches and possibilities, not a definitive career recommendation or probability of success.
7. **Age is part of assessment design.** Career Discovery will use age-specific assessment versions/bands rather than merely changing question wording.

## Core entity model

```text
assessments
    │
    └── assessment_versions
            │
            ├── assessment_dimensions
            │
            └── assessment_questions
                    │
                    └── assessment_options

assessment_attempts
    │
    └── assessment_answers

assessment_results
    │
    └── assessment_dimension_scores
```

## Assessment registry

### IWDA

- Code: `IWDA`
- Version: `1.0`
- Status: active
- Existing IWDA scoring remains canonical during migration.
- Existing IWDA-specific tables remain untouched by migration `0001`.

### Career Discovery

- Code: `CAREER_DISCOVERY`
- Version: `1.0`
- Status: draft until methodology, question bank and validation are approved.
- Dimensions:
  - `INT` — Interests — 25%
  - `ACT` — Activities — 15%
  - `VAL` — Values — 15%
  - `ENV` — Environments — 15%
  - `SKL` — Skill Inclinations — 15%
  - `FUT` — Future Curiosity — 15%

## Tables

### `assessments`

Top-level product registry.

### `assessment_versions`

Immutable methodology/scoring boundary. A version records the applicable methodology, scoring and matching versions.

### `assessment_dimensions`

Dimensions measured by a particular assessment version. Dimension weights are stored as data.

### `assessment_questions`

Version-specific question content and age applicability.

### `assessment_options`

Selectable options and their version-specific scoring configuration.

### `assessment_attempts`

A participant's execution of one assessment version. Supports registered participants and anonymous sessions.

### `assessment_answers`

One canonical answer per question per attempt.

### `assessment_results`

The persisted result of a completed attempt. `result_json` stores the canonical result payload and `algorithm_version` identifies the calculation version.

### `assessment_dimension_scores`

Normalized scores for individual dimensions, allowing structured reporting without parsing the complete result JSON.

## Career Discovery taxonomy — next layer

The following tables are intentionally **not** introduced in migration `0001` because the taxonomy itself must be approved before occupation data is loaded:

```text
career_domains
    ↓
career_families
    ↓
career_pathways
    ↓
occupations
    ↓
career_attributes
    ↓
exploration_experiences
```

The initial proposed domains are:

1. Technology & Computing
2. Engineering & Making
3. Science & Discovery
4. Health & Human Wellbeing
5. Design & Creative Industries
6. Business & Entrepreneurship
7. Finance & Economics
8. People, Education & Psychology
9. Law, Policy & Society
10. Media, Communication & Storytelling
11. Environment, Climate & Sustainability
12. Food, Agriculture & Bio-innovation
13. Built Environment, Cities & Infrastructure
14. Space, Ocean & Frontier Exploration

## Migration policy

Migrations must be:

- sequentially numbered;
- committed to GitHub;
- additive where possible;
- safe to execute against an existing D1 database;
- reviewed before production deployment;
- never dependent on manually remembered Cloudflare state.

The first migration is:

`migrations/0001_assessment_platform_v1.sql`

It creates the generic assessment platform and registers IWDA v1.0 and Career Discovery v1.0. It does **not** replace or delete existing IWDA tables.

## Next implementation stages

1. Inspect and reconcile the live D1 schema with the repository's existing IWDA tables.
2. Add the generic assessment service/data-access layer.
3. Add tests for migration integrity and assessment lifecycle.
4. Migrate IWDA execution to the generic platform without changing its scoring methodology.
5. Add Career Discovery taxonomy tables.
6. Add Career Discovery question/scoring data only after the methodology is formally locked.
7. Implement the Career Discovery matching engine.
