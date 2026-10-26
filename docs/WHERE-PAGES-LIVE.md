# Pages kahan rehte hain (Where pages live)

Ye guide owner ke liye hai. Coding aani zaroori nahi. Har jagah simple language hai.
Kuch bhi badalne se pehle ye file ek baar padh lo, phir "Kuch badalna ho to" section use karo.

Ek shortcut: kisi bhi page ka ghar dhoondhna ho to terminal mein ye chalao:

```
npm run where -- /data-logger-mumbai
npm run where -- mumbai
npm run where -- https://prithvidataloggers.com/data-logger-vapi
npm run where -- --counts
```

Ye sirf padhta hai, kuch badalta nahi. (Git Bash mein `/` se shuru hone wala path kabhi kabhi
bigad jata hai. Aise mein bina `/` ke likho: `npm run where -- data-logger-mumbai`, ya PowerShell use karo.)

---

## 1. Pehle ye samjho

1. Site par 605 pages hain, par 605 alag files nahi hain.
2. Har *type* ke page ka sirf **ek template** hota hai. Template matlab ek saancha (mould) jo layout tay karta hai.
3. Page ka text (words) alag **data file** mein rehta hai. Data file bas ek badi list hoti hai.
4. Build ke time computer list ko padhta hai aur har entry ke liye ek page banata hai. Isse "page generate hona" kehte hain.
5. Example: `src/app/data-logger/[slug]/page.tsx` ek template hai. Isse 568 location pages bante hain (country, state, city, area).
   Har location page ka data **apni alag chhoti file** mein hai (jaise `src/data/locations/india/maharashtra/mumbai.ts`). VS Code mein `Ctrl+P` dabake "mumbai" likho, file seedha khul jayegi.
6. Folder ke naam mein `[slug]` likha ho to matlab "yahan list ka naam aayega".
7. Isliye city ka text badalna ho to template nahi, **data file** kholo. Layout badalna ho to template kholo.
8. Naya page chahiye? Data file mein ek nayi entry jodo. Naya template banane ki zaroorat nahi.
9. Page hatana ho? Entry hatao (aur jahan uska link hai wahan se bhi). Checks bata denge kuch chhoot gaya.
10. Kuch bhi badalne ke baad checks chalao (neeche likha hai). Wo galti pakad lete hain, Google tak pahunchne se pehle.

---

## 2. Saare page types ek table mein

Total pages = **605** (production build ke HTML pages, `npm run check:links` bhi 605 hi crawl karta hai).
Inme se **582** Google ko dikhte hain (sitemap.xml mein), baaki **23** `noindex` hain (neeche explain kiya hai).

