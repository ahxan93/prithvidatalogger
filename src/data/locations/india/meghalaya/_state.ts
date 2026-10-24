// /data-logger-meghalaya | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "meghalaya",
  name: "Meghalaya",
  type: "state",
  intro:
    "A logger in Meghalaya mostly serves Shillong's hotel kitchens, hospitals and laboratories. Meghalaya is a plateau state of rolling hills, pine forests and one of the wettest regions on earth, and its storage is concentrated in Shillong, the capital, on the Khasi Hills, with an industrial belt at Byrnihat on the Assam border. Tourism fills the hotels and restaurants of the capital for much of the year, a regional medical institute and a hill university draw patients and students, and cement, ferro-alloy and food plants stand in the lowlands. The climate is cool and extremely rainy in the hills, damp and fog-bound in winter, so stores of paper, cartons and food take on moisture. This page introduces the state, and the city page covers Shillong.",
  localIndustries: [
    "Hospitality and tourism kitchens",
    "Hospitals and university laboratories",
    "Cement, ferro-alloy and food plants",
    "Wholesale distribution",
  ],
  citiesServed: ["Shillong"],
  supportNote:
    "Supply, installation support and site visits for Meghalaya sites are arranged from our Mumbai office. Tell us the town, the hotel or the estate and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Meghalaya?",
      answer:
        "Shillong has a city page. Anywhere else in the state can be raised through the enquiry form and we confirm what can be arranged.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why watch humidity in a hill hotel store?",
      answer:
        "Rain and mist keep the air damp for much of the year, so cartons, flour and linen take on moisture, and a humidity trend shows the day a store needs drying or a fresh shelf.",
    },
    {
      question: "What helps when a storm cuts the power on the hill roads?",
      answer:
        "A battery keeps each logger recording through the outage, and an alert for a lost mains supply warns the person responsible that a refrigerator or cold room has lost its protection.",
    },
  ],
  listing: [
    { slug: "shillong", text: "The Khasi Hills capital of hotels, a regional medical institute and a hill university, close to the Byrnihat industrial belt." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
