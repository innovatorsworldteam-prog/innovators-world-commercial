import { SELF, env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

type TestEnv = { DB: D1Database };
const db = (env as unknown as TestEnv).DB;

async function json(response: Response): Promise<Record<string, any>> {
  return (await response.json()) as Record<string, any>;
}

describe("International validation funnel", () => {
  it("serves /validate without replacing the application entry point", async () => {
    const response = await SELF.fetch("http://example.com/validate");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    const html = await response.text();
    expect(html).toContain("Understand how you");
    expect(html).toContain("Discover Your Innovation DNA");
  });

  it("records only the approved validation events", async () => {
    const valid = await SELF.fetch("http://example.com/api/validation/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event_name: "landing_view", metadata: { surface: "validate" } }),
    });
    expect(valid.status).toBe(200);
    expect((await json(valid)).recorded).toBe(true);

    const invalid = await SELF.fetch("http://example.com/api/validation/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event_name: "vanity_metric" }),
    });
    expect(invalid.status).toBe(400);
  });

  it("enforces the authoritative 305-career dependency when a careers table exists", async () => {
    const table = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='careers' LIMIT 1").first<{ name: string }>();
    expect(table?.name, "Authoritative 305-career source is required before career recommendations can be enabled.").toBe("careers");
    const row = await db.prepare("SELECT COUNT(*) AS count FROM careers").first<{ count: number }>();
    expect(Number(row?.count), "Career source must contain exactly 305 canonical careers; do not substitute 300 or 180.").toBe(305);
  });
});
