# Verification record

Local TypeScript, ESLint, unit tests and production builds have been executed. The final test counts and browser results are recorded in the delivery notes; CI configuration alone is not evidence that CI ran.

Native PostgreSQL is required to establish independent-connection contention behavior. PGlite runs a real PostgreSQL-derived engine locally but serializes transactions in one process. The local demo race is not a throughput benchmark.

External provider credentials, an ASL expert review, and a deployed production environment are separate release gates. No paid service is enabled by default. Camera permission tests must use a synthetic browser fixture or explicit consent, never an unsuspecting user's camera.
