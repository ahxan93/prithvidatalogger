// /data-logger-qassim-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "qassim-region",
  name: "Qassim Region",
  type: "state",
  intro:
    "A logger in Qassim Region mostly serves dates and farm produce, as well as food and dairy depots. The Qassim Region sits in the heart of the kingdom, a flat sandy plain irrigated from wells and famous for dates and farming. Buraidah, the capital, Unaizah and Ar Rass are the three main towns, each with markets, hospitals and farm-supply depots, and the dates of the region are packed, stored and sent across the kingdom and abroad. Summers are extremely hot and dry, winter nights are cold, and dust storms are common in the dry months. Date stores, farm cold rooms, hospital refrigerators and retail warehouses must hold their limits through long hot spells. Open a town below for its date stores, farm cold rooms and clinics, and the loggers we would start with.",
  localIndustries: [
    "Dates and farm produce",
    "Food and dairy depots",
    "Hospitals and medicine supply",
    "Retail distribution",
  ],
  citiesServed: ["Buraidah", "Unaizah"],
  supportNote:
    "Set-up, alert rules and user access for Qassim Region sites are arranged remotely by call or video. Send the town and a note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Qassim Region?",
      answer:
        "Buraidah and Unaizah each have a city page. Ar Rass and the region's other towns can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a logger help a date packer?",
      answer:
        "Dates hold their quality in steady, cool, dry rooms, so a record of temperature and humidity in the store shows when the room drifted and which lots stood through the warm spell.",
    },
    {
      question: "Can a farm store far from a router be monitored?",
      answer:
        "A WiFi logger needs the store to have a router, and for a distant store we confirm what suits it before any order is placed, because connection options differ by country.",
    },
  ],
  listing: [
    { slug: "buraidah", text: "The regional capital, with a date market, farm cold rooms, an industrial city, a university and a regional hospital." },
    { slug: "unaizah", text: "An oasis city of date orchards, a covered market, clinics and a college campus south of Buraidah." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
