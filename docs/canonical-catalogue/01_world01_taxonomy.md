# World 01 — Technology & Computing: Taxonomy & Subcategories

## 1. Purpose

This document defines the **subcategory/cluster taxonomy** for World 01
(Technology & Computing). It is the controlled vocabulary used to assign the
`cluster` field on every `careers` row and to organise research during the
editorial build.

The taxonomy is a **research and organisation aid**, not a hard cap on career
count. Clusters may contain many careers (e.g. Software Engineering) or few
(e.g. Quantum). No cluster is required to contain a minimum number of careers.

## 2. Guiding principles

1. **Comprehensive, not exhaustive.** The taxonomy covers established,
   specialist/niche, emerging, and credible future/predictive roles — but does
   not attempt to enumerate every possible job title.
2. **Role-based, not employer-based.** Careers are defined by what a professional
   *does*, not by which company they work for.
3. **Cluster assignment by primary function.** A career belongs to exactly one
   cluster (single `cluster` value). Cross-cutting work is captured through
   **related careers**, not dual membership.
4. **Real roles first.** Speculative titles are excluded unless a credible
   forward-looking source supports them (see Inclusion Criteria).
5. **Stable identity.** Once a career is created, its `canonical_slug` and
   canonical name do not change; clusters may be refined before publishing.

## 3. The World 01 taxonomy

Fourteen clusters are proposed. Each lists representative career families
(hypothetical until confirmed by research) to show the shape of the cluster.

### A. Core engineering (established)
| Cluster | Representative career families |
|---|---|
| A1 Software Engineering | Backend, frontend, full-stack, mobile, embedded systems, game, low-level/systems |
| A2 AI & Machine Learning | ML engineer, data scientist (overlap to D), computer vision, NLP, ML ops |
| A3 Data Engineering & Analytics | Data engineer, data analyst, BI analyst, analytics engineer |
| A4 Cloud, Infrastructure & DevOps | Cloud architect, platform engineer, SRE, DevOps engineer, site reliability |
| A5 Networking & Connectivity | Network engineer, network architect, telecom/5G engineer, SDN |
| A6 Systems & Database Administration | Sysadmin, database administrator, storage, mainframe |
| A7 Cybersecurity | Security analyst, penetration tester, security engineer, threat intel, SOC |
| A8 Quality, Testing & Reliability | QA engineer, test automation, SDET, performance engineer |

### B. Product & delivery (established/specialist)
| Cluster | Representative career families |
|---|---|
| B1 Product & Program (Technology) | Product manager, technical program manager, product analyst |
| B2 Engineering Leadership & Architecture | Tech lead, staff/principal engineer, solutions architect, technical consultant |

### C. Emerging & front-of-curve (emerging)
| Cluster | Representative career families |
|---|---|
| C1 Applied Frontier Tech | AR/VR/XR engineer, robotics software, IoT/edge, digital twin, space software |
| C2 Web3 & Distributed Systems | Blockchain engineer, distributed systems, privacy engineering |
| C3 Quantum Computing | Quantum software, quantum algorithm researcher, quantum error-correction |
| C4 AI Safety & Responsible AI | AI governance, model evaluation, alignment engineer |

### D. Specialist & niche computing (specialist)
| Cluster | Representative career families |
|---|---|
| D1 Domain-Integrated Computing | Bioinformatics, climate/geospatial software, health informatics, fintech engineering |
| D2 Technical Support & Service | IT support, technical account management, field/network technician escalation |

> **Note on C4 predictive titles:** AI-safety and modelling-conduct roles are
> credible and sourced where the underlying science is active. Any *future*
> classification must clear the Inclusion Criteria's predictive gate (see doc 02).

## 4. Career status mapping by cluster

The taxonomy maps onto the `career_status` vocabulary
(`current | specialist | emerging | future`). This is indicative, final status is
assigned per-career from evidence:

| Status | Typical clusters | Example |
|---|---|---|
| `current` | A1–A8, B1–B2, D2 | Software Engineer, DBA |
| `specialist` | D1, A2/A7 niches | Bioinformatics Engineer, Threat Intelligence |
| `emerging` | C1, C2 | AR/VR Systems Engineer, Platform Engineer |
| `future` (predictive) | C3, C4 | Quantum Error-Correction Engineer |

## 5. How clusters are stored

- `careers.cluster` holds the cluster key (e.g. `software-engineering`).
- Clusters are convenient subdivisions; the canonical identity of a career is its
  `canonical_slug` + `world_id`, independent of cluster.
- Future releases may promote cluster to a first-class table if analytics warrant
  it; for now it is an attribute to avoid over-normalising early.

## 6. Cross-cluster handling

- A career's primary home is one cluster.
- Cross-cluster relationships are expressed via `career_relations`
  (`similar`, `complementary`, `prerequisite`, `alternative`).
- Career Discovery signals and IWDA affinity are per-career and may span clusters.

## 7. Open decisions to confirm at review

1. Whether A2 (AI & ML) and A3 (Data) stay separate or merge. Current proposal
   keeps them separate (different skill sets and progression).
2. Whether B2 leadership/architecture roles belong in a technology World or a
   generic management layer (recommendation: include, they are Technology careers).
3. Whether C4 predictive titles are added now or deferred until evidence is
   settled (recommendation: defer authored titles, keep cluster reserved).
