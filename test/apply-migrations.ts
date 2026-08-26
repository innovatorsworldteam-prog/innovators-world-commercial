import { applyD1Migrations, env } from "cloudflare:test";

type TestEnv = {
        DB: D1Database;
        TEST_MIGRATIONS: D1Migration[];
};

const testEnv = env as unknown as TestEnv;

// Workers Vitest can reuse the same workerd storage between runs. Do not
// replay the complete migration set against an already-created IWDA schema.
// In particular, migration 0009 is an additive ALTER TABLE migration and
// older local test databases may already contain iwda_attempts without the
// canonical participant_id column.
const schema = await testEnv.DB
        .prepare("PRAGMA table_info(iwda_attempts)")
        .all<{ name: string }>();

const hasAttemptsTable = schema.results.length > 0;
const hasParticipantOwner = schema.results.some(
        (column) => column.name === "participant_id"
);

if (!hasAttemptsTable) {
        // Fresh test database: apply the complete canonical migration set.
        await applyD1Migrations(testEnv.DB, testEnv.TEST_MIGRATIONS);
} else if (!hasParticipantOwner) {
        // Existing legacy test database: apply only the missing 0009 schema
        // change instead of replaying migrations 0001-0009.
        await testEnv.DB
                .prepare("ALTER TABLE iwda_attempts ADD COLUMN participant_id TEXT")
                .run();
        await testEnv.DB
                .prepare(
                        "CREATE INDEX IF NOT EXISTS idx_iwda_attempts_participant ON iwda_attempts(participant_id)"
                )
                .run();
}
