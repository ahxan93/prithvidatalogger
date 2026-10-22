# Prithvi Data Loggers: Master Website Brief

> Place this file at `docs/MASTER-BRIEF.md` in the project.
> It is the single source of truth for content, data and page structure.
> CLAUDE.md rules always apply on top of this brief.
> Build ONE phase at a time (section 9). Never skip the checks at the end of a phase.

---

## 1. Business facts (use exactly these, do not invent others)

| Item | Value |
|---|---|
| Brand | Prithvi Data Loggers |
| Website | https://prithvidatalogger.com |
| Parent company | VEGA Calibrations: NABL accredited (ISO/IEC 17025:2017) calibration laboratory, ISO 9001:2015 certified. Established 2 August 2016. https://www.vegacalibrations.com |
| Founder | Mr. Ashwin Masurkar, Director (TM). Temperature mapping & monitoring expert; NABL calibration & validation; helps pharma QA and cold chain teams become audit-ready. |
| Head office | A-202-A, Second Floor, Jaswanti Allied Business Centre, Kachpada, Ramchandra Lane Extn., Malad West, Mumbai – 400064, Maharashtra, India |
| Phone / WhatsApp | +91 98702 92760 |
| Email | support@prithvidataloggers.com |
| Countries served | India, Saudi Arabia, United Arab Emirates, Qatar, Oman, Kuwait, Bahrain, Yemen |
| Buying process | Offline only. Visitor browses, then contacts via Call / WhatsApp / Enquiry form. Team explains and quotes; purchase happens offline. |

