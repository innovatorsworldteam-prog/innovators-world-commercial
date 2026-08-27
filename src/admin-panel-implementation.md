# Admin Control Panel v1 — Implementation Contract

The production admin control panel is a protected operational interface for the Innovators World Commercial backend.

## Required capabilities
- Secure administrator authentication; never hard-code or commit credentials.
- Dashboard showing backend health, IWDA attempts/results, participant records, and Career Discovery activity.
- Assessment/content administration with safe validation and auditability.
- Result/attempt inspection and controlled operational actions.
- Explicit role boundary: public assessment APIs must not expose admin operations.
- Session security, CSRF protection where applicable, rate limiting, and secure cookie/token handling.
- Production deployment behind the existing Worker/domain architecture.

## Credential policy
Initial administrator credentials must be provisioned through the deployment secret mechanism. The repository must contain no passwords, API tokens, or secret values.

## Acceptance gate
The panel is not considered production-ready until authentication, authorization, core dashboard functions, security controls, tests, CI, and deployment health checks all pass.
