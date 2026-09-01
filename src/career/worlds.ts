/**
 * The 15 fixed Canonical Career Worlds + alias resolution.
 *
 * World identity (id, world_no, canonical_name, canonical_slug) is the single
 * source of truth. `seo_slug` and `legacy_slug` are one-to-one aliases used to
 * reconcile two existing naming schemes with canonical identity:
 *
 *   1. The SEO 15-worlds foundation (branch feat/seo-15-worlds) uses slugs like
 *      `technology`, `science`, `creativity`, ... — a *different* 15-world
 *      naming scheme. Where a SEO world is a clear 1:1 match it is recorded as
 *      `seo_slug`. Some SEO worlds are ambiguous or split across canonical
 *      worlds and are deliberately NOT assigned a single alias; use
 *      `resolveAlias` for forward compatibility and `SEO_AMBIGUITIES` to record
 *      those cases.
 *
 *   2. The legacy 305-career catalogue (branch feat/validate-international)
 *      referenced worlds by short slugs. Where a legacy slug maps unambiguously
 *      to a canonical world it is recorded as `legacy_slug`.
 */
import type { CareerWorld } from "./canonical";

/** Canonical world definition (identity only; metadata lives in the DB). */
export type WorldDefinition = {
  id: string;
  world_no: number;
  canonical_name: string;
  canonical_slug: string;
  /** SEO slug alias, when a clear 1:1 match exists. */
  seo_slug?: string;
  /** Legacy catalogue slug alias, when a clear 1:1 match exists. */
  legacy_slug?: string;
  tagline: string;
  description: string;
};

const WORLD_01_TAGLINE = "Build tools that expand human capability.";
const WORLD_01_DESC = "Software, AI, systems and digital infrastructure.";

export const CANONICAL_WORLDS: readonly WorldDefinition[] = [
  { id: "world-01", world_no:  1, canonical_name: "Technology & Computing",                      canonical_slug: "technology-computing",                seo_slug: "technology", legacy_slug: "technology",            tagline: WORLD_01_TAGLINE,                description: WORLD_01_DESC },
  { id: "world-02", world_no:  2, canonical_name: "Science & Discovery",                         canonical_slug: "science-discovery",                   seo_slug: "science",    legacy_slug: "science",               tagline: "Ask why, test how, discover what is next.",                      description: "Physics, biology, chemistry, research." },
  { id: "world-03", world_no:  3, canonical_name: "Engineering & Building",                      canonical_slug: "engineering-building",                                                  legacy_slug: "engineering",            tagline: "Design systems that work at scale.",                             description: "Mechanical, civil, electrical and systems." },
  { id: "world-04", world_no:  4, canonical_name: "Health & Human Wellbeing",                    canonical_slug: "health-human-wellbeing",              seo_slug: "health",     legacy_slug: "health",                tagline: "Design for wellbeing, care and flourishing.",                    description: "Medicine, therapy, public health, nutrition." },
  { id: "world-05", world_no:  5, canonical_name: "Life, Earth & Environment",                   canonical_slug: "life-earth-environment",              seo_slug: "environment", legacy_slug: "environment",          tagline: "Build a future where planet and people thrive.",                 description: "Ecology, conservation, climate, sustainability." },
  { id: "world-06", world_no:  6, canonical_name: "Business & Entrepreneurship",                 canonical_slug: "business-entrepreneurship",           seo_slug: "business",   legacy_slug: "business",              tagline: "Turn ideas into systems that serve people.",                     description: "Ventures, strategy, operations, growth." },
  { id: "world-07", world_no:  7, canonical_name: "Finance & Economics",                         canonical_slug: "finance-economics",                                                              legacy_slug: "finance",               tagline: "Design intelligent systems for value and risk.",                 description: "Markets, analysis, planning, FinTech." },
  { id: "world-08", world_no:  8, canonical_name: "Design & Creative Industries",                canonical_slug: "design-creative-industries",          seo_slug: "design",     legacy_slug: "design",                tagline: "Design futures that people want to live in.",                    description: "Product, UX, industrial, spatial design." },
  { id: "world-09", world_no:  9, canonical_name: "Media, Communication & Storytelling",         canonical_slug: "media-communication-storytelling",     seo_slug: "media",      legacy_slug: "media",                 tagline: "Tell stories that move people to act.",                          description: "Film, audio, writing, digital media." },
  { id: "world-10", world_no: 10, canonical_name: "Society, Law & Public Affairs",               canonical_slug: "society-law-public-affairs",          seo_slug: "law",        legacy_slug: "law",                   tagline: "Design justice, rights and fair systems.",                       description: "Legal, policy, governance, advocacy." },
  { id: "world-11", world_no: 11, canonical_name: "Education & Human Development",               canonical_slug: "education-human-development",         seo_slug: "education",  legacy_slug: "education",             tagline: "Design learning that awakens curiosity.",                        description: "Teaching, curriculum, learning science." },
  { id: "world-12", world_no: 12, canonical_name: "Culture, Arts & Heritage",                    canonical_slug: "culture-arts-heritage",                                                                legacy_slug: "arts",                  tagline: "Make with hands, heart and heritage.",                           description: "Visual arts, music, heritage, performance." },
  { id: "world-13", world_no: 13, canonical_name: "Food, Hospitality & Experiences",             canonical_slug: "food-hospitality-experiences",                                                 legacy_slug: "hospitality",           tagline: "Design experiences that nourish and delight.",                   description: "Culinary, hospitality, event, travel." },
  { id: "world-14", world_no: 14, canonical_name: "Exploration, Transport & Space",              canonical_slug: "exploration-transport-space",         seo_slug: "exploration", legacy_slug: "exploration",         tagline: "Go beyond maps, discover new frontiers.",                        description: "Space, maritime, logistics, aviation." },
  { id: "world-15", world_no: 15, canonical_name: "Skilled Trades, Manufacturing & Applied Craft", canonical_slug: "skilled-trades-manufacturing-applied-craft", seo_slug: "craft", legacy_slug: "trades", tagline: "Make with precision, skill and craft.", description: "Construction, fabrication, repair, craft." },
] as const;

