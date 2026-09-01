/**
 * Canonical Career Catalogue HTTP routes.
 *
 * Wired into the Worker router. Conservative, read-first surface for the 780
 * universe:
 *   GET /api/catalogue/worlds              -> list the 15 canonical worlds
 *   GET /api/catalogue/worlds/:slug        -> world detail + its careers
 *   GET /api/catalogue/careers/:idOrSlug   -> hydrated career detail
 *   POST /api/catalogue/validate           -> run validation (dev|production)
 *   GET  /api/catalogue/status             -> catalogue edition + world counts
 *
 * Validation record-keeping writes to catalogue_status only in production mode.
 */
import { validateCanonicalCatalogue } from "./validate";
import {
  countCareers,
  getActiveCatalogueVersion,
  getCareerDetail,
  getWorld,
  getWorldAllocation,
  listCareersByWorld,
  listWorlds,
  resolveWorldId,
} from "../db/catalogue";
import { listSeoSlugs } from "./worlds";
import type { ValidationMode } from "./canonical";

function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }

export async function handleCatalogue(request: Request, env: { DB: D1Database }): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  try {
    if (path === "/api/catalogue/worlds" && request.method === "GET") {
      const worlds = await listWorlds(env.DB);
      return Response.json({
        status: "ok",
        world_count: worlds.length,
        seo_slugs: listSeoSlugs(),
        worlds: worlds.map((w) => ({
          id: w.id,
          world_no: w.world_no,
          canonical_name: w.canonical_name,
          canonical_slug: w.canonical_slug,
          seo_slug: w.seo_slug,
          legacy_slug: w.legacy_slug,
          tagline: w.tagline,
          description: w.description,
          display_order: w.display_order,
        })),
      });
    }

    const worldMatch = path.match(/^\/api\/catalogue\/worlds\/([^/]+)$/);
    if (worldMatch && request.method === "GET") {
      const alias = decodeURIComponent(worldMatch[1]);
      const worldId = resolveWorldId(alias);
      if (!worldId) return Response.json({ error: "World not found." }, { status: 404 });
      const world = await getWorld(env.DB, worldId);
      if (!world) return Response.json({ error: "World not found." }, { status: 404 });
      const careers = await listCareersByWorld(env.DB, worldId);
      return Response.json({
        status: "ok",
        world: {
          id: world.id,
          world_no: world.world_no,
          canonical_name: world.canonical_name,
          canonical_slug: world.canonical_slug,
          seo_slug: world.seo_slug,
          legacy_slug: world.legacy_slug,
          tagline: world.tagline,
          description: world.description,
        },
        career_count: careers.length,
        careers: careers.map((c) => ({
          id: c.id,
          canonical_slug: c.canonical_slug,
          canonical_name: c.canonical_name,
          published_name: c.published_name,
          cluster: c.cluster,
          career_status: c.career_status,
          editorial_status: c.editorial_status,
        })),
      });
    }

    const careerMatch = path.match(/^\/api\/catalogue\/careers\/([^/]+)$/);
    if (careerMatch && request.method === "GET") {
      const idOrSlug = decodeURIComponent(careerMatch[1]);
      const detail = await getCareerDetail(env.DB, idOrSlug);
      if (!detail) return Response.json({ error: "Career not found." }, { status: 404 });
      return Response.json({ status: "ok", career: detail.career, world: detail.world, profile: detail.profile });
    }

    if (path === "/api/catalogue/validate" && request.method === "POST") {
      const body: unknown = await request.json().catch(() => ({}));
      const mode: ValidationMode = text((body as { mode?: unknown })?.mode) === "production" ? "production" : "development";
      const report = await validateCanonicalCatalogue(env.DB, mode);
      return Response.json({ status: report.passed ? "ok" : "validation_failed", mode: report.mode, passed: report.passed, checked_at: report.checked_at, checks: report.checks });
    }

    if (path === "/api/catalogue/status" && request.method === "GET") {
      const version = await getActiveCatalogueVersion(env.DB);
      const total = await countCareers(env.DB);
      const allocation = await getWorldAllocation(env.DB);
      return Response.json({
        status: "ok",
        expected_career_count: 780,
        actual_career_count: total,
        catalogue_version: version ? { id: version.id, version: version.version, status: version.status } : null,
        world_allocation: allocation,
      });
    }

    return null;
  } catch (error) {
    console.error("Catalogue request failed", error);
    return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
