// Assembles the location tree from the per-country index files (country > state > city) and applies the
// state-hub indexability rule. A new country must be imported and added to the list here.

import { areas } from "../areas.ts";
import type { LocationNode, LegacyLocationNode } from "./_types.ts";
import indiaCountry from "./india/index.ts";
import saudiArabiaCountry from "./saudi-arabia/index.ts";
import uaeCountry from "./uae/index.ts";
import qatarCountry from "./qatar/index.ts";
import omanCountry from "./oman/index.ts";
import kuwaitCountry from "./kuwait/index.ts";
import bahrainCountry from "./bahrain/index.ts";
import yemenCountry from "./yemen/index.ts";

export const locations: LegacyLocationNode[] = [
  indiaCountry,
  saudiArabiaCountry,
  uaeCountry,
  qatarCountry,
  omanCountry,
  kuwaitCountry,
  bahrainCountry,
  yemenCountry,
];

// ---------------------------------------------------------------------------
// State hub indexability. A state hub is indexable only while it has two or
// more built child pages (its indexable cities plus its written area pages);
// below that it renders noindex, follow and stays out of the sitemap, and it
// becomes indexable again by itself as soon as a second page is built. The
// `indexable` literal in the data is therefore only the starting point.
// ---------------------------------------------------------------------------

/** Built pages under a state hub: its indexable cities plus their written area pages. */
export function builtPagesUnder(state: LocationNode): number {
  const cities = (state.children ?? []).filter((c) => c.indexable);
  const cityAreas = areas.filter(
    (a) => a.page?.indexable && cities.some((c) => c.slug === a.citySlug),
  ).length;
  return cities.length + cityAreas;
}

export const MIN_STATE_HUB_PAGES = 2;

for (const country of locations) {
  for (const child of country.children ?? []) {
    if (child.type === "state") child.indexable = builtPagesUnder(child) >= MIN_STATE_HUB_PAGES;
  }
}
