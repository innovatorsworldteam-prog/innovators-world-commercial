# World 01 — Career Inclusion Criteria

## 1. Purpose

Defines whether a proposed career **qualifies** for inclusion in the World 01
canonical catalogue. The criteria are applied consistently and defensibly; they
are the mechanism that prevents manufacturing speculative titles to inflate
counts.

## 2. Scope

These criteria apply to World 01 (Technology & Computing) initially and are
designed to scale to Worlds 02–15 with only the domain "representative bodies"
differing (see §4).

## 3. Mandatory criteria (all must hold)

A career is eligible only if **every** criterion is satisfied:

1. **Demonstrable, recurring role.** A real professional activity performed by
   real people as a defined role, evidenced by at least one credible source
   (labour statistics, professional body, established industry taxonomy, or
   reputable employer/educator content) within the last **5 years**.
2. **Coherent job function.** The role has a clear primary function, not a
   marketing label or a single task someone occasionally does.
3. **Distinct from existing canonical careers.** Not a near-duplicate canonical
   name/slug of an existing career in World 01 (uniqueness enforced on
   `canonical_slug` and `canonical_name`).
4. **Defensible domain assignment.** Regardless of which industries hire for it,
   the role's primary function is Technology & Computing (World 01).
5. **Not merged/promotion-only.** Excluded: a seniority suffix with no distinct
   function (e.g. "Senior Software Engineer" is a grade, not a new career), a
   single employer's internal title, a vendor trademark (e.g. "AWS Architect"
   is captured as "Cloud Architect"), or a synonymous title of an existing career.
6. **Not obviously time-limited fad.** A role must be plausibly persistent or
   clearly emerging (see §5 for emerging/predictive handling).

## 4. Source classes (evidence ladder)

Careers are ranked by the strength of the underlying source. Stronger sources may
carry a higher `evidence_status`:

| Tier | Source class | Example | Default `evidence_status` |
|---|---|---|---|
| T1 | Official labour statistics / taxonomies | ONS, BLS, EU ESCO, national skills frameworks | `source_verified` |
| T2 | Professional/industry bodies & standards | ACM, IEEE, Royal Academy, industry guilds | `source_verified` / `expert_validated` |
| T3 | Reputable educator/employer/analyst content | Established university programmes, credible market reports, major hiring catalogs | `source_verified` (with care) |
| T4 | Primary evidence of an emerging role | Peer-reviewed or documented early-stage practice, credible frontier-role reports | `expert_validated` |
| T5 | Predictive only | Forward projections of the role as a persistent occupation | `predictive` |

A candidate must be supported by **at least one** source at **T1–T4** to be
included as `current`/`specialist`/`emerging`. **T5 alone** (pure prediction) is
insufficient unless the role also has T1–T4 early evidence.

## 5. Status assignment rules

| Target status | Requirement |
|---|---|
| `current` | Established, widely held; T1–T3 source. |
| `specialist` | Established within a niche subfield; T1–T4 source. |
| `emerging` | Genuine recent emergence with sustained, documented practitioner base; T3–T4 source. |
| `future` (predictive) | Credible early-stage role with named research practice and T4/T5 evidence; review-gated. |

**No `future` career is included on speculation.** Each must have a documented
basis and be reviewed.

## 6. Hard exclusions (never included in World 01)

- Roles whose primary function belongs to another World (e.g. a purely clinical
  role → World 04; a purely financial-analyst role → World 07).
- Generic management/leadership that is not technology-specific (covered in the
  relevant World, or excluded from the catalogue).
- Security-scrutinised or harmful dual-use roles with no legitimate framing.
- Duplicate or grade-only titles (see §3.5).

## 7. Completion bar for a batch of careers

A submitted batch (chapter/cluster) is "editorially complete" when:

- every included career meets all mandatory criteria,
- every career has full profile data per the data spec (doc 03),
- every career has provenance + source references + `evidence_status` + a
  `last_reviewed_date`,
- inclusion and exclusion decisions are auditable (a short rationale per career),
- the batch passes the World 01 validation set (doc 08).

## 8. Review gate

Decisions about **including** a `future/predictive` career, **merging** two
careers, or **dropping** a previously included career require documented
rationale and are reviewed before the data is imported.

## 9. Open questions

1. Should "solutions architect" be a distinct career from "software architect"?
   (Recommendation: yes — different function.)
2. Should technology-specific engineering management (tech lead) be included?
   (Recommendation: yes, as B2; see doc 01.)