| URL type | Example URL | Kitne pages | Template file | Data file (aur list ka naam) | Text kahan hai | Title / description kahan se |
|---|---|---|---|---|---|---|
| Home | `/` | 1 | `src/app/page.tsx` | `src/data/home.ts` (`hero`, aur baaki lists) | `src/data/home.ts` + `src/components/sections/home/*.tsx` | `src/app/page.tsx` ka `buildMetadata({ title, description })` |
| Core pages (about, brands, products list, industries list, services list, global-presence, locations, blog list, contact) | `/about` | 9 | `src/app/<naam>/page.tsx`, jaise `src/app/about/page.tsx` | koi list nahi; list wale pages `src/data/products.ts`, `industries.ts`, `services.ts` padhte hain | Usi page file mein (kuch pages `src/data/company.ts`, `clients.ts` bhi padhte hain) | Usi page file ka `buildMetadata(...)` |
| Products | `/products/setu` | 8 (7 series + accessories) | `src/app/products/[slug]/page.tsx` | `src/data/products.ts`, list `products` (specs, variants; yahin MRP data bhi hai jo site par kabhi nahi dikhta) aur `src/data/product-content.ts`, list `productContent` (har product ki apni file `src/data/products/<slug>.ts` se judti hai) | Har product ki apni file: `src/data/products/<slug>.ts`, jaise `src/data/products/setu.ts` | Usi product file ka `metaTitle` / `metaDescription` |
| Industries | `/industries/chemical` | 10 | `src/app/industries/[slug]/page.tsx` | `src/data/industries.ts`, list `industries` aur `src/data/industry-content.ts`, list `industryContent` (dono har industry ki apni file se judte hain) | Har industry ki apni file: `src/data/industries/<slug>.ts`, jaise `src/data/industries/chemical.ts` (`industry` = card ka data, `content` = page ka text) | Usi file ka `content.metaTitle` (nahi hai to `content.h1`) / `content.metaDescription` |
| Services | `/services/calibration` | 3 | `src/app/services/calibration/page.tsx`, `.../temperature-mapping/page.tsx`, `.../validation/page.tsx` (teeno `src/components/services/ServicePage.tsx` use karte hain) | `src/data/services.ts`, list `services` aur `src/data/service-content.ts`, list `serviceContent` (dono har service ki apni file se judte hain) | Har service ki apni file: `src/data/services/<slug>.ts`, jaise `src/data/services/calibration.ts` (`service` = card data, `content` = page text) | Usi file ka `content.metaTitle` (nahi hai to `content.h1`) / `content.metaDescription` |
| Blog posts | `/blog/why-nabl-calibration-matters` | 4 (abhi sab `draft`) | `src/app/blog/[slug]/page.tsx` | `src/content/blog/*.mdx` (file ka naam hi slug hai; upar ka `meta` block data hai) | Usi `.mdx` file mein, `meta` block ke neeche | `meta.title` (ya `seoTitle`) / `meta.description` usi `.mdx` file mein |
| Country hubs | `/data-logger-india` | 8 (India, Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, Yemen) | `src/app/data-logger/[slug]/page.tsx` | `src/data/locations/<country>/_country.ts`, jaise `src/data/locations/india/_country.ts` (har country ka apna folder; sab countries `src/data/locations/_tree.ts` ki list `locations` mein judti hain) | Usi file mein (`intro`, `localIndustries`, `citiesServed`, `supportNote`, `faqs`, `listing`) | Title naam se banta hai ("Temperature Data Loggers in India"); description `src/data/location-content.ts` ki `locationContent["india"].metaDescription` se |
| State / region hubs | `/data-logger-maharashtra`, `/data-logger-dubai-emirate` | 90 (India 30, Saudi 13, UAE 7, Qatar 8, Oman 11, Kuwait 6, Bahrain 4, Yemen 11); 71 indexable | `src/app/data-logger/[slug]/page.tsx` | `src/data/locations/<country>/<state>/_state.ts`, jaise `src/data/locations/india/maharashtra/_state.ts` (state ke cities usi folder ke `index.ts` mein judte hain) | Usi file mein (country hub jaisi fields) | Country hub jaisa: `locationContent["india/maharashtra"].metaDescription` |
| Cities | `/data-logger-mumbai` | 282 (India 158, Saudi 30, UAE 14, Qatar 13, Oman 23, Kuwait 14, Bahrain 14, Yemen 16) | `src/app/data-logger/[slug]/page.tsx` -> `src/components/locations/CityPage.tsx` | `src/data/locations/<country>/<state>/<city>.ts`, jaise `src/data/locations/india/maharashtra/mumbai.ts` | Usi city file mein (`intro`, `climateAngle`, `areas`, `industries`, `recommendedSeries`, `faqs`, `nearby`) | Usi city file ka `metaTitle` / `metaDescription` |
| Areas | `/data-logger-andheri` | 188 (India 90, Saudi 10, UAE 31, Qatar 12, Oman 17, Kuwait 11, Bahrain 7, Yemen 10) | `src/app/data-logger/[slug]/page.tsx` -> `src/components/locations/AreaPage.tsx` | `src/data/areas/<city>/<area>.ts`, jaise `src/data/areas/mumbai/andheri.ts` (sab areas `src/data/areas/_all.ts` ki list `areas` mein judte hain; `citySlug` = parent city) | Usi area file ka `page` block | Usi area file ka `page.metaTitle` / `page.metaDescription` |
| Privacy | `/privacy-policy` | 1 | `src/app/privacy-policy/page.tsx` | koi nahi | Usi file mein | Usi file ka `buildMetadata(...)` |
| Terms | `/terms` | 1 | `src/app/terms/page.tsx` | koi nahi | Usi file mein | Usi file ka `buildMetadata(...)` |

**Check: 1 + 9 + 8 + 10 + 3 + 4 + 8 + 90 + 282 + 188 + 1 + 1 = 605.**
Location pages (hubs + cities + areas) = 8 + 90 + 282 + 188 = **568**.

Ye baaki routes page count mein nahi gine gaye (ye file-type ya special routes hain):

| Route | Example | Kitne | File | Kya karta hai |
|---|---|---|---|---|
| 404 page | koi galat URL | 1 | `src/app/not-found.tsx` | Galat URL par dikhta hai. Hamesha `noindex`. |
| Sitemap | `/sitemap.xml` | 1 | `src/app/sitemap.ts` | Google ke liye pages ki list. Apne aap banti hai (582 pages). Haath se mat badlo. |
| Robots | `/robots.txt` | 1 | `src/app/robots.ts` | Google ko batata hai sab allowed hai aur sitemap kahan hai. |
| App manifest | `/manifest.webmanifest` | 1 | `src/app/manifest.ts` | Phone par "add to home screen" ki info. |
| Icons | `/favicon.ico`, `/icon.png`, `/apple-icon.png` | 3 | `src/app/favicon.ico`, `icon.png`, `apple-icon.png` | Browser tab ka chhota logo. |
| Social share images | `/og/locations/mumbai` | 568 location + blog + product | `src/app/og/locations/[slug]/route.tsx`, `src/app/og/blog/[slug]/route.tsx`, `src/app/products/[slug]/opengraph-image.tsx` | WhatsApp / LinkedIn par link share karne par dikhne wali image. Apne aap banti hai. |
| Purane link redirect | `/locations/india/maharashtra/mumbai` | har location ke liye 1 | `next.config.ts` (`redirects()`) | Purana nested URL ab naye `/data-logger-...` URL par 301 bhejta hai. Naye URL ke peeche ka internal route `/data-logger/[slug]` hai; wo kabhi public URL nahi hai. |
| Host redirect | `www.prithvidatalogger.com` | - | `src/proxy.ts` | www aur purana domain apex domain par bhejta hai. |

Ek aur zaroori baat: public URL hamesha `/data-logger-{slug}` hota hai (ek hi level). `next.config.ts` ka
`rewrites()` isse andar `/data-logger/[slug]` template tak pahunchata hai. Kabhi `/locations/...` jaisa nested link mat likho.
Links banane ke liye code mein `locationHref(path)` use hota hai (`src/data/locations.ts`, ye bas entry point hai; asli data `src/data/locations/` ke folders mein hai).

