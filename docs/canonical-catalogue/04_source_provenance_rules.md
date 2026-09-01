# World 01 — Source & Provenance Rules

## 1. Purpose

Defines how evidence, sources, and attribution are captured so every World 01
career is **defensible, traceable, and independently checkable**. These rules
govern the `source`, `provenance`, and `evidence_status` fields and the
"verification state" / "last reviewed date" tracking.

## 2. Terminology

- **Evidence status** (`careers.evidence_status`) — how we know about the role:
  - `source_verified` — backed by a named, checkable source.
  - `expert_validated` — additionally reviewed by a domain expert.
  - `predictive` — forward-looking/projected role not yet observed at scale.
- **Provenance** (`careers.provenance`, JSON) — the structured audit trail of a
  single fact set.
- **Source** (`careers.source`) — a short, human-readable attribution string.

## 3. Provenance object

Every career carries a provenance object (see `src/career/canonical.ts` →
`ProvenanceInfo`):

```json
{
  "source": "ONS labour market survey 2025",
  "publisher": "Office for National Statistics",
  "source_date": "2025",
  "ref": "https://...",            // optional URL / identifier
  "notes": "Reviewed alongside ACM taxonomy for role boundaries."
}
```

Rules:
1. `source` is required; `publisher` and `source_date` are strongly encouraged.
2. `ref` points to the checkable origin when available.
3. Multiple sources for one career are recorded (concatenated or as a list in a
   dedicated array) — prefer listing supporting references in `metadata_json`.

## 4. Source tiering (recap from doc 02 §4)

| Tier | Class | Default evidence_status |
|---|---|---|
| T1 | Official labour statistics / taxonomies | `source_verified` |
| T2 | Professional/industry bodies & standards | `source_verified` / `expert_validated` |
| T3 | Reputable educator/employer/analyst | `source_verified` (with care) |
| T4 | Primary evidence of an emerging role | `expert_validated` |
| T5 | Predictive only | `predictive` (insufficient alone) |

## 5. Verification state workflow

Each career tracks:

- **`evidence_status`** — its current evidence tier label.
- **`editorial_status`** — where it sits in the editorial lifecycle (doc 05).
- **`last_reviewed_date`** — the date facts were last checked (stored in
  `career_profiles.metadata_json`, or surfaced from `careers.updated_at` when the
  only change was metadata).

Transition semantics:
- `source_verified` → `expert_validated` only after a named domain expert signs
  off (recorded in provenance notes).
- `predictive` requires T4/T5 evidence plus a review decision; it cannot be
  published as `future` without documentation.

## 6. Citation hygiene

1. Cite the **specific** source, not a generic URL, for each key claim.
2. Prefer primary sources over secondary/blog summaries.
3. Record the collection year so data does not silently go stale.
4. If a fact cannot be sourced, mark it a draft gap — do not invent it.

## 7. Prohibitions

- No fabricated sources, invented statistics, or unverifiable claims.
- No copying proprietary labour databases wholesale without licensing review.
- No framing a pure prediction as an established fact (`evidence_status` must be
  `predictive`).

## 8. Review cadence

- **`source_verified` / `expert_validated`** careers: re-check `last_reviewed_date`
  on a defined cycle (proposed annually, or on a new source release).
- **`predictive`** careers: re-validate at each catalogue edition; retire if the
  role fails to materialise or is disproven.

## 9. Open decisions

1. Whether to add a dedicated `source_references` table (list per career) vs.
   storing references inside `metadata_json`. Recommendation: keep in
   `metadata_json` for now; promote to a table only when query needs demand it.
2. Confirm the annual re-review cadence and who holds the `expert_validated`
   sign-off authority.
