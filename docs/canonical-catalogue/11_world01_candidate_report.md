# World 01 — Candidate Report (Editorial Review)

**Document 11 / 10** — Phase 3 deliverable for human editorial review.
Status: **DRAFT FOR REVIEW — NOT import-ready.**

- **Date:** 2026-09-01
- **Scope:** World 01 (Technology & Computing) candidate career universe
- **Source of record:** `src/data/canonical/worlds/world-01/candidate-inventory.json`
- **Governing taxonomy:** `docs/canonical-catalogue/01_world01_taxonomy.md` (14-cluster amendment applied)
- **Canonical invariant:** 780 total careers / 15 fixed worlds. This inventory is a **research artifact** and is not subject to the production 780 gate; it is **not** an import file.

> All counts in sections C, D and H are computed from `candidate-inventory.json` via Node
> (`node count-inventory.cjs ...`, plus per-cluster/status cross-tabs). They are generated,
> not hand-tallied, so they remain in lock-step with the inventory.

---

## A. Cluster coverage

All 14 clusters carry candidate coverage. Proposed **included** (recommended) careers per cluster:

| # | Cluster key | Maturity | Included | Total proposed |
|---|---|---|---|---|
| 01 | `01-software-engineering` | established | 6 | 8 |
| 02 | `02-ai-machine-learning` | established / governance strand | 7 | 10 |
| 03 | `03-data-engineering-analytics` | established | 5 | 7 |
| 04 | `04-cloud-infrastructure-devops` | established | 4 | 7 |
| 05 | `05-networking-systems-databases` | established | 5 | 8 |
| 06 | `06-cybersecurity` | established | 9 | 12 |
| 07 | `07-quality-testing-reliability` | established | 1 | 4 |
| 08 | `08-product-program-technology` | established / specialist | 4 | 8 |
| 09 | `09-architecture-engineering-leadership` | established / specialist | 3 | 6 |
| 10 | `10-applied-frontier-technology` | emerging | 5 | 9 |
| 11 | `11-emerging-distributed-systems` | emerging | 4 | 5 |
| 12 | `12-quantum-computing` | emerging / predictive (thin base) | 3 | 4 |
| 13 | `13-domain-integrated-computing` | specialist | 4 | 10 |
| 14 | `14-technical-support-service` | established | 2 | 8 |
| | **Total** | | **62** | **106** |

### Coverage assessment

- **Established core (A1–A7, B1–B2, D2):** strong. Every major function family has at least one included canonical career; merge candidates exist purely to keep *terminology* from fragmenting identities.
- **Emerging bands (C1, C2, A2-governance):** defensibly populated with real, documented roles only. No mere-trend titles included.
- **Thinest coverage:** cluster 07 (Quality) is deliberately a single canonical identity (`quality-assurance-engineer`) with all testing vocabulary merged into it. This is a position, not a gap — see §G.
- **No forced counts:** cluster sizes follow evidenced role breadth, not a quota. Cybersecurity (9) is broad because the specialist body is genuinely broad; Quality (1) is lean because its vocabulary is genuinely one occupation.

---

## B. Candidate inventory

The inventory lives in `src/data/canonical/worlds/world-01/candidate-inventory.json` (106 records) and uses the approved field schema:

`proposed_slug`, `proposed_name`, `published_name`, `cluster`, `proposed_status`, `decision`,
`duplicate_or_overlap`, `resolution`, `relationship_to_seed`, `source_term_variants`,
`rationale`, `provenance`, `evidence_tier`, `evidence_status`, `basis`, `editorial_flags`, `cross_world`.

Interpretation key:

| Field | Values |
|---|---|
| `decision` | `include` (recommended) · `merge_candidate` (fold into another identity) · `reject` (excluded, reason given) · `defer` (track for later round) · `needs_judgment` (open editorial arbitration) |
| `proposed_status` | `current` · `specialist` · `emerging` · `future` (per-career, evidence-assigned) |
| `evidence_tier` | T1 national classification · T2 industry framework · T3 market evidence · T4 documented position · T5 predictive |
| `relationship_to_seed` | `seed`, `alias-of-seed`, `related`, `null` |

