// Validates the data layer against docs/MASTER-BRIEF.md and CLAUDE.md rules.
//
//   npm run check:data
//
// Imports the TypeScript data files directly (Node type stripping); the data
// files therefore must not use "@/..." imports.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { products, commonSpecs, monitoringFeatures, formatMrp, formatFromPrice } from "../src/data/products.ts";
import { industries } from "../src/data/industries.ts";
import { services } from "../src/data/services.ts";
import {
  locations, getAllLocations, needsGsmNetworkNote, GSM_NETWORK_NOTE, isCityPage,
  locationHref, locationFlatSlug, locationUrlProblems, allFlatSlugs, legacyLocationHref, LOCATION_URL_PREFIX,
  builtPagesUnder, MIN_STATE_HUB_PAGES,
} from "../src/data/locations.ts";
import { buildEnquiryOptions, CALIBRATION_MAPPING_OPTION, VALIDATION_OPTION } from "../src/data/enquiry.ts";
import * as company from "../src/data/company.ts";
import * as home from "../src/data/home.ts";
import { productContent } from "../src/data/product-content.ts";
import { industryContent } from "../src/data/industry-content.ts";
import { serviceContent } from "../src/data/service-content.ts";
import { locationContent, countryMarkers } from "../src/data/location-content.ts";
import { clients } from "../src/data/clients.ts";
import { blogCoverKey, cityHeroAssignments, deviceCatalogue, getBlogCoverDevice, pageHeroes } from "../src/data/page-heroes.ts";
import { areaCities, areaIssues, areas, areaTexts, countWords as areaWordCount } from "../src/data/areas.ts";
import { siteConfig } from "../src/config/site.ts";

const ROOT = path.join(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];
const errors = [];
const notes = [];
const warnings = [];
const fail = (msg) => errors.push(msg);

const imageExists = (base) => EXTENSIONS.some((e) => fs.existsSync(path.join(PUBLIC, `${base}${e}`)));
const dupes = (list) => list.filter((v, i) => list.indexOf(v) !== i);

// ---------------------------------------------------------------- products
const seriesSlugs = products.map((p) => p.slug);
const variantSlugs = products.flatMap((p) => p.variants.map((v) => v.slug));
for (const d of dupes(seriesSlugs)) fail(`products: duplicate series slug "${d}"`);
for (const d of dupes(variantSlugs)) fail(`products: duplicate variant slug "${d}"`);
if (products.some((p) => p.slug === "dhruv" || /\bDhruv\b/.test(JSON.stringify(p)))) fail('products: use "Dhruva", never "Dhruv"');

// Expected MRPs from brief §2 (null = Price on request).
const expectedMrp = {
  setu: 5500, "setu-x": 6500, "setu-pro": 8000, "setu-pro-x": 9000,
  nakshatra: 6500, "nakshatra-x": 7500, "nakshatra-pro": 10000, "nakshatra-pro-x": 11000,
  rajmudra: 12000, "rajmudra-pro": 15000, dhruva: 17000, "dhruva-pro": 19000,
  veer: 25000, "veer-pro": 30000, virat: 45000, "virat-pro": 50000,
  vayu: null, "vayu-pro": null, "external-hooter-with-door-sensor": null, "charging-dock": null,
};
for (const p of products) {
  if (p.category === "series" && !p.nameMeaning) fail(`products: ${p.slug} has no name meaning`);
  if (!p.headline || !p.summary || !p.bestFor) fail(`products: ${p.slug} missing headline/summary/bestFor`);
  for (const v of p.variants) {
    if (!(v.slug in expectedMrp)) fail(`products: unexpected variant "${v.slug}"`);
    else if (expectedMrp[v.slug] !== v.mrp) fail(`products: ${v.slug} MRP ${v.mrp} ≠ brief ${expectedMrp[v.slug]}`);
    // Own image or series fallback (same rule as src/lib/images.ts).
    if (!imageExists(`/images/products/${v.slug}`) && !imageExists(`/images/products/${p.slug}`))
      fail(`products: no image for ${v.slug} (own or series fallback)`);
    if (p.category === "series" && !v.tempRange) fail(`products: ${v.slug} has no temperature range`);
  }
  if ("compatibleAccessories" in p) fail(`products: ${p.slug} claims accessory compatibility (not confirmed, brief §1)`);
}
if (commonSpecs.length !== 8) fail(`products: commonSpecs should have 8 rows (has ${commonSpecs.length})`);
if (monitoringFeatures.length !== 10) fail(`products: monitoringFeatures should have 10 items (has ${monitoringFeatures.length})`);
if (formatMrp(6500) !== "MRP ₹6,500 + 18% GST") fail(`products: formatMrp(6500) = "${formatMrp(6500)}"`);
if (formatMrp(null) !== "Price on request") fail("products: formatMrp(null) wrong");
if (formatFromPrice(products.find((p) => p.slug === "setu")) !== "From MRP ₹5,500 + GST") fail("products: formatFromPrice(setu) wrong");

// ---------------------------------------------------------------- product page copy (brief §7.3)
const metaSeen = new Set();
for (const p of products) {
  const c = productContent[p.slug];
  if (!c) { fail(`product-content: no copy for ${p.slug}`); continue; }
  if (c.metaTitle.length > 60) fail(`product-content: ${p.slug} metaTitle is ${c.metaTitle.length} chars (max 60)`);
  if (c.metaDescription.length > 155) fail(`product-content: ${p.slug} metaDescription is ${c.metaDescription.length} chars (max 155)`);
  if (metaSeen.has(c.metaDescription)) fail(`product-content: ${p.slug} metaDescription is not unique`);
  metaSeen.add(c.metaDescription);
  if (c.faqs.length < 3 || c.faqs.length > 5) fail(`product-content: ${p.slug} has ${c.faqs.length} FAQs (3–5)`);
  if (c.keyFeatures.length < 3) fail(`product-content: ${p.slug} needs ≥3 key features`);
  if (c.intro.split(/\s+/).length < 20) fail(`product-content: ${p.slug} intro too short`);
  // Keyword rule (brief §5): primary keyword in the intro (first 100 words).
  const kw = p.seo?.primaryKeyword;
  if (kw && !c.intro.toLowerCase().replace(/-/g, " ").includes(kw.toLowerCase())) fail(`product-content: ${p.slug} intro lacks keyword "${kw}"`);
  // Prices quoted in copy must match the data.
  for (const m of `${c.metaDescription} ${c.intro}`.matchAll(/₹([\d,]+)/g)) {
    const amount = Number(m[1].replace(/,/g, ""));
    if (!p.variants.some((v) => v.mrp === amount)) fail(`product-content: ${p.slug} quotes ₹${m[1]} which is not a variant MRP`);
  }
}

// ---------------------------------------------------------------- industries
const refs = new Set([...seriesSlugs, ...variantSlugs]);
for (const d of dupes(industries.map((i) => i.slug))) fail(`industries: duplicate slug "${d}"`);
if (industries.length !== 10) fail(`industries: expected 10, found ${industries.length}`);
for (const i of industries) {
  if (i.applications.length < 3 || i.applications.length > 5) fail(`industries: ${i.slug} has ${i.applications.length} applications (3–5)`);
  if (!i.recommended.length) fail(`industries: ${i.slug} has no recommended products`);
  for (const r of i.recommended) if (!refs.has(r)) fail(`industries: ${i.slug} recommends unknown "${r}"`);
  if (!fs.existsSync(path.join(PUBLIC, i.image))) fail(`industries: ${i.slug} image missing (${i.image})`);
  if (!i.summary || i.whyItMatters.split(/\s+/).length < 25) fail(`industries: ${i.slug} summary/whyItMatters too short`);
}

