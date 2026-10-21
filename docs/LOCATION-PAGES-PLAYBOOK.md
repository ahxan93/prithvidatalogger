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
  the Satara, Solapur and Ratnagiri-Lote pages; Gujarat hub added with the Rajkot to Kandla pages; Uttar Pradesh hub added with the Ghaziabad to Moradabad pages; Haryana hub added with the Gurugram to Karnal pages; Telangana hub added with the Warangal to Nizamabad pages; Karnataka hub added with the Mysuru to Tumakuru pages; Tamil Nadu hub added with the Hosur to Tuticorin pages; Punjab hub added with the Mohali page and extended with the Ludhiana to Rajpura pages, and Panchkula joins the Haryana hub; Himachal Pradesh hub added with the Solan to Shimla pages; Kerala hub added with the Thiruvananthapuram to Kollam pages; Rajasthan hub added with the Jodhpur to Neemrana pages, and Jaipur joins it; Madhya Pradesh hub added with the Bhopal to Dewas pages, and Indore joins it; West Bengal hub added with the Howrah to Haldia pages, and Kolkata joins it; Andhra Pradesh hub added with the Visakhapatnam to Kakinada pages; Uttarakhand hub added with the Haridwar to Kotdwar pages; the Dadra and Nagar Haveli and Daman and Diu hub added with the Silvassa, Daman and Diu pages; the Odisha hub added with the Bhubaneswar to Jharsuguda pages; the Jharkhand hub added with the Ranchi to Bokaro pages; the Chhattisgarh hub added with the Raipur to Korba pages; the Bihar hub added with the Patna to Bhagalpur pages; the Assam, Manipur, Meghalaya and Tripura hubs added with the Guwahati to Agartala pages; the Sikkim hub added with the Gangtok and Rangpo pages; the Jammu and Kashmir hub added with the Jammu to Kathua pages; the Puducherry hub added with the Puducherry and Karaikal pages):** once every pair is taken, a city that belongs to a state hub
  (`HUB_OF` in `page-heroes.ts`) may reuse a pair that no other city in the SAME hub shows. A city outside a hub
  never shares a pair, and `npm run check:data` fails on any pair shared inside one hub. Maharashtra, Gujarat, Uttar Pradesh, Haryana, Telangana, Karnataka, Tamil Nadu, Punjab, Himachal Pradesh, Kerala, Rajasthan, Madhya Pradesh, West Bengal, Andhra Pradesh, Uttarakhand and Dadra and Nagar Haveli and Daman and Diu, Odisha, Jharkhand, Chhattisgarh, Bihar, Assam, Manipur, Meghalaya, Tripura, Sikkim, Jammu and Kashmir, Puducherry and the 13 Saudi Arabian regions are in
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
| Mohali (`mohali`, Sahibzada Ajit Singh Nagar, under Punjab; the Punjab hub stays noindex until it has 2 built pages) | Punjab | Industrial Area phases and Focal Point, IT City and technology parks, research institutes, hospital cluster | Pharma units, electronics, data rooms, hospitals, laboratories | Hot dry summer, heavy foothill monsoon, foggy winter | Chandigarh, Panchkula, Baddi |
| Ludhiana (`ludhiana`) | Punjab | Focal Point phases, Dhandari, Sherpur and Jamalpur, old-town cloth markets, dairy and hospital belt | Knitwear and textile stores, dye chemicals, dairy and food, hospitals | Hot dry summer, short monsoon, cold foggy winter | Jalandhar, Patiala, Mohali, Chandigarh |
| Amritsar (`amritsar`) | Punjab | Walled city and temple lanes, Focal Point, Majitha Road, wholesale lanes, Attari road godowns | Hotel and sweet-shop kitchens, dry fruit, textiles, hospitals | Very hot summer, humid monsoon, cold foggy winter | Jalandhar, Ludhiana |
| Jalandhar (`jalandhar`) | Punjab | Sports and Surgical Complex, Leather Complex, Focal Point, cantonment and hospitals | Sports goods and leather stores, chemicals, dairy and food, hospitals | Hot dry summer, damp monsoon weeks, foggy winter | Ludhiana, Amritsar |
| Patiala (`patiala`) | Punjab | Old city bazaars, medical college and hospital belt, campuses, rice mills | Hospitals, university laboratories, rice and food, logistics | Very hot summer, damp monsoon, cold foggy winter | Rajpura, Mohali, Ludhiana, Chandigarh |
| Bathinda (`bathinda`) | Punjab | Grain and cotton market yards, Focal Point and industrial area, refinery, fertiliser and power belt, junction and cantonment | Grain and oil mills, chemical stores, hospitals, rail logistics | Extreme dry summer heat, hard cold and fog in winter | Patiala, Ludhiana |
| Rajpura (`rajpura`) | Punjab | Junction goods yards, industrial area, grain market and rice mills, town markets | Logistics, rice and packed food, medicine distribution, hospitals | Hot dry summer, damp monsoon, foggy winter | Patiala, Mohali, Chandigarh, Ambala |
| Panchkula (`panchkula`, under Haryana) | Haryana | Industrial Area Phase I and II, Raipur Rani, Barwala, Pinjore and Kalka, sector hospitals | Medicine stockists, hospitals, dairy and food depots, logistics | Heavy foothill monsoon, hot dry summer, foggy winter | Chandigarh, Mohali, Baddi, Ambala |
| Baddi (`baddi`) | Himachal Pradesh | Baddi, Barotiwala, Nalagarh | Pharma manufacturing hub | Foothill climate with seasonal temperature swings | Chandigarh, Delhi |
| Solan (`solan`) | Himachal Pradesh | Chambaghat research and mushroom units, Nauni university campus, Kumarhatti and highway depots | Mushroom and vegetable cold rooms, research labs, hospitals, logistics | Temperate damp, heavy monsoon, freezing winter nights | Parwanoo, Shimla, Baddi |
| Parwanoo (`parwanoo`) | Himachal Pradesh | Parwanoo industrial area, foot-of-the-climb transport yards, roadside hotels, fruit processors | Pharma and packaging, electronics, food, logistics | Hot damp valley, cool foggy hills above | Solan, Baddi, Panchkula, Chandigarh |
| Paonta Sahib (`paonta-sahib`) | Himachal Pradesh | Paonta Sahib industrial area, Kala Amb, Yamuna-side border road, gurdwara town centre | Pharma, paper and packaging chemicals, hospitality, logistics | Warm humid river valley, heavy monsoon | Solan, Baddi |
| Una (`una`) | Himachal Pradesh | Gagret, Mehatpur, Bathri, Haroli, Punjab border depots, hospital belt | Steel and packaging stores, food, logistics, hospitals | Hot dry summer, heavy monsoon, cool winter | Chandigarh, Mohali, Baddi |
| Shimla (`shimla`) | Himachal Pradesh | Medical college area, Sanjauli, Dhalli, Chhota Shimla, fruit cold stores, Mall Road hotels | Hospitals, fruit cold chain, hospitality, pharma wholesale | Cool summer, snow, below-freezing winter | Solan, Parwanoo, Chandigarh |
| Jaipur (`jaipur`) | Rajasthan | Sitapura, VKI Area | Pharma distribution, food & dairy, hospitals | Desert heat, large day–night swings | Delhi, Manesar, Ahmedabad |
| Jodhpur (`jodhpur`) | Rajasthan | Basni, Boranada and Mandore industrial areas, old-city spice and grain markets | Handicraft and furniture export, textile dyeing, spice and food, hospitals | Fierce dry heat, dust storms, cold winter nights | Ajmer, Udaipur |
| Udaipur (`udaipur`) | Rajasthan | Madri and Sukher estates, lakeside hotels, hospital district | Hospitality kitchens, hospitals, mineral and stone works, logistics | Hot summer, fuller monsoon than the west | Bhilwara, Ajmer, Jodhpur |
| Kota (`kota`) | Rajasthan | Indraprastha Industrial Area, Chambal-side works, coaching hostel districts, stone yards | Chemical and fertiliser stores, hostel mess kitchens, hospitals, logistics | Severe summer heat, humid monsoon weeks | Bhilwara, Ajmer, Jaipur |
| Ajmer (`ajmer`) | Rajasthan | Dargah bazaar, Madar industrial area, Kishangarh marble belt, railway workshop area | Sweet makers, hospitals, laboratories, goods sheds | Hot summer, cool winter, short monsoon | Jaipur, Bhilwara, Jodhpur |
| Bhilwara (`bhilwara`) | Rajasthan | Spinning and weaving mills, Hamirgarh processing houses, RIICO estates, cloth godowns | Textile (humidity-critical), dye and finishing chemicals, logistics, hospitals | Hot dry summer, damp monsoon weeks | Ajmer, Udaipur, Kota |
| Bhiwadi (`bhiwadi`, Alwar district, beside the Haryana border) | Rajasthan | Bhiwadi industrial area, Tapukara, Khushkhera, Chopanki, border-road warehouses | Auto parts and electronics, food and packaging, pharma, logistics | Very hot summer, dusty, cold winter nights | Neemrana, Manesar, Gurugram |
| Neemrana (`neemrana`, Alwar district, on the Delhi to Jaipur highway) | Rajasthan | Japanese Zone, Neemrana industrial phases, Ghilot and Behror side, highway warehousing | Electronics and appliance makers, food, pharma, logistics | Fierce dry summer, foggy cold winter | Bhiwadi, Manesar, Jaipur |
| Indore (`indore`) | Madhya Pradesh | Pithampur, Sanwer Road | Pharma, food processing, auto | Hot summers | Ahmedabad, Pune, Jaipur |
| Bhopal (`bhopal`) | Madhya Pradesh | Govindpura industrial area, Mandideep estate, MP Nagar, hospital and medical institute cluster | Hospitals, pharma, food, laboratories | Hot summer, heavy monsoon, cool winter | Indore, Jabalpur, Gwalior |
| Jabalpur (`jabalpur`) | Madhya Pradesh | Richhai and Adhartal industrial areas, defence factory belt, grain and pulse markets | Electrical and engineering stores, pulses and food, hospitals, logistics | Hot summer, long damp monsoon | Bhopal, Indore |
| Gwalior (`gwalior`) | Madhya Pradesh | Malanpur and Banmore estates, city workshops, highway transport yards | Pharma, dairies, laboratories, highway logistics | Hot summer, foggy cold winter | Bhopal, Agra, Jabalpur |
| Pithampur (`pithampur`, Dhar district) | Madhya Pradesh | Industrial sectors, special economic zone, contract warehouses, worker towns | Pharma, auto-component and electronics stores, canteen kitchens, logistics | Hot dry spring, heavy monsoon | Indore, Dewas, Ujjain |
| Ujjain (`ujjain`) | Madhya Pradesh | Temple lanes, Indore road industrial area, Nagda, produce market and oil mills | Sweet makers and caterers, oil and grain, chemicals, hospitals | Hot summer, heavy monsoon, cold winter mornings | Dewas, Indore, Pithampur |
| Dewas (`dewas`) | Madhya Pradesh | Industrial areas on the Indore and Ujjain sides, highway yards, produce market | Pharma, chemicals, food, highway logistics | Hot spring, damp monsoon, cool winter | Indore, Ujjain, Pithampur |
| Hyderabad (`hyderabad`) | Telangana | Genome Valley, Jeedimetla, Pashamylaram, Patancheru | Pharma & vaccines, life-science labs, data centres | Hot, dry summers | Bengaluru, Chennai, Pune |
| Warangal (`warangal`) | Telangana | Hanamkonda, Kazipet, market yards and chilli cold stores, textile park, medical college belt | Chilli and grain cold stores, textiles, hospitals, logistics | Very hot dry summer, damp monsoon | Hyderabad, Karimnagar |
| Karimnagar (`karimnagar`) | Telangana | Rice mills, granite cutting units, market yard and seed godowns, hospital belt | Rice milling, granite chemicals, pharmacy wholesale, hospitals | Fierce dry summer, heavy monsoon air | Warangal, Nizamabad, Hyderabad |
| Nizamabad (`nizamabad`) | Telangana | Turmeric market yard, Armoor rice mills, Bodhan sugar factory, hospital belt | Turmeric and grain trade, logistics, pharma wholesale, hospitals | Intense dry heat, short humid monsoon | Karimnagar, Hyderabad |
| Bengaluru (`bengaluru`) | Karnataka | Peenya, Bommasandra, Jigani, Electronic City | Biotech & labs, data centres, electronics, hospitals | Mild climate, but server and lab loads need control | Chennai, Hyderabad, Coimbatore |
| Mysuru (`mysuru`) | Karnataka | Metagalli, Hootagalli, Nanjangud, research campuses, palace-side hotels | Research labs, hotel kitchens, teaching hospitals, food | Mild, damp monsoon | Bengaluru, Coimbatore |
| Hubballi-Dharwad (`hubballi-dharwad`) | Karnataka | Gokul Road, Tarihal, Rayapur, Belur, Amargol market yard, university campuses | Medicine wholesale, hospitals, laboratories, grain and food | Hot dry pre-monsoon, damp rains | Belagavi, Goa |
| Mangaluru (`mangaluru`) | Karnataka | Baikampady, Yeyyadi, port and Panambur, fishing harbour, medical belt | Cashew and seafood, chemical stores, port logistics, hospitals | Warm, salty, very wet monsoon | Goa, Kochi |
| Belagavi (`belagavi`) | Karnataka | Udyambag, Macche, aerospace-components cluster, cantonment | Precision parts, foundry chemicals, hospitals, sugar and grain | Heavy long monsoon | Hubballi-Dharwad, Kolhapur, Goa |
| Tumakuru (`tumakuru`) | Karnataka | Vasantha Narasapura, Antharasanahalli, copra and groundnut godowns, hospital belt | Food processing, highway warehousing, electronics, hospitals | Warm dry, damp monsoon | Bengaluru, Mysuru |
| Chennai (`chennai`) | Tamil Nadu | Sriperumbudur, Oragadam, Ambattur | Pharma, electronics & auto, food, port logistics | Hot, humid, coastal | Bengaluru, Coimbatore, Hyderabad |
| Madurai (`madurai`) | Tamil Nadu | Mattuthavani markets, Kappalur and Tirumangalam estates, Sungudi and garment workshops, hospital belt | Flower and vegetable cold chain, hospitals, textiles, pharma wholesale | Long hot dry summer, heavy north-east monsoon | Tiruchirappalli, Coimbatore |
| Tiruchirappalli (`tiruchirappalli`, Trichy) | Tamil Nadu | Thuvakudi, Ariyamangalam, Golden Rock railway area, Gandhi Market and Srirangam flower market, hospital belt | Fabrication and power-equipment suppliers, instruments, hospitals, logistics | Very hot inland plain, late heavy rain | Madurai, Salem |
| Salem (`salem`) | Tamil Nadu | Sago and starch mills, Suramangalam, Ammapet, Shevapet and Leigh Bazaar, hospital belt | Starch and mango trade, textiles, steel suppliers, hospitals | Hot basin of hills, damp monsoon | Coimbatore, Tiruchirappalli |
| Tiruppur (`tiruppur`) | Tamil Nadu | Avinashi Road, Palladam Road, Anupparpalayam, Kangeyam Road, dyeing houses, export sheds | Knitwear export, dyeing chemicals, logistics | Warm fairly dry, two short damp spells | Coimbatore, Salem |
| Erode (`erode`) | Tamil Nadu | Turmeric market, Brough Road textile market, Perundurai estate, Bhavani carpet weavers | Turmeric and cloth trade, hospitals, logistics | Hot dry summer, short heavy monsoon spells | Salem, Tiruppur, Coimbatore |
| Vellore (`vellore`) | Tamil Nadu | Medical college and hospital area, Katpadi junction and university, Ranipet tanning belt, Ambur and Vaniyambadi footwear | Hospitals, laboratories, leather chemicals, pharma wholesale | Fierce dry heat, late-year rain | Chennai, Bengaluru |
| Tuticorin (`tuticorin`, Thoothukudi) | Tamil Nadu | Port and harbour, SIPCOT complex, fishing harbour, salt pans | Seafood cold chain, chemical stores, port logistics, hospitals | Hot, humid, salty, cyclone-prone | Madurai, Kochi |
| Hosur (`hosur`, Krishnagiri district, Tamil Nadu, beside the Bengaluru border) | Tamil Nadu | SIPCOT complexes, Mathigiri, cut-flower packing sheds (Electronic City links to its own page) | Vehicle and component plants, foundries, electronics, flower cold rooms | Cool dry air, hot pre-monsoon, damp rains | Bengaluru, Chennai |
| Coimbatore (`coimbatore`) | Tamil Nadu | SIDCO industrial estates | Textile (humidity-critical), engineering, hospitals, food | Moderate, with humidity swings | Kochi, Chennai, Bengaluru |
| Kochi (`kochi`) | Kerala | Kakkanad, Kalamassery, Edayar | Seafood processing & export cold chain, port logistics, spices, hospitals | High humidity, heavy monsoon | Coimbatore, Bengaluru, Goa |
| Thiruvananthapuram (`thiruvananthapuram`) | Kerala | Technopark at Kazhakoottam, medical college and research belt, Vizhinjam port and landing centres, Pappanamcode estate | Hospitals, laboratories, data rooms, seafood and food | Warm humid, two monsoons, salt air | Kollam, Kochi |
| Kozhikode (`kozhikode`) | Kerala | Spice and coconut-oil lanes, Kallai timber area, Beypore and Puthiyappa harbours, hospital belt | Spice and oil trade, seafood, hospitals, pharma wholesale | Long heavy monsoon, humid year round | Thrissur, Kochi |
| Thrissur (`thrissur`) | Kerala | Old-town jewellery streets, Ollur small-industry belt, Mannuthy campuses, hospital district | Ayurvedic makers, laboratories, hospitals, food | Humid year round, long monsoon | Kochi, Kozhikode |
| Kollam (`kollam`) | Kerala | Cashew factories, Neendakara and Sakthikulangara harbours, Kundara and Chavara works, coir workshops | Cashew and seafood, mineral and ceramic stores, hospitals, logistics | Warm, humid, salty, long monsoon | Thiruvananthapuram, Kochi |
| Goa (`goa`) | Goa | Verna, Kundaim | Pharma manufacturing, hotels & food | Coastal humidity, heavy monsoon | Pune, Mumbai, Kochi |
| Kolkata (`kolkata`) | West Bengal | Howrah, Kalyani, Dankuni | Pharma distribution, food & cold storage, hospitals, port logistics | Hot, humid | Lucknow, Hyderabad, Delhi |
| Howrah (`howrah`) | West Bengal | Dasnagar, Bantra, Liluah rail workshops, junction goods yards and wholesale lanes | Engineering and electrical stores, food and sweets, pharma distribution, rail logistics | Hot, damp, long monsoon, storm power cuts | Kolkata, Haldia, Kharagpur |
| Siliguri (`siliguri`) | West Bengal | Sevoke Road and Hill Cart Road, Matigara, Pradhan Nagar and Bidhan Market, tea packing houses | Tea and food, medicine distribution, hospitals, hill-road logistics | Warm, very wet monsoon, cool misty winter | Kolkata, Durgapur |
| Durgapur (`durgapur`) | West Bengal | Fuljhore, Bamunara, steel and power works, Benachity and City Centre | Chemicals, plant laboratories, hospitals, electrical stores | Hot, humid monsoon, mild winter | Asansol, Kolkata |
| Asansol (`asansol`) | West Bengal | Burnpur and Kulti works, Raniganj coalfield side, railway junction and division offices, town markets | Electrical and instrument stores, chemicals, hospitals, food wholesale | Very hot dusty summer, heavy monsoon | Durgapur, Kolkata |
| Kharagpur (`kharagpur`) | West Bengal | Institute campus laboratories, railway workshops and junction, rice and oilseed mills, town market | Laboratories, food and grain, hospitals, rail logistics | Hot, humid, heavy monsoon and cyclone rains | Howrah, Haldia, Kolkata |
| Haldia (`haldia`) | West Bengal | Dock complex and jetties, refinery and petrochemical estate, fertiliser and edible-oil firms, Durgachak township | Chemicals, port warehousing, edible oil, plant laboratories | Salty, humid, heavy monsoon and cyclone season | Kharagpur, Howrah, Kolkata |
| Visakhapatnam (`visakhapatnam`) | Andhra Pradesh | Port and harbour warehouses, Gajuwaka steel and shipyard side, Parawada pharma city, Autonagar and city markets | Seafood export cold chain, pharma, chemical stores, port logistics | Hot humid coast, salty air, cyclone season | Kakinada, Vijayawada |
| Vijayawada (`vijayawada`) | Andhra Pradesh | Autonagar, wholesale markets and godowns, railway junction goods sheds, Gannavaram estates | Mango, rice and spice trade, medicine stockists, hospitals, logistics | Fiercely hot summer, cyclone rains, humid | Guntur, Kakinada, Visakhapatnam |
| Guntur (`guntur`) | Andhra Pradesh | Chilli market yard and cold stores, tobacco and cotton belt, spinning and rice mills, hospital district | Chilli and spice cold storage, textile, hospitals, logistics | Hot humid delta, monsoon and cyclone damp | Vijayawada, Nellore |
| Tirupati (`tirupati`) | Andhra Pradesh | Pilgrim hotels and canteens, medical institute and university belt, Renigunta electronics cluster, mango pulp units | Hospitality kitchens, electronics, hospitals, laboratories | Very hot summer, north-east monsoon rain | Sri City, Nellore, Chennai |
| Nellore (`nellore`) | Andhra Pradesh | Shrimp and fish processing plants, hatcheries, rice mills and granite works, Krishnapatnam port side | Seafood export cold chain, rice and feed stores, chemicals, hospitals | Hot humid coast, north-east monsoon and cyclone season | Tirupati, Sri City, Guntur |
| Sri City (`sri-city`) | Andhra Pradesh | Special economic zone plants, domestic tariff area plants, contract warehouses, campus utilities | Electronics, packaged food, healthcare, contract logistics | Hot humid plain, north-east monsoon rain | Tirupati, Nellore, Chennai |
| Kakinada (`kakinada`) | Andhra Pradesh | Port and rice godowns, fertiliser and gas-based works, seafood processors, economic zone | Seafood and rice export, chemical stores, pharma, port logistics | Hot humid delta, heavy monsoon and cyclones | Visakhapatnam, Vijayawada |
| Haridwar (`haridwar`) | Uttarakhand | SIDCUL Ranipur, Roshnabad and Bahadrabad estates, Har ki Pauri and Jwalapur markets, Kankhal hospital belt | Pharma, electrical and electronics stores, pilgrim kitchens and sweet makers, logistics | Hot summer, very heavy monsoon, cold foggy winter | Roorkee, Dehradun |
| Dehradun (`dehradun`) | Uttarakhand | Selaqui and Sahaspur industrial areas, Paltan Bazaar, Rajpur Road hotels and hospitals, institutes | Pharma, hospitals, hotels and food, laboratories | Mild valley, exceptionally heavy monsoon, cold winter nights | Haridwar, Roorkee, Paonta Sahib |
| Roorkee (`roorkee`) | Uttarakhand | Institute campuses, SIDCUL Bhagwanpur, highway warehouses, cantonment and bazaars | Laboratories, chemical and paper stores, food, logistics | Hot dry summer, damp monsoon, foggy winter | Haridwar, Dehradun, Meerut |
| Rudrapur-Pantnagar (`rudrapur-pantnagar`, Udham Singh Nagar) | Uttarakhand | SIDCUL Pantnagar estate, Rudrapur industrial areas, agricultural university, grain market, mills and dairies | Electrical and component stores, dairy and grain, laboratories, contract logistics | Hot humid summer, heavy monsoon, dense winter fog | Kashipur, Bareilly, Moradabad |
| Kashipur (`kashipur`) | Uttarakhand | SIDCUL Kashipur, industrial estate, sugar and rice mills, grain market | Pharma, sugar and rice, paper and chemical stores, logistics | Hot humid summer, heavy monsoon, dense winter fog | Moradabad, Rudrapur-Pantnagar, Bareilly |
| Kotdwar (`kotdwar`) | Uttarakhand | Wholesale bazaar and hill-bound godowns, railway terminus, small industrial estate, hospital | Medicine and food wholesale, hospitals, hill-road logistics | Hot humid foothills, very heavy monsoon, cold winter nights | Haridwar, Dehradun, Roorkee |
| Silvassa (`silvassa`, Dadra and Nagar Haveli) | Dadra and Nagar Haveli and Daman and Diu | Naroli, Amli, Kharadpada and Masat estates, town centre and civil hospital | Pharma, plastics and chemical stores, textile and yarn, border-road logistics | Hot humid valley, very heavy monsoon | Daman, Vapi, Vasai-Palghar |
| Daman (`daman`) | Dadra and Nagar Haveli and Daman and Diu | Kachigam, Bhimpore and Somnath estates, fishing jetties, beach hotels | Bottling and distillery stores, pharma, plastics and packaging, hotel kitchens | Hot salty humid coast, heavy monsoon | Vapi, Silvassa |
| Diu (`diu`) | Dadra and Nagar Haveli and Daman and Diu | Fishing harbour and ice plants, beach hotels, old town, Bucharwada estate | Fish and ice cold chain, hotel kitchens, small hospital stores | Hot salty humid island, monsoon and cyclones | Daman, Silvassa |
| Bhubaneswar (`bhubaneswar`) | Odisha | Mancheswar, Rasulgarh and Chandaka estates, hospital and campus belt, IT parks and hotels | Hospitals, server rooms, food and hotels, laboratories | Hot very humid coast, heavy monsoon, cyclones | Cuttack, Paradip |
| Cuttack (`cuttack`) | Odisha | Choudwar and Jagatpur estates, Badambadi and Chandni Chowk markets, medical college and old city | Hospitals, wholesale food, steel and alloy stores, logistics | Hot humid delta, monsoon floods, cyclones | Bhubaneswar, Paradip |
| Rourkela (`rourkela`) | Odisha | Steel works stores, Kalunga estate, town sectors and markets, institute and works hospital | Chemical and electrical stores, hospitals, laboratories | Scorching summer, heavy monsoon, cold winter nights | Jharsuguda, Bhubaneswar |
| Paradip (`paradip`) | Odisha | Dock complex and port warehouses, refinery and chemical works, fertiliser sheds, fishing harbour and township | Chemical and fertiliser stores, port logistics, fish cold chain, laboratories | Hot salty humid coast, heavy monsoon, cyclones | Cuttack, Bhubaneswar |
| Jharsuguda (`jharsuguda`) | Odisha | Smelter and power-plant stores, sponge-iron firms, Belpahar and Brajrajnagar, junction and hospitals | Chemical and electrical stores, hospitals, rail logistics | Scorching plateau summer, heavy monsoon, cold winter nights | Rourkela, Bhubaneswar |
| Ranchi (`ranchi`) | Jharkhand | Dhurwa heavy engineering belt, Namkum and Tatisilwai industrial areas, hospital district, Main Road and Lalpur markets | Hospitals, pharma stockists, food, laboratories | Milder plateau summer, heavy monsoon, cold winter nights | Jamshedpur, Bokaro |
| Jamshedpur (`jamshedpur`) | Jharkhand | Adityapur industrial area, steel and vehicle works stores, Bistupur and Sakchi, hospital and campus belt | Electrical and electronic stores, foundry chemicals, hospitals, logistics | Hot dusty summer, heavy monsoon, cool winter | Ranchi, Bokaro, Kharagpur |
| Dhanbad (`dhanbad`) | Jharkhand | Jharia coalfield stores, Bank More and Hirapur markets, institute and medical college, railway junction | Electrical stores, hospitals, food wholesale, logistics | Hot coal-dusty summer, heavy monsoon, cold mornings | Bokaro, Asansol, Durgapur |
| Bokaro (`bokaro`) | Jharkhand | Steel works stores, industrial area and ancillary firms, sector markets and hospitals, Chas lanes | Chemical and electrical stores, hospitals, food wholesale | Hot dusty summer, heavy monsoon, cold winter | Dhanbad, Ranchi, Jamshedpur |
| Raipur (`raipur`) | Chhattisgarh | Siltara, Urla and Bhanpuri industrial areas, Pandri wholesale markets, medical institute and hospital district | Rice and food stores, steel and sponge-iron chemicals, hospitals, logistics | Very hot dusty summer, heavy monsoon, cool winter nights | Bhilai, Bilaspur |
| Bhilai (`bhilai`) | Chhattisgarh | Steel works stores, Bhilai Industrial Estate, Borai industrial area, sector markets, Durg and the hospital | Chemical and electrical stores, hospitals, food wholesale | Very hot dusty summer, heavy monsoon, cool winter | Raipur, Bilaspur |
| Bilaspur (`bilaspur`) | Chhattisgarh | Railway zone offices and junction, Sirgitti industrial area, coalfield offices, medical institute and university | Hospitals, rice and food, server and record rooms, rail logistics | Fiercely hot summer, heavy monsoon, cool winter | Korba, Raipur |
| Korba (`korba`) | Chhattisgarh | Coal mines and mine-side stores, power-station stores, Balco Nagar smelter belt, Korba and Katghora markets | Electrical stores, chemicals, hospitals, laboratories | Fierce coal-dusty summer, heavy monsoon, cool mornings | Bilaspur, Raipur |
| Patna (`patna`) | Bihar | Bihta, Fatuha and Patliputra industrial areas, hospital and medical-college belt, Mithapur market, wholesale lanes | Hospitals, medicine distribution, vaccine cold chain, food | Hot humid summer, Ganga floods in the monsoon, foggy cold winter | Hajipur, Muzaffarpur, Gaya |
| Hajipur (`hajipur`) | Bihar | Banana yards and ripening rooms, Hajipur industrial area, railway zone offices and goods sheds, pharmaceutical institute | Fruit ripening and food, laboratories, railway electrical stores, logistics | Hot humid river plain, floods, winter fog | Patna, Muzaffarpur |
| Muzaffarpur (`muzaffarpur`) | Bihar | Litchi orchards and cold rooms, Bela industrial area, old trading lanes, medical college and hospitals | Fruit and food processing, reefer logistics, hospitals, vaccine cold chain | Hot humid summer, monsoon floods, foggy winter | Hajipur, Patna |
| Gaya (`gaya`) | Bihar | Vishnupad and old city lanes, Bodh Gaya hotels and monasteries, industrial area and godowns, medical college hospital | Hotel and sweet-shop kitchens, hospitals, medicine stockists, logistics | Scorching dry summer, heavy monsoon, cold winter nights | Patna, Bhagalpur |
| Bhagalpur (`bhagalpur`) | Bihar | Nathnagar and Champanagar weaving lanes, silk shops and godowns, mango and rice markets, medical college and university | Silk and textile stores, mango and rice cold chain, hospitals, laboratories | Hot very humid plain, monsoon floods, cool foggy winter | Gaya, Patna, Muzaffarpur |
| Guwahati (`guwahati`) | Assam | Amingaon and Jalukbari freight yards, Noonmati refinery side, Changsari medical institute and dry port, Fancy Bazar and Paltan Bazar | Medicine distribution, hospitals, tea and food, regional logistics | Very heavy monsoon, humid year round, floods | Tezpur, Shillong, Dibrugarh |
| Dibrugarh (`dibrugarh`) | Assam | Tea estates and garden factories, river and station warehouses, medical college and university, oilfield supply stores | Tea storage, hospitals, electrical stores, logistics | Very heavy rain, humid year round, river floods | Tezpur, Guwahati |
| Silchar (`silchar`) | Assam | Rangirkhari and Tarapur lanes, hill-road transport yards, university and medical college, tea and paper-industry stores | Medicine distribution, hospitals, food wholesale, hill-road logistics | Very heavy monsoon, humid valley, floods | Guwahati, Imphal |
| Tezpur (`tezpur`) | Assam | Tea estates and garden factories, university campus, medical college hospital, town market | Tea and fish, laboratories, hospitals, logistics | Heavy rain, humid year round, river floods | Guwahati, Dibrugarh |
| Imphal (`imphal`) | Manipur | Ima Keithel and central markets, Takyelpat industrial estate, regional medical institute and hospital belt, handloom lanes | Handloom stores, medicine distribution, hospitals, food and fish | Warm humid valley, heavy monsoon, cool dry winter | Silchar, Guwahati |
| Shillong (`shillong`) | Meghalaya | Police Bazar hotel streets, Laitumkhrah and Mawlai, medical institute and university, Byrnihat industrial belt | Hotel kitchens, hospitals, laboratories, cement and ferro-alloy stores | Cool, extremely rainy, misty winter | Guwahati, Silchar |
| Agartala (`agartala`) | Tripura | Central markets, Bodhjungnagar estate, medical college and university, border-trade warehouses | Food and fish cold chain, medicine distribution, hospitals, border logistics | Hot humid plain, heavy monsoon, long supply line | Silchar, Guwahati |
| Gangtok (`gangtok`) | Sikkim | MG Marg hotel streets, Lal Bazaar and Deorali, hospital and medical-institute belt, Tadong industrial area | Hotel and bakery kitchens, hospitals, medicine distribution, mountain-road logistics | Cool, wet ridge, landslides, cold winters | Rangpo, Siliguri |
| Rangpo (`rangpo`) | Sikkim | Rangpo industrial estate, Majhitar and the university campus, checkpost and truck halt, bazaar and clinics | Pharma plants, bottling and packaging, laboratories, border-gateway logistics | Warm damp river valley, very heavy monsoon, slides | Gangtok, Siliguri |
| Jammu (`jammu`) | Jammu and Kashmir | Bari Brahmana, Gangyal and Digiana industrial areas, Narwal market, hospitals and the pilgrim route | Pharma and medicine distribution, vaccine cold chain, food and dry fruit, logistics | Fiercely hot summer, humid monsoon, cold foggy winter | Samba, Kathua, Srinagar |
| Srinagar (`srinagar`) | Jammu and Kashmir | Parimpora fruit market, Rangreth and Lassipora estates, saffron and handicraft rooms, medical-institute belt | Apple and dry-fruit cold storage, hospitals, vaccine cold chain, logistics | Snowy cold winter, damp spring, mild summer | Jammu, Samba |
| Samba (`samba`) | Jammu and Kashmir | Samba industrial complex, Vijaypur medical campus, highway warehouses, grain yards | Pharma, hospitals, plastics and packaging, contract logistics | Scorching summer, humid monsoon, foggy winter | Jammu, Kathua |
| Kathua (`kathua`) | Jammu and Kashmir | Lakhanpur truck terminals, industrial estates toward Hiranagar, grain and fruit market, medical college | Highway logistics, grain and fruit, hospitals, medicine stockists | Very hot summer, flooded streams in the monsoon, foggy winter | Samba, Jammu, Amritsar |
| Puducherry (`puducherry`; the Union Territory hub is `puducherry-state`) | Puducherry | Mettupalayam, Thirubuvanai, Sedarapet and Thattanchavady estates, White Town and promenade hotels, medical institute and university | Pharma and electronics stores, hotel and brewery kitchens, hospitals | Hot salty humid coast, north-east monsoon, cyclones | Chennai, Vellore |
| Karaikal (`karaikal`, a separate delta enclave surrounded by Tamil Nadu, not near Puducherry city) | Puducherry | Rice mills and paddy godowns, fishing harbour and ice plants, port-side sheds, medical campus and market | Rice and seafood cold chain, port logistics, hospitals, laboratories | Hot very humid delta, heavy monsoon, cyclones | Tiruchirappalli, Nagapattinam |
| Riyadh (`riyadh`) | Saudi Arabia | Industrial and logistics zones | Pharma distribution, hospitals, food warehousing | Extreme dry heat | Dammam, Jeddah, Bahrain |
| Al Kharj (`al-kharj`, under the Riyadh Region hub) | Saudi Arabia | Dairy farms and milk depots, produce packing houses, poultry and food plants, university and hospital stores | Dairy and produce cold chain, laboratories, hospitals, refrigerated transport | Extreme dry heat, dust storms, cool winter nights | Riyadh, Dammam |
| Diriyah (`diriyah`, under the Riyadh Region hub) | Saudi Arabia | Visitor restaurants and hotel kitchens, museum and archive stores, event caterers, palm farms in the wadi | Hospitality kitchens, heritage archive rooms, catering logistics | Extreme dry heat, cool winter evenings, occasional heavy rain | Riyadh, Al Kharj |
| Al Majmaah (`al-majmaah`, under the Riyadh Region hub) | Saudi Arabia | Date farms and packing stores, dairy and poultry farms, university campus and hospitals, Sudair industrial area | Date and farm cold storage, laboratories, hospitals | Scorching summer, dust storms, sudden winter rain | Riyadh, Al Kharj |
| Riyadh Dry Port (`riyadh-dry-port`, area of Riyadh) | Saudi Arabia | Container yard and rail sidings, clearance area, transit sheds, truck terminal | Imported food and medicine cargo, contract logistics | Extreme dry heat | Riyadh 1st Industrial City |
| Riyadh 1st Industrial City (`riyadh-1st-industrial-city`, area of Riyadh) | Saudi Arabia | Factory halls, packing halls and warehouses, food cold stores, loading bays | Food and drink, plastics and packaging, contract warehousing | Extreme dry heat | Riyadh Dry Port |
| Makkah (`makkah`, under the Makkah Region hub) | Saudi Arabia | Hotel and catering kitchens, hospital and pharmacy stores, wholesale food depots, distribution yards on the approach roads | Hospitality kitchens, hospitals, medicine supply, road logistics | Extreme valley heat, occasional humid spells and downpours | Jeddah, Taif |
| Taif (`taif`, under the Makkah Region hub) | Saudi Arabia | Rose farms and distilleries, fruit packing houses, hotels and summer resorts, hospitals and the industrial area | Fruit and rose-product cold storage, hospitality, hospitals, laboratories | Mild summer, cold winter nights, brief thunderstorms | Makkah, Jeddah |
| Rabigh (`rabigh`, under the Makkah Region hub) | Saudi Arabia | Refinery and petrochemical stores, contractor camps and clinics, port warehouses, date farms and fishing landings | Chemical stores, canteen and fish cold chain, clinics, port logistics | Hot, humid, salty, dusty | King Abdullah Economic City, Jeddah |
| King Abdullah Economic City (`king-abdullah-economic-city`, under the Makkah Region hub) | Saudi Arabia | King Abdullah Port yards, Industrial Valley plots, hotels and residential districts, schools and clinics | Port and contract logistics, imported food, clinics, plant consumables | Hot, humid coast with salty damp air | Rabigh, Jeddah |
| Jeddah Islamic Port (`jeddah-islamic-port`, area of Jeddah) | Saudi Arabia | Container terminals and yards, cold stores and reefer points, transit sheds, truck gates | Imported food and medicine cargo, contract logistics | Hot, humid, salty | Jeddah 1st Industrial City |
| Jeddah 1st Industrial City (`jeddah-1st-industrial-city`, area of Jeddah) | Saudi Arabia | Factory halls and raw-material stores, packing halls and warehouses, food cold rooms, loading bays | Food and drink, plastics and chemicals, contract warehousing | Hot, humid, condensation on cold-room doors | Jeddah Islamic Port |
| Al Khobar (`al-khobar`, under the Eastern Province hub) | Saudi Arabia | Corniche hotels and restaurants, hospitals and clinics, malls and retail distribution, university campus and business district | Hospitality kitchens, hospitals, pharmacy, retail cold chain | Hot and humid Gulf shore | Dammam, Dhahran |
| Jubail (`jubail`, under the Eastern Province hub) | Saudi Arabia | Plant zones of the industrial city, commercial and industrial ports, contractor camps and clinics, Jubail town | Chemical stores, contract warehousing, camp catering, laboratories | Hot, humid, salty, dusty | Ras Al Khair, Dammam |
| Al Ahsa (`al-ahsa`, Hofuf; under the Eastern Province hub) | Saudi Arabia | Date farms and packing houses, rice mills, university and hospitals, industrial city and markets | Date and rice storage, hospitals, laboratories, logistics | Fierce dry summer, mild winter, dust storms | Dammam, Dhahran |
| Dhahran (`dhahran`, under the Eastern Province hub) | Saudi Arabia | University and research laboratories, techno valley and offices, cultural centre archives, compound clinics and hotels | Laboratories, server rooms, hospitality, clinics | Hot, humid, air conditioning under load | Al Khobar, Dammam |
| Qatif (`qatif`, under the Eastern Province hub) | Saudi Arabia | Palm farms and produce stores, fishing landings and ice rooms, old-town markets and bakeries, hospitals | Fish and produce cold chain, bakeries, hospitals, pharmacy | Hot, humid, salty oasis | Dammam, Jubail |
| Ras Al Khair (`ras-al-khair`, under the Eastern Province hub) | Saudi Arabia | Smelter and rolling-mill stores, phosphate and fertiliser stores, port and rail terminal yards, camps and clinics | Chemical stores, terminal logistics, camp catering, laboratories | Hot, humid, dusty, salty | Jubail, Dammam |
| King Abdulaziz Port Dammam (`king-abdulaziz-port-dammam`, area of Dammam) | Saudi Arabia | Container terminals, cold stores and powered container points, transit sheds, rail sidings and truck gates | Imported food and medicine cargo, contract logistics | Hot, humid, salty | Dammam 1st Industrial City |
| Dammam 1st Industrial City (`dammam-1st-industrial-city`, area of Dammam) | Saudi Arabia | Food and drink stores, fabrication yards and suppliers, chemical and packaging stores, warehouses | Food and drink, chemical consumables, contract warehousing | Hot, humid, condensation on cold-room doors | King Abdulaziz Port Dammam |
| Jubail Industrial City 1 (`jubail-industrial-city-1`, area of Jubail) | Saudi Arabia | Plant chemical and drum stores, spares warehouses, laboratories, service buildings | Chemical stores, laboratories, contract warehousing | Hot, humid, salty, dusty | Jubail Industrial City 2 |
| Jubail Industrial City 2 (`jubail-industrial-city-2`, area of Jubail) | Saudi Arabia | Downstream plant stores, logistics yards and warehouses, camp kitchens, clinics | Chemical stores, camp catering, contract warehousing | Hot, humid, salty, dusty | Jubail Industrial City 1 |
| Madinah (`madinah`, under the Madinah Region hub) | Saudi Arabia | Hotel and catering kitchens, hospital and pharmacy stores, date farms and packing houses, wholesale depots and industrial area | Hospitality kitchens, hospitals, medicine supply, date storage | Extreme dry heat, warm summer nights, occasional winter rain | Yanbu, Makkah, Jeddah |
| Yanbu (`yanbu`, under the Madinah Region hub) | Saudi Arabia | Old waterfront and fishing landings, resort and dive-centre kitchens, hospitals and supermarkets, port warehouses | Fish and hotel cold chain, clinics, port logistics, plant consumables | Hot, humid, salty coast | Madinah, Rabigh, Jeddah |
| Buraidah (`buraidah`, under the Qassim Region hub) | Saudi Arabia | Date market and packing houses, wheat, fodder and vegetable farms, industrial city, university and hospitals | Date and farm cold storage, laboratories, hospitals, logistics | Severe summer heat, frosty winter nights, dust storms | Unaizah, Riyadh, Al Majmaah |
| Unaizah (`unaizah`, under the Qassim Region hub) | Saudi Arabia | Date orchards and cool stores, covered market, hospitals and college campus, small factories | Date storage, pharmacy, clinics, laboratories | Scorching summer, cold clear winter nights, spring dust | Buraidah, Riyadh |
| Yanbu Industrial City (`yanbu-industrial-city`, area of Yanbu) | Saudi Arabia | Plant chemical and drum stores, spares warehouses and contractor yards, laboratories, camp kitchens and clinics | Chemical stores, laboratories, contract warehousing, camp catering | Hot, humid, salty, dusty | none |
| Abha (`abha`, under the Asir Region hub) | Saudi Arabia | Hotels, chalets and restaurants, central hospital and pharmacies, university, fruit gardens and produce markets | Hospitality kitchens, hospitals, laboratories, produce | Mild misty summer, cold winter nights, damp air | Khamis Mushait, Bisha |
| Khamis Mushait (`khamis-mushait`, under the Asir Region hub) | Saudi Arabia | Wholesale markets and food depots, hospitals and pharmacies, university campuses, industrial area | Poultry and dairy cold chain, medicine supply, hospitals, depots | Mild summer, cold winter, damp rainy months | Abha, Bisha |
| Bisha (`bisha`, under the Asir Region hub) | Saudi Arabia | Date and vegetable farms behind the dam, university campus, hospitals and clinics, road depots | Date and farm cold storage, hospitals, laboratories, road logistics | Hot summer, mild winter, dust and wadi floods | Abha, Khamis Mushait |
| Jazan (`jazan`, under the Jazan Region hub) | Saudi Arabia | Fish landings and ice rooms, mango and banana packing houses, seaport warehouses, hospital, university and markets | Fish and fruit cold chain, port logistics, hospitals, pharmacy | Extreme heat and humidity, salty air | Abha, Najran |
| Najran (`najran`, under the Najran Region hub; the hub stays noindex with one city) | Saudi Arabia | Date and fruit farms, city markets and depots, university and hospitals, industrial city | Date and fruit storage, wholesale food, hospitals, laboratories | Hot dry summer, mild winter, flash floods | Bisha, Jazan |
| Al Baha (`al-baha`, under the Al Baha Region hub; the hub stays noindex with one city) | Saudi Arabia | Honey and fruit terraces, hotels and chalets, central hospital and pharmacies, university and wholesale shops | Honey and fruit storage, hospitality, hospitals, laboratories | Mild misty summer, cold winter, damp | Abha, Khamis Mushait |
| Tabuk (`tabuk`, under the Tabuk Region hub; the hub stays noindex with one city) | Saudi Arabia | Irrigated farms and packing houses, wholesale food depots, regional hospital, clinics and university, industrial city | Farm cold storage, food depots, hospitals, laboratories | Hot dry summer, frosty winter, snow on the mountains | Hail, Sakaka |
| Hail (`hail`, under the Hail Region hub; the hub stays noindex with one city) | Saudi Arabia | Wheat, date and vegetable farms, dairies and mills, university and hospital, industrial city and wholesale markets | Dairy and grain storage, medicine supply, hospitals, logistics | Severe summer heat, frost, spring dust | Buraidah, Tabuk |
| Sakaka (`sakaka`, under the Al Jawf Region hub; the hub stays noindex with one city) | Saudi Arabia | Olive groves, presses and oil stores, date packers, university and hospital, industrial city and markets | Olive-oil and date storage, hospitals, laboratories, logistics | Scorching summer, frosty winter nights, dust | Hail, Tabuk |
| Arar (`arar`, under the Northern Borders Region hub; the hub stays noindex with one city) | Saudi Arabia | Wholesale food and medicine depots, regional hospital, clinics and pharmacies, university, livestock and farm stores | Food and medicine supply, hospitals, laboratories, long-haul logistics | Hot dry summer, frosty winter, dust and sudden rain | Sakaka, Hail |
| Aden (`aden`, under the Aden Governorate hub) | Yemen | Crater and the old harbour districts, Ma'alla and Tawahi waterfront, Khormaksar and Sheikh Othman, fish landings | Fish and food stores, hospitals, pharmacy, port-area warehousing | Hot, humid, salty coast | Zinjibar, Lahij |
| Port of Aden (`port-of-aden`, area of Aden) | Yemen | Quayside yards, transit sheds, cold rooms, truck gates (described generally, no operating status) | Port-area logistics, imported food, medicines | Hot, humid, salty | Aden Free Zone |
| Aden Free Zone (`aden-free-zone`, area of Aden) | Yemen | Storage halls, packing halls, cold rooms, yards (described generally, no operating status) | Contract storage, food, healthcare goods | Hot, humid, salty | Port of Aden |
| Sheikh Othman Industrial Area (`sheikh-othman-industrial-area`, area of Aden) | Yemen | Food preparation rooms, workshop stores, packaging units, roadside warehouses | Food makers, workshop consumables, depots | Hot, humid | Little Aden |
| Little Aden (`little-aden`, area of Aden) | Yemen | Buraiqa town, fishing landings and ice stores, stores near the oil-industry area, beachside cafes | Fish and food, plant consumables, small warehousing | Hot, humid, salty | Sheikh Othman Industrial Area |
| Mukalla (`mukalla`, under the Hadramaut Governorate hub) | Yemen | Fish landings, ice stores and drying yards, old town markets, hospitals and university, harbour warehouses | Fish and food cold chain, hospitals, pharmacy | Hot, humid, salty coast | Seiyun, Shibam |
| Seiyun (`seiyun`, under the Hadramaut Governorate hub) | Yemen | Palm groves and date stores, honey dealers and central market, palace museum and heritage rooms, clinics and college | Date and honey storage, heritage rooms, hospitals | Very hot dry days, cooler nights, flash floods | Shibam, Mukalla |
| Shibam (`shibam`, under the Hadramaut Governorate hub) | Yemen | Tower houses and family stores, guesthouses, conservation and archive rooms, palm gardens | Heritage rooms, guesthouse kitchens, date stores | Very dry and hot, flash floods | Seiyun, Mukalla |
| Zinjibar (`zinjibar`, under the Abyan Governorate hub; the hub stays noindex with one city) | Yemen | Delta farms and produce stores, fishing beaches and ice stores, town market, clinics | Produce and fish cold chain, pharmacy, clinics | Hot, humid, dusty, flood-prone | Aden, Lahij |
| Port of Mukalla (`port-of-mukalla`, area of Mukalla) | Yemen | Fish landing beaches and ice rooms, drying yards, quayside sheds, vehicles waiting at the gate (described generally, no operating status) | Fish cold chain, port-area logistics, medicines | Hot, humid, salty | none |
| Sana'a (`sanaa`, city, Amanat Al Asimah) | Yemen | Old City markets, hospitals and university, pharmacy wholesalers, bakeries and dairies | Medicines, food and coffee, laboratories | Mild, dry highland; cold nights, short summer rains | Amran, Dhamar (not yet built) |
| Sana'a Industrial Area (`sanaa-industrial-area`, area of Sana'a) | Yemen | Food and dairy units, packaging and chemical stores, warehouses, workshops (described generally) | Food, logistics, chemicals | Highland swings between cold nights and sunny afternoons | Sana'a International Airport |
| Sana'a International Airport (`sanaa-international-airport`, area of Sana'a) | Yemen | Cargo sheds, medicine cold rooms, catering stores, vehicles (described generally, no flight or cargo status) | Pharmaceutical cold chain, freight, food | Highland swings | Sana'a Industrial Area |
| Taiz (`taiz`, city, Taiz Governorate) | Yemen | Hillside wholesale stores, hospitals and universities, food plants, pharmacies | Medicines, food, laboratories | Cool, misty highland with summer rain | Ibb, Mocha, Dhamar |
| Mocha (`mocha`, city, Taiz Governorate) | Yemen | Fishing ice stores, shops, old coffee-trade buildings, clinic refrigerators | Fish and food, medicines, logistics | Hot, humid, salty Red Sea coast | Taiz, Hodeidah |
| Port of Mocha (`port-of-mocha`, area of Mocha) | Yemen | Landing beaches and ice boxes, old waterside warehouses, sheds, vehicles (described generally, no operating status) | Fish, dry goods, medicines | Hot, damp, salty | none |
| Hodeidah (`hodeidah`, city, Al Hudaydah Governorate) | Yemen | Fish market and ice stores, wholesale food sheds, hospitals and pharmacies, shops | Food, medicines, logistics | Very hot, humid Tihama coast | Zabid, Bajil, Mocha |
| Zabid (`zabid`, city, Al Hudaydah Governorate) | Yemen | Old mosques and manuscript rooms, market stores, palm-plot sheds, clinic | Heritage and laboratories, food, medicines | Hot, moist Tihama plain | Hodeidah, Bajil |
| Bajil (`bajil`, city, Al Hudaydah Governorate) | Yemen | Produce yards, cold boxes, roadside stores, clinic | Produce, logistics, medicines | Hot, moist lowland | Hodeidah, Zabid |
| Port of Hodeidah (`port-of-hodeidah`, area of Hodeidah) | Yemen | Quayside sheds, cold rooms, warehouses, waiting lorries (described generally, no operating status) | Logistics, food, medicines | Hot, damp sea air | Port of Salif |
| Port of Salif (`port-of-salif`, area of Hodeidah) | Yemen | Bagged bulk-goods sheds, small warehouses, food stores, vehicles (described generally, no operating status) | Logistics, chemicals, food | Hot, salty, exposed coast | Port of Hodeidah |
| Ibb (`ibb`, city, Ibb Governorate) | Yemen | Terrace-farm produce stores, wholesale stores, hospitals and university, dairies | Food, medicines, laboratories | Cool, misty, wet highland | Taiz, Dhamar |
| Dhamar (`dhamar`, city, Dhamar Governorate) | Yemen | Farm produce stores, markets, university laboratories, hospitals and pharmacies | Food, laboratories, medicines | High, dry plateau with cold nights | Sana'a, Ibb |
| Marib (`marib`, city, Marib Governorate) | Yemen | Dam-fed farms and date stores, wholesale food stores, hospitals and clinics, equipment yards | Food, medicines, logistics | Very hot, dry desert edge; dust | Sana'a, Al Jawf (not yet built) |
| Lahij (`lahij`, city, Lahij Governorate) | Yemen | Delta produce sheds, wholesale yards, dairy and food shops, clinics | Food, medicines, logistics | Hot delta plain, flood and dust | Aden, Zinjibar |
| Sa'dah (`sadah`, city, Sa'dah Governorate) | Yemen | Walled-town market, terrace fruit and grain stores, hospitals, pharmacy wholesalers | Food, medicines, logistics | Cold, dry mountain climate | Amran (not yet built), Sana'a |
| Abu Dhabi (`abu-dhabi`, city, Abu Dhabi Emirate) | UAE | Hospitals and laboratories, hotel kitchens, food importers, mainland industrial districts | Medicines, food, logistics | Very hot, humid Gulf coast in summer | Dubai, Al Ain, Ruwais (not yet built) |
| Mussafah (`mussafah`, area of Abu Dhabi) | UAE | Light factories, general warehouses, chemical and paint stores, workshops | Logistics, food, chemicals | Extreme summer heat under metal roofs | ICAD |
| ICAD (`icad`, area of Abu Dhabi) | UAE | Factory finished-goods stores, raw-material stores, distribution sheds, loading yards | Food, chemicals, electronics | Extreme summer heat | Mussafah |
| KIZAD (`kizad`, area of Abu Dhabi) | UAE | Large factory halls, chemical and materials stores, cold stores, loading bays (described generally) | Logistics, chemicals, food | Hot, humid coast | Khalifa Port |
| Khalifa Port (`khalifa-port`, area of Abu Dhabi) | UAE | Reefer containers and cold stores, container stacks, logistics sheds, trailers (described generally, no operating status) | Logistics, food, medicines | Hot, damp, salty | KIZAD |
| Ghantoot (`ghantoot`, area of Abu Dhabi) | UAE | Port-side and industrial stores, resort kitchens, roadside shops, vehicles | Food, logistics, chemicals | Hot, salty coast | Khalifa Port |
| Al Ain (`al-ain`, city, Abu Dhabi Emirate) | UAE | Hospitals and university laboratories, date plantations and stores, hotel kitchens, edge-of-town workshops | Medicines, laboratories, food | Hot, dry desert; dust | Abu Dhabi, Dubai, Liwa |
| Al Ain Industrial Area (`al-ain-industrial-area`, area of Al Ain) | UAE | Workshops and spare-parts stores, warehouses, food distribution rooms, vehicle yards | Logistics, food, electronics | Dry desert heat, dust | none |
| Ruwais (`ruwais`, city, Abu Dhabi Emirate) | UAE | Industrial laboratories, chemical and spare-parts warehouses, canteens, clinics | Chemicals, laboratories, food | Extreme heat, humid salty coast | Abu Dhabi, Madinat Zayed |
| Ruwais Industrial Complex (`ruwais-industrial-complex`, area of Ruwais) | UAE | Laboratory sample stores, chemical and lubricant stores, parts warehouses, canteens (described generally, no operating status) | Chemicals, laboratories, logistics | Hot, humid, salty | none |
| Madinat Zayed (`madinat-zayed`, city, Abu Dhabi Emirate) | UAE | Date farms and sheds, supermarkets, hospital and clinics, feed stores | Food, medicines, logistics | Very hot, dry desert; sandstorms | Liwa, Ruwais, Abu Dhabi |
| Liwa (`liwa`, city, Abu Dhabi Emirate) | UAE | Date plantations, desert resorts, village shops, hospital and clinics | Food, medicines, logistics | Extreme desert heat, cold winter nights | Madinat Zayed, Al Ain |
| Dubai (`dubai`, city, Dubai Emirate) | UAE | Port and free-zone warehouses, inland industrial districts, hotel and restaurant kitchens, hospitals and pharmacies | Logistics, food, medicines | Long, hot, humid summers; fog and dust | Abu Dhabi (Sharjah, Ajman not yet built) |
| Jebel Ali (`jebel-ali`, area of Dubai) | UAE | Bonded and free-zone warehouses, cold stores, container stacks, factory stores (described generally, no operating status) | Logistics, food, medicines | Hot, damp, salty | Dubai Investments Park |
| Dubai Investments Park (`dubai-investments-park`, area of Dubai) | UAE | Factory halls, warehouses, clinics, kitchens | Logistics, food, medicines | Long hot summers | Jebel Ali |
| Al Quoz Industrial Area (`al-quoz-industrial-area`, area of Dubai) | UAE | Food supplier units, chemical and paint stores, workshops, warehouses | Food, chemicals, logistics | Dry heat under metal roofs | Ras Al Khor Industrial Area |
| Ras Al Khor Industrial Area (`ras-al-khor-industrial-area`, area of Dubai) | UAE | Spare-parts and electronics stock rooms, light-industry workshops, warehouses | Electronics, chemicals, logistics | Hot, damp near the creek | Al Quoz Industrial Area |
| Al Qusais Industrial Area (`al-qusais-industrial-area`, area of Dubai) | UAE | Food-making and packaging units, warehouses, workshops | Food, chemicals, logistics | Long hot summers | Al Aweer |
| Al Aweer (`al-aweer`, area of Dubai) | UAE | Produce cold rooms, market halls, wholesale stores, industrial yards | Food, logistics, chemicals | Hot summers, early-morning loading | Al Qusais Industrial Area |
| Dubai Silicon Oasis (`dubai-silicon-oasis`, area of Dubai) | UAE | Electronics stock rooms, server and network rooms, laboratories, canteens | Electronics, data centers, laboratories | Hot summers, damp nights | Dubai Industrial City |
| Dubai Industrial City (`dubai-industrial-city`, area of Dubai) | UAE | Factory halls, raw-material stores, finished-goods sheds, chilled halls | Logistics, chemicals, food | Long hot summers | Dubai South |
| Dubai South (`dubai-south`, area of Dubai) | UAE | Warehouses, cold rooms, kitchens and shops, clinics (described generally, no airport status) | Logistics, food, medicines | Long hot summers | Dubai Logistics City |
| Dubai Logistics City (`dubai-logistics-city`, area of Dubai) | UAE | Racked warehouses, cold stores, cross-dock bays, trailer yards (described generally) | Logistics, food, medicines | Hot, dry with humid spells | Dubai South |
| Dubai Airport Freezone (`dubai-airport-freezone`, area of Dubai) | UAE | Light warehouse units, electronics stock rooms, healthcare stores, office pantries (described generally, no operating status) | Electronics, medicines, logistics | Hot summers | Al Qusais Industrial Area |
| Dubai Healthcare City (`dubai-healthcare-city`, area of Dubai) | UAE | Clinic vaccine refrigerators, laboratories, pharmacies and supply stores, hospital pantries | Hospitals, laboratories, medicines | Hot summers | Ras Al Khor Industrial Area |
| Sharjah (`sharjah`, city, Sharjah Emirate) | UAE | Souks and food-trading markets, hospitals and universities, industrial and free-zone districts, hotel stores | Food, medicines, logistics | Long hot, humid summers; fog | Dubai, Ajman, Umm Al Quwain (not yet built) |
| Khor Fakkan (`khor-fakkan`, city, Sharjah Emirate) | UAE | Fish ice stores, supermarkets and hotel kitchens, warehouses beside the bay, clinics | Food, medicines, logistics | Hot, very humid Gulf of Oman coast | Kalba, Fujairah (not yet built) |
| Kalba (`kalba`, city, Sharjah Emirate) | UAE | Fish ice boxes, farm produce stores, village shops, clinics | Food, medicines, logistics | Hot, humid coast beside a mangrove inlet | Khor Fakkan, Fujairah (not yet built) |
| Sajaa Industrial Area (`sajaa-industrial-area`, area of Sharjah) | UAE | Factory finished-goods stores, chemical and coatings stores, packaging units, open yards | Chemicals, logistics, food | Extreme summer heat | Muwaileh |
| SAIF Zone (`saif-zone`, area of Sharjah) | UAE | Low warehouse units, parts and cosmetics stock rooms, medical product stores (described generally, no operating status) | Electronics, medicines, logistics | Hot summers | Muwaileh |
| Hamriyah Free Zone (`hamriyah-free-zone`, area of Sharjah) | UAE | Chemical and coatings stores, metal yards, warehouses, canteens (described generally) | Chemicals, logistics, food | Hot, humid, salty coast | Sajaa Industrial Area |
| Muwaileh (`muwaileh`, area of Sharjah) | UAE | Shops and supermarkets, restaurants, clinics and pharmacies, workshop storerooms | Food, medicines, logistics | Hot summers | Sajaa Industrial Area |
| Ajman (`ajman`, city, Ajman Emirate) | UAE | Fish ice stores, dhow yards and waterfront workshops, clinics and universities, markets and kitchens | Food, medicines, logistics | Hot, humid creek coast | Sharjah, Dubai, Umm Al Quwain |
| Al Jurf Industrial Area (`al-jurf-industrial-area`, area of Ajman) | UAE | Light factories, paint and sealant stores, food-distribution rooms, warehouses | Chemicals, logistics, food | Humid summers, metal roofs | Ajman Free Zone |
| Ajman Free Zone (`ajman-free-zone`, area of Ajman) | UAE | Warehouse units, electronics and household-goods rooms, food and packaging rooms (described generally, no operating status) | Electronics, food, logistics | Hot, humid, salty | Al Jurf Industrial Area |
| Umm Al Quwain (`umm-al-quwain`, city, Umm Al Quwain Emirate) | UAE | Fish ice stores, small-farm produce sheds, shops, clinics | Food, medicines, logistics | Hot, humid lagoon coast | Ajman, Ras Al Khaimah |
| UAQ Free Trade Zone (`uaq-free-trade-zone`, area of Umm Al Quwain) | UAE | Warehouse units, workshops, food and packaging stores (described generally, no operating status) | Logistics, food, chemicals | Hot, humid, salty | none |
| Ras Al Khaimah (`ras-al-khaimah`, city, Ras Al Khaimah Emirate) | UAE | Factories, port-side warehouses, resort kitchens, hospitals and pharmacies | Pharmaceuticals, chemicals, food | Hot, humid coast, mountain rain | Umm Al Quwain, Ajman, Fujairah (not yet built) |
| RAKEZ (`rakez`, area of Ras Al Khaimah) | UAE | Plant halls, ingredient stores, outbound sheds, chilled halls (described generally, no operating status) | Logistics, chemicals, medicines | Hot summers | Al Ghail Industrial Area |
| Al Ghail Industrial Area (`al-ghail-industrial-area`, area of Ras Al Khaimah) | UAE | Plant finished-goods rooms, sealant and building-product stores, food and packaging units, yards | Chemicals, logistics, food | Hot, with occasional wadi flooding | RAKEZ |
| Al Jazirah Al Hamra (`al-jazirah-al-hamra`, area of Ras Al Khaimah) | UAE | Fishing beaches and ice stores, shops and cafes, heritage buildings, small yards | Food, logistics, clinics | Hot, humid, salty coast | RAKEZ |
| Fujairah (`fujairah`, city, Fujairah Emirate) | UAE | Fish market and ice stores, farm produce sheds, hotel and dive-centre kitchens, hospital and pharmacies | Food, medicines, logistics | Hot, very humid Gulf of Oman coast; mountain showers | Dibba Al Fujairah, Khor Fakkan, Kalba |
| Dibba Al Fujairah (`dibba`, city, Fujairah Emirate) | UAE | Fishing harbour and ice boxes, date farms, dive-centre kitchens, clinic and shops | Food, medicines, logistics | Hot, humid bay below steep peaks | Fujairah, Khor Fakkan |
| Fujairah Free Zone (`fujairah-free-zone`, area of Fujairah) | UAE | Warehouse units, chemical and lubricant stores, food and drink stock rooms (described generally, no operating status) | Logistics, food, chemicals | Hot, damp, salty | Port of Fujairah |
| Port of Fujairah (`port-of-fujairah`, area of Fujairah) | UAE | Quayside sheds, cold rooms and refrigerated boxes, warehouses, vehicles (described generally, no operating status) | Logistics, food, medicines | Hot, damp, salty | Fujairah Free Zone |
| Doha (`doha`, city, Doha Municipality) | Qatar | Hospitals and laboratories, hotel and catering kitchens, food importers, outskirt warehouses | Medicines, food, logistics | Very hot, humid bay coast; dust and haze | Al Rayyan, Al Wakrah, Lusail (not yet built) |
| West Bay (`west-bay`, area of Doha) | Qatar | Hotel kitchens, server rooms, restaurants and food courts, clinics | Food, data centers, medicines | Hot, humid, towers | The Pearl-Qatar |
| Al Sadd (`al-sadd`, area of Doha) | Qatar | Clinics and pharmacies, supermarkets, restaurants and bakeries, shop stockrooms | Medicines, food, clinics | Hot, humid | Msheireb |
| Msheireb (`msheireb`, area of Doha) | Qatar | Collection and archive stores, hotel kitchens, cafes, office pantries and plant rooms | Food, laboratories, data centers | Hot, humid, shaded streets | Al Sadd |
| The Pearl-Qatar (`the-pearl-qatar`, area of Doha) | Qatar | Supermarkets, marina cafes, clinics, basement stockrooms | Food, medicines, logistics | Hot, humid sea air | West Bay |
| Hamad International Airport (`hamad-international-airport`, area of Doha) | Qatar | Cargo sheds, cold rooms for medicines, catering stores, vehicles (described generally, no flight or cargo status) | Medicines, logistics, food | Hot, humid | Ras Bufontas Free Zone |
| Ras Bufontas Free Zone (`ras-bufontas-free-zone`, area of Doha) | Qatar | Light warehouse units, component rooms, healthcare supply stores, workshops (described generally, no operating status) | Electronics, medicines, logistics | Hot summers | Hamad International Airport |
| Al Rayyan (`al-rayyan`, city, Al Rayyan Municipality) | Qatar | Supermarkets and groceries, pharmacies and clinics, bakeries and restaurants, roadside warehouses | Food, medicines, logistics | Very hot; dry or humid with the wind; dust | Doha, Umm Salal, Al Wakrah (not yet built) |
| Al Gharafa (`al-gharafa`, area of Al Rayyan) | Qatar | Neighbourhood groceries, pharmacies and clinics, takeaway kitchens, small workshops | Food, medicines, clinics | Hot summers | Al Sailiya |
| Birkat Al Awamer (`birkat-al-awamer`, area of Al Rayyan) | Qatar | Storage yards, paint and chemical stores, food and drink stock rooms, workshops | Logistics, food, chemicals | Hot, dusty outer district | Al Sailiya |
| Al Sailiya (`al-sailiya`, area of Al Rayyan) | Qatar | Roadside shops, workshops and parts stores, warehouses, distribution rooms | Food, electronics, logistics | Hot, dusty roadside | Al Gharafa |
| Al Wakrah (`al-wakrah`, city, Al Wakrah Municipality) | Qatar | Fishing harbour and ice stores, market arcades and spice stores, clinics, supermarkets and cafes | Food, medicines, logistics | Very hot, humid, salty shore | Doha, Mesaieed, Al Wukair |
| Mesaieed (`mesaieed`, city, Al Wakrah Municipality) | Qatar | Industrial parts and chemical stores, laboratories, canteens, hospital and clinics | Chemicals, laboratories, food | Extreme heat, humid shore, dunes and dust | Al Wakrah, Doha |
| Al Wukair (`al-wukair`, city, Al Wakrah Municipality) | Qatar | Neighbourhood supermarkets, farm sheds, restaurants and bakeries, roadside warehouses | Food, medicines, logistics | Hot, dry, dusty | Al Wakrah, Doha, Al Rayyan |
| Mesaieed Industrial City (`mesaieed-industrial-city`, area of Mesaieed) | Qatar | Chemical, coating and lubricant stores, laboratories, parts warehouses, canteens (described generally, no operating status or output) | Chemicals, laboratories, logistics | Extreme heat, salt damp | none |
| Al Khor (`al-khor`, city, Al Khor and Al Thakhira Municipality) | Qatar | Harbour ice stores, supermarkets and bakeries, hospital and clinics, edge-of-town warehouses | Food, medicines, logistics | Hot, humid creek coast | Ras Laffan, Doha, Umm Salal (not yet built) |
| Ras Laffan (`ras-laffan`, city, Al Khor and Al Thakhira Municipality) | Qatar | Support warehouses and parts stores, laboratories, canteens, clinics in the living quarters | Chemicals, laboratories, food | Extreme heat on an exposed headland | Al Khor, Doha |
| Ras Laffan Industrial City (`ras-laffan-industrial-city`, area of Ras Laffan) | Qatar | Materials and parts warehouses, chemical stores, laboratories and instrument rooms, canteens (described generally; no operating status, production, energy or gas output) | Chemicals, laboratories, logistics | Extreme heat, salt damp | none |
| Lusail (`lusail`, city, Al Daayen Municipality) | Qatar | Hotel, resort and restaurant kitchens, supermarkets, clinics and pharmacies, tower stockrooms and plant rooms | Food, medicines, data centers | Hot, humid waterfront | Doha, Al Daayen, Umm Salal |
| Al Daayen (`al-daayen`, city, Al Daayen Municipality) | Qatar | Neighbourhood supermarkets and bakeries, farm sheds, clinics and pharmacies, small warehouses | Food, medicines, logistics | Hot, dry, dusty | Lusail, Doha, Umm Salal |
| Umm Salal (`umm-salal`, city, Umm Salal Municipality) | Qatar | Irrigated farm sheds, neighbourhood shops and bakeries, clinics and pharmacies, main-road warehouses | Food, medicines, logistics | Hot, dry; dust | Doha, Al Rayyan, Al Daayen, Al Khor |
| Al Shamal (`al-shamal`, city, Al Shamal Municipality) | Qatar | Harbour quays and ice stores, irrigated farm sheds, supermarkets and bakeries, hospital and clinics | Food, medicines, logistics | Hot, humid, exposed north coast | Al Khor, Umm Salal |
| Al Shahaniya (`al-shahaniya`, city, Al Shahaniya Municipality) | Qatar | Desert farm sheds, feed and veterinary stores, neighbourhood shops, clinics | Food, medicines, logistics | Very hot, dry; sandstorms | Dukhan, Al Rayyan, Doha, Umm Salal |
| Dukhan (`dukhan`, city, Al Shahaniya Municipality) | Qatar | Supermarkets and bakeries, hospital and clinics, edge-of-town warehouses, beach cafes | Food, medicines, logistics | Hot, humid coast; sand | Al Shahaniya, Doha |
| Dukhan Industrial Area (`dukhan-industrial-area`, area of Dukhan) | Qatar | Workshops and parts stores, warehouses, paint and lubricant stores, canteens (described generally; no operating status or output) | Logistics, chemicals, food | Extreme heat, sand | none |
| Muscat (`muscat`, city, Muscat Governorate) | Oman | Hospitals and laboratories, hotel and catering kitchens, food importers, industrial and warehouse districts | Medicines, food, logistics | Long, hot, humid harbour summers; flash floods after storms | Muttrah, Seeb, Quriyat (not yet built) |
| Muttrah (`muttrah`, city, Muscat Governorate) | Oman | Fish market and ice stores, covered-market stock rooms, port-side sheds, clinics and shop coolers | Food, medicines, logistics | Hot, damp harbour; mountains trap heat | Muscat, Seeb (not yet built) |
| Al Khuwair (`al-khuwair`, area of Muscat) | Oman | Hotel kitchens, server cupboards, restaurants and cafes, clinics | Food, data centers, medicines | Hot, humid | Al Ghubra |
| Al Ghubra (`al-ghubra`, area of Muscat) | Oman | Clinics and pharmacies, groceries, restaurants and bakeries, shop stockrooms | Medicines, food, clinics | Hot, humid | Al Khuwair |
| Ghala Industrial Area (`ghala-industrial-area`, area of Muscat) | Oman | Light factories, paint and chemical stores, warehouses and building-material yards, garages | Chemicals, logistics, food | Extreme summer heat | none |
| Sultan Qaboos Port Muttrah (`sultan-qaboos-port-muttrah`, area of Muttrah) | Oman | Quayside sheds, chilled rooms and refrigerated boxes, warehouses, vehicles (described generally, no operating status) | Logistics, food, medicines | Hot, damp, salty | none |
| Seeb (`seeb`, city, Muscat Governorate) | Oman | Fishing harbour and ice stores, supermarkets and bakeries, clinics and pharmacies, date stores and workshops | Food, medicines, logistics | Hot, damp coast with a dry plain behind | Muscat, Muttrah, Bawshar |
| Bawshar (`bawshar`, city, Muscat Governorate) | Oman | Supermarkets and groceries, pharmacies and clinics, bakeries and restaurants, workshop yards | Food, medicines, logistics | Hot, dry suburb beside dunes | Muscat, Seeb, Muttrah |
| Quriyat (`quriyat`, city, Muscat Governorate) | Oman | Harbour ice boxes, date and garden sheds, shops and cafes, clinic and pharmacies | Food, medicines, logistics | Hot, humid bay; storm water | Muscat, Muttrah |
| Muscat International Airport (`muscat-international-airport`, area of Seeb) | Oman | Cargo sheds, medicine cold rooms, catering stores, vehicles (described generally, no flight or cargo status) | Medicines, logistics, food | Hot, humid | none |
| Sohar (`sohar`, city, Al Batinah North Governorate) | Oman | Harbour ice stores, date and farm sheds, hospitals and pharmacies, estate-side warehouses | Food, medicines, logistics | Hot, very humid flat coast; storms | Saham, Al Suwaiq, Shinas (not yet built) |
| Saham (`saham`, city, Al Batinah North Governorate) | Oman | Market cold boxes, date sheds among palms, shops and cafes, clinic | Food, medicines, logistics | Hot, humid; palm-grove damp | Sohar, Al Suwaiq |
| Al Suwaiq (`al-suwaiq`, city, Al Batinah North Governorate) | Oman | Date and fruit farm stores, harbour ice stores, market shops, hospital | Food, medicines, logistics | Hot, humid; storm water | Saham, Sohar |
| Sohar Industrial Estate (`sohar-industrial-estate`, area of Sohar) | Oman | Factory halls, chemical and lubricant stores, warehouses and parts stores, canteens | Chemicals, logistics, food | Extreme coastal heat | Sohar Port and Freezone |
| Sohar Port and Freezone (`sohar-port-and-freezone`, area of Sohar) | Oman | Container stacks, chilled halls, warehouse plots, lorries (described generally, no operating status) | Logistics, food, medicines | Hot, damp, salty | Sohar Industrial Estate |
| Barka (`barka`, city, Al Batinah South Governorate) | Oman | Fish rooms and ice stores, produce and date stores, hospital and clinics, workshops and warehouses | Food, medicines, logistics | Hot, humid coast; storm water | Rustaq, Nakhal, Seeb |
| Rustaq (`rustaq`, city, Al Batinah South Governorate) | Oman | Date stores and grove sheds, market stock rooms, hospital and clinics, edge-of-town stores | Food, medicines, logistics | Hot days, cooler nights; wadi storms | Nakhal, Barka |
| Nakhal (`nakhal`, city, Al Batinah South Governorate) | Oman | Date sheds, small-market coolers, clinic and pharmacies, farm-supply stores | Food, medicines, logistics | Hot foothill oasis; wadi storms | Rustaq, Barka |
| Barka Industrial Area (`barka-industrial-area`, area of Barka) | Oman | Light factories, sealant and paint stores, building-material yards, garages and parts counters | Chemicals, logistics, food | Extreme coastal heat | none |
| Nizwa (`nizwa`, city, Ad Dakhiliyah Governorate) | Oman | Date stores and grove sheds, market and sweet-makers' rooms, hospital and university laboratories, roadside warehouses | Food, medicines, laboratories | Fierce dry days, cold winter nights; dust | Bahla, Izki, Sumail, Adam (not yet built) |
| Bahla (`bahla`, city, Ad Dakhiliyah Governorate) | Oman | Date-garden sheds, pottery workshops, small-market coolers, clinic | Food, medicines, logistics | Hot, dry; damp among palms | Nizwa, Izki |
| Izki (`izki`, city, Ad Dakhiliyah Governorate) | Oman | Date groves and farm sheds, roadside shops, old-quarter stock rooms, clinic | Food, medicines, logistics | Hot days, cold nights; channel damp | Nizwa, Bahla, Sumail |
| Sumail (`sumail`, city, Ad Dakhiliyah Governorate) | Oman | Valley farm stores, roadside shops and cafes, garages, hospital and clinics | Food, medicines, logistics | Hot by day, wadi floods | Nizwa, Izki, Barka |
| Nizwa Industrial Estate (`nizwa-industrial-estate`, area of Nizwa) | Oman | Light factories, paint and cleaner stores, building-material yards, workshops | Chemicals, logistics, food | Fierce heat and cold nights | none |
| Ibri (`ibri`, city, Ad Dhahirah Governorate) | Oman | Date gardens and farm sheds, market and wholesale stores, hospital and clinics, roadside warehouses | Food, medicines, logistics | Fierce dry heat; sandstorms | Nizwa, Buraimi |
| Ibri Industrial Area (`ibri-industrial-area`, area of Ibri) | Oman | Workshops and garages, general warehouses, paint and chemical stores, small food stock rooms | Logistics, chemicals, food | Fierce dry heat; sand | none |
| Buraimi (`buraimi`, city, Al Buraimi Governorate) | Oman | Supermarkets and shop coolers, date gardens and market stores, hospital and clinics, roadside warehouses | Food, medicines, logistics | Hot, dry; dust | Ibri, Sohar |
| Buraimi Industrial Area (`buraimi-industrial-area`, area of Buraimi) | Oman | Light factories, sealant and paint stores, building-material yards, wholesale food rooms | Chemicals, logistics, food | Dry inland heat | none |
| Salalah (`salalah`, city, Dhofar Governorate) | Oman | Harbour ice stores, fruit and coconut stores, market spice and frankincense stock rooms, hospital and clinics | Food, medicines, logistics | Warm, salty; monsoon weeks cool, misty and very humid | Duqm |
| Salalah Free Zone (`salalah-free-zone`, area of Salalah) | Oman | Warehouse units, food and drink stock rooms, lubricant and cleaner stores, office pantries (described generally, no operating status) | Logistics, food, medicines | Warm, salty, monsoon damp | Port of Salalah |
| Raysut Industrial Estate (`raysut-industrial-estate`, area of Salalah) | Oman | Factory halls, coating and solvent stores, warehouses and parts stores, canteens | Chemicals, logistics, food | Warm, salty, monsoon damp | none |
| Port of Salalah (`port-of-salalah`, area of Salalah) | Oman | Container stacks, cold halls and refrigerated containers, transit sheds, lorries (described generally, no operating status) | Logistics, food, medicines | Warm, salty, monsoon damp | Salalah Free Zone |
| Duqm (`duqm`, city, Al Wusta Governorate) | Oman | Fishing-harbour ice boxes, supermarkets, hospital and clinics, warehouses behind the shore | Food, medicines, logistics | Dry heat, strong wind, sand | Salalah, Haima (not yet built) |
| Duqm Special Economic Zone (`duqm-special-economic-zone`, area of Duqm) | Oman | Warehouse plots, materials and parts stores, cold rooms, workshops and canteens (described generally, no operating status) | Logistics, chemicals, food | Dry heat, wind, sand | Port of Duqm |
| Port of Duqm (`port-of-duqm`, area of Duqm) | Oman | Container stacks, cold halls, quayside sheds, lorries for long road journeys (described generally, no operating status) | Logistics, food, medicines | Dry heat, salty wind | Duqm Special Economic Zone |
| Sur (`sur`, city, Ash Sharqiyah South Governorate) | Oman | Harbour ice stores, dhow-yard materials, market stock rooms, hospital and clinics | Food, medicines, logistics | Hot, humid sea air | Ibra, Bidiyah, Muscat |
| Sur Industrial Estate (`sur-industrial-estate`, area of Sur) | Oman | Light factories, sealant and paint stores, timber and tile yards, parts counters | Chemicals, logistics, food | Hot, salty, humid | none |
| Kuwait City (`kuwait-city`, city, Al Asimah Governorate) | Kuwait | Hospitals and laboratories, covered market and fish market, supermarkets and hotel kitchens, western warehouses | Medicines, food, electronics | Blazing dry summers, humid bay air, dust storms | Hawalli, Salmiya, Farwaniya (not yet built) |
| Shuwaikh Industrial Area (`shuwaikh-industrial-area`, area of Kuwait City) | Kuwait | Workshops and spare-parts shops, warehouses, paint and chemical stores, food and packaging units | Electronics, logistics, chemicals | Blazing summer heat | Shuwaikh Port |
| Shuwaikh Port (`shuwaikh-port`, area of Kuwait City) | Kuwait | Container stacks, cold halls and reefer containers, quayside sheds, trucks (described generally, no operating status) | Logistics, food, medicines | Hot, hazy bay air | Shuwaikh Industrial Area |
| Hawalli (`hawalli`, city, Hawalli Governorate) | Kuwait | Grocers and bakeries, pharmacies and clinics, takeaway kitchens, traders' basements and stockrooms | Food, medicines, electronics | Blazing dry summers; heat trapped between buildings | Salmiya, Kuwait City |
| Salmiya (`salmiya`, city, Hawalli Governorate) | Kuwait | Hotel and cafe kitchens, supermarkets and food courts, clinics and pharmacies, marina stores | Food, medicines, logistics | Blazing summers, humid shore air | Hawalli, Kuwait City |
| Ibra (`ibra`, city, Ash Sharqiyah North Governorate) | Oman | Date stores and grove sheds, weekly-market stock rooms, shops and cafes, hospital and clinics | Food, medicines, logistics | Fierce dry heat, cold winter nights | Bidiyah, Sur |
| Bidiyah (`bidiyah`, city, Ash Sharqiyah North Governorate) | Oman | Date gardens and farm sheds, roadside shops, workshops and yards, clinic | Food, medicines, logistics | Fierce heat, blowing sand | Ibra, Sur |
| Khasab (`khasab`, city, Musandam Governorate) | Oman | Harbour ice boxes, shops and cafes, hospital and clinics, valley date stores | Food, medicines, logistics | Hot, humid inlets; cliffs hold heat | Muscat, Sohar |
| Jazan Economic City (`jazan-economic-city`, area of Jazan) | Saudi Arabia | Plant chemical and drum stores, spares warehouses and contractor yards, port yards, camp kitchens and clinics | Chemical stores, contract warehousing, camp catering | Extreme heat and humidity, salty air | none |
| Jeddah (`jeddah`) | Saudi Arabia | Industrial and port logistics zones | Port logistics, food import cold chain, hospitals | Hot, humid coastal | Riyadh, Dammam |
| Dammam (`dammam`) | Saudi Arabia | Industrial and port logistics zones | Industrial & chemical, port logistics, food | Hot, humid Gulf coast | Riyadh, Bahrain, Jeddah |
| Dubai (`dubai`) | UAE | Jebel Ali, Al Quoz | Logistics & re-export, food, pharma distribution, hospitality | Extreme heat and humidity | Riyadh, Dammam, Bahrain |

