// Product data. Source of truth: docs/MASTER-BRIEF.md §2.
// Facts only from the brief. Prices are MRP in INR, excluding 18% GST;
// `mrp: null` means "Price on request" (Vayu, accessories, GSM/LoRa versions).

export type SeriesSlug =
  | "setu"
  | "nakshatra"
  | "rajmudra"
  | "dhruva"
  | "veer"
  | "virat"
  | "vayu"
  | "accessories";

/** Filter chips on /products (brief §7.2). */
export type ProductFilter = "temperature" | "temp-rh" | "multi-channel" | "gsm";

export type Connectivity = "wifi" | "gsm";

export type ProductVariant = {
  name: string;
  slug: string;
  /** What the variant measures, e.g. "4 × temperature" or "Internal temperature + RH". */
  sensors: string;
  /** Temperature range, e.g. "−30 to +70 °C". Undefined for accessories. */
  tempRange?: string;
  /** Humidity range on RH models. */
  rhRange?: string;
  /** Internal sensor or external probe. */
  sensorType?: "internal" | "external" | "internal + external";
  /** Probe / cable details, e.g. "3 m included, extendable to 50 m". */
  cable?: string;
  /** Battery, e.g. "7000 + 7000 mAh". */
  battery?: string;
  /** MRP in INR excluding GST; null = Price on request. */
  mrp: number | null;
  /** Accessories only: what it does. */
  description?: string;
};

export type ProductSeries = {
  slug: SeriesSlug;
  name: string;
  category: "series" | "accessories";
  /** Series page H1 (brief §7.3), e.g. "Nakshatra – WiFi Temperature & Humidity Data Logger". */
  headline: string;
  /** One line for cards and the homepage marquee. */
  summary: string;
  /** Number of measurement channels; undefined for accessories. */
  channels?: number;
  connectivity: Connectivity[];
  filters: ProductFilter[];
  /** "The name" story (brief §2). */
  nameMeaning?: string;
  /** Short "best for" line for the brands page. */
  bestFor: string;
  variants: ProductVariant[];
  /** Brief §5 keyword map; undefined where the brief sets none. */
  seo?: { primaryKeyword: string; supporting: string[] };
  // No per-series accessory compatibility list: compatibility is NOT confirmed
  // (owner decision, brief §1). Use ACCESSORY_COMPATIBILITY_NOTE instead.
};

// ---------------------------------------------------------------------------
// Shared facts (brief §2)
// ---------------------------------------------------------------------------

/** Common to all loggers; shown in every specs table. */
export const commonSpecs: { label: string; value: string }[] = [
  { label: "Accuracy", value: "±0.5 °C (±2 %RH on RH models)" },
  { label: "Resolution", value: "0.1 °C (0.1 %RH)" },
  { label: "Storage", value: "Up to 1,00,000 records" },
  { label: "Logging interval", value: "1–60 min (configurable)" },
  { label: "Cloud sync interval", value: "1–60 min (configurable)" },
  { label: "Battery life", value: "About 3 months at a 10-minute logging interval" },
  { label: "Charging", value: "Universal USB Type-C; rechargeable Li-ion battery" },
  {
    label: "Connectivity",
    value:
      "Wi-Fi, plus offline data download via PC software. GSM and LoRa versions available on request.",
  },
];

export const namingConvention: { term: string; meaning: string }[] = [
  { term: "X", meaning: "External probe on a 1 m cable." },
  { term: "Pro (Setu, Nakshatra)", meaning: "High-capacity 7000 + 7000 mAh battery." },
  { term: "Pro (multi-channel models)", meaning: "Temperature + RH sensors instead of temperature-only." },
];

/** Brief §2.9. Describe generically; never name the cloud software. */
export const monitoringFeatures: string[] = [
  "Real-time alerts via email, SMS, mobile app and dashboard",
  "Multi-level escalation (Level 1 → 2 → 3) if an alert isn't acknowledged",
  "Alert acknowledgement with root-cause and corrective-action notes",
  "Role-based user access and a complete audit trail (supports 21 CFR Part 11, GMP and GDP compliance)",
  "Location hierarchy for multi-site monitoring (organisation → site → room → device)",
  "Reports as graph, table or both; export to PDF, Excel and CSV",
  "Calibration and mapping reports stored against each device and room, ready for audits",
  "Substitute device while a logger is away for calibration, with its data merged back so there are no gaps",
  "Consignment (in-transit) monitoring with journey reports",
  "Door-open monitoring and hooter alarms",
];

