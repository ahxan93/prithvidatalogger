// /data-logger-sadah-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "sadah-governorate",
  name: "Sa'dah Governorate",
  type: "state",
  intro:
    "Any logger in Sa'dah Governorate is arranged case by case, whether for terrace farming and fruit or market trade and leather goods. Sa'dah Governorate occupies the high mountains of northern Yemen, a country of terraced slopes, stone villages and cold, dry winters. The city of Sa'dah is its centre, a walled town of mud-brick houses and old gates that has served as a market and gathering place for the surrounding valleys. Grapes, pomegranates, grain and other crops grow on the terraces, and the markets also sell leather goods, spices and household supplies. Winter nights are very cold, summer days are bright and warm, and rain falls mainly in a short summer season. Medicines, food and farm produce need steady storage in such swings. The page below describes the city and the rooms where a temperature record would help.",
  localIndustries: [
    "Terrace farming and fruit",
    "Market trade and leather goods",
    "Medicine and vaccine storage",
    "Food and grain stores",
  ],
  citiesServed: ["Sa'dah"],
  supportNote:
    "Requests from Sa'dah Governorate are weighed case by case. Name the town, the rooms you want to watch and how they are cooled today, and we reply with what looks workable for that site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Sa'dah Governorate?",
      answer:
        "Sa'dah has a city page. Another town in the governorate can be put to us through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do cold winter nights matter for stored fruit?",
      answer:
        "Yes. Grapes and pomegranates can be damaged by frost as well as by warmth, so a continuous log shows the swings that a single reading would miss.",
    },
    {
      question: "What happens to the record if the connection drops?",
      answer:
        "The logger holds its readings in memory on battery power, so the record for the hours without signal is still there when the site next connects.",
    },
  ],
  listing: [
    { slug: "sadah", text: "A walled mountain town of mud-brick houses and old gates, with terrace fruit farms, markets and very cold winter nights." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
