// /data-logger-dadra-and-nagar-haveli-and-daman-and-diu | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "dadra-and-nagar-haveli-and-daman-and-diu",
  name: "Dadra and Nagar Haveli and Daman and Diu",
  type: "state",
  intro:
    "A logger in Dadra and Nagar Haveli and Daman and Diu mostly serves pharma, plastics and packaging plants. The Union Territory of Dadra and Nagar Haveli and Daman and Diu was formed in 2020 by joining two former territories, and its three places lie far apart. Silvassa, inland among the foothills, and Daman, on the coast beside Vapi, are the two industrial centres, with pharmaceutical, plastics, packaging, textile and engineering plants on planned estates, while Diu is a small island off the Saurashtra coast, given over to tourism and fishing. All three share a humid coastal climate and a heavy monsoon, and the sea adds salt to the air. Heat, damp and storm outages test cold rooms, chemical stores and hotel kitchens alike. The page for each place describes its stores and suggests loggers to match.",
  localIndustries: [
    "Pharmaceutical and plastics manufacturing",
    "Packaging and engineering works",
    "Distilleries and beverage bottling",
    "Tourism kitchens and fishing",
  ],
  citiesServed: ["Silvassa", "Daman", "Diu"],
  supportNote:
    "Supply, installation support and site visits for the Union Territory are arranged from our Mumbai office. Tell us the place, the estate and what the rooms hold.",
  faqs: [
    {
      question: "Why does this Union Territory have one page for three places?",
      answer:
        "It is one administrative unit, so we group Silvassa, Daman and Diu under it, although each place has its own page because their estates, hotels and harbours are very different.",
    },
    {
      question: "Can I watch a temperature data logger in Silvassa and one in Vapi on one account?",
      answer:
        "Both lie beside Gujarat and Maharashtra, and a firm with a plant here and another in Vapi or the Palghar belt can watch them together on one account.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How should a store plan for the monsoon on this coast?",
      answer:
        "Heavy rain brings damp air and power cuts, so we place humidity-reading loggers in dry stores and set alerts for lost mains power, which tells the person responsible that a room is no longer protected.",
    },
  ],
  listing: [
    { slug: "silvassa", text: "The inland headquarters town of Dadra and Nagar Haveli, with Naroli, Amli and Masat estates of pharma, plastics, textile and engineering plants." },
    { slug: "daman", text: "A coastal town beside Vapi, with Kachigam, Bhimpore and Somnath estates, packaging and bottling plants, a fishing harbour and beach hotels." },
    { slug: "diu", text: "A small island off the Saurashtra coast of fish landings, ice plants, beach hotels and a modest industrial estate." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