**GCC notes:** supply is from India. Don't name local estates beyond those listed. Never recommend Vayu. Keep the existing GSM compatibility note. Bahrain stays as a country page (no city page).

**Planned, awaiting owner confirmation (do NOT build yet):** none (Thane, Visakhapatnam and Haridwar are now built). (Vapi, Ankleshwar and Surat were confirmed by the owner and moved into the table above.)

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

**Singtam (Sikkim) is not built.** It was requested as a city page (600+ words) with an area page as the fallback. The area
model (`AreaDef` in `src/data/areas.ts`) needs a parent city that exists in the location tree, and the only candidate in
Sikkim is Gangtok. Singtam is a separate Teesta-side town in East Sikkim, not part of Gangtok, so it must not be shown as
Gangtok's area. There were also too few confident local facts for 600 unique words. It stays unbuilt until a Singtam
city page can be written from owner-confirmed detail.

## Saudi Arabia regions

Saudi Arabia is grouped by its 13 administrative regions, each a state-level hub under the country hub
(`riyadh-region`, `makkah-region`, `eastern-province`, `madinah-region`, `asir-region`, `qassim-region`, `jazan-region`,
`tabuk-region`, `hail-region`, `najran-region`, `al-baha-region`, `al-jawf-region`, `northern-borders-region`). The same
rules apply as for Indian states: a region hub with fewer than two built pages is noindex and out of the sitemap.
Cities sit under their region; industrial cities, economic cities and dry ports are area pages under a city
(`Country > Region > City > Area`, flat URL `/data-logger-{slug}`). Existing cities that were once direct children of the
country (Riyadh, Jeddah, Dammam) move under their region when that region's batch is built; their copy, URLs and hero
pairs do not change. All GCC rules stay: no Vayu or GSM series, the GSM compatibility note appears once per page (area pages
included), no delivery, stock or local-service claims, no local office, no accreditation claim.

