# Prithvi Data Loggers: Location Pages Playbook

> Save this file in the project as `docs/LOCATION-PAGES-PLAYBOOK.md`.
> Order of work:
> 1. Run the **MASTER PROMPT** (section 5) once. It upgrades the template, the cluster and the checks, and builds Mumbai as the pilot page.
> 2. Then run **one city prompt at a time** (section 6). After each one, check the page in the browser, then `git push`.
> 3. Last, run the **State & Country hub prompt** (section 7).

---

## 1. Goals and Google-safety rules

**Goal:** rank for "temperature data logger in {city}" type searches in every city where Prithvi genuinely supplies, installs and visits, without looking like doorway pages.

**Google rules this playbook follows:**
- **No doorway pages.** Every city page must be genuinely useful and different: its own intro, industrial areas, industry mix, climate angle, FAQs and nearby links. Shared blocks (product cards, how-buying-works, form) are allowed but never count as the page's unique content.
- **Only real service areas.** We list only places the owner confirmed. No fake local office, no fake address, no fake phone number per city.
- **No fake reviews, ratings, testimonials, customer counts, client names, timelines or local regulations.** No AggregateRating or Review schema.
- **Structured data must match visible content.** FAQ schema only for FAQs shown on the page. LocalBusiness schema only for the real Mumbai office. Other cities use Service schema with `areaServed`.
- **No keyword stuffing.** Each keyword variant appears naturally, 1 to 2 times. Write for a QA manager or warehouse head in that city.
- **No hidden text, no cloaking, no auto-spun text.** Every sentence must be readable and true.
- **Owner-confirmed fact usable on every page:** "We supply, install and make site visits across India's cities and industrial areas, and supply the GCC."

---

## 2. Cluster architecture (hub and spoke)

```
/locations                          <- the single hub that lists everything (India + GCC)
/data-logger-india                  <- country hub
/data-logger-maharashtra            <- state hub
/data-logger-mumbai                 <- city spoke
/data-logger-navi-mumbai            <- city spoke
/data-logger-andheri                <- area page
/data-logger-saudi-arabia           <- country hub
/data-logger-dubai                  <- city under a country with no state level
```

**URL rules (permanent; every future city and area prompt uses them):**
- Every location page is **one flat segment**: `/data-logger-{slug}` where `{slug}` is the node's own
  slug (country, state, city or area). No nested `/locations/...` URLs are ever linked.
- The data tree (country, state, city, area in `src/data/locations.ts` and `src/data/areas.ts`) stays
  hierarchical: parents, nearby links, breadcrumbs and hero badges all read the tree.
- Build every URL with `locationHref(path)` (`src/data/locations.ts`); never hand-write a location URL.
- **Collisions:** if a city/state/country and an area share a slug (for example Noida, Navi Mumbai,
  Vasai), the node keeps the plain slug and the area automatically becomes
  `/data-logger-{area}-industrial-area`. `npm run check:data` fails on any duplicate flat slug.
  A state that shares a city's slug (Delhi the state and Delhi the city) is the exception: the city keeps
  `/data-logger-delhi` and the state hub becomes `/data-logger-delhi-state`.
  Slugs are reserved for every `AreaDef` even before its page is written, so adding a city later only
  ever renames the area's URL, never another city's.
- **Redirects:** `next.config.ts` 301-redirects every old nested `/locations/...` path (and the old
  `/og/locations/...` image path) to its flat URL, built from the same data. `npm run check:data` fails
  if one is missing, and `npm run check:links` fails if any page links to an old nested URL.
- **Breadcrumbs:** the visible row is short: Home > City (> Area) for cities and areas, and
  Home > Locations > State (or Country) for hubs. The BreadcrumbList JSON-LD lists the full hierarchy
  (Home > Locations > Country > State > City > Area) with the flat URLs. Use `locationCrumbs()`
  (`src/lib/location-crumbs.ts`).
- **OG image:** `/og/locations/{slug}` (flat slug).
- **Hero logger pair:** each area page's two hero photos are fixed in its `AreaDef.hero` (so they never change
  between builds). A pair only has to be unique within its own city: area pages of one city must differ from
  each other and from that city page's pair. `src/data/page-heroes.ts` and `scripts/check-data.mjs` enforce it.
  Pick a new page's pair by hashing its slug into the city's unused pairs (the 12 hero photos give 66 pairs).
