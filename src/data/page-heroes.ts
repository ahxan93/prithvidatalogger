// Hero visuals: which real Prithvi logger photo (from public/images/products)
// each page shows, and what its decorative live reading looks like.
//
// Rules: photos are never cropped (object-contain on a soft background); the
// reading is illustrative only, always inside a safe cold-chain range
// (about 2.8–7.2 °C and 43–57 %RH); no prices, no invented statistics.

/** Position of a device's screen inside its photo, as percentages of the image. */
export type ScreenBox = { left: number; top: number; width: number; height: number };

export type ReadingSpec = {
  /**
   * single: one temperature (plus humidity when `humidity`)
   * grid:   `temps` temperatures in `cols` columns
   * pairs:  `temps` rows of temperature + humidity
   * text:   fixed status lines (accessories), no temperature
   */
  layout: "single" | "grid" | "pairs" | "text";
  /** OLED = bright digits on black; LCD = dark digits on a grey panel. */
  style: "oled" | "lcd";
  temps?: number;
  cols?: number;
  humidity?: boolean;
  /** Wi-Fi + green ONLINE dot header row (only where the screen is big enough). */
  header?: boolean;
  /** e.g. "GSM"; shown on the screen. */
  badge?: string;
  lines?: string[];
};

export type HeroDevice = {
  src: string;
  alt: string;
  /** Pixel size of the optimised photo (sets the aspect ratio, so nothing crops). */
  width: number;
  height: number;
  screen?: ScreenBox;
  reading?: ReadingSpec;
};

const P = "/images/products";

export const deviceCatalogue = {
  setu: {
    src: `${P}/setu.webp`,
    alt: "Setu WiFi temperature data logger with its display showing a live reading",
    width: 1200,
    height: 879,
    screen: { left: 19.4, top: 27.8, width: 19.8, height: 14.5 },
    reading: { layout: "single", style: "oled", header: true },
  },
  nakshatra: {
    src: `${P}/nakshatra.webp`,
    alt: "Nakshatra WiFi temperature and humidity data logger showing live temperature and humidity",
    width: 1059,
    height: 1200,
    screen: { left: 31.6, top: 19.7, width: 36.3, height: 17.4 },
    reading: { layout: "single", style: "oled", humidity: true, header: true },
  },
  rajmudra: {
    src: `${P}/rajmudra.webp`,
    alt: "Rajmudra two-channel WiFi data logger showing two live temperature readings",
    width: 1200,
    height: 786,
    screen: { left: 21, top: 22.5, width: 26.5, height: 21.5 },
    reading: { layout: "grid", style: "oled", temps: 2, cols: 2, header: true },
  },
  dhruva: {
    src: `${P}/dhruva.webp`,
    alt: "Dhruva four-channel WiFi data logger with four live temperature readings on its display",
    width: 1200,
    height: 800,
    screen: { left: 19, top: 20, width: 20.5, height: 17 },
    reading: { layout: "grid", style: "oled", temps: 4, cols: 2 },
  },
  veer: {
    src: `${P}/veer.webp`,
    alt: "Veer ten-channel WiFi temperature data logger mounted in a pharmaceutical storeroom",
    width: 670,
    height: 1200,
    screen: { left: 25, top: 52.5, width: 16.5, height: 6.2 },
    reading: { layout: "grid", style: "oled", temps: 10, cols: 2 },
  },
  "veer-pro": {
    src: `${P}/veer-pro.webp`,
    alt: "Veer Pro ten-channel data logger with probes for temperature and humidity monitoring",
    width: 1200,
    height: 643,
    screen: { left: 31.8, top: 21.5, width: 12.2, height: 15.5 },
    reading: { layout: "pairs", style: "oled", temps: 4 },
  },
  virat: {
    src: `${P}/virat.webp`,
    alt: "Virat sixteen-channel WiFi temperature data logger with its probes laid out",
    width: 1200,
    height: 643,
    screen: { left: 31.8, top: 21.5, width: 12.2, height: 15.5 },
    reading: { layout: "grid", style: "oled", temps: 16, cols: 4 },
  },
  "virat-pro": {
    src: `${P}/virat-pro.webp`,
    alt: "Virat Pro sixteen-channel data logger with temperature and humidity probes",
    width: 1200,
    height: 643,
    screen: { left: 31.8, top: 21.5, width: 12.2, height: 15.5 },
    reading: { layout: "pairs", style: "oled", temps: 4 },
  },
  vayu: {
    src: `${P}/vayu.webp`,
    alt: "Vayu GSM temperature and humidity data logger with an external probe",
    width: 1024,
    height: 1024,
    screen: { left: 15, top: 29.5, width: 33.1, height: 16.1 },
    reading: { layout: "single", style: "lcd", humidity: true, badge: "GSM" },
  },
  "vayu-pro": {
    src: `${P}/vayu-pro.webp`,
    alt: "Vayu Pro GSM data logger with an external probe on a pharmacy storeroom shelf",
    width: 670,
    height: 1200,
    screen: { left: 35.8, top: 44.3, width: 27.6, height: 5.2 },
    reading: { layout: "single", style: "lcd", humidity: true, badge: "GSM" },
  },
  hooter: {
    src: `${P}/external-hooter-with-door-sensor.webp`,
    alt: "External hooter with door sensor, an accessory that sounds an alarm when a door is left open",
    width: 1152,
    height: 922,
    screen: { left: 20.6, top: 23.8, width: 19.4, height: 12.5 },
    reading: { layout: "text", style: "oled", lines: ["Door D1: closed", "Door D2: closed", "Alarm: ready"] },
  },
  dock: {
    src: `${P}/charging-dock.webp`,
    alt: "Charging dock that keeps spare logger batteries charged and ready",
    width: 1195,
    height: 896,
  },
} satisfies Record<string, HeroDevice>;

