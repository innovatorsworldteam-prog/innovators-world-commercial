# IW-BRAND-003 — Approved logo asset inventory

The assets below are committed in `public/assets/` on `main` following the merge of PR #20. This inventory does **not** assert deployment or final visual acceptance.

## Approved master-derived assets

- `iw-logo-header-900x300.png` — approved raster logo lockup; used by the homepage header/footer and IWDA header
- `iw-symbol-256.png` — approved brand symbol; referenced as the PNG favicon
- `iw-favicon-provisional.ico` — provisional favicon; retained but not activated

`SHA256.txt` contains the original handoff hashes. Its `assets/` paths refer to the extracted handoff package, not repository-relative paths.

## Current implementation

- `public/index.html`: approved lockup in header/footer; white container on dark navigation
- `public/iwda/index.html`: approved lockup in header; white container on dark navigation
- Both pages reference `/assets/iw-symbol-256.png` as the favicon

## Outstanding acceptance gates

- Rendered desktop and mobile visual QA, including logo legibility and layout overflow
- Keyboard navigation and visible focus QA
- Actual build and route regression tests
- Independent acceptance; separate owner approval for any deployment

The presence of assets in GitHub does not establish that they are deployed to production.
