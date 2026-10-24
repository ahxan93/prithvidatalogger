// /data-logger-al-batinah-north-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-batinah-north-governorate",
  name: "Al Batinah North Governorate",
  type: "state",
  intro:
    "A logger in Al Batinah North Governorate mostly serves dates, farm produce and fish, as well as port-side and industrial warehousing. Al Batinah North Governorate takes in the northern part of the Batinah, a narrow, fertile coastal plain on the Gulf of Oman where date palms, farms and fishing harbours stand between the sea and the dark mountains behind. Sohar, a historic port city that has grown an industrial estate and a modern port, is the main centre, while Saham and Al Suwaiq are farming and fishing towns of palm groves, markets and small harbours along the coast road. The plain is hot and humid in summer, the sea air salty, and winters are mild. Fish, dates, farm produce, chemicals and building materials wait in sheds and warehouses in such heat. The pages below cover the three towns and two industrial districts at Sohar.",
  localIndustries: [
    "Dates, farm produce and fish",
    "Port-side and industrial warehousing",
    "Clinics, pharmacies and care centres",
    "Supermarkets and market trade",
  ],
  citiesServed: ["Sohar","Saham","Al Suwaiq"],
  supportNote:
    "Enquiries from Al Batinah North Governorate are handled through the enquiry form, Call or WhatsApp. Tell us which town, which rooms and how they are cooled, and we answer with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Batinah North Governorate?",
      answer:
        "Sohar, Saham and Al Suwaiq each have a city page, and Sohar Industrial Estate and Sohar Port and Freezone have area pages under Sohar. A town elsewhere along the Batinah can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do date palms and farm sheds call for different logger mounting from a warehouse?",
      answer:
        "Farm sheds are open-sided and heat in direct sun, so a logger sits on a shaded inner wall among the produce, while a warehouse is watched at the door and the back wall, and both need a battery for power cuts.",
    },
    {
      question: "Can one login cover sites in different towns of the coast?",
      answer:
        "Yes. Each site is a separate point on one dashboard with its own alert contacts, and a manager can see the towns together in a single exported report.",
    },
  ],
  listing: [
    { slug: "sohar", text: "A historic port city on the Batinah coast with a fishing harbour, an industrial estate, a modern port, hospitals and markets, in hot, humid summers." },
    { slug: "saham", text: "A farming and fishing town on the coast road, with date palms, small farms, markets and a clinic, in hot, humid air." },
    { slug: "al-suwaiq", text: "A coastal town of date and fruit farms, a fishing harbour and old lanes, between the sea and the mountains." },
  ],
  areaListing: [
    { slug: "sohar-industrial-estate", text: "The industrial estate beside Sohar, with factories, workshops, warehouses and chemical and materials stores." },
    { slug: "sohar-port-and-freezone", text: "The port and free zone on the Sohar coast, where food, supplies and general goods wait on quays and in sheds in hot, damp air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
