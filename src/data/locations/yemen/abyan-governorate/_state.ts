// /data-logger-abyan-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "abyan-governorate",
  name: "Abyan Governorate",
  type: "state",
  intro:
    "Any logger in Abyan Governorate is arranged case by case, whether for delta farming and produce or fishing landings. Abyan Governorate lies on the Gulf of Aden coast east of Aden, and its farming and its storage follow two seasonal rivers, the Wadi Bana and the Wadi Hassan, whose floodwater has watered a fertile delta behind the coast for generations. Zinjibar, on the shore, is the main town, set among cotton fields, vegetable plots, orchards and fishing beaches. The coast is hot and humid with salt in the air, the delta is dusty in the dry months and flooded in wet spells, and rain is uneven from year to year. Food, medicines and farm produce wait in small stores and clinics where cooling and power cannot always be counted on. The page below describes the town and the rooms where a record of temperature would help.",
  localIndustries: [
    "Delta farming and produce",
    "Fishing landings",
    "Medicine and vaccine storage",
    "Food shops and small stores",
  ],
  citiesServed: ["Zinjibar"],
  supportNote:
    "Enquiries from Abyan Governorate are reviewed case by case. Send the town, what you store and the situation on site, and we confirm what is practical before recommending anything.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Abyan Governorate?",
      answer:
        "Zinjibar has a city page. Any other place in the governorate can be raised through the enquiry form, and further pages are added only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a delta flood affect a store?",
      answer:
        "Floodwater and silt can reach low rooms and cut the power, so mounting the logger body above the likely water line and keeping a battery in it preserves the record of what happened.",
    },
    {
      question: "Can a small clinic use a single logger?",
      answer:
        "Yes. One logger with an alert to a phone covers a single vaccine refrigerator, provided the room has a router within reach, and more points can be added to the same account later.",
    },
  ],
  listing: [
    { slug: "zinjibar", text: "A coastal town east of Aden among delta fields of cotton, vegetables and orchards, with fishing beaches in hot, humid air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
