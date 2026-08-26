import { applyD1Migrations, env } from "cloudflare:test";

type TestEnv = {
        DB: D1Database;
        TEST_MIGRATIONS: D1Migration[];
};

const testEnv = env as unknown as TestEnv;

// Workers Vitest can reuse the same workerd storage between runs. If the
// canonical IWDA ownership column is already present, the migration set has
// already been applied to this test database and must not be replayed.
const schema = await testEnv.DB
        .prepare("PRAGMA table_info(iwda_attempts)")
        .all<{ name: string }>();

const hasParticipantOwner = schema.results.some(
        (column) => column.name === "participant_id"
);

if (!hasParticipantOwner) {
        await applyD1Migrations(testEnv.DB, testEnv.TEST_MIGRATIONS);
}
