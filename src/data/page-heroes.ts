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
    "chhatrapati-sambhajinagar", "kolhapur", "satara", "solapur", "ratnagiri-lote",
    "rajkot", "bharuch", "gandhinagar", "halol-panchmahal",
    "morbi", "jamnagar", "mundra", "kandla",
    "ghaziabad", "kanpur", "agra", "varanasi",
    "meerut", "prayagraj", "bareilly", "moradabad",
    "faridabad", "panipat", "sonipat", "rohtak", "hisar", "ambala", "karnal",
    "warangal", "karimnagar", "nizamabad",
    "mysuru", "hubballi-dharwad", "mangaluru", "belagavi", "tumakuru",
    "hosur",
    "madurai", "tiruchirappalli", "salem", "tiruppur", "erode", "vellore", "tuticorin",
    "mohali", "panchkula",
    "solan", "parwanoo", "paonta-sahib", "una", "shimla",
    "thiruvananthapuram", "kozhikode", "thrissur", "kollam",
    "jodhpur", "udaipur", "kota", "ajmer",
    "bhilwara", "bhiwadi", "neemrana",
    "bhopal", "jabalpur", "gwalior",
    "pithampur", "ujjain", "dewas",
    "howrah", "siliguri", "durgapur",
    "asansol", "kharagpur", "haldia",
    "ludhiana", "amritsar", "jalandhar", "patiala",
    "bathinda", "rajpura",
    "vijayawada", "guntur", "tirupati",
    "nellore", "sri-city", "kakinada",
    "dehradun", "roorkee",
    "rudrapur-pantnagar", "kashipur", "kotdwar",
    "silvassa", "daman", "diu",
    "bhubaneswar", "cuttack", "rourkela",
    "paradip", "jharsuguda",
    "ranchi", "jamshedpur", "dhanbad", "bokaro",
    "raipur", "bhilai", "bilaspur", "korba",
    "patna", "hajipur", "muzaffarpur",
    "gaya", "bhagalpur",
    "guwahati", "dibrugarh", "silchar", "tezpur",
    "imphal", "shillong", "agartala",
    "gangtok", "rangpo",
    "jammu", "srinagar", "samba", "kathua",
    "puducherry", "karaikal",
  ].map((slug) => ({ slug, region: "india" as const })),
  // Saudi Arabia (appended so earlier assignments never move).
  ...["al-kharj", "diriyah", "al-majmaah", "makkah", "taif", "rabigh", "king-abdullah-economic-city", "al-khobar", "jubail", "al-ahsa", "dhahran", "qatif", "ras-al-khair", "madinah", "yanbu", "buraidah", "unaizah", "abha", "khamis-mushait", "bisha", "jazan", "najran", "al-baha", "tabuk", "hail", "sakaka", "arar", "aden", "mukalla", "seiyun", "shibam", "zinjibar", "sanaa", "taiz", "mocha", "hodeidah", "zabid", "bajil", "ibb", "dhamar", "marib", "lahij", "sadah", "abu-dhabi", "al-ain", "ruwais", "madinat-zayed", "liwa", "sharjah", "khor-fakkan", "kalba", "ajman", "umm-al-quwain", "ras-al-khaimah", "fujairah", "dibba", "doha", "al-rayyan", "al-wakrah", "mesaieed", "al-wukair", "al-khor", "ras-laffan", "lusail", "al-daayen", "umm-salal", "al-shamal", "al-shahaniya", "dukhan", "muscat", "muttrah", "seeb", "bawshar", "quriyat", "sohar", "saham", "al-suwaiq", "barka", "rustaq", "nakhal", "nizwa", "bahla", "izki", "sumail", "ibri", "buraimi", "salalah", "duqm", "sur", "ibra", "bidiyah", "khasab", "kuwait-city", "hawalli", "salmiya", "farwaniya", "khaitan", "jleeb-al-shuyoukh", "ahmadi", "fahaheel", "wafra", "khiran", "jahra", "sulaibiya", "sabah-al-salem", "mubarak-al-kabeer", "manama", "juffair", "adliya"].map((slug) => ({ slug, region: "gcc" as const })),
];