- **City hero pairs:** each city page's pair (`getCityHeroDevices()` in `src/data/page-heroes.ts`) is fixed by the
  registry order, never at render time, and is unique site-wide. The 10 logger photos give only 45 pairs (41 once the
  pairs held by other pages are removed), and the 41st city exhausted them. **Relaxed rule (Maharashtra hub, added with
  the Satara, Solapur and Ratnagiri-Lote pages; Gujarat hub added with the Rajkot to Kandla pages; Uttar Pradesh hub added with the Ghaziabad to Moradabad pages; Haryana hub added with the Gurugram to Karnal pages):** once every pair is taken, a city that belongs to a state hub
  (`HUB_OF` in `page-heroes.ts`) may reuse a pair that no other city in the SAME hub shows. A city outside a hub
  never shares a pair, and `npm run check:data` fails on any pair shared inside one hub. Maharashtra, Gujarat, Uttar Pradesh and Haryana are in
  `HUB_OF` so far; a future hub needs its cities added there.
- **Implementation:** Next cannot match a partial dynamic segment, so `src/app/data-logger/[slug]` is
  the route and `next.config.ts` rewrites `/data-logger-:slug` to it.


**Internal linking rules (this is what makes it a cluster):**
1. **City → parents:** breadcrumbs (Home › Locations › India › State › City) and an in-content link to the state hub.
2. **City → siblings:** a "Nearby Locations We Serve" block with 2 to 3 nearby cities (data in section 4).
3. **City → topic pages:** links to 3 to 5 relevant industry pages, 3 recommended product series pages, and the 3 service pages.
4. **Parents → children:** each state hub lists all its cities. The country hub lists all its states and cities.
5. **Topic pages → cities (reverse links):** every industry page gets a "Where We Serve" block linking the 6 to 8 most relevant cities for that industry. Every service page links to the country hubs.
6. **Footer:** a compact "Top locations" list (8 to 10 biggest cities) plus a link to /locations.
7. **Anchor text:** descriptive and varied, e.g. "data loggers in Pune", "temperature monitoring in Bhiwandi", "our Hyderabad page". Never "click here".

---

## 3. City page template (sections, in this order)

| # | Section | Content rules |
|---|---|---|
| 1 | **Breadcrumbs** | With BreadcrumbList JSON-LD. |
| 2 | **Hero** | H1: `Temperature Data Loggers in {City}`. Sub-line uses a secondary keyword, e.g. "WiFi and GSM temperature & humidity monitoring for {City}'s pharma, cold chain and industrial sites." Buttons: Get Solution (form with city prefilled), WhatsApp (message names the city), Call. Trust chips: "NABL-accredited parent lab", "Site visits in {City}", "Supply across India & the GCC". |
| 3 | **Intro** (120–180 words, unique) | The city's real industrial character plus its **climate angle** (from section 4) and why continuous monitoring matters there. Primary keyword once in the first 100 words. |
| 4 | **Industrial Areas We Serve in {City}** | A chip or grid list of the areas from section 4, each with a 1-line, area-specific note (e.g. "Bhiwandi – large 3PL and FMCG warehouses"). |
| 5 | **Industries We Support in {City}** | 3 to 5 cards from the city's industry focus. Each card has a city-specific sentence and links to its industry page. |
| 6 | **Recommended Data Loggers for {City}** | 3 product cards, each with a one-line reason tied to the city (e.g. "Veer – multi-zone warehouses in Bhiwandi"). No prices. Never Vayu outside India. |
| 7 | **Calibration, Mapping & Validation in {City}** | Short block linking the 3 service pages, "delivered by our parent lab VEGA Calibrations". |
| 8 | **How We Work in {City}** | 4 steps: Share requirement → Site understanding / visit → Supply & installation → Ongoing support. **No timelines.** |
| 9 | **Why Prithvi** | Short shared block (4 points), allowed to repeat across pages. |
| 10 | **{City} FAQs** | 4 city-specific questions with visible answers, plus FAQPage JSON-LD. Good topics: site visits in that area, which logger suits the local climate or industry, calibration availability, monitoring multiple sites in the region. |
| 11 | **Nearby Locations We Serve** | 2 to 3 sibling city links plus the state hub link. |
| 12 | **Enquiry form** | Compact EnquiryForm with a hidden `city` field = {City}. Email subject: "New enquiry from {Name} ({Company}) – {City} – prithvidataloggers.com" (name only when the optional Company name is empty). |

