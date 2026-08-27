/**
 * PR2: Worker routes extension for 15 worlds — reuses existing world routing
 * Branch: feat/seo-15-worlds
 * No duplicate architecture
 */

import { getWorldSEO, getWorldJsonLd, getWorldsListJsonLd, WORLD_SLUGS } from './worlds';
import { renderMetadataTags } from './metadata';
import { getSeoJsonLdScripts } from './routes';

export function handleWorldsSeoRoutes(request: Request): Response | null {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/worlds' || path === '/worlds/') return null;
  const match = path.match(/^\/worlds\/([a-z-]+)\/?$/);
  if (match && (WORLD_SLUGS as readonly string[]).includes(match[1])) return null;
  return null;
}

export function getWorldsSeoHead(slug?: string): string {
  if (!slug) {
    const listJsonLd = JSON.stringify(getWorldsListJsonLd());
    return `${renderMetadataTags('/worlds')}
<script type="application/ld+json">${listJsonLd}</script>
${getSeoJsonLdScripts()}`;
  }
  const world = getWorldSEO(slug);
  if (!world) return '';
  const customMeta = `
<title>${world.title}</title>
<meta name="description" content="${world.description}" />
<link rel="canonical" href="${world.canonical}" />
<meta property="og:title" content="${world.title}" />
<meta property="og:description" content="${world.description}" />
<meta property="og:url" content="${world.canonical}" />
<meta property="og:image" content="${world.ogImage}" />
<meta name="keywords" content="${world.keywords.join(', ')}" />
`.trim();
  const worldJsonLd = JSON.stringify(getWorldJsonLd(world));
  return `${customMeta}
<script type="application/ld+json">${worldJsonLd}</script>
${getSeoJsonLdScripts()}`;
}

export function getWorldPageContent(worldSlug: string): string {
  const world = getWorldSEO(worldSlug);
  if (!world) return '';
  return `
<section>
  <h1>${world.name} World — ${world.tagline}</h1>
  <p>${world.intro}</p>
  <h2>What is ${world.name} World?</h2>
  <p>${world.intro} It is one of 15 Future Career Worlds at Innovatorsworld.org, designed with Kiivo & Leera for 365-day practice.</p>
  <h2>Who might enjoy it?</h2>
  <p>${world.whoEnjoys}</p>
  <h2>What kinds of problems are explored?</h2>
  <p>${world.problemsExplored}</p>
  <h2>What capabilities matter?</h2>
  <p>Innovation DNA capabilities for this world: ${world.capabilities.join(', ')}. Take the IWDA assessment to map your strengths: <a href="/assessment">Innovation DNA Assessment</a>.</p>
  <h2>What future careers can connect to it?</h2>
  <ul>
    ${world.futureCareers.map(c => `<li>${c}</li>`).join('\n ')}
  </ul>
  <h2>What can a student do next?</h2>
  <ul>
    ${world.nextSteps.map(s => `<li>${s}</li>`).join('\n ')}
  </ul>
  <nav>
    <a href="/worlds">All 15 Worlds</a> |
    <a href="/assessment">Take IWDA</a> |
    ${world.relatedWorldSlugs.map(s => `<a href="/worlds/${s}">${s}</a>`).join(' | ')}
  </nav>
</section>
`.trim();
}