The 5 existing seed careers (**AI Engineer, Software Developer, Data Scientist, Cybersecurity Analyst, Product Manager**) are preserved untouched as `relationship_to_seed: seed` records; recommended improvements are recorded in §G, not applied.

No canonical IDs are minted in the inventory; UUIDs are generated at import time.

---

## C. Counts by status

Status across **all 106 proposals** (computed):

| Proposed status | Proposals |
|---|---|
| `current` | 43 |
| `specialist` | 38 |
| `emerging` | 21 |
| `future` | 4 |

Status among the **62 recommended (included)** careers (computed):

| Proposed status | Included |
|---|---|
| `current` | 28 |
| `specialist` | 19 |
| `emerging` | 15 |
| `future` | 0 |

> **Guarantee:** no predictive/future title is recommended for inclusion. All four `future`
> records (`prompt-engineer`, `ai-trainer-annotator`, `zero-knowledge-engineer`,
> `quantum-hardware-engineer`) are **rejected or deferred**, so a reviewer cannot misread a
> prediction as an established occupation.

---

## D. Counts by cluster

Included (recommended) careers per cluster (computed):

```
 01-software-engineering: 6       08-product-program-technology: 4
 02-ai-machine-learning:   7      09-architecture-engineering-leadership: 3
 03-data-engineering-analytics: 5 10-applied-frontier-technology: 5
 04-cloud-infrastructure-devops:4 11-emerging-distributed-systems: 4
 05-networking-systems-databases:5 12-quantum-computing: 3
 06-cybersecurity:         9      13-domain-integrated-computing: 4
 07-quality-testing-reliability:1 14-technical-support-service: 2
```

Included-status cross-tab (computed):

| Cluster | current | specialist | emerging | future |
|---|---|---|---|---|
| 01 | 2 | 4 | 0 | 0 |
| 02 | 4 | 1 | 2 | 0 |
| 03 | 4 | 0 | 1 | 0 |
| 04 | 3 | 0 | 1 | 0 |
| 05 | 4 | 1 | 0 | 0 |
| 06 | 4 | 4 | 1 | 0 |
| 07 | 1 | 0 | 0 | 0 |
| 08 | 4 | 0 | 0 | 0 |
| 09 | 3 | 0 | 0 | 0 |
| 10 | 0 | 0 | 5 | 0 |
| 11 | 0 | 2 | 2 | 0 |
| 12 | 0 | 0 | 3 | 0 |
| 13 | 0 | 4 | 0 | 0 |
| 14 | 2 | 0 | 0 | 0 |

---

## E. Duplicates and overlaps

**32 records** are flagged duplicate/overlap (28 `merge_candidate` + 4 `needs_judgment`; computed).

### E.1 Merge candidates (28) — resolved as aliases/specialisations

| Candidate (variant) | Resolves into |
|---|---|
| Web Developer; Mobile App Developer | Software Developer (01) |
| NLP Engineer | AI Engineer / Machine Learning Engineer (02) |
| Business Intelligence Analyst | Data Analyst (03) |
| Infrastructure Engineer; Release Engineer | DevOps Engineer (04) |
| Data Centre Engineer; Storage Engineer; Mainframe Engineer | Systems/Database Administrator (05) |
| SOC Analyst | Cybersecurity Analyst (06) |
| Cloud Security Engineer | Security Engineer (06) |
| SDET/Test Automation; Performance Engineer | Quality Assurance Engineer (07) / SRE (04) |
| Technical Product Manager; AI Product Manager; Product Owner; Product Analyst | Product Manager (08) / Data Analyst (03) |
| Software Architect; Enterprise Architect | Solutions Architect (09) |
| Autonomous Vehicle Engineer; Drone/UAV Engineer | Robotics Software Engineer (10) |
| Simulation Engineer | Digital Twin Engineer (10) |
| Edge Computing Engineer | IoT Engineer (10) |
| Domain-Analyst variants (climate/health/geo) | Underlying data/domain careers (13) |
| Computational Biologist | Bioinformatics Engineer (13) |
| Automotive Software Engineer | Embedded Systems Engineer (01) / Robotics Software Engineer (10) |
| Support Engineer; Customer Success Engineer | IT Support Technician / Technical Account Manager (14) |