**SEO settings per city page:**
- **Title (≤60):** `Temperature Data Loggers in {City} | Prithvi`. If too long, drop "Temperature".
- **Meta description (≤155):** names the city, WiFi/GSM loggers, site visits, and "Get Solution". Unique per city.
- **URL:** flat `/data-logger-{slug}`, e.g. `/data-logger-navi-mumbai` (see the URL rules in section 2).
- **Canonical:** self-referencing on the production domain.
- **OG image:** auto-generated per city (navy background, Prithvi logo, "Temperature Data Loggers in {City}").
- **JSON-LD:** BreadcrumbList + Service (`serviceType`: "Temperature & humidity data logger supply, installation and calibration support"; `provider`: Organization; `areaServed`: City, plus State/Country) + FAQPage. **LocalBusiness only on Mumbai.**
- **Keyword variants (use naturally, not all on every page):** temperature data logger {city}, humidity data logger {city}, temperature monitoring system in {city}, cold room monitoring {city}, data logger supplier in {city}, temperature mapping {city}.
- **Length:** 700–1,100 words of unique body content (shared blocks not counted).
- **Images:** optional city hero image later at `/images/locations/{slug}.webp`, with an alt text that names the city. Use a designed gradient panel until then.

**Quality checks (`npm run check:data` must enforce):**
- No sentence reused between any two location pages (shared blocks excluded).
- Unique body word count ≥ 600 per city page.
- All 12 sections present. Title ≤ 60, description ≤ 155. Exactly one H1.
- Banned: "No.1", "best", "guaranteed", "within X hours/days", customer counts, "our {city} office" (except Mumbai), Vayu recommended outside India, "Get a Quote", any price.
- Every city links to its state hub, 2+ siblings, 3+ industry pages and 3 product pages.

---

## 4. City data (source of truth for prompts)

