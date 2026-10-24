// /data-logger-ibb-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ibb-governorate",
  name: "Ibb Governorate",
  type: "state",
  intro:
    "Any logger in Ibb Governorate is arranged case by case, whether for terrace farming and produce or food processing and trade. Ibb Governorate sits in the green southern highlands of Yemen, where rain from the monsoon reaches the mountains for much of the year and terraced fields climb the hillsides. The city of Ibb stands on a hill above a fertile plain, and the historic hill town of Jibla, linked with Queen Arwa, lies close by. Grain, fruit, coffee and vegetables grow on the terraces and pass through town markets. Cool air, frequent mist and heavy rain mean that damp, not heat, is often the main worry in a store. Medicines, food and farm produce all need steady storage. The page below describes the city and the rooms where a record of temperature and humidity would help.",
  localIndustries: [
    "Terrace farming and produce",
    "Food processing and trade",
    "Medicine and vaccine storage",
    "Small workshops and stores",
  ],
  citiesServed: ["Ibb"],
  supportNote:
    "Requests from Ibb Governorate are weighed case by case. Name the town, the stores you want to watch and how damp they get, and we reply with what looks workable for that place.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ibb Governorate?",
      answer:
        "Ibb has a city page. Other towns in the governorate can be put to us through the enquiry form, and more pages are added only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a wet highland call for humidity records?",
      answer:
        "Frequent rain and mist bring damp into stores, and grain, paper and cartons all react to it, so a humidity trend beside the temperature shows when a room has turned wet.",
    },
    {
      question: "Is a single logger enough for a small clinic?",
      answer:
        "One logger with a phone alert can watch a vaccine refrigerator if a router is within reach, and further points can be added to the same account as the need grows.",
    },
  ],
  listing: [
    { slug: "ibb", text: "A hill city above a fertile plain in the green highlands, with terraced farms, markets, hospitals and damp, cool weather." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
