import { describe, expect, it } from 'vitest';
import { getBrandFaqJsonLd } from '../src/seo/faq-brand';
import { handleCanonicalRedirect, shouldRedirectToOrg } from '../src/seo/canonicalRedirect';
import { getCanonicalUrl, getPageMetadata, renderMetadataTags } from '../src/seo/metadata';
import { getOrganizationJsonLd } from '../src/seo/organization';
import { getRobotsTxt, getSeoJsonLdScripts, getSitemapXml, handleSeoRoutes, SITEMAP_PATHS } from '../src/seo/routes';

describe('SEO foundation', () => {
  it('provides crawl directives without exposing private API routes', () => {
    const robots = getRobotsTxt();
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://innovatorsworld.org/sitemap.xml');
    expect(robots).toContain('Disallow: /admin/');
    expect(robots).toContain('Disallow: /api/');
  });

  it('generates a canonical sitemap for the known public routes', () => {
    const sitemap = getSitemapXml('2026-08-27');
    expect(SITEMAP_PATHS.length).toBe(28);
    expect((sitemap.match(/<url>/g) ?? []).length).toBe(SITEMAP_PATHS.length);
    expect(sitemap).toContain('https://innovatorsworld.org/worlds');
    expect(sitemap).not.toContain('innovatorsworld.in');
  });

  it('defines organization JSON-LD for Innovators World', () => {
    const organization = getOrganizationJsonLd();
    expect(organization['@context']).toBe('https://schema.org');
    expect(organization['@type']).toBe('EducationalOrganization');
    expect(organization.url).toBe('https://innovatorsworld.org');
  });

  it('defines brand-distinction FAQ JSON-LD', () => {
    const faq = getBrandFaqJsonLd();
    expect(faq['@type']).toBe('FAQPage');
    expect(faq.mainEntity.some((entry) => entry.name.includes('Innovation World Alliance'))).toBe(true);
  });

  it('normalizes canonical URLs and provides metadata', () => {
    expect(getCanonicalUrl('/')).toBe('https://innovatorsworld.org');
    expect(getCanonicalUrl('/worlds/')).toBe('https://innovatorsworld.org/worlds');
    expect(getPageMetadata('/').canonical).toBe('https://innovatorsworld.org');
    expect(renderMetadataTags('/worlds')).toContain('<link rel="canonical"');
  });

  it('redirects the approved .in domains to .org with a permanent redirect', () => {
    expect(shouldRedirectToOrg('innovatorsworld.in')).toBe(true);
    expect(shouldRedirectToOrg('www.innovatorsworld.in')).toBe(true);
    expect(shouldRedirectToOrg('innovatorsworld.org')).toBe(false);
    const response = handleCanonicalRedirect(
      new Request('https://innovatorsworld.in/worlds/technology?x=1', {
        headers: { host: 'innovatorsworld.in' },
      }),
    );
    expect(response?.status).toBe(301);
    expect(response?.headers.get('location')).toBe('https://innovatorsworld.org/worlds/technology?x=1');
  });

  it('serves Worker-native robots and sitemap routes', () => {
    const robots = handleSeoRoutes(new Request('https://innovatorsworld.org/robots.txt'));
    const sitemap = handleSeoRoutes(new Request('https://innovatorsworld.org/sitemap.xml'));
    expect(robots?.headers.get('Content-Type')).toContain('text/plain');
    expect(sitemap?.headers.get('Content-Type')).toContain('application/xml');
    expect(handleSeoRoutes(new Request('https://innovatorsworld.org/worlds'))).toBeNull();
  });

  it('provides JSON-LD script markup', () => {
    const scripts = getSeoJsonLdScripts();
    expect(scripts).toContain('EducationalOrganization');
    expect(scripts).toContain('FAQPage');
  });
});