| City (slug) | State / Country | Industrial areas | Industry focus | Climate angle | Nearby links |
|---|---|---|---|---|---|
| Mumbai (`mumbai`) | Maharashtra | Andheri MIDC, Marol, Thane, Lower Parel commercial hubs | Pharma HQs & distribution, hospitals, food & cold storage, data centres | Coastal, humid, heavy monsoon | Navi Mumbai, Bhiwandi, Panvel |
| Navi Mumbai (`navi-mumbai`) | Maharashtra | TTC MIDC (Turbhe, Mahape, Rabale), Pawane, Vashi | Pharma & chemical units, data centres, APMC-linked cold storage | Coastal humidity, monsoon | Mumbai, Panvel, Bhiwandi |
| Panvel (`panvel`) | Maharashtra | Taloja MIDC, port-linked logistics belt near JNPT | Port cold chain, warehousing, chemical units | Coastal humidity, monsoon | Navi Mumbai, Mumbai, Pune |
| Bhiwandi (`bhiwandi`) | Maharashtra | Major warehousing and 3PL clusters | 3PL warehousing, FMCG, pharma distribution | Large sheds with hot pre-monsoon months and humid monsoon | Mumbai, Navi Mumbai, Panvel |
| Pune (`pune`) | Maharashtra | Chakan, Ranjangaon, Pimpri-Chinchwad, Talegaon, Kurkumbh | Pharma, electronics & auto, food processing, data centres | Hot summers, monsoon humidity | Mumbai, Panvel, Goa |
| Nashik (`nashik`) | Maharashtra | Ambad, Satpur, Sinnar, Nashik Road, Lasalgaon belt | Wine and grape packing, onion trade, engineering and electrical, pharma | Hot dry plateau, moderate monsoon | Thane & Bhiwandi, Mumbai, Pune, Chhatrapati Sambhajinagar |
| Chhatrapati Sambhajinagar (`chhatrapati-sambhajinagar`, formerly Aurangabad; `/data-logger-aurangabad` 301-redirects here) | Maharashtra | Waluj, Chikalthana, Shendra, Paithan | Automotive and component stores, drinks, pharma, hospitals, tourist hotels | Very hot, dry summers | Nashik, Pune, Nagpur |
| Nagpur (`nagpur`) | Maharashtra | Hingna, Butibori, MIHAN, Kalmeshwar, Itwari and Kalamna markets | Orange and grain trade, hospitals, warehousing, medicine distribution | Extreme dry summer heat | Chhatrapati Sambhajinagar, Nashik, Hyderabad |
| Kolhapur (`kolhapur`) | Maharashtra | Shiroli, Gokul Shirgaon, Kagal Five Star, Ichalkaranji | Dairy, sugar and jaggery, foundries, powerloom textiles | Heavy monsoon, flood-prone low areas | Pune, Satara, Ratnagiri-Lote |
| Satara (`satara`) | Maharashtra | Satara and Additional Satara MIDC, Shirwal, Karad, Mahabaleshwar | Strawberry and dairy cold rooms, hospitals, highway warehousing | Extreme hill rain, drier eastern plains | Pune, Kolhapur, Solapur |
| Solapur (`solapur`) | Maharashtra | Akkalkot Road, Chincholi, old-city textile lanes, Pandharpur | Chaddar and towel textiles, pomegranate and onion trade, hospitals | Punishing dry heat, scanty monsoon | Pune, Satara, Kolhapur |
| Ratnagiri-Lote (`ratnagiri-lote`) | Maharashtra | Mirkarwada harbour, Mirjole, Lote Parshuram, Chiplun | Mango, cashew and fish cold chain, chemical stores, Konkan godowns | Heavy monsoon, salty humid air | Kolhapur, Panvel, Goa |
| Vadodara (`vadodara`, also called Baroda) | Gujarat | Makarpura, Waghodia, Savli, Nandesari, Koyali | Pharma, process equipment, chemicals, dairy, hospitals | Hot dry summer, heavy monsoon, river flooding | Ahmedabad, Bharuch, Halol-Panchmahal, Surat |
| Rajkot (`rajkot`) | Gujarat | Aji, Metoda, Shapar-Veraval, Bedi yard | Engines and auto parts, oil mills, distributors | Fierce semi-arid heat, erratic rain | Morbi, Jamnagar, Ahmedabad |
| Bharuch (`bharuch`) | Gujarat | Zadeshwar, Bholav (Panoli, Jhagadia and Dahej link to the Ankleshwar and Dahej pages) | Chemical trading, hospitals, cotton, highway warehousing | Humid, heavy monsoon, Narmada floods | Ankleshwar, Vadodara, Surat |
| Gandhinagar (`gandhinagar`) | Gujarat | Sector 25, GIFT City, Kalol, Chhatral, Palaj institutes | Data halls, laboratories, hospitals, pharma | Hot dry summer | Ahmedabad, Vadodara, Rajkot |
| Halol-Panchmahal (`halol-panchmahal`) | Gujarat | Halol GIDC, Kalol, Godhra, Pavagadh | Vehicle component stores, pharma, dairy | Hot summer, moderate monsoon | Vadodara, Ahmedabad, Bharuch |
| Morbi (`morbi`) | Gujarat | Rajkot-road and Wankaner-road ceramic clusters, Maliya Miyana | Ceramic tile export warehousing, glaze and chemical stores, panel rooms | Scorching semi-arid | Rajkot, Kandla, Mundra, Jamnagar |
| Jamnagar (`jamnagar`) | Gujarat | Dared, Shankar Tekri, Motikhavdi refinery belt, Bedi port | Refinery suppliers, brass-parts export, groundnut and oil, hospitals | Dry, salty, cyclone risk | Rajkot, Morbi, Mundra |
| Mundra (`mundra`) | Gujarat | Port terminals, special economic zone, freight stations | Container logistics, reefer cargo, pharma and chemical transit | Arid, salt wind, cyclone risk | Kandla, Morbi, Jamnagar |
| Kandla (`kandla`, Deendayal Port, with Gandhidham) | Gujarat | Port, Kandla SEZ, Gandhidham, timber yards, salt works | Edible oil and chemical tank farms, bonded sheds, hospitals | Hot, dry, salty; cyclone and quake history | Mundra, Morbi, Jamnagar, Rajkot |
| Ahmedabad (`ahmedabad`) | Gujarat | Changodar, Sanand, Naroda, Vatva, Bavla | Pharma manufacturing, food & dairy, chemicals | Very hot, dry summers | Mumbai, Indore, Jaipur |
| Vapi (`vapi`) | Gujarat | Vapi GIDC and its highway godown belt | Chemical, dye and pharmaceutical intermediates, paper and plastics | South Gujarat's heavy monsoon and humid coastal air | Vasai-Palghar, Surat, Ankleshwar |
| Ankleshwar (`ankleshwar`) | Gujarat | Ankleshwar GIDC, Panoli, Jhagadia, Dahej | Chemical and bulk-drug plants, laboratories, port-linked warehousing | Hot, humid summers and a heavy monsoon on the Narmada plain | Surat, Vapi, Ahmedabad |
| Surat (`surat`) | Gujarat | Pandesara, Sachin, Hazira, the textile markets | Textile weaving and processing, dyeing chemicals, godowns, pharma stockists | Long heavy monsoon and damp river-city air | Vapi, Ankleshwar, Mumbai |
| Delhi (`delhi`) | Delhi | Okhla, Naraina, Bawana, Narela | Hospitals, pharma distribution, food & cold storage, labs | Extreme summer heat, cold winters | Noida, Manesar, Chandigarh |
| Noida (`noida`) | Uttar Pradesh | Noida Phase I–II, Greater Noida | Electronics manufacturing, data centres, warehousing | Extreme summer heat, cold winters | Delhi, Manesar, Lucknow |
| Ghaziabad (`ghaziabad`) | Uttar Pradesh | Loni, Meerut Road, Kavi Nagar, Indirapuram and Vaishali (Sahibabad and Greater Noida link to their own pages) | Highway warehousing, pharma distribution, food, hospitals | Very hot summer, foggy winter, dust | Noida, Delhi, Meerut |
| Kanpur (`kanpur`) | Uttar Pradesh | Jajmau, Panki, Dada Nagar, Naya Ganj and Collectorganj | Leather and tannery chemicals, textiles, medicine wholesale, hospitals | Fierce summer, foggy winter, damp monsoon | Lucknow, Prayagraj, Agra |
| Agra (`agra`) | Uttar Pradesh | Foundry Nagar, Sikandra, Fatehabad Road, potato cold stores | Cold stores, footwear chemicals, hotel kitchens, sweet makers | Scorching summer, foggy winter | Noida, Lucknow, Kanpur |
| Varanasi (`varanasi`) | Uttar Pradesh | Ramnagar, Chandpur, Madanpura and Lallapura, university hospital belt | Silk textiles, hospitals, guest-house kitchens, godowns | Humid, Ganga floods, thick winter fog | Prayagraj, Lucknow, Kanpur |
| Meerut (`meerut`) | Uttar Pradesh | Partapur, Modipuram, sports-goods workshops, gur yards | Sports goods, jaggery and grain, pharma distribution, hospitals | Hot summer, foggy winter, humid monsoon | Ghaziabad, Noida, Delhi, Moradabad |
| Prayagraj (`prayagraj`, also Allahabad) | Uttar Pradesh | Naini, Phulpur, Civil Lines, publishing lanes, Sangam fair grounds | Hospitals, medicine wholesale, fair-time camps, paper stores | Fierce heat, winter fog, river floods | Varanasi, Kanpur, Lucknow |
| Bareilly (`bareilly`) | Uttar Pradesh | Bhojipura, Izatnagar, furniture and zari lanes | Furniture warehousing, research laboratories, pharma, hospitals | Hot summer, foggy winter, humid monsoon | Moradabad, Lucknow, Meerut |
| Moradabad (`moradabad`) | Uttar Pradesh | Kanth Road, old city brass lanes, export packing, Ramganga bank | Brassware export packing, plating chemicals, hospitals | Very hot, foggy winter, humid monsoon | Meerut, Bareilly, Noida |
| Lucknow (`lucknow`) | Uttar Pradesh | Chinhat, Amausi, Nadarganj | Hospitals, pharma distribution, food & cold storage | Hot summers, humid monsoon | Noida, Delhi, Kolkata |
| Manesar (`manesar`) | Haryana | IMT Manesar | Auto & electronics, warehousing, pharma | Hot summers, cold winters | Delhi, Noida, Jaipur |
| Gurugram (`gurugram`) | Haryana | Udyog Vihar, Sector 37, Cyber City and Golf Course Road offices (IMT Manesar links to its own page) | Data halls, hospitals, electronics, garment export stores, hotels | Dry heat, dust storms, foggy winter | Manesar, Delhi, Faridabad |
| Faridabad (`faridabad`) | Haryana | NIT, Ballabgarh belt, Mathura Road corridor (Okhla links to its own page) | Coating and lubricant stores, hospitals, electrical goods, warehousing | Dusty heat, damp monsoon, winter fog | Delhi, Gurugram, Noida |
| Panipat (`panipat`) | Haryana | Old-city weaving lanes, Samalkha, export godowns, refinery-linked supplier belt | Home textiles, chemical suppliers, warehousing | Hot and dusty, damp monsoon | Sonipat, Karnal, Delhi |
| Sonipat (`sonipat`) | Haryana | Kundli, Rai, Barhi, Murthal highway food stops | Packed food and beverage, warehousing, packaging, pharma stockists | Hot and dusty, foggy winter | Delhi, Panipat, Rohtak |
| Rohtak (`rohtak`) | Haryana | PGIMS hospital belt, university campus, IMT Rohtak and estates, grain markets | Hospitals, laboratories, medicine stockists, food | Very hot and dry, foggy winter | Sonipat, Delhi, Hisar |
| Hisar (`hisar`) | Haryana | Steel and galvanised-iron works, farm-university campuses, cotton and oilseed markets | Research laboratories, chemical stores, food, hospitals | Fierce dry heat, cold foggy winter | Rohtak, Delhi |
| Ambala (`ambala`) | Haryana | Ambala Cantonment, instrument workshops, city godowns, Mullana medical belt | Hospitals, laboratories, logistics, medicine wholesale | Heavier monsoon near the foothills, dense winter fog | Chandigarh, Karnal |
| Karnal (`karnal`) | Haryana | Taraori rice mills, research institute campuses, grain market, highway estates | Rice and dairy, laboratories, warehousing, hospitals | Humid monsoon over paddy country, winter fog | Panipat, Ambala |
| Chandigarh (`chandigarh`) | Chandigarh (UT) | Industrial Area Phase I–II, Mohali, Panchkula | Hospitals, pharma distribution, food | Hot summers, cold winters | Baddi, Delhi, Manesar |
| Baddi (`baddi`) | Himachal Pradesh | Baddi, Barotiwala, Nalagarh | Pharma manufacturing hub | Foothill climate with seasonal temperature swings | Chandigarh, Delhi |
| Jaipur (`jaipur`) | Rajasthan | Sitapura, VKI Area | Pharma distribution, food & dairy, hospitals | Desert heat, large day–night swings | Delhi, Manesar, Ahmedabad |
| Indore (`indore`) | Madhya Pradesh | Pithampur, Sanwer Road | Pharma, food processing, auto | Hot summers | Ahmedabad, Pune, Jaipur |
| Hyderabad (`hyderabad`) | Telangana | Genome Valley, Jeedimetla, Pashamylaram, Patancheru | Pharma & vaccines, life-science labs, data centres | Hot, dry summers | Bengaluru, Chennai, Pune |
| Bengaluru (`bengaluru`) | Karnataka | Peenya, Bommasandra, Jigani, Electronic City | Biotech & labs, data centres, electronics, hospitals | Mild climate, but server and lab loads need control | Chennai, Hyderabad, Coimbatore |
| Chennai (`chennai`) | Tamil Nadu | Sriperumbudur, Oragadam, Ambattur | Pharma, electronics & auto, food, port logistics | Hot, humid, coastal | Bengaluru, Coimbatore, Hyderabad |
| Coimbatore (`coimbatore`) | Tamil Nadu | SIDCO industrial estates | Textile (humidity-critical), engineering, hospitals, food | Moderate, with humidity swings | Kochi, Chennai, Bengaluru |
| Kochi (`kochi`) | Kerala | Kakkanad, Kalamassery, Edayar | Seafood processing & export cold chain, port logistics, spices, hospitals | High humidity, heavy monsoon | Coimbatore, Bengaluru, Goa |
| Goa (`goa`) | Goa | Verna, Kundaim | Pharma manufacturing, hotels & food | Coastal humidity, heavy monsoon | Pune, Mumbai, Kochi |
| Kolkata (`kolkata`) | West Bengal | Howrah, Kalyani, Dankuni | Pharma distribution, food & cold storage, hospitals, port logistics | Hot, humid | Lucknow, Hyderabad, Delhi |
| Riyadh (`riyadh`) | Saudi Arabia | Industrial and logistics zones | Pharma distribution, hospitals, food warehousing | Extreme dry heat | Dammam, Jeddah, Bahrain |
| Jeddah (`jeddah`) | Saudi Arabia | Industrial and port logistics zones | Port logistics, food import cold chain, hospitals | Hot, humid coastal | Riyadh, Dammam |
| Dammam (`dammam`) | Saudi Arabia | Industrial and port logistics zones | Industrial & chemical, port logistics, food | Hot, humid Gulf coast | Riyadh, Bahrain, Jeddah |
| Dubai (`dubai`) | UAE | Jebel Ali, Al Quoz | Logistics & re-export, food, pharma distribution, hospitality | Extreme heat and humidity | Riyadh, Dammam, Bahrain |