// ---------------------------------------------------------------- industry + service page copy (brief §7.5–7.6)
const descSeen = new Set(Object.values(productContent).map((c) => c.metaDescription));
const uniqueDesc = (where, d) => {
  if (d.length > 155) fail(`${where}: meta description is ${d.length} chars (max 155)`);
  if (descSeen.has(d)) fail(`${where}: meta description is not unique`);
  descSeen.add(d);
};
for (const i of industries) {
  const c = industryContent[i.slug];
  if (!c) { fail(`industry-content: no copy for ${i.slug}`); continue; }
  uniqueDesc(`industry-content: ${i.slug}`, c.metaDescription);
  const title = `${i.name} Temperature Monitoring`;
  if (title.length > 60) fail(`industry-content: ${i.slug} title is ${title.length} chars (max 60)`);
  if (c.challenges.length !== 3) fail(`industry-content: ${i.slug} needs 3 challenges`);
  if (c.helps.length !== 3) fail(`industry-content: ${i.slug} needs 3 "helps" points`);
  if (c.faqs.length < 3 || c.faqs.length > 5) fail(`industry-content: ${i.slug} has ${c.faqs.length} FAQs (3–5)`);
  if (c.compliance.split(/\s+/).length < 12) fail(`industry-content: ${i.slug} compliance note too short`);
  // No timings or statistics in industry copy.
  if (/\b\d+\s*(hours?|days?|weeks?|%\s|percent)\b/i.test(JSON.stringify(c))) fail(`industry-content: ${i.slug} states a timing or statistic`);
}
for (const s of services) {
  const c = serviceContent[s.slug];
  if (!c) { fail(`service-content: no copy for ${s.slug}`); continue; }
  uniqueDesc(`service-content: ${s.slug}`, c.metaDescription);
  if (c.h1.length > 60) fail(`service-content: ${s.slug} h1/title is ${c.h1.length} chars (max 60)`);
  if (!c.intro.toLowerCase().replace(/[,]/g, "").includes(s.seo.primaryKeyword.toLowerCase().replace(" mumbai", "")))
    fail(`service-content: ${s.slug} intro lacks keyword "${s.seo.primaryKeyword}"`);
  if (c.process.length !== 4) fail(`service-content: ${s.slug} needs 4 process steps`);
  if (c.faqs.length < 3) fail(`service-content: ${s.slug} needs ≥3 FAQs`);
  if (!c.intro.includes("VEGA Calibrations")) fail(`service-content: ${s.slug} intro must say it is delivered by VEGA Calibrations`);
  // No timings in service copy (turnaround times are not confirmed).
  if (/\b\d+\s*(hours?|days?|weeks?|working days?)\b/i.test(JSON.stringify(c))) fail(`service-content: ${s.slug} states a timing`);
}

// ---------------------------------------------------------------- services
for (const s of services) {
  if (!fs.existsSync(path.join(ROOT, "src/app", s.href, "page.tsx"))) fail(`services: no page for ${s.href}`);
  if (!s.scope.length) fail(`services: ${s.slug} has no scope`);
  if (s.deliveredBy.url !== siteConfig.parentCompany.url) fail(`services: ${s.slug} must link to VEGA`);
}

// ---------------------------------------------------------------- locations
const all = getAllLocations();

// Location page data (brief §7.9): every node has a unique description and valid recommendations.
for (const { node, path: p } of all) {
  const key = p.join("/");
  if (isCityPage(node)) continue; // validated by the city-page rules below
  const c = locationContent[key];
  if (!c) { fail(`location-content: no entry for ${key}`); continue; }
  uniqueDesc(`location-content: ${key}`, c.metaDescription);
  const title = `Temperature Data Loggers in ${c.inName ?? node.name}`;
  if (title.length > 60) fail(`location-content: ${key} title is ${title.length} chars (max 60)`);
  if (c.recommended.length < 2) fail(`location-content: ${key} needs ≥2 recommended series`);
  for (const r of c.recommended) {
    const series = products.find((s) => s.slug === r);
    if (!series) fail(`location-content: ${key} recommends unknown series "${r}"`);
    // GSM network compatibility outside India is not confirmed (brief §1).
    else if (needsGsmNetworkNote(p) && series.connectivity.includes("gsm")) fail(`location-content: ${key} recommends a GSM series outside India`);
  }
}
for (const slug of Object.keys(countryMarkers)) if (!locations.some((l) => l.slug === slug)) fail(`location-content: map marker for unknown country "${slug}"`);
for (const l of locations) if (!countryMarkers[l.slug]) fail(`location-content: no map marker for ${l.slug}`);
const mustBeIndexable = ["india", "uae", "saudi-arabia", "qatar", "oman", "kuwait", "bahrain", "yemen", "maharashtra", "mumbai"];
for (const slug of mustBeIndexable) {
  const loc = all.find((l) => l.node.slug === slug);
  if (!loc) fail(`locations: "${slug}" missing`);
  else if (!loc.node.indexable) fail(`locations: "${slug}" should be indexable (brief §7.9)`);
}
const countryNames = locations.map((l) => l.name);
for (const c of siteConfig.countriesServed) if (!countryNames.includes(c)) fail(`locations: country "${c}" from site.ts missing`);

// ---------------------------------------------------------------- location URLs
// Every location page lives at one flat URL, /data-logger-{slug}. The data tree
// stays hierarchical. A city and an area that share a slug are told apart by
// the -industrial-area suffix on the area; any slug still duplicated fails.
{
  for (const problem of locationUrlProblems()) fail(`location-urls: ${problem}`);
  for (const slug of allFlatSlugs()) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`location-urls: "${slug}" is not a lowercase-hyphen slug`);
  }
  const hrefs = new Map();
  for (const { path: p } of all) {
    const href = locationHref(p);
    if (hrefs.has(href)) fail(`location-urls: ${p.join("/")} and ${hrefs.get(href)} share ${href}`);
    hrefs.set(href, p.join("/"));
  }
  for (const a of areas) {
    const city = all.find((l) => l.node.type === "city" && l.node.slug === a.citySlug);
    if (!city) continue;
    const p = [...city.path, a.slug];
    const href = locationHref(p);
    if (hrefs.has(href)) fail(`location-urls: area ${p.join("/")} and ${hrefs.get(href)} share ${href}`);
    hrefs.set(href, p.join("/"));
  }
  notes.push(`location-urls: ${hrefs.size} flat URLs, no duplicate slugs`);
}

/** Every piece of copy that is unique to a node (shared template blocks excluded). */
const uniqueTexts = (node) =>
  isCityPage(node)
    ? [
        node.intro,
        node.climateAngle,
        ...node.areas.map((a) => a.note),
        ...node.industries.map((i) => i.sentence),
        ...node.recommendedSeries.map((r) => r.reason),
        ...node.faqs.flatMap((f) => [f.question, f.answer]),
      ]
    : [
        node.intro,
        node.supportNote,
        ...node.faqs.flatMap((f) => [f.question, f.answer]),
        ...(node.listing ?? []).map((l) => l.text),
        ...(node.areaListing ?? []).map((l) => l.text),
      ];
const wordCount = (texts) => texts.join(" ").split(/\s+/).filter(Boolean).length;

