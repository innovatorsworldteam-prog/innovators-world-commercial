# IW-BRAND-003 — approved brand asset inventory (review branch only)

Branch: `iw-brand-003-logo-standardisation`. These assets have been uploaded to this branch, but are **not deployed or release-approved**.

## Files present
- `public/assets/iw-logo-header-900x300.png` — approved master-derived header/footer logo (white-background raster)
- `public/assets/iw-symbol-256.png` — approved master-derived symbol; used as PNG favicon
- `public/assets/iw-favicon-provisional.ico` — provisional only; **not activated**

The SHA-256 manifest in `public/assets/SHA256.txt` records the original handoff files. Its `assets/` paths refer to the extracted handoff package, not repository-relative paths.

## Implemented in this branch
- `public/index.html`: homepage header and footer use the approved lockup, with a white logo container on the dark site chrome.
- `public/iwda/index.html`: IWDA header uses the approved lockup.
- Both pages use the PNG symbol as favicon. The provisional ICO remains unused.

## Acceptance still required
1. Visually inspect exact rendered desktop and mobile layouts (including white-background treatment, logo legibility, navigation spacing and overflow).
2. Verify keyboard focus, accessible names and navigation operation.
3. Run regression checks against the actual build and routes.
4. Obtain independent acceptance and separate owner approval before merge or deployment.

No merge, deployment or release is authorised by this inventory.
