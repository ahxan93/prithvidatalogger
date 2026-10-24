// Shared helpers for the location tree: lookups, flat URLs (/data-logger-{slug}) and city/footer helpers.
// Per-page data lives in the files next to this one; locations.ts re-exports everything from here.

import { areas } from "../areas.ts";
import { locations } from "./_tree.ts";
import type { LocationType, CityLocationNode, LocationNode } from "./_types.ts";

/** True for nodes built to the playbook's city template. */
export function isCityPage(node: LocationNode): node is CityLocationNode {
  return "climateAngle" in node;
}

/**
 * Owner decision (brief §1): Vayu/GSM network compatibility outside India is not
 * confirmed. The location template shows this note on every non-India page.
 * It is kept out of the per-page copy so it doesn't count as duplicated content.
 */
export const GSM_NETWORK_NOTE =
  "GSM versions are available. Contact us to confirm network compatibility for your country.";

/** True for every location outside India (where the GSM note must be shown). */
export function needsGsmNetworkNote(path: string[]): boolean {
  return path[0] !== "india";
}

export type ResolvedLocation = {
  node: LocationNode;
  /** Slug segments from the root, e.g. ["india", "maharashtra", "mumbai"]. */
  path: string[];
  /** Nodes from the country down to (and including) `node`. */
  trail: LocationNode[];
};

/** Every node in the tree, depth-first, with its full slug path. */
export function getAllLocations(
  nodes: LocationNode[] = locations,
  parentTrail: LocationNode[] = [],
): ResolvedLocation[] {
  return nodes.flatMap((node) => {
    const trail = [...parentTrail, node];
    const resolved: ResolvedLocation = {
      node,
      path: trail.map((n) => n.slug),
      trail,
    };
    return [resolved, ...getAllLocations(node.children ?? [], trail)];
  });
}

/** Resolves a slug path like ["india", "maharashtra"] to a node, or undefined if unknown. */
export function findLocation(path: string[]): ResolvedLocation | undefined {
  const trail: LocationNode[] = [];
  let level: LocationNode[] | undefined = locations;

  for (const slug of path) {
    const node: LocationNode | undefined = level?.find((n) => n.slug === slug);
    if (!node) return undefined;
    trail.push(node);
    level = node.children;
  }

  const node = trail.at(-1);
  return node ? { node, path, trail } : undefined;
}

// ---------------------------------------------------------------------------
// URLs. The data tree stays hierarchical (country > state > city > area), but
// every public URL is a single flat segment: /data-logger-{slug}. When a city
// and an area share a slug the area takes the AREA_SLUG_SUFFIX (and a state
// that shares a city's slug, like Delhi, takes STATE_SLUG_SUFFIX); any slug still
// duplicated after that is reported by locationUrlProblems() and fails
// `npm run check:data`.
// ---------------------------------------------------------------------------

export const LOCATION_URL_PREFIX = "data-logger-";
export const AREA_SLUG_SUFFIX = "-industrial-area";
export const STATE_SLUG_SUFFIX = "-state";

type FlatEntry = { key: string; base: string; kind: LocationType | "area" };

type FlatIndex = {
  /** tree path ("india/maharashtra/mumbai") -> flat slug ("mumbai") */
  byPath: Map<string, string>;
  /** flat slug -> tree path */
  bySlug: Map<string, string[]>;
  problems: string[];
};

let flatIndex: FlatIndex | undefined;

function buildFlatIndex(): FlatIndex {
  const all = getAllLocations();
  const entries: FlatEntry[] = all.map((l) => ({ key: l.path.join("/"), base: l.node.slug, kind: l.node.type }));
  for (const area of areas) {
    const city = all.find((l) => l.node.type === "city" && l.node.slug === area.citySlug);
    // An area whose city has no page yet still reserves its slug (so it never
    // takes another page's URL later) but has no path of its own.
    const key = city ? [...city.path, area.slug].join("/") : `unplaced/${area.citySlug}/${area.slug}`;
    entries.push({ key, base: area.slug, kind: "area" });
  }

  const byPath = new Map<string, string>();
  const bySlug = new Map<string, string[]>();
  const problems: string[] = [];
  const claim = (entry: FlatEntry, slug: string) => {
    const owner = bySlug.get(slug);
    if (owner) {
      problems.push(`duplicate location slug "${slug}": ${owner.join("/")} and ${entry.key}`);
      return;
    }
    byPath.set(entry.key, slug);
    bySlug.set(slug, entry.key.split("/"));
  };

  // Countries and cities keep their own slug. A state yields to a city or country
  // of the same name (Delhi the state vs Delhi the city), and an area yields to
  // any node.
  for (const entry of entries.filter((e) => e.kind === "country" || e.kind === "city")) claim(entry, entry.base);
  for (const entry of entries.filter((e) => e.kind === "state")) {
    claim(entry, bySlug.has(entry.base) ? `${entry.base}${STATE_SLUG_SUFFIX}` : entry.base);
  }
  for (const entry of entries.filter((e) => e.kind === "area")) {
    claim(entry, bySlug.has(entry.base) ? `${entry.base}${AREA_SLUG_SUFFIX}` : entry.base);
  }
  return { byPath, bySlug, problems };
}

