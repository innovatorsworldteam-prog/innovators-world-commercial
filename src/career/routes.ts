import { careerDiscoveryQuestions, completeCareerDiscovery, recordCareerDiscoveryAnswer, startCareerDiscovery } from "./discovery";

export function careerError(message: string): Response {
  const map: Record<string, number> = {
    AGE_OUT_OF_RANGE: 400,
    CAREER_DISCOVERY_NOT_ACTIVE: 503,
    INVALID_ASSESSMENT_TIER: 400,
    ASSESSMENT_OWNER_REQUIRED: 401,
    ASSESSMENT_ATTEMPT_NOT_FOUND: 404,
    ASSESSMENT_ATTEMPT_NOT_ACTIVE: 409,
    INVALID_QUESTION: 400,
    INVALID_OPTION: 400,
    QUESTION_DIMENSION_MISSING: 500,
    OPTION_SCORING_INVALID: 500,
    ANSWER_OPTION_MISSING: 500,
  };
  if (message.startsWith("INCOMPLETE_ASSESSMENT:")) return Response.json({ error: "Assessment is incomplete.", missing: Number(message.split(":")[1]) || null }, { status: 400 });
  return Response.json({ error: message }, { status: map[message] || 500 });
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const value: unknown = await request.json();
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Request body must be a JSON object");
  return value as Record<string, unknown>;
}

function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }
function int(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isInteger(n) ? n : null;
}

export async function handleCareerDiscovery(request: Request, env: { DB: D1Database }): Promise<Response | null> {
  const url = new URL(request.url);
  try {
    if (url.pathname === "/api/career-discovery/questions" && request.method === "GET") {
      const age = int(url.searchParams.get("age"));
      if (age === null) return careerError("AGE_OUT_OF_RANGE");
      const data = await careerDiscoveryQuestions(env.DB, age);
      return Response.json({
        status: "ok",
        assessment: "CAREER_DISCOVERY",
        version: data.version.version,
        methodology_version: data.version.methodology_version,
        scoring_version: data.version.scoring_version,
        matching_version: data.version.matching_version,
        question_count: data.questions.length,
        questions: data.questions.map((question) => ({
          id: question.id,
          code: question.code,
          age_min: question.age_min,
          age_max: question.age_max,
          question_type: question.question_type,
          prompt: question.prompt,
          helper_text: question.helper_text,
          required: Boolean(question.required),
          display_order: question.display_order,
          options: question.options.map((option) => ({ id: option.id, code: option.code, label: option.label, display_order: option.display_order })),
        })),
      });
    }

    if (url.pathname === "/api/career-discovery/start" && request.method === "POST") {
      const b = await readBody(request);
      const age = int(b.age);
      if (age === null) return careerError("AGE_OUT_OF_RANGE");
      const participantId = text(b.participant_id) || null;
      const anonymousSessionId = text(b.anonymous_session_id) || null;
      if (!participantId && !anonymousSessionId) return careerError("ASSESSMENT_OWNER_REQUIRED");
      const data = await startCareerDiscovery(env.DB, {
        age,
        participantId,
        userId: text(b.user_id) || null,
        anonymousSessionId,
        tier: text(b.tier) || "free",
      });
      return Response.json({ status: "ok", assessment: "CAREER_DISCOVERY", ...data });
    }

    if (url.pathname === "/api/career-discovery/answer" && request.method === "POST") {
      const b = await readBody(request);
      const attemptId = text(b.attempt_id);
      const questionId = text(b.question_id);
      const optionId = text(b.option_id);
      if (!attemptId || !questionId || !optionId) return Response.json({ error: "attempt_id, question_id and option_id are required." }, { status: 400 });
      await recordCareerDiscoveryAnswer(env.DB, { attemptId, questionId, optionId, answerValue: text(b.answer_value) || null });
      return Response.json({ status: "ok", recorded: true });
    }

    if (url.pathname === "/api/career-discovery/complete" && request.method === "POST") {
      const b = await readBody(request);
      const attemptId = text(b.attempt_id);
      if (!attemptId) return Response.json({ error: "attempt_id is required." }, { status: 400 });
      const data = await completeCareerDiscovery(env.DB, attemptId);
      const parsed = JSON.parse(data.result.result_json);
      return Response.json({ status: "ok", completed: true, reused: data.reused, scoring_status: "complete", result: { id: data.result.id, attempt_id: data.result.attempt_id, overall_score: data.result.overall_score, algorithm_version: data.result.algorithm_version, generated_at: data.result.generated_at, result_data: parsed } });
    }

    return null;
  } catch (error) {
    console.error("Career Discovery request failed", error);
    return careerError(error instanceof Error ? error.message : String(error));
  }
}