---

## 3. Hierarchy: country, state, city, area

```
Country hub          State / region hub        City                Area
/data-logger-india > /data-logger-maharashtra > /data-logger-mumbai > /data-logger-andheri
/data-logger-uae   > /data-logger-dubai-emirate > /data-logger-dubai > /data-logger-jebel-ali
```

Real examples:

- **India > Maharashtra > Mumbai > Andheri.** Mumbai ke 18 area pages hain (Andheri, Malad, Goregaon, Powai ...).
- **UAE > Dubai Emirate > Dubai > Jebel Ali.** Dubai ke 12 area pages hain (Jebel Ali, Al Quoz, Dubai Silicon Oasis ...).

**Parent kaise tay hota hai (data mein):**

- **Country, state, city:** har page ki apni file hai aur folder hi hierarchy hai. Parent = jis folder ke `index.ts` ki `children` list mein ye file import hui hai.
  Matlab `mumbai.ts` ko `src/data/locations/india/maharashtra/index.ts` list karta hai (Maharashtra ka `children`), aur Maharashtra ko `src/data/locations/india/index.ts` list karta hai.
- **Area:** `src/data/areas/<city>/<area>.ts` mein `citySlug: "mumbai"` likha hota hai. Wahi parent city hai (folder ka naam bhi wahi hai).
  Agar us slug ka city page nahi hai to area noindex ho jata hai.
- Hub page par neeche ke pages ki list `listing` (states ya cities) aur `areaListing` (areas) se aati hai. Ye hub ki apni file mein hai (`_state.ts` / `_country.ts`).

**Folder ka naksha (locations):** ek page = ek file. Naam seedhe slug se banta hai.

```
src/data/locations/
  _tree.ts                         <- saari countries ko jodta hai (naya country yahan)
  _types.ts, _helpers.ts           <- shared types aur helper code (mat chhuo)
  india/
    _country.ts                    <- /data-logger-india
    index.ts                       <- India + uske states ko jodta hai
    maharashtra/
      _state.ts                    <- /data-logger-maharashtra
      mumbai.ts                    <- /data-logger-mumbai
      pune.ts ...
      index.ts                     <- Maharashtra + uske cities ko jodta hai
    delhi/
      delhi-state.ts               <- /data-logger-delhi-state
      delhi-city.ts                <- /data-logger-delhi
      index.ts
src/data/products/    setu.ts nakshatra.ts rajmudra.ts dhruva.ts veer.ts virat.ts vayu.ts accessories.ts
src/data/industries/  chemical.ts pharmaceutical.ts ... (10 files)
src/data/services/    calibration.ts temperature-mapping.ts validation.ts _shared.ts
src/data/areas/
  _all.ts                          <- saare areas ki list (order yahin se tay hota hai)
  mumbai/andheri.ts                <- /data-logger-andheri
```

Naming rule: state ki file `_state.ts` hoti hai, country ki `_country.ts`, city ki `<slug>.ts`, area ki `<slug>.ts` (city ke folder mein).
Sirf jahan state aur city ka slug same hai (jaise Delhi, Chandigarh, Goa) wahan files `delhi-state.ts` aur `delhi-city.ts` kehlati hain.
Har file ki pehli line batati hai: URL, page type aur parent, jaise `// /data-logger-mumbai | City | parent: Maharashtra`.
`src/data/locations.ts` aur `src/data/areas.ts` ab sirf chhote entry-point files hain; inme data nahi badalna.

**URL ka naam:** URL mein bas slug aata hai, poora path nahi. Agar do pages ka slug same ho jaye to rule ye hai:
area ka naam badal kar `{slug}-industrial-area` ho jata hai, aur state ka `{slug}-state`
(jaise Delhi state = `/data-logger-delhi-state`, Delhi city = `/data-logger-delhi`). Ye apne aap hota hai. `npm run check:data` fail hota hai agar koi slug dobara aaya.

**Kaun se URLs `noindex` hain (23 pages) aur kyun:**

1. **19 state / region hubs** (abhi): India: `chandigarh-state`, `manipur`, `meghalaya`, `tripura`. Saudi: tabuk, hail, najran, al-baha, al-jawf, northern-borders. Qatar: umm-salal, al-shamal. Oman: musandam. Yemen: abyan, ibb, dhamar, marib, lahij, sadah.
   **Kyun:** state hub tabhi index hota hai jab uske neeche kam se kam **2 built pages** (cities + unke area pages) ho.
   Abhi in sab ke neeche sirf 1 page hai, isliye thin page se bachne ke liye noindex hai. Rule `MIN_STATE_HUB_PAGES = 2` hai, `src/data/locations/_tree.ts` mein.
   Jaise hi doosra page ban jata hai, hub **apne aap** index ho jata hai. Haath se kuch nahi karna.
2. **4 blog posts**: sab `draft: true` hain. Draft = abhi publish nahi, isliye noindex, sitemap mein nahi, aur blog list mein bhi nahi dikhte.
3. **404 page**: hamesha noindex.
4. **Koi bhi city** jis ke data mein `indexable: false` ho, ya **area** jiska `page.indexable` false ho ya jo quality checks (400 words, banned words, duplicate text) fail kare. Abhi aisa koi city ya area nahi hai (282 cities aur 188 areas sab indexable hain).

`vercel.app` wale preview address par poori site noindex rehti hai (`src/proxy.ts`), jab tak asli domain live nahi hota.

