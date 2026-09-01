import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";

async function json(response: Response): Promise<Record<string, any>> {
	return (await response.json()) as Record<string, any>;
}

describe("Canonical Career Catalogue", () => {
	it("GET /api/catalogue/worlds lists exactly 15 canonical worlds", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/worlds");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.status).toBe("ok");
		expect(body.world_count).toBe(15);
		expect(Array.isArray(body.worlds)).toBe(true);
		for (const world of body.worlds) {
			expect(world.world_no).toBeGreaterThanOrEqual(1);
			expect(world.world_no).toBeLessThanOrEqual(15);
			expect(world.canonical_name).toEqual(expect.any(String));
		}
	});

	it("GET /api/catalogue/worlds includes SEO slug aliases for unambiguous worlds", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/worlds");
		const body = await json(response);
		const tech = body.worlds.find((w: any) => w.world_no === 1);
		expect(tech).toBeTruthy();
		expect(tech.seo_slug).toBe("technology");
		expect(body.seo_slugs).toContain("technology");
	});

	it("GET /api/catalogue/worlds/:slug resolves by canonical slug", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/worlds/technology-computing");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.status).toBe("ok");
		expect(body.world.world_no).toBe(1);
		expect(body.world.canonical_name).toBe("Technology & Computing");
	});

	it("GET /api/catalogue/worlds/:slug resolves by SEO alias", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/worlds/technology");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.status).toBe("ok");
		expect(body.world.world_no).toBe(1);
	});

	it("GET /api/catalogue/worlds/:slug returns 404 for unknown world", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/worlds/does-not-exist");
		expect(response.status).toBe(404);
	});

	it("GET /api/catalogue/status reports expected 780 with actual World 01 count", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/status");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.expected_career_count).toBe(780);
		expect(typeof body.actual_career_count).toBe("number");
		expect(Array.isArray(body.world_allocation)).toBe(true);
		const world01 = body.world_allocation.find((w: any) => w.world_no === 1);
		expect(world01).toBeTruthy();
		expect(world01.career_count).toBeGreaterThanOrEqual(1);
	});

	it("POST /api/catalogue/validate in development mode passes with partial data", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/validate", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ mode: "development" }),
		});
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.mode).toBe("development");
		expect(Array.isArray(body.checks)).toBe(true);
	});

	it("POST /api/catalogue/validate in production mode fails until 780 careers are present", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/validate", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ mode: "production" }),
		});
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.mode).toBe("production");
		expect(body.passed).toBe(false);
		const careerCount = body.checks.find((c: any) => c.name === "invariant.career_count");
		expect(careerCount).toBeTruthy();
		expect(careerCount.passed).toBe(false);
	});

	it("GET /api/catalogue/careers/:slug returns hydrated career detail", async () => {
		const response = await SELF.fetch("http://example.com/api/catalogue/careers/ai-engineer");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.status).toBe("ok");
		expect(body.career.canonical_slug).toBe("ai-engineer");
		expect(body.world.world_no).toBe(1);
		expect(body.profile).toBeTruthy();
	});
});