export const EXPECTED_WORLD_COUNT = CANONICAL_WORLDS.length;

/**
 * SEO slugs that cannot be resolved to a single canonical world yet. These are
 * recorded here (rather than silently dropped) so reconciliation stays visible.
 */
export const SEO_AMBIGUITIES: Array<{ seo_slug: string; canonical_world_ids: string[]; note: string }> = [
  { seo_slug: "creativity", canonical_world_ids: ["world-08", "world-09", "world-12"], note: "SEO 'Creativity' spans Design, Media and Culture; not a single canonical world." },
  { seo_slug: "service", canonical_world_ids: ["world-10", "world-13"], note: "SEO 'Service' is ambiguous between Society/Law and Hospitality." },
  { seo_slug: "social", canonical_world_ids: ["world-10"], note: "SEO 'Social Impact' treats society/human development as one; canonical splits Society from Education." },
];

// ──────────────────────────────────────────────────────────────────────────────
// Lookup helpers
// ──────────────────────────────────────────────────────────────────────────────

export function getWorldByNo(worldNo: number): WorldDefinition | undefined {
  return CANONICAL_WORLDS.find((w) => w.world_no === worldNo);
}

export function getWorldBySlug(slug: string): WorldDefinition | undefined {
  return CANONICAL_WORLDS.find((w) => w.canonical_slug === slug);
}

export function getWorldById(id: string): WorldDefinition | undefined {
  return CANONICAL_WORLDS.find((w) => w.id === id);
}

/** Resolve an arbitrary slug (canonical, SEO or legacy) to a canonical world. */
export function resolveAlias(slug: string): WorldDefinition | undefined {
  if (!slug) return undefined;
  return (
    getWorldBySlug(slug) ??
    CANONICAL_WORLDS.find((w) => w.seo_slug === slug) ??
    CANONICAL_WORLDS.find((w) => w.legacy_slug === slug)
  );
}

/** All SEO slugs that are valid 1:1 aliases (excluding ambiguities). */
export function listSeoSlugs(): string[] {
  return CANONICAL_WORLDS.flatMap((w) => (w.seo_slug ? [w.seo_slug] : []));
}

/** Build the DB insert column/values for the seeded SEED_WORLDS. */
export function worldSeedRows(): Array<{
  id: string;
  world_no: number;
  canonical_name: string;
  canonical_slug: string;
  seo_slug: string | null;
  legacy_slug: string | null;
  tagline: string;
  description: string;
}> {
  return CANONICAL_WORLDS.map((w) => ({
    id: w.id,
    world_no: w.world_no,
    canonical_name: w.canonical_name,
    canonical_slug: w.canonical_slug,
    seo_slug: w.seo_slug ?? null,
    legacy_slug: w.legacy_slug ?? null,
    tagline: w.tagline,
    description: w.description,
  }));
}

export type { CareerWorld };