---

## 4. Kuch badalna ho to

**Har recipe ke baad ye checks chalao** (terminal mein, project folder mein):

| Check | Command | Kya pakadta hai |
|---|---|---|
| Lint | `npm run lint` | Code ki spelling / syntax galtiyan |
| Build | `npm run build` | Poori site bana kar dekhta hai; toota to yahin pata chalta hai |
| Data | `npm run check:data` | Duplicate slug, kam words, galat fields, prices, hero repeat |
| Meta | `npm run check:meta` | Title 60 se bada, description 155 se bada, duplicate title |
| Links | `npm run check:links` | Tuta hua internal link (build ke baad chalao) |
| Images | `npm run check:images` | Gayab image file |

`check:links` aur `check:meta` build ke **baad** chalte hain (wo built pages padhte hain). Order: lint, build, check:data, check:meta, check:images, check:links.
Pehle `npm run where -- <page>` se pata kar lo kaun si file kholni hai.

**Sabke liye common rules:** text ko quotes `"..."` ke andar rakho. Text ke andar `"` aaye to `\"` likho ya `'` use karo.
Har line ke baad comma `,` rehna chahiye. File mein kuch aur mat chhuo. Prices, "best", "No.1", "leading" kabhi mat likho.
Phone / email / address text mein mat likho (neeche recipe 9 dekho).

### Recipe 1: City ka intro ya FAQ badalna

1. `npm run where -- mumbai` chalao (ya VS Code mein `Ctrl+P` karke `mumbai` likho). Wo file batata hai: `src/data/locations/india/maharashtra/mumbai.ts`.
2. File kholo. Poori file isi ek city ki hai. Isme ye fields hain: `intro` (120 se 180 words), `climateAngle`, `faqs`.
3. `intro` ka text badlo. FAQ ke liye `faqs: [ { question: "...", answer: "..." }, ... ]` hai; har city mein **4** FAQs hone chahiye.
4. Save karo. Checks: lint, build, `check:data`, `check:meta`.
- **Sabse common galti:** doosre city ka text copy-paste. Har city ka text unique hona chahiye (Google duplicate se naraz hota hai). Doosri galti: quote ya comma tod dena.

### Recipe 2: Page title ya meta description badalna

Kaun si file, page type par depend karta hai:

| Page | File | Field |
|---|---|---|
| City | `src/data/locations/<country>/<state>/<city>.ts` | `metaTitle`, `metaDescription` |
| Area | `src/data/areas/<city>/<area>.ts` | `page.metaTitle`, `page.metaDescription` |
| Country / state hub | `src/data/location-content.ts`, `locationContent["india/maharashtra"]` | `metaDescription` (title naam se banta hai; naam ka "in ..." form `inName` field se) |
| Product | `src/data/products/<slug>.ts`, jaise `src/data/products/setu.ts` | `metaTitle`, `metaDescription` |
| Industry | `src/data/industries/<slug>.ts`, jaise `src/data/industries/chemical.ts` | `content.metaTitle`, `content.metaDescription` |
| Service | `src/data/services/<slug>.ts`, jaise `src/data/services/calibration.ts` | `content.metaTitle`, `content.metaDescription` |
| Blog post | `src/content/blog/<naam>.mdx`, upar `meta` block | `title` (ya `seoTitle`), `description` |
| Home, about, contact aur baaki core pages | `src/app/<page>/page.tsx` (home: `src/app/page.tsx`) | `buildMetadata({ title, description })` |

Checks: lint, build, `check:meta`.
- **Sabse common galti:** title 60 characters se lamba, ya description 155 se lamba. Har page ka title aur description alag hona chahiye. Aur "No.1", "best" jaise shabd mat likho.

### Recipe 3: Naya city jodna

1. Pata karo kaun si state mein aayega. `npm run where -- maharashtra` chalao; state ka folder dikhega (`src/data/locations/india/maharashtra/`).
2. Us folder mein ek milti-julti city ki file (jaise `pune.ts`) copy karke `nashik.ts` naam se save karo. Phir file ke andar har field badlo (pehli comment line bhi, jaise `// /data-logger-nashik | City | parent: Maharashtra`): `slug`, `name`, `type: "city"`, `indexable`, `intro`, `climateAngle`, `areas`, `industries`, `recommendedSeries` (exactly 3), `faqs` (4), `nearby`, `metaTitle`, `metaDescription`.
   - `slug` chhote akshar, hyphen se, poori site mein unique (jaise `nashik`).
   - Gulf (Saudi, UAE, ...) ke city mein `recommendedSeries` mein Vayu kabhi nahi.
3. Usi folder ki `index.ts` kholo: upar ek import line jodo (`import nashikCity from "./nashik.ts";`) aur `children: [ ... ]` list mein `nashikCity,` jodo. Bina iske page nahi banega.
   Phir state ki file `_state.ts` mein `listing: [ ... ]` mein ek line jodo: `{ slug: "nashik", text: "ek chhoti unique line" }`.
4. `src/data/page-heroes.ts` mein `CITY_REGISTRY` list mein naya slug jodo (hero photo ka pair isi list ke order se milta hai). Agar state ek "hub" hai to `HUB_OF` mein bhi us slug ko state ke saath jodo.
5. Jab text taiyar ho aur sab checks pass ho, tab `indexable: true` karo. Tab tak `false` rakho (noindex).
6. Checks: lint, build, `check:data`, `check:meta`, `check:links`.
- **Sabse common galti:** poori entry copy karke sirf naam badalna aur baaki text wahi rehna dena (duplicate). Doosri: slug jo pehle se kisi aur page ka hai. `check:data` dono pakad leta hai aur bata deta hai kya chhoota.

