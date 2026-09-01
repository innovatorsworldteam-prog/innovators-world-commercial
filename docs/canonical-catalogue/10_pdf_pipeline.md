# Canonical Catalogue — Proposed PDF Data-to-Render Pipeline

## 1. Purpose

Defines the proposed pipeline for generating PDF artefacts (e.g. a printed
career profile, a World 01 booklet, or a personalised career snapshot) from the
canonical career data. It is **proposed** — the plumbing is designed so it can be
wired without disturbing the data model.

## 2. Design principle

**Data is the source; HTML is a projection; PDF is a render.** No PDF content is
authored by hand. PDFs are produced from the same D1 data the API serves, so a
printed profile and a web profile can never diverge.

## 3. Proposed stack

The repository's `worker-configuration.d.ts` already ships the **Cloudflare
Browser Run** binding (`BrowserRun` class). The pipeline targets **Browser Run's
`pdf` quick action** (`quickAction('pdf', options)`), which renders a given HTML
URL/document to PDF.

- **HTML templating:** a small set of templates (career profile, World booklet,
  snapshot) fed from the catalogue DB. Server-side string/`html` templating keeps
  the render step sandboxed from user HTML.
- **Rendering:** Browser Run `pdf` quick action against the assembled HTML.
- **Delivery:** the Worker returns the PDF (`Content-Type: application/pdf`).

## 4. Data-to-render stages

```
D1 catalogue  →  projection (JSON view model)  →  HTML template  →  BrowserRun pdf  →  PDF response
  (careers,          pick fields,                  static, no user                       cached/streamed
   profiles,           order, slug)                  HTML/render)
   relations,
   progression)
```

### Stage A — View model
A presenter builds a **README-like view model** for the target artefact:
- single career: `career`, `world`, parsed `profile`, `relations`, `progression`.
- World 01 booklet: worlds + careers + summary stats.
- personalised snapshot: result JSON + matched careers.

### Stage B — HTML render
- Templates are static; only view-model data is interpolated.
- Print CSS (`@media print` / `page`) encapsulates styling for PDF.
- The HTML is rendered either server-side (Worker HTML transformation) or served
  at a render URL, depending on whether Browser Run receives HTML directly.

### Stage C — PDF production
`BrowserRun.quickAction('pdf', …)` with:
- viewport targeting the print layout,
- `load` / `domcontentloaded` wait semantics,
- reasonable timeout budget (Browser Run action budgets; see Cloudflare SDK docs
  for exact limits),
- optional resource-type rejection for external assets to keep renders
  deterministic and fast.

### Stage D — Delivery & caching
- Set `Content-Type: application/pdf`.
- Set a short `Cache-Control` (artefacts are cheap to regenerate; long caching
  risks stale published catalogue data).
- Return the bytes as the response body.

## 5. Binding config (not yet wired)

`wrangler.jsonc` does **not** currently declare a Browser binding. The proposal is
to add the Browser Run binding (e.g. `"binding": "BROWSER"`) to `wrangler.jsonc`,
then regenerate `worker-configuration.d.ts` with `wrangler types` (per `AGENTS.md`).
Until that binding is configured, PDF generation is **not available**; the
catalogue API remains fully functional without it.

> Exact binding name, class usage, and concurrency/limits must be verified against
> the current Cloudflare Browser Run documentation before implementation
> (see `AGENTS.md`).

## 6. Artefact types (proposed)

| Artefact | View model | Track |
|---|---|---|
| Career profile sheet (1 page) | single career + world + outlook | per-career, printable |
| World 01 booklet (multi-page) | World + careers + clusters | edition, regenerated per edition |
| Personalised career snapshot | IWDA/Discovery result + matched careers | on-demand after result completion |

## 7. Anti-patterns (do not do)

- Hand-authored PDFs or duplicated data for print.
- Rendering user-supplied HTML without sanitisation/layout isolation.
- Treating PDF as the data source (data authority stays in D1).
- Blocking catalogue reads on PDF generation (generate outside the read path or
  cache).

## 8. Open decisions
1. Browser binding name and whether renders run in the Worker request path or a
   separate scheduled/tiered path.
2. Caching strategy (short KV/R2 cache vs. regenerate-on-demand).