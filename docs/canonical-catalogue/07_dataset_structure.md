# World 01 — Dataset Structure

## 1. Purpose

Defines the **file layout** and **JSON interchange format** for World 01 authoring
data. Seed JSON is the authoring interchange format; the D1 database is the single
source of truth after import (see doc 06).

## 2. Directory layout

```
src/data/canonical/
  worlds/
    world-01-seed.json            # approved 5-career reference seed (exists)
    world-01/                     # proposed: one file per cluster (research/authoring)
      software-engineering.json
      ai-machine-learning.json
      data-analytics.json
      cybersecurity.json
      ...                         # one per taxonomy cluster (doc 01)
    _schema/
      career-skill.schema.json    # tagged-skill payload schema
      career-profile.schema.json  # full career-seed schema
```

> Keeping the approved `world-01-seed.json` separate from per-cluster work files
> preserves the reviewed reference seed while new clusters are authored.

## 3. Top-level seed file shape

Mirrors `CareerSeedFile` in `src/db/catalogue.ts`:

```jsonc
{
  "catalogue_version": "2.0",
  "world": {
    "id": "world-01",
    "world_no": 1,
    "canonical_name": "Technology & Computing",
    "canonical_slug": "technology-computing"
  },
  "careers": [ /* one career object per node below */ ]
}
```

## 4. Career node

Each `careers[]` entry encodes the full profile (doc 03). Example fragment
(matching the live seed):

```jsonc
{
  "canonical_slug": "ai-engineer",
  "canonical_name": "AI Engineer",
  "published_name": "AI Engineer",
  "cluster": "artificial-intelligence-machine-learning", // taxonomy key
  "career_status": "emerging",
  "editorial_status": "draft",
  "evidence_status": "source_verified",
  "description": "Designs, trains and deploys ML systems...",
  "source": "UK ONS / industry survey, 2025",
  "provenance": {
    "source": "ONS labour market survey 2025",
    "publisher": "Office for National Statistics",
    "source_date": "2025",
    "ref": null,
    "notes": "Reference example for World 01 authoring."
  },
  "metadata_json": {
    "primary_signal": "technology",
    "links": [{ "label": "Tech Nation", "url": "https://www.technation.io" }]
  },
  "profile": {
    "summary": "...",
    "daily_work": "...",
    "key_tasks": ["..."],
    "skills_needed": [
      { "name": "Python", "type": "technical" },
      { "name": "Cross-team communication", "type": "human" }
    ],
    "education_pathways": ["Computer science degree", "Data science bootcamp"],
    "learning_resources": ["Practical Deep Learning for Coders", "Kaggle"],
    "outlook": "Strong growth...",
    "attributes": { "maths": 0.9 },
    "iwda_dimensions": { "question": 80, "create": 75, "test": 90 }
  },
  "relations": [
    { "related_slug": "data-scientist", "relation_type": "complementary" }
  ],
  "progression": [
    { "next_slug": "ml-platform-engineer", "progression_type": "specialization" }
  ]
}
```

> **Note:** the current `world-01-seed.json` uses plain string skill lists
> (`"Python"`, `"Data engineering"`). The **proposed** convention is the tagged
> object form above (doc 03 §2). A small migration of the seed to the tagged form
> is part of the editorial build.

## 5. Encoding rules

- `canonical_slug`: lowercase, hyphens, ASCII; derived from canonical name.
- `canonical_name`: stable research name; distinct per career.
- `published_name`: user-facing rendering (may be title-case).
- `cluster`: a key from the taxonomy (doc 01); recommended hyphenated (e.g.
  `artificial-intelligence-machine-learning`).
- `iwda_dimensions`: integer 0–100 per IWDA capability.
- `skills_needed` (proposed): array of `{name, type}` with `type ∈ technical|human`.
- Relations/progression reference sibling `canonical_slug` values **within the same
  World seed/import batch**; cross-World references are deferred until full
  assembly.

## 6. JSON Schema (proposed location)

`src/data/canonical/_schema/career-profile.schema.json` should codify §4:
required vs. optional, enums for statuses/clusters/signals, and value ranges.
This gives tooling-time validation before import (doc 08) beyond runtime checks.

## 7. Completeness per file

A cluster file is ready to import only when every career in it is
**profile-complete** (doc 03 §3) and passes the World 01 validation set (doc 08).
