# Deployment and operations handoff

## Current production

- Sites project metadata is retained in `.openai/hosting.json`.
- The production site is public.
- The logical D1 binding is `DB`.
- Canada and Ghana share one deployed application and database.

Live addresses:

- https://providencecanada.ca/canada
- https://providencecanadaltd.com/ghana
- https://providence-canada-ghana.agyapongalexandra.chatgpt.site

## OpenAI Sites limitation

The Git remote used by OpenAI Sites is an internal deployment repository with short-lived write credentials. It was removed from this handoff repository intentionally.

Claude Code can edit, lint, build, and test this source locally. It should not assume it can publish directly to the existing OpenAI Sites project or administer its production D1 database.

For continued deployment, choose one of these paths:

1. **Keep OpenAI Sites:** make code changes in this repository, then use Codex/Sites to validate and publish the committed source.
2. **Migrate hosting:** create a separate Cloudflare Workers/Pages or another compatible deployment, provision a new production database, migrate the schema and required data, configure custom domains, and test the full site before changing DNS.

Do not point the custom domains at a new host until the application, SSL, forms, database, and market redirects have all been verified there.

## Database

The schema is in `db/schema.ts` and the existing migration is in `drizzle/0000_massive_cable.sql`.

The application expects a D1-compatible binding called `DB`. A different host will need an equivalent persistent database and a compatible implementation of `POST /api/leads`.

Production lead delivery currently means database storage only. No email, Slack, or CRM notification is configured.

## Domain behavior

The application root checks the hostname:

- `providencecanada.ca` routes to `/canada`
- `providencecanadaltd.com` routes to `/ghana`

The explicit market paths continue to work on the Sites origin.

DNS and email records are external infrastructure. Do not alter them as part of an ordinary code deployment.

## Production regression history

A previous build used `next/link` for internal links. In production, vinext emitted an RSC prefetch runtime error and clicks did not navigate. The application now uses standard anchors and was verified on the deployed domain.

If the routing stack is upgraded, client-side navigation may be reconsidered only after a production-equivalent test confirms every primary and mobile link works.

## Release checklist

1. Review the Git diff and confirm no secrets are present.
2. Run `pnpm lint`.
3. Run `pnpm build`.
4. Verify all Canada and Ghana routes.
5. Verify desktop and mobile market switching.
6. Verify organization, worker, and general inquiry validation.
7. Verify Ghana CRM links still open the external CRM.
8. Publish without changing the current audience.
9. Smoke-test the deployed Canada and Ghana domains.
10. Confirm lead storage against the intended production database.

