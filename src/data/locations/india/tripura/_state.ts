// /data-logger-tripura | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "tripura",
  name: "Tripura",
  type: "state",
  intro:
    "A logger in Tripura mostly serves Agartala's hospitals, laboratories and wholesale godowns. Tripura is a small state in the far south-west of the North East, almost surrounded by Bangladesh, and its storage is concentrated in Agartala, the capital, near the border. Trade crosses at Akhaura, rubber, bamboo, tea and pineapples come from the hills, gas fields feed local power stations, and hospitals and a university serve the plains. A long road through Assam and Meghalaya, a railway and an airport tie the state to the rest of India. The air is hot and humid and the monsoon is heavy, so produce, medicines and cartons spoil quickly without cooling. This page introduces the state, and the city page covers Agartala.",
  localIndustries: [
    "Rubber, bamboo and agro processing",
    "Hospitals and university laboratories",
    "Border trade and wholesale",
    "Gas-fed power and light industry",
  ],
  citiesServed: ["Agartala"],
  supportNote:
    "Supply, installation support and site visits for Tripura sites are arranged from our Mumbai office. Tell us the town, the market or the estate and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Tripura?",
      answer:
        "Agartala has a city page. Another town in the state can be raised through the enquiry form and we confirm how supply and a visit could be arranged.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do loggers help a trader who moves goods across the border?",
      answer:
        "A logger placed in the consignment records how long goods waited at the crossing and on the road, and the report can be exported for the buyer and the shipper.",
    },
    {
      question: "Why is a humidity reading useful in a Tripura store?",
      answer:
        "The air is damp for much of the year, so cartons, rubber goods and fabrics take on moisture, and a humidity trend shows the day a store needs a dehumidifier or better ventilation.",
    },
  ],
  listing: [
    { slug: "agartala", text: "The border-side capital of markets, rubber and bamboo trade, a medical college, a university and trade crossings into Bangladesh." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