Not built in Batch 1 (Riyadh Region), for lack of confident, distinguishing local facts: the towns of Al Zulfi and Dawadmi, and
the Riyadh 2nd and 3rd Industrial Cities and the Sudair Industrial City.

Not built in Batch 2 (Makkah Region), for lack of confident, distinguishing local facts: Khulais, and the Jeddah 2nd and 3rd Industrial Cities.

**Hero registry rule (reminder):** `CITY_REGISTRY` in `src/data/page-heroes.ts` is append-only. Insert new cities only at the very end,
never in the middle, or the pairs of every later city shift. Batch 1 of the Saudi build broke this and was corrected in Batch 2.

Not built in Batch 3 (Eastern Province), for lack of confident, distinguishing, strictly commercial local facts: Ras Tanura, Hafar Al-Batin,
Khafji and Abqaiq, and the Dammam 2nd Industrial City.

Not built in Batch 4 (Madinah and Qassim), for lack of confident, distinguishing local facts: Ar Rass.

Not built in Batch 5 (Asir, Jazan, Najran, Al Baha), for lack of confident, distinguishing local facts: Sabya and Abu Arish.
The Najran Region and Al Baha Region hubs have one city each, so they stay noindex and out of the sitemap until a second page is built.

Not built in Batch 6 (Tabuk, Hail, Al Jawf, Northern Borders): Duba and Haql (too few confident, distinguishing local facts) and NEOM (a
planned development; no page could be written without claims about its progress, so it is skipped). Tabuk, Hail, Al Jawf and Northern
Borders each have one city page, so those four region hubs stay noindex and out of the sitemap until a second page is built.
All 13 Saudi region hubs now exist; the hubs with two or more built pages are Riyadh, Makkah, Eastern Province, Madinah, Qassim, Asir and Jazan.

