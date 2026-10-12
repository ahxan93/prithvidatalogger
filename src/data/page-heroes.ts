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
