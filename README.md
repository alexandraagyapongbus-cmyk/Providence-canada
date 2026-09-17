# Providence Canada & Ghana

One Providence website with two market experiences:

- **Providence Canada:** healthcare staffing and recruitment as the primary service, with telecom sales and marketing as a secondary service.
- **Providence Ghana:** TV box sales, installation, service plans, and customer support.

## Live websites

- Canada: https://providencecanada.ca/canada
- Ghana: https://providencecanadaltd.com/ghana
- Sites origin: https://providence-canada-ghana.agyapongalexandra.chatgpt.site
- Ghana staff CRM: https://providence-ghana-crm.agyapongalexandra.chatgpt.site

## Local setup

Requirements:

- Node.js 22.13 or newer
- pnpm

Install and run:

```bash
pnpm install
pnpm dev
```

The local site is normally available at `http://localhost:3000`.

Useful commands:

```bash
pnpm lint
pnpm build
pnpm start
pnpm db:generate
```

## Main routes

Canada:

- `/canada`
- `/canada/healthcare-staffing`
- `/canada/care-organizations`
- `/canada/healthcare-workers`
- `/canada/telecom`
- `/canada/about`
- `/canada/contact`

Ghana:

- `/ghana`
- `/ghana/services`
- `/ghana/about`
- `/ghana/contact`

The root route is the two-market gateway. On the two custom domains it redirects visitors to the appropriate market.

## Project structure

- `app/` — routes, metadata, global CSS, and the lead API.
- `components/` — market shell, pages, forms, reusable UI, and motion.
- `lib/content.ts` — market copy, navigation data, services, roles, care settings, URLs, and page metadata.
- `db/` — Drizzle schema and database helper.
- `drizzle/` — D1 migration files.
- `public/` — Providence brand and hero imagery.
- `.openai/hosting.json` — existing OpenAI Sites project and D1 binding metadata.
- `CLAUDE.md` — implementation constraints and handoff notes for Claude Code.
- `docs/DEPLOYMENT.md` — hosting, database, domain, and operational notes.

## Forms and lead storage

All forms submit to `POST /api/leads`. Production submissions are stored in the existing Cloudflare D1 binding named `DB`.

There are three form modes:

- General inquiry
- Care organization staffing request
- Healthcare worker expression of interest

The current system stores leads but does not send email notifications. Do not claim email delivery exists unless a real notification integration is added and tested.

## Important content constraints

Do not invent or imply:

- Ontario recruiter or temporary-help-agency licence status
- Client contracts or partnerships
- Current job openings
- Guaranteed staffing, employment, or placement
- Verified worker counts
- Screening, credential verification, or availability processes that are not documented and operating
- Testimonials, client logos, certifications, or licence numbers

Keep the architecture clear: **Providence → Canada or Ghana → market-specific services and content.**

## Source control

This handoff is a standalone local Git repository. The internal OpenAI Sites source remote was intentionally removed because its write credentials are temporary and are not a general-purpose repository URL.

Create a new private GitHub repository before adding a new `origin` remote.

