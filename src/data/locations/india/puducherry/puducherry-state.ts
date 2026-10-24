// /data-logger-puducherry-state | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "puducherry",
  name: "Puducherry",
  type: "state",
  intro:
    "A logger in Puducherry mostly serves pharma plants, hotels and hospitals. The Union Territory of Puducherry is made of separate coastal enclaves, and our pages cover two of them that lie far apart. Puducherry city, the French-planned seaside town and capital, holds industrial estates of pharmaceutical, food, engineering and electronics plants beside hotels, universities and a large medical institute. Karaikal, a separate enclave in the Cauvery delta surrounded by Tamil Nadu, is a smaller town of rice mills, fisheries, a port and a hospital campus. Both share a hot, humid climate, a north-east monsoon and cyclone seasons that bring long power cuts and flooded roads. Open a town below for its estates, its stores and the loggers we suggest.",
  localIndustries: [
    "Pharmaceutical and electronics manufacturing",
    "Hospitality and tourism kitchens",
    "Rice milling and seafood",
    "Hospitals and universities",
  ],
  citiesServed: ["Puducherry","Karaikal"],
  supportNote:
    "Supply, installation support and site visits for the Union Territory's sites are arranged from our Mumbai office. Tell us the town, the estate or the store and what the rooms hold.",
  faqs: [
    {
      question: "Why does this Union Territory have pages for two towns far apart?",
      answer:
        "Its parts are separate enclaves with different trades, so Puducherry and Karaikal each have a page of their own, and a firm with a site in each can watch both on one account.",
    },
    {
      question: "How should a store prepare a temperature data logger in Puducherry for a cyclone?",
      answer:
        "Storms bring days of power loss, so a logger with a battery keeps recording and an alert for a lost mains supply tells the responsible person that a cold room has lost its protection.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Is Karaikal close to Puducherry city?",
      answer:
        "No. Karaikal is a separate enclave in the Cauvery delta surrounded by Tamil Nadu, and travel between the two crosses Tamil Nadu districts, so we plan visits to each separately.",
    },
  ],
  listing: [
    { slug: "puducherry", text: "The French-planned seaside capital of pharma and electronics estates, beach hotels, a medical institute and a university in cyclone-prone air." },
    { slug: "karaikal", text: "A separate coastal enclave in the Cauvery delta with rice mills, fisheries, a port and a hospital campus, surrounded by Tamil Nadu." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