### Recipe 4: Kisi city ke andar naya area jodna

1. `src/data/areas/<city>/` folder mein (jaise `src/data/areas/mumbai/`) ek milti-julti area file copy karke naye naam se save karo (jaise `sion.ts`). Pehli comment line bhi badlo.
2. File ke andar fields: `slug` (unique), `name`, `citySlug` (jo city pehle se hai, jaise `"mumbai"`), `areaType`, `nearbyIndustries` (industry slugs), `confirmedService: true`, `hero: ["key1", "key2"]` (do logger keys; us city mein kisi aur page se same jodi na ho), aur `page: { ... }`.
3. `page` ke andar: `metaTitle` (60 tak), `metaDescription` (155 tak, "Get Solution" ke saath), `intro` (70 se 130 words), `places`, `industries`, `services`, `visits`, `approach`, `faqs` (optional), `nearby`, `indexable`.
   Poore page ka text kam se kam **400 words** aur us area ke liye unique hona chahiye. Prices, statistics, client names aur timelines mat likho.
4. `src/data/areas/_all.ts` kholo: upar import line jodo (`import sionArea from "./mumbai/sion.ts";`) aur `areas` list mein us city ke baaki areas ke saath `sionArea,` jodo. Agar naya city folder hai to `src/data/areas/_cities.ts` ki `areaCities` list mein us city ka naam bhi jodo.
5. State hub ki file (`_state.ts`, jaise `src/data/locations/india/maharashtra/_state.ts`) ke `areaListing` mein ek line jodo: `{ slug: "naya-area", text: "..." }`.
6. Checks: lint, build, `check:data`, `check:meta`, `check:links`.
- **Sabse common galti:** `citySlug` galat likhna ya text 400 words se kam rakhna. Tab page noindex ho jata hai aur `check:data` batata hai kyun.

### Recipe 5: Hero image badalna

Hero mein jo photos dikhti hain wo logger products ki photos hain (`public/images/products/...`). Pair `src/data/page-heroes.ts` se aata hai.

- **City page:** pair apne aap tay hota hai (`CITY_REGISTRY` ke order se). Alag pair chahiye to developer se pucho; ye list ka order badalne se baaki sab cities ka pair bhi badal sakta hai.
- **Area page:** `src/data/areas/<city>/<area>.ts` mein `hero: ["key1", "key2"]` badlo. Keys `src/data/page-heroes.ts` ke `deviceCatalogue` mein hain.
- **Core pages (about, contact, ...):** `src/data/page-heroes.ts` mein `pageHeroes` list, jaise `contact: ["dock"]`.
- **Home page ki badi photo:** `public/images/hero/home-hero.jpg` (file replace karo, same naam rakho), code `src/components/sections/home/Hero.tsx` aur `HeroVisual.tsx`.
- **Blog cover:** `.mdx` ke `meta` mein `cover`, aur file `public/images/blog/`.
- **Industry photo:** `public/images/industries/<slug>.webp` (ya `.jpg`).
- Naya image add karna ho to file `public/images/...` mein rakho (`.webp` best hai). Har image ka alt text zaroori hai.
- Checks: lint, build, `check:images`, `check:data`.
- **Sabse common galti:** same city ke do pages par same pair, ya file ka naam / extension galat likhna (image gayab dikhti hai).

### Recipe 6: Home page ka text badalna

1. Text ki list: `src/data/home.ts` (`hero`, aur uske neeche cards ki lists).
2. Title aur description: `src/app/page.tsx`.
3. Layout / sections ka order: `src/components/sections/home/*.tsx` (`Hero`, `WhatWeDo`, `Benefits`, `IndustriesGrid`, `WhyPrithvi`, `HowBuyingWorks`, `ClientsMarquee`, `ProductMarquee`, `HomeFaq`, `FinalCta`). Clients ke logos: `src/data/clients.ts` + `public/images/clients/`.
4. Checks: lint, build, `check:data`, `check:meta`.
- **Sabse common galti:** price, "best", "No.1", ya cloud software ka naam likh dena. `check:data` price pakad leta hai, baaki khud dhyan rakho.

### Recipe 7: Header ya footer badalna

1. Menu ke links: `src/data/navigation.ts` (`headerNav` header ke liye, `footerCompanyNav` footer ke liye).
2. Header ka design: `src/components/layout/Header.tsx` aur `HeaderNav.tsx`. Footer ka design aur text: `src/components/layout/Footer.tsx`. Logo: `src/components/ui/Logo.tsx`.
3. Neeche daayein ke floating WhatsApp / Call buttons: `src/components/layout/FloatingContact.tsx`.
4. Checks: lint, build, `check:links`, `check:meta`.
- **Sabse common galti:** header ka rang ya height badalna. Rule: header har page par solid white aur ek jaisi height ka rehta hai. Aur naye menu link mein galat URL (tab `check:links` fail hota hai).

### Recipe 8: Enquiry form ke fields badalna

