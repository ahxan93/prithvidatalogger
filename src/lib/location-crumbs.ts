import type { Crumb } from "@/components/ui/Breadcrumbs";
import { locationHref, type LocationType } from "@/data/locations";

// Breadcrumbs for location pages. The visible row is short (Home > City [> Area],
// or Home > Locations > hub for country and state hubs) while the BreadcrumbList
// JSON-LD keeps the full hierarchy (Locations > Country > State > City > Area),
// all on the flat /data-logger-{slug} URLs.

/**
 * @param path  tree path of the page, e.g. ["india","maharashtra","mumbai"]; area pages: city path + area slug
 * @param names names for each path segment, country first (same length as `path`)
 * @param type  what the page is
 */
export function locationCrumbs(
  path: string[],
  names: string[],
  type: LocationType | "area",
): { items: Crumb[]; schemaItems: Crumb[] } {
  const nodes: Crumb[] = names.map((name, i) => ({ name, href: locationHref(path.slice(0, i + 1)) }));
  const schemaItems: Crumb[] = [{ name: "Locations", href: "/locations" }, ...nodes];

  const here = nodes[nodes.length - 1];
  const parent = nodes[nodes.length - 2];
  const items: Crumb[] =
    type === "country" || type === "state"
      ? [{ name: "Locations", href: "/locations" }, here]
      : type === "area"
        ? [parent, here]
        : [here];
  return { items, schemaItems };
}