**Brand story (About page source):**
- Every regulated industry depends on one invisible asset: its environment. Medicines, vaccines, lab results, food and manufacturing all depend on controlled conditions.
- Many monitoring systems are still disconnected, manual and delayed. "Measurements exist. Understanding does not." Prithvi exists to bridge this gap.
- Prithvi grew out of VEGA's years of NABL-accredited calibration and temperature mapping work, which showed the practical limits of conventional monitoring.
- Why the name: in Indian philosophy, Prithvi (Earth) is the foundation on which every environment exists. Likewise, controlled environments are the foundation that protects products, processes and people.
- Vision: A world where every critical environment is protected.
- Mission: To enable confident action through trusted environmental information.
- Core purpose: To protect products, processes, and people with trusted environmental intelligence.
- Prithvi Framework (7 stages): Connect → Observe → Preserve → Validate → Understand → Predict → Decide.
- How we work (owner's request; write naturally, no exaggeration): fast service, clean and transparent work, no hidden charges (MRP shown openly, GST stated), NABL-traceable calibration from our parent lab, support from enquiry to installation.

**Do NOT state these unless the owner confirms them later:**
- Statistics ("500+ facilities", "10K+ devices", "99.9% uptime"). Keep a `showStats: false` flag in `src/config/site.ts`.
- "12 years of experience" (conflicts with the 2016 founding date).
- Warranty period, delivery timelines, response-time promises, free calibration certificate with device.
- Prices for Vayu, GSM versions or LoRa versions. Show "Price on request" instead.
- The cloud software's brand name and its pricing. Describe features generically as "cloud monitoring dashboard & mobile alerts".

**Owner decisions (confirmed 11 October 2026, after Phase 1):**
1. Cities served on location pages: approved as written in `src/data/locations.ts`.
2. Yemen: supply is "arranged case by case". Keep this wording.
3. Vayu / GSM outside India: network compatibility is NOT confirmed. Never claim that GSM loggers work on GCC (or other non-Indian) networks. Use: "GSM versions are available. Contact us to confirm network compatibility for your country." In code this is `GSM_NETWORK_NOTE` in `src/data/locations.ts`; it is shown once per non-India page by the template (not repeated in page copy, to avoid duplicate content).
4. Mumbai office: visits by appointment only ("Please call ahead to book a visit").
5. Enquiry form service options: "Calibration / Temperature Mapping" and "Validation (IQ/OQ/PQ)" (separate options). Defined in `src/data/enquiry.ts`.
6. GSM/LoRa versions of the Wi-Fi models: "available on request". No separate products.
7. Approved: extra industry applications ("Network and UPS rooms" for Data Centres, "Finished-goods warehouses" for Textile) and marking multi-channel loggers (Rajmudra, Dhruva, Veer, Virat) as external-probe models.

**Owner decisions (confirmed after Phase 2):**
1. Homepage industries: show 8; Chemical and Textile are the two left out.
2. Clients section line: "Pharma companies, cold chain and logistics operators, healthcare brands, hotels and food businesses work with us."
3. Hero live trend card: keep it, but nothing on it may read as a real customer's data. Use a generic label ("Cold room"); never name a facility type that implies a specific client. The readings are illustrative.
4. Client logos are lazy-loaded (never fetched during the initial page load).

**Owner decisions (confirmed after Phase 3):**
1. Homepage below 768px: the product marquee becomes a swipeable scroll-snap row, and the client logos show as ONE row. Both marquees stay as they are from 768px up.
2. Accessory compatibility is NOT confirmed. Never claim an accessory is compatible with all (or any named) series. On logger pages the accessories section carries: "Accessory compatibility is confirmed by our team when we prepare your quote." On accessory pages: "Works with Prithvi loggers – confirm compatibility for your model with our team." (`ACCESSORY_COMPATIBILITY_NOTE` / `ACCESSORY_WORKS_WITH_NOTE` in `src/data/products.ts`.)
3. Page copy rule: reasoned advice is fine; invented specs, timings or guarantees are not. Any sentence stating a fact that is not directly in this brief must be listed for the owner's approval in the phase report.

**Owner decisions (confirmed after Phase 4):**
1. The 14 reasoned-advice sentences in `src/data/product-content.ts` listed in the Phase 4 report are approved as written.
2. Calibration page H1: "NABL Calibration Services in Mumbai & Across India". VEGA Calibrations' head office is in Mumbai.
3. Approved as written: the service process steps, the "what it is" definitions, the other-brands calibration FAQ, the industry challenges and the industry compliance notes.
4. Homepage mobile Lighthouse score: leave as is; re-measure on the live site in Phase 7.
5. Founder bio: only the facts in this section (name, title, expertise, quote). No career history, years or awards.
6. Where a real photo is missing, pages use the designed panels so nothing looks unfinished.

**Owner decisions (confirmed after Phase 5):**
1. Location page recommended-product picks (per country/state/city) are approved as built.
2. Location page heading changed from "Popular Data Loggers in {Place}" to "Recommended Data Loggers in {Place}" on every location page.
3. Approved as written: the About page strapline, the "Our story" heading, the founder bio wording, and the rewritten "How we work" copy.
4. Global presence map: markers only, no country borders, with the "Stylised illustration" caption kept.
5. Certifications: NABL accreditation IS the ISO/IEC 17025 certificate — two documents, not three. Use `public/images/certificates/nabl-certificate.jpg` (label "NABL Accreditation – ISO/IEC 17025:2017") and `public/images/certificates/iso-9001-certificate.jpg` (label "ISO 9001:2015"). The separate iso-17025 placeholder was removed.

**Owner decisions (confirmed after Phase 6):**
1. The `seoTitle` field (shorter `<title>` text for posts whose full mandated headline exceeds 60 characters, while the full headline stays the visible H1) is approved.
2. A published post's `date` must be the real publish date: `check:data` fails the build if a published post's date is in the future, and warns if it is more than 7 days old.
3. The "Reviewed by" line only appears once published, and only when `reviewedBy` is a genuinely different person from `author`. Both `reviewedBy` and `reviewedDate` are optional and should be omitted entirely rather than defaulted to the author.
4. Privacy Policy and Terms: no content change; legal review remains the owner's task before launch (see `docs/LAUNCH-CHECKLIST.md`).

**Owner decisions (confirmed after Phase 7, pricing change):**
1. Prices are no longer shown anywhere on the site. `showPrices: false` in `src/config/site.ts` controls
   this; MRP data in `src/data/products.ts` is kept as-is but only rendered while that flag is true.
2. Every price-display spot (homepage marquee, product/brand cards, comparison table, series page variant
   tabs, accessories) instead shows a **Get Solution** button that opens the enquiry form with the product
   preselected, plus WhatsApp where there's room. Comparison/spec tables drop the price row or column
   entirely rather than hiding it with CSS.
3. Product and ProductGroup JSON-LD no longer includes `offers`/price. Name, image, description, brand and
   SKU/variant info are kept.
4. Copy that referenced visible pricing was rewritten: "transparent MRP pricing" / "MRP shown openly" became
   "Clear, itemised quotes with no hidden charges"; FAQ answers about pricing became "Share your requirement
   and we will send a clear quote."

---

## 2. Product data (put all of this in `src/data/products.ts`)

**Common to all loggers** (show in every specs table):
- Accuracy ±0.5 °C (±2 %RH on RH models)
- Resolution 0.1 °C (0.1 %RH)
- Storage up to 1,00,000 records
- Logging interval 1–60 min (configurable)
- Cloud sync interval 1–60 min (configurable)
- Battery life about 3 months at a 10-minute logging interval
- Universal USB Type-C charging; rechargeable Li-ion battery
- Connectivity: Wi-Fi, plus offline data download via PC software. GSM and LoRa versions available on request.

**Naming convention:**
- "X" = external probe on a 1 m cable.
- "Pro" on Setu/Nakshatra = high-capacity 7000 + 7000 mAh battery.
- "Pro" on multi-channel models = Temp + RH sensors instead of temperature-only.

### 2.1 Setu: single-channel temperature (WiFi)
Name meaning: Sanskrit "Setu" = bridge, the bridge from offline logging to live monitoring.
| Variant | Range | Sensor | Battery | MRP |
|---|---|---|---|---|
| Setu | −30 to +70 °C | Internal | 3000 mAh | ₹5,500 |
| Setu X | −100 to +200 °C | External, 1 m | 3000 mAh | ₹6,500 |
| Setu Pro | −30 to +70 °C | Internal | 7000 + 7000 mAh | ₹8,000 |
| Setu Pro X | −100 to +200 °C | External, 1 m | 7000 + 7000 mAh | ₹9,000 |

### 2.2 Nakshatra: single-channel temperature + humidity (WiFi)
Name meaning: the Nakshatras, the fixed celestial reference points used for observation, navigation and measurement. A constant reference for environmental conditions.
All variants: −30 to +70 °C and 0–100 %RH.
| Variant | Sensor | Battery | MRP |
|---|---|---|---|
| Nakshatra | Internal | 3000 mAh | ₹6,500 |
| Nakshatra X | External, 1 m | 3000 mAh | ₹7,500 |
| Nakshatra Pro | Internal | 7000 + 7000 mAh | ₹10,000 |
| Nakshatra Pro X | External, 1 m | 7000 + 7000 mAh | ₹11,000 |

### 2.3 Rajmudra: 2-channel (WiFi)
Name meaning: the Rajmudra, the royal seal of Chhatrapati Shivaji Maharaj, which stood for authenticity, authority and trust. Trusted environmental evidence for qualification, validation and comparative studies.
| Variant | Sensors | Range | Cable | Battery | MRP |
|---|---|---|---|---|---|
| Rajmudra | 2 × temperature | −100 to +200 °C | 3 m included, extendable to 50 m | 7000 + 7000 mAh | ₹12,000 |
| Rajmudra Pro | 2 × temp + RH | −30 to +70 °C, 0–100 %RH | 3 m included, extendable to 10 m | 7000 + 7000 mAh | ₹15,000 |

### 2.4 Dhruva: 4-channel (WiFi)
Spelling is always "Dhruva", never "Dhruv". Name meaning: Dhruva, the Pole Star, a symbol of stability and dependable reference.
| Variant | Sensors | Range | Cable | Battery | MRP |
|---|---|---|---|---|---|
| Dhruva | 4 × temperature | −100 to +200 °C | 3 m incl., up to 50 m | 7000 mAh | ₹17,000 |
| Dhruva Pro | 4 × temp + RH | −30 to +70 °C, 0–100 %RH | 3 m incl., up to 10 m | 7000 mAh | ₹19,000 |

### 2.5 Veer: 10-channel (WiFi)
Name meaning: Sanskrit "Veer" = brave, strong, dependable.
| Variant | Sensors | Range | Cable | Battery | MRP |
|---|---|---|---|---|---|
| Veer | 10 × temperature | −100 to +200 °C | 3 m incl., up to 50 m | 7000 mAh | ₹25,000 |
| Veer Pro | 10 × temp + RH | −30 to +70 °C, 0–100 %RH | 3 m incl., up to 10 m | 7000 mAh | ₹30,000 |

### 2.6 Virat: 16-channel (WiFi)
Name meaning: Sanskrit "Virat" = vast, powerful, all-encompassing. Monitoring for large facilities.
| Variant | Sensors | Range | Cable | Battery | MRP |
|---|---|---|---|---|---|
| Virat | 16 × temperature | −100 to +200 °C | 3 m incl., up to 50 m | 7000 mAh | ₹45,000 |
| Virat Pro | 16 × temp + RH | −30 to +70 °C, 0–100 %RH | 3 m incl., up to 10 m | 7000 mAh | ₹50,000 |

### 2.7 Vayu: GSM (SIM-based) logger
Name meaning: Sanskrit "Vayu" = air / wind, which reaches everywhere. It monitors where Wi-Fi doesn't reach. (Do NOT copy Virat's meaning.)
| Variant | Sensors | Range | Battery | MRP |
|---|---|---|---|---|
| Vayu | Internal temp + RH | −30 to +70 °C, 0–100 %RH | 5000 mAh | Price on request |
| Vayu Pro | Internal temp + RH, plus external temperature probe (3 m) | Internal −30 to +70 °C & 0–100 %RH; external −100 to +70 °C | 5000 mAh | Price on request |
Best for remote sites, reefer trucks, outdoor or no-Wi-Fi locations.