1. File: `src/components/forms/EnquiryForm.tsx`. (Ye ek hi form hai; home, contact, about, product, service, city, area sab pages par yahi use hota hai. Ek jagah badlo, sab jagah badal jata hai.)
2. Dropdown / checkbox ke options upar hi hain: `INDUSTRY_OPTIONS`, `CONNECTIVITY_OPTIONS`, `COUNTRY_CODES`.
3. Naya field: (a) `Values` type mein naam jodo, (b) `useState` ki starting value mein jodo, (c) JSX mein input likho, (d) `onSubmit` ke `JSON.stringify({ ... })` mein jodo, aur `src/lib/enquiry-mail.ts` mein (`validateEnquiry` + `buildMail`) bhi; tabhi wo email mein dikhta hai. Required banana ho to `validate()` mein jodo (abhi sirf Full name, Phone aur privacy checkbox required hain).
4. Product dropdown ke naam `src/data/enquiry.ts` se aate hain (Get Solution button se product preselect hone ke liye).
5. **SMTP settings (`SMTP_*`, `ENQUIRY_TO`, `ENQUIRY_FROM`) code mein kabhi mat likho.** Ye sirf Vercel mein / `.env.local` mein rehti hain (server-side, `NEXT_PUBLIC_` ke bina). Form `/api/enquiry` (`src/app/api/enquiry/route.ts`) par post karta hai, wahi Zoho SMTP se mail bhejta hai. Test: `npm run test:enquiry`.
6. Checks: lint, build, `check:data` (prices ka check isi mein hai).
- **Sabse common galti:** input jod diya par `onSubmit` ke payload mein nahi jodha; tab email mein wo field nahi aayegi. Doosri: mobile par input ka font 16px se chhota kar dena (iPhone zoom karne lagta hai).

### Recipe 9: Phone, WhatsApp ya email badalna

1. Sirf ek file: `src/config/site.ts`.
2. Fields: `phone.display` (screen par dikhne wala), `phone.tel` (call ka number), `whatsapp` (`https://wa.me/...`), `email`, `address`.
3. Teeno (display, tel, whatsapp) saath mein badlo, warna call kuch aur lagega aur dikhega kuch aur.
4. Checks: lint, build, `check:data`, `check:links`.
- **Sabse common galti:** kisi page ya component mein number seedha likh dena. Contact details hamesha `site.ts` se aate hain, kahin aur likhoge to baad mein purana number reh jayega.

### Recipe 10: Domain badalna

1. `src/config/site.ts` mein `url` badlo. Sitemap, canonical links aur social share links isi se bante hain.
2. `src/proxy.ts`: ye `siteConfig.url` se domain nikalta hai. Isi file mein `REDIRECTED_HOSTS` (www aur purane domains jo apex par bhejne hain) update karo.
3. `src/components/forms/EnquiryForm.tsx` mein `SITE_HOST` (email subject mein dikhta hai) badlo.
4. `next.config.ts`, `scripts/check-links.mjs` aur `docs/LAUNCH-CHECKLIST.md` mein purana domain ho to wahan bhi dekho (`npm run where` nahi, ye text search se dhoondo).
5. Vercel mein naya domain connect karo aur environment variable `PRODUCTION_DOMAIN_LIVE=true` set karo (isse `*.vercel.app` naye domain par redirect hota hai).
6. Google Search Console mein naya domain verify karo (verification file: `public/googleaedf7419be008282.html`) aur sitemap `/sitemap.xml` dobara submit karo.
7. Email domain alag hai (`email` field `site.ts` mein); wo domain badalne se apne aap nahi badalta.
8. Checks: lint, build, `check:links`, `check:meta`.
- **Sabse common galti:** `SITE_HOST` ya `proxy.ts` ki list update karna bhool jana, aur purane domain ko naye par redirect na karna (Google ranking kho jati hai).

### Recipe 11: Page ko Google se chhupana (noindex) aur wapas lana

| Page | Chhupane ke liye | Wapas lane ke liye |
|---|---|---|
| City | `src/data/locations/<country>/<state>/<city>.ts`, `indexable: false` | `indexable: true` |
| Area | `src/data/areas/<city>/<area>.ts`, `page.indexable: false` | `page.indexable: true` (par page sab quality checks pass kare tabhi index hoga; `npm run where -- <area>` batata hai kyun nahi) |
| Blog post | `.mdx` ke `meta` mein `draft: true` | `draft: false` |
| State / region hub | Haath se nahi; ye apne aap tay hota hai (neeche 2 se kam pages = noindex) | Neeche ek aur page banao, hub apne aap index ho jayega |
| Country hub | `src/data/locations/<country>/_country.ts` mein `indexable: false` (sirf soch samajh kar; poore desh ka page chhup jata hai) | `true` |
| Product / industry / service / core pages | Koi switch nahi. Developer se code badalwana padega | - |

Noindex hone par page site par chalta rehta hai, bas Google ko "mat dikhao" bolta hai, aur `sitemap.xml` se apne aap hat jata hai.
Google ko asar dikhne mein kuch hafte lag sakte hain.
Checks: build, `check:data`, `check:meta`. Phir `npm run where -- <page>` chalao; "Indexable" line ab sahi honi chahiye.
- **Sabse common galti:** hub ko haath se true karna (wo apne aap overwrite ho jata hai), ya bina content poora kiye `indexable: true` kar dena.

### Recipe 12: Page delete karna

