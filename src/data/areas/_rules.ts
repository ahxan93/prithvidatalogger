// Shared rules and helpers for area pages (quality checks, word counts, lookups).

import { areas } from "./_all.ts";
import type { AreaDef, AreaPageContent } from "./_types.ts";

// ---------------------------------------------------------------------------
// Quality rules (shared by the page, the sitemap and scripts/check-data.mjs)
// ---------------------------------------------------------------------------

export const AREA_MIN_WORDS = 400;

/** Wording the area copy must never contain. */
export const AREA_BANNED: [RegExp, string][] = [
  [/\bno\.?\s?1\b/i, '"No.1"'],
  [/\bbest\b(?!\s+for\b)/i, '"best"'],
  [/\bleading\b/i, '"leading"'],
  [/guarantee/i, '"guarantee"'],
  [/within\s+(\d+|a few|\w+)\s+(hours?|days?|minutes?|weeks?)/i, '"within X hours/days"'],
  [/\b\d[\d,]*\+?\s+(customers|clients|companies|businesses|units|plants)\b/i, "a count of customers or units"],
  [/get\s+a\s+quote/i, 'the old quote CTA'],
  [/₹|\bMRP\b|\bGST\b|\bprice[sd]?\b/i, "a price"],
  [/trinetra/i, "Trinetra"],
  [/accredit|\bNABL\b|ISO\s?(\/IEC )?\d{4,5}/i, "an accreditation claim"],
];

/** Every piece of copy that is unique to the area page. */
export function areaTexts(page: AreaPageContent): string[] {
  return [
    page.intro,
    ...page.places.map((p) => p.note),
    ...page.industries.map((i) => i.sentence),
    page.services,
    page.visits,
    page.approach,
    ...(page.faqs ?? []).flatMap((f) => [f.question, f.answer]),
  ];
}

export const countWords = (texts: string[]) => texts.join(" ").split(/\s+/).filter(Boolean).length;

const sentencesOf = (text: string) =>
  text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length >= 25);

/**
 * Everything that stops an area page being indexable. `otherTexts` is every
 * other sentence on the site's location pages (cities, hubs), so a sentence
 * is never reused from the city page; sentences are also compared across areas.
 */
export function areaIssues(area: AreaDef, otherTexts: string[], peers: AreaDef[] = areas): string[] {
  const page = area.page;
  if (!page) return ["no page content"];
  const issues: string[] = [];
  if (!area.confirmedService) issues.push("service is not confirmed for this area");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(area.slug)) issues.push("slug must be lowercase-hyphen");

  const texts = areaTexts(page);
  const words = countWords(texts);
  if (words < AREA_MIN_WORDS) issues.push(`only ${words} unique words (min ${AREA_MIN_WORDS})`);
  if (page.places.length < 3) issues.push("needs at least 3 places or estates");
  if (page.industries.length < 3) issues.push("needs at least 3 industries");
  if (page.metaTitle.length > 60) issues.push(`metaTitle is ${page.metaTitle.length} chars`);
  if (page.metaDescription.length > 155) issues.push(`metaDescription is ${page.metaDescription.length} chars`);
  if (!/Get Solution/.test(page.metaDescription)) issues.push('metaDescription must say "Get Solution"');
  if (!page.metaTitle.includes(area.name.split(",")[0])) issues.push("metaTitle must name the area");

  const copy = [...texts, page.metaTitle, page.metaDescription].join(" ");
  for (const [re, label] of AREA_BANNED) if (re.test(copy)) issues.push(`uses banned wording ${label}`);

  const theirs = new Set(otherTexts.flatMap(sentencesOf));
  for (const peer of peers) {
    if (peer.slug === area.slug || peer.citySlug !== area.citySlug && !peer.page || !peer.page) continue;
    for (const s of areaTexts(peer.page).flatMap(sentencesOf)) theirs.add(s);
  }
  const reused = texts.flatMap(sentencesOf).filter((s) => theirs.has(s));
  if (reused.length) issues.push(`reuses ${reused.length} sentence(s), e.g. "${reused[0].slice(0, 70)}"`);
  return issues;
}

export function getArea(citySlug: string, areaSlug: string): AreaDef | undefined {
  return areas.find((a) => a.citySlug === citySlug && a.slug === areaSlug);
}

export function getAreasForCity(citySlug: string): AreaDef[] {
  return areas.filter((a) => a.citySlug === citySlug);
}

/** Areas with written pages for a city. */
export function getWrittenAreasForCity(citySlug: string): AreaDef[] {
  return getAreasForCity(citySlug).filter((a) => a.page);
}
