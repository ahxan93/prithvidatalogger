// Read-only helper: tells you where a page lives in the code.
//
//   npm run where -- /data-logger-mumbai      (a path)
//   npm run where -- mumbai                   (a bare slug)
//   npm run where -- https://prithvidatalogger.com/industries/chemical   (a full URL)
//   npm run where -- --counts                 (how many pages of each type)
//
// It only reads files. It never writes anything and is not part of lint or build.
// Imports the TypeScript data files directly (Node type stripping), so the data
// files must not use "@/..." imports (same rule as scripts/check-data.mjs).

import fs from "node:fs";
import path from "node:path";
import { products } from "../src/data/products.ts";
import { industries } from "../src/data/industries.ts";
import { services } from "../src/data/services.ts";
import { productContent } from "../src/data/product-content.ts";
import { industryContent } from "../src/data/industry-content.ts";
import { serviceContent } from "../src/data/service-content.ts";
import { locationContent } from "../src/data/location-content.ts";
import {
  getAllLocations, isCityPage, locationHref, locationFlatSlug,
  builtPagesUnder, MIN_STATE_HUB_PAGES, LOCATION_URL_PREFIX,
} from "../src/data/locations.ts";
import { areas, areaIssues } from "../src/data/areas.ts";
import { siteConfig } from "../src/config/site.ts";

const ROOT = path.join(import.meta.dirname, "..");
const read = (file) => {
  try {
    return fs.readFileSync(path.join(ROOT, file), "utf8");
  } catch {
    return "";
  }
};

// ------------------------------------------------------------------ helpers
const ALL = getAllLocations();

/** Same text list as otherLocationTexts() in src/lib/areas.ts (needed for the area checks). */
function nodeTexts(node) {
  if (isCityPage(node)) {
    return [
      node.intro, node.climateAngle,
      ...node.areas.map((a) => a.note),
      ...node.industries.map((i) => i.sentence),
      ...node.recommendedSeries.map((r) => r.reason),
      ...node.faqs.flatMap((f) => [f.question, f.answer]),
    ];
  }
  return [
    node.intro, node.supportNote,
    ...node.faqs.flatMap((f) => [f.question, f.answer]),
    ...(node.listing ?? []).map((l) => l.text),
    ...(node.areaListing ?? []).map((l) => l.text),
  ];
}
let otherTexts;
const cityOf = (area) => ALL.find((l) => l.node.type === "city" && l.node.slug === area.citySlug);
function areaProblems(area) {
  otherTexts ??= ALL.flatMap((l) => nodeTexts(l.node));
  const problems = areaIssues(area, otherTexts);
  if (!cityOf(area)) problems.push(`parent city "${area.citySlug}" has no page`);
  return problems;
}
const areaIndexable = (area) => Boolean(area.page?.indexable) && areaProblems(area).length === 0;
const writtenAreas = () =>
  areas.flatMap((area) => {
    const city = cityOf(area);
    return area.page && city ? [{ area, path: [...city.path, area.slug] }] : [];
  });

/** First line number of `slug: "x",` on its own line (the node itself, not a nearby: {...} mention). */
function lineOf(file, slug, nextHint) {
  const lines = read(file).split("\n");
  const re = new RegExp(`^\\s*slug: "${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",\\s*$`);
  for (let i = 0; i < lines.length; i++) {
    if (!re.test(lines[i])) continue;
    if (!nextHint || lines.slice(i, i + 8).some((l) => l.includes(nextHint))) return i + 1;
  }
  return undefined;
}
const at = (file, line) => (line ? `${file} (around line ${line})` : file);

/** The per-page data file of a country / state / city node (files live in src/data/locations/<country>/<state>/). */
function nodeFile(pth, node) {
  const dir = pth.length === 1 ? base : pth.slice(0, -1).join("/");
  const candidates =
    node.type === "country"
      ? [`src/data/locations/${pth[0]}/_country.ts`]
      : node.type === "state"
        ? [`src/data/locations/${dir}/${node.slug}/_state.ts`, `src/data/locations/${dir}/${node.slug}/${node.slug}-state.ts`]
        : [`src/data/locations/${dir}/${node.slug}.ts`, `src/data/locations/${dir}/${node.slug}-city.ts`];
  return candidates.find((c) => fs.existsSync(path.join(ROOT, c))) ?? candidates[0];
}
/** The index file that lists this node (add / remove / reorder a page there). */
function listedIn(pth) {
  if (pth.length === 1) return "src/data/locations/_tree.ts";
  if (pth.length === 2) return `src/data/locations/${pth[0]}/index.ts`;
  return `src/data/locations/${pth[0]}/${pth[1]}/index.ts`;
}