1. **Pehle sochlo:** agar page Google par pehle se hai, to delete karne se 404 aayega. Behtar hai pehle noindex (recipe 11), ya purane URL ko kisi doosre page par redirect karo. Redirect `next.config.ts` ke `redirects()` mein jodna hota hai; ye developer se karwao.
2. **City delete:**
   - Us city ki file hatao (jaise `src/data/locations/india/maharashtra/nashik.ts`), aur usi folder ki `index.ts` se uski import line aur `children` list ki entry hatao.
   - Us state ki `_state.ts` ke `listing` mein us city ki line hatao. Doosri cities ke `nearby` mein agar ye city hai to wahan se bhi.
   - `src/data/areas/<city>/` folder ke saare area files hatao, `src/data/areas/_all.ts` se unki imports aur list entries hatao, aur state ki `_state.ts` ke `areaListing` se unki lines.
   - `src/data/page-heroes.ts` ke `CITY_REGISTRY` (aur `HUB_OF`) se slug hatao. `src/data/keyword-pages.ts` mein ho to wahan se bhi.
3. **Area delete:** area file hatao (jaise `src/data/areas/mumbai/sion.ts`), `src/data/areas/_all.ts` se uski import aur list entry hatao, aur state ki `_state.ts` ke `areaListing` aur city file ke `areas[].linkTo` se uska zikr.
4. **Blog post:** `.mdx` file hatao (aur `public/images/blog/` ki cover image).
5. **Product / industry / service:** uski file hatao (`src/data/products/<slug>.ts`, `src/data/industries/<slug>.ts` ya `src/data/services/<slug>.ts`) aur `src/data/product-content.ts` / `industry-content.ts` / `service-content.ts` (aur industry ke liye `src/data/industries.ts`, service ke liye `src/data/services.ts`) se uski import line aur list entry hatao. Product ke liye `src/data/products.ts` mein uski series bhi hatani padegi. Saath mein menu (`src/data/navigation.ts`) aur doosre pages ke links dekho.
6. Checks: lint, build, `check:data`, `check:links`. `check:links` bata deta hai agar koi page abhi bhi hataye hue page ko link kar raha hai.
- **Sabse common galti:** entry hata di par hub ke `listing` ya kisi city ke `nearby` mein link reh gaya. Tab `check:links` fail hota hai. Doosri: area hatayi nahi par city hata di.

---

## 5. Folder map

Ye project ki asli files ka naksha hai. **Bold** wale folders aap sabse zyada khologe.

### Root (sabse upar)

| File | Kaam |
|---|---|
| `package.json` | Commands ki list (`npm run build`, `npm run where` ...) aur libraries. |
| `next.config.ts` | Site ke redirects (purane URLs), flat URL rewrite, MDX setting. |
| `eslint.config.mjs`, `tsconfig.json` | Code checking ki settings. Mat chhuo. |
| `CLAUDE.md`, `AGENTS.md` | AI assistant ke liye rules (brand, SEO, prices nahi, etc.). Ye project ke permanent rules hain. |
| `README.md` | Chhota intro aur docs ka link. |
| `.env.local.example` | Secret keys ka namuna. Asli keys Vercel mein / `.env.local` mein, kabhi git mein nahi. |
| `all-pages.csv` | Saare pages ki list (url, type, parent, indexable) reference ke liye. Ye apne aap update nahi hoti. Sach hamesha `npm run where -- --counts` / sitemap hai. |

### `src/` (poora code)