**GCC notes:** supply is from India. Don't name local estates beyond those listed. Never recommend Vayu. Keep the existing GSM compatibility note. Bahrain stays as a country page (no city page).

**Planned, awaiting owner confirmation (do NOT build yet):** Thane, Visakhapatnam, Haridwar. (Vapi, Ankleshwar and Surat were confirmed by the owner and moved into the table above.)

---

## 5. MASTER PROMPT (run once, first)

```text
Read docs/LOCATION-PAGES-PLAYBOOK.md fully and follow it as the source of truth for all location pages (add a line to CLAUDE.md saying so). Do the following and nothing else: (1) Upgrade the city template (served at /data-logger-{slug}) to exactly the 12 sections in section 3, with the SEO settings, JSON-LD (BreadcrumbList + Service with areaServed + FAQPage; LocalBusiness only for Mumbai), per-city auto OG image, hidden city field in the enquiry form and city-named WhatsApp message. (2) Move location data to a typed structure with fields for intro, climateAngle, areas (name + note), industries (slug + city sentence), recommendedSeries (slug + reason), faqs, nearby, metaTitle, metaDescription and indexable. (3) Build the cluster linking from section 2: breadcrumbs, state-hub link, nearby block, links to industry/product/service pages, a "Where We Serve" block on every industry page linking its most relevant cities, country-hub links on service pages, and a compact "Top locations" list in the footer. (4) Extend npm run check:data with every rule in section 3 "Quality checks". (5) Build or upgrade ONLY Mumbai as the pilot city page using its row in section 4, with fully unique, accurate copy and no invented facts. (6) Don't create other new city pages yet. Keep existing ones working; any page that doesn't pass the new checks yet is marked indexable: false (noindex, out of the sitemap) until its own prompt upgrades it. Then run lint, build, check:data and check:images, verify /data-logger-mumbai at 375px and 1440px, validate its JSON-LD, commit, and report the list of location pages currently indexable vs noindex.
```

