# IW-BRAND-003 — GitHub asset handoff (NOT deployed)

Target branch: `iw-brand-003-logo-standardisation`.

Approved master-derived assets are supplied in `assets/`. SHA-256 hashes in `SHA256.txt` must be checked before committing. These files are not yet uploaded to GitHub.

## Proposed repository destinations
- `public/assets/iw-logo-header-900x300.png`
- `public/assets/iw-symbol-256.png`
- `public/assets/iw-favicon-provisional.ico`

## Required review before markup changes
1. Compare the approved white-background header image on the site's dark navigation bar. White rectangle may be visually unacceptable; do not assume suitability.
2. Inspect the current branch's exact files and route templates. Homepage header/footer and IWDA references were observed on default branch, but may differ on target branch.
3. Do not replace the existing favicon until small-size visual QA passes. The supplied ICO is provisional.
4. Implement only with approved assets, then run responsive, accessibility, and regression tests. Request independent acceptance.
5. Do not merge or deploy without separate authorisation.

## Suggested local commands
```bash
git switch iw-brand-003-logo-standardisation
mkdir -p public/assets
cp assets/* public/assets/  # run from extracted handoff directory, adapt path as necessary
sha256sum -c SHA256.txt # run from handoff root, before copying
# inspect and stage only reviewed files; do not deploy
```