## Yemen governorates

Yemen is handled case by case. Governorates are state-level hubs under the Yemen country hub and are created only when at least one page is
built under them (never an empty hub); a hub with fewer than two built pages is noindex and out of the sitemap. Cities sit under their
governorate; ports, free zones, industrial areas and peninsulas are area pages under a city. `npm run check:data` enforces, for every page
under Yemen: the case-by-case line (worded differently on each page), neutral wording (no government, authority, control, military, security,
border, conflict or similar), and no statement of operating status, capacity or openness of any port, zone, airport or road. No claim is made of
delivery, shipping, local stock, installation or service, and no named organisation is claimed as a customer. GCC rules apply: no Vayu or GSM
series, the GSM note once per page, no local office, no accreditation claim.

Not built in Yemen Batch 2 (Hadramaut, Al Mahrah, Abyan): Al Ghaydah, for lack of confident, distinguishing local facts, so no Al Mahrah hub was created.

Yemen Batch 3 (Sana'a): the city sits under the Amanat Al Asimah hub (the administrative area that covers the city), which is indexable with
one city and two area pages. The airport, which lies north of the city, is attached as an area of Sana'a without any statement about which
administrative area it falls in. No Sana'a Governorate hub was created because no page is built under it.

Yemen Batch 4 (Taiz, Al Hudaydah, Ibb, Dhamar): four governorate hubs created. Taiz Governorate (Taiz, Mocha, Port of Mocha) and Al Hudaydah
Governorate (Hodeidah, Zabid, Bajil, Port of Hodeidah, Port of Salif) are indexable; Ibb Governorate and Dhamar Governorate have one city each,
so they stay noindex and out of the sitemap until a second page is built. Mocha is a city under Taiz Governorate and the Port of Mocha an area of
Mocha. The Port of Salif is attached as an area of Hodeidah.

Yemen Batch 5 (Marib, Lahij, Sa'dah): three governorate hubs created, each with one city, so all three stay noindex and out of the sitemap until a
second page is built. Not built, for lack of confident, distinguishing local facts: Amran, Hajjah and Al Bayda.

## UAE emirates

Emirate hubs are state-level hubs under the UAE country hub with the slug pattern `{name}-emirate` (e.g. `abu-dhabi-emirate`), so they never collide
with city slugs. An emirate hub is indexable only with two or more built child pages, otherwise noindex and out of the sitemap, never empty.
Dubai (built earlier) still sits directly under the UAE hub until the Dubai Emirate batch moves it under its hub. UAE pages follow the GCC rules:
no Vayu or GSM series, the GSM note once per page, no local-office claim, no accreditation claim, and no claim about delivery, shipping, customs,
warranty or local stock. Port, free-zone and airport pages say nothing about operating status, traffic, capacity, operator or eligibility, only
the goods and rooms a logger user may look after. City pages carry the four FAQs `check:data` requires.

UAE Batch 1 (Abu Dhabi Emirate): hub, Abu Dhabi city and the areas Mussafah, ICAD, KIZAD, Khalifa Port and Ghantoot. The Abu Dhabi Emirate hub is
indexable (one city and five areas).

UAE Batch 2 (Abu Dhabi Emirate, remaining towns): Al Ain, Ruwais, Madinat Zayed and Liwa, with the areas Al Ain Industrial Area and Ruwais
Industrial Complex. Not built, for lack of confident, distinguishing local facts: Ghayathi.

UAE Batch 3 (Dubai Emirate): the Dubai Emirate hub is created and the existing Dubai city page moved under it (flat URL unchanged; the old nested
`/locations/uae/dubai` path keeps its 301 via `MOVED_LEGACY_PATHS` in `next.config.ts`). The Dubai page and the UAE hub text were rewritten to drop
the old "dispatch from India" and "quote" wording. Areas: Jebel Ali (JAFZA), Dubai Investments Park, Al Quoz Industrial Area, Ras Al Khor
Industrial Area, Al Qusais Industrial Area and Al Aweer.

UAE Batch 4 (Dubai areas): Dubai Silicon Oasis, Dubai Industrial City, Dubai South, Dubai Logistics City, Dubai Airport Freezone and Dubai Healthcare
City, all areas of Dubai. Airport, free-zone and logistics pages say nothing about operating status, traffic, capacity, operator or eligibility.

UAE Batch 5 (Sharjah Emirate): hub, Sharjah, Khor Fakkan, Kalba and the areas Sajaa Industrial Area, SAIF Zone, Hamriyah Free Zone and Muwaileh.
SAIF Zone and the Sharjah Airport International Free Zone are the same free zone, so one page (SAIF Zone) was built and the second name skipped
rather than writing a near-duplicate. No border or jurisdiction statement is made for the east-coast towns.

UAE Batch 6 (Ajman, Umm Al Quwain, Ras Al Khaimah): three emirate hubs, cities Ajman, Umm Al Quwain and Ras Al Khaimah, and the areas Al Jurf
Industrial Area, Ajman Free Zone, UAQ Free Trade Zone, RAKEZ, Al Ghail Industrial Area and Al Jazirah Al Hamra. Not built, for lack of confident,
distinguishing local facts: Falaj Al Mualla.

UAE Batch 7 (Fujairah Emirate): hub, Fujairah, Dibba Al Fujairah (named for the Fujairah side only; no border or jurisdiction statement is made), and the
areas Fujairah Free Zone and Port of Fujairah. This completes the UAE build: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and
Fujairah emirate hubs are all indexable.

## Qatar municipalities

Municipality hubs are state-level hubs under the Qatar country hub with the slug pattern `{name}-municipality` (e.g. `doha-municipality`), so they never
collide with city slugs. A municipality hub is indexable only with two or more built child pages, otherwise noindex and out of the sitemap, never empty.
Place each city and area under the municipality and city it really belongs to; where that is not confidently known, make no municipal or boundary
statement, attach it to the nearest confident city, or skip it. Qatar pages follow the GCC rules (no Vayu or GSM series, GSM note once per page, no
local-office claim, no accreditation claim, no delivery, shipping, customs, warranty or local-stock claims) and carry no event, stadium, tournament or
political reference and no company name. Port, airport, free-zone, industrial-city and Ras Laffan pages say nothing about operating status, traffic,
capacity, production, cargo volumes, energy output, operator or eligibility.

Qatar Batch 1 (Doha Municipality): hub, Doha city, and the areas West Bay, Al Sadd, Msheireb and The Pearl-Qatar. The Qatar country hub text was
rewritten to drop the old "dispatch from India" and "no city pages yet" wording.

Qatar Batch 2: Hamad International Airport and Ras Bufontas Free Zone added as areas of Doha (placed under Doha as instructed, with no municipal or
boundary statement); Al Rayyan Municipality hub, Al Rayyan city and the areas Al Gharafa, Birkat Al Awamer and Al Sailiya. Not built: Doha Industrial Area,
because I am not confident which municipality or city it sits in.

Qatar Batch 3 (Al Wakrah Municipality): hub, Al Wakrah, Mesaieed, Al Wukair and Mesaieed Industrial City (under Mesaieed). Not built: Hamad Port and
Umm Al Houl Free Zone, because I am not confident which city (Al Wakrah or Mesaieed) they sit in.

Qatar Batch 4 (Al Khor and Al Thakhira Municipality): hub, Al Khor, Ras Laffan and Ras Laffan Industrial City (under Ras Laffan). The Ras Laffan pages
describe the support buildings only and say nothing about energy, gas, production or operating status. The hub's `inName` in `location-content.ts`
is shortened ("Al Khor and Al Thakhira") to keep the title within 60 characters.

Qatar Batch 5: Al Daayen Municipality hub (Lusail and Al Daayen; indexable with two city pages) and Umm Salal Municipality hub (Umm Salal only, so noindex and
out of the sitemap until a second page is built). Not built: Barwa Al Baraha, because I am not confident which city it belongs to.

Qatar Batch 6: Al Shamal Municipality hub (Al Shamal only, so noindex and out of the sitemap until a second page is built) and Al Shahaniya Municipality hub
(Al Shahaniya, Dukhan and Dukhan Industrial Area; indexable). This completes the Qatar build; nothing in it is skipped except the pages named in the earlier
batch notes (Doha Industrial Area, Hamad Port, Umm Al Houl Free Zone, Barwa Al Baraha).

## Oman governorates

Governorate hubs are state-level hubs under the Oman country hub with the slug pattern `{name}-governorate` (e.g. `muscat-governorate`), so they never
collide with city slugs. A governorate hub is indexable only with two or more built child pages, otherwise noindex and out of the sitemap, never empty.
The Oman city Liwa must not reuse `liwa` (the UAE Liwa page); give it a distinct slug such as `liwa-oman` and make the title and copy say Oman. Make no
administrative (governorate, wilayat, boundary) statement unless confident; attach a place to the nearest confident city instead. Oman pages follow the GCC
rules (no Vayu or GSM series, GSM note once per page, no local-office claim, no accreditation claim, no delivery, shipping, customs, warranty or local-stock
claims) and carry no political, royal, event, tourism or festival reference and no company name. Port, airport, free-zone, special-economic-zone and
industrial-estate pages say nothing about operating status, traffic, capacity, production, cargo volumes, operator or eligibility.

Oman Batch 1 (Muscat Governorate): hub, Muscat, Muttrah and the areas Al Khuwair, Al Ghubra and Ghala Industrial Area (attached to Muscat as the nearest
confident city, with no wilayat statement) and Sultan Qaboos Port Muttrah (under Muttrah). The Oman country hub text was rewritten to drop the old
"quote from India" and "dispatch" wording.

Oman Batch 2 (Muscat Governorate): Seeb, Bawshar and Quriyat added, plus Muscat International Airport (under Seeb). Not built: Al Amerat (too few confident,
distinguishing local facts), Rusayl Industrial Estate and Knowledge Oasis Muscat (not confident which city they belong to).

Oman Batch 3 (Al Batinah North Governorate): hub, Sohar, Saham, Al Suwaiq, Sohar Industrial Estate and Sohar Port and Freezone. Not built: Shinas and Liwa
(Oman), because I lack enough confident, distinguishing local facts and would only repeat the other Batinah towns; so the `liwa-oman` slug is not yet used.

Oman Batch 4 (Al Batinah South Governorate): hub, Barka, Rustaq, Nakhal and Barka Industrial Area (under Barka). Not built: Khazaen Economic City, because I am not
confident which city or governorate it belongs to.

Oman Batch 5: Ad Dakhiliyah Governorate (Nizwa, Bahla, Izki, Sumail, Nizwa Industrial Estate), Ad Dhahirah Governorate (Ibri, Ibri Industrial Area) and
Al Buraimi Governorate (Buraimi, Buraimi Industrial Area). Not built: Adam (too few confident, distinguishing local facts). No border or boundary statement is
made for Buraimi.

Oman Batch 6: Dhofar Governorate (Salalah, Salalah Free Zone, Raysut Industrial Estate and Port of Salalah, all attached to Salalah with no wilayat statement) and Al Wusta
Governorate (Duqm, Duqm Special Economic Zone and Port of Duqm). Not built: Haima (too few confident, distinguishing local facts).

Oman Batch 7: Ash Sharqiyah South Governorate (Sur, Sur Industrial Estate), Ash Sharqiyah North Governorate (Ibra, Bidiyah) and Musandam Governorate (Khasab only, so
noindex and out of the sitemap until a second page is built). No border, exclave or boundary statement is made for Khasab. This completes the Oman build. Pages not
built across the plan: Al Amerat, Rusayl Industrial Estate, Knowledge Oasis Muscat, Shinas, Liwa (Oman), Khazaen Economic City, Adam, Haima.

Oman audit: the Oman build has 1 country page, 11 governorate hubs (10 indexable, Musandam noindex), 23 cities and 17 areas. Fort mentions were replaced with neutral wording. Rusayl
Industrial Estate stays skipped (not confident which city it belongs to).

## Kuwait governorates

Governorate hubs are state-level hubs under the Kuwait country hub with the slug pattern `{name}-governorate` (e.g. `al-asimah-governorate`), so they never collide
with city slugs. A governorate hub is indexable only with two or more built child pages, otherwise noindex and out of the sitemap, never empty. Attach a place
to the governorate and city it really belongs to; where that is not confidently known (e.g. Sabhan, Fintas), make no administrative statement and attach it to the
nearest confident city, or skip it. Kuwait pages follow the GCC rules (no Vayu or GSM series, GSM note once per page, no local-office claim, no accreditation
claim, no delivery, shipping, customs, warranty or local-stock claims) and carry no political, royal, border, security or event reference and no company name. Port,
airport, industrial-area, Mina and warehouse-district pages say nothing about operating status, traffic, capacity, production, refining, oil or gas output, operator
or eligibility.

Kuwait Batch 1 (Al Asimah Governorate): hub, Kuwait City, Shuwaikh Industrial Area and Shuwaikh Port (both under Kuwait City, with no administrative statement). The
Kuwait country hub text was rewritten to drop the old "ship from India" and "no city pages yet" wording.

Kuwait Batch 2 (Hawalli Governorate): hub, Hawalli and Salmiya (no area pages).
