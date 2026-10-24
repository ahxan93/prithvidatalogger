// /data-logger-andhra-pradesh | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "andhra-pradesh",
  name: "Andhra Pradesh",
  type: "state",
  intro:
    "Andhra Pradesh stretches along a long, hot and humid coast on the Bay of Bengal, and its storage follows the ports, the rivers and the railway between Chennai and Howrah. Visakhapatnam in the north-east holds a major port, a steel works, a shipyard, a refinery and pharmaceutical estates; Vijayawada on the Krishna is the trading and transport junction of the coastal belt; Guntur stores chilli, cotton and tobacco; Tirupati combines pilgrimage, hospitality and electronics, and farther along the coast Nellore, Kakinada and the planned city of Sri City add fish farming, ports and factories. The state is separate from Telangana, which has its own pages. Cyclones, a heavy monsoon and long hot spells mean that cold rooms, godowns and hospital refrigerators face storms and outages as well as simple heat. Open a city below for its estates, its stores and the loggers we suggest.",
  localIndustries: [
    "Port logistics and seafood export",
    "Pharmaceutical manufacturing",
    "Spice, grain and cold storage",
    "Hospitals and pilgrim hospitality",
  ],
  citiesServed: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Sri City", "Kakinada"],
  supportNote:
    "Supply, installation support and site visits for Andhra Pradesh sites are arranged from our Mumbai office. Tell us the port, the estate or the town and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Andhra Pradesh?",
      answer:
        "Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore, Sri City and Kakinada each have a city page. Any other town in the state can be added by writing to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why should a cold store plan for a cyclone season?",
      answer:
        "Storms bring long power cuts, and a loss of cooling can pass unnoticed in an empty building. Loggers record on their batteries and send an alert for a lost mains supply, so the person responsible hears about it at once.",
    },
    {
      question: "Are Andhra Pradesh and Telangana pages separate?",
      answer:
        "Yes. Sites in Andhra Pradesh are listed here and those in Telangana under their own state page, and a company with plants in both can still watch them together on one account.",
    },
  ],
  listing: [
    { slug: "visakhapatnam", text: "The port city of a steel works, shipyard, refinery, fishing harbour and Parawada pharma estate, in salty, humid air and cyclone weather." },
    { slug: "vijayawada", text: "The Krishna-side trading and rail junction, with Autonagar workshops, grain, spice and mango markets, cold stores and hospitals." },
    { slug: "guntur", text: "The chilli city of the delta, with cold stores, tobacco and cotton godowns, spinning and rice mills and a teaching hospital." },
    { slug: "tirupati", text: "The pilgrim city below the Tirumala hills, with hotel kitchens, a medical institute, laboratories and electronics estates near Renigunta." },
    { slug: "nellore", text: "A Penna-side district of shrimp and fish farms, seafood plants, rice mills, granite works and the Krishnapatnam port." },
    { slug: "sri-city", text: "A planned industrial city on the Tamil Nadu border, with electronics, auto-part, appliance and food plants and contract warehouses." },
    { slug: "kakinada", text: "A Godavari-delta port of rice and fertiliser, gas-fed works, an economic zone and shrimp and fish processors." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
