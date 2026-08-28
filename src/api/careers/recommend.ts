import type { IwdaDimension } from "../../iwda/questions";

type CareerEnv = { DB: D1Database };

type CareerRow = {
  id: string;
  canonical_name: string;
  world_id: number;
  world_slug: string;
  description: string | null;
  provenance: string;
};

const BLOCKED_REASON = "Authoritative production career catalogue is not established. Editorial reference evidence must be reconciled and explicitly versioned before recommendations are enabled.";
const NEXT_ACTION = "Your strongest World fits are ready to explore. Personalised career possibilities will be added from the verified career catalogue.";

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

function invalid(reason: string): Response {
  return json({ status: "invalid", code: "CAREER_CATALOGUE_INVALID", reason, careers: [] }, 422);
}

async function tableExists(db: D1Database, name: string): Promise<boolean> {
  const row = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=? LIMIT 1").bind(name).first<{ name: string }>();
  return Boolean(row?.name);
}

async function validateCareerSource(db: D1Database): Promise<{ state: "blocked" | "invalid" | "verified"; reason?: string }> {
  if (!(await tableExists(db, "careers"))) return { state: "blocked" };

  const columns = await db.prepare("PRAGMA table_info(careers)").all<{ name: string }>();
  const names = new Set((columns.results ?? []).map((c) => c.name));
  const required = ["id", "canonical_name", "world_id", "world_slug", "description", "provenance"];
  const missing = required.filter((column) => !names.has(column));
  if (missing.length) return { state: "invalid", reason: `careers table is missing required columns: ${missing.join(", ")}` };

  const count = await db.prepare("SELECT COUNT(*) AS count FROM careers").first<{ count: number }>();
  if (Number(count?.count) !== 305) return { state: "invalid", reason: `Authoritative careers source must contain exactly 305 records; found ${Number(count?.count) || 0}.` };

  const duplicateIds = await db.prepare("SELECT id FROM careers GROUP BY id HAVING COUNT(*) > 1 LIMIT 1").first<{ id: string }>();
  if (duplicateIds?.id) return { state: "invalid", reason: "Duplicate career IDs detected." };

  const duplicateNames = await db.prepare("SELECT lower(trim(canonical_name)) AS name FROM careers GROUP BY lower(trim(canonical_name)) HAVING COUNT(*) > 1 LIMIT 1").first<{ name: string }>();
  if (duplicateNames?.name) return { state: "invalid", reason: "Duplicate canonical career names detected." };

  const malformed = await db.prepare("SELECT id FROM careers WHERE trim(id)='' OR trim(canonical_name)='' OR world_id IS NULL OR trim(world_slug)='' OR trim(provenance)='' LIMIT 1").first<{ id: string }>();
  if (malformed?.id) return { state: "invalid", reason: "Career source contains records with missing identity, World relationship, or provenance." };

  return { state: "verified" };
}

function dimensionWorldWeights(dimension: IwdaDimension): number[] {
  const map: Record<IwdaDimension, number[]> = {
    OBS: [2, 5, 9, 10, 14],
    QUE: [1, 2, 6, 7, 10],
    IMA: [1, 3, 8, 12, 14],
    CRE: [1, 3, 8, 12, 15],
    TST: [1, 2, 3, 5, 14],
    IMP: [3, 5, 6, 8, 15],
  };
  return map[dimension];
}

function worldScores(resultData: unknown): Array<{ world_id: number; score: number }> {
  const data = (resultData && typeof resultData === "object" ? resultData : {}) as Record<string, unknown>;
  const dimensions = Array.isArray(data.dimensions) ? data.dimensions : [];
  const scores = new Map<number, number>();
  for (const item of dimensions) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const code = typeof row.code === "string" ? row.code as IwdaDimension : null;
    const score = Number(row.score);
    if (!code || !Number.isFinite(score)) continue;
    for (const worldId of dimensionWorldWeights(code)) scores.set(worldId, (scores.get(worldId) ?? 0) + score);
  }
  return [...scores.entries()].map(([world_id, score]) => ({ world_id, score })).sort((a, b) => b.score - a.score).slice(0, 5);
}

export async function handleCareerRecommendations(request: Request, env: CareerEnv): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== "/api/careers/recommend" || request.method !== "GET") return null;

  const attemptId = url.searchParams.get("iwda_attempt_id")?.trim() || "";
  const limit = Math.min(3, Math.max(1, Number(url.searchParams.get("limit") || 3)));
  if (!attemptId) return json({ error: "iwda_attempt_id is required." }, 400);

  try {
    const source = await validateCareerSource(env.DB);
    if (source.state === "blocked") {
      return json({
        status: "blocked",
        code: "CAREER_CATALOGUE_NOT_VERIFIED",
        dependency_reason: BLOCKED_REASON,
        library_reference: 300,
        current_production_requirement: 305,
        verified_authoritative_production_source: "NOT FOUND",
        unresolved_difference: 5,
        missing_five: "NOT INVENTED",
        careers: [],
        worlds_available: 15,
        next_action: NEXT_ACTION,
        http_status: 200,
      });
    }
    if (source.state === "invalid") return invalid(source.reason || "Career source failed integrity validation.");

    const result = await env.DB.prepare("SELECT result_data FROM iwda_results WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{ result_data: string | null }>();
    if (!result) return json({ error: "IWDA result not found." }, 404);
    let parsed: unknown = null;
    try { parsed = result.result_data ? JSON.parse(result.result_data) : null; } catch { return invalid("IWDA result_data is malformed."); }
    const worlds = worldScores(parsed);
    if (!worlds.length) return invalid("IWDA result does not contain usable World-fit dimensions.");

    const topWorldIds = worlds.map((w) => w.world_id);
    const placeholders = topWorldIds.map(() => "?").join(",");
    const rows = await env.DB.prepare(`SELECT id,canonical_name,world_id,world_slug,description,provenance FROM careers WHERE world_id IN (${placeholders}) ORDER BY world_id, id LIMIT ?`).bind(...topWorldIds, limit).all<CareerRow>();
    const careers = (rows.results ?? []).slice(0, limit).map((career) => ({ ...career, trace: { iwda_attempt_id: attemptId, world_score: worlds.find((w) => w.world_id === career.world_id)?.score ?? null } }));
    if (careers.length !== limit) return invalid("Verified career source does not contain enough World-linked records for the requested recommendation count.");
    return json({ status: "verified", code: "CAREER_RECOMMENDATIONS_VERIFIED", careers, worlds: worlds.map((w) => ({ world_id: w.world_id, score: w.score })) });
  } catch (error) {
    console.error("Career recommendation request failed", error);
    return json({ error: "Unable to evaluate career recommendations." }, 500);
  }
}
