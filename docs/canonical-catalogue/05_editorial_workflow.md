# World 01 — Editorial Status Workflow

## 1. Purpose

Defines the lifecycle of a career record from first draft to published (and, if
ever needed, retired). It makes the editorial state auditable and ensures
nothing reaches users before it is reviewed and verified.

## 2. States

The state machine uses `careers.editorial_status` with values
`draft → review → approved → published` and a terminal `retired`.

```
        research/  reviewer    publisher      (if obsolete)
 draft ───────▶ review ─────▶ approved ─────▶ published
   ▲                                                 │
   └─────────────── revise ◀──────────────────────   │
   ▲                                                 │
   └─────────────────────────────────────────────────┴─▶ retired
```

### State definitions

| State | Meaning | Allowed content |
|---|---|---|
| `draft` | Being authored; incomplete; editable. | Partial profile, draft fields, provenance may be incomplete. |
| `review` | Profile complete; submitted for editorial + expert review. | Full profile; no remaining `✓*` gaps. |
| `approved` | Passed review; awaiting publication. | Everything required; `source_verified`/`expert_validated`. |
| `published` | Live in the active catalogue edition. | Fully verified; immutable until a new review pass. |
| `retired` | Removed from the published catalogue but preserved for history. | Full history retained; hidden from public. |

## 3. Entry gates

The editor may only advance from `draft` → `review` when the record satisfies
the **completeness rule** (doc 03 §3) and the **inclusion criteria** (doc 02).

## 4. Review gates (sign-off requirements)

| Transition | Minimum sign-off | Required artifact |
|---|---|---|
| `draft → review` | Author self-check | Complete profile; provenance filled. |
| `review → approved` | Editor + (for `expert_validated`/`predictive`) a named domain expert | Review note recorded in provenance/metadata. |
| `approved → published` | Catalogue editor/owner | Part of a validated edition batch. |
| `published → retired` | Catalogue owner | Documented reason. |

## 5. Rules

1. **No straight-to-published.** Every career passes through `review` and
   `approved`.
2. **`predictive` careers cannot be `published`** without expert review and a
   recorded decision.
3. **Published facts are immutable.** After a career is `published`, changes
   require a new review pass that moves it back to `review`.
4. **`retired` is permanent** in the sense that re-publishing requires a fresh
   `draft → …` cycle; history is never deleted.
5. Every transition records `updated_at` so the audit trail is reconstructable;
   optionally log transitions to `catalogue_status.validation_details_json` for
   edition-level provenance.

## 6. Batch workflow

World 01 is built in **clusters** (doc 01). Each cluster is worked as a batch:
- author all careers in the cluster to `review`,
- editor + expert review the batch,
- move the batch to `approved`,
- publish the batch together as part of an edition.

A catalogue **edition** (version in `catalogue_versions`) becomes `active` only
when the assembled World 01 passes the World 01 validation set (doc 08), even
though the global 780 is not yet reached.

## 7. Definition of “done” for an edition

An edition may become active when:
- its World 01 career set passes doc 08 validation,
- every published career has `evidence_status`, provenance, and
  `last_reviewed_date`,
- the edition, its actual counts, and its world allocation are recorded in
  `catalogue_status`.

This is distinct from the eventual global gate of **780 careers across 15
Worlds**, which is enforced only at final catalogue assembly.
