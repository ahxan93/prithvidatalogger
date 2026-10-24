// Shared types for the area pages. Each area's data lives in its own file under src/data/areas/<city>/.

import type { DeviceKey } from "../page-heroes";

export type AreaType = "industrial-estate" | "midc-estate" | "business-district" | "mixed-use" | "warehousing-hub";

export type AreaPageContent = {
  /** At most 60 characters, includes the brand suffix. */
  metaTitle: string;
  /** At most 155 characters, unique, says "Get Solution". */
  metaDescription: string;
  /** 70-130 words about the area's real character and why monitoring matters there. */
  intro: string;
  /** Real industrial estates, districts or clusters in the area, each with a note. */
  places: { name: string; note: string }[];
  /** Industries (slugs of industry pages) with an area-specific sentence. */
  industries: { slug: string; sentence: string }[];
  /** The services we offer here, in this area's own words. */
  services: string;
  /** How a visit is arranged, in this area's own words. */
  visits: string;
  /** How we would start monitoring here, in this area's own words. */
  approach: string;
  /** Optional questions for this area; shown as an FAQ section with FAQPage JSON-LD. */
  faqs?: { question: string; answer: string; link?: { href: string; text: string } }[];
  /** Slugs of other areas worth linking (only areas with pages are shown). */
  nearby: string[];
  /** Author's intent; the page is only indexable if it also passes areaIssues(). */
  indexable: boolean;
};

export type AreaDef = {
  slug: string;
  name: string;
  /** Slug of the parent city (a node in the location tree, or one planned for it). */
  citySlug: string;
  areaType: AreaType;
  /** Industry slugs most relevant here. */
  nearbyIndustries: string[];
  /** The owner confirmed that we serve this area. */
  confirmedService: true;
  /** A distinct logger pair for the area's hero (see PageHero / LiveDeviceVisual). */
  hero: [DeviceKey, DeviceKey];
  /** Present once the area has been written (batch 1: Mumbai, Navi Mumbai, Thane-Bhiwandi). */
  page?: AreaPageContent;
};