/**
 * Cities grouped by their state hub. The 10 loggers give only 45 pairs (41 after the pairs held by
 * other pages), so once every pair is taken a city in a hub may reuse a pair that no city in the
 * SAME hub shows. Maharashtra, Gujarat, Uttar Pradesh, Haryana, Telangana, Karnataka, Tamil Nadu, Punjab, Himachal Pradesh, Kerala, Rajasthan, Madhya Pradesh and West Bengal, Andhra Pradesh, Uttarakhand, Dadra and Nagar Haveli and Daman and Diu, Odisha, Jharkhand, Chhattisgarh, Bihar, Assam, Manipur, Meghalaya, Tripura, Sikkim, Jammu and Kashmir and Puducherry, all the Saudi regions need this; a city outside a hub never shares a pair.
 */
const HUB_OF: Record<string, string> = Object.fromEntries([
  ...[
    "mumbai", "navi-mumbai", "panvel", "bhiwandi", "pune", "thane", "nashik", "nagpur", "thane-bhiwandi",
    "vasai-palghar", "chhatrapati-sambhajinagar", "kolhapur", "satara", "solapur", "ratnagiri-lote",
  ].map((slug) => [slug, "maharashtra"]),
  ...[
    "noida", "lucknow", "ghaziabad", "kanpur", "agra", "varanasi", "meerut", "prayagraj", "bareilly", "moradabad",
  ].map((slug) => [slug, "uttar-pradesh"]),
  ...[
    "manesar", "gurugram", "faridabad", "panipat", "sonipat", "rohtak", "hisar", "ambala", "karnal", "panchkula",
  ].map((slug) => [slug, "haryana"]),
  ...[
    "hyderabad", "warangal", "karimnagar", "nizamabad",
  ].map((slug) => [slug, "telangana"]),
  ...[
    "bengaluru", "mysuru", "hubballi-dharwad", "mangaluru", "belagavi", "tumakuru",
  ].map((slug) => [slug, "karnataka"]),
  ...[
    "chennai", "coimbatore", "hosur", "madurai", "tiruchirappalli", "salem", "tiruppur", "erode", "vellore", "tuticorin",
  ].map((slug) => [slug, "tamil-nadu"]),
  ...[
    "mohali", "ludhiana", "amritsar", "jalandhar", "patiala", "bathinda", "rajpura",
  ].map((slug) => [slug, "punjab"]),
  ...[
    "kochi", "thiruvananthapuram", "kozhikode", "thrissur", "kollam",
  ].map((slug) => [slug, "kerala"]),
  ...[
    "jaipur", "jodhpur", "udaipur", "kota", "ajmer", "bhilwara", "bhiwadi", "neemrana",
  ].map((slug) => [slug, "rajasthan"]),
  ...[
    "indore", "bhopal", "jabalpur", "gwalior", "pithampur", "ujjain", "dewas",
  ].map((slug) => [slug, "madhya-pradesh"]),
  ...[
    "kolkata", "howrah", "siliguri", "durgapur", "asansol", "kharagpur", "haldia",
  ].map((slug) => [slug, "west-bengal"]),
  ...[
    "visakhapatnam", "vijayawada", "guntur", "tirupati", "nellore", "sri-city", "kakinada",
  ].map((slug) => [slug, "andhra-pradesh"]),
  ...[
    "haridwar", "dehradun", "roorkee", "rudrapur-pantnagar", "kashipur", "kotdwar",
  ].map((slug) => [slug, "uttarakhand"]),
  ...[
    "silvassa", "daman", "diu",
  ].map((slug) => [slug, "dnh-dd"]),
  ...[
    "bhubaneswar", "cuttack", "rourkela",
    "paradip", "jharsuguda",
  ].map((slug) => [slug, "odisha"]),
  ...[
    "ranchi", "jamshedpur", "dhanbad", "bokaro",
  ].map((slug) => [slug, "jharkhand"]),
  ...[
    "raipur", "bhilai", "bilaspur", "korba",
  ].map((slug) => [slug, "chhattisgarh"]),
  ...[
    "patna", "hajipur", "muzaffarpur", "gaya", "bhagalpur",
  ].map((slug) => [slug, "bihar"]),
  ...[
    "guwahati", "dibrugarh", "silchar", "tezpur",
  ].map((slug) => [slug, "assam"]),
  ...[
    "imphal",
  ].map((slug) => [slug, "manipur"]),
  ...[
    "shillong",
  ].map((slug) => [slug, "meghalaya"]),
  ...[
    "agartala",
  ].map((slug) => [slug, "tripura"]),
  ...[
    "gangtok", "rangpo",
  ].map((slug) => [slug, "sikkim"]),
  ...[
    "jammu", "srinagar", "samba", "kathua",
  ].map((slug) => [slug, "jammu-and-kashmir"]),
  ...[
    "puducherry", "karaikal",
  ].map((slug) => [slug, "puducherry"]),
  ...[
    "riyadh", "al-kharj", "diriyah", "al-majmaah",
  ].map((slug) => [slug, "riyadh-region"]),
  ...[
    "jeddah", "makkah", "taif", "rabigh", "king-abdullah-economic-city",
  ].map((slug) => [slug, "makkah-region"]),
  ...[
    "dammam", "al-khobar", "jubail", "al-ahsa", "dhahran", "qatif", "ras-al-khair",
  ].map((slug) => [slug, "eastern-province"]),
  ...[
    "madinah", "yanbu",
  ].map((slug) => [slug, "madinah-region"]),
  ...[
    "buraidah", "unaizah",
  ].map((slug) => [slug, "qassim-region"]),
  ...[
    "abha", "khamis-mushait", "bisha",
  ].map((slug) => [slug, "asir-region"]),
  ...[
    "jazan",
  ].map((slug) => [slug, "jazan-region"]),
  ...[
    "najran",
  ].map((slug) => [slug, "najran-region"]),
  ...[
    "al-baha",
  ].map((slug) => [slug, "al-baha-region"]),
  ...[
    "tabuk",
  ].map((slug) => [slug, "tabuk-region"]),
  ...[
    "hail",
  ].map((slug) => [slug, "hail-region"]),
  ...[
    "sakaka",
  ].map((slug) => [slug, "al-jawf-region"]),
  ...[
    "arar",
  ].map((slug) => [slug, "northern-borders-region"]),
  ...[
    "aden",
  ].map((slug) => [slug, "aden-governorate"]),
  ...[
    "mukalla", "seiyun", "shibam",
  ].map((slug) => [slug, "hadramaut-governorate"]),
  ...[
    "zinjibar",
  ].map((slug) => [slug, "abyan-governorate"]),
  ...[
    "sanaa",
  ].map((slug) => [slug, "amanat-al-asimah"]),
  ...["taiz", "mocha"].map((slug) => [slug, "taiz-governorate"]),
  ...["hodeidah", "zabid", "bajil"].map((slug) => [slug, "al-hudaydah-governorate"]),
  ...["ibb"].map((slug) => [slug, "ibb-governorate"]),
  ...["dhamar"].map((slug) => [slug, "dhamar-governorate"]),
  ...["marib"].map((slug) => [slug, "marib-governorate"]),
  ...["lahij"].map((slug) => [slug, "lahij-governorate"]),
  ...["sadah"].map((slug) => [slug, "sadah-governorate"]),
  ...["abu-dhabi", "al-ain", "ruwais", "madinat-zayed", "liwa"].map((slug) => [slug, "abu-dhabi-emirate"]),
  ...["dubai"].map((slug) => [slug, "dubai-emirate"]),
  ...["sharjah", "khor-fakkan", "kalba"].map((slug) => [slug, "sharjah-emirate"]),
  ...["ajman"].map((slug) => [slug, "ajman-emirate"]),
  ...["umm-al-quwain"].map((slug) => [slug, "umm-al-quwain-emirate"]),
  ...["ras-al-khaimah"].map((slug) => [slug, "ras-al-khaimah-emirate"]),
  ...["fujairah", "dibba"].map((slug) => [slug, "fujairah-emirate"]),
  ...["doha"].map((slug) => [slug, "doha-municipality"]),
  ...["al-rayyan"].map((slug) => [slug, "al-rayyan-municipality"]),
  ...["al-wakrah", "mesaieed", "al-wukair"].map((slug) => [slug, "al-wakrah-municipality"]),
  ...["al-khor", "ras-laffan"].map((slug) => [slug, "al-khor-and-al-thakhira-municipality"]),
  ...["lusail", "al-daayen"].map((slug) => [slug, "al-daayen-municipality"]),
  ...["umm-salal"].map((slug) => [slug, "umm-salal-municipality"]),
  ...["al-shamal"].map((slug) => [slug, "al-shamal-municipality"]),
  ...["al-shahaniya", "dukhan"].map((slug) => [slug, "al-shahaniya-municipality"]),
  ...["muscat", "muttrah", "seeb", "bawshar", "quriyat"].map((slug) => [slug, "muscat-governorate"]),
  ...["sohar", "saham", "al-suwaiq"].map((slug) => [slug, "al-batinah-north-governorate"]),
  ...["barka", "rustaq", "nakhal"].map((slug) => [slug, "al-batinah-south-governorate"]),
  ...["nizwa", "bahla", "izki", "sumail"].map((slug) => [slug, "ad-dakhiliyah-governorate"]),
  ...["ibri"].map((slug) => [slug, "ad-dhahirah-governorate"]),
  ...["buraimi"].map((slug) => [slug, "al-buraimi-governorate"]),
  ...["salalah"].map((slug) => [slug, "dhofar-governorate"]),
  ...["duqm"].map((slug) => [slug, "al-wusta-governorate"]),
  ...["sur"].map((slug) => [slug, "ash-sharqiyah-south-governorate"]),
  ...["ibra", "bidiyah"].map((slug) => [slug, "ash-sharqiyah-north-governorate"]),
  ...["khasab"].map((slug) => [slug, "musandam-governorate"]),
  ...["kuwait-city"].map((slug) => [slug, "al-asimah-governorate"]),
  ...["hawalli", "salmiya"].map((slug) => [slug, "hawalli-governorate"]),
  ...["farwaniya", "khaitan", "jleeb-al-shuyoukh"].map((slug) => [slug, "farwaniya-governorate"]),
  ...["ahmadi", "fahaheel", "wafra", "khiran"].map((slug) => [slug, "ahmadi-governorate"]),
  ...["jahra", "sulaibiya"].map((slug) => [slug, "jahra-governorate"]),
  ...["sabah-al-salem", "mubarak-al-kabeer"].map((slug) => [slug, "mubarak-al-kabeer-governorate"]),
  ...["manama", "juffair", "adliya"].map((slug) => [slug, "capital-governorate"]),
  ...[
    "baddi", "solan", "parwanoo", "paonta-sahib", "una", "shimla",
  ].map((slug) => [slug, "himachal-pradesh"]),
  ...[
    "ahmedabad", "vapi", "ankleshwar", "surat", "vadodara", "rajkot", "bharuch", "gandhinagar", "halol-panchmahal",
    "morbi", "jamnagar", "mundra", "kandla",
  ].map((slug) => [slug, "gujarat"]),
]);

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
const hubPairs = new Map<string, Set<string>>();