| Jagah | Kaam |
|---|---|
| **`src/app/`** | Pages ke templates. Har folder = ek URL (jaise `about/page.tsx` = `/about`). `[slug]` wale folder list se pages banate hain. |
| `src/app/layout.tsx` | Har page ka common frame: header, footer, fonts, default SEO. |
| `src/app/globals.css` | Rang, fonts, spacing ke tokens. Naye rang yahin se, component mein ad-hoc rang nahi. |
| `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` | Sitemap, robots, app manifest. Apne aap banti hain. |
| `src/app/not-found.tsx` | 404 page. |
| `src/app/og/`, `products/[slug]/opengraph-image.tsx` | Social share images ka code. |
| `src/app/data-logger/[slug]/page.tsx` | **Saare 568 location pages ka template** (hubs). City aur area ke layout `src/components/locations/` mein hain. |
| **`src/data/`** | **Saara text aur lists.** Zyadatar badlaav yahin hote hain. |
| `src/data/locations/` | **Har country, state aur city ki apni file**: `<country>/_country.ts`, `<country>/<state>/_state.ts`, `<country>/<state>/<city>.ts`. Har folder ka `index.ts` us level ke pages jodta hai. |
| `src/data/locations/_tree.ts`, `_types.ts`, `_helpers.ts` | Saari countries ko jodna, state-hub indexable rule, shared types aur URL helpers. Zyada tar mat chhuo. |
| `src/data/locations.ts` | Chhota entry point: baaki project isi se import karta hai. Data yahan nahi. |
| `src/data/areas/` | **Har area ki apni file**: `<city>/<area>.ts`. `_all.ts` saare areas ki list (order) hai; `_cities.ts`, `_types.ts`, `_rules.ts` shared hain. |
| `src/data/areas.ts` | Chhota entry point (data yahan nahi). |
| `src/data/location-content.ts` | Hubs ki meta description aur recommended products. |
| `src/data/products/` | **Har product ka apna page text**: `setu.ts`, `nakshatra.ts`, ... (8 files). `product-content.ts` inhe jodta hai. |
| `src/data/products.ts` | Products ki specs aur variants. Yahin MRP data bhi hai (site par kabhi nahi dikhta); isliye ye file aise hi rakhi gayi hai, split nahi ki. |
| `src/data/industries/` | **Har industry ki apni file**: `chemical.ts`, `pharmaceutical.ts`, ... (10 files; card data + page text). `industries.ts` aur `industry-content.ts` inhe jodte hain. |
| `src/data/services/` | **Har service ki apni file**: `calibration.ts`, `temperature-mapping.ts`, `validation.ts`, plus `_shared.ts` (VEGA details). `services.ts` aur `service-content.ts` inhe jodte hain. |
| `src/data/home.ts`, `company.ts`, `clients.ts` | Home page, company info, client logos ki list. |
| `src/data/navigation.ts` | Header aur footer ke links. |
| `src/data/enquiry.ts` | Enquiry form ke product dropdown ke options. |
| `src/data/page-heroes.ts` | Har page ki hero logger photos ki jodi. |
| `src/data/keyword-pages.ts` | Un location pages ki list jinpe keyword-map ka text pass ho chuka hai. |
| `src/data/placeholder-images.json` | Placeholder images ki list (`npm run placeholders` banata hai). |
| `src/config/site.ts` | **Phone, WhatsApp, email, address, domain.** Ye sirf yahin likhe jate hain. |
| **`src/components/`** | Page ke tukde (header, footer, form, cards, sections). Design badalna ho to yahan. |
| `src/components/forms/EnquiryForm.tsx` | Ek hi enquiry form, har page par. |
| `src/components/locations/` | `CityPage.tsx`, `AreaPage.tsx`, `WhereWeServe.tsx`. |
| `src/components/layout/` | `Header.tsx`, `Footer.tsx`, `FloatingContact.tsx`. |
| `src/components/sections/` | Hero, CTA band, home page ke sections. |
| `src/components/ui/` | Chhote building blocks: Button, Faq, Breadcrumbs, icons. |
| `src/components/seo/` | JSON-LD (structured data) aur preview-host noindex tag. |
| `src/content/blog/` | Blog posts, ek `.mdx` file per post. |
| `src/lib/` | Helper code: `seo.ts` (`buildMetadata`, title/description rules), `schema.ts` (JSON-LD), `blog.ts`, `areas.ts` (area indexable logic), `location-crumbs.ts`, `contact.ts`. |
| `src/proxy.ts` | Domain redirects (www, purana domain) aur preview par noindex. |
| `src/mdx-components.tsx` | Blog posts ke text ka style. |

### `scripts/` (checks aur helpers)

| File | Kaam |
|---|---|
| `check-data.mjs` | `npm run check:data`. Data rules (duplicate slugs, word count, prices, hero repeat). |
| `check-meta.mjs` | `npm run check:meta`. Built pages ke titles aur descriptions. |
| `check-links.mjs` | `npm run check:links`. Built pages ke saare internal links. |
| `check-images.mjs` | `npm run check:images`. Har use hui image file maujood hai ya nahi. |
| `generate-placeholders.mjs` | `npm run placeholders`. Placeholder images banata hai. |
| `where.mjs` | `npm run where -- <page>`. Page kahan rehta hai (sirf padhta hai). |

### `public/` (images aur files jo seedhe serve hoti hain)

| Folder | Kaam |
|---|---|
| `public/images/products/` | Logger aur accessory photos. |
| `public/images/hero/` | Home page ki badi hero photo. |
| `public/images/industries/` | Industry page ki photos. |
| `public/images/clients/`, `certificates/`, `founder/`, `logo/` | Client logos, NABL / ISO certificates, founder photo, brand logo. |
| `public/images/blog/` | Blog covers. |
| `public/images/og/` | Default social share image. |
| `public/googleaedf7419be008282.html` | Google Search Console verification. Delete mat karo. |

### `docs/`

| File | Kaam |
|---|---|
| `MASTER-BRIEF.md` | Content aur pages ka source of truth. |
| `LOCATION-PAGES-PLAYBOOK.md` | Location pages ka template, rules aur city data. |
| `LAUNCH-CHECKLIST.md` | Site live karne ka checklist. |
| `WHERE-PAGES-LIVE.md` | Ye file. |

### Jinhe kabhi haath se edit nahi karna

| Cheez | Kyun |
|---|---|
| `.next/` | Build ka output. Har build par naya ban jata hai. |
| `node_modules/` | Downloaded libraries. `npm install` banata hai. |
| `package-lock.json` | npm khud likhta hai. |
| `next-env.d.ts`, `tsconfig.tsbuildinfo` | Next.js / TypeScript ki auto files. |
| `out/`, `build/`, `coverage/` | Agar kabhi bane to wo bhi generated hain. |
| `sitemap.xml`, `robots.txt` (site par) | Code (`sitemap.ts`, `robots.ts`) se bante hain. Code ya data badlo, file nahi. |
| `src/data/placeholder-images.json` | `npm run placeholders` se banti hai. |
| `.git/` | Version history. |

---

## 6. Chhoti yaad-dihaani

- Kuch bhi tootne ka darr ho to pehle `git status` se dekho kya badla. Saari galtiyan `git` se wapas ho sakti hain.
- Deploy (push) tabhi karo jab saare 6 checks pass ho. Is project mein push developer / tumhari decision par hota hai, apne aap nahi hota.
- Page ka haal jaanna ho: `npm run where -- <page>`. Total counts dekhne ho: `npm run where -- --counts`.
