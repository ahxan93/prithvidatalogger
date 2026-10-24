// /data-logger-ras-al-khaimah-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ras-al-khaimah-emirate",
  name: "Ras Al Khaimah Emirate",
  type: "state",
  intro:
    "A logger in Ras Al Khaimah Emirate mostly serves manufacturing and building materials, as well as pharmaceutical and food production. Ras Al Khaimah Emirate is the northernmost of the emirates on the Arabian Gulf coast, a long coastal plain with a creek-split city, resort islands, quarries and factories, backed by the rugged Hajar mountains. The city has an old town and a newer commercial side, industrial zones hold ceramics, building materials, packaging and pharmaceutical plants, and fishing and heritage villages line the shore to the south. The coast is very hot and humid in summer, the mountains cooler, and winters are mild with occasional heavy rain. Food, medicines, chemicals and building products wait in stores and vehicles in such heat. The pages below cover the city and the districts where a temperature record would help.",
  localIndustries: [
    "Manufacturing and building materials",
    "Pharmaceutical and food production",
    "Resort and hotel kitchens",
    "Warehousing and port-side storage",
  ],
  citiesServed: ["Ras Al Khaimah"],
  supportNote:
    "Enquiries from Ras Al Khaimah Emirate are handled through the enquiry form, Call or WhatsApp. Tell us which part of the emirate, which rooms and how they are cooled, and we answer with what looks suitable.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ras Al Khaimah Emirate?",
      answer:
        "Ras Al Khaimah has a city page, and RAKEZ, the Al Ghail Industrial Area and Al Jazirah Al Hamra have area pages under it. A town elsewhere in the emirate can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would mountain rain matter for a coastal plain store?",
      answer:
        "Heavy rain in the mountains sends water down the wadis to the plain, and low rooms can flood and lose power, so a logger mounted above the likely water line with its own battery keeps the record of what happened.",
    },
    {
      question: "Can a plant watch many rooms from one login?",
      answer:
        "Yes. Each room is a separate point on one dashboard, alerts go to the person responsible for it, and a manager sees every room together with reports that can be exported.",
    },
  ],
  listing: [
    { slug: "ras-al-khaimah", text: "A creek-split Gulf city below the Hajar mountains, with an old town, resorts, factories, quarries and warehouses in hot, humid summers." },
  ],
  areaListing: [
    { slug: "rakez", text: "An economic zone of industrial plots, warehouses and offices on the coastal plain, set up for manufacturing and trade." },
    { slug: "al-ghail-industrial-area", text: "An industrial area in the city's hinterland, with factories, workshops, stores and warehouses on large plots." },
    { slug: "al-jazirah-al-hamra", text: "A coastal district south of the city with a heritage old town, fishing and a growing number of stores and light-industrial yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
