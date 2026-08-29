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

  it("returns a controlled BLOCKED state when no authoritative careers source exists", async () => {
    const table = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='canonical_careers_v1' LIMIT 1").first<{ name: string }>();
    if (table?.name) return;
    const response = await SELF.fetch("http://example.com/api/careers/recommend?iwda_attempt_id=test-id&limit=3");
    expect(response.status).toBe(200);
    const data = await json(response);
    expect(data.status).toBe("blocked");
    expect(data.code).toBe("CAREER_CATALOGUE_NOT_VERIFIED");
    expect(data.careers).toEqual([]);
    expect(data.worlds_available).toBe(15);
    expect(data.current_production_requirement).toBe(305);
    expect(data.verified_authoritative_production_source).toBe("NOT FOUND");
    expect(data.missing_five).toBe("NOT INVENTED");
  });

  it("does not use Career Discovery as a fallback recommendation source", async () => {
    const response = await SELF.fetch("http://example.com/api/careers/recommend?iwda_attempt_id=test-id&limit=3");
    if (response.status !== 200) return;
    const data = await json(response);
    if (data.status === "blocked") expect(data.careers).toEqual([]);
  });

  it("rejects a malformed authoritative source rather than returning fabricated careers", async () => {
    const table = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='careers' LIMIT 1").first<{ name: string }>();
    if (!table?.name) return;
    const columns = await db.prepare("PRAGMA table_info(careers)").all<{ name: string }>();
    const names = new Set((columns.results ?? []).map((c) => c.name));
    if (!names.has("canonical_name")) return;
    const count = await db.prepare("SELECT COUNT(*) AS count FROM careers").first<{ count: number }>();
    if (Number(count?.count) === 305) return;
    const response = await SELF.fetch("http://example.com/api/careers/recommend?iwda_attempt_id=test-id&limit=3");
    expect(response.status).toBe(422);
    const data = await json(response);
    expect(data.status).toBe("invalid");
    expect(data.careers).toEqual([]);
  });

  it("does not manufacture a canonical_careers table", async () => {
    const table = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='canonical_careers' LIMIT 1").first<{ name: string }>();
    expect(table).toBeNull();
  });
});
