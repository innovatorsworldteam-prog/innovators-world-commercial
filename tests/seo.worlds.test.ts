import { describe, it, expect } from 'vitest';
import { WORLDS_SEO, WORLD_SLUGS, getWorldSEO, getAllWorldsSEO, getWorldJsonLd, getWorldsListJsonLd } from '../src/seo/worlds';
import { getWorldsSeoHead, getWorldPageContent } from '../src/seo/worlds-routes';

describe('PR2: 15 Worlds SEO Layer', () => {
  it('has exactly 15 worlds with canonical https://innovatorsworld.org/worlds/*', () => {
    expect(WORLD_SLUGS.length).toBe(15);
    expect(Object.keys(WORLDS_SEO).length).toBe(15);
    for (const slug of WORLD_SLUGS) {
      const w = getWorldSEO(slug)!;
      expect(w.canonical).toBe(`https://innovatorsworld.org/worlds/${slug}`);
      expect(w.canonical).not.toContain('innovatorsworld.in');
      expect(w.canonical).not.toContain('innovationworld.org');
      expect(w.title).toContain('Innovatorsworld.org');
      expect(w.description.length).toBeGreaterThan(50);
      expect(w.description.length).toBeLessThan(300);
    }
  });
  it('no duplicate canonical URLs', () => {
    const canonicals = getAllWorldsSEO().map(w => w.canonical);
    expect(new Set(canonicals).size).toBe(15);
  });
  it('each world answers 6 required questions', () => {
    for (const slug of WORLD_SLUGS) {
      const w = getWorldSEO(slug)!;
      expect(w.intro.length).toBeGreaterThan(20);
      expect(w.whoEnjoys.length).toBeGreaterThan(20);
      expect(w.problemsExplored.length).toBeGreaterThan(20);
      expect(w.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(w.futureCareers.length).toBe(12);
      expect(w.nextSteps.length).toBeGreaterThanOrEqual(2);
    }
  });
  it('world JSON-LD valid with breadcrumb', () => {
    for (const slug of WORLD_SLUGS) {
      const jsonLd = getWorldJsonLd(getWorldSEO(slug)!);
      expect(jsonLd['@type']).toBe('CollectionPage');
      expect((jsonLd as any).breadcrumb['@type']).toBe('BreadcrumbList');
    }
    expect(getWorldsListJsonLd().hasPart.length).toBe(15);
  });
  it('SEO head contains canonical, OG, JSON-LD', () => {
    const head = getWorldsSeoHead('technology');
    expect(head).toContain('<link rel="canonical" href="https://innovatorsworld.org/worlds/technology" />');
    expect(head).toContain('og:title');
    expect(head).toContain('application/ld+json');
  });
  it('world page content human-first with internal links', () => {
    const content = getWorldPageContent('science');
    expect(content).toContain('What is Science World?');
    expect(content).toContain('Who might enjoy it?');
    expect(content).toContain('What kinds of problems');
    expect(content).toContain('What capabilities matter?');
    expect(content).toContain('What future careers');
    expect(content).toContain('What can a student do next?');
    expect(content).toContain('href="/worlds"');
    expect(content).toContain('href="/assessment"');
  });
  it('no canonical leakage', () => {
    for (const w of getAllWorldsSEO()) {
      expect(w.canonical).not.toMatch(/innovatorsworld\.in/);
      expect(w.canonical).not.toMatch(/innovationworld\.org/);
    }
  });
});
