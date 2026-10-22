// Checks the title, meta description and canonical of every built page.
//
//   npm run check:meta        (needs a prior `npm run build`)
//
// Fails on: a missing, duplicate, over-long (title > 60) or out-of-range
// (description < 70 or > 155) title or description, any HTML entity left in a
// title or description after one level of unescaping (double escaping), and any
// canonical that is not on the production domain from src/config/site.ts.
// Warns (does not fail) when 10 or more descriptions share their first 5 words
// or their last 3 words, i.e. repeated boilerplate.

import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "../src/config/site.ts";

const ROOT = path.join(import.meta.dirname, "..");
const APP_DIR = path.join(ROOT, ".next/server/app");
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 155;
const REPEAT_GROUP = 10;
// Build-time shells that are not pages: dynamic route templates, the error page and the 404.
const SKIP = (file) => file.includes("[") || file.startsWith("_");

if (!fs.existsSync(path.join(ROOT, ".next", "BUILD_ID"))) {
  console.error("check:meta needs a build. Run `npm run build` first.");
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".html") ? [path.join(dir, e.name)] : [],
  );

// One level of unescaping, the way a crawler reads the tag. What is left is a
// real entity in the text, e.g. "&amp;" produced by escaping twice.
const unescape = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const ENTITY = /&(?:[a-z][a-z0-9]*|#\d+|#x[0-9a-f]+);/i;

const productionHost = new URL(siteConfig.url).host;
const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const pages = [];

for (const full of walk(APP_DIR)) {
  const file = path.relative(APP_DIR, full).split(path.sep).join("/");
  if (SKIP(file)) continue;
  const html = fs.readFileSync(full, "utf8");
  const read = (re) => {
    const m = html.match(re);
    return m ? unescape(m[1]).trim() : null;
  };
  const title = read(/<title>([\s\S]*?)<\/title>/);
  const description = read(/<meta name="description" content="([^"]*)"/);
  const canonical = read(/<link rel="canonical" href="([^"]*)"/);
  pages.push({ file, description });

  if (!title) errors.push(`${file}: missing <title>`);
  else {
    if (title.length > TITLE_MAX) errors.push(`${file}: title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
    if (ENTITY.test(title)) errors.push(`${file}: HTML entity in title (double-escaped?): "${title}"`);
    titles.set(title, [...(titles.get(title) ?? []), file]);
  }

  if (!description) errors.push(`${file}: missing meta description`);
  else {
    if (description.length < DESC_MIN) errors.push(`${file}: description is ${description.length} chars (min ${DESC_MIN})`);
    if (description.length > DESC_MAX) errors.push(`${file}: description is ${description.length} chars (max ${DESC_MAX})`);
    if (ENTITY.test(description)) errors.push(`${file}: HTML entity in description (double-escaped?): "${description}"`);
    descriptions.set(description, [...(descriptions.get(description) ?? []), file]);
  }

  if (!canonical) errors.push(`${file}: missing canonical`);
  else {
    let host = null;
    try {
      host = new URL(canonical).host;
    } catch {
      /* reported below */
    }
    if (host !== productionHost) errors.push(`${file}: canonical "${canonical}" is not on ${productionHost}`);
  }
}

for (const [title, files] of titles) {
  if (files.length > 1) errors.push(`duplicate title "${title}" on ${files.join(", ")}`);
}
for (const [description, files] of descriptions) {
  if (files.length > 1) errors.push(`duplicate description "${description}" on ${files.join(", ")}`);
}

// Boilerplate warnings: many descriptions that open or close with the same words.
const groupBy = (words, take) => {
  const groups = new Map();
  for (const { file, description } of pages) {
    if (!description) continue;
    const parts = description.split(/\s+/);
    const key = (take > 0 ? parts.slice(0, take) : parts.slice(take)).join(" ");
    groups.set(key, [...(groups.get(key) ?? []), file]);
  }
  return [...groups].filter(([, files]) => files.length >= REPEAT_GROUP);
};
for (const [key, files] of groupBy(null, 5)) {
  warnings.push(`${files.length} descriptions start with the same 5 words "${key}" (e.g. ${files.slice(0, 3).join(", ")})`);
}
for (const [key, files] of groupBy(null, -3)) {
  warnings.push(`${files.length} descriptions end with the same 3 words "${key}" (e.g. ${files.slice(0, 3).join(", ")})`);
}

console.log(`meta: ${pages.length} pages checked, ${titles.size} unique titles, ${descriptions.size} unique descriptions`);
for (const w of warnings) console.warn(`WARNING: ${w}`);
if (!warnings.length) console.log("no repeated openings or closings across descriptions");
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("Meta tags OK.");