---

## 6. City prompts (one at a time, in this order)

Each prompt is a single line. Paste one, check the page, `git push`, then the next.

**Mumbai** is built by the master prompt.

**1. Navi Mumbai**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Navi Mumbai (slug navi-mumbai, under Maharashtra) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**2. Panvel**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Panvel (slug panvel, under Maharashtra) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**3. Bhiwandi**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Bhiwandi (slug bhiwandi, under Maharashtra) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**4. Pune**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Pune (slug pune, under Maharashtra) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**5. Ahmedabad**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Ahmedabad (slug ahmedabad, under Gujarat) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**6. Delhi**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Delhi (slug delhi, under Delhi; if a "delhi-ncr" page exists, turn it into a short hub linking Delhi, Noida and Manesar) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**7. Noida**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Noida (slug noida, under Uttar Pradesh) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**8. Manesar**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Manesar (slug manesar, under Haryana) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**9. Lucknow**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Lucknow (slug lucknow, under Uttar Pradesh) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**10. Chandigarh**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Chandigarh (slug chandigarh, under the Union Territory of Chandigarh) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**11. Baddi**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Baddi (slug baddi, under Himachal Pradesh) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**12. Jaipur**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Jaipur (slug jaipur, under Rajasthan) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**13. Indore**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Indore (slug indore, under Madhya Pradesh) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**14. Hyderabad**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Hyderabad (slug hyderabad, under Telangana) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**15. Bengaluru**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Bengaluru (slug bengaluru, under Karnataka; mention "Bangalore" naturally once or twice) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**16. Chennai**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Chennai (slug chennai, under Tamil Nadu) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**17. Coimbatore**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Coimbatore (slug coimbatore, under Tamil Nadu) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**18. Kochi**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Kochi (slug kochi, under Kerala) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**19. Goa**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the location page for Goa (slug goa, under the state of Goa; treat Goa as the city-level page) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**20. Kolkata**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Kolkata (slug kolkata, under West Bengal) using its row in section 4 and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**21. Riyadh**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Riyadh (slug riyadh, under Saudi Arabia) using its row in section 4, the GCC notes, and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; never recommend Vayu; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**22. Jeddah**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Jeddah (slug jeddah, under Saudi Arabia) using its row in section 4, the GCC notes, and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; never recommend Vayu; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**23. Dammam**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and build/upgrade the city page for Dammam (slug dammam, under Saudi Arabia) using its row in section 4, the GCC notes, and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; never recommend Vayu; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

