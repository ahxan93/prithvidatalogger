// /data-logger-aden-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "aden-governorate",
  name: "Aden Governorate",
  type: "state",
  intro:
    "Aden Governorate occupies a small stretch of the Gulf of Aden coast in southern Yemen, and its storage follows the harbour. The city of Aden sits around the rim of an old volcanic crater beside a sheltered natural harbour, with the districts of Crater, Ma'alla, Tawahi, Khormaksar and Sheikh Othman spread along the shore and the plain behind it. Little Aden lies across the water on its own peninsula. Heat and humidity are high through most of the year, sea air carries salt into every shed, and rain is scarce but sudden. Medicines, food and household goods wait in clinics, markets and warehouses where cooling and power cannot always be taken for granted. The pages below describe the city and four named areas, with the rooms where a temperature record would help.",
  localIndustries: [
    "Fish landings and food stores",
    "Medicine and vaccine storage",
    "Port-area warehousing",
    "Workshops and light industry",
  ],
  citiesServed: ["Aden"],
  supportNote:
    "Enquiries from Aden Governorate are reviewed case by case. Send the district, what you store and the situation on site, and we confirm what is practical before recommending anything.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Aden Governorate?",
      answer:
        "Aden has a city page, and the Port of Aden, the Aden Free Zone, the Sheikh Othman Industrial Area and Little Aden have area pages. Any other place in the governorate can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why is humidity recorded alongside temperature on this coast?",
      answer:
        "Hot, damp sea air condenses on cold surfaces and soaks cartons, so a humidity reading beside the temperature shows the day a room began to take on moisture, even while the cooling appears to cope.",
    },
    {
      question: "What does a logger do when the power or the connection is lost?",
      answer:
        "It keeps recording on its battery and stores the readings, so a record exists for the hours without power and is available when the site is next connected.",
    },
  ],
  listing: [
    { slug: "aden", text: "A major port city on the Gulf of Aden, built around a volcanic crater and a natural harbour, with markets, clinics, fish landings and warehouses in hot, humid air." },
  ],
  areaListing: [
    { slug: "port-of-aden", text: "The sheltered harbour that gave the city its trade, where goods wait on quays and in sheds in heat and salty air." },
    { slug: "aden-free-zone", text: "A free-zone area beside the harbour, set aside for storing, packing and passing goods on." },
    { slug: "sheikh-othman-industrial-area", text: "An industrial area in the large Sheikh Othman district, with workshops, small plants and warehouses." },
    { slug: "little-aden", text: "A rocky peninsula across the harbour with a long oil-industry history, a coastal town and fishing landings." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
