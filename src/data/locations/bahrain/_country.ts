// /data-logger-bahrain | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "bahrain",
  name: "Bahrain",
  type: "country",
  intro:
    "A logger in Bahrain mostly serves cold stores, hospitals and hotel kitchens. Bahrain is a compact island nation in the Gulf where warehouses, cold stores, hospitals, hotels and kitchens sit within a short drive of each other and of a busy port. Goods may spend time on a dock and in a lorry before they reach their room, and the climate is hot and humid for much of the year, with sea air that carries salt and dust. Temperature and humidity loggers on WiFi, sending alerts to phones and email, suit these rooms, and set-up can be guided remotely. The pages below follow the governorates, beginning with the Capital Governorate and Manama, and the enquiry form is the quickest way to describe your site.",
  localIndustries: [
    "Food distribution",
    "Hospitals and pharmacies",
    "Logistics and warehousing",
    "Hospitality",
  ],
  citiesServed: ["Manama", "Muharraq", "Hamad Town", "Riffa"],
  supportNote:
    "Enquiries from Bahrain are handled through the enquiry form, Call or WhatsApp. Tell us the site, the rooms and what you store, and our reply covers what seems suitable and how remote set-up support would run.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Bahrain?",
      answer:
        "All four governorates have a page, with their cities and districts beneath them. For a place not yet listed, describe the site and what you store through the enquiry form, Call or WhatsApp, and we reply with a suggestion.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do we start monitoring a Bahrain site?",
      answer:
        "Send the site, the rooms and what you store through the enquiry form, Call or WhatsApp, and we recommend loggers and set them up with your team remotely. If the site has several buildings, tell us which rooms matter most and we start there.",
    },
    {
      question: "Can goods be tracked through a long road or sea journey?",
      answer:
        "A logger placed in the load records the whole journey, and a trip report can be exported for the consignee, so the heat a load met is on record when it arrives.",
    },
  ],
  listing: [
    { slug: "capital-governorate", text: "The governorate of the capital on the north-east of the island, with a harbour city of towers, markets, hospitals and a commercial port, in hot, humid sea air." },
    { slug: "muharraq-governorate", text: "The island governorate to the north-east of the capital, with an old walled-lane town, a seaside industrial and harbour area, and the island's airport." },
    { slug: "northern-governorate", text: "The governorate covering the north-western part of the main island, with a planned inland town, a coastal strip of palm gardens and seaside villages." },
    { slug: "southern-governorate", text: "The governorate covering the southern part of the main island, with large residential towns, a planned market town and a western shore of farms and seaside kitchens." },
  ],
  indexable: true,
};

export default country;
