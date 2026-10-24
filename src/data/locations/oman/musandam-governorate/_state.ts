// /data-logger-musandam-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "musandam-governorate",
  name: "Musandam Governorate",
  type: "state",
  intro:
    "A logger in Musandam Governorate mostly serves fish and harbour trade, as well as shops and food stores. Musandam Governorate occupies a rugged rocky peninsula in the far north of Oman, where bare mountains drop steeply into deep, narrow inlets and small fishing villages cling to the shore. Khasab is the main town, with a harbour for fishing boats and dhows, an old quarter, a market, a hospital and shops, and a few farms and date palms in the valleys behind. Summers are very hot and humid on the water, the cliffs hold the heat, and winters are mild with the odd storm. Fish, food, medicines and household goods wait in cold boxes, shops and clinics in such heat. The page below describes the town and the rooms where a temperature record would help.",
  localIndustries: [
    "Fish and harbour trade",
    "Shops and food stores",
    "Clinics, pharmacies and care centres",
    "Small farms and dates",
  ],
  citiesServed: ["Khasab"],
  supportNote:
    "Enquiries from Musandam Governorate are handled through the enquiry form, Call or WhatsApp. Tell us the town, the rooms and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Musandam Governorate?",
      answer:
        "Khasab has a city page. Another place in the governorate can be raised through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do steep cliffs matter for stores at the water's edge?",
      answer:
        "Rock faces absorb the sun and give the heat back into the evening, and the still air in the inlets stays damp, so a room by the water needs both a temperature and a humidity record.",
    },
    {
      question: "How does a logger help where supplies arrive by long routes?",
      answer:
        "A logger placed in a load records how long it stood warm on the way, so a shop or clinic can see whether goods were kept in range before they arrived.",
    },
  ],
  listing: [
    { slug: "khasab", text: "A harbour town among steep inlets and bare cliffs, with fishing boats, dhows, an old quarter, a market and a hospital, in hot, humid air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
