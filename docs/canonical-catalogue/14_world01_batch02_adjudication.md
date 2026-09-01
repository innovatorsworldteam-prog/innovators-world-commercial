# World 01 — Batch 2 Adjudication Sheet (Data + Cloud + Networking)

**Document 14 / 10** — Phase 5 deliverable: human editorial decision sheet, **Batch 2 only**.
Status: **Batch 2 human decisions RECORDED (2026-09-01). Columns 16/17 filled below. Not an import file.**

- **Date:** 2026-09-01
- **Review baseline:** `docs/canonical-catalogue/12_world01_editorial_review.md` (accepted, `commit d8b8df5`)
- **Human anchor:** `docs/canonical-catalogue/13_world01_batch01_adjudication.md` (Batch 1 decided)
- **Source of record:** `src/data/canonical/worlds/world-01/candidate-inventory.json` (`commit 8012d0a`, **unchanged**)
- **Scope:** all candidates in `03-data-engineering-analytics`, `04-cloud-infrastructure-devops`, `05-networking-systems-databases` (22 records, review #19–#40)
- **Rules:** column 15 ("Recommended human decision") is **only** the existing OpenCode recommendation — it is not a decision. The human decides in column 16. No canonical IDs, no imports, no inventory edits. Column 16/17 left **blank** for Batch 2.

> Provenance, evidence tiers and the existing recommendation/rationale are carried over from Documents 11–12.
> No new broad research was performed; the inventory's existing provenance is used first. Candidates without
> sufficient evidence are flagged rather than assumed.

---

## Field legend (columns 1–17)

| # | Field |
|---|---|
| 1 | Candidate # (review number in doc 12) |
| 2 | Proposed name |
| 3 | Proposed slug |
| 4 | Cluster |
| 5 | Proposed status |
| 6 | Evidence status |
| 7 | Provenance/source |
| 8 | Existing OpenCode recommendation |
| 9 | Existing rationale |
| 10 | Duplicate/overlap issue |
| 11 | Relationship to existing seed career |
| 12 | Key occupational distinction |
| 13 | What would make this a distinct canonical career |
| 14 | What would justify merging/aliasing it |
| 15 | Recommended human decision (OpenCode recommendation only) |
| 16 | Human decision (recorded below) |
| 17 | Human notes (recorded below) |

Each candidate sheet adds an evidence-oriented decomposition (the same A–D lens as Batch 1):

- **A. Job title / market terminology**
- **B. Occupational identity**
- **C. Competency/skill identity**
- **D. Canonical-career strength** — separate career, or vocabulary over another identity?

> **Session rule (standing):** a different job title is **not** automatically a different canonical career.
> Decisions hinge on whether function/competency differ, not on label.

---

## Attention cases for this batch (mandated)

- Data Engineer vs Analytics Engineer
- Data Analyst vs Business Intelligence Analyst
- Data Architect
- Data Steward/Governance
- Statistician and possible World 02 placement
- Cloud Architect vs Infrastructure Engineer
- DevOps Engineer vs Platform Engineer vs SRE
- Network Engineer vs Network Architect
- Systems Administrator
- Database Administrator
- Storage Administrator

---

## Candidate sheets

### #19 Data Engineer — `data-engineer` · 03 · current · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | SFIA data-engineering area; industry market evidence |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Build function (pipelines/warehouse) distinct from DB ops. |
| 10 | Duplicate/overlap | Overlaps #21 analytics-engineer (downstream) and #37 database-administrator (ops). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **build** function: data pipelines, warehouses, transformation and ingestion infrastructure. |
| 13 | Distinct career if | Pipeline/warehouse construction remains separable from downstream semantic-layer work (#21), DB operations (#37) and analytics (#20/24). |
| 14 | Merge/alias if | Only if the build function merged into #37 (ops) — rejected on functional split; see Critical case 1. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Data Engineer remains separate — its primary competency centre (pipeline/warehouse build) differs from Analytics Engineer (#21) and Database Administrator (#37, ops). |

- **A. Title/market:** data engineer, data-infrastructure engineer, data pipeline engineer.
- **B. Occupational identity:** building and operating the data-delivery estate (pipelines, warehouses, ingestion).
- **C. Competency/skill:** ETL/ELT, orchestration (Airflow/dbt), warehouses/lakehouse, data modelling, data infra.
- **D. Canonical-career strength:** STRONG — established build body with SFIA-industry framing.

### #20 Data Analyst — `data-analyst` · 03 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ESCO; O\*NET (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Core analysis function; T1. |
| 10 | Duplicate/overlap | Overlaps #24 business-intelligence-analyst (merge candidate) and #11 data-scientist (statistical remit). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Requirements-driven analysis and reporting for business decisions — the T1 analysis occupation. |
| 13 | Distinct career if | It remains the canonical home for BI/dashboard/metric vocabulary; the distinct analysis identity from data-scientist (#11, statistical) and from #24 (reporting vocabulary). |
| 14 | Merge/alias if | #24 BI Analyst folds here as alias; if the analytical half dissolves into #11, #20 becomes redundant — not supported on T1 national classification. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Data Analyst remains separate — distinct analysis competency centre (T1 national classification); canonical home for BI/reporting vocabulary. |

- **A. Title/market:** data analyst, business analyst (data), BI analyst (relative).
- **B. Occupational identity:** turning data into business insight/reporting.
- **C. Competency/skill:** SQL, visualisation, dashboarding, business metrics, reporting.
- **D. Canonical-career strength:** STRONG — T1 identity, canonical home for BI vocabulary (Critical case 2).

### #21 Analytics Engineer — `analytics-engineer` · 03 · emerging · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | market evidence; industry practitioner community |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct modern-data-stack transformation layer; emerging. |
| 10 | Duplicate/overlap | Overlaps #19 (data-engineer, upstream) and #20/#24 (downstream analysis). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **transformation/semantic layer**: dbt-style modelling, semantic definitions and quality of the analytics-ready dataset, between raw-pipeline build (#19) and report/insight (#20). |
| 13 | Distinct career if | The transformation/semantic-layer function is a real, recurring role distinct from raw-pipeline data engineering and from front-end analysis — T3 market/practitioner evidence. |
| 14 | Merge/alias if | If the semantic layer were merely a specialisation of #19 (data engineer); the modern-data-stack practitioner movement argues it is emerging distinct. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Analytics Engineer remains separate — distinct competency centre (transform/semantic layer) from Data Engineer (#19) and Data Analyst (#20). |

- **A. Title/market:** analytics engineer, analytics data engineer.
- **B. Occupational identity:** owning the modelling/semantic layer between raw data and analytics.
- **C. Competency/skill:** SQL/transform tooling (dbt), semantic modelling, data-quality-as-code, warehouse modelling.
- **D. Canonical-career strength:** MODERATE, `emerging` — boundary vs #19 is the ratify point (Critical case 1).

### #22 Data Architect — `data-architect` · 03 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | SFIA; DAMA-DMBOK (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Design function underpinned by DAMA body of knowledge. |
| 10 | Duplicate/overlap | Overlaps #65 solutions-architect (09) and #19 data-engineer (build). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **design** function for data estates: architecture, modelling conventions, standards, platform selection — above implementation. |
| 13 | Distinct career if | Data-architecture design remains a distinct specialist function (DAMA body) separate from data build (#19) and general solutions architecture (#65). |
| 14 | Merge/alias if | If pure "data architecture" were indistinguishable from #65 or from senior #19; DAMA/SFIA basis argues specialist distinct. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Data Architect remains separate/distinct — architecture of enterprise data structures/platforms is materially different from data-engineering implementation (#19). |

- **A. Title/market:** data architect, enterprise-data architect.
- **B. Occupational identity:** designing the data architecture.
- **C. Competency/skill:** data modelling (DAMA), architecture patterns, governance-aware design, platform strategy.
- **D. Canonical-career strength:** STRONG — distinct design function with own body of knowledge.

### #23 Data Governance & Stewardship Specialist — `data-governance-manager` · 03 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | DAMA-DMBOK; GDPR compliance practice (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Data-asset ownership/quality/privacy strand; DAMA/GDPR basis. |
| 10 | Duplicate/overlap | Overlaps #16 ai-governance (02) and #52 security GRC (06); relations to be authored. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **governance** function over data assets: ownership, quality, metadata, compliance/privacy — distinct from AI-governance (#16) and security-GRC (#52) but with shared relation to both. |
| 13 | Distinct career if | Data-asset governance/stewardship (DAMA-DMBOK, GDPR data-side duties) is a defined discipline with distinct regulatory + ownership responsibilities. |
| 14 | Merge/alias if | It must be distinguished relationally from #16/#52 (triad governance), not merged — collapsing would lose the data-asset strand; author `career_relations` at import. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Data Steward/Governance remains separate — data governance, quality, stewardship and accountability form a distinct occupational function (DAMA/GDPR basis). |

- **A. Title/market:** data steward, data-governance manager, data-quality lead, CDO-adjacent governance roles.
- **B. Occupational identity:** owning data-asset quality, availability, lineage and compliance.
- **C. Competency/skill:** data stewardship frameworks (DAMA), metadata/lineage, quality, GDPR data duties.
- **D. Canonical-career strength:** STRONG — the data strand of the governance triad (attention case: Data Steward/Governance).

### #24 Business Intelligence Analyst (variant) — `business-intelligence-analyst` · 03 · current · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage; market posting terminology |
| 8 | Existing recommendation (AI) | ALIAS |
| 9 | Existing rationale | BI/reporting terminology of the analysis function. |
| 10 | Duplicate/overlap | Near-duplicate of #20; BI/reporting vocabulary. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Dashboard/metric delivery — the reporting flavour of the analysis function, not a different occupational body. |
| 13 | Distinct career if | Only if BI delivery had a function body distinct from #20's analysis — market evidence does not support a separate career. |
| 14 | Merge/alias if | Because BI/reporting is the reporting vocabulary of #20; ALIAS keeps the title findable without a competing identity (Critical case 2). |
| 15 | Recommended human decision (AI) | **ALIAS** |
| 16 | Human decision | **ALIAS** |
| 17 | Human notes | BI Analyst treated as alias/market terminology variant of Data Analyst (#20), not a separate canonical identity. |

- **A. Title/market:** BI analyst, business intelligence developer/analyst.
- **B. Occupational identity:** dashboard, metric and report delivery over analysts' work.
- **C. Competency/skill:** visualisation tools, dashboards, dimensional models, report build — over the #20 analysis base.
- **D. Canonical-career strength:** WEAK as separate; STRONG as alias vocabulary under #20.

### #25 Statistician — `statistician` · 03 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ONS SOC 2020 statisticians group |
| 8 | Existing recommendation (AI) | MOVE |
| 9 | Existing rationale | Scientific/mathematical identity; belongs to World 02. |
| 10 | Duplicate/overlap | Cross-World candidate; scientific identity; applied-analytics half represented by #11 data-scientist in World 01. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Scientific/mathematical statistician identity (inference, experimental design, official statistics) — a Natural/Physical-Sciences identity, not a computing-software identity. |
| 13 | Distinct career if | In World 01 only if tied to computing-software; the T1 classification is scientific → recommend MOVE to World 02 (see Critical case 3). |
| 14 | Merge/alias if | Not merged; MOVE hand-off to World 02. Within World 01 its applied-analytics half is already represented by #11 — do not duplicate. |
| 15 | Recommended human decision (AI) | **MOVE** |
| 16 | Human decision | **MOVE** |
| 17 | Human notes | Statistician MOVED for eventual World 02 consideration — preserved as a canonical career candidate, NOT rejected or deleted from the Innovators World career universe. No duplication with Data Scientist (#11). |

- **A. Title/market:** statistician, applied statistician, official-statistics roles; overlaps analytics in data teams.
- **B. Occupational identity:** statistical inference and experiment design (scientific), vs applied-analytics in World 01 careers.
- **C. Competency/skill:** mathematical statistics, sampling, inference, experimental design, official statistics.
- **D. Canonical-career strength:** Strong, but **in World 02**; World 01's analytical half belongs to #11 (Critical case 3).

### #26 Cloud Architect — `cloud-architect` · 04 · current · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | SFIA; vendor certification programs (AWS, Microsoft, Google) (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Design function with mature certification ecosystem. |
| 10 | Duplicate/overlap | Overlaps #65 solutions-architect (09) and #30 infrastructure-engineer (merged vocabulary). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The cloud-**design** function (cloud-native architecture), distinct from general solutions architecture (#65) via cloud-platform specificity, and from infrastructure *engineering* (#30). |
| 13 | Distinct career if | Cloud-native design (vendor ecosystem + certification) stays separable from general #65 and from infra ops/engineering. |
| 14 | Merge/alias if | If cloud design collapsed into #65; the certification ecosystem and cloud-native body argue distinct in 04 (Critical case 4). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Cloud Architect remains distinct from general infrastructure engineering (mature cloud-native design function + certification ecosystem). |

- **A. Title/market:** cloud architect, cloud solutions architect, principal cloud architect.
- **B. Occupational identity:** designing cloud-native architectures.
- **C. Competency/skill:** cloud platform architecture, Well-Architected frames, migration, multi-cloud patterns.
- **D. Canonical-career strength:** STRONG — design function with mature vendor certifications.

### #27 DevOps Engineer — `devops-engineer` · 04 · current · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | DORA State of DevOps; SFIA (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Canonical delivery/ops identity tracked by DORA. |
| 10 | Duplicate/overlap | Overlaps #28 SRE and #29 platform-engineer (fold decisions); #30 infra and #31 release resolve here. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **delivery/operations** identity: CI/CD, infrastructure-as-code, release and environment management across the software lifecycle. |
| 13 | Distinct career if | It remains the canonical home for infrastructure/release vocabulary (#30, #31) and is distinguished from SRE (#28, reliability coding) and platform (#29, internal developer platforms). |
| 14 | Merge/alias if | It does NOT merge; it is a receiver (infra/release fold here). The triad question is whether #29 folds in (Critical case 5). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | DevOps Engineer remains separate — occupational centre is delivery automation and development/operations integration (DORA). |

- **A. Title/market:** DevOps engineer, delivery engineer, release/CI-CD roles (relative).
- **B. Occupational identity:** software delivery and operations pipeline.
- **C. Competency/skill:** CI/CD, IaC, container orchestration, release engineering, site delivery practices (DORA).
- **D. Canonical-career strength:** STRONG — the anchor of 04 (Critical case 5) and the merge target for #30/#31.

### #28 Site Reliability Engineer — `site-reliability-engineer` · 04 · current · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | Google SRE practice; DORA State of DevOps (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct software-ops discipline (error budgets, coding-in-ops). |
| 10 | Duplicate/overlap | Overlaps #27 DevOps; distinct discipline. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Reliability engineering through software: error budgets, SLI/SLO, coding-in-ops, capacity, incident engineering — the software-reliability body. |
| 13 | Distinct career if | Reliability-as-coded-practice (Google SRE + DORA) remains distinct from delivery/DevOps (#27); operational reliability is a distinct discipline. |
| 14 | Merge/alias if | If SRE were a specialty of #27 — the coding-in-ops/error-budget body argues it stays distinct (attention case: DevOps vs Platform vs SRE). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | SRE remains separate — occupational centre is reliability and operational engineering (Google SRE + DORA). |

- **A. Title/market:** SRE, site reliability engineer, platform-reliability roles (relative).
- **B. Occupational identity:** reliability engineering of production services.
- **C. Competency/skill:** SLO/SLI, error budgets, automation for reliability, chaos/capacity engineering, incident-response engineering.
- **D. Canonical-career strength:** STRONG — distinct software-ops discipline (Critical case 5).

### #29 Platform Engineer — `platform-engineer` · 04 · emerging · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry platform-engineering reports; market evidence |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Internal-developer-platform intent; emerging with distinct evidence. |
| 10 | Duplicate/overlap | Overlaps #27 DevOps and #28 SRE; careful about double-counting in SEO. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **internal developer platform (IDP)** function: golden paths, self-service tooling, and platform intent for other engineers — distinct from delivery (#27) and reliability (#28). |
| 13 | Distinct career if | IDP/product-for-engineers intent is a real, recurring role with distinct T3 evidence and SEO distinctness; owner of the platform-intent vocabulary. |
| 14 | Merge/alias if | The **explicit alternative** flagged: fold #29 into #27/#28 to avoid a 3-way division of the 04 ops surface. Human must arbitrate keep-distinct vs fold (Critical case 5). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Platform Engineer remains separate (`emerging`) — occupational centre is internal platforms and developer enablement (IDP intent), distinct from DevOps (#27) delivery automation and SRE (#28) reliability. |

- **A. Title/market:** platform engineer, developer-experience engineer, IDP engineer.
- **B. Occupational identity:** engineering the internal platform/SDX used by other engineers.
- **C. Competency/skill:** internal platforms, self-service abstractions, golden paths, DX tooling, developer-platform product management.
- **D. Canonical-career strength:** MODERATE-STRONG `emerging` — **the outstanding question for the human** is whether the IDP intent justifies a third 04 career or folds (Critical case 5).

### #30 Infrastructure Engineer (variant) — `infrastructure-engineer` · 04 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Terminology variant of devops-engineer. |
| 10 | Duplicate/overlap | Alias of #27 DevOps. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Infrastructure build/ops — a specialisation of DevOps delivery vocabulary. |
| 13 | Distinct career if | Only if infra engineering had a function body distinct from #27 — T3 usage shows it as terminology, not a separate body (attention case: Cloud Architect vs Infrastructure Engineer). |
| 14 | Merge/alias if | Because infrastructure-engineering is the infra vocabulary of #27; MERGE keeps the term findable under the DevOps identity. |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | **ALIAS** |
| 17 | Human notes | Human override of AI MERGE → ALIAS. Infrastructure Engineer treated as an alias/broad terminology rather than a separate canonical identity where the underlying work is represented by more specific infrastructure occupations (chiefly DevOps #27). |

- **A. Title/market:** infrastructure engineer, IaC/infra roles.
- **B. Occupational identity:** building/managing cloud and on-prem infrastructure — the infra half of DevOps.
- **C. Competency/skill:** terraform/cloud infra, provisioning, networking, observability setup — subset of #27.
- **D. Canonical-career strength:** WEAK as separate — MERGE into #27 (Critical case 4).

### #31 Release Engineer (variant) — `release-engineer` · 04 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Release automation is a DevOps sub-practice. |
| 10 | Duplicate/overlap | Sub-practice of #27 DevOps. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Release/CI-CD automation — the release sub-practice of DevOps, not a separate occupation. |
| 13 | Distinct career if | Only if release engineering were a distinct body from #27 — it is a sub-practice of the delivery pipeline. |
| 14 | Merge/alias if | Because release automation is DevOps delivery vocabulary; MERGE into #27. |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Release Engineer (#31) not explicitly listed in the recorded decision set; no override recorded — OpenCode MERGE into DevOps (#27) carried as the documented terminology resolution. |

- **A. Title/market:** release engineer, build/release engineer.
- **B. Occupational identity:** release pipeline and automation.
- **C. Competency/skill:** build automation, artifact/versioning, release orchestration — a #27 sub-set.
- **D. Canonical-career strength:** WEAK as separate — MERGE into #27.

### #32 Cloud Cost Engineer (FinOps) — `cloud-cost-engineer` · 04 · emerging · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | FinOps Foundation industry body; market evidence |
| 8 | Existing recommendation (AI) | DEFER |
| 9 | Existing rationale | FinOps sits at technology/finance boundary (World 07); vocabulary consolidating. |
| 10 | Duplicate/overlap | Cross-cutting (technology + finance). |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Cloud cost optimisation/FinOps — a real but cross-Word function (technology + World 07 finance). |
| 13 | Distinct career if | Only after World 07 editorial settles whether FinOps is a technology or finance identity; currently a recognized FinOps Foundation body but vocabulary consolidating. |
| 14 | Merge/alias if | Deferred — the technology/finance boundary is unresolved; do not pre-empt a World 07 decision. |
| 15 | Recommended human decision (AI) | **DEFER** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Cloud Cost Engineer (FinOps) (#32) not explicitly listed in the recorded decision set; no override recorded — OpenCode DEFER (pending World 07 editorial) carried unopposed. |

- **A. Title/market:** FinOps engineer, cloud cost engineer, cloud-finops analyst.
- **B. Occupational identity:** cloud cost optimisation and FinOps practice.
- **C. Competency/skill:** cloud billing/usage analytics, cost attribution, FinOps frameworks, finance-technology interface.
- **D. Canonical-career strength:** REAL but boundary-undecided — DEFER pending World 07 editorial (re-review trigger recorded in doc 12).

### #33 Network Engineer — `network-engineer` · 05 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ESCO; O\*NET (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Core networking occupation; T1. |
| 10 | Duplicate/overlap | Overlaps #34 network-architect (senior design function). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The networking **implementation/operations** occupation: routing, switching, firewalls, network operations at T1 classification. |
| 13 | Distinct career if | It remains the core networked-infrastructure occupation; distinguished from #34 (design) by build/ops vs architecture. |
| 14 | Merge/alias if | Not merged; the human split question is a design vs seniority framing (#34) — see Critical case 6. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Network Engineer remains separate — core networking occupation (T1); distinct from Network Architect (#34) by implementation/operations vs design. |

- **A. Title/market:** network engineer, network operations engineer, routing/switching engineer.
- **B. Occupational identity:** building and running network infrastructure.
- **C. Competency/skill:** routing/switching, network protocols, firewalls, NOC operations, network automation.
- **D. Canonical-career strength:** STRONG — T1 core occupation (attention case: Network Engineer vs Network Architect).

### #34 Network Architect — `network-architect` · 05 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | SFIA; industry positions |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Design counterpart at network scale. |
| 10 | Duplicate/overlap | Design/architecture counterpart of #33; not a duplicate. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The network **design** function (topology, standards, scalability) above #33 implementation. |
| 13 | Distinct career if | Network design stays a distinct specialist function from #33 operations — consistent with the architecture separation used across the review. |
| 14 | Merge/alias if | If "network architect" were a seniority framing of #33 rather than a design function; SFIA distinguishes design identity — see Critical case 6. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Network Architect remains separate — network design function distinct from Network Engineer (#33); design vs implementation split confirmed. |

- **A. Title/market:** network architect, network design architect.
- **B. Occupational identity:** designing network architecture at scale.
- **C. Competency/skill:** network architecture, SDA/SDWAN, design-to-standards, capacity/scale design.
- **D. Canonical-career strength:** MODERATE-STRONG — design counterpart; the human must confirm vs seniority framing (Critical case 6).

### #35 Telecommunications Engineer — `telecommunications-engineer` · 05 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ESCO; industry (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Carrier/5G identity; T1 classification. |
| 10 | Duplicate/overlap | Physical-layer overlap with World 03 engineering noted. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Carrier/telecommunications networking (5G, transport, radio access and their software/networking core). |
| 13 | Distinct career if | It remains in World 01 for the software/networking core; hardware/physical-layer portions split to World 03. |
| 14 | Merge/alias if | The carrier identity is distinct from #33/#34 — it is not merged; the World 03 split for hardware portions is the ratify point. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **MOVE / CROSS-WORLD REVIEW** |
| 17 | Human notes | Telecommunications Engineer preserved as a valid career candidate for eventual allocation; moved/cross-world reviewed because communications engineering may be better represented in another Career World (e.g., World 03 hardware/physical-layer). Preserved — not rejected or deleted. |

- **A. Title/market:** telecoms engineer, carrier-network engineer, 5G/radio-network engineer.
- **B. Occupational identity:** carrier/telecom networking and its software core.
- **C. Competency/skill:** telecom protocols, RAN/transport, SDN/NFV, carrier-grade networking.
- **D. Canonical-career strength:** STRONG — T1 carrier identity; World-03 hardware split to ratify.

### #36 Systems Administrator — `systems-administrator` · 05 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ESCO; O\*NET (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Established operations occupation; T1. |
| 10 | Duplicate/overlap | Escalation boundary with #99 IT-support (14); alias desktop-support sits in #99; storage/data-centre folds (#38/#39/#40). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The systems **operations** occupation: OS/server administration, compute/storage management, escalation between technical support and infrastructure. |
| 13 | Distinct career if | It remains the established systems-operations occupation (T1); the receiver of data-centre/storage/mainframe folds (#38/#39/#40). |
| 14 | Merge/alias if | It does NOT merge; it is a receiver. The folds (#38/#39/#40) resolve into it (with #38's 04 platform relation) — see Critical case 7. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Systems Administrator remains separate — established T1 systems-operations occupational identity; receiver of data-centre/storage/mainframe folds (#38/#39/#40). |

- **A. Title/market:** systems admin, sysadmin, server/admin engineer.
- **B. Occupational identity:** operating and maintaining compute/server estate.
- **C. Competency/skill:** OS/server administration, compute/storage ops, patching, access, escalation to #33/#99.
- **D. Canonical-career strength:** STRONG — T1 operations anchor and receiver of storage/DC/mainframe folds (attention case: Systems Administrator).

### #37 Database Administrator — `database-administrator` · 05 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ESCO; O\*NET (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Database-platform operations; T1. |
| 10 | Duplicate/overlap | Overlaps #19 data-engineer (03) - operational vs build. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The database **operations** function: DBA platform administration, performance/backup/recovery — distinct from #19 data build (03). |
| 13 | Distinct career if | DB platform operations remain distinct from #19's data-pipeline build; T1 classified. The build-ops split is the arbiter (Critical case 1 / attention case Database Administrator). |
| 14 | Merge/alias if | The mainframe (#40) folds here as legacy specialisation; the DBA career itself does not merge — ops vs build split holds. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Database Administrator remains separate — distinct database-operations occupational identity (T1), distinct from the #19 data-engineering build function. |

- **A. Title/market:** DBA, database administrator, database-platform engineer.
- **B. Occupational identity:** operating database platforms.
- **C. Competency/skill:** DB engine administration, performance tuning, backup/restore, high-availability ops.
- **D. Canonical-career strength:** STRONG — T1 ops identity, distinct from the #19 build function (attention case: Database Administrator).

### #38 Data Centre Engineer (variant) — `data-centre-engineer` · 05 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage; market posting terminology |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Facility/ops vocabulary over systems administration and platform. |
| 10 | Duplicate/overlap | Specialised facet of #36 systems-administrator / 04 platform (physical+virtual infra). |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Data-centre compute/storage ops — a facet of #36 (+ 04 platform relation), not an occupational body. |
| 13 | Distinct career if | Only if data-centre ops were a distinct body from #36 — T3 usage shows vocabulary, not a separate occupation. |
| 14 | Merge/alias if | Because data-centre ops is the facility vocabulary over #36 (with an 04 relation); MERGE folds it without a competing record. |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Data Centre Engineer (#38) not explicitly listed in the recorded decision set; not a distinct occupational identity — documented MERGE into #36 (with 04 relation) preserved per the terminology-duplicate rule. |

- **A. Title/market:** data-centre engineer, DC ops engineer.
- **B. Occupational identity:** operations of data-centre compute/storage.
- **C. Competency/skill:** rack/capacity ops, DC hardware, power/cooling monitoring, bare-metal — over #36.
- **D. Canonical-career strength:** WEAK as separate — MERGE into #36 (with 04 relation).

### #39 Storage Engineer (variant) — `storage-engineer` · 05 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Niche speculative storage vocabulary, not an occupation body. |
| 10 | Duplicate/overlap | Niche specialisation; weak as standalone. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | SAN/NAS/object-storage specialist vocabulary — a niche over #36/#37, not an occupational identity. |
| 13 | Distinct career if | Only if storage specialisation were a distinct occupation body — T3 usage shows weak/niche terminology, flagged. |
| 14 | Merge/alias if | Because storage vocabulary folds into #36 systems-admin / 04 platform (attention case: Storage Administrator). |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | **MERGE** |
| 17 | Human notes | Storage Administrator/Engineer merged — the evidence does not justify a separate canonical identity at this stage; folds into #36 / 04 platform. |

- **A. Title/market:** storage engineer, SAN/NAS admin, object-storage engineer.
- **B. Occupational identity:** storage platform vocabulary over systems/storage ops.
- **C. Competency/skill:** SAN/NAS/object storage, backup infra, storage performance — specialist flavour of #36/#37.
- **D. Canonical-career strength:** WEAK — MERGE into #36 / 04 platform (attention case: Storage Administrator).

### #40 Mainframe Engineer (variant) — `mainframe-engineer` · 05 · specialist · T4

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T4 · documented |
| 7 | Provenance/source | industry; banking/government legacy platforms |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Legacy platform specialisation; keep as alias not full career. |
| 10 | Duplicate/overlap | Legacy-platform specialisation of systems/database administration. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Mainframe/COBOL legacy-platform specialisation (banking/public-sector) — a T4-documented strand, but a specialisation of #36/#37, not an occupation body. |
| 13 | Distinct career if | Only if mainframe legacy support deserved full-career status; T4 documents real roles but they are platform-specialist over #36/#37. |
| 14 | Merge/alias if | Because it is a legacy-platform vogue over #36/#37; propose a **dedicated relation** for mainframe COBOL domains rather than a full career. |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Mainframe Engineer (#40) not explicitly listed in the recorded decision set; legacy-platform specialisation over #36/#37 — documented MERGE (as legacy alias) preserved per the terminology-duplicate rule. |

- **A. Title/market:** mainframe engineer, COBOL/mainframe developer (relative), z/OS admin.
- **B. Occupational identity:** operating/building on legacy mainframe platforms.
- **C. Competency/skill:** z/OS, COBOL/PL-I, CICS, legacy integration — platform-specialist over #36/#37.
- **D. Canonical-career strength:** WEAK as separate — MERGE as legacy alias with a dedicated relation for COBOL domains.

---

## Critical cases (evidence-based)

### Case 1 — Data Engineer vs Analytics Engineer (`#19` vs `#21`), and the build-ops split with DBA (`#37`)

| Lens | Data Engineer | Analytics Engineer | Database Administrator |
|---|---|---|---|
| A. Title/market | Data/infra/pipeline engineer | Analytics engineer | DBA |
| B. Occupational identity | Builds the raw-to-warehouse pipeline | Owns the transform/semantic layer | Operates database platforms |
| C. Competency/skill | ETL/ELT, orchestration, warehousing | dbt modelling, semantic layer, quality-as-code | DB engine admin, tuning, backup/recovery |

**D. Strong enough for separate careers?** YES, three ways:
- **#19 vs #21:** distinct function bands — raw-pipeline *build* vs transform/semantic *layer*. #21 is `emerging` (T3, modern-data-stack practitioner movement); the split is the modern-data naming convention. Both stay.
- **#19 vs #37:** the *build vs ops* split (SFIA data-engineering vs ESCO/O\*NET DBA, T2/T1). Different identity axes — pipeline construction vs engine operation. Both stay.
- **Merge test:** a different title does **not** mean a different career — #19/#21/#37 differ by *function*, not label, so the separations hold.

### Case 2 — Data Analyst vs Business Intelligence Analyst (`#20` vs `#24`)

| Lens | Data Analyst | BI Analyst |
|---|---|---|
| A. Title/market | Data analyst (T1 national) | BI analyst (T3 market) |
| B. Occupational identity | Analysis for business decisions | Dashboard/metric/report delivery |
| C. Competency/skill | SQL, analysis, visualisation, insight | Visualisation tools, dashboards, dimensional model, reports — over the analysis base |

**D. Strong enough for separate careers?** NO. #24's function/competency is the reporting vocabulary of #20 — same analysis body, delivery flavouring. Recommendation **ALIAS** into #20 (T1 anchor), keeping the BI term SEO-findable without a competing identity (attention case: Data Analyst vs Business Intelligence Analyst).

### Case 3 — Statistician and World 02 placement (`#25`)

| Lens | Statistician | (World 01 Data Scientist #11) |
|---|---|---|
| A. Title/market | Statistician (ONS SOC group, T1) | Data scientist |
| B. Occupational identity | Scientific/mathematical inference, experimental design, official statistics | Applied analytics/measurement |
| C. Competency/skill | Mathematical statistics, sampling, inference | Statistics + data engineering + ML applied |

**D. World 02 placement.** The T1 Statistician identity is scientific/ mathematical — a **Natural & Physical Sciences** identity, not a computing-software identity. Recommendation **MOVE** to World 02. Within World 01 the applied-analytics half is already represented by #11 (Data Scientist) — MOVING #25 to World 02 prevents overlap/duplication with #11. Human must ratify the World 02 home and confirm no World 01 + World 02 duplication (attention case: Statistician / World 02).

### Case 4 — Cloud Architect vs Infrastructure Engineer (`#26` vs `#30`)

| Lens | Cloud Architect | Infrastructure Engineer |
|---|---|---|
| A. Title/market | Cloud architect (T2, cert ecosystem) | Infrastructure engineer (T3) |
| B. Occupational identity | Cloud-native **design** function | Infra build/ops — the infra half of #27 |
| C. Competency/skill | Cloud architecture, Well-Architected frames, migration | IaC/provisioning over the DevOps base |

**D. Different outcomes.** Cloud Architect (#26) stays a distinct **career** (design function with mature vendor certification, in 04 with relations to #65). Infrastructure Engineer (#30) is **vocabulary** — infra engineering is the infra half of DevOps, so it **MERGE**s into #27 (attention case: Cloud Architect vs Infrastructure Engineer). Different titles, and here genuinely different functions (design vs build vocab) — but only #26 rises to a career.

### Case 5 — DevOps vs Platform Engineer vs SRE (`#27` vs `#29` vs `#28`)

| Lens | DevOps Engineer | Platform Engineer | Site Reliability Engineer |
|---|---|---|---|
| A. Title/market | DevOps (T2, DORA) | Platform engineer (T3, emerging) | SRE (T2, Google) |
| B. Occupational identity | Delivery/operations pipeline | Internal developer platform (IDP) | Reliability engineering through software |
| C. Competency/skill | CI/CD, IaC, release | IDP golden paths, DX tooling | SLI/SLO, error budgets, coding-in-ops |

**D. The outstanding arbitration for the human.** #27 and #28 are clearly distinct disciplines (delivery vs reliability, both T2). **#29 is the genuine question**: the IDP intent is real and `emerging` (T3 platform-engineering reports), but it is the **third** division of the 04 ops surface, and SEO double-counting with #27 is a live risk. Two options for the human:
- **Keep #29 distinct** (OpenCode `APPROVE`) — preserves the internal-developer-platform intent and its distinct body, at the cost of a 3-way ops surface.
- **Fold #29 into #27/#28** (the explicit alternative flagged as `MERGE`-flavoured) — reduces the 04 surface to two identities and removes the SEO overlap.

The OpenCode recommendation is **APPROVE** (distinct `emerging`); the human may choose the fold. Author `career_relations` between #27/#28/#29 at import regardless (attention case: DevOps vs Platform Engineer vs SRE).

### Case 6 — Network Engineer vs Network Architect (`#33` vs `#34`)

| Lens | Network Engineer | Network Architect |
|---|---|---|
| A. Title/market | Network engineer (T1) | Network architect (T2) |
| B. Occupational identity | Networking implementation/operations | Network design at scale |
| C. Competency/skill | Routing/switching, NOC, firewalls, ops | Topology/design, standards, scale architecture |

**D. Separate careers, NOT seniority framing.** #33 is the T1 core network-operations occupation; #34 is the SFIA design function (T2). They are a design/implementation pair, consistent with the architecture separation used across the review (Cloud vs Infra, Data Architect, Security Architect). Recommendation: **APPROVE** both, with #34 confirmed as a design function (not a seniority label of #33). The human arbitrates whether #34 stays specialist-distinct or is read as a seniority framing of #33 (attention case: Network Engineer vs Network Architect).

### Case 7 — Systems Administrator and the storage/data-centre/mainframe folds (`#36`, `#38`, `#39`, `#40`)

| Candidate | Recommendation | Frame |
|---|---|---|
| #36 Systems Administrator | APPROVE (receiver) | T1 operations anchor |
| #38 Data Centre Engineer | MERGE → #36 (+ 04 relation) | facility/ops vocabulary |
| #39 Storage Engineer | MERGE → #36/04 | niche storage vocabulary |
| #40 Mainframe Engineer | MERGE as legacy alias | + dedicated COBOL relation |

**D.** #36 is the established T1 systems-operations occupation and the **merge target** for the three storage/DC/mainframe variants — none of which has an occupational identity distinct from systems administration (or 04 platform for the infra folds). #38/#39 are T3 niche vocabulary; #40 is T4-documented but platform-specialist legacy vocabulary over #36/#37 (with a dedicated mainframe-COBOL relation). Recommendation: **APPROVE #36**; **MERGE #38/#39/#40** (attention case: Systems Administrator, Storage Administrator, Database Administrator).

---

## Batch 2 summary at a glance

| # | Name | Cluster | Status | Evidence | Recommendation (AI) | Human decision |
|---|---|---|---|---|---|---|
| 19 | Data Engineer | 03 | current | T2 | APPROVE | **APPROVE** |
| 20 | Data Analyst | 03 | current | T1 | APPROVE | **APPROVE** |
| 21 | Analytics Engineer | 03 | emerging | T3 | APPROVE | **APPROVE** |
| 22 | Data Architect | 03 | specialist | T2 | APPROVE | **APPROVE** |
| 23 | Data Governance & Stewardship | 03 | specialist | T2 | APPROVE | **APPROVE** |
| 24 | Business Intelligence Analyst | 03 | current | T3 | ALIAS | **ALIAS** |
| 25 | Statistician | 03 | current | T1 | MOVE (World 02) | **MOVE** |
| 26 | Cloud Architect | 04 | current | T2 | APPROVE | **APPROVE** |
| 27 | DevOps Engineer | 04 | current | T2 | APPROVE | **APPROVE** |
| 28 | Site Reliability Engineer | 04 | current | T2 | APPROVE | **APPROVE** |
| 29 | Platform Engineer | 04 | emerging | T3 | APPROVE (arbitration) | **APPROVE** |
| 30 | Infrastructure Engineer | 04 | specialist | T3 | MERGE | **ALIAS** (override) |
| 31 | Release Engineer | 04 | specialist | T3 | MERGE | — (no override; MERGE carried) |
| 32 | Cloud Cost Engineer (FinOps) | 04 | emerging | T3 | DEFER | — (no override; DEFER carried) |
| 33 | Network Engineer | 05 | current | T1 | APPROVE | **APPROVE** |
| 34 | Network Architect | 05 | specialist | T2 | APPROVE | **APPROVE** |
| 35 | Telecommunications Engineer | 05 | current | T1 | APPROVE | **MOVE / CROSS-WORLD REVIEW** |
| 36 | Systems Administrator | 05 | current | T1 | APPROVE (receiver) | **APPROVE** |
| 37 | Database Administrator | 05 | current | T1 | APPROVE | **APPROVE** |
| 38 | Data Centre Engineer | 05 | specialist | T3 | MERGE | — (no override; MERGE carried) |
| 39 | Storage Engineer | 05 | specialist | T3 | MERGE | **MERGE** |
| 40 | Mainframe Engineer | 05 | specialist | T4 | MERGE | — (no override; MERGE carried) |

> **Human-arbitration note (post-decision):** the three deliberate arbitration points resolved as follows —
> **(1)** Platform Engineer (#29) confirmed distinct `emerging` (IDP intent) vs folding; **(2)** Statistician (#25)
> confirmed MOVE to World 02 with a no-duplication-with-Data-Scientist rule; **(3)** Cloud Architect (#26) distinct
> design, Infrastructure Engineer (#30) overridden to ALIAS (broad terminology over more specific infra
> occupations, not a MERGE). Rows #31/#32/#38/#40 received no explicit decision and carry their documented
> MERGE/DEFER terminology resolutions per the standing title≠career rule.

> **Insufficient-evidence note (explicit):** no Batch 2 candidate rests on T5 predictive provenance; the
> thinnest are the T3-niche storage/data-centre folds (#38/#39) and the T3 `emerging` items (#21, #29, #32).
> These are flagged by recommendation (MERGE/DEFER/emerging) rather than supplemented with new research, in
> line with the instruction to use existing provenance and only flag (not assume) when evidence is thin.

---

## Recorded human decisions and rationale (2026-09-01)

These decisions are **human**, recorded in column 16; they are visibly distinct from the column-15 AI recommendations (which are unchanged).

| # | Name | Human decision | Human rationale (as recorded) |
|---|---|---|---|
| 19 | Data Engineer | APPROVE | Remains separate — primary competency centre (pipeline/warehouse build) differs from Analytics Engineer and DBA. (Rationale 1) |
| 20 | Data Analyst | APPROVE | Remains separate — distinct analysis competency centre (T1). (Rationale 1) |
| 21 | Analytics Engineer | APPROVE | Remains separate — distinct transform/semantic-layer competency centre. (Rationale 1) |
| 24 | Business Intelligence Analyst | ALIAS | Alias/market terminology variant of Data Analyst, not a separate canonical identity. (Rationale 2) |
| 23 | Data Steward / Governance | APPROVE | Remains separate — data governance, quality, stewardship and accountability form a distinct occupational function. (Rationale 3) |
| 25 | Statistician | MOVE | Moved for eventual World 02 consideration — preserved as a canonical career candidate, NOT rejected/deleted. (Rationale 4) |
| 22 | Data Architect | APPROVE | Remains distinct — architecture of enterprise data structures/platforms is materially different from data-engineering implementation. (Rationale 5) |
| 26 | Cloud Architect | APPROVE | Remains distinct from general infrastructure engineering. (Rationale 6) |
| 27 | DevOps Engineer | APPROVE | Delivery automation and development/operations integration. (Rationale 7) |
| 28 | Site Reliability Engineer | APPROVE | Reliability and operational engineering. (Rationale 7) |
| 29 | Platform Engineer | APPROVE | Internal platforms and developer enablement. (Rationale 7) |
| 30 | Infrastructure Engineer | ALIAS | Alias/broad terminology, not a separate canonical identity — underlying work represented by more specific infrastructure occupations. (Rationale 8) |
| 33 | Network Engineer | APPROVE | Remains separate (T1 networking core). (Rationale 9) |
| 34 | Network Architect | APPROVE | Remains separate (network design function). (Rationale 9) |
| 35 | Telecommunications Engineer | MOVE / CROSS-WORLD REVIEW | Preserved but moved/cross-world reviewed — communications engineering may be better represented in another Career World. (Rationale 10) |
| 36 | Systems Administrator | APPROVE | Remains a separate occupational identity (T1 systems-operations anchor). (Rationale 11) |
| 37 | Database Administrator | APPROVE | Remains a separate occupational identity (T1 database-operations). (Rationale 11) |
| 39 | Storage Administrator/Engineer | MERGE | Evidence does not justify a separate canonical identity at this stage. (Rationale 12) |

### Editorial notes on remaining Batch 2 terminology

- Rows not explicitly listed in the decision set (#31 Release Engineer, #32 Cloud Cost/FinOps, #38 Data Centre Engineer, #40 Mainframe Engineer) are **terminology duplicates already identified by the research analysis**; they preserve the documented MERGE/DEFER resolution rather than creating a new identity, per the standing rule.
- Standing rule applied throughout Batch 2 and carried into Batch 3: a different job title is **not** automatically a different canonical career — decisions hinge on function/competency, not label.

---

*End of Document 14 (Batch 2 adjudicated — Batch 1 anchor doc 13; human decisions recorded 2026-09-01). No inventory, seed, or production data modified; no canonical IDs created.*