### 2.8 Accessories
- **External Hooter with Door Sensor:** Wi-Fi hooter giving instant audible alarms on any excursion. Supports up to 4 door sensors, with an alarm if a door stays open beyond the set time. One hooter can serve multiple loggers. Cable length configurable. 12 V DC adapter, 12 V external hooter. Logs door open/close and excursion events. Price on request.
- **Charging Dock:** charges replaceable logger batteries so a charged spare is always ready, minimising downtime. Price on request.

### 2.9 Monitoring features (describe generically, never name the software)
- Real-time alerts via email, SMS, mobile app and dashboard
- Multi-level escalation (Level 1 → 2 → 3) if an alert isn't acknowledged
- Alert acknowledgement with root-cause and corrective-action notes
- Role-based user access and a complete audit trail (supports 21 CFR Part 11, GMP, GDP compliance)
- Location hierarchy for multi-site monitoring (organisation → site → room → device)
- Reports as graph, table or both; export to PDF, Excel and CSV
- Store calibration and mapping reports against each device and room, ready for audits
- Substitute device while a logger is away for calibration, with its data merged back so there are no gaps
- Consignment (in-transit) monitoring with journey reports
- Door-open monitoring and hooter alarms

### 2.10 Connectivity explainer (for products page and blog)
- **Wi-Fi:** for sites with Wi-Fi.
- **GSM:** SIM-based; works anywhere with mobile coverage; for remote sites and vehicles.
- **LoRa:** long-range, low-power radio covering several km; reliable in large warehouses and obstructed areas; one gateway serves many devices.