const sentenceOwner = new Map();
for (const { node, path: p } of all) {
  const where = p.join("/");
  for (const d of dupes((node.children ?? []).map((c) => c.slug))) fail(`locations: duplicate child "${d}" under ${where}`);
  // A city not built to the playbook template cannot be indexable (playbook section 3).
  if (node.type === "city" && !isCityPage(node) && node.indexable)
    fail(`locations: ${where} is a city not built to the playbook template, so it must be indexable: false`);
  if (!node.indexable) continue;
  if (!isCityPage(node)) {
    const words = node.intro.split(/\s+/).length;
    if (words < 40) fail(`locations: ${where} intro only ${words} words`);
    if (node.localIndustries.length < 3) fail(`locations: ${where} needs ≥3 local industries`);
    if (!node.citiesServed.length) fail(`locations: ${where} has no cities/areas`);
    if (node.faqs.length < 2) fail(`locations: ${where} needs ≥2 FAQs`);
  }
  // No sentence may appear on two location pages (near-duplicate content).
  const texts = uniqueTexts(node);
  for (const sentence of texts.flatMap((t) => t.split(/(?<=[.?!])\s+/))) {
    const key = sentence.trim().toLowerCase();
    if (key.length < 25) continue;
    const owner = sentenceOwner.get(key);
    if (owner && owner !== where) fail(`locations: sentence shared by ${owner} and ${where}: "${sentence.trim()}"`);
    sentenceOwner.set(key, where);
  }
}

// ---------------------------------------------------------------- hub pages (playbook section 7)
// Country and state hubs: an original regional intro, a short unique line for
// every built child page (and, on state hubs, every written area page), their
// own FAQs and enough unique copy. A hub may be indexable only if it passes.
{
  const hubBanned = [
    [/no\.?\s?1/i, '"No.1"'],
    [/best(?!\s+for)/i, '"best"'],
    [/leading/i, '"leading"'],
    [/guarantee/i, '"guaranteed"'],
    [/within\s+(\d+|a few|\w+)\s+(hours?|days?|minutes?|weeks?)/i, '"within X hours/days"'],
    [/\d[\d,]*\+?\s+(customers|clients|companies|businesses)/i, "customer counts"],
    [/get\s+a\s+quote/i, '"Get a Quote"'],
    [/₹|MRP|GST|price[sd]?/i, "a price"],
    [/trinetra/i, "Trinetra"],
  ];
  const hubIssues = (loc) => {
    const { node, path: p } = loc;
    const out = [];
    const introWords = node.intro.split(/\s+/).length;
    if (introWords < 100 || introWords > 150) out.push(`intro is ${introWords} words (100–150)`);
    const maxFaqs = 3;
    if (node.faqs.length < 2 || node.faqs.length > maxFaqs) out.push(`has ${node.faqs.length} FAQs (2–3)`);
    if (node.type === "country" && node.faqs.length !== 3) out.push("a country hub needs exactly 3 FAQs");
    const unique = wordCount(uniqueTexts(node));
    if (unique < 250) out.push(`unique body is ${unique} words (min 250)`);
    const listing = node.listing ?? [];
    // A child counts as built when it is indexable, or (a noindex state under India) has live cities.
    const liveChildren = (node.children ?? []).filter((c) => c.indexable || (c.children ?? []).some((g) => g.indexable));
    const listed = new Set(listing.map((l) => l.slug));
    for (const c of liveChildren) {
      const flat = locationFlatSlug([...p, c.slug]);
      if (!listed.has(flat)) out.push(`does not describe its built page "${flat}"`);
    }
    for (const l of listing) {
      const child = liveChildren.find((c) => locationFlatSlug([...p, c.slug]) === l.slug);
      if (!child) out.push(`describes "${l.slug}", which is not a built child page`);
      if (l.text.split(/\s+/).length < 10) out.push(`description of "${l.slug}" is too short`);
    }
    // Written, indexable areas under this hub's cities.
    const under = [];
    if (node.type === "state") {
      for (const a of areas) {
        if (!a.page) continue;
        const city = all.find((x) => x.node.type === "city" && x.node.slug === a.citySlug);
        if (!city || city.path.slice(0, p.length).join("/") !== p.join("/")) continue;
        if (areaIssues(a, [], areas).length === 0 && a.page.indexable) under.push(locationFlatSlug([...city.path, a.slug]));
      }
    }
    const areaListed = new Set((node.areaListing ?? []).map((l) => l.slug));
    for (const slug of under) if (!areaListed.has(slug)) out.push(`does not describe its area page "${slug}"`);
    for (const l of node.areaListing ?? []) {
      if (!under.includes(l.slug)) out.push(`describes "${l.slug}", which is not a built area page under it`);
      if (l.text.split(/\s+/).length < 8) out.push(`description of area "${l.slug}" is too short`);
    }
    const c = locationContent[p.join("/")];
    if (!c || !/Get Solution/.test(c.metaDescription)) out.push('meta description must say "Get Solution"');
    const copy = [...uniqueTexts(node), c?.metaDescription ?? ""].join(" ");
    for (const [re, label] of hubBanned) if (re.test(copy)) out.push(`uses banned wording ${label}`);
    if (/vayu/i.test(copy) && p[0] !== "india") out.push("mentions Vayu outside India");
    if (/NABL|accredit|ISO\s?\/?(IEC )?\d{4,5}/i.test(copy)) out.push("makes an accreditation claim");
    if (new RegExp("\bour\s+" + node.name + "\s+office\b", "i").test(copy)) out.push("claims a local office");
    return { out, unique };
  };
  for (const loc of all) {
    if (isCityPage(loc.node)) continue;
    const { out, unique } = hubIssues(loc);
    const where = loc.path.join("/");
    if (loc.node.indexable) {
      for (const issue of out) fail(`hub: ${where} is indexable but ${issue}`);
      notes.push(`hub ${where}: ${unique} unique words`);
    } else if (out.length === 0) {
      notes.push(`hub ${where} passes every hub check but is noindex`);
    }
  }
}

// A state hub with fewer than two built child pages (indexable cities plus written
// area pages) must be noindex, and it is indexable again by itself once it has two
// or more. `indexable` on a state is derived in src/data/locations.ts; this checks it.
{
  for (const loc of all) {
    if (loc.node.type !== "state") continue;
    const built = builtPagesUnder(loc.node);
    const where = loc.path.join("/");
    if (built < MIN_STATE_HUB_PAGES && loc.node.indexable) fail(`hub: ${where} has ${built} built page(s) (min ${MIN_STATE_HUB_PAGES}) so it must be noindex`);
    if (built >= MIN_STATE_HUB_PAGES && !loc.node.indexable) fail(`hub: ${where} has ${built} built pages so it must be indexable again`);
    if (built < MIN_STATE_HUB_PAGES) notes.push(`hub ${where}: noindex until it has ${MIN_STATE_HUB_PAGES} built pages (has ${built})`);
  }
}

