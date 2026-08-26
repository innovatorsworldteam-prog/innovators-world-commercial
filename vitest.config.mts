import path from "node:path";
import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
        const migrationsPath = path.join(import.meta.dirname, "migrations");
        const migrations = await readD1Migrations(migrationsPath);

        if (!migrations.length) {
                throw new Error(
                        "No D1 migrations were discovered. Expected SQL migrations in ./migrations."
                );
        }

        return {
                plugins: [
                        cloudflareTest({
                                wrangler: { configPath: "./wrangler.jsonc" },
                                miniflare: {
                                        bindings: {
                                                TEST_MIGRATIONS: migrations,
                                        },
                                },
                        }),
                ],
                test: {
                        setupFiles: ["./test/apply-migrations.ts"],
                },
        };
});
