// Industry data. Source of truth: docs/MASTER-BRIEF.md §3.
// Compliance wording stays general (no legal claims).

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
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    summary: "Continuous temperature and humidity records for medicine storage and stability areas.",
    applications: ["Medicine storage rooms", "Drug warehouses", "Stability areas"],
    recommended: ["nakshatra", "rajmudra-pro", "dhruva-pro"],
    whyItMatters:
      "Medicines can lose potency when storage drifts outside its labelled range, often without any visible sign. Continuous logging with alerts lets QA teams act as soon as an excursion happens, and the stored records give auditors a complete history instead of hand-written spot checks.",
    image: "/images/industries/pharmaceutical.jpg",
    seo: {
      primaryKeyword: "pharmaceutical temperature monitoring",
      supporting: ["GDP", "21 CFR Part 11 data logger"],
    },
  },
  {
    slug: "vaccine-cold-chain",
    name: "Vaccine & Cold Chain",
    summary: "Live monitoring for vaccine fridges, cold rooms and every leg of the journey.",
    applications: [
      "Vaccine refrigerators",
      "Cold rooms",
      "Reefer trucks and containers",
      "Last-mile delivery",
    ],
    recommended: ["setu-x", "nakshatra", "vayu"],
    whyItMatters:
      "Vaccines stay effective only inside a narrow temperature band, and one unnoticed excursion can mean discarding a whole batch. Real-time alerts and in-transit monitoring show exactly where and when a problem started, from the cold room to the delivery point.",
    image: "/images/industries/vaccine-cold-chain.jpg",
    seo: {
      primaryKeyword: "vaccine cold chain monitoring",
      supporting: ["vaccine refrigerator data logger"],
    },
  },
  {
    slug: "hospitals-blood-banks",
    name: "Hospitals & Blood Banks",
    summary: "Round-the-clock monitoring for blood, medicines and lab samples.",
    applications: ["Blood banks", "Pharmacies", "Medicine stores", "Laboratories"],
    recommended: ["setu", "nakshatra", "external-hooter-with-door-sensor"],
    whyItMatters:
      "Blood products, medicines and samples are stored around the clock, including nights and weekends when fewer staff are on duty. Automatic alerts and an on-site hooter make sure a failing refrigerator or an open door is noticed before stock is lost.",
    image: "/images/industries/hospitals-blood-banks.jpg",
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    summary: "Temperature records for cold storage, processing and commercial kitchens.",
    applications: [
      "Cold storage",
      "Processing plants",
      "Restaurants and cloud kitchens",
    ],
    recommended: ["setu", "setu-x", "nakshatra"],
    whyItMatters:
      "Food safety depends on keeping chilled and frozen products at the right temperature from receipt to service. Continuous records replace manual log sheets, reduce spoilage and make food-safety checks quicker to prepare for.",
    image: "/images/industries/food-beverage.jpg",
  },
  {
    slug: "logistics-warehousing",
    name: "Logistics & Warehousing",
    summary: "Multi-point monitoring for warehouses, distribution centres and consignments.",
    applications: [
      "Temperature-controlled warehouses",
      "Distribution centres",
      "In-transit consignments",
    ],
    recommended: ["veer", "virat", "vayu"],
    whyItMatters:
      "Large storage areas have hot and cold spots that a single sensor cannot see, and goods in transit are out of sight altogether. Multi-channel loggers cover many points from one device, and GSM loggers keep reporting on the road.",
    image: "/images/industries/logistics-warehousing.jpg",
  },
  {
    slug: "data-centers",
    name: "Data Centres & Server Rooms",
    summary: "Temperature and humidity alerts that help prevent overheating and downtime.",
    applications: [
      "Server room temperature and humidity",
      "Overheating prevention",
      "Network and UPS rooms",
    ],
    recommended: ["nakshatra", "dhruva-pro"],
    whyItMatters:
      "Servers and network equipment fail faster when rooms run too hot or humidity drifts too high or low. Early alerts give IT teams time to fix a cooling problem before it turns into downtime.",
    image: "/images/industries/data-centers.jpg",
  },
  {
    slug: "laboratories",
    name: "Research Laboratories",
    summary: "Reliable records for sample storage, testing and R&D environments.",
    applications: [
      "Biological sample storage",
      "Environmental testing",
      "R&D labs",
    ],
    recommended: ["setu-x", "rajmudra"],
    whyItMatters:
      "Research results are only as reliable as the conditions the samples were kept in. A complete temperature history protects months of work and supports data integrity when results are reviewed.",
    image: "/images/industries/laboratories.jpg",
  },
  {
    slug: "chemical",
    name: "Chemical",
    summary: "Monitoring for chemical stores, raw materials and sensitive process areas.",
    applications: [
      "Chemical storage rooms",
      "Raw-material warehouses",
      "Sensitive processing areas",
    ],
    recommended: ["dhruva", "veer"],
    whyItMatters:
      "Many chemicals degrade or become unstable outside their specified storage temperature. Multi-point monitoring across stores and process areas helps protect material quality and supports safe handling.",
    image: "/images/industries/chemical.jpg",
  },
  {
    slug: "electronics",
    name: "Electronics Manufacturing",
    summary: "Temperature and humidity control for components, clean rooms and fabs.",
    applications: [
      "Component storage",
      "Clean rooms",
      "Semiconductor facilities",
    ],
    recommended: ["nakshatra-pro", "veer-pro"],
    whyItMatters:
      "Electronic components are sensitive to moisture and temperature during storage and assembly. Continuous humidity and temperature records help reduce defects and show that production conditions stayed within limits.",
    image: "/images/industries/electronics.jpg",
  },
  {
    slug: "textile",
    name: "Textile",
    summary: "Humidity monitoring for yarn, fabric and production areas.",
    applications: [
      "Yarn and fabric storage",
      "Humidity-sensitive production areas",
      "Finished-goods warehouses",
    ],
    recommended: ["nakshatra", "veer-pro"],
    whyItMatters:
      "Yarn and fabric react to humidity, which affects strength, weight and how smoothly production runs. Monitoring humidity across storage and production areas helps keep quality consistent from batch to batch.",
    image: "/images/industries/textile.jpg",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

/** Industries that recommend a series, or any of its variants. */
export function getIndustriesForSeries(seriesSlug: string, variantSlugs: string[]): Industry[] {
  const refs = new Set([seriesSlug, ...variantSlugs]);
  return industries.filter((industry) => industry.recommended.some((ref) => refs.has(ref)));
}