function getFlatIndex(): FlatIndex {
  return (flatIndex ??= buildFlatIndex());
}

/** The flat slug of a node or area given its tree path (without the data-logger- prefix). */
export function locationFlatSlug(path: string[]): string {
  return getFlatIndex().byPath.get(path.join("/")) ?? path[path.length - 1];
}

/** Public URL of a location node or area page, e.g. /data-logger-mumbai. */
export function locationHref(path: string[]): string {
  return `/${LOCATION_URL_PREFIX}${locationFlatSlug(path)}`;
}

/** Tree path for a flat slug (the part after data-logger-), or undefined. */
export function pathForFlatSlug(flat: string): string[] | undefined {
  return getFlatIndex().bySlug.get(flat);
}

/** Every flat slug in use, for static params, sitemap checks and redirects. */
export function allFlatSlugs(): string[] {
  return [...getFlatIndex().bySlug.keys()];
}

/** Duplicate flat slugs; must stay empty. */
export function locationUrlProblems(): string[] {
  return getFlatIndex().problems;
}

/** The retired nested URL of a tree path; only used to build 301 redirects and to detect stray links. */
export function legacyLocationHref(path: string[]): string {
  return `/locations/${path.join("/")}`;
}

export type ResolvedCity = ResolvedLocation & { node: CityLocationNode };

/** Every city built to the playbook template, in tree order. */
export function getCityPages(): ResolvedCity[] {
  return getAllLocations().filter((l): l is ResolvedCity => isCityPage(l.node));
}

/** The indexable, playbook-built city with this slug, if its page exists yet. */
export function findCityBySlug(slug: string): ResolvedCity | undefined {
  return getCityPages().find((c) => c.node.slug === slug && c.node.indexable);
}

/** Playbook section 4, biggest cities first; drives the footer and industry blocks. */
const CITY_PRIORITY = [
  "mumbai",
  "delhi",
  "bengaluru",
  "hyderabad",
  "chennai",
  "pune",
  "ahmedabad",
  "kolkata",
  "navi-mumbai",
  "noida",
];

function cityRank(slug: string): number {
  const i = CITY_PRIORITY.indexOf(slug);
  return i === -1 ? CITY_PRIORITY.length : i;
}

/** Indexable city pages that support an industry, most relevant (biggest) first. */
export function citiesForIndustry(industrySlug: string, limit = 8): ResolvedCity[] {
  return getCityPages()
    .filter((c) => c.node.indexable && c.node.industries.some((i) => i.slug === industrySlug))
    .sort((a, b) => cityRank(a.node.slug) - cityRank(b.node.slug))
    .slice(0, limit);
}

/** Hubs pinned at the top of the footer list, in this order (when indexable). */
const FOOTER_HUBS = ["india", "maharashtra", "saudi-arabia", "uae"];

/**
 * Footer "Top locations": a few indexable hubs first, then the biggest cities
 * that have a live page, so the list stays compact (the footer links to
 * /locations for the rest).
 */
export function topLocations(limit = 10): { name: string; href: string }[] {
  const hubs = FOOTER_HUBS.flatMap((slug) => {
    const hub = getAllLocations().find((l) => l.node.slug === slug && l.node.indexable && !isCityPage(l.node));
    return hub ? [{ name: hub.node.name, href: locationHref(hub.path) }] : [];
  });
  const cities = getCityPages()
    .filter((c) => c.node.indexable)
    .sort((a, b) => cityRank(a.node.slug) - cityRank(b.node.slug))
    .map((c) => ({ name: c.node.name, href: locationHref(c.path) }));
  return [...hubs, ...cities].slice(0, limit);
}