---

## 3. Industries (`src/data/industries.ts`)
Each industry needs: name, slug, one-line summary, 3–5 applications, recommended series, a short paragraph about why monitoring matters there, and an image path.

| Slug | Name | Applications | Recommended |
|---|---|---|---|
| pharmaceutical | Pharmaceutical | Medicine storage rooms, drug warehouses, stability areas | Nakshatra, Rajmudra Pro, Dhruva Pro |
| vaccine-cold-chain | Vaccine & Cold Chain | Vaccine refrigerators, cold rooms, reefer trucks and containers, last-mile delivery | Setu X, Nakshatra, Vayu |
| hospitals-blood-banks | Hospitals & Blood Banks | Blood banks, pharmacies, medicine stores, labs | Setu, Nakshatra, hooter |
| food-beverage | Food & Beverage | Cold storage, processing plants, restaurants and cloud kitchens | Setu, Setu X, Nakshatra |
| logistics-warehousing | Logistics & Warehousing | Temperature-controlled warehouses, distribution centres, in-transit consignments | Veer, Virat, Vayu |
| data-centers | Data Centres & Server Rooms | Server room temperature and humidity, overheating prevention | Nakshatra, Dhruva Pro |
| laboratories | Research Laboratories | Biological sample storage, environmental testing, R&D labs | Setu X, Rajmudra |
| chemical | Chemical | Chemical storage rooms, raw-material warehouses, sensitive processing areas | Dhruva, Veer |
| electronics | Electronics Manufacturing | Component storage, clean rooms, semiconductor facilities | Nakshatra Pro, Veer Pro |
| textile | Textile | Yarn and fabric storage, humidity-sensitive production areas | Nakshatra, Veer Pro |

