// Sub-area layer under the city pages: Country > State > City > Area.
//
// Rules (docs/LOCATION-PAGES-PLAYBOOK.md, extended to areas):
//  - every entry is an area the owner confirmed service in (`confirmedService`);
//  - an entry with no `page` is a data entry only: it has no route and is
//    written in a later batch;
//  - copy is unique per area (no sentence shared with the city page, another
//    area or any other location page), at least 400 unique words, and states
//    no statistics, client names, timelines, prices or local regulations;
//  - a page is indexable and in the sitemap only if `indexable` is true AND it
//    passes areaIssues() below; otherwise it renders noindex.
//
// Kept free of runtime imports so scripts/check-data.mjs can load it directly.

// This file is only the entry point. The data is split into one file per area:
//   src/data/areas/<city>/<area>.ts   (one index.ts per city folder)
// Types: areas/_types.ts. Cities: areas/_cities.ts. Rules and helpers: areas/_rules.ts. Assembly: areas/_all.ts.

export type { AreaType, AreaPageContent, AreaDef } from "./areas/_types.ts";
export { areaCities } from "./areas/_cities.ts";
export { areas } from "./areas/_all.ts";
export * from "./areas/_rules.ts";
