# Verification record

Verified on 2026-10-01. [GitHub Actions run 36837322066](https://github.com/Lior41/labspace/actions/runs/36837322066) passed: TypeScript, ESLint, 11 unit tests, production build and desktop/mobile Chromium journeys (prediction, scientific result, notebook replay, age adaptation and activity-planner refusal).

Local checks also passed. Local automated Chromium launch was blocked by the macOS sandbox; CI provides the browser execution evidence. Manual browser checks were performed separately.

[Public deployment](https://lior-labspace.vercel.app) is on Vercel Hobby. The landing page and core interaction were checked after deployment. No paid provider is enabled.

Docker was not executed. AI provider calls were not exercised; prewritten planning is active. Speech availability depends on locally installed browser voices.