// ---------------------------------------------------------------- city pages (playbook section 3)
// Every rule in docs/LOCATION-PAGES-PLAYBOOK.md "Quality checks", applied to each
// indexable city built to the template. (Sentence reuse is checked above.)
const cityDescSeen = new Set();
const CITY_SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const cityBanned = [
  [/\bno\.?\s?1\b/i, '"No.1"'],
  [/\bbest\b(?!\s+for\b)/i, '"best"'],
  [/guarantee/i, '"guaranteed"'],
  [/within\s+(\d+|a few|\w+)\s+(hours?|days?|minutes?|weeks?)/i, '"within X hours/days"'],
  [/\b\d[\d,]*\+?\s+(customers|clients|companies|businesses)\b/i, "customer counts"],
  [/get a quote/i, '"Get a Quote"'],
  [/₹|\bMRP\b|\bGST\b|\bprice[sd]?\b/i, "a price"],
];
/** Visible text of an HTML fragment (scripts, styles and tags removed). */
const visibleText = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/\s+/g, " ");
const cityResults = [];
for (const { node, path: p } of all) {
  if (!isCityPage(node)) continue;
  const where = p.join("/");
  const isIndia = p[0] === "india";
  const f = (msg) => fail(`city: ${where} ${msg}`);

  if (!node.indexable) { notes.push(`city ${where} is noindex (not published)`); continue; }
  if (!CITY_SLUG.test(node.slug)) f(`slug "${node.slug}" must be lowercase-hyphen`);
  const introWords = node.intro.split(/\s+/).length;
  if (introWords < 120 || introWords > 180) f(`intro is ${introWords} words (120–180)`);
  if (!/temperature data logger/i.test(node.intro.split(/\s+/).slice(0, 100).join(" ")))
    f("primary keyword 'temperature data logger' missing from the first 100 words of the intro");
  if (!node.climateAngle || node.climateAngle.split(/\s+/).length < 15) f("climateAngle missing or too short");
  if (node.areas.length < 3 || node.areas.some((a) => !a.name || a.note.split(/\s+/).length < 12)) f("needs ≥3 areas, each with a name and a one-line note");
  for (const a of node.areas) {
    if (!a.linkTo) continue;
    const target = allFlatSlugs().includes(a.linkTo) ? a.linkTo : undefined;
    const targetNode = all.find((l) => locationFlatSlug(l.path) === a.linkTo);
    const targetArea = areas.find((x) => x.slug === a.linkTo && x.page);
    if (!target || (!targetNode && !targetArea)) f(`area card "${a.name}" links to "${a.linkTo}", which has no page`);
  }
  if (node.industries.length < 3 || node.industries.length > 5) f(`has ${node.industries.length} industries (3–5)`);
  for (const i of node.industries) {
    if (!industries.some((x) => x.slug === i.slug)) f(`industry "${i.slug}" has no industry page`);
    if (i.sentence.split(/\s+/).length < 12) f(`industry "${i.slug}" sentence is too short`);
  }
  if (node.recommendedSeries.length !== 3) f(`recommends ${node.recommendedSeries.length} series (exactly 3)`);
  for (const r of node.recommendedSeries) {
    const series = products.find((x) => x.slug === r.slug);
    if (!series) { f(`recommends unknown series "${r.slug}"`); continue; }
    if (!isIndia && (series.connectivity.includes("gsm") || /\bvayu\b/i.test(r.reason))) f(`recommends Vayu/GSM series "${r.slug}" outside India`);
    if (r.reason.split(/\s+/).length < 10) f(`series "${r.slug}" reason is too short`);
  }
  if (node.faqs.length !== 4) f(`has ${node.faqs.length} FAQs (exactly 4)`);
  if (node.nearby.length < 2 || node.nearby.length > 4) f(`has ${node.nearby.length} nearby cities (2–4)`);
  for (const n of node.nearby) {
    if (n.slug === node.slug) f("lists itself as nearby");
    if (!CITY_SLUG.test(n.slug) || !n.name) f(`nearby "${n.slug}" is malformed`);
    if (!all.some((l) => l.node.slug === n.slug)) notes.push(`city ${where}: nearby "${n.name}" has no page yet (shown unlinked)`);
  }
  // Cluster: a state hub above it.
  // Indian cities sit under a state hub; GCC cities directly under their country hub.
  const parentNode = all.find((l) => l.path.join("/") === p.slice(0, -1).join("/"));
  // Saudi Arabia is grouped by administrative region (a state-level hub); other GCC countries list cities directly.
  const expectedParents = isIndia ? ["state"] : p[0] === "saudi-arabia" || p[0] === "yemen" ? ["country", "state"] : ["country"];
  if (!parentNode || !expectedParents.includes(parentNode.node.type)) f(`is not under a ${expectedParents.join(" or ")} hub`);
  // SEO settings.
  const title = node.metaTitle;
  if (title.length > 60) f(`metaTitle is ${title.length} chars (max 60)`);
  if (!title.includes(node.name) || !/Data Loggers in /.test(title)) f('metaTitle must read "[Temperature] Data Loggers in {City} | Prithvi"');
  if (node.metaDescription.length > 155) f(`metaDescription is ${node.metaDescription.length} chars (max 155)`);
  if (!node.metaDescription.includes(node.name) || !/Get Solution/.test(node.metaDescription)) f('metaDescription must name the city and say "Get Solution"');
  if (cityDescSeen.has(node.metaDescription)) f("metaDescription is not unique");
  cityDescSeen.add(node.metaDescription);
  // Unique body words (shared template blocks are not in the data, so not counted).
  const uniqueWords = wordCount(uniqueTexts(node));
  if (uniqueWords < 600) f(`unique body is ${uniqueWords} words (min 600)`);
  if (uniqueWords > 1100) f(`unique body is ${uniqueWords} words (max 1,100)`);
  cityResults.push({ where, uniqueWords });
  // Banned wording in the city's own copy.
  const copy = [...uniqueTexts(node), node.metaTitle, node.metaDescription].join(" ");
  for (const [re, label] of cityBanned) if (re.test(copy)) f(`uses banned wording ${label}`);
  if (node.slug !== "mumbai" && new RegExp(`\\bour\\s+${node.name}\\s+office\\b`, "i").test(copy)) f('claims a local office ("our ' + node.name + ' office")');
}
for (const r of cityResults) notes.push(`city ${r.where}: ${r.uniqueWords} unique words`);

// Rendered check (needs a prior build, like the price scan): each indexable city
// page must have all 12 template sections, one H1, JSON-LD and the cluster links.
{
  // Breadcrumbs sit inside the hero, so "hero" precedes "breadcrumbs" in the HTML.
  const SECTIONS = ["hero", "breadcrumbs", "intro", "areas", "industries", "products", "services", "process", "why", "faqs", "nearby", "enquiry"];
  const APP_DIR = path.join(ROOT, ".next/server/app");
  for (const { node, path: p } of all) {
    if (!isCityPage(node) || !node.indexable) continue;
    const where = p.join("/");
    const file = path.join(APP_DIR, "data-logger", locationFlatSlug(p)) + ".html";
    if (!fs.existsSync(file)) { notes.push(`city ${where}: rendered checks skipped (run npm run build first)`); continue; }
    const html = fs.readFileSync(file, "utf8");
    const f = (msg) => fail(`city-render: ${where} ${msg}`);
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) f(`has ${h1s} <h1> elements (exactly 1)`);
    const found = [...html.matchAll(/data-city-section="([a-z]+)"/g)].map((m) => m[1]);
    const missing = SECTIONS.filter((x) => !found.includes(x));
    if (missing.length) f(`is missing template sections: ${missing.join(", ")}`);
    if (found.length !== new Set(found).size) f("repeats a template section");
    if (found.join() !== SECTIONS.join()) f(`sections are out of order (${found.join(" > ")})`);
    if (!/<input[^>]*type="hidden"[^>]*name="city"[^>]*value="/.test(html) && !new RegExp(`name="city"[^>]*value="${node.name}"`).test(html)) f("has no hidden city field in the enquiry form");
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
      try { return JSON.parse(m[1].replace(/\\u003c/g, "<")); } catch { f("has invalid JSON-LD"); return {}; }
    });
    const types = ld.flatMap((d) => (d["@graph"] ?? [d]).map((x) => x["@type"]));
    for (const t of ["BreadcrumbList", "Service", "FAQPage"]) if (!types.includes(t)) f(`JSON-LD lacks ${t}`);
    const service = ld.find((d) => d["@type"] === "Service");
    if (service) {
      const expected = p.join("/") === "india/maharashtra/mumbai" ? "LocalBusiness" : "Organization";
      if (service.provider?.["@type"] !== expected) f(`Service provider must be ${expected} (LocalBusiness only for Mumbai)`);
      if (!Array.isArray(service.areaServed) || !service.areaServed.some((a) => a.name === node.name)) f("Service areaServed must name the city");
    }
    // Cluster links.
    const main = (html.match(/<main[\s\S]*<\/main>/) ?? [html])[0];
    const hrefs = [...main.matchAll(/href="([^"#?]+)/g)].map((m) => m[1]);
    const stateHref = locationHref(p.slice(0, -1));
    if (!hrefs.includes(stateHref)) f(`does not link to its parent hub ${stateHref}`);
    // The GSM compatibility note is stored once (GSM_NETWORK_NOTE) and shown on every non-India page.
    const noteCount = visibleText(main).split(GSM_NETWORK_NOTE).length - 1;
    if (needsGsmNetworkNote(p) && noteCount !== 1) f(`must show the GSM compatibility note exactly once (found ${noteCount})`);
    if (!needsGsmNetworkNote(p) && noteCount !== 0) f("shows the GSM compatibility note on an India page");
    if (new Set(hrefs.filter((h) => h.startsWith("/industries/") && h !== "/industries/")).size < 3) f("links to fewer than 3 industry pages");
    if (new Set(hrefs.filter((h) => /^\/products\/[a-z-]+$/.test(h))).size < 3) f("links to fewer than 3 product pages");
    for (const svc of services) if (!hrefs.includes(svc.href)) f(`does not link to ${svc.href}`);
    // Sibling links: every nearby city that has a live page must be linked.
    for (const n of node.nearby) {
      // A nearby entry is a live city page, or failing that a live country page (Bahrain);
      // a state hub that shares the city's slug (Delhi, Goa) does not count.
      const sib =
        all.find((l) => isCityPage(l.node) && l.node.slug === n.slug && l.node.indexable) ??
        all.find((l) => l.path.length === 1 && l.node.slug === n.slug && l.node.indexable);
      if (sib && !hrefs.includes(locationHref(sib.path))) f(`does not link to nearby city ${n.slug}`);
    }
    // Banned wording in what visitors actually see.
    const visible = visibleText(main);
    for (const [re, label] of cityBanned) if (re.test(visible)) f(`rendered page uses banned wording ${label}`);
  }
}

