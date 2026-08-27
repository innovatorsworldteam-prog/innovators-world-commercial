import { applyD1Migrations, env } from "cloudflare:test";

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
