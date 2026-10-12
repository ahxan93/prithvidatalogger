# Launch Checklist

Everything still needed before `prithvidataloggers.com` goes live. Split into what
the owner needs to provide/approve, and the technical steps to deploy.

---

## A. Owner tasks

### 1. Real photos (replace generated placeholders)

The site currently shows a designed placeholder panel wherever a real photo is
missing, so nothing looks broken — but these should be replaced with real
photography before launch. Drop files in under the **exact same filename** and
they'll be picked up automatically (no code changes needed):

**Product photos** (`public/images/products/`)
- `vayu.png`, `vayu-pro.png` — Vayu GSM logger
- `veer.png`, `veer-pro.png` — Veer 10-channel logger
- `virat.png`, `virat-pro.png` — Virat 16-channel logger
- `external-hooter-with-door-sensor.png`
- `charging-dock.png`

**Industry photos** (`public/images/industries/`) — all 10 are still placeholders:
`pharmaceutical.jpg`, `vaccine-cold-chain.jpg`, `hospitals-blood-banks.jpg`,
`food-beverage.jpg`, `logistics-warehousing.jpg`, `data-centers.jpg`,
`laboratories.jpg`, `chemical.jpg`, `electronics.jpg`, `textile.jpg`

**Certificates** (`public/images/certificates/`) — scans of the real documents:
- `nabl-certificate.jpg` — NABL Accreditation / ISO/IEC 17025:2017
- `iso-9001-certificate.jpg` — ISO 9001:2015

**Blog cover images** (`public/images/blog/`), one per post:
- `what-is-a-temperature-data-logger.jpg`
- `wifi-vs-gsm-vs-lora-data-loggers.jpg`
- `temperature-mapping-vs-monitoring.jpg`
- `why-nabl-calibration-matters.jpg`

**Social share image**
- `public/images/og/og-default.jpg` — shown when any page is shared on
  WhatsApp/LinkedIn/etc. (1200×630). Worth making this a real, designed image
  rather than a placeholder, since it's the first thing people see when a link
  is shared.

Already real (no action needed): logo, founder photo, client logos (38), and
the Setu / Nakshatra / Dhruva / Rajmudra product photos.

*(Minor, non-blocking: `public/images/hero/home-hero.jpg` is a leftover
placeholder that isn't actually referenced anywhere in the code — the
homepage hero uses the real Nakshatra product photo instead. Safe to delete
or ignore.)*

### 2. Web3Forms access key