// ---------------------------------------------------------------- content rules
const dataText = JSON.stringify({ products, industries, services, locations, company, home, productContent, industryContent, serviceContent, locationContent });
const banned = [
  [/\bno\.?\s?1\b/i, '"No.1"'],
  // "Best for X" is an established neutral label across the site (products.ts
  // bestFor, the brands page), not a superlative claim — excluded here.
  [/\bbest\b(?!\s+for\b)/i, '"best"'],
  [/\bleading\b/i, '"leading"'],
  [/\bguarantee/i, '"guarantee"'],
  [/21 CFR (Part 11 )?certified/i, '"21 CFR certified"'],
  [/lorem ipsum/i, "lorem ipsum"],
  [/\b\d+\s?\+\s+(facilities|devices|customers|clients)/i, "unconfirmed statistics"],
  [/\b12 years\b/i, '"12 years" (conflicts with 2016 founding)'],
  [/\bwarranty\b/i, "warranty claims"],
  [/within (seconds|minutes|hours|\d+)/i, "a timing claim (not confirmed)"],
  [/compatible with (all|any|every)|with any series|works with (all|every|any)/i, "accessory compatibility claim (not confirmed)"],
];
for (const [re, label] of banned) if (re.test(dataText)) fail(`content: banned wording ${label} found in data`);

// Contact details only in site.ts.
const digits = siteConfig.phone.tel.replace(/\D/g, "").slice(-10);
for (const file of fs.readdirSync(path.join(ROOT, "src/data"))) {
  const text = fs.readFileSync(path.join(ROOT, "src/data", file), "utf8");
  if (text.replace(/\D/g, " ").includes(digits) || text.includes(siteConfig.email) || text.includes("Jaswanti"))
    fail(`content: contact details hard-coded in src/data/${file}`);
}
if (siteConfig.showStats !== false) fail("site: showStats must stay false until the owner confirms numbers");

// ---------------------------------------------------------------- owner decisions (brief §1)
// GSM network compatibility outside India is not confirmed: no coverage claims there.
for (const { node, path: p } of all) {
  if (!needsGsmNetworkNote(p)) continue;
  const text = uniqueTexts(node).join(" ");
  if (/mobile (coverage|network)|works wherever|reports wherever/i.test(text))
    fail(`decisions: ${p.join("/")} claims GSM works on local networks (not confirmed)`);
}
// Yemen (owner decision): every page is neutral, says nothing about operating status and carries the case-by-case line.
{
  const yemenTexts = [
    ...all.filter((l) => l.path[0] === "yemen" && l.path.length > 1).map((l) => ({ where: l.path.join("/"), text: uniqueTexts(l.node).join(" ") })),
    ...areas
      .filter((a) => a.page && all.some((l) => l.path[0] === "yemen" && l.node.type === "city" && l.node.slug === a.citySlug))
      .map((a) => ({ where: `area ${a.citySlug}/${a.slug}`, text: areaTexts(a.page).join(" ") })),
  ];
  const political = /\b(government|authorit(?:y|ies)|controlled|military|security|border|rebels?|conflict|war|sanctions?|blockade|army|navy|militia)\b/i;
  const status = /\b(?:currently|at present|right now|now)\s+(?:open|closed|operat\w*|handl\w*)|\bis (?:open|closed)\b|\bre-?open\w*|\boperating status\b/i;
  for (const { where, text } of yemenTexts) {
    if (!/case[- ]by[- ]case/i.test(text)) fail(`yemen: ${where} lacks the case-by-case line`);
    const m = text.match(political);
    if (m) fail(`yemen: ${where} uses non-neutral wording "${m[0]}"`);
    const s = text.match(status);
    if (s) fail(`yemen: ${where} states operating status ("${s[0]}")`);
  }
}
if (GSM_NETWORK_NOTE !== "GSM versions are available. Contact us to confirm network compatibility for your country.")
  fail("decisions: GSM_NETWORK_NOTE wording changed");
const mumbai = all.find((l) => l.node.slug === "mumbai")?.node;
if (!mumbai?.faqs.some((f) => f.answer.includes("Please call ahead to book a visit")))
  fail('decisions: Mumbai must say visits are by appointment ("Please call ahead to book a visit")');
// Enquiry options: services must preselect an option that exists in the form.
const optionValues = buildEnquiryOptions(products).map((o) => o.value);
for (const opt of [CALIBRATION_MAPPING_OPTION, VALIDATION_OPTION])
  if (!optionValues.includes(opt)) fail(`decisions: enquiry option "${opt}" missing`);
for (const s of services)
  if (!optionValues.includes(s.enquiryOption)) fail(`services: ${s.slug} enquiryOption "${s.enquiryOption}" not in form options`);

// ---------------------------------------------------------------- company
if (!company.founder.name.includes("Ashwin Masurkar")) fail("company: founder name");
if (company.framework.length !== 7) fail("company: framework must have 7 stages");
if (imageExists(company.founder.photo)) notes.push("founder photo found");
else fail(`company: founder photo not found at ${company.founder.photo}.*`);

// ---------------------------------------------------------------- blog (brief §7.10)
// Posts are .mdx, not .ts, so they can't be imported directly here (the MDX
// loader only exists inside Next's build). The frontmatter is still plain JS,
// so it's extracted and evaluated directly from the source text.
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const blogSlugs = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")) : [];
const requiredTitles = [
  "What Is a Temperature Data Logger and How Does It Work?",
  "WiFi vs GSM vs LoRa Data Loggers: Which One Should You Choose?",
  "Temperature Mapping vs Temperature Monitoring: What's the Difference?",
  "Why NABL Calibration Matters for Your Data Loggers",
];
const foundTitles = [];
const blogWordCounts = [];

