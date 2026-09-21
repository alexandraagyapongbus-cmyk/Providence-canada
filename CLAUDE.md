# Claude Code project guidance

Read this file before modifying the Providence website.

## Objective and business structure

Maintain one Providence website with two distinct market experiences:

1. **Providence Canada — Telecom (primary) & Healthcare Staffing (developing second division)**
   - Providence Canada's primary identity is a telecom storefront/reseller for residential and business customers: helping people find internet, TV, phone, and bundle options from the telecommunications providers Providence works with. This is distinct from, and should not be confused with, Providence also performing telesales/customer-acquisition *work* for telecom companies (see the Telecom section below) — the storefront is the primary consumer-facing identity; the B2B sales-service pitch is secondary, demoted to `/canada/telecom` and linked from About/footer as "Partner With Providence."
   - Healthcare staffing and recruitment is a developing second division: fully built and preserved, reachable from primary navigation, but must not compete with telecom for homepage priority. Frame it as growing/developing, not yet fully licensed (see compliance guardrails).
   - This hierarchy has reversed twice this project's history (healthcare-primary → telecom-B2B-primary → telecom-storefront-primary). If asked to change it again, confirm the exact new hierarchy explicitly before touching code — this is a business-priority decision, not a design one.
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

- Canada and Ghana navigation, including the Canada Residential/Business nav dropdowns (desktop `<details>`-based, mobile accordion) and the Ghana flat nav
- Market switcher on desktop and mobile
- Canada's "For My Home" / "For My Business" homepage pathways, and the healthcare "Find staff" / "Find work" links on the healthcare pages
- Organization and worker forms, and the Contact page's four quick-select tiles (home / business / telecom partner / general)
- Ghana CRM links
- A phone-sized viewport around 390 × 844

If you touch `lib/content.ts`'s `contactOptions` for Canada, you must also update the matching `allowedInterests.canada` array in `app/api/leads/route.ts` — they must stay byte-for-byte identical or the form silently rejects valid submissions.

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

### Telecom has two distinct, non-overlapping stories — do not blend them

**A. Providence as a telecom storefront/reseller (primary, consumer-facing).** Providence helps residential and business customers find internet, TV, phone, and bundle options from the providers Providence works with. This lives on the Canada homepage, `/canada/residential`, `/canada/business`, `/canada/providers`, and `/canada/why-providence`.

**B. Providence performing telesales/customer-acquisition work for telecom companies (secondary, B2B).** This is a different service: Providence's own team does outbound sales, representation, lead generation, and campaign execution *for* a telecom company, as a paid service — Providence is not that company's customer-facing storefront in this case. This lives entirely on `/canada/telecom` ("Partner With Providence"), linked from About and the footer, not primary navigation.

Never blend these two stories in the same section, and never describe either as Providence *supplying, recruiting, or placing* telecom sales workers/staff for another company — that is a third, different service Providence does not offer. In practice:

- Never use language like "extra sales capacity," "sales partnerships" (in the staffing sense), "join our sales team," or any "Careers"-style framing for telecom roles. Do not include "Careers" in primary navigation.
- `markets.canada.services` in `lib/content.ts` (rendered via `ServiceGrid` on `/canada/telecom`) must always read as Providence itself performing B2B sales work — never as supplying bodies/headcount to a partner's team.
- **Do not name, imply a relationship with, or display the logo of any specific real telecom company** (e.g., Bell, Rogers, TELUS, Primus, Zayo) anywhere on the site unless the owner has explicitly confirmed that exact relationship exists. `/canada/providers` (`ProvidersPage` in `components/market-pages.tsx`) is intentionally generic/illustrative for this reason — it describes categories of providers, not named ones. This was explicitly tested with the owner once already (illustrative-only was the confirmed answer); treat any request to add real provider names as requiring the same explicit confirmation again.
- Do not publish specific telecom products, pricing, plan speeds, contract terms, or availability as if confirmed (`residentialServices`/`businessServices` in `lib/content.ts` describe categories to compare, not real offers). The UI should stay structured so real ones can be activated later without a rebuild.
- The "Check Availability" / "Get a Quote" CTAs route to the contact form, not a live availability API — none exists. Do not build a fake instant-results availability checker; if real provider/address-lookup integration is added later, that is a distinct, larger feature to scope explicitly with the owner first.

## Canada content model

### Site architecture (`SiteSection` in `lib/content.ts`)

Canada routes: `home`, `residential`, `business`, `providers`, `why-providence`, `healthcare-staffing` (+ alias `services`), `care-organizations`, `healthcare-workers`, `telecom`, `about`, `contact`. Primary nav (`components/market-shell.tsx`) is Home / Residential (dropdown) / Business (dropdown) / Providers / Why Providence / Healthcare / About / Contact, plus a "Get a Quote" header button linking to `/canada/contact`. The Residential and Business dropdown items are anchors (`#internet`, `#tv`, `#phone`, `#bundles`, `#connectivity`, `#packages`) into their respective single pages, not separate thin pages — keep it that way unless there's real per-category content to justify a split.

