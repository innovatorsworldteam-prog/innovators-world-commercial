import { applyD1Migrations, env } from "cloudflare:test";
import { seedCareerWorld, seedWorlds } from "../src/db/catalogue";
import type { CareerSeedFile } from "../src/db/catalogue";
import worldOneSeed from "../src/data/canonical/worlds/world-01-seed.json";

type TestEnv = {
        DB: D1Database;
        TEST_MIGRATIONS: D1Migration[];
};

const testEnv = env as unknown as TestEnv;

// Workers Vitest may reuse workerd storage between local runs. The storage can
// therefore contain a partially-created schema without migration bookkeeping.
// Detect the IWDA core table independently from the participant table so a
// partial schema is repaired without replaying non-idempotent migrations.
const tables = await testEnv.DB
        .prepare(
                "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('iwda_attempts', 'participants')"
        )
        .all<{ name: string }>();

const hasAttemptsTable = tables.results.some((table) => table.name === "iwda_attempts");
const hasParticipantsTable = tables.results.some((table) => table.name === "participants");

if (!hasAttemptsTable && !hasParticipantsTable) {
        // Fresh test database: apply the complete canonical migration set.
        await applyD1Migrations(testEnv.DB, testEnv.TEST_MIGRATIONS);
} else if (!hasAttemptsTable) {
        // Partial legacy database: the participant foundation already exists,
        // so replaying the full migration set would re-run its ALTER TABLE.
        // Recreate only the missing IWDA core schema from migration 0002_iwda,
        // including participant ownership which is part of the canonical model.
        await testEnv.DB
                .exec(`
CREATE TABLE IF NOT EXISTS iwda_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  participant_id TEXT,
  anonymous_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'started',
  started_at TEXT NOT NULL,
  completed_at TEXT
);
CREATE TABLE IF NOT EXISTS iwda_answers (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES iwda_attempts(id)
);
CREATE TABLE IF NOT EXISTS iwda_results (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL UNIQUE,
  user_id TEXT,
  innovation_readiness_index REAL,
  traits TEXT,
  result_data TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES iwda_attempts(id)
);
CREATE TABLE IF NOT EXISTS iwda_insights (
  id TEXT PRIMARY KEY,
  result_id TEXT NOT NULL,
  insight_type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (result_id) REFERENCES iwda_results(id)
);
CREATE INDEX IF NOT EXISTS idx_iwda_attempts_user ON iwda_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_iwda_attempts_session ON iwda_attempts(anonymous_session_id);
CREATE INDEX IF NOT EXISTS idx_iwda_answers_attempt ON iwda_answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_iwda_results_user ON iwda_results(user_id);
CREATE INDEX IF NOT EXISTS idx_iwda_insights_result ON iwda_insights(result_id);
                        `);
}

// Bring participant ownership to the canonical state for both fresh and reused
// schemas. This is deliberately checked by column metadata because older test
// databases may already contain the table but predate participant ownership.
const attempts = await testEnv.DB
        .prepare("PRAGMA table_info(iwda_attempts)")
        .all<{ name: string }>();
const hasParticipantOwner = attempts.results.some(
        (column) => column.name === "participant_id"
);

if (!hasParticipantOwner) {
        await testEnv.DB
                .prepare("ALTER TABLE iwda_attempts ADD COLUMN participant_id TEXT")
                .run();
}

await testEnv.DB
        .prepare(
                "CREATE INDEX IF NOT EXISTS idx_iwda_attempts_participant ON iwda_attempts(participant_id)"
        )
        .run();

// ─────────────────────────────────────────────────────────────────────────────
// Canonical Career Catalogue — ensure migration 0010 tables exist, then seed
// the 15 worlds (idempotent) and the World 01 reference careers for tests.
// ─────────────────────────────────────────────────────────────────────────────
const worldTables = await testEnv.DB
        .prepare(
                "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'career_worlds'"
        )
        .all<{ name: string }>();

if (worldTables.results.length === 0) {
        await testEnv.DB.exec(`
CREATE TABLE IF NOT EXISTS career_worlds (
  id TEXT PRIMARY KEY,
  world_no INTEGER NOT NULL UNIQUE CHECK (world_no BETWEEN 1 AND 15),
  canonical_name TEXT NOT NULL,
  canonical_slug TEXT NOT NULL UNIQUE,
  seo_slug TEXT UNIQUE,
  legacy_slug TEXT UNIQUE,
  tagline TEXT,
  description TEXT,
  display_order INTEGER NOT NULL,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  canonical_slug TEXT NOT NULL UNIQUE,
  canonical_name TEXT NOT NULL UNIQUE,
  published_name TEXT NOT NULL,
  world_id TEXT NOT NULL,
  cluster TEXT,
  career_status TEXT NOT NULL DEFAULT 'current',
  editorial_status TEXT NOT NULL DEFAULT 'draft',
  evidence_status TEXT NOT NULL DEFAULT 'source_verified',
  description TEXT,
  source TEXT,
  provenance TEXT,
  catalogue_version TEXT NOT NULL DEFAULT '2.0',
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (world_id) REFERENCES career_worlds(id)
);
CREATE TABLE IF NOT EXISTS career_profiles (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL UNIQUE,
  summary TEXT,
  daily_work TEXT,
  key_tasks_json TEXT,
  skills_needed_json TEXT,
  education_pathways_json TEXT,
  learning_resources_json TEXT,
  outlook TEXT,
  attributes_json TEXT,
  iwda_dimensions_json TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (career_id) REFERENCES careers(id)
);
CREATE TABLE IF NOT EXISTS career_relations (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL,
  related_career_id TEXT NOT NULL,
  relation_type TEXT NOT NULL,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (career_id) REFERENCES careers(id),
  FOREIGN KEY (related_career_id) REFERENCES careers(id)
);
CREATE TABLE IF NOT EXISTS career_progression (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL,
  next_career_id TEXT NOT NULL,
  progression_type TEXT NOT NULL,
  description TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (career_id) REFERENCES careers(id),
  FOREIGN KEY (next_career_id) REFERENCES careers(id)
);
CREATE INDEX IF NOT EXISTS idx_career_worlds_order ON career_worlds(display_order);
CREATE INDEX IF NOT EXISTS idx_careers_world ON careers(world_id);
CREATE INDEX IF NOT EXISTS idx_careers_status ON careers(editorial_status);
                        `);
}

await seedWorlds(testEnv.DB);
await seedCareerWorld(testEnv.DB, worldOneSeed as unknown as CareerSeedFile);
