import { areaCities, areaIssues, areas, type AreaDef } from "@/data/areas";
import { getAllLocations, isCityPage, locationHref, type LocationNode } from "@/data/locations";

// App-side helpers for the sub-area layer (src/data/areas.ts): URL paths, the
// parent city, and the gate that decides whether an area page is indexable.

/** Every sentence of copy on a location node (hubs and cities). */
function nodeTexts(node: LocationNode): string[] {
  if (isCityPage(node)) {
    return [
      node.intro,
      node.climateAngle,
      ...node.areas.map((a) => a.note),
      ...node.industries.map((i) => i.sentence),
      ...node.recommendedSeries.map((r) => r.reason),
      ...node.faqs.flatMap((f) => [f.question, f.answer]),
    ];
  }
  return [node.intro, node.supportNote, ...node.faqs.flatMap((f) => [f.question, f.answer])];
}

export function otherLocationTexts(): string[] {
  return getAllLocations().flatMap((l) => nodeTexts(l.node));
}

/** Slug path of the parent city in the location tree, e.g. ["india","maharashtra","mumbai"]. */
export function cityPathFor(area: AreaDef): string[] | undefined {
  return getAllLocations().find((l) => l.node.type === "city" && l.node.slug === area.citySlug)?.path;
}

export function areaPath(area: AreaDef): string[] | undefined {
  const city = cityPathFor(area);
  return city ? [...city, area.slug] : undefined;
}

export function areaHref(area: AreaDef): string | undefined {
  const path = areaPath(area);
  return path ? locationHref(path) : undefined;
}

/** What stops this area page being indexable; empty when it passes every check. */
export function areaProblems(area: AreaDef): string[] {
  const problems = areaIssues(area, otherLocationTexts());
  if (!cityPathFor(area)) problems.push(`parent city "${area.citySlug}" has no page`);
  return problems;
}

/** Indexable and in the sitemap only if the author said so AND every check passes. */
export function isAreaIndexable(area: AreaDef): boolean {
  return Boolean(area.page?.indexable) && areaProblems(area).length === 0;
}

/** Areas that have a written page, with their full path. */
export function writtenAreas(): { area: AreaDef; path: string[] }[] {
  return areas.flatMap((area) => {
    const path = area.page ? areaPath(area) : undefined;
    return path ? [{ area, path }] : [];
  });
}

export function findAreaByPath(path: string[]): { area: AreaDef; cityPath: string[] } | undefined {
  if (path.length !== 4) return undefined;
  const found = writtenAreas().find((w) => w.path.join("/") === path.join("/"));
  return found ? { area: found.area, cityPath: path.slice(0, 3) } : undefined;
}

export function areaCityMeta(area: AreaDef) {
  return areaCities[area.citySlug];
}