export type DeviceKey = keyof typeof deviceCatalogue;

/** Looks a device up by its photo path (used by the series gallery). */
export function deviceBySrc(src: string): HeroDevice | undefined {
  return (Object.values(deviceCatalogue) as HeroDevice[]).find((d) => d.src === src);
}

export type PageHeroId =
  | "home"
  | "products"
  | "brands"
  | "industries"
  | "services"
  | "calibration"
  | "temperature-mapping"
  | "validation"
  | "about"
  | "global-presence"
  | "locations"
  | "contact"
  | "blog";

/**
 * One entry per page; no two share the same hero. Series pages (Setu to Vayu)
 * are not listed: their gallery shows the series' own photo, taken from the
 * catalogue above by path. The home hero is its own component and is listed
 * here only so the full picture lives in one place.
 */
export const pageHeroes: Record<PageHeroId, DeviceKey[]> = {
  home: ["nakshatra"],
  products: ["setu", "nakshatra", "rajmudra", "dhruva"],
  brands: ["veer", "virat", "vayu"],
  industries: ["veer-pro"],
  services: ["virat-pro"],
  calibration: ["vayu-pro"],
  "temperature-mapping": ["veer-pro", "virat-pro"],
  validation: ["dhruva", "veer"],
  about: ["hooter"],
  "global-presence": ["nakshatra", "vayu"],
  locations: ["setu", "vayu-pro"],
  contact: ["dock"],
  blog: ["rajmudra", "dock"],
};

export function getPageHeroDevices(id: PageHeroId): HeroDevice[] {
  return pageHeroes[id].map((key) => deviceCatalogue[key] as HeroDevice);
}

// ---------------------------------------------------------------------------
// City pages
// ---------------------------------------------------------------------------

type Region = "india" | "gcc";

/**
 * Every city in docs/LOCATION-PAGES-PLAYBOOK.md section 4, plus the planned
 * ones, in a fixed order. New cities are appended so earlier assignments never
 * move. Each gets a distinct pair of logger photos.
 */
const CITY_REGISTRY: { slug: string; region: Region }[] = [
  ...[
    "mumbai", "navi-mumbai", "panvel", "bhiwandi", "pune", "ahmedabad", "delhi", "noida", "lucknow", "manesar",
    "chandigarh", "baddi", "jaipur", "indore", "hyderabad", "bengaluru", "chennai", "coimbatore", "kochi", "goa",
    "kolkata",
  ].map((slug) => ({ slug, region: "india" as const })),
  ...["riyadh", "jeddah", "dammam", "dubai"].map((slug) => ({ slug, region: "gcc" as const })),
  ...[
    "vadodara", "gurugram", "thane", "vapi", "ankleshwar", "nashik", "nagpur", "visakhapatnam", "haridwar", "surat",
    "thane-bhiwandi",
    "vasai-palghar",
  ].map((slug) => ({ slug, region: "india" as const })),
];

