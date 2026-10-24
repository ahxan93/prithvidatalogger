// /data-logger-morbi | City | parent: Gujarat
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "morbi",
  name: "Morbi",
  type: "city",
  intro:
    "Morbi stands on the Machchhu river in Saurashtra and is the centre of India's ceramic industry. A very large number of units make wall tiles, floor tiles, vitrified tiles and sanitaryware in clusters along the roads to Rajkot and Wankaner, and the town also turns out clocks and packaging. Clay and minerals arrive by lorry, kilns run on gas, and finished tiles leave in boxes for the ports of Kutch. A temperature data logger in Morbi looks after the places around a kiln that need steady conditions: glaze and colour stores, adhesive and chemical godowns, electrical panel rooms, packing halls and the warehouses of exporters. Summers are fierce, dust is constant and the monsoon is thin, so the main enemy is heat trapped under metal roofs, and a record showing when a room crossed its limit is worth having.",
  climateAngle:
    "The climate is semi-arid with scorching summers and little rain, and kilns add their own heat to metal-roofed sheds, so stores close to the firing lines run much warmer than the outside air and swing sharply between shifts.",
  areas: [
    {
      name: "Rajkot road ceramic cluster",
      note: "A long string of tile and sanitaryware plants along the highway to Rajkot, each with its own clay yard, kilns, glaze store and packing hall.",
    },
    {
      name: "Wankaner road cluster",
      note: "Another belt of plants on the road to Wankaner, where newer units on larger plots hold finished tiles in tall warehouses ready for dispatch.",
    },
    {
      name: "Old town and market",
      note: "The older part of Morbi beside the river, with dense shops, clinics, a hospital and godowns for the traders who supply the factories.",
    },
    {
      name: "Wankaner",
      note: "A smaller town on the same corridor with its own ceramic units, where plant owners often keep spares, adhesives and packing material in mid-sized sheds.",
    },
    {
      name: "Maliya Miyana",
      note: "A salt-producing area in the district, with pans, crushing units and stores in a hot, salty and windy landscape.",
    },
  ],
  industries: [
    {
      slug: "logistics-warehousing",
      sentence:
        "Tile warehouses and export packing halls hold boxed goods in tall sheds, and a reading at floor and roof level shows how hot the upper racks run before a container is loaded.",
    },
    {
      slug: "chemical",
      sentence:
        "Glaze, colour and adhesive godowns hold powders and liquids with storage limits, and a dated record shows how a room behaved during the hottest part of the day.",
    },
    {
      slug: "electronics",
      sentence:
        "Kiln control rooms and electrical panel rooms hold drives and instruments that fail when they overheat, and an alert reaches the maintenance lead before a panel trips.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals and clinics serve a large workforce and the nearby villages, and their vaccine fridges and medicine stores need alarms that reach staff through hot, dusty days and power cuts.",
    },
  ],
  recommendedSeries: [
    {
      slug: "veer",
      reason:
        "Ten channels watch a tall export warehouse across bays and heights, so one report shows where the roof traps the afternoon heat.",
    },
    {
      slug: "nakshatra",
      reason:
        "Reads humidity as well as temperature, which tells a packaging store when the brief monsoon begins to soften cartons.",
    },
    {
      slug: "setu",
      reason:
        "A single-point logger with an external probe fits a panel room or a chemical cabinet without changing how the room is used.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Morbi, which part of a ceramic plant needs a logger?",
      answer:
        "Most plants start with the glaze and colour store, the adhesive godown and the electrical panel room, since heat harms them, and then add the finished-tile warehouse. Tell us the layout and we suggest the order.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can dust and heat near a kiln damage a logger?",
      answer:
        "Yes, so we advise fixing loggers away from the firing lines and from open dust, and using an external probe on a cable for hotter spots. Ask us about probe length for your layout.",
    },
    {
      question: "Can several plants along the Rajkot road be watched together?",
      answer:
        "Yes. Every plant is its own site on the dashboard with alerts for its own people, and an owner of several units sees them together and exports a report for any period.",
    },
    {
      question: "Is calibration available for loggers used in Morbi?",
      answer:
        "Our parent company, VEGA Calibrations, handles calibration of loggers and probes and supports mapping of larger stores. Send the model and range and we explain how it is arranged for your plant.",
    },
  ],
  nearby: [
    { slug: "rajkot", name: "Rajkot" },
    { slug: "kandla", name: "Kandla" },
    { slug: "mundra", name: "Mundra" },
    { slug: "jamnagar", name: "Jamnagar" },
  ],
  metaTitle: "Temperature Data Loggers in Morbi | Prithvi",
  metaDescription:
    "Morbi, Gujarat: temperature data loggers for the ceramic cluster's glaze stores, panel rooms and tile warehouses. Get Solution for Morbi.",
  indexable: true,
};

export default city;
