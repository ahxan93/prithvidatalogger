@AGENTS.md

# Prithvi Data Loggers – project rules

These rules are permanent. Follow them in every change.

docs/MASTER-BRIEF.md is the source of truth for content and pages.

## Brand
- Brand: **Prithvi Data Loggers** – IoT temperature & humidity data loggers (WiFi / GSM / LoRa).
- Parent company: **VEGA Calibrations** – NABL / ISO/IEC 17025:2017 accredited calibration lab
  (https://www.vegacalibrations.com). Refer to it as "A VEGA Calibrations company" (text link, no logo).

## Commerce
- No online purchase, cart or "Buy now". The only CTAs are: **Get a Quote**, **Call**, **WhatsApp**,
  **Enquiry form**.
- Prices are shown only as "MRP ₹X + 18% GST". Never show vendor/dealer prices.
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

## Placeholder pages
- Placeholder/dummy pages (e.g. `/blog/__placeholder__`) must be `noindex` and excluded from
  `sitemap.xml`.

## Design system
- Colours, fonts, radii, shadows and utilities are defined in `src/app/globals.css` (`@theme`).
  Use the tokens (`brand-*`, `navy-*`, `surface`, `ink`, `muted`, `violet-500`, `cyan-400`,
  `live-green`, `whatsapp`) – no ad-hoc hex values in components.
- Text must meet WCAG AA contrast. On WhatsApp green use dark text (`text-navy-950`), never white.
- Animations must respect `prefers-reduced-motion` (use `motion-safe:` variants).
- Pages with a dark hero put `data-hero="dark"` on the hero section; the header then renders
  transparent with the white logo until the user scrolls.

## Checks before finishing
- `npm run lint`, `npm run build`, `npm run check:images` must all pass.
