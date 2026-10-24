// /data-logger-dhamar-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "dhamar-governorate",
  name: "Dhamar Governorate",
  type: "state",
  intro:
    "Any logger in Dhamar Governorate is arranged case by case, whether for plateau farming and produce or university and clinic laboratories. Dhamar Governorate stretches across the central highlands of Yemen south of Sana'a, on a high plateau of broad plains between rocky hills. The city of Dhamar is its centre, a university town with markets, workshops and hospitals set in farmland that grows grain, potatoes, grapes and other crops. The plateau is dry and cool for much of the year, with strong sun by day, cold nights in winter and a short rainy season. Farm produce, medicines and food need steady storage through the swings between a bright afternoon and a freezing dawn. The page below describes the city and the rooms where a record of temperature would help.",
  localIndustries: [
    "Plateau farming and produce",
    "University and clinic laboratories",
    "Food trade and storage",
    "Medicine and vaccine storage",
  ],
  citiesServed: ["Dhamar"],
  supportNote:
    "Requests from Dhamar Governorate are weighed case by case. Name the town, the rooms to be watched and how they are cooled, and we reply with what seems workable for that site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Dhamar Governorate?",
      answer:
        "Dhamar has a city page. Another town in the governorate can be put to us through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do cold nights matter for stored farm produce?",
      answer:
        "Yes. Potatoes and fruit can suffer from a frosty night as well as from a hot afternoon, so a continuous log shows the swings that a single reading would miss.",
    },
    {
      question: "What happens to the record if the connection drops?",
      answer:
        "The logger keeps its readings in memory on its battery, so the record for the hours without signal is still there when the site is next connected.",
    },
  ],
  listing: [
    { slug: "dhamar", text: "A university town on the central highland plateau, with farmland, markets, hospitals and cold nights." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