/** Brief §2.10. */
export const connectivityOptions: { key: "wifi" | "gsm" | "lora"; name: string; description: string }[] = [
  { key: "wifi", name: "Wi-Fi", description: "For sites with Wi-Fi." },
  {
    key: "gsm",
    name: "GSM",
    description: "SIM-based. Works anywhere with mobile coverage, for remote sites and vehicles.",
  },
  {
    key: "lora",
    name: "LoRa",
    description:
      "Long-range, low-power radio covering several km. Reliable in large warehouses and obstructed areas; one gateway serves many devices.",
  },
];

// ---------------------------------------------------------------------------
// Series (brief §2.1–2.8)
// ---------------------------------------------------------------------------

const ACCESSORY_HOOTER = "external-hooter-with-door-sensor";
const ACCESSORY_DOCK = "charging-dock";

export const products: ProductSeries[] = [
  {
    slug: "setu",
    name: "Setu",
    category: "series",
    headline: "Setu – Single-Channel WiFi Data Logger",
    summary: "Single-channel WiFi temperature logger with an internal sensor or external probe.",
    channels: 1,
    connectivity: ["wifi"],
    filters: ["temperature"],
    nameMeaning:
      "Sanskrit \"Setu\" means bridge: the bridge from offline logging to live monitoring.",
    bestFor: "Refrigerators, freezers and single storage points.",
    variants: [
      { name: "Setu", slug: "setu", sensors: "Temperature", tempRange: "−30 to +70 °C", sensorType: "internal", battery: "3000 mAh", mrp: 5500 },
      { name: "Setu X", slug: "setu-x", sensors: "Temperature", tempRange: "−100 to +200 °C", sensorType: "external", cable: "1 m external probe", battery: "3000 mAh", mrp: 6500 },
      { name: "Setu Pro", slug: "setu-pro", sensors: "Temperature", tempRange: "−30 to +70 °C", sensorType: "internal", battery: "7000 + 7000 mAh", mrp: 8000 },
      { name: "Setu Pro X", slug: "setu-pro-x", sensors: "Temperature", tempRange: "−100 to +200 °C", sensorType: "external", cable: "1 m external probe", battery: "7000 + 7000 mAh", mrp: 9000 },
    ],
    seo: {
      primaryKeyword: "WiFi data logger",
      supporting: ["single channel", "external probe", "freezer data logger"],
    },
  },
  {
    slug: "nakshatra",
    name: "Nakshatra",
    category: "series",
    headline: "Nakshatra – IoT Temperature Data Logger with Humidity",
    summary: "Single-channel WiFi temperature and humidity logger, internal or external sensor.",
    channels: 1,
    connectivity: ["wifi"],
    filters: ["temp-rh"],
    nameMeaning:
      "The Nakshatras are the fixed celestial reference points used for observation, navigation and measurement: a constant reference for environmental conditions.",
    bestFor: "Rooms and stores where both temperature and humidity matter.",
    variants: [
      { name: "Nakshatra", slug: "nakshatra", sensors: "Temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "internal", battery: "3000 mAh", mrp: 6500 },
      { name: "Nakshatra X", slug: "nakshatra-x", sensors: "Temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "external", cable: "1 m external probe", battery: "3000 mAh", mrp: 7500 },
      { name: "Nakshatra Pro", slug: "nakshatra-pro", sensors: "Temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "internal", battery: "7000 + 7000 mAh", mrp: 10000 },
      { name: "Nakshatra Pro X", slug: "nakshatra-pro-x", sensors: "Temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "external", cable: "1 m external probe", battery: "7000 + 7000 mAh", mrp: 11000 },
    ],
    seo: {
      primaryKeyword: "IoT temperature data logger",
      supporting: ["WiFi RH logger", "warehouse humidity monitoring"],
    },
  },
  {
    slug: "rajmudra",
    name: "Rajmudra",
    category: "series",
    headline: "Rajmudra – 2-Channel WiFi Logger for Validation Studies",
    summary: "Two-channel WiFi logger for temperature, or temperature and humidity, at two points.",
    channels: 2,
    connectivity: ["wifi"],
    filters: ["multi-channel", "temperature", "temp-rh"],
    nameMeaning:
      "The Rajmudra was the royal seal of Chhatrapati Shivaji Maharaj, standing for authenticity, authority and trust: trusted environmental evidence for qualification, validation and comparative studies.",
    bestFor: "Qualification, validation and comparative studies across two points.",
    variants: [
      { name: "Rajmudra", slug: "rajmudra", sensors: "2 × temperature", tempRange: "−100 to +200 °C", sensorType: "external", cable: "3 m included, extendable to 50 m", battery: "7000 + 7000 mAh", mrp: 12000 },
      { name: "Rajmudra Pro", slug: "rajmudra-pro", sensors: "2 × temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "external", cable: "3 m included, extendable to 10 m", battery: "7000 + 7000 mAh", mrp: 15000 },
    ],
    seo: {
      primaryKeyword: "dual channel temperature data logger",
      supporting: ["2 channel logger", "validation studies"],
    },
  },
  {
    slug: "dhruva",
    name: "Dhruva",
    category: "series",
    headline: "Dhruva – 4-Channel WiFi Logger for Multi-Point Monitoring",
    summary: "Four-channel WiFi logger for multi-point temperature or temperature and humidity.",
    channels: 4,
    connectivity: ["wifi"],
    filters: ["multi-channel", "temperature", "temp-rh"],
    nameMeaning:
      "Dhruva is the Pole Star, a symbol of stability and dependable reference.",
    bestFor: "Multi-point monitoring in rooms, chambers and storage areas.",
    variants: [
      { name: "Dhruva", slug: "dhruva", sensors: "4 × temperature", tempRange: "−100 to +200 °C", sensorType: "external", cable: "3 m included, extendable to 50 m", battery: "7000 mAh", mrp: 17000 },
      { name: "Dhruva Pro", slug: "dhruva-pro", sensors: "4 × temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "external", cable: "3 m included, extendable to 10 m", battery: "7000 mAh", mrp: 19000 },
    ],
    seo: {
      primaryKeyword: "4 channel temperature data logger",
      supporting: ["multi-point monitoring"],
    },
  },
  {
    slug: "veer",
    name: "Veer",
    category: "series",
    headline: "Veer – 10-Channel WiFi Logger for Warehouses",
    summary: "Ten-channel WiFi logger for warehouses and multi-zone facilities.",
    channels: 10,
    connectivity: ["wifi"],
    filters: ["multi-channel", "temperature", "temp-rh"],
    nameMeaning: "Sanskrit \"Veer\" means brave, strong and dependable.",
    bestFor: "Warehouses and facilities with many monitoring points.",
    variants: [
      { name: "Veer", slug: "veer", sensors: "10 × temperature", tempRange: "−100 to +200 °C", sensorType: "external", cable: "3 m included, extendable to 50 m", battery: "7000 mAh", mrp: 25000 },
      { name: "Veer Pro", slug: "veer-pro", sensors: "10 × temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "external", cable: "3 m included, extendable to 10 m", battery: "7000 mAh", mrp: 30000 },
    ],
    seo: {
      primaryKeyword: "10 channel temperature data logger",
      supporting: ["warehouse monitoring system"],
    },
  },
  {
    slug: "virat",
    name: "Virat",
    category: "series",
    headline: "Virat – 16-Channel WiFi Logger for Large Facilities",
    summary: "Sixteen-channel WiFi logger for large facilities.",
    channels: 16,
    connectivity: ["wifi"],
    filters: ["multi-channel", "temperature", "temp-rh"],
    nameMeaning:
      "Sanskrit \"Virat\" means vast, powerful and all-encompassing: monitoring for large facilities.",
    bestFor: "Large facilities that need many points on one logger.",
    variants: [
      { name: "Virat", slug: "virat", sensors: "16 × temperature", tempRange: "−100 to +200 °C", sensorType: "external", cable: "3 m included, extendable to 50 m", battery: "7000 mAh", mrp: 45000 },
      { name: "Virat Pro", slug: "virat-pro", sensors: "16 × temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "external", cable: "3 m included, extendable to 10 m", battery: "7000 mAh", mrp: 50000 },
    ],
    seo: {
      primaryKeyword: "16 channel temperature data logger",
      supporting: ["large facility monitoring"],
    },
  },
  {
    slug: "vayu",
    name: "Vayu",
    category: "series",
    headline: "Vayu – GSM Data Logger for Remote Sites & Reefer Trucks",
    summary: "SIM-based GSM logger for sites and vehicles without Wi-Fi.",
    channels: 1,
    connectivity: ["gsm"],
    filters: ["gsm", "temp-rh"],
    nameMeaning:
      "Sanskrit \"Vayu\" means air or wind, which reaches everywhere. Vayu monitors where Wi-Fi doesn't reach.",
    bestFor: "Remote sites, reefer trucks, outdoor and no-Wi-Fi locations.",
    variants: [
      { name: "Vayu", slug: "vayu", sensors: "Internal temperature + RH", tempRange: "−30 to +70 °C", rhRange: "0–100 %RH", sensorType: "internal", battery: "5000 mAh", mrp: null },
      {
        name: "Vayu Pro",
        slug: "vayu-pro",
        sensors: "Internal temperature + RH, plus external temperature probe",
        tempRange: "Internal −30 to +70 °C; external −100 to +70 °C",
        rhRange: "0–100 %RH",
        sensorType: "internal + external",
        cable: "3 m external probe",
        battery: "5000 mAh",
        mrp: null,
      },
    ],
    seo: {
      primaryKeyword: "GSM data logger",
      supporting: ["SIM data logger", "reefer truck monitoring"],
    },
  },
  {
    slug: "accessories",
    name: "Accessories",
    category: "accessories",
    headline: "Data Logger with Alarm – Hooter, Door Sensor & Charging Dock",
    summary: "Audible alarms, door monitoring and spare-battery charging for Prithvi loggers.",
    connectivity: ["wifi"],
    filters: [],
    bestFor: "Adding on-site alarms, door monitoring and a charged spare battery.",
    seo: { primaryKeyword: "data logger with alarm", supporting: ["hooter", "door sensor"] },
    variants: [
      {
        name: "External Hooter with Door Sensor",
        slug: ACCESSORY_HOOTER,
        sensors: "Up to 4 door sensors",
        cable: "Configurable cable length",
        mrp: null,
        description:
          "Wi-Fi hooter giving instant audible alarms on any excursion. Supports up to 4 door sensors, with an alarm if a door stays open beyond the set time. One hooter can serve multiple loggers. Cable length configurable. 12 V DC adapter, 12 V external hooter. Logs door open/close and excursion events.",
      },
      {
        name: "Charging Dock",
        slug: ACCESSORY_DOCK,
        sensors: "—",
        mrp: null,
        description:
          "Charges replaceable logger batteries so a charged spare is always ready, minimising downtime.",
      },
    ],
  },
];

/** Shown with the accessories section on every logger page (owner decision, brief §1). */
export const ACCESSORY_COMPATIBILITY_NOTE =
  "Accessory compatibility is confirmed by our team when we prepare your quote.";

/** Shown on the accessories page (owner decision, brief §1). */
export const ACCESSORY_WORKS_WITH_NOTE =
  "Works with Prithvi loggers – confirm compatibility for your model with our team.";

/** The accessories "series" (hooter, charging dock). */
export function getAccessories(): ProductVariant[] {
  return products.find((product) => product.category === "accessories")?.variants ?? [];
}

// ---------------------------------------------------------------------------
// Lookups and price formatting
// ---------------------------------------------------------------------------

export function getProductBySlug(slug: string): ProductSeries | undefined {
  return products.find((product) => product.slug === slug);
}

/** The seven logger series (everything except accessories). */
export function getLoggerSeries(): ProductSeries[] {
  return products.filter((product) => product.category === "series");
}

/**
 * Related series for a product page: logger series that share the most filter
 * tags, then the closest channel count. Never includes the series itself.
 */
export function getRelatedSeries(series: ProductSeries, count = 3): ProductSeries[] {
  const shared = (other: ProductSeries) => other.filters.filter((f) => series.filters.includes(f)).length;
  const distance = (other: ProductSeries) => Math.abs((other.channels ?? 1) - (series.channels ?? 1));
  return getLoggerSeries()
    .filter((other) => other.slug !== series.slug)
    .sort((a, b) => shared(b) - shared(a) || distance(a) - distance(b))
    .slice(0, count);
}

/** "wifi temperature data logger" → "WiFi Temperature Data Logger" (for headings). */
export function keywordTitle(keyword: string): string {
  const keep: Record<string, string> = { wifi: "WiFi", gsm: "GSM", rh: "RH" };
  return keyword
    .split(" ")
    .map((word) => keep[word.toLowerCase()] ?? (/^[a-z]/.test(word) && !["and", "or", "for", "with"].includes(word) ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

/** Finds a variant (or accessory) anywhere in the catalogue by its slug. */
export function getVariantBySlug(
  slug: string,
): { series: ProductSeries; variant: ProductVariant } | undefined {
  for (const series of products) {
    const variant = series.variants.find((v) => v.slug === slug);
    if (variant) return { series, variant };
  }
  return undefined;
}

/** Indian digit grouping: 100000 → "1,00,000". */
export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** "MRP ₹6,500 + 18% GST" or "Price on request" (brief §6). */
export function formatMrp(mrp: number | null): string {
  return mrp === null ? "Price on request" : `MRP ${formatInr(mrp)} + 18% GST`;
}

/** Lowest MRP in a series, or null if no variant has a public price. */
export function lowestMrp(series: ProductSeries): number | null {
  const prices = series.variants.map((v) => v.mrp).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

/** "From MRP ₹5,500 + GST" for cards, or "Price on request". */
export function formatFromPrice(series: ProductSeries): string {
  const min = lowestMrp(series);
  return min === null ? "Price on request" : `From MRP ${formatInr(min)} + GST`;
}
