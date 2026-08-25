# Innovators World Assessment Platform — Live Schema Reconciliation v1.0

## Scope

This reconciliation compares the canonical assessment-platform schema with the database structures currently represented by the repository migrations and Worker code.

## D1 configuration

The Worker is configured with D1 binding `DB` pointing to database `innovators-world-commercial-db`. The repository configuration records the production database ID in `wrangler.jsonc`.

## Existing schema families

### Existing platform tables

The original platform migration defines:

- users
- events
- leads
- programmes
- merchandise
- orders
- payments

These remain separate platform/commercial tables.

### Existing IWDA tables

The existing IWDA migration defines:

- iwda_attempts
- iwda_answers
- iwda_results
- iwda_insights

The participant/identity migration subsequently adds `participant_id` to `iwda_attempts`.

### Participant identity tables

Existing participant infrastructure includes:

- participants
- identity_verification_challenges
- participant_consents

These remain the canonical participant identity layer.

### Existing paid IWDA profile tables

The complete innovation profile migration defines:

- innovation_profile_entitlements
- complete_innovation_profiles

These remain product/entitlement-specific and are not duplicated by the generic assessment result tables.

## Reconciliation decision

The generic assessment platform is **additive**. Existing IWDA tables are not dropped, renamed, or rewritten in v1.0.

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

The generic layer is intended to become the canonical storage model for new assessments and, after validation, the migration target for future IWDA consolidation.

## Migration numbering correction

The first assessment-platform migration was initially created as `0001_assessment_platform_v1.sql`. The repository already contained `0001_initial.sql`, so the duplicate migration number was unsafe.

It has been removed and recreated as:

`migrations/0007_assessment_platform_v1.sql`

This preserves the existing migration sequence through `0006_complete_innovation_profile.sql`.

## Important live-D1 limitation

Repository inspection can establish the intended/current schema represented by version-controlled migrations and the Worker queries. It cannot independently prove the exact live D1 state without executing a Cloudflare D1 command against the configured database.

The Worker already contains a health check that probes the key participant/IWDA tables. Before applying `0007`, the production D1 migration state must therefore be checked with Wrangler against the configured D1 database.

**No destructive migration should be run until that check confirms the live state.**

## Generic data-access layer

`src/db/assessment.ts` now provides typed D1 access for:

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

The layer deliberately contains persistence operations only. Assessment methodology and scoring remain outside the data-access layer.

## Next reconciliation gate

Run the production D1 migration/status inspection, compare the result with migrations `0001`–`0006`, then apply `0007` only if the schema is compatible.

After successful migration, wire IWDA and Career Discovery routes to the generic data-access layer incrementally. Existing IWDA routes should remain operational throughout the transition.
