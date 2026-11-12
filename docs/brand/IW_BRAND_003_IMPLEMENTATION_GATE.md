# IW-BRAND-003 — Controlled Website Logo Replacement

Status: ASSET TRANSFER BLOCKED — no website markup modified.

## Owner authorisation
Dedicated branch and commits for website logo standardisation only. No merge, production deployment, PDF or social-channel modification.

## Approved source
IW_Platform_Logo_Kit_v1.zip (owner-approved IW-BRAND-001). The exact binary exports must be transferred unchanged; generated substitutes are prohibited.

## Confirmed code references (GitHub default branch inspection)
- public/index.html header: /assets/innovators-world-symbol.png plus independently rendered INNOVATORS WORLD and SEE · THINK · CREATE.
- public/index.html footer: symbol plus independently rendered INNOVATORS WORLD.
- public/iwda/index.html: /assets/innovators-world-logo.png in top navigation.
- public/iwda.html and public/iwda/index.html: favicon /assets/innovators-world-symbol.png.

## Implementation prerequisites
1. Upload approved binary PNGs and favicon from the exact approved archive into this branch, preserving bytes and recording SHA-256 checksums.
2. Confirm which routes and templates are currently used, and compare existing referenced assets to approved master.
3. Update only affected header/footer/IWDA references after new assets exist in GitHub; do not create broken references.
4. Validate dark header contrast: approved primary logo is white-background RGB, so a white-background logo on dark navigation needs visual QA. Do not remove background by algorithm or invent a transparent master without approval.
5. Run responsive, accessibility, image load, and regression checks; obtain independent acceptance before proposing merge.

## Gate
No merge or deployment authorised. This document is not evidence of implementation completion.
