// Extra page data for /locations/[...slug] (brief §7.9), keyed by the node's
// slug path ("india/maharashtra"). The unique copy (intro, industries,
// cities, support note, FAQs) lives on the node itself in locations.ts. Cities
// built to the playbook template carry their own meta title, description and
// recommended series on the node, so they have no entry here.
//
// Rules: no country-specific regulations, delivery times or statistics. GSM
// models are never recommended outside India (network compatibility is not
// confirmed; see GSM_NETWORK_NOTE). Validated by `npm run check:data`.

export type LocationContent = {
  /** Meta description; ≤ 155 characters, unique. */
  metaDescription: string;
  /** Series slugs shown as "Recommended products" (a reasoned starting point). */
  recommended: string[];
  /** How the place reads after "in", when the plain name is awkward ("the UAE"). */
  inName?: string;
};

export const locationContent: Record<string, LocationContent> = {
  india: {
    metaDescription:
      "Temperature data loggers in India: WiFi and GSM loggers supplied from Mumbai, with remote setup support and calibration by VEGA. Get a solution.",
    recommended: ["nakshatra", "veer", "vayu"],
  },
  "india/maharashtra": {
    metaDescription:
      "Temperature data loggers in Maharashtra, supplied from our Mumbai office to Pune, Thane, Nashik, Nagpur and beyond. Calibration by VEGA Calibrations.",
    recommended: ["nakshatra", "dhruva", "virat"],
  },
  "india/maharashtra/navi-mumbai": {
    metaDescription:
      "Temperature data loggers for the Turbhe, Rabale, Mahape and Taloja estates of Navi Mumbai, supplied from Mumbai with site visits. Get Solution.",
    recommended: ["nakshatra", "dhruva", "veer"],
  },
  "india/maharashtra/thane-bhiwandi": {
    metaDescription:
      "Temperature data loggers for the estates and warehouse parks of Thane and Bhiwandi, supplied from Mumbai with site visits. Get Solution.",
    recommended: ["nakshatra", "veer", "virat"],
  },
  "saudi-arabia": {
    metaDescription:
      "Temperature data logger supply to Saudi Arabia: WiFi loggers for warehouses, cold rooms and pharmacies in Riyadh, Jeddah and Dammam. Get a solution.",
    recommended: ["nakshatra", "veer", "virat"],
  },
  uae: {
    metaDescription:
      "Temperature data logger supply to the UAE: WiFi temperature and humidity loggers for Dubai, Abu Dhabi and Sharjah, with remote setup support.",
    recommended: ["setu", "nakshatra", "veer"],
    inName: "the UAE",
  },
  "uae/dubai": {
    metaDescription:
      "Temperature data loggers in Dubai for hotels, cold stores, clinics and warehouses. Live readings and instant alerts, supplied from India.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  qatar: {
    metaDescription:
      "Temperature data loggers in Qatar for hospitals, hotels, caterers and food distributors in Doha. Supplied from India with remote setup support.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  oman: {
    metaDescription:
      "Temperature data loggers in Oman for seafood cold storage, food distribution and hospitals in Muscat, Sohar and Salalah. Get a solution.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  kuwait: {
    metaDescription:
      "Temperature data loggers in Kuwait for warehouses, pharmacies, co-operative stores and food outlets, with alerts when limits are crossed.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  bahrain: {
    metaDescription:
      "Temperature data loggers in Bahrain for food distributors, hospitals, pharmacies and logistics firms, with multi-site monitoring on one dashboard.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  yemen: {
    metaDescription:
      "Temperature data loggers for healthcare providers and distributors in Yemen. Supply is arranged case by case. Contact us with your requirements.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
};

/** Approximate map position (longitude, latitude) of each country's marker on the
 *  stylised presence map. Markers only: no borders are drawn. */
export const countryMarkers: Record<string, { lon: number; lat: number; label: string }> = {
  india: { lon: 72.9, lat: 19.1, label: "India" },
  "saudi-arabia": { lon: 46.7, lat: 24.7, label: "Saudi Arabia" },
  uae: { lon: 54.4, lat: 24.4, label: "UAE" },
  qatar: { lon: 51.5, lat: 25.3, label: "Qatar" },
  oman: { lon: 58.4, lat: 23.6, label: "Oman" },
  kuwait: { lon: 48.0, lat: 29.4, label: "Kuwait" },
  bahrain: { lon: 50.6, lat: 26.2, label: "Bahrain" },
  yemen: { lon: 44.2, lat: 15.4, label: "Yemen" },
};