Each carries `duplicate_or_overlap`, `resolution`, and rationale so the merge logic is auditable.

### E.2 Alias handling

- Web/frontend/backend/full-stack, firmware, SOC, SDET, PO, "crypto engineer" (cryptography vs cryptoassets) are all **terminology variants**, not occupations. Alias surfaces will be authored in profile docs (doc 03 + 06) to protect canonical identity and SEO.

### E.3 Unresolved (4 `needs_judgment`) — open for arbitration

- **Security GRC Analyst** — cybersecurity (06) vs World 10 governance.
- **Quantitative Developer** — World 01 domain-integrated computing vs World 07 finance.
- **Field Service Engineer** — World 01 support vs World 15 skilled trades.
- **Solutions Engineer** — cluster 09 (technical consultant) vs 14 (TAM/pre-sales).

### E.4 Distinct-career separations (deliberately kept apart)

- **Software Developer vs Embedded Systems Engineer vs Systems Software Engineer** — application vs device vs OS/toolchain.
- **AI Engineer vs ML Engineer** — foundation-model product integration vs custom-model training/ops (2026 taxonomy split).
- **Security Analyst vs Security Engineer vs Penetration Tester** — monitor vs build vs attack.
- **Product Manager vs Technical Program Manager vs IT Project Manager** — what/why vs execution vs project delivery.
- **Solutions Architect vs Cloud Architect vs Data Architect** — design functions at different scopes.
- **QA Engineer (canonical) with SDET merged** — one identity, automation as a specialisation.

---

## F. Rejected candidates (9)

| Candidate | Reason | Recommended treatment |
|---|---|---|
| **Prompt Engineer** | 2023 fad title; absorbed into AI Engineer (prompt design/evals/guardrails are AI-engineering competencies); weak 2026 standalone evidence | Fold into AI Engineer; keep `source_term_variants` / SEO alias |
| **AI Trainer / Data Annotator** | Transitional RLHF/annotation task, increasingly automated/in-sourced; fails stable-identity test | Exclude; treat as a task within data/quality functions |
| **Statistician** | Primary identity is scientific/mathematical, not computing; applied half covered by Data Scientist | Map to World 02 |
| **Seniority & Executive Titles** (tech lead, staff/principal, CTO, VP Eng) | Grades/seniority, not occupations; only the manager track is a career | Exclude as careers; keep Engineering Manager |
| **Domain-Specialised Software Engineer** (fintech/edtech/legaltech) | Vertical specialisations of Software Developer; domain adjectives, not distinct bodies | Keep as specialisation vocabulary under Software Developer |
| **Enterprise Systems Specialist** (SAP/ERP/CRM) | Business-systems configuration/consultancy, not a distinct computing occupation | Map to World 07 |
| **Quantum Hardware / Cryogenics Engineer** | Hardware identity; belongs to engineering world | Map to World 03 |
| **Computer Hardware Engineer** | Hardware identity; boundary example at 01/03 seam | Map to World 03 |
| **UX Designer** | Design identity, not computing; boundary example at 01/08 seam | Map to World 08 |

**Deferred (3, tracked, not rejected):** Cloud Cost Engineer (FinOps, World 07 boundary), Accessibility Engineer (World 08 boundary), Zero-Knowledge Protocol Engineer (thin, fast-moving base).

---

## G. Editorial judgment

### G.1 Seed-career improvements (for later, NOT applied now)

