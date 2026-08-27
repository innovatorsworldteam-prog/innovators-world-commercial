import { describe, it, expect } from 'vitest';
import { getRobotsTxt, getSitemapXml, handleSeoRoutes, SITEMAP_PATHS, getSeoJsonLdScripts } from '../src/seo/routes';
import { getOrganizationJsonLd, getOrganizationJsonLdString } from '../src/seo/organization';
import { getBrandFaqJsonLd, getBrandFaqJsonLdString } from '../src/seo/faq-brand';
import { getCanonicalUrl, getPageMetadata, renderMetadataTags } from '../src/seo/metadata';
import { shouldRedirectToOrg, buildOrgRedirectUrl, handleCanonicalRedirect } from '../src/seo/canonicalRedirect';

describe('SEO Foundation Layer 1 - Worker-native', () => {
  it('robots.txt contains Sitemap and Host', () => {
    const txt = getRobotsTxt();
    expect(txt).toContain('Sitemap: https://innovatorsworld.org/sitemap.xml');
    expect(txt).toContain('Host: https://innovatorsworld.org');
    expect(txt).toContain('Allow: /worlds/');
    expect(txt).toContain('Disallow: /admin/');
  });
  it('sitemap.xml valid with 32 URLs', () => {
    const xml = getSitemapXml();
    expect(xml).toContain('<?xml version="1.0"');
    expect(SITEMAP_PATHS.length).toBe(32);
    expect(xml).toContain('https://innovatorsworld.org/worlds');
    expect(xml).not.toContain('innovatorsworld.in');
    expect((xml.match(/<url>/g) || []).length).toBe(32);
  });
  it('organization JSON-LD brand differentiation', () => {
    const org = getOrganizationJsonLd();
    expect(org['@type']).toBe('EducationalOrganization');
    expect(org.alternateName).toContain('Not Innovationworld.org');
    expect(() => JSON.parse(getOrganizationJsonLdString())).not.toThrow();
  });
  it('FAQ JSON-LD brand distinction', () => {
    const faq = getBrandFaqJsonLd();
    const q = faq.mainEntity.find(e => e.name.includes('Innovatorsworld.org same as Innovationworld.org'));
    expect(q).toBeDefined();
    expect(q?.acceptedAnswer.text).toContain('No.');
    expect(() => JSON.parse(getBrandFaqJsonLdString())).not.toThrow();
  });
  it('canonical and metadata', () => {
    expect(getCanonicalUrl('/')).toBe('https://innovatorsworld.org');
    expect(getCanonicalUrl('/worlds/')).toBe('https://innovatorsworld.org/worlds');
    const meta = getPageMetadata('/');
    expect(meta.canonical).toBe('https://innovatorsworld.org');
    expect(renderMetadataTags('/worlds')).toContain('og:title');
  });
  it('canonical redirect .in -> .org 301', () => {
    expect(shouldRedirectToOrg('innovatorsworld.in')).toBe(true);
    expect(shouldRedirectToOrg('innovatorsworld.org')).toBe(false);
    expect(buildOrgRedirectUrl('https://innovatorsworld.in/worlds/technology?x=1')).toBe('https://innovatorsworld.org/worlds/technology?x=1');
    const reqIn = new Request('https://innovatorsworld.in/worlds', { headers: { host: 'innovatorsworld.in' } });
    expect(handleCanonicalRedirect(reqIn)?.status).toBe(301);
    const reqOrg = new Request('https://innovatorsworld.org/worlds', { headers: { host: 'innovatorsworld.org' } });
    expect(handleCanonicalRedirect(reqOrg)).toBeNull();
  });
  it('handleSeoRoutes serves robots and sitemap', () => {
    expect(handleSeoRoutes(new Request('https://innovatorsworld.org/robots.txt'))?.headers.get('Content-Type')).toContain('text/plain');
    expect(handleSeoRoutes(new Request('https://innovatorsworld.org/sitemap.xml'))?.headers.get('Content-Type')).toContain('xml');
    expect(handleSeoRoutes(new Request('https://innovatorsworld.org/worlds'))).toBeNull();
  });
  it('JSON-LD scripts injectable', () => {
    const scripts = getSeoJsonLdScripts();
    expect(scripts).toContain('EducationalOrganization');
    expect(scripts).toContain('FAQPage');
  });
});
