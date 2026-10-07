# Security audit, quick profile — omnibus-portfolio (2026-10-07)

Mode: guidance/quick, first-party pass by one Sonnet 5.5 session (no upstream checkout, no execution, no hunter/verifier fan-out). Scope: static SPA, CI/deploy, client side, supply chain. No server code, auth or tenants exist.

- **Result:** 0 high/medium, 3 low/info. Nothing needs a credential rotation.
- **L1 — no CSP** (needs_validation): live response (curl, 2026-10-07) has HSTS, nosniff, X-Frame-Options, Referrer-Policy but no `Content-Security-Policy` or `Permissions-Policy`. Headers live in the VPS nginx, outside this repo. Fix: add both in nginx, test with report-only first.
- **L2 — `main` unprotected:** `branches/main/protection` returns 404. Covered by the «main-protegido» ruleset in omnibus-docs PR #1 (Carlos applies).
- **L3 — `deploy-prod.sh`:** `export $(cat .env.deploy | xargs)` word-splits and globs values; local-only, `.env.deploy` is gitignored. Low; prefer `set -a; . ./.env.deploy; set +a`.
- **Clean:** all `target="_blank"` links carry `rel="noopener noreferrer"`; no `dangerouslySetInnerHTML`/`eval`/`innerHTML`; no secrets in `src`, `index.html`, `scripts`; `pnpm audit --prod` finds no known vulnerabilities.
- **CI/deploy:** actions pinned by SHA, `permissions: contents: read`, SSH key via ssh-agent with pinned `known_hosts`, rsync key jailed by forced command; `production`/`staging` environments have protection rules; deploy jobs run only on push to main (no fork exposure).
- **Not covered:** nginx config, VPS hardening, Cloudflare/DNS, git history secret scan beyond a key-header search (none found).
- **Next action:** L1 via the VPS session; apply the ruleset (L2). The full audit is not warranted for a static site.
