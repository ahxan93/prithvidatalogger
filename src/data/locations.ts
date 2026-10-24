// Location tree. Source of truth: docs/MASTER-BRIEF.md §7.9.
// Rules: every indexable node has genuinely unique copy (no shared paragraphs);
// no country-specific regulations, delivery times or statistics; contact
// details only from src/config/site.ts. Nodes with `indexable: false` are
// rendered noindex and left out of sitemap.xml.

// This file is only the entry point. The data is split into one file per page:
//   src/data/locations/<country>/_country.ts
//   src/data/locations/<country>/<state>/_state.ts
//   src/data/locations/<country>/<state>/<city>.ts
// Types: locations/_types.ts. Helpers and URL rules: locations/_helpers.ts. Assembly: locations/_tree.ts.

export type { LocationType, LocationFaq, LegacyLocationNode, HubListing, CityLocationNode, LocationNode } from "./locations/_types.ts";
export { locations, builtPagesUnder, MIN_STATE_HUB_PAGES } from "./locations/_tree.ts";
export * from "./locations/_helpers.ts";