/** buildMetadata() in src/lib/seo.ts: adds " | Prithvi Data Loggers" only if the result stays within 60 characters. */
function finalTitle(title, absolute = false) {
  const suffixed = `${title} | ${siteConfig.name}`;
  return !absolute && suffixed.length <= 60 ? suffixed : title;
}

/** Reads title / description out of a page file that calls buildMetadata({ ... }) directly. */
function metaFromPageFile(file) {
  const text = read(file);
  const block = text.slice(text.indexOf("buildMetadata({"));
  const title = block.match(/title:\s*"([^"]*)"/)?.[1];
  const description = block.match(/description:\s*(?:\n\s*)?"([^"]*)"/)?.[1];
  return { title, description, absolute: /absoluteTitle:\s*true/.test(block) };
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

const CORE_PAGES = {
  "/": "src/app/page.tsx",
  "/about": "src/app/about/page.tsx",
  "/brands": "src/app/brands/page.tsx",
  "/products": "src/app/products/page.tsx",
  "/industries": "src/app/industries/page.tsx",
  "/services": "src/app/services/page.tsx",
  "/global-presence": "src/app/global-presence/page.tsx",
  "/locations": "src/app/locations/page.tsx",
  "/blog": "src/app/blog/page.tsx",
  "/contact": "src/app/contact/page.tsx",
  "/privacy-policy": "src/app/privacy-policy/page.tsx",
  "/terms": "src/app/terms/page.tsx",
};

function blogSlugs() {
  try {
    return fs.readdirSync(path.join(ROOT, "src/content/blog")).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, "")).sort();
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------- every URL we know
// { url, kind } for each page, used to match what you typed and to suggest close names.
function allPages() {
  const pages = Object.keys(CORE_PAGES).map((url) => ({ url, slug: url.slice(1) || "home", kind: "core" }));
  for (const p of products) pages.push({ url: `/products/${p.slug}`, slug: p.slug, kind: "product" });
  for (const i of industries) pages.push({ url: `/industries/${i.slug}`, slug: i.slug, kind: "industry" });
  for (const s of services) pages.push({ url: s.href, slug: s.slug, kind: "service" });
  for (const s of blogSlugs()) pages.push({ url: `/blog/${s}`, slug: s, kind: "blog" });
  for (const l of ALL) pages.push({ url: locationHref(l.path), slug: locationFlatSlug(l.path), kind: "location", path: l.path });
  for (const w of writtenAreas()) pages.push({ url: locationHref(w.path), slug: locationFlatSlug(w.path), kind: "location", path: w.path });
  return pages;
}

