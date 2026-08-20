import {
  calculateIWDAResult,
  type IWDAScoredAnswer,
} from "./iwda/scoring";
import { IWDA_QUESTIONS } from "./iwda/questions";

type JsonBody = Record<string, unknown>;

type IWDAResultRow = {
  id: string;
  attempt_id: string;
  user_id: string | null;
  innovation_readiness_index: number;
  traits: string | null;
  result_data: string | null;
  created_at: string;
};

async function readJsonBody(request: Request): Promise<JsonBody> {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("Request body must be a JSON object");
    }
    return body as JsonBody;
  } catch {
    throw new Error("Invalid JSON request body");
  }
}

function jsonError(error: string, status: number, extra: Record<string, unknown> = {}) {
  return Response.json({ error, ...extra }, { status });
}

function publicResult(result: IWDAResultRow) {
  let resultData: unknown = null;
  if (typeof result.result_data === "string") {
    try {
      resultData = JSON.parse(result.result_data);
    } catch {
      resultData = null;
    }
  }
  return {
    id: result.id,
    attempt_id: result.attempt_id,
    user_id: result.user_id,
    innovation_readiness_index: result.innovation_readiness_index,
    traits: result.traits ? JSON.parse(result.traits) : [],
    result_data: resultData,
    created_at: result.created_at,
  };
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      if (request.method !== "GET") return jsonError("Method not allowed", 405);
      try {
        const result = await env.DB.prepare("SELECT 1 AS ok").first();
        return Response.json({
          status: "ok",
          database: result?.ok === 1,
          service: "innovators-world-commercial",
        });
      } catch (error) {
        console.error("Health check error:", error);
        return jsonError("Database unavailable", 503);
      }
    }

    if (url.pathname === "/api/events") {
      if (request.method !== "POST") return jsonError("Method not allowed", 405);
      try {
        const body = await readJsonBody(request);
        const eventType = typeof body.event_type === "string" ? body.event_type.trim() : "";
        if (!eventType) return jsonError("event_type is required", 400);
        const page = typeof body.page === "string" ? body.page.trim() : null;
        const userId = typeof body.user_id === "string" ? body.user_id.trim() : null;
        const anonymousSessionId = typeof body.anonymous_session_id === "string" ? body.anonymous_session_id.trim() : null;
        const metadata = body.metadata && typeof body.metadata === "object" ? JSON.stringify(body.metadata) : null;
        await env.DB.prepare(`
          INSERT INTO events (id, user_id, anonymous_session_id, event_type, page, metadata, created_at)
          VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(crypto.randomUUID(), userId, anonymousSessionId, eventType, page, metadata).run();
        return Response.json({ status: "ok", recorded: true });
      } catch (error) {
        console.error("Event ingestion error:", error);
        return jsonError("Unable to record event", 500);
      }
    }

    if (url.pathname === "/api/iwda/questions") {
      if (request.method !== "GET") return jsonError("Method not allowed", 405);
      return Response.json({
        status: "ok",
        assessment: "IWDA",
        version: "1.0",
        question_count: IWDA_QUESTIONS.length,
        questions: IWDA_QUESTIONS.map(({ id, prompt }) => ({
          id,
          prompt,
          options: ["A", "B", "C", "D"],
        })),
      });
    }

    if (url.pathname === "/api/iwda/start") {
      if (request.method !== "POST") return jsonError("Method not allowed", 405);
      try {
        const body = await readJsonBody(request);
        const userId = typeof body.user_id === "string" ? body.user_id.trim() : null;
        const anonymousSessionId = typeof body.anonymous_session_id === "string" ? body.anonymous_session_id.trim() : null;
        const attemptId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO iwda_attempts (id, user_id, anonymous_session_id, status, started_at)
          VALUES (?, ?, ?, 'started', datetime('now'))
        `).bind(attemptId, userId, anonymousSessionId).run();
        return Response.json({ status: "ok", attempt_id: attemptId, assessment: "IWDA" });
      } catch (error) {
        console.error("IWDA start error:", error);
        return jsonError("Unable to start IWDA", 500);
      }
    }

    if (url.pathname === "/api/iwda/answer") {
      if (request.method !== "POST") return jsonError("Method not allowed", 405);
      try {
        const body = await readJsonBody(request);
        const attemptId = typeof body.attempt_id === "string" ? body.attempt_id.trim() : "";
        const questionId = typeof body.question_id === "string" ? body.question_id.trim() : "";
        const answer = typeof body.answer === "string" ? body.answer.trim().toUpperCase() : "";
        if (!attemptId || !questionId || !answer) return jsonError("attempt_id, question_id and answer are required", 400);
        if (!IWDA_QUESTIONS.some((question) => question.id === questionId)) return jsonError("Invalid question_id", 400);
        if (!(answer === "A" || answer === "B" || answer === "C" || answer === "D")) return jsonError("answer must be A, B, C or D", 400);
        const attempt = await env.DB.prepare("SELECT id, status FROM iwda_attempts WHERE id = ?").bind(attemptId).first<{ id: string; status: string }>();
        if (!attempt) return jsonError("IWDA attempt not found", 404);
        if (attempt.status !== "started") return jsonError("IWDA attempt is not active", 409);
        await env.DB.prepare("DELETE FROM iwda_answers WHERE attempt_id = ? AND question_id = ?").bind(attemptId, questionId).run();
        const answerId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO iwda_answers (id, attempt_id, question_id, answer, created_at)
          VALUES (?, ?, ?, ?, datetime('now'))
        `).bind(answerId, attemptId, questionId, answer).run();
        return Response.json({ status: "ok", recorded: true, answer_id: answerId, attempt_id: attemptId, question_id: questionId });
      } catch (error) {
        console.error("IWDA answer error:", error);
        return jsonError("Unable to record answer", 500);
      }
    }

    if (url.pathname === "/api/iwda/complete") {
      if (request.method !== "POST") return jsonError("Method not allowed", 405);
      try {
        const body = await readJsonBody(request);
        const attemptId = typeof body.attempt_id === "string" ? body.attempt_id.trim() : "";
        if (!attemptId) return jsonError("attempt_id is required", 400);

        const existing = await env.DB.prepare("SELECT id, attempt_id, user_id, innovation_readiness_index, traits, result_data, created_at FROM iwda_results WHERE attempt_id = ?").bind(attemptId).first<IWDAResultRow>();
        if (existing) return Response.json({ status: "ok", completed: true, scoring_status: "complete", result: publicResult(existing) });

        const attempt = await env.DB.prepare("SELECT id, user_id, status FROM iwda_attempts WHERE id = ?").bind(attemptId).first<{ id: string; user_id: string | null; status: string }>();
        if (!attempt) return jsonError("IWDA attempt not found", 404);
        if (attempt.status !== "started") return jsonError("IWDA attempt is not active", 409);

        const answers = await env.DB.prepare(`
          SELECT question_id, answer FROM iwda_answers WHERE attempt_id = ? ORDER BY created_at ASC
        `).bind(attemptId).all<{ question_id: string; answer: string }>();
        const rows = answers.results ?? [];
        const uniqueQuestionIds = new Set(rows.map((row) => row.question_id));
        if (rows.length !== 24 || uniqueQuestionIds.size !== 24) {
          return jsonError("All 24 IWDA questions must be answered exactly once", 400, { answer_count: uniqueQuestionIds.size, required_count: 24 });
        }

        const scoredAnswers: IWDAScoredAnswer[] = rows.map((row) => ({ question_id: String(row.question_id), answer: String(row.answer) }));
        const scoredResult = calculateIWDAResult(scoredAnswers);
        const resultId = crypto.randomUUID();
        const traitsJson = JSON.stringify(scoredResult.traits);
        const resultData = JSON.stringify({
          assessment: "IWDA",
          version: "1.0",
          attempt_id: attemptId,
          answer_count: scoredAnswers.length,
          scoring_status: "complete",
          innovation_readiness_index: scoredResult.innovation_readiness_index,
          level: scoredResult.level,
          traits: scoredResult.traits,
          primary_strength: scoredResult.primary_strength,
          secondary_strength: scoredResult.secondary_strength,
          growth_dimension: scoredResult.growth_dimension,
          dimension_scores: scoredResult.dimension_scores,
          answers: rows,
        });

        await env.DB.prepare(`
          INSERT INTO iwda_results (id, attempt_id, user_id, innovation_readiness_index, traits, result_data, created_at)
          VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(resultId, attemptId, attempt.user_id ?? null, scoredResult.innovation_readiness_index, traitsJson, resultData).run();

        await env.DB.prepare("UPDATE iwda_attempts SET status = 'completed', completed_at = ? WHERE id = ? AND status = 'started'").bind(new Date().toISOString(), attemptId).run();
        const result = await env.DB.prepare("SELECT id, attempt_id, user_id, innovation_readiness_index, traits, result_data, created_at FROM iwda_results WHERE id = ?").bind(resultId).first<IWDAResultRow>();
        return Response.json({ status: "ok", completed: true, scoring_status: "complete", result: result ? publicResult(result) : null });
      } catch (error) {
        console.error("IWDA completion error:", error);
        return jsonError("Unable to complete IWDA attempt", 500);
      }
    }

    if (url.pathname === "/api/iwda/result") {
      if (request.method !== "GET") return jsonError("Method not allowed", 405);
      try {
        const attemptId = url.searchParams.get("attempt_id")?.trim();
        if (!attemptId) return jsonError("attempt_id is required", 400);
        const result = await env.DB.prepare(`
          SELECT id, attempt_id, user_id, innovation_readiness_index, traits, result_data, created_at
          FROM iwda_results WHERE attempt_id = ?
        `).bind(attemptId).first<IWDAResultRow>();
        if (!result) return jsonError("IWDA result not found", 404);
        return Response.json({ status: "ok", result: publicResult(result) });
      } catch (error) {
        console.error("IWDA result retrieval error:", error);
        return jsonError("Unable to retrieve IWDA result", 500);
      }
    }

    return (env as Env & { ASSETS: { fetch: typeof fetch } }).ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