for (const file of blogSlugs) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const start = raw.indexOf("export const meta = ");
  if (start === -1) { fail(`blog: ${file} has no "export const meta = {...}"`); continue; }
  const braceStart = raw.indexOf("{", start);
  let depth = 0, end = -1;
  for (let i = braceStart; i < raw.length; i++) {
    if (raw[i] === "{") depth++;
    else if (raw[i] === "}") { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  if (end === -1) { fail(`blog: ${file} meta object is not closed`); continue; }
  let meta;
  try {
    meta = new Function(`return (${raw.slice(braceStart, end)});`)();
  } catch (e) {
    fail(`blog: ${file} meta object does not parse: ${e.message}`);
    continue;
  }

  const seoTitle = meta.seoTitle ?? meta.title;
  if (seoTitle.length > 60) fail(`blog: ${slug} <title> is ${seoTitle.length} chars (max 60) — add a shorter "seoTitle"`);
  uniqueDesc(`blog: ${slug}`, meta.description);
  if (meta.author !== "Ashwin Masurkar") fail(`blog: ${slug} author must be "Ashwin Masurkar"`);
  // reviewedBy/reviewedDate are optional: the "Reviewed by" line only ever shows
  // once published, and only when reviewed by someone other than the author.
  if ("reviewedBy" in meta || "reviewedDate" in meta) {
    if (!meta.reviewedBy || !meta.reviewedDate) fail(`blog: ${slug} must set both reviewedBy and reviewedDate, or neither`);
    else {
      if (meta.reviewedBy === meta.author) fail(`blog: ${slug} reviewedBy equals author — omit both fields instead of defaulting to the author`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.reviewedDate)) fail(`blog: ${slug} reviewedDate must be an ISO date (YYYY-MM-DD)`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) fail(`blog: ${slug} date must be an ISO date (YYYY-MM-DD)`);
  else {
    // Published posts must carry their real publish date (owner decision, Phase 6 follow-up).
    const days = (Date.now() - new Date(`${meta.date}T00:00:00Z`).getTime()) / 86400000;
    if (meta.draft === false && days < 0) fail(`blog: ${slug} date is in the future for a published post`);
    else if (meta.draft === false && days > 7) warnings.push(`blog: ${slug} is published with a date ${Math.floor(days)} days old — confirm "date" is the real publish date`);
  }
  if (meta.cover !== `/images/blog/${slug}`) fail(`blog: ${slug} cover should be "/images/blog/${slug}" (no extension)`);
  if (!fs.existsSync(path.join(PUBLIC, "images/blog")) || !EXTENSIONS.some((e) => fs.existsSync(path.join(PUBLIC, `images/blog/${slug}${e}`))))
    fail(`blog: ${slug} has no cover image under public/images/blog/`);
  if (!Array.isArray(meta.tags) || meta.tags.length === 0) fail(`blog: ${slug} needs ≥1 tag`);
  if (!Array.isArray(meta.summary) || meta.summary.length < 3 || meta.summary.length > 5)
    fail(`blog: ${slug} needs 3–5 summary bullets (has ${meta.summary?.length ?? 0})`);
  if (typeof meta.draft !== "boolean") fail(`blog: ${slug} draft must be true or false`);
  if (meta.draft !== true) fail(`blog: ${slug} must ship as draft: true until the owner approves it (brief §7.10)`);
  // Internal links: 2–3 relevant product/industry/service pages per post (brief §7.10).
  const body = raw.slice(end);
  const internalLinks = [...body.matchAll(/\]\((\/[a-z0-9/-]+)\)/g)].map((m) => m[1]);
  if (internalLinks.length < 2) fail(`blog: ${slug} has only ${internalLinks.length} internal link(s), needs 2–3`);
  const words = body.replace(/[#>*_`[\]()-]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  blogWordCounts.push(`${slug}=${words}`);
  if (words < 900 || words > 1400) fail(`blog: ${slug} is ${words} words (brief §7.10 asks for 900–1400)`);

  foundTitles.push(meta.title);
}
for (const title of requiredTitles)
  if (!foundTitles.includes(title)) fail(`blog: missing the first draft titled "${title}" (brief §7.10)`);
if (blogSlugs.length !== 4) fail(`blog: expected the 4 first drafts, found ${blogSlugs.length} post(s)`);

// Same content rules as the rest of the site (banned wording, no hard-coded contact details).
for (const file of blogSlugs) {
  const text = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  for (const [re, label] of banned) if (re.test(text)) fail(`blog: ${file} uses banned wording ${label}`);
  if (text.replace(/\D/g, " ").includes(digits) || text.includes(siteConfig.email) || text.includes("Jaswanti"))
    fail(`blog: ${file} hard-codes contact details (link to /contact instead)`);
}

// ---------------------------------------------------------------- clients
for (const c of clients) if (!fs.existsSync(path.join(PUBLIC, c.logo))) fail(`clients: logo missing ${c.logo}`);

// ---------------------------------------------------------------- no prices in rendered output
// Owner decision: no prices anywhere on the site while siteConfig.showPrices
// is false. Scans the built output (if present) for a leaked price string in
// any actually-rendered page — the static HTML, and the RSC/flight payloads
// used for client navigation. Requires `npm run build` to have run first;
// silently skipped otherwise so `check:data` still works pre-build.
if (!siteConfig.showPrices) {
  const BUILD_APP_DIR = path.join(ROOT, ".next/server/app");
  if (fs.existsSync(BUILD_APP_DIR)) {
    const PRICE_PATTERN = /₹|\bMRP\b|\bGST\b/;
    const SCAN_EXTENSIONS = new Set([".html", ".rsc", ".body", ".meta"]);
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
          const text = fs.readFileSync(full, "utf8");
          const match = text.match(PRICE_PATTERN);
          if (match) fail(`prices: "${match[0]}" found in built output ${path.relative(ROOT, full)} (showPrices is false)`);
        }
      }
    };
    walk(BUILD_APP_DIR);
  } else {
    notes.push("price scan skipped (run npm run build first to check rendered output)");
  }
}

// The CTA wording is "Get Solution" (CLAUDE.md). "Get a Quote" must not come
// back in source, content, docs, or any rendered page.
{
  const CTA_BANNED = /get\s+a\s+quote/i;
  const scanTree = (dir, exts) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scanTree(full, exts);
      else if (exts.has(path.extname(entry.name)) && entry.name !== "LOCATION-PAGES-PLAYBOOK.md") {
        // (the playbook itself names the banned phrase in its own banned-wording list)
        const match = fs.readFileSync(full, "utf8").match(CTA_BANNED);
        if (match) fail(`cta: "${match[0]}" found in ${path.relative(ROOT, full)} (use "Get Solution")`);
      }
    }
  };
  const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".mdx", ".css"]);
  scanTree(path.join(ROOT, "src"), SOURCE_EXTENSIONS);
  scanTree(path.join(ROOT, "docs"), SOURCE_EXTENSIONS);
  const claudeMd = path.join(ROOT, "CLAUDE.md");
  if (fs.existsSync(claudeMd) && CTA_BANNED.test(fs.readFileSync(claudeMd, "utf8"))) {
    fail('cta: "Get a Quote" found in CLAUDE.md (use "Get Solution")');
  }
  scanTree(path.join(ROOT, ".next/server/app"), new Set([".html", ".rsc", ".body", ".meta"]));
}

