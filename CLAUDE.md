# Claude Code project guidance

Read this file before modifying the Providence website.

## Objective and business structure

Maintain one Providence website with two distinct market experiences:

1. **Providence Canada — Healthcare Staffing & Telecom**
   - Healthcare staffing and recruitment is the primary service.
   - Serve both care organizations seeking staff and healthcare workers expressing interest in work.
   - Telecom sales and marketing remains an active but secondary service.
2. **Providence Ghana — TV Services**
   - Preserve the TV box sales, setup, plans, customer support, and Ghana CRM access.

Do not collapse the markets into a generic services website. The selected market must stay obvious, and switching markets must stay easy.

## Technical stack

- TypeScript
- React 19
- vinext on Vite
- Cloudflare Workers-compatible server output
- Cloudflare D1 through the logical binding `DB`
- Drizzle schema and migrations
- OpenAI Sites hosting metadata in `.openai/hosting.json`
- pnpm package manager

Node.js 22.13 or newer is required.

## Required validation

Before considering a code change complete, run:

```bash
pnpm lint
pnpm build
```

For UI changes, also check:

- Canada and Ghana navigation
- Market switcher on desktop and mobile
- Canada “Find staff” and “Find work” links
- Organization and worker forms
- Ghana CRM links
- A phone-sized viewport around 390 × 844

## Navigation reliability

Internal navigation intentionally uses normal `<a href>` elements rather than `next/link`.

Do not replace these anchors with `next/link` without production testing. In the current vinext hosting environment, client-side prefetching produced runtime errors and prevented navigation on the deployed website. Standard browser navigation was the verified fix.

The root market gateway uses `window.location.replace()` for custom-domain routing for the same reliability reason.

## Content and compliance guardrails

Use restrained, accurate language such as recruiting, matching, placement coordination, staffing coordination, expressions of interest, and potential opportunities.

Do not claim any of the following without verified business evidence supplied by the owner:

- Ontario recruiter or temporary-help-agency licensing
- Existing contracts with listed care settings
- Guaranteed staffing or placement
- Current openings
- Mandatory screening or credential verification processes
- Numbers of available workers
- Testimonials, client logos, or affiliations

Care settings are examples of potential clients, not claims of existing contracts. Worker forms are expressions of interest, not applications to named openings.

## Canada content model

Primary audiences:

- Care organizations: roles, headcount, locations, schedules, settings, and timing.
- Healthcare workers: role, qualifications, Ontario location, availability, settings, and start timing.

Current role groups (`healthcareRoles` in `lib/content.ts`):

- Personal support workers (PSWs)
- Registered practical nurses (RPNs)
- Registered nurses (RNs)
- Support workers
- Developmental service workers (DSWs)
- Healthcare admin & support roles

Potential settings are grouped as:

- Retirement and long-term care
- Hospitals and hospices
- Home and community care

Keep telecom discoverable through `/canada/telecom`, but do not let it dominate the Canada homepage or primary message.

## Forms and database

The form component is `components/lead-form.tsx`.

The API is `app/api/leads/route.ts` and writes to the D1 `leads` table. Specialized organization and worker fields are composed into the existing `message` column so the current production schema remains compatible.

The API includes:

- Market and inquiry-type allowlists
- Email and length validation
- Required fields per form mode
- Consent validation
- A hidden honeypot field

There is no email notification integration. Do not tell users or the business owner that a lead was emailed unless that capability is implemented and tested.

Do not add secrets to source control. Keep `.env` files untracked.

## Domains and external systems

- Canada origin: `https://providencecanada.ca`
- Ghana origin: `https://providencecanadaltd.com`
- Ghana CRM: `https://providence-ghana-crm.agyapongalexandra.chatgpt.site`

Domain DNS and business email are managed outside this repository. Changing website code does not modify DNS, WordPress hosting, SSL, or GoDaddy email records.

## Visual system

Preserve the transparent Providence bird mark, square-edged (not rounded) editorial cards, and strong mobile layouts across both markets. Ghana keeps its original premium dark navy-and-gold identity and calmer motion unchanged.

Providence Canada intentionally uses a different, lighter palette and richer motion than Ghana, per explicit owner direction: a deep mid-blue (not near-black navy) as the primary dark tone, brighter blue as the main accent/CTA colour, and gold demoted to a selective accent rather than the primary action colour. This is implemented as a CSS custom-property override — `.market-canada { --navy: #0e4f8f; --navy-2: #135da6; --navy-3: #1b72c4; }` in `app/globals.css` — which re-themes every `var(--navy*)` consumer inside Canada pages (hero, dark sections, `ConnectionGraphic`, footer tiles) without touching Ghana, since Ghana never sits inside `.market-canada` and keeps the `:root` values. Canada's primary CTA class is `.button-primary` (solid `var(--blue)`); `.button-gold` remains Ghana's primary CTA colour and is only a secondary accent on Canada.

Canada's homepage hero uses a looping background video (`components/hero-media.tsx`) of healthcare professionals in a clinical setting — never patients, and never staged/direct-to-camera stock imagery, per owner direction. The `HeroMedia` component always server-renders the poster JPG first and only swaps in the `<video>` client-side when the viewport is at least 768px wide, `prefers-reduced-motion` is not set, and the connection isn't in data-saver mode; the poster still displays underneath at all other times. Interior Canada pages use the poster image as a static background (no video), for performance.

Canada motion (aurora hero backdrop, staggered headline/card reveals, button hover shimmer, the `ConnectionGraphic` hub visualization, header transparent-to-solid scroll transition) is scoped through the `.market-canada` selector in `app/globals.css` and the `market-canada`/`market-ghana` root class from `MarketShell`. All motion must respect `prefers-reduced-motion` and use only GPU-friendly `transform`/`opacity` animations — do not reintroduce layout-thrashing effects when extending this further.

Canada media assets and their licences:
- `public/providence-canada-hero.mp4` / `public/providence-canada-hero-poster.jpg` — "Healthcare Workers Talking on Hospital Corridor" by RDNE Stock project, Pexels License (free for commercial use, no attribution required): https://www.pexels.com/video/healthcare-workers-talking-on-hospital-corridor-6130553/
- `public/providence-canada-team.jpg` — photo by Luis Melendez, Unsplash License (free for commercial use): https://unsplash.com/photos/Pd4lRfKo16U

The elderly-patient photo previously used for the Canada hero (`providence-canada-care.jpg`) has been removed — it read as home/senior care rather than staffing and recruitment, per owner direction. Do not reintroduce patient-focused imagery on Canada's hero or homepage.

Do not replace the Providence brand mark with the white-background source JPG in navigation. Use `public/providence-logo-mark.png` for dark surfaces.

## Deployment boundary

This repository can be edited and built by Claude Code, but the existing production deployment belongs to OpenAI Sites and uses an OpenAI-managed D1 database. See `docs/DEPLOYMENT.md` before attempting to deploy or migrate hosting.

