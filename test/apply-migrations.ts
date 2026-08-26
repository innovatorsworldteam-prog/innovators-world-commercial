import { applyD1Migrations, env } from "cloudflare:test";

type TestEnv = {
        DB: D1Database;
        TEST_MIGRATIONS: D1Migration[];
};

const testEnv = env as unknown as TestEnv;

// Workers Vitest may reuse workerd storage between local runs. In that case
// the database schema can already exist even when the migration bookkeeping
// supplied to the test pool is fresh. Replaying the full migration set would
// then re-run non-idempotent ALTER TABLE statements from older migrations.
const tables = await testEnv.DB
        .prepare(
                "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('iwda_attempts', 'participants')"
        )
        .all<{ name: string }>();

const hasCanonicalSchema = tables.results.length > 0;

if (!hasCanonicalSchema) {
        // Fresh test database: apply the complete canonical migration set.
        await applyD1Migrations(testEnv.DB, testEnv.TEST_MIGRATIONS);
} else {
        // Existing test database: do not replay the complete migration set.
        // Bring the IWDA participant ownership column/index to the canonical
        // state when running against an older local schema.
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
}