1. **AI Engineer** — upgrade seed status `emerging → current` (evidence: 43,480-postings 2026 analysis, dominant AI hiring category), and sharpen scope vs ML Engineer and Data Scientist.
2. **Software Developer** — canonical description must explicitly absorb web/frontend/backend/full-stack/mobile terminology; author SEO alias set in doc 03/06.
3. **Data Scientist** — clarify boundary with AI Engineer / ML Engineer via explicit `career_relations`.
4. **Cybersecurity Analyst** — canonical description must absorb SOC/operations vocabulary.
5. **Product Manager** — scope line against Product Owner / Technical Product Manager / AI Product Manager aliases.

### G.2 Naming decisions

- "AI Governance & Responsible AI Specialist" chosen over competing titles (AI ethics officer, AI auditor, AI compliance manager) — canonical name covers the role family; others become aliases.
- "Industrial Control Systems Security Engineer (OT/SCADA)" published short-form "OT Security Engineer".
- "Quantum Error-Correction Software Engineer" published short-form "Quantum Error-Correction Engineer".
- "Scientific & Research Software Engineer" published short-form "Research Software Engineer".
- "Cryptographic Engineer" naming retained with an explicit note (not cryptoassets).

### G.3 Weighty calls for review

1. **AI Engineer ↔ ML Engineer** — recommended **distinct** (2026 role segmentation evidence). Alternative (single "AI/ML Engineer") is viable if the reviewer prefers fewer identities.
2. **Mobile App Developer** — recommended alias/merge; alternative is a distinct `specialist` career (kept as editorial flag in stock).
3. **SOC Analyst** — recommended merge into Cybersecurity Analyst; alternative distinct SOC career flagged.
4. **Platform Engineer vs DevOps** — recommended included as distinct `emerging` (internal-developer-platform intent); alternative merge into DevOps flagged.
5. **7-Quality leanness** — deliberately one canonical occupation; reviewer to confirm they do not want SDET/performance as separate careers.
6. **Cluster-07 vs cluster-09 boundaries** (solutions engineers, technical consultants) — see §E.3.

### G.4 Cross-World discipline (Step 7 compliance)

Recommended primary homes recorded explicitly when a candidate could sit elsewhere:

| Candidate | Recommendation | Contested World |
|---|---|---|
| Health Informatics Specialist | World 01 (computing identity leads) | World 04 |
| Bioinformatics Engineer | World 01 (computing identity leads) | World 02 |
| Geospatial Engineer | World 01 (computing identity) | World 05 |
| Statistician | World 02 | World 01 |
| Quantum/Computer Hardware | World 03 | World 01 |
| UX Designer | World 08 | World 01 |
| FinOps / Enterprise Systems / Quantitative Developer | World 07 arbitration | World 01 |
| Field Service Engineer | World 15 arbitration | World 01 |
| Security GRC Analyst | World 10 arbitration | World 01 |
| OT Security Engineer | World 01/06 (security identity) | World 15 on-site half |

None is forced into World 01; each carries a `cross_world` note.

---

## H. Provenance coverage

Evidence-tier distribution across all 106 proposals (computed):

| Tier | Meaning | Count |
|---|---|---|
| T1 | National classification | 15 |
| T2 | Industry/professional framework | 28 |
| T3 | Market evidence | 48 |
| T4 | Documented positions | 14 |
| T5 | Predictive only | 1 |

