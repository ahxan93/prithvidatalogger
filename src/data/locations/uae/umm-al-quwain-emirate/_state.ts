// /data-logger-umm-al-quwain-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "umm-al-quwain-emirate",
  name: "Umm Al Quwain Emirate",
  type: "state",
  intro:
    "A logger in Umm Al Quwain Emirate mostly serves fishing and ice stores, as well as small farms and produce. Umm Al Quwain Emirate holds a quiet stretch of the Arabian Gulf coast, with a town on a narrow spit of land, a sheltered lagoon lined with mangroves, fishing boats on the shore and farmland and desert behind. The coast is very hot and humid in summer, the inland strip hot and dry, and nights in winter are cool. Fishermen, small farms, shops and clinics all keep food and medicines that need steady storage, while a free-trade zone near the port holds warehouse units and light industry. The pages below describe the town and the zone, with the rooms where a temperature record would help.",
  localIndustries: [
    "Fishing and ice stores",
    "Small farms and produce",
    "Free-zone and light-industrial storage",
    "Clinics and pharmacies",
  ],
  citiesServed: ["Umm Al Quwain"],
  supportNote:
    "Enquiries from Umm Al Quwain Emirate are handled through the enquiry form, Call or WhatsApp. Tell us the town, what you store and how it is cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Umm Al Quwain Emirate?",
      answer:
        "Umm Al Quwain has a city page, and the UAQ Free Trade Zone has an area page under it. Another town in the emirate can be put to us through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a lagoon and mangrove coast matter for storage?",
      answer:
        "Still, damp air above the lagoon and salt on the breeze reach every shed and cold box, so a humidity record beside the temperature shows moisture that a thermometer alone would miss.",
    },
    {
      question: "Can one logger serve a small clinic or shop?",
      answer:
        "One logger with a phone alert can watch a vaccine refrigerator or a shop cooler if a router is within reach, and more points can be added to the same account later.",
    },
  ],
  listing: [
    { slug: "umm-al-quwain", text: "A quiet Gulf coast town on a narrow spit beside a mangrove lagoon, with fishing, small farms, shops and clinics in humid heat." },
  ],
  areaListing: [
    { slug: "uaq-free-trade-zone", text: "A free-trade zone near the town's port, with warehouse units, offices and light industry beside the sea." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