Primary audiences (telecom storefront):

- Residential customers: internet, TV, home phone, bundles (`residentialServices` in `lib/content.ts`).
- Business customers: business internet, business phone, TV, connectivity, business packages (`businessServices`), plus use-case framing (`businessUseCases`: office, retail, restaurant, healthcare facility, professional services, multi-location).
- Telecom provider/business partners (secondary/B2B, see the Telecom guardrail above): reached via `/canada/telecom`, not primary nav.

Secondary audience (developing division): healthcare — care organizations and healthcare workers, unchanged from before. Current role groups (`healthcareRoles` in `lib/content.ts`): PSWs, RPNs, RNs, support workers, developmental service workers (DSWs), healthcare admin & support roles. Potential settings/industries: `careSettings` (3-item, used on `/canada/healthcare-staffing`) and `careIndustries` (5-item, richer variant, also used there).

### Reusable patterns worth knowing before adding new sections

- `ConnectionGraphic` (`components/connection-graphic.tsx`) is a generic "left node ⟷ Providence ⟷ right node" visual, parameterized by props — used for both the telecom provider↔customer story and, with its defaults, the healthcare org↔worker story. Reuse it rather than building a new connection diagram.
- `.canada-section` + `.canada-section-light`/`-tint`/`-blue` are the standard alternating-background section shells. `.canada-section-blue` sets `color: white` at the section level — any component normally used on light backgrounds (e.g. `.audience-card`'s white "organization-card" variant) needs an explicit dark-text override before nesting it in a blue section, or its own inherited white text becomes invisible on its white card background (this exact bug shipped once and was fixed by adding `color: var(--ink)` directly to `.audience-card`).
- `.canada-journey`, `.canada-differentiator-grid`, `.canada-industry-grid`, `.telecom-final-cta` are reusable numbered-process / differentiator / category / closing-CTA grids. Match the item count to the grid's column count (or add a modifier like `.three-col` / `.two-up`) — an item count that doesn't evenly divide the column count leaves an orphaned, unbalanced row.

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

Canada's homepage hero uses a looping background video (`components/hero-media.tsx`) — currently a general business/office setting suited to the telecom storefront story, never staged/direct-to-camera stock imagery, per owner direction. The `HeroMedia` component always server-renders the poster JPG first and only swaps in the `<video>` client-side when the viewport is at least 768px wide, `prefers-reduced-motion` is not set, and the connection isn't in data-saver mode; the poster still displays underneath at all other times. Interior Canada pages use a poster image as a static background (no video), for performance — the `Hero` component's `image`/`imageAlt` props let a specific page override the default telecom poster (used by the three healthcare pages, which pass the healthcare corridor photo instead; forgetting this override is exactly how a past session accidentally put the telecom photo on every healthcare page).

Canada motion (aurora hero backdrop, staggered headline/card reveals, button hover shimmer, the `ConnectionGraphic` hub visualization, header transparent-to-solid scroll transition, nav dropdown open/close) is scoped through the `.market-canada` selector in `app/globals.css` and the `market-canada`/`market-ghana` root class from `MarketShell`. All motion must respect `prefers-reduced-motion` and use only GPU-friendly `transform`/`opacity` animations — do not reintroduce layout-thrashing effects when extending this further.

Canada media assets and their licences:
- `public/providence-canada-telecom-hero.mp4` / `-poster.jpg` — the current Canada homepage hero (business team meeting). "Team Meeting" by Tiger Lily, Pexels License (free for commercial use, no attribution required): https://www.pexels.com/video/team-meeting-7147921/
- `public/providence-canada-hero.mp4` / `providence-canada-hero-poster.jpg` — the healthcare-specific hero photo/poster, used only on the three healthcare pages (`HealthcareStaffingPage`, `CareOrganizationsPage`, `HealthcareWorkersPage`) via the `Hero` component's `image` override. "Healthcare Workers Talking on Hospital Corridor" by RDNE Stock project, Pexels License: https://www.pexels.com/video/healthcare-workers-talking-on-hospital-corridor-6130553/
- `public/providence-canada-team.jpg` — photo by Luis Melendez, Unsplash License (free for commercial use), used on the healthcare page's organization split section: https://unsplash.com/photos/Pd4lRfKo16U

The elderly-patient photo previously used for the Canada hero (`providence-canada-care.jpg`) has been removed — it read as home/senior care rather than staffing and recruitment, per owner direction. Do not reintroduce patient-focused imagery, and do not let telecom or healthcare imagery leak onto the other's pages (both have shipped as real bugs once each this project).

Do not replace the Providence brand mark with the white-background source JPG in navigation. Use `public/providence-logo-mark.png` for dark surfaces.

## Deployment boundary

This repository can be edited and built by Claude Code, but the existing production deployment belongs to OpenAI Sites and uses an OpenAI-managed D1 database. See `docs/DEPLOYMENT.md` before attempting to deploy or migrate hosting.