- **109 distinct provenance source strings** are cited. Permitted named frameworks in use: **ONS SOC 2020, BLS OOH, O*NET, ESCO, NICE/NIST SP 800-181, SFIA, IEEE/ACM Computing Curricula, World Economic Forum-adjacent labour reporting, PMI, TOGAF, DAMA-DMBOK, ISO/IEC 27001 / 42001, EU AI Act, GDPR/CCPA, FinOps Foundation, AMIA, Open Robotics (ROS), Esri**, plus labour-market analyses (DORA State of DevOps, State of AI, 2026 AI-hiring analyses, KORE1/Glassdoor embedded-segmentation) and documented-position evidence (quantum-computing firms, privacy-focused organisations, digital-twin/Omniverse roles, DevRel, smart-contract auditors).
- **No fabricated codes, URLs, quotations or statistics** were introduced; every quantitative claim is traceable to the named source family in `provenance`/`basis`.
- **Weak / thin evidence records** are explicitly bracketed: all four `future` records, the three `defer` records, and the QEC/other thin-base `emerging` records carry an explicit thin-evidence basis and a re-tier instruction.
- **Distribution note:** 62% of records (66/106) sit at T1–T3; T4 documented-position evidence underpins the emerging/frontier strand (14 records) — exactly where real-world verification matters most.

---

## I. Emerging/future methodology

### I.1 Status definitions used (per-career, evidence-assigned)

| Status | Test |
|---|---|
| `current` | Established body of work, multi-source T1–T2 classification/framework + sustained hiring |
| `specialist` | Distinct, stable sub-discipline of an established function; T2 framework or T3 sustained niche demand |
| `emerging` | Real, recurring practice with a **documented practitioner base** (T3 market evidence and/or T4 documented positions); role vocabulary may still be settling |
| `future` | Predictive/forward-looking projections only (T5) **or** real-but-thin frontier practice judged premature for a stable canonical career |

### I.2 Evidentiary threshold for emerging/future

- An `emerging` inclusion requires **at least T3** (market evidence) and, for frontier items, **T4** (documented positions) — e.g. quantum roles, OT security, digital-twin engineering, privacy engineering all carry T4 named-position basis.
- A `future` classification is **never** recommended for inclusion. Predictive titles must clear the Inclusion Criteria predictive gate (doc 02) and are otherwise **rejected** (Prompt Engineer, AI Trainer) or **deferred** (Zero-Knowledge Protocol Engineer).
- No candidate is included on conceivability alone. `basis` is mandatory for every frontier record.

### I.3 Distinction between "emerging" and "predictive"

- *Emerging* = people actively perform the function now (MLOps, AI governance, XR, robotics, IoT, digital twin, blockchain, privacy, quantum software). Basis = T3/T4.
- *Predictive* = scenarios and projections dominate (ZK at scale, pure AI-safety research roles). Excluded/deferred.

### I.4 Specific arbitration notes

1. **Quantum Error-Correction Engineer** — doc 01 §4 originally listed QEC as the `future` example. Per-career evidence (T4 documented postings at quantum-computing firms) supports **`emerging`**. Document 01 §4 is indicative only; final status is per-career from evidence. If the named-position base stagnates in later reviews, re-tier to `future` (flag set).
2. **Quantum as a whole** — the three included quantum roles share a thin-base flag; reviewer should re-confirm in a later round.
3. **Prompt Engineer** — retained as **reject** with the absorption finding (folded into AI Engineer). Remainder of this phase treats prompt-crafting as a competency, not a career.
4. **Blockchain Engineer** — included as `emerging` with a marketing-volatility guardrail (2026 hiring is real but selective; institutional momentum is tokenisation/CBDC/enterprise). Re-assessed at every review.
5. **OT/SCADA security** — `emerging` on regulatory-duty (NIS2-style) + real postings; candidate to be re-tiered to `current` if demand persists.

---

## J. Gaps

### J.1 Career gaps (known thin areas)

- **Cluster 07** depth (deliberate): only QA Engineer is included; SDET/performance are merged. If a reviewer prefers breadth, SDET as a separate `specialist` is the natural addition.
- **Domain-analyst boundary:** per-domain "–data analyst" titles are deliberately folded (see E.1). World 04/05 editorials must confirm the analytic narrative there does not re-create the titles.
- **Mainframe / COBOL** captured as an alias (05) to avoid inflating the universe; the IWDA mapping for declining legacy roles should be confirmed centrally.

### J.2 Cluster gaps

