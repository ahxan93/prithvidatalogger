// /data-logger-lahij-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "lahij-governorate",
  name: "Lahij Governorate",
  type: "state",
  intro:
    "Any logger in Lahij Governorate is arranged case by case, whether for delta farming and produce or fodder and livestock trade. Lahij Governorate lies in the south of Yemen, north of Aden, where a broad and fertile delta plain meets the mountains behind it. Seasonal floodwater from the highlands has long watered fields of cotton, vegetables, fruit and fodder on this plain, and the town of Lahij, also called Al Hawta, is its market centre. The climate is hot with moderate to high humidity near the plain and cooler in the hills, rain is uneven, and dust blows in dry spells. Farm produce, medicines and food pass through small stores and clinics where cooling and power cannot always be relied on. The page below describes the town and the rooms where a record of temperature would help.",
  localIndustries: [
    "Delta farming and produce",
    "Fodder and livestock trade",
    "Medicine and vaccine storage",
    "Food shops and wholesale stores",
  ],
  citiesServed: ["Lahij"],
  supportNote:
    "Requests from Lahij Governorate are weighed case by case. Tell us which town you mean, what is kept there and how the room is cooled, and we reply with what looks workable.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Lahij Governorate?",
      answer:
        "Lahij has a city page. Another town in the governorate can be put to us through the enquiry form, and more pages are added only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a flood affect a store on the delta?",
      answer:
        "Floodwater and silt can reach low rooms and cut the power, so mounting the logger body above the likely water line, with a battery inside, keeps the record of what happened.",
    },
    {
      question: "Can a single logger serve a small clinic?",
      answer:
        "One logger with a phone alert can watch a vaccine refrigerator if a router is within reach, and more points can be added to the same account later.",
    },
  ],
  listing: [
    { slug: "lahij", text: "A delta market town north of Aden among fields of cotton, vegetables and fruit, with clinics and wholesale stores in hot air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
