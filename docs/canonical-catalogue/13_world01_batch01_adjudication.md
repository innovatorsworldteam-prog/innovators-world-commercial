# World 01 — Batch 1 Adjudication Sheet (Software Engineering + AI)

**Document 13 / 10** — Phase 5 deliverable: human editorial decision sheet, **Batch 1 only**.
Status: **Batch 1 human decisions RECORDED (2026-09-01). Columns 16/17 filled below. Not an import file.**

- **Date:** 2026-09-01
- **Review baseline:** `docs/canonical-catalogue/12_world01_editorial_review.md` (accepted, `commit d8b8df5`)
- **Source of record:** `src/data/canonical/worlds/world-01/candidate-inventory.json` (`commit 8012d0a`, **unchanged**)
- **Scope:** all candidates in `01-software-engineering` and `02-ai-machine-learning` (18 records, review #1–#18)
- **Rules:** column 15 ("Recommended human decision") is **only** the existing OpenCode recommendation — it is not a decision. The human decides in column 16. No canonical IDs, no imports, no inventory edits.

> Provenance, evidence tiers and the existing recommendation/rationale are carried over from Documents 11–12.
> No new research was performed. Where the inventory basis is thin, this sheet says so rather than assuming.

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

Each candidate sheet adds an evidence-oriented decomposition:

- **A. Job title / market terminology** — the label the market uses
- **B. Occupational identity** — the actual function/content of the work
- **C. Competency/skill identity** — the distinctive body of knowledge
- **D. Canonical-career strength** — is A/B/C a separate Innovators World career, or vocabulary over another identity?

---

## Names in scope that are vocabulary, not separate records

These names from the brief are **not** separate candidates. They are titles captured under an existing candidate's vocabulary (per `source_term_variants`):

| Name in brief | Covered by candidate |
|---|---|
| Computer Vision Specialist | #12 `computer-vision-engineer` |
| NLP Specialist | #13 `nlp-engineer` |
| MLOps | #14 `mlops-engineer` |
| Responsible AI / AI Governance, AI Ethics Researcher | #16 `ai-governance-specialist` (AI ethics officer / AI auditor / AI compliance manager are its variants) |
| AI Ethics Researcher | #16 (research-flavoured variant of the governance identity, not a separate career) |

> **Human decision (2026-09-01):** "AI Ethics Researcher" → **MERGE into Responsible AI / AI Governance** — it becomes vocabulary, not a second canonical identity.

---

## Candidate sheets

### #1 Software Developer — `software-developer` · 01 · current · T1

| # | Field | Value |
|---|---|---|
| 6 | Evidence status | T1 · national-class |
| 7 | Provenance/source | ONS SOC 2020; BLS OOH; ESCO; O\*NET (+3) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Broadest established technology occupation; T1 classification; core canonical identity. |
| 10 | Duplicate/overlap | Anchor identity; Web Developer (#7) and Mobile App Developer (#8) resolve as aliases into it. |
| 11 | Rel. to seed | **seed** (seed canonical 1/5) |
| 12 | Key occupational distinction | General application-software construction across the full stack — the baseline application-engineering identity, above and below the OS layer and apart from vertically specialised domains. |
| 13 | Distinct career if | It remains the anchor canonical identity; absorbing stack/platform vocabulary (web/frontend/backend/full-stack/mobile) in its alias set. Nothing else can serve as the merge target. |
| 14 | Merge/alias if | N/A — it IS the merge target; the question is which titles resolve here, not whether it resolves elsewhere. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Seed canonical 1/5 approved as anchor. Note ripple: Mobile App Developer (#8) is APPROVED as a distinct specialist, so mobile vocabulary no longer folds in here; Web Developer (#7) remains ALIAS into this identity. |

- **A. Title/market:** ubiquitous; covers web/frontend/backend/full-stack/mobile application titles.
- **B. Occupational identity:** application software engineering, generalised.
- **C. Competency/skill:** programming languages, software design, delivery of software products.
- **D. Canonical-career strength:** STRONG — the anchor; without it the alias vocabulary has no home.

### #2 Game Developer — `game-developer` · 01 · specialist · T2

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | industry labour reports; university game-programming curricula (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct body (engines, real-time, tools) with own industry. |
| 10 | Duplicate/overlap | Genuinely distinct specialisation of software development; boundary with #5 computer-graphics at engine level. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Game engines, real-time loops, rendering/tooling pipelines, performance constraints and platform certification — a self-contained industry body. |
| 13 | Distinct career if | Its engine/real-time stack and industry pipelines remain distinct from general application engineering. |
| 14 | Merge/alias if | Only narrow specialisation titles (e.g., specific-engine roles) would be aliases; the career itself fails the distinct test only if treated as "just software development in a domain" — rejected here on T2 industry-frame evidence. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Game Developer approved as distinct specialist; boundary with #5/XR managed via relations, not duplicates. |

- **A. Title/market:** game developer / game programmer / gameplay engineer.
- **B. Occupational identity:** interactive real-time software engineering.
- **C. Competency/skill:** engines (Unreal/Unity), graphics math, physics, tooling, platform compliance.
- **D. Canonical-career strength:** STRONG — own industry, own curriculum, own body.

### #3 Embedded Systems Engineer — `embedded-systems-engineer` · 01 · current · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | KORE1 embedded-engineering hiring data (2026); Glassdoor role segmentation (+2) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Established device-software function with firm 2026 hiring profile. |
| 10 | Duplicate/overlap | Boundary vs #4 systems-software-engineer (OS/toolchain vs device software); firmware sub-roles are aliases. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Software for constrained devices: real-time behaviour, memory limits, hardware-register programming, board bring-up, RTOS/bare-metal. |
| 13 | Distinct career if | Device-constrained, hardware-adjacent software remains a separate function from general application development (#1) — T3 market segmentation and 2026 hiring evidence support this. |
| 14 | Merge/alias if | Only firmware/device-driver *variants* are aliases; merging the whole career into #1 would collapse the device-software function into application engineering. Not recommended. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Device-software function confirmed distinct from #1; firmware/device-driver variants remain aliases into this identity. |

- **A. Title/market:** embedded, firmware, embedded-software, device-driver roles.
- **B. Occupational identity:** software embedded into hardware products.
- **C. Competency/skill:** C/C++, RTOS, hardware interfaces, real-time constraints, cross-compilation.
- **D. Canonical-career strength:** STRONG — distinct constraint profile and hiring segmentation.

### #4 Systems Software Engineer — `systems-software-engineer` · 01 · specialist · T2

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | IEEE/ACM Computing Curricula systems area; industry tooling organisations and conferences |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct low-level discipline (OS/toolchain). |
| 10 | Duplicate/overlap | Boundary vs #3 embedded-systems-engineer (OS/toolchain vs device software); overlaps senior backend of #1 at the application-interface edge. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Operating systems, kernels, language runtimes, compilers, toolchains and platform infrastructure shipped as software products. |
| 13 | Distinct career if | Systems/platform software remains distinct from application software and from device software — an ACM/IEEE-recognised discipline area with its own tooling community. |
| 14 | Merge/alias if | If treated as a seniority/grads label over #1; it is not — the discipline body is different. Merge only of *sub-titles* (e.g., runtime engineer into it), not of the career. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Distinct systems-level discipline confirmed; OS/toolchain boundary vs #3 embedded, backend-overlap vs #1 is a relation. |

- **A. Title/market:** systems engineer, platform-software engineer, compilers/runtime roles.
- **B. Occupational identity:** the software that hosts other software (OS, runtimes, toolchains).
- **C. Competency/skill:** OS internals, compilers, concurrency, performance, portability.
- **D. Canonical-career strength:** STRONG — distinct discipline body (see Critical case 8).

### #5 Computer Graphics Engineer — `computer-graphics-engineer` · 01 · specialist · T2

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | ACM SIGGRAPH (professional body); industry positions (film/VFX, chip vendors, software vendors) (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct rendering/GPU discipline with industry ecosystem. |
| 10 | Duplicate/overlap | Boundary with #2 game-developer at engine level; relation with #71 xr-developer (not a duplicate). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Rendering pipelines, GPU/geometry/shader programming, real-time and offline graphics foundations independent of any single end-user product. |
| 13 | Distinct career if | The rendering/GPU foundation remains a discipline in its own right (SIGGRAPH ecosystem, chip-vendor teams, film/VFX). |
| 14 | Merge/alias if | Specific *application* graphics roles (e.g., in-engine graphics programmer) are aliases of #2/#5 edges; the discipline body is not merged. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Not explicitly listed in the recorded decision set; no override recorded — AI recommendation (APPROVE) carried unopposed pending confirmation. |

- **A. Title/market:** graphics programmer, render engineer, GPU engineer.
- **B. Occupational identity:** the computational imaging foundation under games, film/VFX, XR and tools.
- **C. Competency/skill:** linear algebra, raster/ray-tracing pipelines, shaders, GPU APIs.
- **D. Canonical-career strength:** STRONG — boundary-to-games is a relation, not a duplicate.

### #6 Developer Relations Engineer — `developer-relations-engineer` · 01 · specialist · T4

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | documented positions at major platform companies; industry practitioner community |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Real recurring technical function with engineering tooling identity. |
| 10 | Duplicate/overlap | Boundary consideration: communication-heavy roles could claim World 09; primary function is engineering tooling. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Building and maintaining the *developer-facing tooling and SDK experience* for a product; advocacy is a vehicle, engineering is the core. |
| 13 | Distinct career if | The tooling/SDK engineering function remains separable from marketing-communication roles (World 09). T4 documented positions support inclusion. |
| 14 | Merge/alias if | If the role were primarily communication/content (then World 09), or merely a seniority of #1. Evidence says tooling-first; keep in World 01. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | — (not given) |
| 17 | Human notes | Not explicitly listed in the recorded decision set; no override recorded — AI recommendation (APPROVE) carried unopposed pending confirmation. World-01 vs World-09 boundary still to ratify. |

- **A. Title/market:** developer advocate, devrel engineer.
- **B. Occupational identity:** engineering the developer experience of a platform (docs-as-code, SDKs, samples, tooling).
- **C. Competency/skill:** platform APIs, SDK authoring, technical writing/code, community engineering.
- **D. Canonical-career strength:** MODERATE-STRONG — real but small; its World-01 vs World-09 boundary is the ratify point.

### #7 Web Developer (variant) — `web-developer` · 01 · current · T1

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | ONS SOC 2020 separate unit groups; industry usage |
| 8 | Existing recommendation (AI) | ALIAS |
| 9 | Existing rationale | Stack-focused terminology variant of software-developer. |
| 10 | Duplicate/overlap | Alias of #1; has a T1 unit-group classification of its own but no distinct function body. |
| 11 | Rel. to seed | **alias-of-seed** |
| 12 | Key occupational distinction | Frontend/backend/full-stack web delivery — a *channel* within application engineering, not a different occupation. |
| 13 | Distinct career if | Only if web engineering had a function body distinct from general application engineering; the evidence (market usage, same competency stack) does not support this. |
| 14 | Merge/alias if | Because web/frontend/backend/full-stack are the primary vocabulary of #1 in the market; an ALIAS preserves search/SEO without a competing identity. |
| 15 | Recommended human decision (AI) | **ALIAS** |
| 16 | Human decision | **ALIAS** |
| 17 | Human notes | ALIAS confirmed — web/frontend/backend/full-stack vocabulary resolves under Software Developer; no second canonical career. |

- **A. Title/market:** web developer, frontend/backend engineer, full-stack developer.
- **B. Occupational identity:** application software delivered over the web.
- **C. Competency/skill:** web tech (HTML/CSS/JS, frameworks, web servers/APIs) — a specialisation *within* software development.
- **D. Canonical-career strength:** WEAK as a separate career — STRONG as alias vocabulary (see Critical case 6).

### #8 Mobile Application Developer (variant) — `mobile-app-developer` · 01 · specialist · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | industry usage; market posting terminology |
| 8 | Existing recommendation (AI) | ALIAS |
| 9 | Existing rationale | Platform-focused variant of software-developer. |
| 10 | Duplicate/overlap | Alias of #1; alternative "distinct specialist" resolution flagged in the inventory. |
| 11 | Rel. to seed | **alias-of-seed** |
| 12 | Key occupational distinction | Platform-specific development (iOS/Android/cross-platform) — a platform axis, not a distinct occupation body. |
| 13 | Distinct career if | If platform certification, store economics and OS-specific engineering were judged a distinct body rather than a specialisation. Defensible, but weaker than the alias reading. |
| 14 | Merge/alias if | Because it is the same application-engineering competency applied to a platform; ALIAS keeps the vocabulary findable under #1. |
| 15 | Recommended human decision (AI) | **ALIAS** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Human override of AI ALIAS recommendation — Mobile App Developer approved as a distinct specialist canonical career (platform engineering body, iOS/Android/cross-platform). #1 alias set reverts accordingly. |

- **A. Title/market:** iOS/Android/mobile developer, cross-platform engineer.
- **B. Occupational identity:** application software developed for mobile platforms.
- **C. Competency/skill:** Swift/Kotlin/React Native, app lifecycle, store distribution — over the #1 foundation.
- **D. Canonical-career strength:** WEAK-ALIAS (flag: keep-discrete-alt is the explicit alternative for the human to choose).

### #9 AI Engineer — `ai-engineer` · 02 · current · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | 2026 AI-engineering hiring analyses; State of AI reports (+2) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Dominant 2026 AI hiring category; distinct from ML Engineer (foundation-model product integration). |
| 10 | Duplicate/overlap | Complementary to #10 (ships products on foundation models vs trains/operates custom models) and #11 (statistics/experimentation); absorbs #13 NLP and #17 Prompt vocabulary. |
| 11 | Rel. to seed | **seed** (seed canonical 2/5) — recommended status upgrade `emerging → current` |
| 12 | Key occupational distinction | Product engineering on model-capable systems: integrating foundation models, RAG/context engineering, evaluation, guardrails, agent pipelines. |
| 13 | Distinct career if | Its foundation-model product-engineering body remains distinct from model-building (#10), statistics (#11) and ML-platform ops (#14). 2026 role-segmentation evidence supports this. |
| 14 | Merge/alias if | A single "AI/ML Engineer" could absorb it (explicit alternative in doc 11 §G.3); recommended against on 2026 segmentation evidence. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Seed canonical 2/5 approved; AI Engineer and ML Engineer remain separate careers (materially different competency centres); status upgrade `emerging → current` endorsed. |

- **A. Title/market:** AI engineer; LLM/GenAI engineer; applied-AI roles.
- **B. Occupational identity:** shipping AI-powered products off existing models/APIs.
- **C. Competency/skill:** prompt/context engineering, RAG, evaluation, model APIs, guardrails, agent orchestration.
- **D. Canonical-career strength:** STRONG — distinct from MLE/DS in function (Critical cases 1, 3).

### #10 Machine Learning Engineer — `machine-learning-engineer` · 02 · current · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | 2026 AI vs ML role-segmentation market research; State of AI reports (+2) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct model-training/ops function; complementary pair with AI Engineer. |
| 10 | Duplicate/overlap | Complementary pair with #9; not a duplicate. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Building, training and operating bespoke ML models and their pipelines (data, training, evaluation, serving). |
| 13 | Distinct career if | Trained-model development/operations stays separable from foundation-model product integration (#9). |
| 14 | Merge/alias if | Only under the explicit single "AI/ML Engineer" alternative (rejected on evidence). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Separate from AI Engineer confirmed — distinct model-training/ops competency centre; complementary pair with #9. |

- **A. Title/market:** ML engineer, MLE, applied-ML engineer.
- **B. Occupational identity:** the engineering half of model construction and productionisation.
- **C. Competency/skill:** model training/selection, feature engineering, distributed training, serving, evaluation.
- **D. Canonical-career strength:** STRONG — the trained-model counterpart to AI Engineer (Critical cases 1, 3).

### #11 Data Scientist — `data-scientist` · 02 · current · T1

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | BLS Occupational Outlook Handbook; ESCO (+2) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Statistics/experimentation identity; T1 classification. |
| 10 | Duplicate/overlap | Overlaps #9/#10 at evaluation/experimentation boundaries; distinct statistical remit. |
| 11 | Rel. to seed | **seed** (seed canonical 3/5) |
| 12 | Key occupational distinction | Statistical analysis, experimentation and hypothesis-driven insight — the measurement identity, vs engineering identities that ship products/models. |
| 13 | Distinct career if | Measurement/experimentation remains separable from model-engineering and AI-product function; T1 nationally classified. |
| 14 | Merge/alias if | If the boundary with #9/#10 became indistinguishable (currently distinct; explicit `career_relations` to author at import). |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Seed canonical 3/5 approved — statistical/analytical/modeling work is a distinct competency centre; boundaries with #9/#10 via `career_relations`. |

- **A. Title/market:** data scientist, applied statistician, research analyst.
- **B. Occupational identity:** turning data into decisions/insight through statistics and experimentation.
- **C. Competency/skill:** statistics, experimental design, data analysis, modelling-for-inference.
- **D. Canonical-career strength:** STRONG — T1 identity, distinct function (Critical case 3).

### #12 Computer Vision Engineer — `computer-vision-engineer` · 02 · specialist · T2

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | industry positions; ACM/IEEE computer vision (+1) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Stable specialist discipline; robotics boundary via relations. |
| 10 | Duplicate/overlap | Overlaps #72 robotics at perception boundary (relation, not duplicate). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Perception: image/video understanding, 3D reconstruction, object detection/tracking — a specialist discipline with its own conferences/curricula. |
| 13 | Distinct career if | Perception engineering remains a specialist band distinct from general AI product engineering (#9) — ACM/IEEE discipline basis. |
| 14 | Merge/alias if | Only narrow *task* titles (e.g., detection-engineer) are aliases; the discipline is not merged. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Computer Vision Specialist approved — perception/imaging technical competency domain sufficiently differentiated; boundary with #72 via relation. |

- **A. Title/market:** computer-vision engineer, perception engineer.
- **B. Occupational identity:** the visual/AI perception function.
- **C. Competency/skill:** image processing, deep-vision models, cameras/calibration, real-time inference.
- **D. Canonical-career strength:** STRONG — specialist band with clear boundary relations.

### #13 NLP Engineer (variant) — `nlp-engineer` · 02 · specialist · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | 2026 AI-hiring analyses; market posting terminology |
| 8 | Existing recommendation (AI) | MERGE |
| 9 | Existing rationale | Largely absorbed by AI/ML-engineering pipeline roles (LLM era). |
| 10 | Duplicate/overlap | Near-duplicate of #9/#10; speech/ASR niche retained as a specialisation note. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | Historically (statistical NLU, classical NLP pipelines) separable; post-LLM the function is dominated by foundation-model engineering — the AIE/MLE stack. |
| 13 | Distinct career if | Only if pre-LLM classical-NLP work (custom taggers, ASR/voice) were large enough and distinct from #9/#10; market evidence does not support a separate career now. |
| 14 | Merge/alias if | Because NLP engineering now sits on the same foundation-model stack as #9/#10; the speech/ASR niche survives as a specialisation note/alias. |
| 15 | Recommended human decision (AI) | **MERGE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | Human override of AI MERGE recommendation — NLP Specialist approved as a separate specialist career; language-technology competency domain sufficiently differentiated (incl. speech/ASR niche). |

- **A. Title/market:** NLP engineer, NLU engineer, LLM/GenAI roles (overlapping #9).
- **B. Occupational identity:** language-model/Text AI engineering.
- **C. Competency/skill:** transformers, embeddings, fine-tuning, speech/ASR — increasingly inside #9/#10.
- **D. Canonical-career strength:** WEAK as standalone post-LLM — vocabulary over #9/#10.

### #14 MLOps Engineer — `mlops-engineer` · 02 · emerging · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | 2026 ML-hiring analyses (MLOps keywords in MLE postings); industry platform roles |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Distinct ML-platform/ops function; keep emerging. |
| 10 | Duplicate/overlap | Overlaps #10 (ops half) and 04 platform engineering (ML-specific side). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | The ML delivery platform: pipelines, feature stores, experiment tracking, model registry, monitoring — ML-flavoured platform engineering (overlaps 04 with an ML-specific intent). |
| 13 | Distinct career if | Keeping the ML-specific platform function distinct from general platform engineering (04) is defensible for an ML-heavy employer; evidence is T3 with real posting keywords. |
| 14 | Merge/alias if | If the Ops half collapses into #10 or the platform half into 04 -- recommended against on ML-domain-specificity and 2026 keyword evidence. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | MLOps approved as separate career — primary occupational identity is the AI/ML production lifecycle (infrastructure, deployment, monitoring, operational reliability); boundary vs 04 platform engineering to rut at import. |

- **A. Title/market:** MLOps, ML platform engineer (frequently appearing inside MLE postings now).
- **B. Occupational identity:** production machine-learning platform and lifecycle.
- **C. Competency/skill:** pipeline orchestration, feature/platform infra, monitoring/retraining, ML/CI-CD.
- **D. Canonical-career strength:** MODERATE-STRONG, `emerging` — boundary vs 04 is the ratify point (Critical case 2).

### #15 AI Research Scientist — `ai-research-scientist` · 02 · current · T4

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | documented positions (industry research labs, universities); ACM/IEEE |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Research identity staffed continuously in labs/academia. |
| 10 | Duplicate/overlap | Distinct from engineering identities (research output vs shipped product). |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Original research output (papers, proofs, novel architectures) in industry labs and academia — publication/novelty identity vs product-shipping. |
| 13 | Distinct career if | The research-output function remains distinct from engineering delivery — T4 documented lab/academic positions. |
| 14 | Merge/alias if | If research-permitting roles were indistinguishable from #9; evidence shows distinct research-lab identity. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE** |
| 17 | Human notes | AI Research Scientist approved — research is a distinct occupational track (output/publication vs shipped product); T4 lab/academic positions support it. |

- **A. Title/market:** AI researcher, research scientist, research engineer (latter = applied alias edge).
- **B. Occupational identity:** advancing the science of AI.
- **C. Competency/skill:** novel-problem research, experimentation-to-publication, review.
- **D. Canonical-career strength:** STRONG — distinct function (research vs engineering split).

### #16 AI Governance & Responsible AI Specialist — `ai-governance-specialist` · 02 · emerging · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | EU AI Act (2024 Regulation, phased duties); Axipro analysis of 3,519 governance-hire postings across 8 EU countries (+2) |
| 8 | Existing recommendation (AI) | APPROVE |
| 9 | Existing rationale | Regulator-driven (EU AI Act / ISO 42001) real governance-hiring category. |
| 10 | Duplicate/overlap | Overlaps #23 data-governance (03) and #52 security GRC (06); relations to be authored. |
| 11 | Rel. to seed | related |
| 12 | Key occupational distinction | Conformity/risk governing AI systems (EU AI Act duties, ISO/IEC 42001, responsible-AI practice) — a governance function over AI, distinct from engineering delivery. |
| 13 | Distinct career if | The regulatory duty (EU AI Act phased obligations) creates a real, growing governance-hiring category — quantified by the Axipro 3,519-posting analysis. |
| 14 | Merge/alias if | Vocabulary merge of AI ethics officer / AI auditor / AI compliance manager into this identity (they are variants, not careers). The career itself stays. |
| 15 | Recommended human decision (AI) | **APPROVE** |
| 16 | Human decision | **APPROVE (provisional)** |
| 17 | Human notes | APPROVE provisional, pending final profile-boundary validation — governance, assurance, risk, regulatory (EU AI Act / ISO 42001) and responsible-deployment boundaries must be maintained. AI Ethics Researcher MERGED into this identity (no second canonical identity). Relations to #23 data-governance and #52 GRC to be authored. |

- **A. Title/market:** AI governance, responsible-AI lead, AI compliance, AI ethics officer/auditor (variants).
- **B. Occupational identity:** governing AI system risk and conformity.
- **C. Competency/skill:** AI regulatory mapping (EU AI Act), risk/impact assessment, assurance, ISO 42001.
- **D. Canonical-career strength:** MODERATE-STRONG, `emerging` — regulator-driven; Relations to 03/06 and the World 01-vs-World 10 home are the ratify points (Critical case 4).

### #17 Prompt Engineer — `prompt-engineer` · 02 · future · T3

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | State of AI reports; 2026 AI-hiring labour analyses (+1) |
| 8 | Existing recommendation (AI) | REJECT |
| 9 | Existing rationale | 2023 fad title absorbed into AI Engineer; fails distinct-career test. |
| 10 | Duplicate/overlap | Absorbed by #9 (2026). |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | None as an occupation: prompt design, evaluation and guardrails are competencies inside #9's engineering work. |
| 13 | Distinct career if | Only if prompt-crafting were a stable standalone occupation — market evidence shows it is a component of AI engineering, not a career (Critical case 5). |
| 14 | Merge/alias if | It is a title over #9; keep only as alias vocabulary/SEO term. |
| 15 | Recommended human decision (AI) | **REJECT** |
| 16 | Human decision | **REJECT** |
| 17 | Human notes | REJECTED as a standalone canonical career — evidence does not establish sufficient occupational independence; prompt capability absorbed into broader AI/LLM engineering (capability over #9, not a career). |

- **A. Title/market:** prompt engineer (2023-era fad title; absorbed).
- **B. Occupational identity:** coding/technical writing with LLMs — an AI-engineering competency.
- **C. Competency/skill:** prompt design, evaluation harnesses, guardrails (subset of #9).
- **D. Canonical-career strength:** NONE as standalone; WEAK as alias vocabulary under #9.

### #18 AI Trainer / Data Annotator — `ai-trainer-annotator` · 02 · future · T5

| # | Field | Value |
|---|---|---|
| 7 | Provenance/source | industry labour coverage; State of AI reports |
| 8 | Existing recommendation (AI) | REJECT |
| 9 | Existing rationale | Transitional/automated annotation task, not a stable occupation. |
| 10 | Duplicate/overlap | Transitional task pattern, not an occupation. |
| 11 | Rel. to seed | — |
| 12 | Key occupational distinction | RLHF/annotation labour — a task within data and quality functions, increasingly automated. |
| 13 | Distinct career if | Only if annotation persisted as a stable, defensible occupation body; evidence is **T5 predictive only** (insufficient, marked). |
| 14 | Merge/alias if | Where the work persists it folds into data (#20) and quality (#53) functions as task vocabulary. |
| 15 | Recommended human decision (AI) | **REJECT** |
| 16 | Human decision | **REJECT** |
| 17 | Human notes | REJECTED — insufficient evidence (T5 predictive only) for an independent canonical career; where the task persists it folds into data/quality functions, not a career. |

- **A. Title/market:** AI trainer, data annotator, RLHF operator.
- **B. Occupational identity:** micro-labour enabling model training.
- **C. Competency/skill:** labelling, quality review, instruction-following (task skills, not an occupational body).
- **D. Canonical-career strength:** NONE — T5 predictive, transitional (insufficient evidence; no gap filled by assumption).

---

## Critical cases (evidence-based)

### Case 1 — AI Engineer vs ML Engineer (`#9` vs `#10`)

| Lens | AI Engineer | ML Engineer |
|---|---|---|
| A. Title/market | AI / LLM / GenAI engineer | ML engineer, MLE |
| B. Occupational identity | Ships AI products on foundation models/APIs (RAG, context, guardrails, agents) | Builds and operates bespoke trained models and their data/training/serving pipelines |
| C. Competency/skill | Model-capable product engineering, evaluation, prompt/context engineering, APIs | Model training/selection, feature engineering, distributed training, serving, monitoring |

**D. Strong enough for separate careers?** YES. 2026 role-segmentation market research and State-of-AI analyses show two distinct function bands with distinct hiring keyword sets (provenance T3). They are a *complementary pair* — the model-builder and the model-application engineer. Alternatives: a single "AI/ML Engineer" identity (doc 11 §G.3 explicit alternative, rejected on evidence) or MLE as a specialisation of #9 (would collapse the training/ops band — not supported). Keep distinct, author `career_relations` at import.

### Case 2 — AI Engineer vs MLOps (`#9` vs `#14`)

| Lens | AI Engineer | MLOps Engineer |
|---|---|---|
| A. Title/market | AI/LLM engineer | MLOps / ML platform engineer |
| B. Occupational identity | Building the AI product experience | Running the ML production platform (pipelines, registry, monitoring) |
| C. Competency/skill | model integration, evaluation, guardrails | lifecycle automation, infra/monitoring, ML-CI/CD |

**D. Strong enough for separate careers?** YES at the extremes (product-integration vs platform-lifecycle), with a soft middle where MLOps keywords now appear inside MLE postings (2026 analyses, T3). Both stay; #14 sits `emerging` and its boundary-with-04 is the ratify point. Merge only if one believes the ops half is identical to general platform engineering (04) — the ML-specificity evidence argues against.

### Case 3 — AI Engineer vs Data Scientist (`#9` vs `#11`)

| Lens | AI Engineer | Data Scientist |
|---|---|---|
| A. Title/market | AI/LLM engineer | Data scientist |
| B. Occupational identity | Shipping AI products | Measurement/experimentation/insight |
| C. Competency/skill | foundation-model product engineering | statistics, experimental design, inference |

**D. Strong enough for separate careers?** YES. The measurement identity (#11) is T1 nationally classified (BLS OOH, ESCO) and remains methodologically distinct from product engineering (#9). Boundary: *evaluation and experimentation overlap*; author explicit `career_relations` between #9/#10/#11 at import. No merge — collapsing #11 into #9 would erase the statistics identity.

### Case 4 — Responsible AI / AI Governance vs AI Ethics (`#16` vs "AI Ethics Researcher")

There is **no separate "AI Ethics Researcher" candidate**; the name is captured as a variant of #16 in the inventory's `source_term_variants` (AI ethics officer / AI auditor / AI compliance manager). Assessment:

- A. **Title/market:** distinct-looking labels exist ("AI ethics officer", "responsible-AI researcher").
- B. **Occupational identity:** Assessment below — a single governance/assurance function over AI system risk.
- C. **Competency/skill:** shared foundation (AI regulation mapping, risk/impact assessment, ISO 42001, assurance).
- D. **Canonical-cost:** ONE career. "Researcher" flavour is a work-mode within the governance identity, not an occupation; splitting would multiply careers per adjective. Recommendation stays **APPROVE** for #16; the label is vocabulary.

**Distinction test:** a different title here does **not** mean a different career — same function body, same regulatory driver (EU AI Act), different framing words.

### Case 5 — Prompt Engineer vs AI/LLM application engineering (`#17` vs `#9`)

- A. **Title/market:** "Prompt Engineer" (2023 fad) vs AI Engineer (2026 dominant).
- B. **Occupational identity:** prompt-crafting is a *component* of AI-application engineering; it produces no separate function body.
- C. **Competency/skill:** prompt design, evaluation harnesses, guardrails — a strict subset of #9's competency set.
- D. **Strong enough for separate career?** NO. Recommendation **REJECT** for #17; retain "Prompt Engineer" as alias/SEO vocabulary under #9. The 2026 hiring analyses (T3) show the title absorbed into AI engineering.

### Case 6 — Software Developer vs Web Developer (`#1` vs `#7`)

- A. **Title/market:** distinct labels; ONS SOC 2020 even has separate unit groups (T1).
- B. **Occupational identity:** web delivery is a channel of application development — same general function.
- C. **Competency/skill:** web stack is a specialisation of the same programming/design competency base.
- D. **Strong enough for separate career?** NO. The ONS unit-group split reflects statistical taxonomy, not a different occupational body. Recommendation **ALIAS** into #1 (with the alias set covering frontend/backend/full-stack/web vocabulary).

### Case 7 — Embedded Systems Engineer vs Software Developer (`#3` vs `#1`)

- A. **Title/market:** embedded/firmware vs software developer — distinct posting vocabularies (T3 segmentation).
- B. **Occupational identity:** device-constrained software (hardware-adjacent) vs generalised application software.
- C. **Competency/skill:** C/C++, RTOS, hardware registers, real-time constraints vs general application stack.
- D. **Strong enough for separate careers?** YES. A device-software function with distinct constraints cannot be revenue-degraded into general application engineering; KORE1/Glassdoor 2026 segmentation (T3) plus the firmware alias layer support this. Distinct career; firmware/device variants alias into it.

### Case 8 — Systems Software Engineer vs Software Developer (`#4` vs `#1`)

- A. **Title/market:** systems/platform-software titles vs application-developer titles.
- B. **Occupational identity:** building the software that hosts software (OS, runtimes, toolchains) vs building applications on top.
- C. **Competency/skill:** OS internals, compilers, concurrency, performance vs application programming/design; recognised separately by IEEE/ACM Computing Curricula (T2).
- D. **Strong enough for separate careers?** YES. Distinct discipline body below the application layer. Boundary vs #3 is OS/toolchain-vs-device; both stay distinct from #1. Senior-backend overlap with #1 is a *relation*, not a duplicate.

---

## Batch 1 summary at a glance

| # | Name | Cluster | Status | Evidence | Recommendation (AI) | Human decision |
|---|---|---|---|---|---|---|
| 1 | Software Developer | 01 | current | T1 | APPROVE | **APPROVE** |
| 2 | Game Developer | 01 | specialist | T2 | APPROVE | **APPROVE** |
| 3 | Embedded Systems Engineer | 01 | current | T3 | APPROVE | **APPROVE** |
| 4 | Systems Software Engineer | 01 | specialist | T2 | APPROVE | **APPROVE** |
| 5 | Computer Graphics Engineer | 01 | specialist | T2 | APPROVE | — (no correction given) |
| 6 | Developer Relations Engineer | 01 | specialist | T4 | APPROVE | — (no correction given) |
| 7 | Web Developer | 01 | current | T1 | ALIAS | **ALIAS** |
| 8 | Mobile App Developer | 01 | specialist | T3 | ALIAS | **APPROVE** (override) |
| 9 | AI Engineer | 02 | current | T3 | APPROVE | **APPROVE** |
| 10 | Machine Learning Engineer | 02 | current | T3 | APPROVE | **APPROVE** |
| 11 | Data Scientist | 02 | current | T1 | APPROVE | **APPROVE** |
| 12 | Computer Vision Engineer | 02 | specialist | T2 | APPROVE | **APPROVE** |
| 13 | NLP Engineer | 02 | specialist | T3 | MERGE | **APPROVE** (override) |
| 14 | MLOps Engineer | 02 | emerging | T3 | APPROVE | **APPROVE** |
| 15 | AI Research Scientist | 02 | current | T4 | APPROVE | **APPROVE** |
| 16 | AI Governance & Responsible AI | 02 | emerging | T3 | APPROVE | **APPROVE (provisional)** |
| 17 | Prompt Engineer | 02 | future | T3 | REJECT | **REJECT** |
| 18 | AI Trainer / Data Annotator | 02 | future | T5 | REJECT | **REJECT** |

> **Insufficient-evidence note (explicit):** only #18 (`ai-trainer-annotator`) rests on **T5 predictive** provenance. That is marked rather than supplemented with assumptions; its REJECT recommendation follows from the *absence of an occupational body*, not from additional research. All other Batch 1 candidates carry T1–T4 evidence from the inventory.

---

## Recorded human decisions and rationale (2026-09-01)

These decisions are **human**, recorded in column 16; they are visibly distinct from the column-15 AI recommendations above. The AI recommendations are unchanged.

| # | Name | Human decision | Human rationale (as recorded) |
|---|---|---|---|
| 1 | Software Developer | APPROVE | Seed canonical 1/5; anchor identity (Web Developer aliases into it). |
| 8 | Mobile App Developer | APPROVE | Distinct specialist career (override of AI ALIAS). |
| 3 | Embedded Systems Engineer | APPROVE | Distinct device-software career. |
| 2 | Game Developer | APPROVE | Distinct specialist career. |
| 4 | Systems Software Engineer | APPROVE | Distinct systems-level career. |
| 7 | Web Developer | ALIAS | Terminology variant of Software Developer. |
| 9 | AI Engineer | APPROVE | Separate from ML Engineer — materially different competency centres (seed 2/5; upgrade to current endorsed). |
| 10 | ML Engineer | APPROVE | Separate from AI Engineer — distinct model-training/ops competency centre. |
| 11 | Data Scientist | APPROVE | Distinct statistical/analytical/modeling competency centre (seed 3/5). |
| 12 | Computer Vision Specialist | APPROVE | Sufficiently differentiated technical competency domain. |
| 13 | NLP Specialist | APPROVE | Sufficiently differentiated technical competency domain (override of AI MERGE). |
| 14 | MLOps | APPROVE | Distinct occupational identity: AI/ML production lifecycle — infrastructure, deployment, monitoring, operational reliability. |
| 15 | AI Research Scientist | APPROVE | Research is a distinct occupational track. |
| 16 | Responsible AI / AI Governance | APPROVE, provisional | Emerging occupational identity, provisional pending final profile-boundary validation; must maintain concrete governance/assurance/risk/regulatory/responsible-deployment boundaries. |
| 16a | AI Ethics Researcher | MERGE into #16 | Merged rather than a second canonical identity. |
| 17 | Prompt Engineer | REJECT | Standalone canonical career rejected — evidence does not establish sufficient occupational independence; capability absorbed into broader AI/LLM engineering. |
| 18 | AI Trainer/Annotator | REJECT | Insufficient evidence tier for an independent canonical career. |

### Editorial notes on remaining Batch 1 terminology

- Per the standing rule, remaining Batch 1 terminology duplicates resolve to the documented **MERGE/ALIAS** resolution already identified by the editorial analysis — **no additional canonical identities are created** beyond those listed. Echoing the explicit decision language: the same rule applies as throughout — *a different title is not a different career unless function/competency differ.*
- The four candidate sheets whose numbers were not in the recorded decision set (#5 Computer Graphics, #6 Developer Relations) carry no override; their AI recommendations (APPROVE) stand unopposed and are treated as unresolved-pending-confirmation rather than silently promoted, keeping the human record honest.

---

*End of Document 13 (Batch 1 adjudicated — human decisions recorded 2026-09-01). No inventory, seed, or production data is modified; no canonical IDs created.*