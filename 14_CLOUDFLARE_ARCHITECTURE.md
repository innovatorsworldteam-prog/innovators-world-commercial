# Cloudflare Architecture
Cloudflare is the implementation authority.

Layers:
- public website
- Workers/API
- D1 database
- authentication/session layer
- analytics/event ingestion
- payment integration
- admin dashboard
- approved asset storage

Security:
- server-side secrets
- protected admin routes
- least privilege
- privacy-conscious event metadata
- no payment credentials in browser
