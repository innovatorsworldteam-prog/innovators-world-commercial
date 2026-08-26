# Innovators World Career Discovery v1.0 — Question Bank Design

## Purpose
Career Discovery is an exploration/self-understanding instrument. It does not predict a person's ideal career, intelligence, success, income or destiny. Results identify **strong exploration matches**, **areas worth investigating**, and experiences worth trying.

The Career Catalogue v1.0 is the canonical exploration taxonomy: 15 Career Worlds and 300+ possibilities. The catalogue explicitly frames career choice as a process rather than a single test result. fileciteturn34file0L37-L59

## Assessment architecture
Six dimensions are retained exactly as defined in the live schema:

| Code | Dimension | Weight |
|---|---|---:|
| INT | Interests | 25% |
| ACT | Activities | 15% |
| VAL | Values | 15% |
| ENV | Environments | 15% |
| SKL | Skill Inclinations | 15% |
| FUT | Future Curiosity | 15% |

Weights total 100%.

## Age architecture
The same assessment version uses four distinct cognitive bands. The task changes with developmental level; this is not merely a wording substitution.

| Band | Age | Cognitive task |
|---|---:|---|
| Explorers | 8–10 | concrete choices, imagination, simple situations |
| Discoverers | 11–13 | comparison, reflection, project choices |
| Pathfinders | 14–16 | preference trade-offs, sustained interests, capability development |
| Launchers | 17–19 | realistic work/project contexts, commitment and future exploration |

The v1.0 seed uses **24 questions: one per dimension per age band**. This is an initial production content set, intentionally small enough to validate the complete assessment pipeline before expanding the bank. Each participant receives six questions for their age band.

## Response model
Every question is single-choice with four ordered response levels. The response levels represent strength of attraction/interest, not ability or intelligence.

- Level 1 — low attraction
- Level 2 — emerging attraction
- Level 3 — clear attraction
- Level 4 — strong attraction

The scoring engine records the primary dimension score from 1–4. It must not interpret a low score as a weakness or deficiency.

## Career-world signal layer
Each response also carries two broad Career World signals. These are matching signals, not deterministic career labels. The later matching engine may aggregate them across responses to identify Career Worlds worth exploring.

The canonical Career Catalogue contains 15 worlds including Technology & Computing, Science & Discovery, Engineering & Building, Health & Human Wellbeing, Life/Earth & Environment, Business & Entrepreneurship, Finance & Economics, Design & Creative Industries, Media/Communication & Storytelling, Society/Law & Public Affairs, Education/Human Development, Culture/Arts & Heritage, Food/Hospitality & Experiences, Exploration/Transport & Space, and Skilled Trades/Manufacturing & Applied Craft. fileciteturn34file1L82-L113 fileciteturn34file4L258-L301 fileciteturn34file5L343-L387 fileciteturn34file6L430-L472 fileciteturn34file7L516-L559

## Question-writing rules
1. Questions ask about attraction, preference, curiosity, activities, values, environments or desired skill development.
2. Questions do not test factual knowledge.
3. Questions do not measure IQ, academic achievement or psychological diagnosis.
4. Questions avoid deterministic language such as "ideal career", "best career", "success", "destiny" or employment prediction.
5. Options do not imply that one response is morally better than another.
6. Age-band tasks are developmentally different rather than merely cosmetically rewritten.
7. Career-world signals remain broad enough to support cross-world exploration.
8. The assessment is a starting point for experimentation; the catalogue explicitly recommends exploring, connecting, questioning and experimenting before narrowing choices. fileciteturn34file2L169-L185

## Database content
Migration `0008_career_discovery_v1_content.sql` seeds **24 questions and 96 response options**. The Career Discovery v1.0 version is activated only after its question and option content is inserted by the migration.

## Versioning
- Methodology: `1.0`
- Scoring: `1.0`
- Matching: `1.0`
- Content migration: `0008`

Future changes must create a new assessment version/migration rather than silently rewriting historical assessment content.