---

## 4. Services (`src/data/services.ts`), delivered through parent company VEGA
- **Calibration** (NABL accredited, ISO/IEC 17025:2017): temperature and humidity instruments and data loggers, thermometers, pressure and vacuum gauges, electrical meters, mechanical/dimensional instruments (e.g. vernier calipers), weighing scales, force, lux, sound and vibration meters, anemometers. Certificates are traceable to national standards.
- **Temperature Mapping:** cold rooms, warehouses, deep freezers, refrigerators, insulated boxes, reefer vehicles. Identifies hot and cold spots and the right sensor positions.
- **Validation & Qualification:** Installation Qualification (IQ), Operational Qualification (OQ), Performance Qualification (PQ), software validation report. Helps customers meet GMP, GDP and WHO guideline requirements (say "helps meet", never "guarantees compliance").
- Every service page links to https://www.vegacalibrations.com for the full scope and states that services are delivered by VEGA Calibrations, our parent company.

---

## 5. SEO keyword map (one primary keyword per page; never stuff)
| Page | Primary keyword | Supporting terms |
|---|---|---|
| Home | WiFi temperature and humidity data logger | real-time temperature monitoring, IoT data logger India, cold chain monitoring |
| /products | temperature data loggers | humidity data logger, multi-channel data logger, GSM data logger |
| /products/setu | WiFi temperature data logger | single channel, external probe, freezer data logger |
| /products/nakshatra | temperature and humidity data logger | WiFi RH logger, warehouse humidity monitoring |
| /products/rajmudra | dual channel temperature data logger | 2 channel logger, validation studies |
| /products/dhruva | 4 channel temperature data logger | multi-point monitoring |
| /products/veer | 10 channel temperature data logger | warehouse monitoring system |
| /products/virat | 16 channel temperature data logger | large facility monitoring |
| /products/vayu | GSM temperature data logger | SIM data logger, reefer truck monitoring |
| /industries/pharmaceutical | pharmaceutical temperature monitoring | GDP, 21 CFR Part 11 data logger |
| /industries/vaccine-cold-chain | vaccine cold chain monitoring | vaccine refrigerator data logger |
| /services/calibration | NABL calibration services Mumbai | data logger calibration, ISO 17025 |
| /services/temperature-mapping | temperature mapping services | warehouse / cold room mapping |
| /services/validation | IQ OQ PQ validation services | equipment qualification |
| /locations/uae | temperature data logger UAE | Dubai, Abu Dhabi cold chain monitoring |
| /locations/saudi-arabia | temperature data logger Saudi Arabia | Riyadh, Jeddah, Dammam |

Rules: keyword in title, H1, first 100 words, one H2 and the image alt (naturally). Every page links to at least 3 related pages. Write for humans first.

---

## 6. Writing rules
- Language: clear international English (India and GCC B2B buyers). Short sentences, active voice, benefit first, specs second.
- Tone: confident, calm, expert. Premium but not boastful.
- Allowed: "trusted by" (they are real clients), "NABL accredited parent lab", "supports 21 CFR Part 11 compliance".
- Not allowed: "No.1", "best", "guaranteed compliance", invented numbers, fake testimonials, lorem ipsum in any committed page.
- Each page needs unique copy. Never reuse paragraphs between pages (especially location pages).
- Prices are never shown on the site (owner decision, confirmed after Phase 7). Every price-display
  moment uses a **Get Solution** CTA that opens the enquiry form with the product preselected instead.

---

## 7. Page specifications

### 7.1 Homepage `/`
- Title: "WiFi Temperature & Humidity Data Loggers | Prithvi"
- Meta description: "Real-time WiFi & GSM temperature and humidity data loggers with instant alerts and audit-ready reports. NABL-backed. India & GCC. Get a solution today."

