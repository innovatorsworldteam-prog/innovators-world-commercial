# World 01 — Batch 3 Adjudication Sheet (Security + Quality)

**Document 15 / 10** — Phase 5 deliverable: human editorial decision sheet, **Batch 3 only**.
Status: **Batch 3 human decisions RECORDED (2026-09-01). Columns 16/17 filled below. Not an import file.**

- **Date:** 2026-09-01
- **Review baseline:** `docs/canonical-catalogue/12_world01_editorial_review.md` (accepted, `commit d8b8df5`)
- **Human anchors:** `docs/canonical-catalogue/13_world01_batch01_adjudication.md` (Batch 1 decided), `14_world01_batch02_adjudication.md` (Batch 2 decided)
- **Source of record:** `src/data/canonical/worlds/world-01/candidate-inventory.json` (`commit 8012d0a`, **unchanged**)
- **Scope:** all candidates in `06-cybersecurity` and `07-quality-testing-reliability` (16 records, review #41–#56)
- **Rules:** column 15 ("Recommended human decision") is **only** the existing OpenCode recommendation — it is not a decision. The human decides in column 16. No canonical IDs, no imports, no inventory edits. Column 16/17 left **blank** for Batch 3.

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

Each candidate sheet adds an evidence-oriented decomposition (the same A–D lens as Batches 1–2):

- **A. Job title / market terminology**
- **B. Occupational identity**
- **C. Competency/skill identity**
- **D. Canonical-career strength** — separate career, or vocabulary over another identity?

> **Session rule (standing, carried from Batches 1–2):** a different job title is **not** automatically
> a different canonical career. Decisions hinge on whether function/competency differ, not on label.

---

## Attention cases for this batch (mandated)

### Cybersecurity (06)
- Cybersecurity Analyst · SOC Analyst · Penetration Tester · Security Engineer · Security Architect · Threat Intelligence · Cryptography Engineer · GRC Analyst · Cloud Security Engineer · IAM Engineer · OT/Industrial Security

### Quality / reliability (07)
- QA Engineer · Test Automation / SDET · Performance Engineer · Release Engineer

> **Scope note on "Release Engineer":** the Release Engineer candidate (#31) belongs to **Batch 2 / 04-devops**
> and was already adjudicated there (documented MERGE into DevOps). The Batch 3 quality-batch attention item
> "Release Engineer" is read here as the *test-management/release-quality* vocabulary overlap with QA — the
> Release-engineer-as-a-career question is answered in Batch 2. This is analysed below (Critical case 5 / 9).

---

## Candidate sheets

### #41 Cybersecurity Analyst — `cybersecurity-analyst` · 06 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | O\*NET information security analysts; NICE/NIST SP 800-181 (+2) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Seed canonical (4/5); monitor/defend identity; SOC vocabulary absorbed. |
| 10 | Duplicate/overlap | Overlaps security-engineer (#42) (monitor vs build); SOC vocabulary (#46) is a merge candidate. |
| 11 | Rel. to seed | **seed** (seed canonical 4/5) |
| 12 | Key occupational distinction | The **monitor/defend** identity: continuous monitoring, incident detection and response, SOC operations — the seed security function. |
| 13 | Distinct career if | It remains the seed canonical home for monitoring/defence vocabulary (incl. SOC #46) — the monitor/defend half vs the build half of #42. |
| 14 | Merge/alias if | It does NOT merge; it is a receiver (SOC vocabulary). The question is whether #46 stays ALIAS or becomes distinct SOC (Critical case 1). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Cybersecurity Analyst remains the core defensive analysis occupational identity (seed canonical 4/5). |

- **A. Title/market:** cybersecurity analyst, security operations analyst, SOC analyst (relative), security analyst.
- **B. Occupational identity:** defending via monitoring, detection and response.
- **C. Competency/skill:** SIEM, detection/response, endpoint security, incident-handling, SOC tiers (L1–L3).
- **D. Canonical-career strength:** STRONG — T1 seed monitor/defend identity (attention case: Cybersecurity Analyst vs SOC Analyst).

### #42 Security Engineer — `security-engineer` · 06 · current · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | NICE/NIST SP 800-181; industry (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Build/engineer identity per NICE work roles. |
| 10 | Duplicate/overlap | cloud-security-engineer (#47) is a specialisation (merge candidate). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **build/engineer** identity: designing, implementing and hardening security controls into systems — the engineering counterpart of monitor/defend (#41). |
| 13 | Distinct career if | Security-engineering (build) remains distinct from security-operations (monitor, #41) and from security-architecture (design, #44). |
| 14 | Merge/alias if | #47 cloud-security merges here as cloud-platform specialisation; the Security Engineer career itself does not merge (Critical case 2/4). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Security Engineer remains separate — build/engineer identity (NICE work roles); receiver of cloud-security (#47) as a cloud-platform specialisation. |

- **A. Title/market:** security engineer, application-security engineer, build-security engineer.
- **B. Occupational identity:** engineering security into systems/apps.
- **C. Competency/skill:** secure coding, controls implementation, hardening, cloud/appsec — NICE work roles.
- **D. Canonical-career strength:** STRONG — build identity; the receiver of #47 vocabulary (Critical case 4).

### #43 Penetration Tester — `penetration-tester` · 06 · current · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | NICE/NIST SP 800-181 offensive work roles; industry certifications (e.g. OffSec) (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Offensive identity; NICE + certification ecosystem. |
| 10 | Duplicate/overlap | Distinct offensive-security identity. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **offensive/testing** identity: authorised exploitation, red-team engagement, vulnerability discovery — a distinct offensive body. |
| 13 | Distinct career if | The offensive/testing function remains distinct from build (#42) and monitor (#41) — NICE offensive work roles + certification ecosystem. |
| 14 | Merge/alias if | Not merged; distinct offensive identity (with a relation to #81 smart-contract-auditor's programmatic focus). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Penetration Tester remains separate — authorized offensive security assessment is a materially distinct competency centre (NICE + cert ecosystem). |

- **A. Title/market:** penetration tester, ethical hacker, red-team engineer.
- **B. Occupational identity:** authorised offensive security testing.
- **C. Competency/skill:** exploitation, web/network/appsec testing, tooling, reporting — NICE + OffSec.
- **D. Canonical-career strength:** STRONG — distinct offensive identity with cert ecosystem.

### #44 Security Architect — `security-architect` · 06 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | NICE/NIST SP 800-181; SFIA (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Design identity at security scope. |
| 10 | Duplicate/overlap | Design counterpart of #42 security-engineer / #41 analyst; relation to #65 solutions-architect. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The security **design** function: security architecture at system/enterprise scope — the design counterpart of build (#42). |
| 13 | Distinct career if | Security architecture remains a distinct design function from #42 (build) and #41 (monitor), consistent with the architecture separation used across the review (Critical case 2). |
| 14 | Merge/alias if | If security architecture were a seniority framing of #42 rather than a design function; SFIA/NICE distinguish architecture. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Security Architect remains separate — engineering implementation/operation (#42) differs from security architecture and design (#44). |

- **A. Title/market:** security architect, enterprise-security architect.
- **B. Occupational identity:** designing security architecture.
- **C. Competency/skill:** security architecture, control design, threat modelling at scope, standards-to-SFIA.
- **D. Canonical-career strength:** MODERATE-STRONG — the human must confirm design-vs-seniority split with #42 (Critical case 2).

### #45 Industrial Control Systems Security Engineer (OT/SCADA) — `ot-cybersecurity-engineer` · 06 · emerging · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | NICE/NIST SP 800-181 (critical-infrastructure work roles); industry market (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Regulatory (NIS2-style) OT/ICS security with real postings; emerging. |
| 10 | Duplicate/overlap | Specialised facet of #42 for operational technology; distinct risk profile; World 15 on-site boundary. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | OT/ICS/SCADA security — protecting operational technology (different risk profile from IT), regulator-driven (NIS2-style duties). |
| 13 | Distinct career if | OT/ICS security maintains a distinct risk profile and regulatory duty distinct from IT security engineering (#42) — NIS2 momentum + real postings (attention case: OT/Industrial Security). |
| 14 | Merge/alias if | If the OT security work were merely #42 applied to a domain; the distinct risk/regulatory profile argues `emerging` distinct, with a World 15 on-site boundary to ratify. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE (PROVISIONAL)** |
| 17 | Human notes | OT/Industrial Security provisionally retained as a specialist/emerging security domain (regulator-driven NIS2-style). Subject to profile-boundary validation — the profile must make the OT-vs-generic-enterprise-IT boundary explicit; World 15 on-site half to ratify. |

- **A. Title/market:** OT security engineer, ICS/SCADA security engineer, industrial-cyber engineer.
- **B. Occupational identity:** securing operational technology.
- **C. Competency/skill:** ICS protocols, Purdue-model zoning, OT asset/risk, NIS2-style duties — a specialised facet of #42.
- **D. Canonical-career strength:** MODERATE-STRONG `emerging` — distinct risk/regulatory profile; World 15 boundary to ratify.

### #46 Security Operations Centre Analyst (variant) — `soc-analyst` · 06 · current · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage; NICE/NIST SP 800-181 |
| 8 | Existing recommendation (AI) | ALIAS |
| 9 | Existing rationale | Monitoring arm of cybersecurity-analyst (L1-L3 tiers). |
| 10 | Duplicate/overlap | Near-duplicate of #41 within security operations. |
| 11 | Rel. to seed | **alias-of-seed** |
| 12 | Key occupational distinction | SOC monitoring/triage (L1–L3) — the monitoring arm of the #41 monitor/defend identity, not a different occupational body. |
| 13 | Distinct career if | Only if SOC operations had a function body distinct from #41 — NICE groups SOC roles under the analyst work role; evidence does not support a separate career (Critical case 1). |
| 14 | Merge/alias if | Because SOC L1–L3 monitoring is the operations vocabulary of #41; ALIAS keeps the tier structure findable without a competing identity. |
| 15 | Recommended human decision (AI) | **ALIAS** |
| 16 | Human decision | **ALIAS** |
| 17 | Human notes | SOC Analyst treated as an alias/specialization (L1–L3 monitoring arm of Cybersecurity Analyst), not a separate canonical career. |

- **A. Title/market:** SOC analyst, security operations analyst, tier-1/2/3 analyst.
- **B. Occupational identity:** continuous monitoring/triage within security operations.
- **C. Competency/skill:** SIEM monitoring, triage, escalation, alert handling — over the #41 analyst base.
- **D. Canonical-career strength:** WEAK as separate; STRONG as alias/operations vocabulary under #41 (Critical case 1).

### #47 Cloud Security Engineer (variant) — `cloud-security-engineer` · 06 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage |
| 8 | Existing recommendation (AI) | ALIAS |
| 9 | Existing rationale | Platform-flavoured vocabulary of security-engineer. |
| 10 | Duplicate/overlap | Alias of #42 security-engineer. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Cloud-platform security — the platform specialisation of security engineering (#42), not an occupational body (Critical case 4). |
| 13 | Distinct career if | Only if cloud-security had a function body distinct from #42 — T3 usage shows a platform specialisation, not a distinct occupation. |
| 14 | Merge/alias if | Because cloud-security is the cloud-platform vocabulary of #42; ALIAS keeps the term findable without a competing identity. |
| 15 | Recommended human decision (AI) | **ALIAS** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Human override of AI ALIAS recommendation — Cloud Security Engineer remains separate: cloud-native security represents a sufficiently developed technical specialization. |

- **A. Title/market:** cloud security engineer (AWS/Azure/GCP flavour).
- **B. Occupational identity:** securing cloud platforms — a specialisation of #42.
- **C. Competency/skill:** cloud security, CSPM/IAM-in-cloud, workload security — over the #42 base.
- **D. Canonical-career strength:** WEAK as separate; ALIAS under #42 (Critical case 4).

### #48 Threat Intelligence Analyst — `threat-intelligence-analyst` · 06 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | NICE/NIST SP 800-181; industry |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Research specialism with NICE work roles. |
| 10 | Duplicate/overlap | Distinct research specialisation. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **intelligence/research** function: threat-intel collection, analysis, TTP/tracking and reporting — a distinct research specialism. |
| 13 | Distinct career if | Threat-intel research stays distinct from monitor (#41) and build (#42) — NICE threat-intel work roles (attention case: Threat Intelligence). |
| 14 | Merge/alias if | Not merged; distinct research identity with NICE work roles. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Threat Intelligence remains separate — intelligence collection, analysis and adversary research represent a distinct competency centre (NICE threat-intel work roles). |

- **A. Title/market:** threat intelligence analyst, CTI analyst, threat researcher.
- **B. Occupational identity:** producing and operationalising threat intelligence.
- **C. Competency/skill:** intel collection/tradecraft, TTP/attribution analysis, IOC tracking, reporting.
- **D. Canonical-career strength:** MODERATE-STRONG — distinct research specialism (NICE).

### #49 Cryptographic Engineer — `cryptographic-engineer` · 06 · specialist · T4

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T4 · documented |
| 7 | Provenance/source | industry positions; academic/practitioner community (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Applied cryptography discipline; distinct (not cryptoassets). |
| 10 | Duplicate/overlap | Overlaps IAM (#50) at PKI half; not a duplicate; distinct from privacy-engineer (#83). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Applied cryptography engineering: cryptographic implementations, PKI, key management, secure protocols — distinct from cryptoassets (explicit naming note). |
| 13 | Distinct career if | Applied-cryptography engineering remains a distinct specialist engineering/research discipline (T4 documented roles, academic/practitioner body) (Critical case 6). |
| 14 | Merge/alias if | Not merged; the IAM (#50) PKI overlap is a relation. Distinct from the cryptographic/blockchain-asset world via the naming note. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Cryptography Engineer remains separate — cryptographic engineering has a specialized mathematical/security competency base (T4 documented; distinct from cryptoassets via naming note). |

- **A. Title/market:** cryptographic engineer, applied-cryptography engineer, PKI/crypto engineer.
- **B. Occupational identity:** engineering cryptographic systems.
- **C. Competency/skill:** crypto primitives/implementations, PKI, key management, secure protocol engineering.
- **D. Canonical-career strength:** MODERATE-STRONG — T4-documented engineering/research specialisation (Critical case 6).

### #50 Identity & Access Management Engineer — `identity-access-management-engineer` · 06 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | NICE/NIST SP 800-181 identity/access work roles; market evidence |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Identity specialism with NICE work roles. |
| 10 | Duplicate/overlap | Overlaps #42 security-engineer (authentication half) and #49 (PKI half). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **identity/access** function: IAM platforms, authentication/authorisation, identity lifecycle — a distinct specialism. |
| 13 | Distinct career if | IAM is a distinct functional specialism with NICE work roles and identity-platform body — separate from general security engineering (#42) (Critical case 5). |
| 14 | Merge/alias if | Not merged; the PKI overlap with #49 and any SSO-as-seniority framing are relations, not merges. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | IAM Engineer remains separate — identity, authentication, authorization and access-control engineering constitute a substantial technical discipline (NICE identity/access work roles). |

- **A. Title/market:** IAM engineer, identity engineer, access-management engineer.
- **B. Occupational identity:** engineering identity and access.
- **C. Competency/skill:** IAM platforms, SSO/MFA, RBAC/ABAC, identity lifecycle, directory services.
- **D. Canonical-career strength:** MODERATE-STRONG — distinct identity specialism (NICE) vs #42 (critical case 5).

### #51 Digital Forensics Analyst — `digital-forensics-analyst` · 06 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | NICE/NIST SP 800-181 forensics; ESCO (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Forensics/evidence identity; legal-adjacent. |
| 10 | Duplicate/overlap | Legal-adjacent technical identity; distinct. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **forensic/evidence** function: digital evidence collection, preservation, analysis and reporting — distinct from incident monitor (#41) and build (#42). |
| 13 | Distinct career if | Digital-forensics evidence work remains a distinct technical identity (NICE forensics + ESCO); legal-adjacent but technical (attention case: DR in cybersecurity). |
| 14 | Merge/alias if | Not merged; the legal-adjacency is a relation, not a move — it stays in World 01 as a technical identity (unless a legal-World pull is considered; not recommended). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Digital Forensics Analyst (#51) not explicitly listed in the recorded decision set; no override recorded — AI recommendation (APPROVE) carried unopposed as a distinct forensic/evidence identity. |

- **A. Title/market:** digital forensics analyst, forensic examiner, DFIR engineer (relative).
- **B. Occupational identity:** collecting and analysing digital evidence.
- **C. Competency/skill:** acquisition/imaging, forensic tooling, chain-of-custody, evidence analysis/reporting.
- **D. Canonical-career strength:** MODERATE-STRONG — distinct forensic evidence identity.

### #52 Security GRC Analyst — `grc-analyst` · 06 · specialist · T2

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T2 · industry-frame |
| 7 | Provenance/source | ISO/IEC 27001 practice; NICE/NIST SP 800-181 governance/risk work roles (+1) |
| 8 | Existing recommendation (AI) | DEFER |
| 9 | Existing rationale | Real but cross-World (World 10 governance) home ambiguous. |
| 10 | Duplicate/overlap | Overlaps #23 data-governance (03), #16 ai-governance (02) and World 10 governance. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Security **governance/risk/compliance**: ISO 27001/GRC practice binding security to governance, audit and regulatory compliance — distinct in function but with an ambiguous World home. |
| 13 | Distinct career if | The human must arbitrate its home: cybersecurity GRC (06) vs cross-world governance (World 10). If 06, GRC is a specialist; if World 10, it MOVE/DEFERs (Critical case 3). |
| 14 | Merge/alias if | It is not merged — the open question is *home*, not *existence*. Recommended DEFER pending World 10 editorial, or the human may assert a home now. |
| 15 | Recommended human decision (AI) | **DEFER** |
| 16 | Human decision | **APPROVE (PROVISIONAL)** |
| 17 | Human notes | GRC Analyst provisionally approved — governance, risk and compliance represent a distinct occupational function; eventual Career World home retained pending cross-World home arbitration (06 vs World 10). Do not create duplicate canonical identities for GRC/security-governance terminology. |

- **A. Title/market:** GRC analyst, security-grc analyst, ISO-27001/risk & compliance roles.
- **B. Occupational identity:** security governance/risk/compliance practice.
- **C. Competency/skill:** ISO 27001, risk assessment, control/compliance mapping, audit support.
- **D. Canonical-career strength:** REAL but boundary-undecided — DEFER pending World 10 editorial, or hold the arbitration (Critical case 3: GRC vs technical cybersecurity).

### #53 Quality Assurance Engineer — `quality-assurance-engineer` · 07 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ESCO; industry (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Canonical QA identity; absorbs SDET/performance vocabulary. |
| 10 | Duplicate/overlap | Canonical home for #54 SDET/test-automation vocabulary (merge candidate); #55 performance straddles QA/SRE. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The **quality** identity: test strategy, manual + automated testing, quality across the lifecycle — the single canonical QA occupation. |
| 13 | Distinct career if | It remains the canonical home for all testing vocabulary (#54 SDET, #55 performance) — the deliberate single-identity position in 07 (Critical case 7). |
| 14 | Merge/alias if | It does NOT merge; it is a receiver. The question is whether #54 (SDET/automation) stays MERGE or becomes a distinct specialist (Critical case 7). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | QA Engineer remains the canonical quality/testing career (T1); receiver of SDET (#54) as an alias/specialization. |

- **A. Title/market:** QA engineer, QA/tester, test engineer.
- **B. Occupational identity:** ensuring software quality through testing.
- **C. Competency/skill:** test design, manual + automation, quality gates, lifecycle QA.
- **D. Canonical-career strength:** STRONG — T1 canonical QA identity (attention case: QA Engineer vs SDET/Test Automation).

### #54 Software Development Engineer in Test (variant) — `sdet` · 07 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Coding-flavoured QA variant (automation specialisation). |
| 10 | Duplicate/overlap | Near-duplicate of #53 (automation flavour). |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Test automation / SDET — the coding-flavoured QA automation specialisation, not an occupational identity distinct from QA. |
| 13 | Distinct career if | Only if test-automation engineering were a distinct occupation body from #53 — T3 usage shows a coding specialisation, not a distinct function (Critical case 7). |
| 14 | Merge/alias if | Because SDET is test-automation vocabulary over #53; MERGE keeps it findable without a competing QA identity (the alternative, a distinct `specialist`, was flagged in doc 11 §G.3 for the human to choose). |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | **ALIAS** |
| 17 | Human notes | Human override of AI MERGE → ALIAS. Test Automation/SDET treated as an alias/specialization of QA Engineer (#53), not a separate canonical career. |

- **A. Title/market:** SDET, test automation engineer, QA engineer (automation).
- **B. Occupational identity:** automated testing of software — a coding specialisation of QA.
- **C. Competency/skill:** test frameworks, automation pipelines, test-code engineering — over the #53 base.
- **D. Canonical-career strength:** WEAK as separate; MERGE into #53 (Critical case 7; the batch's central quality decision).

### #55 Performance Engineer (variant) — `performance-engineer` · 07 · specialist · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | industry usage |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Straddles QA and SRE; niche. |
| 10 | Duplicate/overlap | Straddles #53 QA (performance testing) and #28 SRE (runtime perf). |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Performance engineering — straddles QA (performance testing) and SRE (runtime performance); a niche rather than a distinct occupation body. |
| 13 | Distinct career if | Only if performance engineering were a distinct body — T3 usage shows it spans QA and SRE; not a separate occupation (Critical case 8). |
| 14 | Merge/alias if | Because performance folds into #53 QA (performance testing) or #28 SRE (runtime perf) per function; MERGE by function is the documented resolution. |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Human override of AI MERGE → APPROVE. Performance Engineer remains separate — performance, scalability, load and system-behaviour engineering form a distinct technical competency centre; boundary relations to QA (#53) and SRE (#28) to be authored. |

- **A. Title/market:** performance engineer, performance-testing engineer.
- **B. Occupational identity:** performance/load testing (QA) + runtime perf (SRE) — a straddle.
- **C. Competency/skill:** load/soak testing, profiling, capacity perf — split across #53/#28.
- **D. Canonical-career strength:** WEAK as separate; MERGE by function (Critical case 8).

### #56 Accessibility Engineer — `accessibility-engineer` · 07 · emerging · T3

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T3 · market |
| 7 | Provenance/source | WCAG standards practice; market evidence |
| 8 | Existing recommendation (AI) | DEFER |
| 9 | Existing rationale | Cross-cutting (quality + UX + regulation); World 08 boundary. |
| 10 | Duplicate/overlap | Cross-cutting (#53 quality + UX + regulation, World 08). |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Digital/software accessibility (WCAG) — real but cross-cutting (engineering + UX + regulation), with a World 08 boundary. |
| 13 | Distinct career if | Only after World 08 editorial settles whether accessibility is a quality (07) or design/UX (08) identity; vocabulary is settling. |
| 14 | Merge/alias if | Deferred — the quality-vs-UX home is unresolved; do not pre-empt a World 08 decision. |
| 15 | Recommended human decision (AI) | **DEFER** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Accessibility Engineer (#56) not explicitly listed in the recorded decision set; no override recorded — AI recommendation (DEFER pending World 08 boundary) carried unopposed. |

- **A. Title/market:** accessibility engineer, a11y engineer, WCAG/accessibility specialist.
- **B. Occupational identity:** engineering digital accessibility (WCAG).
- **C. Competency/skill:** WCAG, accessibility testing/audit, inclusive design-engineering.
- **D. Canonical-career strength:** REAL but boundary-undecided — DEFER pending World 08 editorial (re-review trigger recorded in doc 12).

---

## Critical cases (evidence-based)

### Case 1 — Cybersecurity Analyst vs SOC Analyst (`#41` vs `#46`)

| Lens | Cybersecurity Analyst | SOC Analyst |
|---|---|---|
| A. Title/market | Cybersecurity analyst (T1) | SOC analyst (T3) |
| B. Occupational identity | Monitor/defend (seed) | SOC monitoring/triage (L1–L3) |
| C. Competency/skill | SIEM, detection/response, incident handling | SIEM monitoring, triage, escalation — a subset of the analyst role |

**D. Strong enough for separate careers?** NO. SOC monitoring/triage is the operations arm of the monitor/defend identity (#41); NICE groups SOC work under the analyst work role. Recommendation **ALIAS** #46 into #41 (seed canonical 4/5), keeping L1–L3 tier vocabulary findable without a competing identity. The human may optionally keep SOC as a distinct specialist, but the evidence favours ALIAS (**attention case: Cybersecurity Analyst vs SOC Analyst**).

### Case 2 — Security Engineer vs Security Architect (`#42` vs `#44`)

| Lens | Security Engineer | Security Architect |
|---|---|---|
| A. Title/market | Security engineer (T2) | Security architect (T2) |
| B. Occupational identity | Build/engineer security controls | Design security architecture |
| C. Competency/skill | Secure coding, controls implementation, hardening | Architecture, control design, threat modelling at scope |

**D. Strong enough for separate careers?** YES — the build/design split, consistent with the architecture separation used across Batches 1–2 (Cloud vs Infra, Data Architect, Network Engineer vs Architect). #44 is a design function, not a seniority label of #42. Recommendation **APPROVE** both, with #47 (cloud-security) aliasing into #42 (**attention case: Security Engineer vs Security Architect**).

### Case 3 — GRC vs technical cybersecurity (`#52` GRC vs #41/#42/#43)

| Lens | Security GRC | Technical Cybersecurity |
|---|---|---|
| A. Title/market | GRC / ISO-27001 / risk-compliance roles | Analyst/engineer/tester |
| B. Occupational identity | Governance/risk/compliance of security | Monitoring, building, testing security controls |
| C. Competency/skill | ISO 27001, risk, compliance/audit | SIEM, controls, exploitation |

**D. Strong enough for separate careers?** GRC is a real *function*, but its **career home is ambiguous** — it sits at the junction of security-governance (06) and cross-world governance (World 10), and relates to data-governance (#23, 03) and AI-governance (#16, 02). The human must arbitrate **home** (06 vs World 10), or **DEFER** pending the World 10 editorial (OpenCode recommendation). GRC is **not a duplicate of the technical roles** — it differs by function (governance vs engineering) — so the question is placement, not existence (**attention case: GRC vs technical cybersecurity**).

### Case 4 — Cloud Security vs Security Engineer (`#47` vs `#42`)

| Lens | Cloud Security Engineer | Security Engineer |
|---|---|---|
| A. Title/market | Cloud security engineer (T3) | Security engineer (T2) |
| B. Occupational identity | Cloud-platform security | Security engineering generally |
| C. Competency/skill | Cloud security, CSPM, workload security | Controls, secure coding, hardening — superset |

**D. Strong enough for separate careers?** NO. Cloud-security is the cloud-platform specialisation of #42's body; recommendation **ALIAS** #47 into #42 (**attention case: Cloud Security vs Security Engineer**).

### Case 5 — IAM as a distinct occupational identity (`#50` vs `#42`)

| Lens | IAM Engineer | Security Engineer |
|---|---|---|
| A. Title/market | IAM/identity engineer (T2) | Security engineer (T2) |
| B. Occupational identity | Identity & access engineering | General security engineering |
| C. Competency/skill | IAM platforms, SSO/MFA, RBAC/ABAC | Controls, secure code, hardening |

**D. Strong enough for a distinct career?** YES. IAM has its own NICE work roles, identity-platform body, and a distinct function (identity lifecycle/access governance) separable from general security engineering (#42). The PKI overlap with #49 is a relation. Recommendation **APPROVE** #50 as a distinct specialist (**attention case: IAM as a distinct occupational identity**).

### Case 6 — Cryptography as an engineering/research specialisation (`#49`)

| Lens | The question | Assessment |
|---|---|---|
| A. Title/market | Cryptographic/Applied-crypto engineer | Real T4 documented roles |
| B. Occupational identity | Engineering cryptographic systems | Distinct from crypto-asset blockchain speculation |
| C. Competency/skill | Crypto implementations, PKI, key mgmt | A real engineering/research body (academic/practitioner) |

**D. Strong enough for a separate career?** YES — as an engineering/research specialisation (T4 documented positions, academic/practitioner community), distinct from the crypto-*asset* blockchain world (explicit naming note) and from privacy-engineering (#83) via relation. Recommendation **APPROVE** #49 (**attention case: Cryptography as an engineering/research specialisation**).

### Case 7 — QA Engineer vs SDET/Test Automation (`#53` vs `#54`)

| Lens | QA Engineer | SDET / Test Automation |
|---|---|---|
| A. Title/market | QA engineer (T1 national) | SDET, test-automation engineer (T3) |
| B. Occupational identity | Quality through testing (manual + automated) | Coding test automation |
| C. Competency/skill | Test design, quality gates, lifecycle QA | Automation frameworks, test-code engineering — a coding specialisation of QA |

**D. Strong enough for separate careers?** NO — logic of the deliberate 07-leanness position. #53 is the single canonical QA occupation (T1); #54 SDET is the coding-automation specialisation. Recommendation **MERGE** #54 into #53. **Explicit alternative for the human:** keep SDET as a distinct `specialist` career if breadth is preferred (flagged in doc 11 §G.3 as the natural breadth addition). Both options are legitimate; the evidence favours MERGE, the alternative is kept distinct-able (**attention case: QA Engineer vs SDET/Test Automation**).

### Case 8 — Performance Engineer (`#55`)

| Lens | Assessment |
|---|---|
| A/B/C | Performance engineering straddles QA (#53, performance testing) and SRE (#28, runtime performance) |
| D | WEAK as a separate occupation; MERGE by function — fold into #53 (perf testing) or #28 (runtime perf) per the actual function |

**D. Strong enough for a separate career?** NO. T3 usage shows a straddle, not a distinct body. Recommendation **MERGE** (**attention case: Performance Engineer**).

### Case 9 — Release Engineer vs DevOps (context)

The **Release Engineer** candidate (#31) was adjudicated in **Batch 2 / 04-devops** as a documented MERGE into DevOps (#27) — release automation is a delivery sub-practice, not a separate occupation. It is *not* a quality-cluster item. In the Batch 3 quality context, the relevant overlap is **release/test-management vocabulary over QA** — i.e., a QA release-verification strand that stays within #53 QA, not a new career. This page preserves that Batch 2 resolution rather than re-opening it.

---

## Batch 3 summary at a glance

| # | Name | Cluster | Status | Evidence | Recommendation (AI) | Human decision |
|---|---|---|---|---|---|---|
| 41 | Cybersecurity Analyst | 06 | current | T1 | APPROVE | **APPROVE** |
| 42 | Security Engineer | 06 | current | T2 | APPROVE | **APPROVE** |
| 43 | Penetration Tester | 06 | current | T2 | APPROVE | **APPROVE** |
| 44 | Security Architect | 06 | specialist | T2 | APPROVE | **APPROVE** |
| 45 | OT/Industrial Control Systems Security Engineer | 06 | emerging | T3 | APPROVE | **APPROVE (PROVISIONAL)** |
| 46 | SOC Analyst | 06 | current | T3 | ALIAS | **ALIAS** |
| 47 | Cloud Security Engineer | 06 | specialist | T3 | ALIAS | **APPROVE** (override) |
| 48 | Threat Intelligence Analyst | 06 | specialist | T2 | APPROVE | **APPROVE** |
| 49 | Cryptographic Engineer | 06 | specialist | T4 | APPROVE | **APPROVE** |
| 50 | Identity & Access Management Engineer | 06 | specialist | T2 | APPROVE | **APPROVE** |
| 51 | Digital Forensics Analyst | 06 | specialist | T2 | APPROVE | — (no override; APPROVE carried) |
| 52 | Security GRC Analyst | 06 | specialist | T2 | DEFER (home arbitration) | **APPROVE (PROVISIONAL)** |
| 53 | Quality Assurance Engineer | 07 | current | T1 | APPROVE | **APPROVE** |
| 54 | SDET | 07 | specialist | T3 | MERGE (alt: distinct specialist) | **ALIAS** (override) |
| 55 | Performance Engineer | 07 | specialist | T3 | MERGE | **APPROVE** (override) |
| 56 | Accessibility Engineer | 07 | emerging | T3 | DEFER | — (no override; DEFER carried) |

> **Post-decision note:** the three deliberate arbitration points resolved as follows —
> **(1)** Security GRC (#52) provisionally approved as a distinct occupational function, with its Career World
> home retained pending cross-World arbitration (06 vs World 10); **(2)** SDET (#54) resolved to **ALIAS** into QA
> (rather than MERGE, and rather than the flagged distinct-specialist alternative); **(3)** Cloud Security (#47)
> and Performance Engineer (#55) were **APPROVED as separate** (overriding the AI ALIAS/MERGE) — cloud-native
> security and performance/load engineering judged sufficiently developed distinct specializations. Rows
> #51/#56 received no explicit decision and carry their documented APPROVE/DEFER resolutions.

> **Insufficient-evidence note (explicit):** no Batch 3 candidate rests on T5 predictive provenance; the
> four `emerging`/T3 items carry real documented/market basis (OT #45 T3+NICE, accessibility #56 T3+WCAG).
> The security and quality clusters are well-evidenced (T1–T4); no gap is filled by assumption.

---

## Recorded human decisions and rationale (2026-09-01)

These decisions are **human**, recorded in column 16; they are visibly distinct from the column-15 AI recommendations (which are unchanged).

| # | Name | Human decision | Human rationale (as recorded) |
|---|---|---|---|
| 41 | Cybersecurity Analyst | APPROVE | Core defensive analysis occupational identity (seed 4/5). (Rationale 1) |
| 46 | SOC Analyst | ALIAS | Alias/specialization (L1–L3 monitoring arm of #41), not a separate canonical career. (Rationale 2) |
| 43 | Penetration Tester | APPROVE | Remains separate — authorized offensive security assessment is a materially distinct competency centre. (Rationale 3) |
| 42/44 | Security Engineer / Security Architect | APPROVE | Both remain separate — engineering implementation/operation differs from security architecture and design. (Rationale 4) |
| 48 | Threat Intelligence Analyst | APPROVE | Remains separate — intelligence collection, analysis and adversary research represent a distinct competency centre. (Rationale 5) |
| 49 | Cryptography Engineer | APPROVE | Remains separate — cryptographic engineering has a specialized mathematical/security competency base. (Rationale 6) |
| 52 | GRC Analyst | APPROVE (PROVISIONAL) | Governance, risk and compliance represent a distinct occupational function; eventual Career World home retained pending cross-World arbitration. (Rationale 7) |
| 47 | Cloud Security Engineer | APPROVE | Remains separate (override of AI ALIAS) — cloud-native security is a sufficiently developed technical specialization. (Rationale 8) |
| 50 | IAM Engineer | APPROVE | Remains separate — identity, authentication, authorization and access-control engineering constitute a substantial technical discipline. (Rationale 9) |
| 45 | OT/Industrial Security | APPROVE (PROVISIONAL) | Provisionally retained — operational-technology security is materially different from generic enterprise IT; the profile must make that boundary explicit. (Rationale 10) |
| 53 | QA Engineer | APPROVE | Remains the canonical quality/testing career. (Rationale 11) |
| 54 | SDET / Test Automation | ALIAS | Treated as an alias/specialization, not a separate canonical career. (Rationale 12) |
| 55 | Performance Engineer | APPROVE | Remains separate (override of AI MERGE) — performance, scalability, load and system-behaviour engineering form a distinct technical competency centre. (Rationale 13) |
| 31 | Release Engineer | MERGE | Merged into the DevOps/platform engineering family, not a separate canonical career. (Rationale 14) |

### Editorial notes on Batch 3

- **Release Engineer** — the Batch 3 decision specifies MERGE into the **DevOps/platform engineering family**. This maps to the Batch 2/04 candidate #31 (already documented MERGE into DevOps #27); the Batch 3 instruction is consistent with and confirms that resolution. No new candidate is created.
- **Additional GRC/security-governance terminology** — where the research analysis identifies further GRC/security-governance terminology, the documented **DEFER / HOME-ARBITRATION** resolution is preserved; no duplicate canonical identities are created.
- **Standing rule (Rationale 15), carried through all batches:** different job titles do not automatically constitute different canonical careers.

---

*End of Document 15 (Batch 3 adjudicated — human decisions recorded 2026-09-01). No inventory, seed, or production data modified; no canonical IDs created.*
