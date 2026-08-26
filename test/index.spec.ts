import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";

async function json(response: Response): Promise<Record<string, any>> {
	return (await response.json()) as Record<string, any>;
}

async function startAnonymous(session = crypto.randomUUID()) {
	return SELF.fetch("http://example.com/api/iwda/start", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ anonymous_session_id: session }),
	});
}

describe("Innovators World Commercial Worker", () => {
	it("GET /api/health returns a healthy service response", async () => {
		const response = await SELF.fetch("http://example.com/api/health");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.status).toBe("ok");
		expect(body.database).toBe(true);
	});

	it("GET /api/iwda/questions returns the canonical IWDA question structure", async () => {
		const response = await SELF.fetch("http://example.com/api/iwda/questions");
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(Array.isArray(body.questions)).toBe(true);
		expect(body.questions.length).toBeGreaterThan(0);
		for (const question of body.questions) {
			expect(question.id).toMatch(/^q\d+$/);
			expect(question.prompt).toEqual(expect.any(String));
			expect(Object.keys(question.options).sort()).toEqual(["A", "B", "C", "D"]);
		}
	});

	it("IWDA start creates an anonymous attempt", async () => {
		const response = await startAnonymous();
		expect(response.status).toBe(200);
		const body = await json(response);
		expect(body.status).toBe("ok");
		expect(body.assessment).toBe("IWDA");
		expect(body.attempt_id).toEqual(expect.any(String));
		expect(body.resumed).toBe(false);
	});

	it("IWDA start resumes an existing anonymous attempt", async () => {
		const session = crypto.randomUUID();
		const first = await startAnonymous(session);
		const firstBody = await json(first);
		const second = await startAnonymous(session);
		const secondBody = await json(second);

		expect(first.status).toBe(200);
		expect(second.status).toBe(200);
		expect(secondBody.attempt_id).toBe(firstBody.attempt_id);
		expect(secondBody.resumed).toBe(true);
	});

	it("IWDA start rejects a request without an owner", async () => {
		const response = await SELF.fetch("http://example.com/api/iwda/start", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({}),
		});
		expect(response.status).toBe(401);
	});

	it("IWDA answer rejects invalid answers", async () => {
		const start = await startAnonymous();
		const startBody = await json(start);
		const response = await SELF.fetch("http://example.com/api/iwda/answer", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				attempt_id: startBody.attempt_id,
				question_id: "q001",
				answer: "Z",
			}),
		});
		expect(response.status).toBe(400);
	});

	it("IWDA answer records a valid answer", async () => {
		const start = await startAnonymous();
		const startBody = await json(start);
		const response = await SELF.fetch("http://example.com/api/iwda/answer", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				attempt_id: startBody.attempt_id,
				question_id: "q001",
				answer: "B",
			}),
		});
		const body = await json(response);
		expect(response.status).toBe(200);
		expect(body.status).toBe("ok");
		expect(body.recorded).toBe(true);
	});

	it("IWDA completion rejects an incomplete assessment", async () => {
		const start = await startAnonymous();
		const startBody = await json(start);
		const response = await SELF.fetch("http://example.com/api/iwda/complete", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ attempt_id: startBody.attempt_id }),
		});
		const body = await json(response);
		expect(response.status).toBe(400);
		expect(body.error).toContain("requires all");
	});

	it("IWDA completes a fully answered assessment and is idempotent", async () => {
		const questionsResponse = await SELF.fetch("http://example.com/api/iwda/questions");
		const questionsBody = await json(questionsResponse);
		const questions = questionsBody.questions as Array<{ id: string }>;
		const start = await startAnonymous();
		const startBody = await json(start);
		const attemptId = startBody.attempt_id as string;

		for (const question of questions) {
			const answer = await SELF.fetch("http://example.com/api/iwda/answer", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					attempt_id: attemptId,
					question_id: question.id,
					answer: "B",
				}),
			});
			expect(answer.status).toBe(200);
		}

		const first = await SELF.fetch("http://example.com/api/iwda/complete", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ attempt_id: attemptId }),
		});
		const firstBody = await json(first);
		expect(first.status).toBe(200);
		expect(firstBody.completed).toBe(true);
		expect(firstBody.scoring_status).toBe("complete");
		expect(firstBody.result.id).toEqual(expect.any(String));
		expect(firstBody.result.attempt_id).toBe(attemptId);

		const second = await SELF.fetch("http://example.com/api/iwda/complete", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ attempt_id: attemptId }),
		});
		const secondBody = await json(second);
		expect(second.status).toBe(200);
		expect(secondBody.result.id).toBe(firstBody.result.id);
	});

	it("participant registration validates participant type before external email delivery", async () => {
		const response = await SELF.fetch("http://example.com/api/participants/register", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ participant_type: "invalid", full_name: "Test", consent_version: "v1" }),
		});
		const body = await json(response);
		expect(response.status).toBe(400);
		expect(body.error).toContain("Adult / 18+");
	});
});
