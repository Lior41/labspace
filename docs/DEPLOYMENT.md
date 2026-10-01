# Deployment and operations

## Local

Use Node 24, `npm ci`, and the README startup instructions. Default port: 3052. Do not store `node_modules`, a running embedded database or an active checkout in a folder subject to iCloud eviction.

## Vercel

Import only this repository as a Next.js project. Use `npm ci` and `npm run build`, with Node 24. Set `APP_ORIGIN` to the exact public HTTPS origin (no trailing slash). Verify the public page and complete the demo flow after deployment. Preview deployments need their own allowed origin when API writes are tested.

No deployment URL is a claim of verification by itself. Keep GitHub checks mandatory in the release process. A Git-connected Vercel deployment may start before CI finishes; configure promotion/gating before treating it as a production release.

## Budget

Target a personal, non-commercial portfolio on a free hosting tier. Initial local use costs $0 in provider calls. No paid plan, paid model or domain purchase is required for the default demonstration. Hosting quotas and eligibility can change: review [Vercel Hobby](https://vercel.com/docs/plans/hobby) before subscribing. Enable external providers only after approving their current budget and usage limits.

## Operational limits

Keep secrets in the hosting provider's secret configuration, never in a repository. Run migrations only against the intended database. Use separate development and production resources. The supplied Docker configuration runs an unprivileged Node process; Docker must be installed separately.

## Optional AI and privacy

LABSPACE: leave `AI_ENABLED=false` by default. To enable the constrained planner, set `AI_ENABLED=true`, `AI_API_KEY`, and `AI_MODEL` after reviewing provider costs. The parent prompt is sent to the configured provider; no notebook contents are sent. Validate the provider response against both schema and supported preset mappings. Add a shared rate limiter and an account-level provider spending cap before a public AI launch. The in-memory limiter is per process, not a distributed quota.

SIGNBRIDGE: no model service, database, GPU or upload storage is required for the interface release. Do not add a model or publish signing videos until the feasibility release gates are satisfied. HTTPS is needed for camera access outside localhost.
