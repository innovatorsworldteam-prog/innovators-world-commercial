# World 01 — Research & Import Workflow

## 1. Purpose

Defines the end-to-end pipeline that moves World 01 careers from **research** to
**published records in the D1 database**. It is the operational counterpart to the
editorial state machine (doc 05).

## 2. Overview

```
[1 Research] -> [2 Author] -> [3 Review] -> [4 Import] -> [5 Validate] -> [6 Publish]
    |             |            |              |               |               |
 sources       seed JSON    editor/expert   seedCareerWorld  doc 08 checks  edition active
```

## 3. Step 1 — Research

For each cluster (doc 01):

1. Collect candidate roles from T1–T4 sources (doc 02 §4) — labour taxonomies,
   professional bodies, reputable educator/employer/analyst content.
2. For each candidate, record the supporting source(s) and year.
3. Screen against the **inclusion criteria** (doc 02) — this is where
   speculative/duplicate/grade-only titles are removed.
4. Produce a short per-career rationale (include or exclude + why).

**Output:** a reviewed candidate list for the cluster.

## 4. Step 2 — Author

For each included career, author the full profile per the **data specification**
(doc 03): canonical/published names, summary, daily work, tasks, technical +
human skills, education/certification pathways, learning resources, progression,
related careers, IWDA affinity, primary Discovery signal, outlook, and outlook
source.

Capabilities (from the IWDA vocabulary) and Career Discovery signals are assigned
per doc 03 §2 conventions.

**Output:** seed JSON blocks for the cluster (format in doc 07).

## 5. Step 3 — Review

Apply the editorial gates (doc 05 §4):
- Self-check for `draft → review` (completeness + inclusion).
- Editor review, plus a named domain expert where `expert_validated`/`predictive`.
- Record sign-off and `last_reviewed_date`.

## 6. Step 4 — Import

Approved seed JSON is imported into D1 via **`seedCareerWorld`** in
`src/db/catalogue.ts`. The importer:
- is **idempotent** (sibling careers referenced by `canonical_slug`; UNIQUE
  constraints on slug/name skip existing records),
- resolves relations/progression **after** inserting all careers in the batch,
- inserts World identity (and is a no-op if the World already exists).

All career, profile, relation, and progression rows write to the respective
tables in migration 0010. The database becomes the single source of truth.

## 7. Step 5 — Validate

Run the **World 01 validation set** (doc 08) in `development` mode first, then
the production invariants **only when applicable**. Record results to
`catalogue_status`.

## 8. Step 6 — Publish

Activate a catalogue edition (`catalogue_versions.status = 'active'`) once World 01
passes doc 08. This is **not** the global 780 gate — that gate applies only at full
universe assembly.

## 9. Tooling conventions

- **Interchange format:** JSON seed files under `src/data/canonical/worlds/`
  (see doc 07), authored by hand or by a research helper, then committed.
- **Import entrypoint:** a controlled script/test calls `seedCareerWorld`. No
  un-reviewed data reaches production.
- **Audit trail:** seed files are version-controlled; each import is tied to the
  seed file + commit it came from.

## 10. Anti-patterns (do not do)

- Import directly from raw scraped data without screening (bypasses doc 02).
- Auto-fill IWDA affinities / signals with fabricated values.
- Bypass review to speed up the count (the count is not the goal at this stage).
