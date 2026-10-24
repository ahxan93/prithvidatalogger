// /data-logger-ad-dakhiliyah-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ad-dakhiliyah-governorate",
  name: "Ad Dakhiliyah Governorate",
  type: "state",
  intro:
    "A logger in Ad Dakhiliyah Governorate mostly serves dates, farm produce and sweets, as well as market and craft trade. Ad Dakhiliyah Governorate lies on the inland side of the Hajar mountains, where old oasis towns sit at the foot of the high ranges among date groves watered by ancient channels. Nizwa is the main town, with a great old quarter, a traditional market and an industrial estate, while Bahla, Izki and Sumail are smaller oasis and valley towns of palms, mud-brick houses and farms. Summer days are fierce and dry, winter nights can turn cold, dust is common, and storms send water down the wadis. Dates, farm produce, sweets, tools and building materials wait in sheds and warehouses in such swings. The pages below cover the four towns and the industrial estate at Nizwa.",
  localIndustries: [
    "Dates, farm produce and sweets",
    "Market and craft trade",
    "Industrial and workshop storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Nizwa","Bahla","Izki","Sumail"],
  supportNote:
    "Enquiries from Ad Dakhiliyah Governorate are handled through the enquiry form, Call or WhatsApp. Name the town, the rooms and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ad Dakhiliyah Governorate?",
      answer:
        "Nizwa, Bahla, Izki and Sumail each have a city page, and the Nizwa Industrial Estate has an area page under Nizwa. Another town in the governorate can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do cold winter nights matter for inland stores?",
      answer:
        "Dates and some medicines can be harmed by a cold night as well as a hot afternoon, so a continuous log shows the swings that a single daytime reading would miss.",
    },
    {
      question: "Can one login watch a market, a date grove and an industrial site?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can view all the towns together in a single exported report.",
    },
  ],
  listing: [
    { slug: "nizwa", text: "A historic inland town below the high mountains, with an old quarter, a traditional market, date groves, universities and an industrial estate." },
    { slug: "bahla", text: "A walled oasis town of mud-brick houses, date palms, a great hillside quarter and a long tradition of pottery, in dry heat." },
    { slug: "izki", text: "An ancient oasis town with old houses, date groves and a channel system that waters the palms, at the foot of the mountains." },
    { slug: "sumail", text: "A valley town in the gap through the mountains, with farms, date palms and shops along the road between the coast and the interior." },
  ],
  areaListing: [
    { slug: "nizwa-industrial-estate", text: "The industrial estate beside Nizwa, with workshops, warehouses, light factories and building-material yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