**24. Dubai**
```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and upgrade the existing city page for Dubai (slug dubai, under UAE) using its row in section 4, the GCC notes, and exactly the template, SEO and cluster rules in sections 2–3; write fully unique, accurate copy with no invented facts; never recommend Vayu; mark it indexable only if it passes every check; run check:data, lint and build; verify at 375px and 1440px; commit and tell me the unique word count.
```

---

## 7. State & Country hub prompt (run last)

```text
Read docs/LOCATION-PAGES-PLAYBOOK.md and upgrade all hub pages. Global /locations: H1 "Where Prithvi Data Loggers Supply & Support", with India and GCC sections. Country hubs (/data-logger-india, /data-logger-saudi-arabia, /data-logger-uae, /data-logger-qatar, /data-logger-oman, /data-logger-kuwait, /data-logger-bahrain, /data-logger-yemen): H1 "Temperature Data Loggers in {Country}", a unique intro, cities grouped by state (India) or listed (GCC) with one-line notes, top industries, 3 FAQs with FAQPage schema, and a CTA. State hubs (Maharashtra, Gujarat, Delhi, Uttar Pradesh, Haryana, Chandigarh, Himachal Pradesh, Rajasthan, Madhya Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, Goa, West Bengal): H1 "Temperature Data Loggers in {State}", a unique 100–150 word intro about the state's industrial profile, city cards linking every city in that state, key industries with links, 2–3 FAQs, and a CTA. All hubs get breadcrumbs, a unique meta title and description, and BreadcrumbList + Service (areaServed) JSON-LD, and pass every check:data rule (no reused sentences). A state hub with only one city must still be genuinely useful; if it can't be, mark it noindex and link the city from the country hub instead. Then run lint, build and check:data, verify /locations, /locations/india and /locations/india/maharashtra at 375px and 1440px, commit, and report the final count of indexable location pages.
```

---

## 8. After the pages go live
1. In Google Search Console, submit `sitemap.xml` again and request indexing for /data-logger-india and the top 5 cities.
2. After 4–6 weeks, check **Performance → Pages** to see which city pages get impressions. Strengthen those with a real photo, or a short real project note (with customer permission).
3. Create a **Google Business Profile** for the Mumbai office only. Never create profiles for cities without a real office.
4. When the owner confirms more cities, add their rows to section 4 and use the same city prompt.
