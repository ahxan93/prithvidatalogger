// /data-logger-al-buraimi-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-buraimi-governorate",
  name: "Al Buraimi Governorate",
  type: "state",
  intro:
    "A logger in Al Buraimi Governorate mostly serves dates and farm produce, as well as shop and wholesale trade. Al Buraimi Governorate lies in the north-west of Oman, a flat inland oasis region of date gardens, shops, workshops and wide roads set in gravel plains below low hills. Buraimi is its main city, a trading and farming centre with busy markets, a hospital and an industrial area, where families shop for food, household goods and building materials. Summers are fierce and dry, winters mild and cool at night, and dust and sandstorms blow through in some seasons. Dates, food, medicines and materials wait in shops, sheds and warehouses in such heat. The page below describes the city, its industrial area and the rooms where a temperature record would help.",
  localIndustries: [
    "Dates and farm produce",
    "Shop and wholesale trade",
    "Industrial and workshop storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Buraimi"],
  supportNote:
    "Enquiries from Al Buraimi Governorate are handled through the enquiry form, Call or WhatsApp. Tell us which city, which rooms and how they are cooled, and we answer with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Buraimi Governorate?",
      answer:
        "Buraimi has a city page, and the Buraimi Industrial Area has an area page under it. Another place in the governorate can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How is a trading city different from a farm town for logger set-up?",
      answer:
        "A trading city needs many small shop coolers and warehouse bays watched at once, while a farm town needs date sheds and cool rooms watched against heat after harvest, so probes and alert rules differ.",
    },
    {
      question: "Does dust matter for where a logger is fixed?",
      answer:
        "Dust from the plain coats anything left open, so a logger sits on a shaded inner wall clear of vents and doors, with a battery that keeps the record running through a power cut.",
    },
  ],
  listing: [
    { slug: "buraimi", text: "A trading and farming city of markets, shops, date gardens, a hospital and an industrial area, in hot, dry summers." },
  ],
  areaListing: [
    { slug: "buraimi-industrial-area", text: "The industrial area beside Buraimi, with workshops, warehouses, light factories and building-material yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