const LOGGER_KEYS: DeviceKey[] = [
  "setu", "nakshatra", "rajmudra", "dhruva", "veer", "veer-pro", "virat", "virat-pro", "vayu", "vayu-pro",
];
/** GSM models are never shown on GCC pages (network compatibility is not confirmed there). */
const GSM_KEYS = new Set<DeviceKey>(["vayu", "vayu-pro"]);

const pairKey = (a: DeviceKey, b: DeviceKey) => [a, b].sort().join("+");

/** Combinations already used by the non-city pages above, so no hero is shared. */
const RESERVED_PAIRS = new Set(
  Object.values(pageHeroes)
    .filter((keys) => keys.length === 2)
    .map(([a, b]) => pairKey(a, b)),
);

function fnv1a(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

function pairsFor(region: Region): [DeviceKey, DeviceKey][] {
  const pool = region === "gcc" ? LOGGER_KEYS.filter((k) => !GSM_KEYS.has(k)) : LOGGER_KEYS;
  const pairs: [DeviceKey, DeviceKey][] = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      if (!RESERVED_PAIRS.has(pairKey(pool[i], pool[j]))) pairs.push([pool[i], pool[j]]);
    }
  }
  return pairs;
}

const cityAssignments = new Map<string, [DeviceKey, DeviceKey]>();
const usedPairs = new Set<string>();

function assignCity(slug: string, region: Region): [DeviceKey, DeviceKey] {
  const existing = cityAssignments.get(slug);
  if (existing) return existing;
  const pairs = pairsFor(region);
  // Start from a slug-derived position, then probe to the next unused pair.
  const start = fnv1a(slug) % pairs.length;
  let chosen = pairs[start];
  for (let step = 0; step < pairs.length; step++) {
    const candidate = pairs[(start + step) % pairs.length];
    if (!usedPairs.has(pairKey(...candidate))) {
      chosen = candidate;
      break;
    }
  }
  usedPairs.add(pairKey(...chosen));
  cityAssignments.set(slug, chosen);
  return chosen;
}

// Registry cities are assigned in order at load, so the result never depends
// on which page happens to be rendered first.
for (const city of CITY_REGISTRY) assignCity(city.slug, city.region);

/** The two logger photos for a city page: deterministic and distinct per city. */
export function getCityHeroDevices(slug: string, region: Region): HeroDevice[] {
  return assignCity(slug, region).map((key) => deviceCatalogue[key] as HeroDevice);
}

/** For check:data: every registry city with its assigned combination. */
export function cityHeroAssignments(): { slug: string; region: Region; keys: DeviceKey[] }[] {
  return CITY_REGISTRY.map((c) => ({ slug: c.slug, region: c.region, keys: assignCity(c.slug, c.region) }));
}

// ---------------------------------------------------------------------------
// Blog covers
// ---------------------------------------------------------------------------

/**
 * Cover photo for each post, chosen for its topic. New posts without an entry
 * get a deterministic pick from the loggers, so every post always has a cover.
 */
const blogCovers: Record<string, DeviceKey> = {
  // The simplest, most typical single-point logger: the "what is a data logger" picture.
  "what-is-a-temperature-data-logger": "setu",
  // Many probes laid out across a space: what temperature mapping measures.
  "temperature-mapping-vs-monitoring": "virat",
  // The GSM logger: the model that most clearly differs from WiFi.
  "wifi-vs-gsm-vs-lora-data-loggers": "vayu",
  // An external probe on a storeroom shelf: the instrument a calibration certificate covers.
  "why-nabl-calibration-matters": "vayu-pro",
};

export function getBlogCoverDevice(slug: string): HeroDevice {
  const key = blogCovers[slug] ?? LOGGER_KEYS[fnv1a(slug) % LOGGER_KEYS.length];
  return deviceCatalogue[key] as HeroDevice;
}

export function blogCoverKey(slug: string): DeviceKey | undefined {
  return blogCovers[slug];
}

/** Devices for an explicit list of keys (used by area pages, which carry their own pair). */
export function devicesForKeys(keys: DeviceKey[]): HeroDevice[] {
  return keys.map((key) => deviceCatalogue[key] as HeroDevice);
}
