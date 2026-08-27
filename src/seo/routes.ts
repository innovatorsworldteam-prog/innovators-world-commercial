import { getOrganizationJsonLdString } from './organization';
import { getBrandFaqJsonLdString } from './faq-brand';

/** Canonical public routes currently represented by the commercial Worker. */
export const SITEMAP_PATHS = [
  '/',
  '/assessment',
  '/worlds',
  '/worlds/quiz',
  '/stories/kiivo-leera',
  '/blog',
  '/ai-mastery',
  '/learn/observe',
  '/learn/question',
  '/learn/imagine',
  '/learn/create',
  '/learn/test',
  '/learn/impact',
  '/worlds/technology',
  '/worlds/science',
  '/worlds/creativity',
  '/worlds/business',
  '/worlds/social',
  '/worlds/environment',
  '/worlds/health',
  '/worlds/education',
  '/worlds/exploration',
  '/worlds/adventure',
  '/worlds/craft',
  '/worlds/media',
  '/worlds/law',
  '/worlds/service',
  '/worlds/design',
] as const;

export function getRobotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /private/',
    'Disallow: /api/',
    'Disallow: /*?*token=',
    'Disallow: /*?*session=',
    '',
    'Sitemap: https://innovatorsworld.org/sitemap.xml',
  ].join('\n');
}

export function getSitemapXml(lastModified = new Date().toISOString().slice(0, 10)): string {
  const urls = SITEMAP_PATHS.map((path) => {
    const loc = `https://innovatorsworld.org${path === '/' ? '' : path}`;
    const priority = path === '/' ? '1.0' : path.startsWith('/worlds') ? '0.8' : '0.7';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function handleSeoRoutes(request: Request): Response | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const pathname = new URL(request.url).pathname;
  if (pathname === '/robots.txt') {
    return new Response(request.method === 'HEAD' ? null : getRobotsTxt(), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }
  if (pathname === '/sitemap.xml') {
    return new Response(request.method === 'HEAD' ? null : getSitemapXml(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
  return null;
}

export function getSeoJsonLdScripts(): string {
  return `<script type="application/ld+json">${getOrganizationJsonLdString()}</script>\n<script type="application/ld+json">${getBrandFaqJsonLdString()}</script>`;
}
