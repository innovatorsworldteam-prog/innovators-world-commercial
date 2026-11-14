# Canonical Character Asset Registry — Kiivo & Leera

The approved source portraits are the only canonical character identities. Their identity is pinned by SHA-256 so future image replacements cannot silently reintroduce retired artwork.

| Character | Approved asset | Dimensions | SHA-256 |
|---|---|---:|---|
| Kiivo | `public/assets/kiivo-portrait.png` | 1280×1920 | `47E4B63A01AB85F4833600871B00D10406E4B5CF37AD31660B066978330158BF` |
| Leera | `public/assets/leera-portrait.png` | 1024×1536 | `64FD15064EC1CE82CCF9ADAA85DED4521240E994FD6F0ED4816B36A5CBAEC02F` |

These are the owner-approved originals recorded in the canonical asset migration evidence dated 2026-09-24. Use them unchanged; do not regenerate, recolor, re-pose, or crop them without owner approval.

The former `kiivo-hero.png` and `leera-hero.png` files are retired and retained only under `public/assets/legacy/`. The homepage hero and “Meet your guides” sections must use the approved portraits. `test/character-assets.spec.ts` verifies both the homepage references and exact served-file hashes.
