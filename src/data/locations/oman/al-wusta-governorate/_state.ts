// /data-logger-al-wusta-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-wusta-governorate",
  name: "Al Wusta Governorate",
  type: "state",
  intro:
    "A logger in Al Wusta Governorate mostly serves port-side and zone warehousing, as well as fish and food supply. Al Wusta Governorate stretches across the central desert of Oman to a long, empty coast on the Arabian Sea, a country of gravel plains, low cliffs, salt flats and very few towns. Duqm, the main coastal town, has grown around a fishing harbour, a new port and an economic zone laid out on the flat ground behind the shore, with housing, shops and a hospital for the people who work there. Summers are hot and dry with strong sea winds and sudden dust, winters are mild, and long roads link every settlement. Food, medicines, spare parts and materials wait in sheds and vehicles in such heat. The page below describes Duqm, its port and its economic zone.",
  localIndustries: [
    "Port-side and zone warehousing",
    "Fish and food supply",
    "Workshops and materials stores",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Duqm"],
  supportNote:
    "Enquiries from Al Wusta Governorate are handled through the enquiry form, Call or WhatsApp. State the town, the rooms and how they are cooled, and we come back with what seems suitable here.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Wusta Governorate?",
      answer:
        "Duqm has a city page, and the Duqm Special Economic Zone and the Port of Duqm have area pages under it. A place elsewhere along the central coast can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a remote coast want phone alerts and batteries?",
      answer:
        "The next supplier is a very long drive away, so a warning that a cold room is drifting lets staff act while the stock can still be saved, and a battery keeps the record going through a power cut.",
    },
    {
      question: "Is blown sand a problem for a logger on this coast?",
      answer:
        "Wind drives sand into every gap, so a logger is fixed on a shaded inner wall clear of vents and doors, with a battery that keeps the record going through any outage.",
    },
  ],
  listing: [
    { slug: "duqm", text: "A young port and economic-zone town on an empty stretch of the Arabian Sea coast, with a fishing harbour, housing and a hospital, in dry heat and strong wind." },
  ],
  areaListing: [
    { slug: "duqm-special-economic-zone", text: "The economic zone on the flat ground behind the Duqm shore, with warehouse plots, workshops, stores and offices." },
    { slug: "port-of-duqm", text: "The commercial port at Duqm, where food, supplies and general goods wait on quays and in sheds in dry heat and sea wind." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
