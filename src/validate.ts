import { calculateIWDAResult } from "./iwda/scoring";
import { IWDA_QUESTIONS } from "./iwda/questions";

type Env = { DB: D1Database; ASSETS?: Fetcher };
type JsonObject = Record<string, unknown>;

const json = (data: unknown, status = 200) => Response.json(data, { status });
const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";

async function readBody(request: Request): Promise<JsonObject> {
  const value: unknown = await request.json();
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Request body must be a JSON object");
  return value as JsonObject;
}

const VALIDATION_EVENTS = new Set([
  "landing_view", "iwda_start", "iwda_complete", "result_view", "account_created",
  "career_explored", "career_saved", "report_offer_view", "checkout_started",
  "payment_completed", "report_opened", "next_action_selected", "experiment_started", "referral_shared"
]);

export async function handleValidation(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/validate" && request.method === "GET") {
    if (!env.ASSETS) return json({ error: "Validation page is not configured." }, 503);
    return env.ASSETS.fetch(new Request(new URL("/validate/index.html", request.url), request));
  }

  if (url.pathname === "/api/validation/event" && request.method === "POST") {
    try {
      const b = await readBody(request);
      const eventName = text(b.event_name);
      if (!VALIDATION_EVENTS.has(eventName)) return json({ error: "Invalid validation event." }, 400);
      const now = new Date().toISOString();
      await env.DB.prepare(`INSERT INTO validation_events (id,event_name,attempt_id,participant_id,metadata_json,created_at) VALUES (?,?,?,?,?,?)`)
        .bind(crypto.randomUUID(), eventName, text(b.attempt_id) || null, text(b.participant_id) || null, JSON.stringify(b.metadata ?? {}), now).run();
      return json({ status: "ok", recorded: true });
    } catch (error) {
      console.error("Validation event failed", error);
      return json({ error: "Unable to record validation event." }, 500);
    }
  }

  if (url.pathname.startsWith("/api/iwda/results/") && request.method === "GET") {
    const resultId = text(url.pathname.split("/").pop());
    if (!resultId) return json({ error: "Result id is required." }, 400);
    try {
      const row = await env.DB.prepare(`SELECT id,attempt_id,user_id,innovation_readiness_index,traits,result_data,created_at FROM iwda_results WHERE id=? LIMIT 1`)
        .bind(resultId).first<{ id:string; attempt_id:string; user_id:string|null; innovation_readiness_index:number|null; traits:string|null; result_data:string|null; created_at:string }>();
      if (!row) return json({ error: "IWDA result not found." }, 404);
      let resultData: unknown = null;
      let traits: unknown[] = [];
      try { resultData = row.result_data ? JSON.parse(row.result_data) : null; } catch {}
      try { const parsed = row.traits ? JSON.parse(row.traits) : []; traits = Array.isArray(parsed) ? parsed : []; } catch {}
      return json({ status: "ok", result: { ...row, traits, result_data: resultData } });
    } catch (error) {
      console.error("Validation result retrieval failed", error);
      return json({ error: "Unable to retrieve IWDA result." }, 500);
    }
  }

  if (url.pathname === "/api/validation/preview-result" && request.method === "POST") {
    try {
      const b = await readBody(request);
      const answers = Array.isArray(b.answers)
        ? b.answers.filter((item): item is { question_id:string; answer:string } => Boolean(item) && typeof item === "object" && typeof (item as JsonObject).question_id === "string" && typeof (item as JsonObject).answer === "string")
        : [];
      if (answers.length !== IWDA_QUESTIONS.length) return json({ error: `IWDA requires all ${IWDA_QUESTIONS.length} questions.` }, 400);
      return json({ status: "ok", result: calculateIWDAResult(answers) });
    } catch (error) {
      console.error("Validation preview result failed", error);
      return json({ error: "Unable to calculate result." }, 500);
    }
  }

  return null;
}
