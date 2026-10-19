@AGENTS.md

# Prithvi Data Loggers – project rules

These rules are permanent. Follow them in every change.

docs/MASTER-BRIEF.md is the source of truth for content and pages.
docs/LOCATION-PAGES-PLAYBOOK.md is the source of truth for all location pages (template, cluster
linking, SEO settings, city data and quality checks).

## Brand
- Brand: **Prithvi Data Loggers** – IoT temperature & humidity data loggers (WiFi / GSM / LoRa).
- Parent company: **VEGA Calibrations** – NABL / ISO/IEC 17025:2017 accredited calibration lab
  (https://www.vegacalibrations.com). Refer to it as "A VEGA Calibrations company" (text link, no logo).

## Commerce
- No online purchase, cart or "Buy now". The only CTAs are: **Get Solution**, **Call**,
  **WhatsApp**, **Enquiry form**.
- Never show prices anywhere on the site (owner decision). `src/config/site.ts`'s `showPrices` flag is
  `false`; MRP data stays in `src/data/products.ts` but is never rendered while it's false. Every spot
  that would show a price instead shows a **Get Solution** button (`GetSolutionButton`) that opens the
  enquiry form with the product preselected, plus WhatsApp where space allows. Tables drop the price
  row/column entirely rather than hiding it. `npm run check:data` fails the build if `₹`, `MRP` or `GST`
  appears anywhere in the built, rendered HTML while `showPrices` is false.
- Never mention the cloud software/platform name or its pricing anywhere on the site.

## SEO
- Exactly one `<h1>` per page.
- Unique `<title>` (≤ 60 chars) and meta description (≤ 155 chars) per page, via `buildMetadata()`
  in `src/lib/seo.ts`.
- Descriptive alt text on every image. Use `next/image` everywhere (no raw `<img>`).
- Add internal links between related pages (product ↔ industry ↔ service ↔ location).

## Google-safe content
- No fake reviews, testimonials or rating/review schema.
- No "No.1", "best", "leading" or similar superlative claims.
- No keyword stuffing, no hidden text.
- No near-duplicate location pages: every location page needs genuinely local content.
- Say "supports 21 CFR Part 11 compliance" – never "21 CFR certified".

## Data
- Contact details (phone, WhatsApp, email, address) come only from `src/config/site.ts`.
  Never hard-code them in components or content.

## Location URLs
- Every location page (country, state, city, area) is one flat URL: `/data-logger-{slug}`. Never write or
  link a nested `/locations/...` URL; build links with `locationHref(path)` from `src/data/locations.ts`.
  `/locations` stays as the single hub listing everything.
- The data tree (country > state > city > area) stays hierarchical in `src/data/locations.ts` and
  `src/data/areas.ts`. If an area slug collides with a city, state or country slug, the area becomes
  `{slug}-industrial-area` automatically (a state sharing a city's slug, e.g. Delhi, becomes
  `{slug}-state`); `npm run check:data` fails on any duplicate slug.
- Old nested paths 301-redirect from `next.config.ts`. Visible breadcrumbs are short (Home > City > Area,
  or Home > Locations > State for hubs); BreadcrumbList JSON-LD keeps the full hierarchy
  (`locationCrumbs()` in `src/lib/location-crumbs.ts`).

## Hero logger pairs
- An area page's hero pair is stored in `AreaDef.hero` (deterministic, never random). It only needs to be
  unique within its own city: area pages of one city differ from each other and from the city page's pair.
  `npm run check:data` enforces this; choose a new pair by hashing the slug into the city's unused pairs.
- City pages: each city's pair is fixed by registry order in `src/data/page-heroes.ts` and is unique site-wide. All
  available logger pairs are now used, so a city inside a state hub (`HUB_OF`, currently Maharashtra, Gujarat, Uttar Pradesh, Haryana, Telangana, Karnataka, Tamil Nadu, Punjab, Himachal Pradesh, Kerala, Rajasthan, Madhya Pradesh, West Bengal, Andhra Pradesh, Uttarakhand and Dadra and Nagar Haveli and Daman and Diu, Odisha, Jharkhand, Chhattisgarh, Bihar, Assam, Manipur, Meghalaya, Tripura, Sikkim, Jammu and Kashmir, Puducherry and the 13 Saudi Arabian regions) may reuse a
  pair as long as no other city in the SAME hub shows it; cities outside a hub never share a pair. `check:data` enforces it.

## Placeholder pages
- Placeholder/dummy pages (e.g. `/blog/__placeholder__`) must be `noindex` and excluded from
  `sitemap.xml`.

## Design system
- Colours, fonts, radii, shadows and utilities are defined in `src/app/globals.css` (`@theme`).
  Use the tokens (`brand-*`, `navy-*`, `surface`, `ink`, `muted`, `violet-500`, `cyan-400`,
  `live-green`, `whatsapp`) – no ad-hoc hex values in components.
- Text must meet WCAG AA contrast. On WhatsApp green use dark text (`text-navy-950`), never white.
- Animations must respect `prefers-reduced-motion` (use `motion-safe:` variants).
- The header is one fixed, solid-white style on every page at every scroll position — never
  transparent, never a different height, always the normal (blue) logo. The white logo is
  reserved for genuinely dark areas: the mobile menu panel and the footer.

## Checks before finishing
- `npm run lint`, `npm run build`, `npm run check:images` must all pass.