function assignCity(slug: string, region: Region): [DeviceKey, DeviceKey] {
  const existing = cityAssignments.get(slug);
  if (existing) return existing;
  const pairs = pairsFor(region);
  // Start from a slug-derived position, then probe to the next unused pair.
  const start = fnv1a(slug) % pairs.length;
  let chosen: [DeviceKey, DeviceKey] | undefined;
  for (let step = 0; step < pairs.length && !chosen; step++) {
    const candidate = pairs[(start + step) % pairs.length];
    if (!usedPairs.has(pairKey(...candidate))) chosen = candidate;
  }
  // Every pair is taken site-wide: fall back to one no city in the same hub shows.
  const hub = HUB_OF[slug];
  if (!chosen && hub) {
    const inHub = hubPairs.get(hub) ?? new Set<string>();
    for (let step = 0; step < pairs.length && !chosen; step++) {
      const candidate = pairs[(start + step) % pairs.length];
      if (!inHub.has(pairKey(...candidate))) chosen = candidate;
    }
  }
  chosen ??= pairs[start];
  usedPairs.add(pairKey(...chosen));
  if (hub) hubPairs.set(hub, (hubPairs.get(hub) ?? new Set<string>()).add(pairKey(...chosen)));
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
export function cityHeroAssignments(): { slug: string; region: Region; hub?: string; keys: DeviceKey[] }[] {
  return CITY_REGISTRY.map((c) => ({ slug: c.slug, region: c.region, hub: HUB_OF[c.slug], keys: assignCity(c.slug, c.region) }));
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