// ---------------------------------------------------------------- area pages (src/data/areas.ts)
// Country > State > City > Area. A page that claims to be indexable must pass
// every check; the build also gates this at render time, so a failing page is
// noindex and out of the sitemap, but it must not silently claim otherwise.
{
  const otherTexts = all.flatMap((l) => uniqueTexts(l.node));
  const pairOf = (keys) => [...keys].sort().join("+");
  const heroOwner = new Map();
  const slugsSeen = new Set();
  for (const a of areas) {
    const where = `${a.citySlug}/${a.slug}`;
    const f = (msg) => fail(`area: ${where} ${msg}`);
    if (slugsSeen.has(where)) f("is a duplicate");
    slugsSeen.add(where);
    if (a.confirmedService !== true) f("has no confirmed service");
    if (!areaCities[a.citySlug]) f(`has unknown city "${a.citySlug}"`);
    for (const i of a.nearbyIndustries) if (!industries.some((x) => x.slug === i)) f(`lists unknown industry "${i}"`);
    if (a.hero.length !== 2 || a.hero[0] === a.hero[1] || a.hero.some((k) => !deviceCatalogue[k])) f("needs a pair of two different known logger photos");
    // A logger pair only has to be unique within its own city: area pages of one city must
    // differ from each other and from the city page's pair. (Every pair is already taken
    // somewhere in the country, so a site-wide rule would cap the number of area pages.)
    const key = pairOf(a.hero);
    const ownerKey = `${a.citySlug}|${key}`;
    if (heroOwner.has(ownerKey)) f(`shares its hero pair with ${heroOwner.get(ownerKey)} in the same city`);
    heroOwner.set(ownerKey, where);
    const cityHero = cityHeroAssignments().find((c) => c.slug === a.citySlug);
    if (cityHero && pairOf(cityHero.keys) === key) f(`repeats the hero pair of its city page "${a.citySlug}"`);
    if (!a.page) continue;
    const city = all.find((l) => l.node.type === "city" && l.node.slug === a.citySlug);
    if (!city) f(`has a page but its city "${a.citySlug}" is not in the location tree`);
    for (const n of a.page.nearby) if (!areas.some((x) => x.slug === n && x.page)) f(`links to "${n}", which has no page`);
    const issues = areaIssues(a, otherTexts, areas);
    notes.push(`area ${where}: ${areaWordCount(areaTexts(a.page))} unique words${a.page.indexable ? "" : " (noindex)"}`);
    if (a.page.indexable && issues.length) for (const i of issues) f(`is marked indexable but ${i}`);
  }
}

// Rendered check for area pages (needs a prior build).
{
  const SECTIONS = ["hero", "breadcrumbs", "overview", "places", "industries", "services", "visits", "nearby", "enquiry"];
  const APP_DIR = path.join(ROOT, ".next/server/app");
  const otherTexts = all.flatMap((l) => uniqueTexts(l.node));
  for (const a of areas) {
    if (!a.page) continue;
    const city = all.find((l) => l.node.type === "city" && l.node.slug === a.citySlug);
    if (!city) continue;
    const where = [...city.path, a.slug].join("/");
    const file = path.join(APP_DIR, "data-logger", locationFlatSlug(where.split("/"))) + ".html";
    if (!fs.existsSync(file)) { notes.push(`area ${where}: rendered checks skipped (run npm run build first)`); continue; }
    const html = fs.readFileSync(file, "utf8");
    const f = (msg) => fail(`area-render: ${where} ${msg}`);
    const passes = a.page.indexable && areaIssues(a, otherTexts, areas).length === 0;
    const robots = (html.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? "";
    if (passes && /noindex/.test(robots)) f("passes every check but renders noindex");
    if (!passes && !/noindex/.test(robots)) f("fails a check but is not noindex");
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) f(`has ${h1s} <h1> elements (exactly 1)`);
    const found = [...html.matchAll(/data-area-section="([a-z]+)"/g)].map((m) => m[1]);
    // An area page may carry an FAQ section (between "visits" and "nearby"); it is optional.
    const expectedSections = a.page.faqs?.length ? [...SECTIONS.slice(0, 7), "faqs", ...SECTIONS.slice(7)] : SECTIONS;
    if (found.join() !== expectedSections.join()) f(`sections are ${found.join(" > ")} (expected ${expectedSections.join(" > ")})`);
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
      try { return JSON.parse(m[1].replace(/\\u003c/g, "<")); } catch { f("has invalid JSON-LD"); return {}; }
    });
    const types = ld.flatMap((d) => (d["@graph"] ?? [d]).map((x) => x["@type"]));
    for (const t of ["BreadcrumbList", "Service"]) if (!types.includes(t)) f(`JSON-LD lacks ${t}`);
    if (types.includes("LocalBusiness")) f("has a LocalBusiness (only the Mumbai city page may)");
    const svc = ld.find((d) => d["@type"] === "Service");
    if (svc && !(svc.areaServed ?? []).some((x) => (x.name ?? "").startsWith(a.name))) f("Service areaServed must name the area");
    const main = (html.match(/<main[\s\S]*<\/main>/) ?? [html])[0];
    const hrefs = [...main.matchAll(/href="([^"#?]+)/g)].map((m) => m[1]);
    const cityHref = locationHref(city.path);
    if (!hrefs.includes(cityHref)) f(`does not link to its parent city ${cityHref}`);
    const nearbyLinked = a.page.nearby.filter((n) => hrefs.includes(locationHref([...city.path, n])));
    if (a.page.nearby.length && !nearbyLinked.length) f("links to none of its nearby areas");
    for (const svcPage of services) if (!hrefs.includes(svcPage.href)) f(`does not link to ${svcPage.href}`);
    if (!/<input[^>]*type="hidden"[^>]*name="city"/.test(html)) f("has no hidden city field in the enquiry form");
    // Outside India the GSM compatibility note is shown exactly once and no Vayu/GSM series is named.
    const areaNotes = visibleText(main).split(GSM_NETWORK_NOTE).length - 1;
    if (needsGsmNetworkNote(city.path) && areaNotes !== 1) f(`must show the GSM compatibility note exactly once (found ${areaNotes})`);
    if (!needsGsmNetworkNote(city.path) && areaNotes !== 0) f("shows the GSM compatibility note on an India page");
    if (needsGsmNetworkNote(city.path) && a.hero.some((k) => k.startsWith("vayu"))) f("shows Vayu outside India");
  }
}

