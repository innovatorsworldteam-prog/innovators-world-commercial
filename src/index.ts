type JsonBody = Record<string, unknown>;

async function readJsonBody(request: Request): Promise<JsonBody> {
  const body: unknown = await request.json();

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Request body must be a JSON object");
  }

  return body as JsonBody;
}
import {
  calculateIWDAResult,
  type IWDAScoredAnswer,
} from "./iwda/scoring";
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      const result = await env.DB
        .prepare("SELECT 1 AS ok")
        .first();

      return Response.json({
        status: "ok",
        database: result?.ok === 1,
        service: "innovators-world-commercial",
      });
    }

    if (url.pathname === "/api/events") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      try {
        const body = await readJsonBody(request);

        const eventType =
          typeof body.event_type === "string"
            ? body.event_type.trim()
            : "";

        const page =
          typeof body.page === "string"
            ? body.page.trim()
            : null;

        const userId =
          typeof body.user_id === "string"
            ? body.user_id.trim()
            : null;

        const anonymousSessionId =
          typeof body.anonymous_session_id === "string"
            ? body.anonymous_session_id.trim()
            : null;

        const metadata =
          body.metadata && typeof body.metadata === "object"
            ? JSON.stringify(body.metadata)
            : null;

        if (!eventType) {
          return Response.json(
            { error: "event_type is required" },
            { status: 400 }
          );
        }

        await env.DB
          .prepare(`
            INSERT INTO events (
              id,
              user_id,
              anonymous_session_id,
              event_type,
              page,
              metadata,
              created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
          `)
          .bind(
            crypto.randomUUID(),
            userId,
            anonymousSessionId,
            eventType,
            page,
            metadata
          )
          .run();

        return Response.json({
          status: "ok",
          recorded: true,
        });
      } catch (error) {
        console.error("Event ingestion error:", error);

        return Response.json(
          {
            error: "Unable to record event",
          },
          { status: 500 }
        );
      }
    }
    if (url.pathname === "/api/iwda/start") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      try {
        const body = await readJsonBody(request);

        const userId =
          typeof body.user_id === "string"
            ? body.user_id.trim()
            : null;

        const anonymousSessionId =
          typeof body.anonymous_session_id === "string"
            ? body.anonymous_session_id.trim()
            : null;

        const attemptId = crypto.randomUUID();

        await env.DB
          .prepare(`
            INSERT INTO iwda_attempts (
              id,
              user_id,
              anonymous_session_id,
              status,
              started_at
            )
            VALUES (?, ?, ?, 'started', datetime('now'))
          `)
          .bind(
            attemptId,
            userId,
            anonymousSessionId
          )
          .run();

        return Response.json({
          status: "ok",
          attempt_id: attemptId,
          assessment: "IWDA",
        });
      } catch (error) {
        console.error("IWDA start error:", error);

        return Response.json(
          {
            error: String(error),
          },
          { status: 500 }
        );
      }
    }
    if (url.pathname === "/api/iwda/answer") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      try {
        const body = await readJsonBody(request);

        const attemptId =
          typeof body.attempt_id === "string"
            ? body.attempt_id.trim()
            : "";

        const questionId =
          typeof body.question_id === "string"
            ? body.question_id.trim()
            : "";

        const answer =
          typeof body.answer === "string"
            ? body.answer.trim()
            : "";

        if (!attemptId || !questionId || !answer) {
          return Response.json(
            {
              error:
                "attempt_id, question_id and answer are required",
            },
            { status: 400 }
          );
        }

        const attempt = await env.DB
          .prepare(
            "SELECT id, status FROM iwda_attempts WHERE id = ?"
          )
          .bind(attemptId)
          .first();

        if (!attempt) {
          return Response.json(
            { error: "IWDA attempt not found" },
            { status: 404 }
          );
        }

        if (attempt.status !== "started") {
          return Response.json(
            { error: "IWDA attempt is not active" },
            { status: 409 }
          );
        }

        const answerId = crypto.randomUUID();

        await env.DB
          .prepare(`
            INSERT INTO iwda_answers (
              id,
              attempt_id,
              question_id,
              answer,
              created_at
            )
            VALUES (?, ?, ?, ?, datetime('now'))
          `)
          .bind(
            answerId,
            attemptId,
            questionId,
            answer
          )
          .run();

        return Response.json({
          status: "ok",
          recorded: true,
          answer_id: answerId,
          attempt_id: attemptId,
        });
      } catch (error) {
        console.error("IWDA answer error:", error);

        return Response.json(
          {
            error: "Unable to record answer",
          },
          { status: 500 }
        );
      }
    }
    if (url.pathname === "/api/iwda/complete") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      try {
        const body = await readJsonBody(request);

        const attemptId =
          typeof body.attempt_id === "string"
            ? body.attempt_id.trim()
            : "";

        if (!attemptId) {
          return Response.json(
            { error: "attempt_id is required" },
            { status: 400 }
          );
        }

        const attempt = await env.DB
          .prepare(`
            SELECT id, user_id, status
            FROM iwda_attempts
            WHERE id = ?
          `)
          .bind(attemptId)
          .first();

        if (!attempt) {
          return Response.json(
            { error: "IWDA attempt not found" },
            { status: 404 }
          );
        }

        if (attempt.status !== "started") {
          return Response.json(
            { error: "IWDA attempt is not active" },
            { status: 409 }
          );
        }

        const answers = await env.DB
          .prepare(`
            SELECT
              id,
              question_id,
              answer,
              created_at
            FROM iwda_answers
            WHERE attempt_id = ?
            ORDER BY created_at ASC
          `)
          .bind(attemptId)
          .all();

        if (!answers.results || answers.results.length === 0) {
          return Response.json(
            { error: "No answers recorded for this attempt" },
            { status: 400 }
          );
        }

        const completedAt = new Date().toISOString();

        await env.DB
          .prepare(`
            UPDATE iwda_attempts
            SET
              status = 'completed',
              completed_at = ?
            WHERE id = ?
          `)
          .bind(completedAt, attemptId)
          .run();

        if (answers.results.length !== 24) {
          return Response.json(
            {
              error: "All 24 IWDA answers are required",
              answer_count: answers.results.length,
              required_count: 24,
            },
            { status: 400 }
          );
        }

        const scoredAnswers: IWDAScoredAnswer[] =
          answers.results.map((answer) => ({
            question_id: String(answer.question_id),
            answer: String(answer.answer),
          }));

        const scoredResult = calculateIWDAResult(scoredAnswers);

        const resultId = crypto.randomUUID();

        const traitsJson = JSON.stringify(scoredResult.traits);

        const resultData = JSON.stringify({
          assessment: "IWDA",
          version: "1.0",
          attempt_id: attemptId,
          answer_count: scoredAnswers.length,
          scoring_status: "complete",
          innovation_readiness_index:
            scoredResult.innovation_readiness_index,
          level: scoredResult.level,
          traits: scoredResult.traits,
          primary_strength: scoredResult.primary_strength,
          secondary_strength: scoredResult.secondary_strength,
          growth_dimension: scoredResult.growth_dimension,
          dimension_scores: scoredResult.dimension_scores,
          answers: answers.results,
        });

        await env.DB
          .prepare(`
            INSERT INTO iwda_results (
              id,
              attempt_id,
              user_id,
              innovation_readiness_index,
              traits,
              result_data,
              created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
          `)
          .bind(
            resultId,
            attemptId,
            attempt.user_id ?? null,
            scoredResult.innovation_readiness_index,
            traitsJson,
            resultData
          )
          .run();

        return Response.json({
          status: "ok",
          completed: true,
          attempt_id: attemptId,
          result_id: resultId,
          scoring_status: "complete",
          answer_count: scoredAnswers.length,
          innovation_readiness_index:
            scoredResult.innovation_readiness_index,
          level: scoredResult.level,
          traits: scoredResult.traits,
          primary_strength:
            scoredResult.primary_strength,
          secondary_strength:
            scoredResult.secondary_strength,
          growth_dimension:
            scoredResult.growth_dimension,
        });
      } catch (error) {
        console.error("IWDA completion error:", error);

        return Response.json(
          {
            error: "Unable to complete IWDA attempt",
          },
          { status: 500 }
        );
      }
    }
    if (url.pathname === "/api/iwda/result") {
      if (request.method !== "GET") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      try {
        const attemptId = url.searchParams.get("attempt_id")?.trim();

        if (!attemptId) {
          return Response.json(
            { error: "attempt_id is required" },
            { status: 400 }
          );
        }

        const result = await env.DB
          .prepare(`
            SELECT
              id,
              attempt_id,
              user_id,
              innovation_readiness_index,
              traits,
              result_data,
              created_at
            FROM iwda_results
            WHERE attempt_id = ?
          `)
          .bind(attemptId)
          .first();

        if (!result) {
          return Response.json(
            { error: "IWDA result not found" },
            { status: 404 }
          );
        }

        let resultData = null;

        if (typeof result.result_data === "string") {
          try {
            resultData = JSON.parse(result.result_data);
          } catch {
            resultData = result.result_data;
          }
        }

        return Response.json({
          status: "ok",
          result: {
            id: result.id,
            attempt_id: result.attempt_id,
            user_id: result.user_id,
            innovation_readiness_index:
              result.innovation_readiness_index,
            traits: result.traits,
            result_data: resultData,
            created_at: result.created_at,
          },
        });
      } catch (error) {
        console.error("IWDA result retrieval error:", error);

        return Response.json(
          {
            error: "Unable to retrieve IWDA result",
          },
          { status: 500 }
        );
      }
    }
    return (env as Env & {
  ASSETS: { fetch: typeof fetch };
}).ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;