-- Innovators World — Canonical Career Catalogue v2.0
-- Migration 0010: single-source-of-truth for the 780-career universe.
-- Additive only. Existing IWDA, Career Discovery and participant tables untouched.
-- World 01 = Technology & Computing (reference implementation).
-- Worlds 02–15 defined here; catalogue generation deferred.

PRAGMA foreign_keys = ON;

-- ──────────────────────────────────────────────────────────────────────────────
-- 15 Career Worlds — fixed identity, variable career allocation per world.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_worlds (
  id                TEXT PRIMARY KEY,
  world_no          INTEGER NOT NULL UNIQUE CHECK (world_no BETWEEN 1 AND 15),
  canonical_name    TEXT NOT NULL,
  canonical_slug    TEXT NOT NULL UNIQUE,
  seo_slug          TEXT UNIQUE,
  legacy_slug       TEXT UNIQUE,
  tagline           TEXT,
  description       TEXT,
  display_order     INTEGER NOT NULL,
  metadata_json     TEXT,
  created_at        TEXT NOT NULL,
  updated_at        TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_career_worlds_seo_slug    ON career_worlds(seo_slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_career_worlds_legacy_slug ON career_worlds(legacy_slug);

CREATE INDEX IF NOT EXISTS idx_career_worlds_order ON career_worlds(display_order);

-- ──────────────────────────────────────────────────────────────────────────────
-- Canonical careers — one row per career, belongs to exactly one World.
-- A career cannot enter the production canonical universe without a world_id.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS careers (
  id                TEXT PRIMARY KEY,
  canonical_slug    TEXT NOT NULL UNIQUE,
  canonical_name    TEXT NOT NULL UNIQUE,
  published_name    TEXT NOT NULL,
  world_id          TEXT NOT NULL,
  cluster           TEXT,
  career_status     TEXT NOT NULL DEFAULT 'current'
                    CHECK (career_status IN ('current','specialist','emerging','future')),
  editorial_status  TEXT NOT NULL DEFAULT 'draft'
                    CHECK (editorial_status IN ('draft','review','approved','published','retired')),
  evidence_status   TEXT NOT NULL DEFAULT 'source_verified'
                    CHECK (evidence_status IN ('source_verified','expert_validated','predictive')),
  description       TEXT,
  source            TEXT,
  provenance        TEXT,
  catalogue_version TEXT NOT NULL DEFAULT '2.0',
  metadata_json     TEXT,
  created_at        TEXT NOT NULL,
  updated_at        TEXT NOT NULL,
  FOREIGN KEY (world_id) REFERENCES career_worlds(id)
);

CREATE INDEX IF NOT EXISTS idx_careers_world       ON careers(world_id);
CREATE INDEX IF NOT EXISTS idx_careers_status       ON careers(editorial_status);
CREATE INDEX IF NOT EXISTS idx_careers_career_status ON careers(career_status);

-- ──────────────────────────────────────────────────────────────────────────────
-- Career profiles — one-to-one editorial content per career.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_profiles (
  id                       TEXT PRIMARY KEY,
  career_id                TEXT NOT NULL UNIQUE,
  summary                  TEXT,
  daily_work               TEXT,
  key_tasks_json           TEXT,
  skills_needed_json       TEXT,
  education_pathways_json  TEXT,
  learning_resources_json  TEXT,
  outlook                  TEXT,
  attributes_json          TEXT,
  iwda_dimensions_json     TEXT,
  metadata_json            TEXT,
  created_at               TEXT NOT NULL,
  updated_at               TEXT NOT NULL,
  FOREIGN KEY (career_id) REFERENCES careers(id)
);

CREATE INDEX IF NOT EXISTS idx_career_profiles_career ON career_profiles(career_id);

-- ──────────────────────────────────────────────────────────────────────────────
-- Career relations — related careers across or within worlds.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_relations (
  id                TEXT PRIMARY KEY,
  career_id         TEXT NOT NULL,
  related_career_id TEXT NOT NULL,
  relation_type     TEXT NOT NULL
                    CHECK (relation_type IN ('similar','complementary','prerequisite','alternative')),
  metadata_json     TEXT,
  created_at        TEXT NOT NULL,
  UNIQUE (career_id, related_career_id, relation_type),
  FOREIGN KEY (career_id) REFERENCES careers(id),
  FOREIGN KEY (related_career_id) REFERENCES careers(id)
);

CREATE INDEX IF NOT EXISTS idx_career_relations_career ON career_relations(career_id);

-- ──────────────────────────────────────────────────────────────────────────────
-- Career progression — advancement paths between careers.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_progression (
  id                TEXT PRIMARY KEY,
  career_id         TEXT NOT NULL,
  next_career_id    TEXT NOT NULL,
  progression_type  TEXT NOT NULL
                    CHECK (progression_type IN ('advancement','specialization','lateral')),
  description       TEXT,
  metadata_json     TEXT,
  created_at        TEXT NOT NULL,
  UNIQUE (career_id, next_career_id, progression_type),
  FOREIGN KEY (career_id) REFERENCES careers(id),
  FOREIGN KEY (next_career_id) REFERENCES careers(id)
);

CREATE INDEX IF NOT EXISTS idx_career_progression_career ON career_progression(career_id);

-- ──────────────────────────────────────────────────────────────────────────────
-- Catalogue versioning — tracks each edition of the canonical career catalogue.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS catalogue_versions (
  id                       TEXT PRIMARY KEY,
  version                  TEXT NOT NULL UNIQUE,
  status                   TEXT NOT NULL DEFAULT 'draft'
                           CHECK (status IN ('draft','active','retired')),
  expected_career_count    INTEGER NOT NULL,
  actual_career_count      INTEGER,
  expected_world_count     INTEGER NOT NULL,
  published_at             TEXT,
  created_at               TEXT NOT NULL,
  updated_at               TEXT NOT NULL
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Catalogue validation log — one row per validation pass/fail.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS catalogue_status (
  id                       TEXT PRIMARY KEY,
  catalogue_version_id     TEXT NOT NULL,
  total_careers            INTEGER NOT NULL,
  world_allocation_json    TEXT,
  validation_status        TEXT NOT NULL
                           CHECK (validation_status IN ('pass','fail')),
  validation_details_json  TEXT,
  checked_at               TEXT NOT NULL,
  FOREIGN KEY (catalogue_version_id) REFERENCES catalogue_versions(id)
);

CREATE INDEX IF NOT EXISTS idx_catalogue_status_version ON catalogue_status(catalogue_version_id);

-- ──────────────────────────────────────────────────────────────────────────────
-- Seed: 15 Career Worlds
-- seo_slug reconciles the 15-worlds SEO foundation (feat/seo-15-worlds).
-- legacy_slug reconciles the older 305-career catalogue (provenance only).
-- Ambiguous SEO names (creativity, service, social) are intentionally absent.
-- ──────────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO career_worlds
  (id, world_no, canonical_name, canonical_slug, seo_slug, legacy_slug, tagline, description, display_order, created_at, updated_at)
VALUES
  ('world-01',  1, 'Technology & Computing',                'technology-computing',                'technology', 'technology', 'Build tools that expand human capability.',           'Software, AI, systems and digital infrastructure.', 1,  datetime('now'), datetime('now')),
  ('world-02',  2, 'Science & Discovery',                   'science-discovery',                   'science',    'science',    'Ask why, test how, discover what is next.',           'Physics, biology, chemistry, research.',             2,  datetime('now'), datetime('now')),
  ('world-03',  3, 'Engineering & Building',                'engineering-building',                NULL,          'engineering', 'Design systems that work at scale.',                  'Mechanical, civil, electrical and systems.',         3,  datetime('now'), datetime('now')),
  ('world-04',  4, 'Health & Human Wellbeing',              'health-human-wellbeing',              'health',     'health',     'Design for wellbeing, care and flourishing.',         'Medicine, therapy, public health, nutrition.',       4,  datetime('now'), datetime('now')),
  ('world-05',  5, 'Life, Earth & Environment',             'life-earth-environment',             'environment','environment','Build a future where planet and people thrive.',      'Ecology, conservation, climate, sustainability.',   5,  datetime('now'), datetime('now')),
  ('world-06',  6, 'Business & Entrepreneurship',           'business-entrepreneurship',           'business',   'business',   'Turn ideas into systems that serve people.',          'Ventures, strategy, operations, growth.',            6,  datetime('now'), datetime('now')),
  ('world-07',  7, 'Finance & Economics',                   'finance-economics',                   NULL,          'finance',    'Design intelligent systems for value and risk.',      'Markets, analysis, planning, FinTech.',              7,  datetime('now'), datetime('now')),
  ('world-08',  8, 'Design & Creative Industries',          'design-creative-industries',          'design',     'design',     'Design futures that people want to live in.',         'Product, UX, industrial, spatial design.',           8,  datetime('now'), datetime('now')),
  ('world-09',  9, 'Media, Communication & Storytelling',   'media-communication-storytelling',    'media',      'media',      'Tell stories that move people to act.',               'Film, audio, writing, digital media.',               9,  datetime('now'), datetime('now')),
  ('world-10', 10, 'Society, Law & Public Affairs',         'society-law-public-affairs',          'law',        'law',        'Design justice, rights and fair systems.',            'Legal, policy, governance, advocacy.',               10, datetime('now'), datetime('now')),
  ('world-11', 11, 'Education & Human Development',         'education-human-development',         'education',  'education',  'Design learning that awakens curiosity.',             'Teaching, curriculum, learning science.',            11, datetime('now'), datetime('now')),
  ('world-12', 12, 'Culture, Arts & Heritage',              'culture-arts-heritage',              NULL,          'arts',       'Make with hands, heart and heritage.',                'Visual arts, music, heritage, performance.',         12, datetime('now'), datetime('now')),
  ('world-13', 13, 'Food, Hospitality & Experiences',       'food-hospitality-experiences',       NULL,          'hospitality','Design experiences that nourish and delight.',        'Culinary, hospitality, event, travel.',              13, datetime('now'), datetime('now')),
  ('world-14', 14, 'Exploration, Transport & Space',        'exploration-transport-space',         'exploration','exploration','Go beyond maps, discover new frontiers.',             'Space, maritime, logistics, aviation.',              14, datetime('now'), datetime('now')),
  ('world-15', 15, 'Skilled Trades, Manufacturing & Applied Craft', 'skilled-trades-manufacturing-applied-craft', 'craft', 'trades', 'Make with precision, skill and craft.', 'Construction, fabrication, repair, craft.', 15, datetime('now'), datetime('now'));

-- ──────────────────────────────────────────────────────────────────────────────
-- Seed: catalogue version v2.0 (draft — awaiting 780 canonical career records)
-- ──────────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO catalogue_versions
  (id, version, status, expected_career_count, expected_world_count, created_at, updated_at)
VALUES
  ('canonical-catalogue-v2', '2.0', 'draft', 780, 15, datetime('now'), datetime('now'));