// ---------------------------------------------------------------- input
function normalise(input) {
  let s = input.trim();
  try {
    if (/^https?:\/\//i.test(s)) s = new URL(s).pathname;
  } catch {
    /* keep as typed */
  }
  // Git Bash turns "/data-logger-x" into "C:/Program Files/Git/data-logger-x"; undo that.
  s = s.replace(/^[A-Za-z]:[\/]Program Files[\/]Git/i, "");
  s = s.split(/[?#]/)[0];
  if (s.length > 1) s = s.replace(/\/+$/, "");
  return s;
}

function findPage(input) {
  const pages = allPages();
  const s = normalise(input);
  const lower = s.toLowerCase();
  // 1. Exact URL.
  const exact = pages.find((p) => p.url === lower || p.url === `/${lower.replace(/^\//, "")}`);
  if (exact) return exact;
  // 2. A bare slug or "data-logger-slug": locations first, then everything else.
  const bare = lower.replace(/^\//, "").replace(new RegExp(`^${LOCATION_URL_PREFIX}`), "");
  const loc = pages.find((p) => p.kind === "location" && p.slug === bare);
  if (loc) return loc;
  return pages.find((p) => p.kind !== "location" && p.slug === bare);
}

// ---------------------------------------------------------------- printing
const out = [];
const line = (label, value) => out.push(`${label.padEnd(27)}${value}`);
const hr = () => out.push("");

function describeLocation(page) {
  const pth = page.path;
  const resolved = ALL.find((l) => l.path.join("/") === pth.join("/"));
  const area = resolved ? undefined : writtenAreas().find((w) => w.path.join("/") === pth.join("/"))?.area;

  if (area) {
    const city = cityOf(area);
    const problems = areaProblems(area);
    const indexable = areaIndexable(area);
    line("Page type", "Area page (industrial area inside a city)");
    line("URL", page.url);
    line("Parent page", `${locationHref(city.path)}  (${city.node.name}, city page)`);
    line("Child pages", "none (area pages are the last level)");
    hr();
    line("Template file", "src/app/data-logger/[slug]/page.tsx -> src/components/locations/AreaPage.tsx");
    line("Data file", `src/data/areas/${area.citySlug}/${area.slug}.ts   (one file for this page)`);
    line("Listed in", `src/data/areas/_all.ts   (list "areas")`);
    line("Content in that file", `field "page" (intro, places, industries, services, visits, approach, faqs, nearby); parent city is citySlug "${area.citySlug}"`);
    hr();
    line("Indexable (Google)?", indexable ? "YES - in sitemap.xml" : "NO - page shows noindex and is left out of sitemap.xml");
    if (!indexable) {
      if (!area.page?.indexable) out.push(`${" ".repeat(27)}Reason: page.indexable is false in src/data/areas/${area.citySlug}/${area.slug}.ts`);
      for (const p of problems) out.push(`${" ".repeat(27)}Reason: ${p}`);
    }
    line("Title", finalTitle(area.page.metaTitle, true));
    line("Description", area.page.metaDescription);
    line("Title / description from", `src/data/areas/${area.citySlug}/${area.slug}.ts -> page.metaTitle / page.metaDescription`);
    return;
  }

  const { node, trail } = resolved;
  const content = locationContent[pth.join("/")];
  const isCity = node.type === "city";
  const country = pth[0];
  const typeName = isCity
    ? "City page"
    : node.type === "country"
      ? "Country hub"
      : country === "india"
        ? "State hub"
        : "Region / emirate / governorate hub (state level)";
  line("Page type", typeName);
  line("URL", page.url);
  const parent = trail.length > 1 ? trail[trail.length - 2] : undefined;
  line("Parent page", parent ? `${locationHref(pth.slice(0, -1))}  (${parent.name}, ${parent.type === "country" ? "country hub" : "state / region hub"})` : "none (top level)");

  const kids = [];
  for (const c of node.children ?? []) kids.push(`${locationHref([...pth, c.slug])}  ${c.name}${c.indexable ? "" : "  [noindex]"}`);
  if (isCity) {
    for (const w of writtenAreas().filter((w) => w.path.slice(0, -1).join("/") === pth.join("/")))
      kids.push(`${locationHref(w.path)}  ${w.area.name}${areaIndexable(w.area) ? "" : "  [noindex]"}`);
  }
  if (kids.length === 0) out.push(`${"Child pages".padEnd(27)}none`);
  else {
    line("Child pages", `${kids.length} page(s)`);
    for (const k of kids.slice(0, 12)) out.push(`${" ".repeat(27)}${k}`);
    if (kids.length > 12) out.push(`${" ".repeat(27)}... and ${kids.length - 12} more`);
  }
  hr();
  line("Template file", `src/app/data-logger/[slug]/page.tsx${isCity ? " -> src/components/locations/CityPage.tsx" : "  (hub layout is inside this file)"}`);
  const file = nodeFile(pth, node);
  line("Data file", `${file}   (one file for this page)`);
  line("Listed in", `${listedIn(pth)}   (add / remove this page there)`);
  if (isCity) line("Content in that file", `intro, climateAngle, areas, industries, recommendedSeries, faqs, nearby, metaTitle, metaDescription`);
  else line("Content in that file", `intro, localIndustries, citiesServed, supportNote, faqs, listing${node.type === "state" ? ", areaListing" : ""}; also src/data/location-content.ts -> "locationContent", key "${pth.join("/")}"${content ? "" : "  (no entry: description comes from the intro)"}`);
  hr();
  const indexable = node.indexable;
  line("Indexable (Google)?", indexable ? "YES - in sitemap.xml" : "NO - page shows noindex and is left out of sitemap.xml");
  if (!indexable && node.type === "state")
    out.push(`${" ".repeat(27)}Reason: this hub has only ${builtPagesUnder(node)} built page(s) under it; it needs ${MIN_STATE_HUB_PAGES} (rule in src/data/locations/_tree.ts, MIN_STATE_HUB_PAGES)`);
  if (isCity) {
    line("Title", finalTitle(node.metaTitle, true));
    line("Description", node.metaDescription);
    line("Title / description from", `${file} -> metaTitle / metaDescription`);
  } else {
    const place = content?.inName ?? node.name;
    line("Title", finalTitle(`Temperature Data Loggers in ${place}`));
    line("Description", content?.metaDescription ?? node.intro.slice(0, 150));
    line("Title / description from", `title is built from the name ("Temperature Data Loggers in ${place}"); description from src/data/location-content.ts -> "locationContent", key "${pth.join("/")}", field "metaDescription"`);
  }
}

function describeCatalog(page) {
  if (page.kind === "product") {
    const p = products.find((x) => x.slug === page.slug);
    const c = productContent[p.slug];
    line("Page type", p.category === "accessories" ? "Product page (accessories)" : "Product page (logger series)");
    line("URL", page.url);
    line("Parent page", "/products  (all products)");
    line("Child pages", "none");
    hr();
    line("Template file", "src/app/products/[slug]/page.tsx");
    line("Data file", `src/data/products/${p.slug}.ts   (one file for this page's text)`);
    line("Listed in", `src/data/product-content.ts   (list "productContent", key "${p.slug}")`);
    line("Specs and variants", `${at("src/data/products.ts", lineOf("src/data/products.ts", p.slug))}  -> list "products" (specs; also holds the MRP data, which is never shown on the site)`);
    hr();
    line("Indexable (Google)?", "YES - in sitemap.xml");
    line("Title", finalTitle(c.metaTitle));
    line("Description", c.metaDescription);
    line("Title / description from", `src/data/products/${p.slug}.ts -> metaTitle, metaDescription`);
  } else if (page.kind === "industry") {
    const i = industries.find((x) => x.slug === page.slug);
    const c = industryContent[i.slug];
    const rel2 = ALL.filter((l) => isCityPage(l.node) && l.node.industries.some((x) => x.slug === i.slug)).length;
    line("Page type", "Industry page");
    line("URL", page.url);
    line("Parent page", "/industries  (all industries)");
    line("Child pages", "none");
    hr();
    line("Template file", "src/app/industries/[slug]/page.tsx");
    line("Data file", `src/data/industries/${i.slug}.ts   (one file for this page: "industry" = card data, "content" = page text)`);
    line("Listed in", `src/data/industries.ts (list "industries") and src/data/industry-content.ts (list "industryContent")`);
    hr();
    line("Indexable (Google)?", "YES - in sitemap.xml");
    line("Title", finalTitle(c.metaTitle ?? c.h1 ?? `${i.name} Temperature Monitoring`));
    line("Description", c.metaDescription);
    line("Title / description from", `src/data/industries/${i.slug}.ts -> content.metaTitle (else h1, else "<name> Temperature Monitoring"), content.metaDescription`);
    line("City pages linking here", `${rel2} city page(s) list this industry`);
  } else if (page.kind === "service") {
    const s = services.find((x) => x.slug === page.slug);
    const c = serviceContent[s.slug];
    line("Page type", "Service page");
    line("URL", page.url);
    line("Parent page", "/services  (all services)");
    line("Child pages", "none");
    hr();
    line("Template file", `src/app/services/${s.slug}/page.tsx -> src/components/services/ServicePage.tsx`);
    line("Data file", `src/data/services/${s.slug}.ts   (one file for this page: "service" = card data, "content" = page text)`);
    line("Listed in", `src/data/services.ts (list "services") and src/data/service-content.ts (list "serviceContent")`);
    hr();
    line("Indexable (Google)?", "YES - in sitemap.xml");
    line("Title", finalTitle(c.metaTitle ?? c.h1));
    line("Description", c.metaDescription);
    line("Title / description from", `src/data/services/${s.slug}.ts -> content.metaTitle (else h1), content.metaDescription`);
  } else if (page.kind === "blog") {
    const file = `src/content/blog/${page.slug}.mdx`;
    const text = read(file);
    const title = text.match(/seoTitle:\s*"([^"]*)"/)?.[1] ?? text.match(/\n\s*title:\s*"([^"]*)"/)?.[1];
    const description = text.match(/description:\s*(?:\n\s*)?"([^"]*)"/)?.[1];
    const draft = /draft:\s*true/.test(text);
    line("Page type", "Blog post");
    line("URL", page.url);
    line("Parent page", "/blog  (blog list)");
    line("Child pages", "none");
    hr();
    line("Template file", "src/app/blog/[slug]/page.tsx");
    line("Data file entry", `${file}  (the file name is the slug; the "meta" block at the top is the data)`);
    line("Content file entry", `${file}  (text below the "meta" block)`);
    hr();
    line("Indexable (Google)?", draft ? 'NO - "draft: true" in the file: noindex, not in sitemap.xml, not in the blog list' : "YES - in sitemap.xml");
    line("Title", finalTitle(title ?? "(not found)"));
    line("Description", description ?? "(not found)");
    line("Title / description from", `${file} -> meta.title (or seoTitle) / meta.description`);
  } else {
    const file = CORE_PAGES[page.url];
    const m = metaFromPageFile(file);
    line("Page type", "Core page (one file per page)");
    line("URL", page.url);
    line("Parent page", page.url === "/" ? "none (home)" : "/  (home)");
    line("Child pages", { "/products": "the product pages", "/industries": "the industry pages", "/services": "the 3 service pages", "/blog": "the blog posts", "/locations": "all location pages" }[page.url] ?? "none");
    hr();
    line("Template file", file);
    line("Data file entry", page.url === "/" ? "src/data/home.ts (home page text and lists)" : "none (the text is inside the template file, or in the data file it imports)");
    line("Content file entry", file);
    hr();
    line("Indexable (Google)?", "YES - in sitemap.xml");
    line("Title", m.title ? finalTitle(m.title, m.absolute || page.url === "/") : "(open the file: buildMetadata title)");
    line("Description", m.description ?? "(open the file: buildMetadata description)");
    line("Title / description from", `${file} -> buildMetadata({ title, description })`);
  }
}

function counts() {
  const states = ALL.filter((l) => l.node.type === "state");
  const cities = ALL.filter((l) => l.node.type === "city");
  const countries = ALL.filter((l) => l.node.type === "country");
  const w = writtenAreas();
  const wIdx = w.filter((x) => areaIndexable(x.area)).length;
  const posts = blogSlugs();
  const draftPosts = posts.filter((s) => /draft:\s*true/.test(read(`src/content/blog/${s}.mdx`))).length;
  const idx = (l) => l.filter((x) => x.node.indexable).length;
  const rows = [
    ["Core pages", 12, 12],
    ["Product pages", products.length, products.length],
    ["Industry pages", industries.length, industries.length],
    ["Service pages", services.length, services.length],
    ["Blog posts", posts.length, posts.length - draftPosts],
    ["Country hubs", countries.length, idx(countries)],
    ["State / region hubs", states.length, idx(states)],
    ["City pages", cities.length, idx(cities)],
    ["Area pages", w.length, wIdx],
  ];
  out.push("Page type".padEnd(24) + "built".padEnd(8) + "indexable");
  for (const [name, total, ok] of rows) out.push(name.padEnd(24) + String(total).padEnd(8) + ok);
  out.push("-".repeat(40));
  out.push("Total".padEnd(24) + String(rows.reduce((a, r) => a + r[1], 0)).padEnd(8) + rows.reduce((a, r) => a + r[2], 0));
  out.push("");
  out.push("Also built (not counted above): 404 page, sitemap.xml, robots.txt, manifest, icons, social-share images.");
  out.push(`Areas in the data file without a page yet: ${areas.length - w.length}`);
}

// ---------------------------------------------------------------- main
const arg = process.argv.slice(2).join(" ").trim();
if (!arg || arg === "--help" || arg === "-h") {
  console.log('Usage: npm run where -- <page>\n  <page> can be /data-logger-mumbai, mumbai, or a full URL.\n  npm run where -- --counts   shows how many pages of each type exist.');
  process.exit(0);
}

if (arg === "--counts") {
  counts();
  console.log(out.join("\n"));
  process.exit(0);
}

const page = findPage(arg);
if (!page) {
  const bare = normalise(arg).toLowerCase().replace(/^\//, "").replace(new RegExp(`^${LOCATION_URL_PREFIX}`), "");
  const ranked = allPages()
    .map((p) => ({ p, score: levenshtein(bare, p.slug.toLowerCase()) - (p.slug.toLowerCase().includes(bare) || bare.includes(p.slug.toLowerCase()) ? 3 : 0) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);
  console.log(`No page found for "${arg}".\nDid you mean one of these?`);
  for (const { p } of ranked) console.log(`  ${p.slug.padEnd(30)} ${p.url}`);
  process.exit(1);
}

if (page.kind === "location") describeLocation(page);
else describeCatalog(page);
console.log(out.join("\n"));
