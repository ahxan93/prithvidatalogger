// Page copy for /industries/[slug] (brief §7.5).
// Rule (brief §1): product facts come only from docs/MASTER-BRIEF.md §2–§4.
// Everything else is general, reasoned wording: no invented specs, timings,
// statistics or guarantees, and no claims about specific regulations.
// Validated by `npm run check:data`.

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

export type IndustryFaq = { question: string; answer: string; link?: { href: string; text: string } };

export type IndustryContent = {
  /** <title> text when it should differ from the default "{name} Temperature Monitoring". */
  metaTitle?: string;
  /** H1 when it should differ from the default "{name} Temperature Monitoring". */
  h1?: string;
  /** One sentence placed before the intro paragraph (first 100 words). */
  lead?: string;
  /** Replaces the "Continuous Records, Instant Alerts" heading. */
  helpsHeading?: string;
  /** Meta description; ≤ 155 characters, unique. */
  metaDescription: string;
  /** Three everyday monitoring problems in this industry (general, reasoned). */
  challenges: string[];
  /** How Prithvi helps: each point maps to a product fact in the brief. */
  helps: { title: string; text: string }[];
  /** General compliance wording only. */
  compliance: string;
  faqs: IndustryFaq[];
};

export const industryContent: Record<string, IndustryContent> = {
  pharmaceutical: pharmaceuticalIndustry.content,
  "vaccine-cold-chain": vaccineColdChainIndustry.content,
  "hospitals-blood-banks": hospitalsBloodBanksIndustry.content,
  "food-beverage": foodBeverageIndustry.content,
  "logistics-warehousing": logisticsWarehousingIndustry.content,
  "data-centers": dataCentersIndustry.content,
  laboratories: laboratoriesIndustry.content,
  chemical: chemicalIndustry.content,
  electronics: electronicsIndustry.content,
  textile: textileIndustry.content,
};
