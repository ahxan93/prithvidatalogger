// Validates the data layer against docs/MASTER-BRIEF.md and CLAUDE.md rules.
//
//   npm run check:data
//
// Imports the TypeScript data files directly (Node type stripping); the data
// files therefore must not use "@/..." imports.

import fs from "node:fs";
import path from "node:path";
import { products, commonSpecs, monitoringFeatures, formatMrp, formatFromPrice } from "../src/data/products.ts";
import { industries } from "../src/data/industries.ts";
import { services } from "../src/data/services.ts";
import { locations, getAllLocations, needsGsmNetworkNote, GSM_NETWORK_NOTE } from "../src/data/locations.ts";
import { buildEnquiryOptions, CALIBRATION_MAPPING_OPTION, VALIDATION_OPTION } from "../src/data/enquiry.ts";
import * as company from "../src/data/company.ts";
import * as home from "../src/data/home.ts";
import { productContent } from "../src/data/product-content.ts";
import { industryContent } from "../src/data/industry-content.ts";
import { serviceContent } from "../src/data/service-content.ts";
import { locationContent, countryMarkers } from "../src/data/location-content.ts";
import { clients } from "../src/data/clients.ts";
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
const mustBeIndexable = ["india", "uae", "saudi-arabia", "qatar", "oman", "kuwait", "bahrain", "yemen", "maharashtra", "mumbai", "dubai"];
for (const slug of mustBeIndexable) {
  const loc = all.find((l) => l.node.slug === slug);
  if (!loc) fail(`locations: "${slug}" missing`);
  else if (!loc.node.indexable) fail(`locations: "${slug}" should be indexable (brief §7.9)`);
}
const countryNames = locations.map((l) => l.name);
for (const c of siteConfig.countriesServed) if (!countryNames.includes(c)) fail(`locations: country "${c}" from site.ts missing`);

const sentenceOwner = new Map();
for (const { node, path: p } of all) {
  const where = p.join("/");
  for (const d of dupes((node.children ?? []).map((c) => c.slug))) fail(`locations: duplicate child "${d}" under ${where}`);
  if (!node.indexable) continue;
  const words = node.intro.split(/\s+/).length;
  if (words < 40) fail(`locations: ${where} intro only ${words} words`);
  if (node.localIndustries.length < 3) fail(`locations: ${where} needs ≥3 local industries`);
  if (!node.citiesServed.length) fail(`locations: ${where} has no cities/areas`);
  if (node.faqs.length < 2) fail(`locations: ${where} needs ≥2 FAQs`);
  // No sentence may appear on two location pages (near-duplicate content).
  const texts = [node.intro, node.supportNote, ...node.faqs.flatMap((f) => [f.question, f.answer])];
  for (const sentence of texts.flatMap((t) => t.split(/(?<=[.?!])\s+/))) {
    const key = sentence.trim().toLowerCase();
    if (key.length < 25) continue;
    const owner = sentenceOwner.get(key);
    if (owner && owner !== where) fail(`locations: sentence shared by ${owner} and ${where}: "${sentence.trim()}"`);
    sentenceOwner.set(key, where);
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
  const text = [node.intro, node.supportNote, ...node.faqs.flatMap((f) => [f.question, f.answer])].join(" ");
  if (/mobile (coverage|network)|works wherever|reports wherever/i.test(text))
    fail(`decisions: ${p.join("/")} claims GSM works on local networks (not confirmed)`);
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
