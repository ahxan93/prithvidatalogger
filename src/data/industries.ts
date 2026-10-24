// Industry data. Source of truth: docs/MASTER-BRIEF.md §3.
// Compliance wording stays general (no legal claims).

import * as pharmaceuticalIndustry from "./industries/pharmaceutical.ts";
import * as vaccineColdChainIndustry from "./industries/vaccine-cold-chain.ts";
import * as hospitalsBloodBanksIndustry from "./industries/hospitals-blood-banks.ts";
import * as foodBeverageIndustry from "./industries/food-beverage.ts";
import * as logisticsWarehousingIndustry from "./industries/logistics-warehousing.ts";
import * as dataCentersIndustry from "./industries/data-centers.ts";
import * as laboratoriesIndustry from "./industries/laboratories.ts";
import * as chemicalIndustry from "./industries/chemical.ts";
import * as electronicsIndustry from "./industries/electronics.ts";
import * as textileIndustry from "./industries/textile.ts";

/**
 * A recommended product: a series slug ("nakshatra"), a variant slug ("setu-x")
 * or an accessory slug ("external-hooter-with-door-sensor").
 * Validated against products.ts by `npm run check:data`.
 */
export type ProductRef = string;

export type Industry = {
  slug: string;
  name: string;
  /** One line for cards. */
  summary: string;
  /** 3–5 typical applications. */
  applications: string[];
  recommended: ProductRef[];
  /** Short paragraph on why monitoring matters here. */
  whyItMatters: string;
  image: string;
  /** Brief §5 keyword map; undefined where the brief sets none. */
  seo?: { primaryKeyword: string; supporting: string[] };
};

export const industries: Industry[] = [
  pharmaceuticalIndustry.industry,
  vaccineColdChainIndustry.industry,
  hospitalsBloodBanksIndustry.industry,
  foodBeverageIndustry.industry,
  logisticsWarehousingIndustry.industry,
  dataCentersIndustry.industry,
  laboratoriesIndustry.industry,
  chemicalIndustry.industry,
  electronicsIndustry.industry,
  textileIndustry.industry,
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

/** Industries that recommend a series, or any of its variants. */
export function getIndustriesForSeries(seriesSlug: string, variantSlugs: string[]): Industry[] {
  const refs = new Set([seriesSlug, ...variantSlugs]);
  return industries.filter((industry) => industry.recommended.some((ref) => refs.has(ref)));
}
