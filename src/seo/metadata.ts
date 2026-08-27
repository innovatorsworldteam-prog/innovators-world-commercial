export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
}

const BASE_URL = 'https://innovatorsworld.org';
const DEFAULT_OG_IMAGE = 'https://innovatorsworld.org/og-image.png';

export function getCanonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const normalized = clean !== '/' && clean.endsWith('/') ? clean.slice(0, -1) : clean;
  return `${BASE_URL}${normalized === '/' ? '' : normalized}`;
}

export function getPageMetadata(path: string): PageMetadata {
  const canonical = getCanonicalUrl(path);
  const map: Record<string, { title: string; description: string }> = {
    '/': {
      title: "Innovators World | Innovation DNA & Future Careers | Kiivo & Leera",
      description: 'Innovators World — develop innovation capability through Innovation DNA assessment, future career exploration and sustained practice with Kiivo & Leera.',
    },
    '/assessment': {
      title: 'Innovation DNA Assessment (IWDA) | Innovators World',
      description: 'Explore the Innovation DNA assessment and discover your starting point for developing innovation capability.',
    },
    '/worlds': {
      title: 'Future Career Worlds | Career Explorer | Innovators World',
      description: 'Explore future career worlds and discover possibilities that connect curiosity, capability and meaningful work.',
    },
  };
  const entry = map[path] || {
    title: `Innovators World | ${path.replace(/^\//, '').replace(/\//g, ' ').replace(/-/g, ' ')}`,
    description: 'Innovators World — Innovation DNA, future career exploration and sustained practice with Kiivo & Leera.',
  };
  return {
    title: entry.title,
    description: entry.description,
    canonical,
    ogTitle: entry.title,
    ogDescription: entry.description,
    ogUrl: canonical,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: path === '/' ? 'website' : 'article',
    twitterCard: 'summary_large_image',
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderMetadataTags(path: string): string {
  const m = getPageMetadata(path);
  return `<title>${escapeHtml(m.title)}</title>\n<meta name="description" content="${escapeHtml(m.description)}" />\n<link rel="canonical" href="${escapeHtml(m.canonical)}" />\n<meta property="og:title" content="${escapeHtml(m.ogTitle)}" />\n<meta property="og:description" content="${escapeHtml(m.ogDescription)}" />\n<meta property="og:url" content="${escapeHtml(m.ogUrl)}" />\n<meta property="og:image" content="${escapeHtml(m.ogImage)}" />\n<meta property="og:type" content="${escapeHtml(m.ogType)}" />\n<meta name="twitter:card" content="${escapeHtml(m.twitterCard)}" />\n<meta name="twitter:title" content="${escapeHtml(m.ogTitle)}" />\n<meta name="twitter:description" content="${escapeHtml(m.ogDescription)}" />\n<meta name="twitter:image" content="${escapeHtml(m.ogImage)}" />`.trim();
}