- No cluster has zero coverage. The lightest bands reflect either mature narrowness (07, 14) or frontier thinness (12). These are assessed positions, not omissions.

### J.3 Source gaps

- **Market analyses** (T3) are concentrated on 2024–2026 sources; a longitudinal T3 refresh (2027+) is recommended before import to de-risc frontier statuses (quantum, AI governance, digital twin).
- **National-classification (T1) coverage** is strongest for UK/EU/US; no other national systems were consulted in this phase. Future phases should confirm homogeneity for non-UK/US users.

### J.4 Taxonomy gaps

- Cross-World arbitration list (§G.4) is the main taxonomical debt: World 04, 05, 07, 08, 10 and 15 need reciprocal notes so this World's choices stay coherent in the 15-World architecture.
- `career_relations` between governance-dense identities (AI governance / data governance / security GRC) must be authored before import; the inventory records the overlaps but not the final relation graph.

---

## K. Recommended World 01 candidate universe

### K.1 Recommended candidates (62 included) — summary by status

| Proposed status | Count | Careers (proposed_slug) |
|---|---|---|
| `current` (28) | 28 | software-developer, ai-engineer, machine-learning-engineer, data-scientist, ai-research-scientist, data-engineer, data-analyst, cloud-architect, devops-engineer, site-reliability-engineer, network-engineer, telecommunications-engineer, systems-administrator, database-administrator, cybersecurity-analyst, security-engineer, penetration-tester, quality-assurance-engineer, product-manager, technical-program-manager, it-project-manager, it-business-analyst, solutions-architect, engineering-manager, technical-consultant, it-support-technician, technical-account-manager, embedded-systems-engineer |
| `specialist` (19) | 19 | game-developer, systems-software-engineer, computer-graphics-engineer, developer-relations-engineer, computer-vision-engineer, data-architect, data-governance-manager, network-architect, security-architect, threat-intelligence-analyst, cryptographic-engineer, identity-access-management-engineer, digital-forensics-analyst, smart-contract-auditor, distributed-systems-engineer, bioinformatics-engineer, health-informatics-specialist, geospatial-engineer, scientific-research-software-engineer |

> The `specialist` include set above is exactly 19 records, verified by the script's
> `by_status_include.specialist === 19` cross-check.

| `emerging` (15) | 15 | mlops-engineer, ai-governance-specialist, analytics-engineer, platform-engineer, ot-cybersecurity-engineer, xr-developer, robotics-software-engineer, iot-engineer, digital-twin-engineer, space-systems-software-engineer, blockchain-engineer, privacy-engineer, quantum-software-engineer, quantum-algorithm-researcher, quantum-error-correction-software-engineer |
| `future` (0) | 0 | *(none recommended — guarantee per §C)* |

### K.2 Status distribution (included)

- `current` 28 (45%) · `specialist` 19 (31%) · `emerging` 15 (24%) · `future` 0 (0%)

### K.3 Recommended actions before canonical import

1. **Editorial arbitration** on the 4 `needs_judgment` records (GRC, quantitative developer, field service, solutions engineer).
2. **Ratify merge resolutions** in §E.1 — confirm each folds as an alias/specialisation rather than a record.
3. **Confirm the seed improvements** in §G.1 for the five existing careers (derived status/scope updates for AI Engineer).
4. **Author `career_relations`** for governance-dense and AI pairs (AIE↔MLE↔DS; AI↔data↔security GRC).
5. **Settle the World 02/04/05/07/08/10/15 reciprocal notes** alongside those Worlds' editorials (coherence debt, §J.4).
6. **Generate slugs + UUIDs at import time only** — never from this artifact.
7. **Re-run the T3 evidence refresh** before import (2027+ longitudinal check) for the frontier cohort.

On approval of the Recommended Universe, the next step is the documented import workflow (docs 05–07) with `validateWorldOne`-style checks — **not in this phase.**

---

*End of Document 11. This inventory is submitted for human editorial review.*