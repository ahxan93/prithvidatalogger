// /data-logger-manipur | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "manipur",
  name: "Manipur",
  type: "state",
  intro:
    "A logger in Manipur mostly serves Imphal's hospitals, medicine stores and markets. Manipur is a hill state of the North East with an oval valley at its centre, and almost all of its storage sits in the valley around Imphal, where the capital, the airport, the main hospitals and the markets stand. Goods reach the state by long hill roads from Assam and Nagaland, and the road to Myanmar at Moreh carries border trade. Rain is heavy through the summer, the valley air is humid, and landslides can close the roads for days, so medicines, food and fabrics wait in godowns longer than their owners would like. Winters are cool and dry. Cold rooms and hospital refrigerators must therefore be watched through outages as well as heat. This page introduces the state, and the city page covers Imphal.",
  localIndustries: [
    "Handloom and handicraft trade",
    "Medical and pharmaceutical distribution",
    "Food and general wholesale",
    "Hospitals and institutes",
  ],
  citiesServed: ["Imphal"],
  supportNote:
    "Supply, installation support and site visits for Manipur sites are arranged from our Mumbai office. Tell us the town or the market and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Manipur?",
      answer:
        "Imphal has a city page. For any other town in the state, write to us through the enquiry form and we confirm how a visit and supply could be arranged.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a long hill road change what a logger needs to do?",
      answer:
        "A load may spend days on winding roads, so a GSM logger placed with the goods records every hour of the journey and keeps its readings in memory when signal fades, then sends them once coverage returns.",
    },
    {
      question: "Why is a separate page kept for Manipur and not a combined North East page?",
      answer:
        "Each state has its own capital, climate pattern, roads and trade, so we describe them one by one and link neighbouring states only where they are genuinely close.",
    },
  ],
  listing: [
    { slug: "imphal", text: "The valley capital of handloom and market trade, with a medical institute, an airport and long hill roads to Assam and Myanmar." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