Sections in order:
1. **Hero** (dark navy, dot-grid, soft brand→cyan glow)
   - H1: "WiFi Temperature & Humidity Data Loggers for Real-Time Monitoring"
   - Sub: "Protect medicines, vaccines, food and critical environments with live readings, instant alerts and audit-ready records, backed by an NABL-accredited calibration lab."
   - CTAs: Get Solution (primary), WhatsApp, Call.
   - Visual: the Nakshatra product image, with a live "screen" overlay. A reading ticks gently (e.g. 4.2 °C · 46.1 %RH, small random walk inside 2–8 °C) next to a green ONLINE dot. Floating glass chips: "Alert sent to QA team", "Door closed", "Synced 1 min ago". Static when prefers-reduced-motion.
   - Under the CTAs, a small trust row: NABL / ISO 17025 parent lab · Supports 21 CFR Part 11 · India & GCC.
2. **What we do** (services strip, 5 cards, icon + 2-line explanation + link): Real-Time Monitoring Data Loggers · NABL Calibration · Temperature Mapping · Validation (IQ/OQ/PQ) · Installation & Support.
3. **Product marquee:** H2 "Explore the Prithvi Range". Continuous horizontal marquee of all series images. Each card shows the name, a one-line description and a "Get Solution" button (opens the enquiry form with the series preselected), and links to its series page. Pause on hover and focus. The duplicate track is aria-hidden. Reduced motion turns it into a static, scrollable row. "View all products" button.
4. **Benefits of data loggers:** H2 "Why Real-Time Data Loggers Pay for Themselves". 8 benefit cards:
   - Instant excursion alerts
   - Less product loss
   - Audit-ready digital records
   - No manual readings
   - Multi-level escalation
   - Door-open monitoring
   - No data gaps during calibration
   - Monitor every site from one screen
5. **Industries:** H2 "Built for Regulated & Temperature-Sensitive Industries". 8 image cards linking to the industry pages, plus a "View all industries" link.
6. **Clients:** H2 "Trusted by Teams Across Pharma, Logistics & Food". Logo marquee from `src/data/clients.ts`, greyscale turning to colour on hover.
7. **Why Prithvi:** 4–6 points:
   - Parent NABL-accredited lab
   - In-house calibration & mapping
   - Clear, itemised quotes with no hidden charges
   - Fast, responsive support
   - India & GCC supply
   - Installation guidance
8. **How buying works:** 4 steps: Choose a product → Call / WhatsApp / enquire → Expert consultation & quote → Delivery & installation support.
9. **FAQ:** 6 questions, visible on the page, with FAQPage JSON-LD. Topics:
   - WiFi vs GSM
   - Battery life
   - Data storage when the internet is down
   - Calibration certificates
   - Supply to the GCC
   - How to order
10. **Final CTA band + EnquiryForm** (compact).

### 7.2 Products listing `/products`
- H1 "Temperature & Humidity Data Loggers".
- Intro paragraph.
- Filter chips: All / Temperature / Temp + RH / Multi-channel / GSM.
- Series cards: image, channels, key range, Get Solution button.
- Comparison table of all series.
- Connectivity explainer (Wi-Fi / GSM / LoRa).
- Accessories.
- CTA.

### 7.3 Series page `/products/[slug]` (one template for all series)
1. Breadcrumbs.
2. Hero: gallery (variant images via the fallback helper), H1 "Nakshatra – WiFi Temperature & Humidity Data Logger", short intro, variant selector tabs (each shows its own price and key specs), CTAs (Get Solution with the product preselected, WhatsApp with the product named, Call).
3. "The name": meaning story.
4. Key features.
5. Full specs table (variant columns).
6. Applications and recommended industries (links).
7. Monitoring features (section 2.9).
8. Compatible accessories.
9. FAQ (3–5, product-specific).
10. Related series.
11. EnquiryForm.

JSON-LD: ProductGroup with a Product per variant (name, SKU, description, brand, image). No offers/price (owner decision, confirmed after Phase 7).

### 7.4 Brands `/brands`
- H1 "Prithvi Product Families".
- One elegant card per series: name, meaning, best for, link.
- Note: all products are designed by Prithvi Data Loggers, a VEGA Calibrations company.

### 7.5 Industries hub + `/industries/[slug]`
- Hub: grid of all 10 industries.
- Detail page:
  - H1 "{Industry} Temperature Monitoring"
  - Challenges
  - How Prithvi helps
  - Applications
  - Recommended products (cards)
  - Compliance notes (general: GDP, GMP, HACCP as relevant; no legal claims)
  - Related services
  - FAQ
  - CTA

