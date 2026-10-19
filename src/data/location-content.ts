// Extra page data for the location pages (/data-logger-{slug}) (brief §7.9), keyed by the node's
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
      "Temperature data loggers across India: WiFi and GSM loggers by state, city and industrial area, with set-up support and calibration. Get Solution.",
    recommended: ["nakshatra", "veer", "vayu"],
  },
  "india/maharashtra": {
    metaDescription:
      "Temperature data loggers in Maharashtra: Mumbai, Pune, Nashik, Nagpur, Kolhapur, Solapur and more cities and areas. Get Solution.",
    recommended: ["nakshatra", "dhruva", "virat"],
  },
  "india/gujarat": {
    metaDescription:
      "Temperature data loggers across Gujarat: Ahmedabad, Vadodara, Rajkot, Gandhinagar, Surat and the Vapi to Bharuch chemical belt. Get Solution.",
    recommended: ["nakshatra", "dhruva", "veer"],
  },
  "india/delhi": {
    metaDescription:
      "Temperature data loggers across the Delhi region: hospitals, medicine distributors, food stores and the Okhla, Bawana and Narela estates. Get Solution.",
    recommended: ["dhruva", "setu", "vayu"],
    inName: "the Delhi Region",
  },
  "india/uttar-pradesh": {
    metaDescription:
      "Temperature data loggers in Uttar Pradesh: Noida, Lucknow, Kanpur, Agra, Varanasi, Meerut, Moradabad and more cities. Get Solution.",
    recommended: ["virat", "nakshatra", "dhruva"],
  },
  "india/haryana": {
    metaDescription:
      "Temperature data loggers in Haryana: Gurugram, Faridabad, Manesar, Panchkula, Karnal, Hisar and more cities and industrial areas. Get Solution.",
    recommended: ["veer", "rajmudra", "vayu"],
  },
  "india/telangana": {
    metaDescription:
      "Temperature data loggers in Telangana: Hyderabad's pharma estates and labs, plus Warangal, Karimnagar and Nizamabad's mills and godowns. Get Solution.",
    recommended: ["rajmudra", "veer", "nakshatra"],
  },
  "india/karnataka": {
    metaDescription:
      "Temperature data loggers in Karnataka: Bengaluru (Bangalore), Mysuru, Mangaluru, Belagavi, Hubballi-Dharwad and Tumakuru. Get Solution.",
    recommended: ["setu", "dhruva", "nakshatra"],
  },
  "india/tamil-nadu": {
    metaDescription:
      "Temperature data loggers in Tamil Nadu: Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Hosur and more cities. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/punjab": {
    metaDescription:
      "Temperature data loggers in Punjab: Mohali, Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda and Rajpura. Get Solution.",
    recommended: ["dhruva", "nakshatra", "vayu"],
  },
  "india/chandigarh": {
    metaDescription:
      "Temperature data loggers in the Chandigarh region: hospitals, medicine distributors and food depots across Mohali and Panchkula. Get Solution.",
    recommended: ["nakshatra", "dhruva", "vayu"],
    inName: "the Chandigarh Region",
  },
  "india/himachal-pradesh": {
    metaDescription:
      "Temperature data loggers in Himachal Pradesh: Baddi, Solan, Parwanoo, Paonta Sahib, Una and Shimla plants, stores and hospitals. Get Solution.",
    recommended: ["rajmudra", "virat", "setu"],
  },
  "india/kerala": {
    metaDescription:
      "Temperature data loggers in Kerala: Kochi, Thiruvananthapuram, Kozhikode, Thrissur and Kollam's cold chain, labs and hospitals. Get Solution.",
    recommended: ["dhruva", "vayu", "virat"],
  },
  "india/goa": {
    metaDescription:
      "Temperature data loggers in the State of Goa: pharmaceutical plants at Verna and Kundaim and coastal hotel kitchens. Get Solution.",
    recommended: ["rajmudra", "setu", "nakshatra"],
    inName: "the State of Goa",
  },
  "india/rajasthan": {
    metaDescription:
      "Temperature data loggers in Rajasthan: Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bhilwara, Bhiwadi and Neemrana. Get Solution.",
    recommended: ["veer", "rajmudra", "vayu"],
  },
  "india/madhya-pradesh": {
    metaDescription:
      "Temperature data loggers in Madhya Pradesh: Indore, Bhopal, Jabalpur, Gwalior, Pithampur, Ujjain and Dewas. Get Solution.",
    recommended: ["virat", "dhruva", "setu"],
  },
  "india/dadra-and-nagar-haveli-and-daman-and-diu": {
    metaDescription:
      "Temperature data loggers in Silvassa, Daman and Diu: pharma, plastics and packaging plants, harbour stores and hotel kitchens. Get Solution.",
    recommended: ["rajmudra", "nakshatra", "vayu"],
    inName: "Silvassa, Daman & Diu",
  },
  "india/odisha": {
    metaDescription:
      "Temperature data loggers in Odisha: Bhubaneswar, Cuttack, Rourkela, Paradip and Jharsuguda. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/uttarakhand": {
    metaDescription:
      "Temperature data loggers in Uttarakhand: Haridwar, Dehradun, Roorkee, Rudrapur-Pantnagar, Kashipur and Kotdwar. Get Solution.",
    recommended: ["virat", "rajmudra", "vayu"],
  },
  "india/andhra-pradesh": {
    metaDescription:
      "Temperature data loggers in Andhra Pradesh: Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore, Sri City and Kakinada. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/west-bengal": {
    metaDescription:
      "Temperature data loggers in West Bengal: Kolkata, Howrah, Siliguri, Durgapur, Asansol, Kharagpur and Haldia. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "saudi-arabia": {
    metaDescription:
      "Temperature data loggers in Saudi Arabia: WiFi loggers for Riyadh, Jeddah and Dammam warehouses, supplied from India and set up remotely. Get Solution.",
    recommended: ["nakshatra", "veer", "virat"],
  },
  uae: {
    metaDescription:
      "Temperature data loggers in the UAE: WiFi loggers for Dubai warehouses, food importers and hotel kitchens, set up remotely. Get Solution.",
    recommended: ["setu", "nakshatra", "veer"],
    inName: "the UAE",
  },
  qatar: {
    metaDescription:
      "Temperature data loggers in Qatar: WiFi loggers for Doha warehouses, cold stores, hotels and clinics, supplied from India. Get Solution.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  oman: {
    metaDescription:
      "Temperature data loggers in Oman: WiFi loggers for Muscat, Sohar and Salalah pharmacies, hospitals and food distributors. Get Solution.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  kuwait: {
    metaDescription:
      "Temperature data loggers in Kuwait: WiFi loggers for warehouses, cold stores, hospitals and kitchens, supplied from India. Get Solution.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  bahrain: {
    metaDescription:
      "Temperature data loggers in Bahrain: WiFi loggers for warehouses, cold stores, hospitals and hotels, supplied from India. Get Solution.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  yemen: {
    metaDescription:
      "Temperature data loggers for Yemen, arranged case by case: loggers that keep recording through power and network outages. Get Solution.",
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
