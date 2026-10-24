// /data-logger-ash-sharqiyah-south-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ash-sharqiyah-south-governorate",
  name: "Ash Sharqiyah South Governorate",
  type: "state",
  intro:
    "A logger in Ash Sharqiyah South Governorate mostly serves fish and harbour trade, as well as dates and farm produce. Ash Sharqiyah South Governorate faces the Arabian Sea on the south-eastern coast of Oman, where low rocky hills meet sheltered creeks and long beaches. Sur is its main town, an old port famous for its dhow yards, with a fishing harbour, a lagoon of calm water, a market and an industrial estate beside the road. Date palms and small farms grow in the valleys behind the coast. The shore is hot and humid in summer, salt reaches every shed, and winters are mild. Fish, dates, food and building materials wait in sheds and warehouses in such air. The pages below describe the town, its industrial estate and the rooms where a temperature record would help.",
  localIndustries: [
    "Fish and harbour trade",
    "Dates and farm produce",
    "Industrial and workshop storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Sur"],
  supportNote:
    "Enquiries from Ash Sharqiyah South Governorate are handled through the enquiry form, Call or WhatsApp. Give the town, the rooms and how they are cooled, and we come back with what seems suitable here.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ash Sharqiyah South Governorate?",
      answer:
        "Sur has a city page, and the Sur Industrial Estate has an area page under it. A town elsewhere on this coast can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a boat-building port still need humidity records?",
      answer:
        "Salt and damp air reach timber, paint and fittings as well as food, so a humidity log beside the temperature shows when a store of materials or goods turned damp.",
    },
    {
      question: "Can a harbour ice store and a workshop share one dashboard?",
      answer:
        "Yes. Each room is a separate point with its own alert contacts, and a manager can view the harbour, the town and the estate together in one exported report.",
    },
  ],
  listing: [
    { slug: "sur", text: "An old dhow-building port on the south-eastern coast, with a lagoon, a fishing harbour, a market and an industrial estate, in hot, humid sea air." },
  ],
  areaListing: [
    { slug: "sur-industrial-estate", text: "The industrial estate beside Sur, with workshops, warehouses, light factories and building-material yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