// Rendered check: a state hub below the two-page minimum is "noindex, follow" and
// out of the sitemap; one at or above it is indexable and in the sitemap.
{
  const APP_DIR = path.join(ROOT, ".next/server/app");
  const sitemapFile = path.join(APP_DIR, "sitemap.xml.body");
  if (fs.existsSync(APP_DIR) && fs.existsSync(sitemapFile)) {
    const sitemap = fs.readFileSync(sitemapFile, "utf8");
    for (const loc of all) {
      if (loc.node.type !== "state") continue;
      const flat = locationFlatSlug(loc.path);
      const file = path.join(APP_DIR, "data-logger", flat + ".html");
      if (!fs.existsSync(file)) continue;
      const robots = (fs.readFileSync(file, "utf8").match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? "";
      const inSitemap = sitemap.includes(`/${LOCATION_URL_PREFIX}${flat}<`);
      const where = loc.path.join("/");
      if (!loc.node.indexable) {
        if (!/noindex/.test(robots) || !/follow/.test(robots) || /nofollow/.test(robots)) fail(`hub-render: ${where} must render "noindex, follow" (found "${robots}")`);
        if (inSitemap) fail(`hub-render: ${where} is noindex but is in the sitemap`);
      } else {
        if (/noindex/.test(robots)) fail(`hub-render: ${where} is indexable but renders noindex`);
        if (!inSitemap) fail(`hub-render: ${where} is indexable but missing from the sitemap`);
      }
    }
  }
}

// Rendered/config check for the flat location URLs (needs a prior build).
{
  const APP_DIR = path.join(ROOT, ".next/server/app");
  const manifestFile = path.join(ROOT, ".next/routes-manifest.json");
  if (!fs.existsSync(APP_DIR) || !fs.existsSync(manifestFile)) {
    notes.push("location-urls: redirect and link checks skipped (run npm run build first)");
  } else {
    const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
    const redirects = new Map((manifest.redirects ?? []).map((r) => [r.source, r]));
    const known = [
      ...all.map((l) => l.path),
      ...areas.flatMap((a) => {
        const city = all.find((l) => l.node.type === "city" && l.node.slug === a.citySlug);
        return a.page && city ? [[...city.path, a.slug]] : [];
      }),
    ];
    for (const p of known) {
      const r = redirects.get(legacyLocationHref(p));
      if (!r) fail(`location-urls: no redirect from ${legacyLocationHref(p)}`);
      else if (r.statusCode !== 301 || r.destination !== locationHref(p)) {
        fail(`location-urls: ${legacyLocationHref(p)} must 301 to ${locationHref(p)} (found ${r.statusCode} to ${r.destination})`);
      }
    }
    // No rendered page may link to, or declare, an old nested location URL.
    const legacy = /(?:^|[^a-z0-9-])\/locations\/[a-z0-9]+[^<]{0,80}/;
    const visit = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) visit(full);
        else if (entry.name.endsWith(".html")) {
          const m = fs.readFileSync(full, "utf8").match(legacy);
          if (m) fail(`location-urls: old nested URL in ${path.relative(APP_DIR, full)}: ${m[0].slice(0, 120)}`);
        }
      }
    };
    visit(APP_DIR);
    // Canonical of every location page is its flat URL.
    for (const slug of allFlatSlugs()) {
      const file = path.join(APP_DIR, "data-logger", slug + ".html");
      if (!fs.existsSync(file)) continue;
      const canonical = (fs.readFileSync(file, "utf8").match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1];
      const expected = new URL(`/${LOCATION_URL_PREFIX}${slug}`, siteConfig.url).toString();
      if (canonical !== expected) fail(`location-urls: ${slug} canonical is ${canonical}, expected ${expected}`);
    }
  }
}

// ---------------------------------------------------------------- hero visuals (src/data/page-heroes.ts)
{
  const pair = (keys) => [...keys].sort().join("+");
  for (const [id, keys] of Object.entries(pageHeroes))
    for (const k of keys) {
      const d = deviceCatalogue[k];
      if (!d) fail(`heroes: page "${id}" uses unknown device "${k}"`);
      else if (!fs.existsSync(path.join(PUBLIC, d.src))) fail(`heroes: page "${id}" photo missing (${d.src})`);
    }
  const pagePairs = new Map(Object.entries(pageHeroes).filter(([, k]) => k.length === 2).map(([id, k]) => [pair(k), id]));
  // A pair is unique site-wide. The one exception: once all pairs are taken, a city in a state hub
  // (HUB_OF in page-heroes.ts) may reuse a pair as long as no other city in the SAME hub shows it.
  const seen = new Map();
  for (const c of cityHeroAssignments()) {
    if (c.keys.length !== 2 || c.keys[0] === c.keys[1]) fail(`heroes: city "${c.slug}" needs two different photos`);
    const key = pair(c.keys);
    for (const prev of seen.get(key) ?? []) {
      if (!c.hub || prev.hub === c.hub) fail(`heroes: cities "${prev.slug}" and "${c.slug}" share the same hero combination`);
      else notes.push(`heroes: "${c.slug}" (${c.hub}) reuses the pair of "${prev.slug}", which is outside that hub`);
    }
    seen.set(key, [...(seen.get(key) ?? []), { slug: c.slug, hub: c.hub }]);
    if (pagePairs.has(key)) fail(`heroes: city "${c.slug}" repeats the hero of page "${pagePairs.get(key)}"`);
    // GSM models are never shown on GCC pages (network compatibility is not confirmed).
    if (c.region === "gcc" && c.keys.some((k) => k.startsWith("vayu"))) fail(`heroes: GCC city "${c.slug}" shows a Vayu photo`);
    for (const k of c.keys) if (!deviceCatalogue[k]) fail(`heroes: city "${c.slug}" uses unknown device "${k}"`);
  }
  // Every blog post has a cover photo of its own.
  const covers = new Map();
  for (const file of blogSlugs) {
    const slug = file.replace(/.mdx$/, "");
    const device = getBlogCoverDevice(slug);
    if (!device || !fs.existsSync(path.join(PUBLIC, device.src))) fail(`heroes: blog post "${slug}" has no cover photo`);
    if (!blogCoverKey(slug)) fail(`heroes: blog post "${slug}" has no entry in blogCovers (pick the most relevant photo)`);
    if (covers.has(device.src)) fail(`heroes: blog posts "${covers.get(device.src)}" and "${slug}" share a cover`);
    covers.set(device.src, slug);
  }
}

// ---------------------------------------------------------------- accreditation wording
// VEGA Calibrations' NABL / ISO status is not stated as a current fact until the
// owner confirms the certificates (siteConfig.certificatesValid). While it is
// false, no rendered page outside the blog (an explainer on what NABL means)
// may mention NABL, ISO 17025, ISO 9001 or "accredited".
if (!siteConfig.certificatesValid) {
  const APP = path.join(ROOT, ".next/server/app");
  if (fs.existsSync(APP)) {
    const claim = /\bNABL\b|ISO\/IEC 17025|ISO 17025|ISO 9001|accredit/i;
    const visit = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (path.relative(APP, full).split(path.sep)[0] === "blog") continue;
          visit(full);
        } else if (entry.name.endsWith(".html")) {
          const html = fs.readFileSync(full, "utf8");
          // Visible text and metadata only: skip scripts (RSC payload) and styles.
          const text = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ");
          const m = text.match(claim);
          if (m) fail(`accreditation: "${m[0]}" on ${path.relative(APP, full)} while certificatesValid is false`);
        }
      }
    };
    visit(APP);
  } else {
    notes.push("accreditation scan skipped (run npm run build first)");
  }
}

// ---------------------------------------------------------------- internal links
// A broken link, missing #anchor, redirecting link or non-live domain fails the
// build. Needs a prior build (like the price scan); run `npm run check:links`
// on its own for the full report.
if (fs.existsSync(path.join(ROOT, ".next", "BUILD_ID"))) {
  const links = spawnSync(
    process.execPath,
    ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", path.join(ROOT, "scripts", "check-links.mjs"), "--no-build"],
    { cwd: ROOT, encoding: "utf8" },
  );
  if (links.status !== 0) {
    const detail = `${links.stdout ?? ""}${links.stderr ?? ""}`.trim().split("\n").slice(-25).join("\n");
    fail(`links: internal link check failed\n${detail}`);
  } else {
    notes.push((links.stdout ?? "").split("\n").find((l) => l.includes("crawled")) ?? "internal links OK");
  }
} else {
  notes.push("link check skipped (run npm run build first)");
}

// ---------------------------------------------------------------- report
console.log(`products: ${products.length} series, ${variantSlugs.length} variants/accessories`);
console.log(`industries: ${industries.length} | services: ${services.length} | clients: ${clients.length}`);
console.log(`locations: ${all.length} nodes, ${all.filter((l) => l.node.indexable).length} indexable`);
console.log(`blog: ${blogSlugs.length} post(s) (${blogWordCounts.join(", ")})`);
for (const n of notes) console.log(`note: ${n}`);
for (const w of warnings) console.warn(`warn: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\nData layer OK.");
