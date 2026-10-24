// /data-logger-ad-dhahirah-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ad-dhahirah-governorate",
  name: "Ad Dhahirah Governorate",
  type: "state",
  intro:
    "A logger in Ad Dhahirah Governorate mostly serves dates and farm produce, as well as market and shop trade. Ad Dhahirah Governorate occupies a broad dry plain on the western side of the Hajar mountains, where oasis towns and date farms cling to the foot of the ranges and the desert opens out beyond. Ibri is its main town, a market and farming centre with a hospital, shops and an industrial area, surrounded by gravel plains, palm gardens and distant hills. Summers are fierce and very dry, winter nights can be cool, and dust and sandstorms blow through in some seasons. Dates, farm produce, medicines and building materials wait in sheds and warehouses in such heat. The page below describes the town, its industrial area and the rooms where a temperature record would help.",
  localIndustries: [
    "Dates and farm produce",
    "Market and shop trade",
    "Industrial and workshop storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Ibri"],
  supportNote:
    "Enquiries from Ad Dhahirah Governorate are handled through the enquiry form, Call or WhatsApp. Name the town, the rooms and how they are cooled, and we reply with what looks workable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ad Dhahirah Governorate?",
      answer:
        "Ibri has a city page, and the Ibri Industrial Area has an area page under it. A town elsewhere on the plain can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a very dry plain still need humidity records?",
      answer:
        "Rare rain and storms bring sudden damp into stores that are dry the rest of the year, and dates, paper and some medicines react to the change, so a humidity log shows when it happened.",
    },
    {
      question: "What does a logger do through a long power cut?",
      answer:
        "It carries on recording from its own battery and keeps the readings in memory, so the hours of an outage are still on record when the site is connected again.",
    },
  ],
  listing: [
    { slug: "ibri", text: "A market and farming town at the edge of the desert, with date gardens, shops, a hospital and an industrial area, in fierce summer heat." },
  ],
  areaListing: [
    { slug: "ibri-industrial-area", text: "The industrial area beside Ibri, with workshops, warehouses, parts stores and building-material yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
