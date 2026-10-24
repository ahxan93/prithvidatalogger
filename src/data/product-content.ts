// Page copy for the series pages and product cards (brief §7.2–7.3).
// Every statement is derived from the specs in docs/MASTER-BRIEF.md §2:
// no invented numbers, warranty, delivery or compliance claims, and the cloud
// software is never named. Validated by `npm run check:data`.

import type { SeriesSlug } from "./products";

import setuProduct from "./products/setu.ts";
import nakshatraProduct from "./products/nakshatra.ts";
import rajmudraProduct from "./products/rajmudra.ts";
import dhruvaProduct from "./products/dhruva.ts";
import veerProduct from "./products/veer.ts";
import viratProduct from "./products/virat.ts";
import vayuProduct from "./products/vayu.ts";
import accessoriesProduct from "./products/accessories.ts";

export type ProductFaq = { question: string; answer: string; link?: { href: string; text: string } };

export type ProductContent = {
  /** <title>; must stay ≤ 60 characters. */
  metaTitle: string;
  /** Meta description; ≤ 155 characters. */
  metaDescription: string;
  /** Short hero paragraph; contains the series' primary keyword. */
  intro: string;
  /** What it measures, for cards and the comparison table. */
  measures: string;
  /** Key range in one line, for cards and the comparison table. */
  rangeSummary: string;
  keyFeatures: string[];
  /** 3–5 product-specific questions. */
  faqs: ProductFaq[];
};

export const productContent: Record<SeriesSlug, ProductContent> = {
  setu: setuProduct,
  nakshatra: nakshatraProduct,
  rajmudra: rajmudraProduct,
  dhruva: dhruvaProduct,
  veer: veerProduct,
  virat: viratProduct,
  vayu: vayuProduct,
  accessories: accessoriesProduct,
};
