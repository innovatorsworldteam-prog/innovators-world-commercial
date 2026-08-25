-- Innovators World Assessment Platform — Database Architecture v1.0
-- Migration 0001: canonical assessment-platform foundation
--
-- This migration is additive. It intentionally does NOT alter or delete the
-- existing IWDA tables. Existing IWDA production data must remain intact.
--
-- SQLite/D1 notes:
-- - Foreign-key enforcement is enabled per connection by the application where
--   required; references below document the intended relationships.
-- - Assessment content is versioned so historical results remain reproducible.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','retired')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS assessment_versions (
  id TEXT PRIMARY KEY,
  assessment_id TEXT NOT NULL,
  version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','retired')),
  age_min INTEGER,
  age_max INTEGER,
  methodology_version TEXT,
  scoring_version TEXT,
  matching_version TEXT,
  published_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (assessment_id, version),
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_versions_assessment
  ON assessment_versions(assessment_id);

CREATE TABLE IF NOT EXISTS assessment_dimensions (
  id TEXT PRIMARY KEY,
  assessment_version_id TEXT NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  scoring_weight REAL NOT NULL DEFAULT 1.0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (assessment_version_id, code),
  FOREIGN KEY (assessment_version_id) REFERENCES assessment_versions(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_dimensions_version
  ON assessment_dimensions(assessment_version_id);

CREATE TABLE IF NOT EXISTS assessment_questions (
  id TEXT PRIMARY KEY,
  assessment_version_id TEXT NOT NULL,
  code TEXT NOT NULL,
  age_min INTEGER,
  age_max INTEGER,
  question_type TEXT NOT NULL DEFAULT 'single_choice',
  prompt TEXT NOT NULL,
  helper_text TEXT,
  required INTEGER NOT NULL DEFAULT 1 CHECK (required IN (0,1)),
  display_order INTEGER NOT NULL DEFAULT 0,
  scoring_config_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (assessment_version_id, code),
  FOREIGN KEY (assessment_version_id) REFERENCES assessment_versions(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_questions_version_order
  ON assessment_questions(assessment_version_id, display_order);

CREATE TABLE IF NOT EXISTS assessment_options (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL,
  code TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  scoring_json TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (question_id, code),
  FOREIGN KEY (question_id) REFERENCES assessment_questions(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_options_question_order
  ON assessment_options(question_id, display_order);

CREATE TABLE IF NOT EXISTS assessment_attempts (
  id TEXT PRIMARY KEY,
  assessment_id TEXT NOT NULL,
  assessment_version_id TEXT NOT NULL,
  participant_id TEXT,
  user_id TEXT,
  anonymous_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'started'
    CHECK (status IN ('started','completed','abandoned','expired')),
  started_at TEXT NOT NULL,
  completed_at TEXT,
  expires_at TEXT,
  metadata_json TEXT,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id),
  FOREIGN KEY (assessment_version_id) REFERENCES assessment_versions(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_participant
  ON assessment_attempts(participant_id, assessment_id, status);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_anonymous
  ON assessment_attempts(anonymous_session_id, assessment_id, status);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_version
  ON assessment_attempts(assessment_version_id);

CREATE TABLE IF NOT EXISTS assessment_answers (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  option_id TEXT,
  answer_value TEXT,
  answered_at TEXT NOT NULL,
  UNIQUE (attempt_id, question_id),
  FOREIGN KEY (attempt_id) REFERENCES assessment_attempts(id),
  FOREIGN KEY (question_id) REFERENCES assessment_questions(id),
  FOREIGN KEY (option_id) REFERENCES assessment_options(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_answers_attempt
  ON assessment_answers(attempt_id);

CREATE TABLE IF NOT EXISTS assessment_results (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL UNIQUE,
  assessment_id TEXT NOT NULL,
  assessment_version_id TEXT NOT NULL,
  participant_id TEXT,
  user_id TEXT,
  result_status TEXT NOT NULL DEFAULT 'complete'
    CHECK (result_status IN ('complete','invalidated')),
  overall_score REAL,
  result_json TEXT NOT NULL,
  algorithm_version TEXT,
  generated_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES assessment_attempts(id),
  FOREIGN KEY (assessment_id) REFERENCES assessments(id),
  FOREIGN KEY (assessment_version_id) REFERENCES assessment_versions(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_results_participant
  ON assessment_results(participant_id, assessment_id, generated_at);

CREATE TABLE IF NOT EXISTS assessment_dimension_scores (
  id TEXT PRIMARY KEY,
  result_id TEXT NOT NULL,
  dimension_id TEXT NOT NULL,
  raw_score REAL,
  normalized_score REAL,
  max_score REAL,
  percentile REAL,
  interpretation TEXT,
  metadata_json TEXT,
  UNIQUE (result_id, dimension_id),
  FOREIGN KEY (result_id) REFERENCES assessment_results(id),
  FOREIGN KEY (dimension_id) REFERENCES assessment_dimensions(id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_dimension_scores_result
  ON assessment_dimension_scores(result_id);

-- Canonical assessment registry entries. These are deliberately minimal:
-- actual questions/scoring remain versioned data and are introduced separately.
INSERT OR IGNORE INTO assessments
  (id, code, name, description, status, created_at, updated_at)
VALUES
  ('assessment-iwda', 'IWDA', 'Innovators World Discovery Assessment',
   'Assessment of innovation-thinking dimensions. Existing IWDA scoring remains canonical.',
   'active', datetime('now'), datetime('now')),
  ('assessment-career-discovery', 'CAREER_DISCOVERY', 'Innovators World Career Discovery',
   'Career-exploration assessment covering interests, activities, values, environments, skill inclinations and future curiosity.',
   'draft', datetime('now'), datetime('now'));

-- IWDA v1.0 is registered as a platform version but its existing production
-- questions/results are not migrated by this additive foundation migration.
INSERT OR IGNORE INTO assessment_versions
  (id, assessment_id, version, status, methodology_version, scoring_version, matching_version, created_at, updated_at)
VALUES
  ('assessment-iwda-v1', 'assessment-iwda', '1.0', 'active', '1.0', '1.0', NULL, datetime('now'), datetime('now')),
  ('assessment-career-discovery-v1', 'assessment-career-discovery', '1.0', 'draft', '1.0', '1.0', '1.0', datetime('now'), datetime('now'));

-- Career Discovery's six canonical dimensions. They are created now so the
-- schema is ready; question content is intentionally a later migration.
INSERT OR IGNORE INTO assessment_dimensions
  (id, assessment_version_id, code, name, description, display_order, scoring_weight, created_at, updated_at)
VALUES
  ('cd-dim-int', 'assessment-career-discovery-v1', 'INT', 'Interests', 'What naturally attracts attention and curiosity.', 1, 0.25, datetime('now'), datetime('now')),
  ('cd-dim-act', 'assessment-career-discovery-v1', 'ACT', 'Activities', 'Kinds of activities the participant enjoys doing.', 2, 0.15, datetime('now'), datetime('now')),
  ('cd-dim-val', 'assessment-career-discovery-v1', 'VAL', 'Values', 'What matters to the participant in future work.', 3, 0.15, datetime('now'), datetime('now')),
  ('cd-dim-env', 'assessment-career-discovery-v1', 'ENV', 'Environments', 'Work and learning environments the participant may prefer.', 4, 0.15, datetime('now'), datetime('now')),
  ('cd-dim-skl', 'assessment-career-discovery-v1', 'SKL', 'Skill Inclinations', 'Capabilities the participant wants to use or develop.', 5, 0.15, datetime('now'), datetime('now')),
  ('cd-dim-fut', 'assessment-career-discovery-v1', 'FUT', 'Future Curiosity', 'Emerging fields and future possibilities that attract curiosity.', 6, 0.15, datetime('now'), datetime('now'));
