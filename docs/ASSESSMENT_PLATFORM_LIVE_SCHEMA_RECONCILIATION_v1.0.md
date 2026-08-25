# Innovators World Assessment Platform — Live Schema Reconciliation v1.0

## Status

**Repository reconciliation: complete.**

**Production D1 inspection: complete.**

**Migration 0007: prepared but not yet applied to production.**

## Production D1

The Worker configuration points `DB` to:

- Database: `innovators-world-commercial-db`
- Database ID: `fd8313c6-ceac-4112-a299-791169061dd1`

The remote D1 migration ledger was inspected directly on 26 August 2026.

Remote applied migrations are:

1. `0001_initial.sql`
2. `0002_iwda.sql`
3. `0002_participants_and_identity.sql`
4. `0006_complete_innovation_profile.sql`

Wrangler reports **No migrations to apply** against the local checkout only when the local migration directory is at the same state as production. The local checkout originally lacked the newly prepared `0007` file; the canonical repository now contains it.

## Verified live schema

The remote database was queried directly through `sqlite_master`. Existing production tables include:

### Existing platform tables

- users
- events
- leads
- programmes
- merchandise
- orders
- payments

### Existing participant/identity tables

- participants
- participant_consents
- identity_verification_challenges

### Existing IWDA tables

- iwda_attempts
- iwda_answers
- iwda_results
- iwda_insights

### Existing paid IWDA profile tables

- innovation_profile_entitlements
- complete_innovation_profiles

The live database also contains the corresponding existing indexes and SQLite autoindexes.

## Reconciliation decision

The generic assessment platform is **additive**. Existing IWDA production tables and data will not be dropped, renamed, or rewritten by migration 0007.

The new generic layer is:

- assessments
- assessment_versions
- assessment_dimensions
- assessment_questions
- assessment_options
- assessment_attempts
- assessment_answers
- assessment_results
- assessment_dimension_scores

The generic layer is intended to become the canonical storage model for new assessments. Historical IWDA data remains in its current schema until a separately validated consolidation strategy is approved.

## Migration numbering

The assessment migration is:

`migrations/0007_assessment_platform_v1.sql`

This preserves the existing migration sequence through `0006_complete_innovation_profile.sql`.

The migration uses `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, and idempotent seed inserts. It does not alter existing IWDA tables.

## Seeded assessment definitions

Migration 0007 registers:

- `IWDA` / version `1.0` as active
- `CAREER_DISCOVERY` / version `1.0` as draft

Career Discovery v1.0 contains six canonical dimensions:

| Code | Dimension | Weight |
|---|---|---:|
| INT | Interests | 25% |
| ACT | Activities | 15% |
| VAL | Values | 15% |
| ENV | Environments | 15% |
| SKL | Skill Inclinations | 15% |
| FUT | Future Curiosity | 15% |

## Generic TypeScript data-access layer

`src/db/assessment.ts` provides typed D1 persistence operations for:

- assessment lookup
- version lookup
- active-version resolution
- dimension retrieval
- age-aware question retrieval
- option retrieval
- attempt creation/retrieval
- answer upsert/retrieval
- attempt completion
- result persistence
- dimension-score persistence

`src/db/index.ts` re-exports the assessment data-access layer.

The layer deliberately contains persistence operations only. Assessment methodology, scoring and career matching remain separate concerns.

## Production gate

Migration 0007 has **not** been applied remotely at the time of this document revision.

Before production application, the local checkout must first synchronize with `origin/main` so Wrangler can see `migrations/0007_assessment_platform_v1.sql`.

Then run the remote migration and verify:

1. `0007_assessment_platform_v1.sql` appears in `d1_migrations`.
2. All nine generic assessment tables exist.
3. IWDA and Career Discovery seed records exist.
4. The six Career Discovery dimensions exist with the canonical weights.
5. Existing IWDA/participant tables remain intact.

Only after that verification should application routes be wired to the generic layer.