### 7.6 Services hub + 3 service pages
Each page:
- H1
- What it is
- Why it matters
- Scope (section 4)
- Process steps
- Deliverables (certificate / report)
- "Delivered by VEGA Calibrations" box with link
- FAQ
- EnquiryForm with the service preselected

### 7.7 About `/about`
1. Hero with compact EnquiryForm on the right (desktop) or below (mobile).
2. Our story (section 1).
3. Founder: photo `/images/founder/founder.png` (any format via the existing helper), name, title, short bio and quote: "Measurements exist. Understanding does not."
4. Why the name Prithvi.
5. Vision / Mission / Core purpose.
6. The Prithvi Framework (7-step visual).
7. How we work: fast service, clean & transparent work, no hidden charges.
8. Certifications (NABL / ISO 17025 and ISO 9001 certificate images, opening in a lightbox).
9. Countries we serve.
10. CTA.

Person + Organization JSON-LD.

### 7.8 Global presence `/global-presence`
- H1 "Supplying Data Loggers Across India & the GCC".
- Map visual (simple SVG highlighting the 8 countries).
- Country cards linking to `/locations/{country}`.
- How international supply works (enquiry → quote → dispatch from India → remote setup support). No delivery-time promises.

### 7.9 Locations `/locations/[...slug]`
Data fields per node: name, type, intro (unique), localIndustries, citiesServed, supportNote, faqs, `indexable` (boolean).
- Pages with `indexable: false` are rendered with noindex and excluded from sitemap.xml. Only set `true` once the node has genuinely unique content.
- Create indexable content now for: India, UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Yemen, Maharashtra, Mumbai, Dubai.
- Never state country-specific regulations unless verified. Keep compliance wording general.
- Template:
  - H1 "Temperature Data Loggers in {Place}"
  - Intro
  - Industries we serve there
  - Recommended products
  - How supply & support work
  - Local FAQ
  - Child locations
  - CTA

LocalBusiness JSON-LD only for Mumbai (the real office). Other locations use Service/Organization areaServed.

### 7.10 Blog `/blog`
- MDX posts in `src/content/blog`. Frontmatter: title, description, date, author (Ashwin Masurkar), cover, tags.
- Article JSON-LD, reading time, related posts, CTA at the end.
- First 4 drafts:
  1. What Is a Temperature Data Logger and How Does It Work?
  2. WiFi vs GSM vs LoRa Data Loggers: Which One Should You Choose?
  3. Temperature Mapping vs Temperature Monitoring: What's the Difference?
  4. Why NABL Calibration Matters for Your Data Loggers
- Mark them `draft: true` (noindex, excluded from sitemap) until the owner approves.

### 7.11 Privacy Policy & Terms
Plain, honest templates covering:
- Enquiry form data (processed via Web3Forms and sent to our email)
- WhatsApp/phone contact
- Cookies/analytics (only if added)
- Contact email

Banner at the top of both files in code: "Review with a legal professional before launch."

---

## 8. Technical acceptance (every phase)
- `npm run lint`, `npm run build` and `npm run check:images` pass.
- No horizontal scroll at 375 / 768 / 1440 px; no console errors.
- One H1 per page; title ≤ 60 and description ≤ 155 characters.
- Images through next/image with width/height; hero image priority; others lazy.
- Lighthouse targets: Performance ≥ 90 (mobile), SEO 100, Accessibility ≥ 95.
- Report at the end: what was built, anything that differs from this brief and why, and open questions.

---

## 9. Build phases (do ONE per request)
1. **Phase 1 – Data layer:** fill products, industries, services, locations and company data from this brief. Typed, no UI changes except fixing what breaks.
2. **Phase 2 – Homepage** (7.1).
3. **Phase 3 – Products listing, series template, brands** (7.2–7.4).
4. **Phase 4 – Industries and services** (7.5–7.6).
5. **Phase 5 – About, global presence, locations** (7.7–7.9).
6. **Phase 6 – Blog setup + 4 drafts, privacy, terms** (7.10–7.11).
7. **Phase 7 – Final SEO & performance audit:** sitemap, robots, canonical, JSON-LD validation, internal links, Lighthouse, broken links, and a pre-launch checklist.