The enquiry form (`EnquiryForm.tsx`) posts to Web3Forms using
`NEXT_PUBLIC_WEB3FORMS_KEY`, which is **not set** — see `.env.local.example`.
Without it, every enquiry submission will silently fail (it shows the error
state with a WhatsApp fallback, but no enquiry email is sent). Sign up at
web3forms.com with `support@prithvidataloggers.com`, get an access key, and
set it as `NEXT_PUBLIC_WEB3FORMS_KEY` in the hosting provider's environment
variables (not just `.env.local`, which isn't deployed).

### 3. Legal review

`src/app/privacy-policy/page.tsx` and `src/app/terms/page.tsx` both carry a
`// REVIEW WITH A LEGAL PROFESSIONAL BEFORE LAUNCH.` comment at the top of the
file. Both are honest, plain-English templates covering exactly what the site
does today (Web3Forms enquiry form, WhatsApp/phone contact, no cookies or
analytics) — but neither has had a legal review.

### 4. Blog review and publish

All 4 draft posts are written under Ashwin Masurkar's byline and are currently
`draft: true` (reachable by direct link for review, but not indexed or
listed). To publish a post once approved:
1. In its `.mdx` file, set `draft: false`.
2. Set `date` to the real publish date (there's now a `check:data` rule that
   fails the build if a published post's date is in the future, and warns if
   it's more than 7 days old).
3. If someone other than the author reviewed it, add `reviewedBy` and
   `reviewedDate` — the "Reviewed by" line only appears when that's a
   genuinely different person from the author.
4. If the post's cover image is still a placeholder at publish time, its
   `BlogPosting` structured data will omit the `image` field, which Google's
   Article rich-result guidance expects — publish after the real cover photo
   is in place where possible.

### 5. Client logo permission

38 client logos are displayed on the homepage and in the trust strip. Confirm
each client has agreed to have their logo shown publicly on the website if
that wasn't already part of the original agreement with them.

### 6. Statistics and claims

`showStats` is `false` in `src/config/site.ts` by design — no "X00+
facilities" or similar numbers appear anywhere. If real, verifiable numbers
become available, they can be added and `showStats` flipped on; until then,
leave it as is.

---

## B. Technical launch steps

1. **Environment variables** — set `NEXT_PUBLIC_WEB3FORMS_KEY` on the hosting
   platform (see A.2).
2. **Domain & DNS** — point `prithvidataloggers.com` (apex) at the host.
   `www.prithvidataloggers.com` should also resolve (even just to the same
   host) so the app's own 308 redirect from www → apex (configured in
   `next.config.ts`) can fire; a DNS-level redirect/forward also works if the
   host doesn't terminate TLS for the www host.
3. **TLS** — confirm HTTPS is issued and enforced for both the apex and www
   hostnames before pointing DNS live.
4. **Flip `PRODUCTION_DOMAIN_LIVE` to `true`** in the hosting platform's
   environment variables once the custom domain (step 2) is connected and
   verified. Until this is set, the site stays reachable but `noindex`ed on
   the `*.vercel.app` preview URL and sends `X-Robots-Tag: noindex`; setting
   it also turns on a 308 redirect from any `*.vercel.app` host to
   `https://prithvidataloggers.com` (path preserved). See `src/proxy.ts`.
   Redeploy after setting it.
5. **Build & deploy** — `npm run build` (static/PPR output confirmed working
   in this audit); `npm run start` or the host's Next.js runtime serves it.
6. **Google Search Console** — verify the domain, submit
   `https://prithvidataloggers.com/sitemap.xml`.
7. **Bing Webmaster Tools** — same, optional but low-effort.
8. **Analytics** — none is installed (by design, per the Privacy Policy's
   current wording). If one is added later (GA4, Plausible, etc.), update the
   Privacy Policy's "Cookies and analytics" section to match before deploying
   it — the current wording explicitly says none is used.
9. **Smoke test on the live domain** after DNS cutover:
   - `/sitemap.xml` and `/robots.txt` resolve and reference the live domain.
   - `www.prithvidataloggers.com` redirects to the apex domain.
   - Enquiry form submits successfully end-to-end (needs step 1).
   - Google Maps embed loads on `/contact`.
   - View source confirms no `X-Robots-Tag: noindex` header and no
     `<meta name="robots" content="noindex">` tag on the production domain.
10. **Re-run Lighthouse on the live URL** once deployed — scores measured
   against a local `next start` server (this audit) are a close proxy but can
   differ from the real host (CDN, compression, edge caching).

---

## Known, accepted gap (not a launch blocker)

Mobile Lighthouse Performance is below the 90 target on three pages measured
in this audit: **Home (73)**, **Products listing (82)**, and the **Nakshatra
series page (79)**. Desktop Performance is 100 on every page measured, and
Accessibility/SEO are 100 everywhere, mobile included. The shortfall traces to
CPU-bound hydration cost (hero animation, product marquee, variant explorer)
under Lighthouse's simulated 4× mobile CPU throttle — server response time is
excellent (20–30 ms) and layout shift is zero. The homepage number was
already flagged and explicitly deferred by the owner after Phase 4
("re-measure on the live site in Phase 7"); the products/series pages are a
new finding from this audit. Recommend re-measuring on the live production
host first (local `next start` throttling can run a few points worse than a
real CDN edge), then treating any remaining gap as a post-launch performance
pass (route-level code-splitting of the heavier client components) rather
than a pre-launch blocker.
