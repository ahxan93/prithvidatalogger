// /data-logger-marib-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "marib-governorate",
  name: "Marib Governorate",
  type: "state",
  intro:
    "Any logger in Marib Governorate is arranged case by case, whether for desert-edge farming and dates or medicine and vaccine storage. Marib Governorate lies in the east of Yemen where the mountains fall away into the edge of the great desert. Its old fame comes from the ancient dam of the Sabaean kingdom, whose ruins stand beside a modern dam that holds back seasonal floodwater and waters fields of dates, vegetables and grain below it. The city of Marib is the centre, a desert-edge town of markets, clinics, workshops and storage yards, with oil and gas fields known to lie in the surrounding country. Days are very hot and dry, nights can be cool, and dust is common. Medicines, food and equipment all need steady storage in such swings. The page below describes the city and the rooms where a temperature record would help.",
  localIndustries: [
    "Desert-edge farming and dates",
    "Medicine and vaccine storage",
    "Food trade and wholesale stores",
    "Workshop and equipment yards",
  ],
  citiesServed: ["Marib"],
  supportNote:
    "Requests from Marib Governorate are weighed case by case. Name the town, the rooms you want to watch and how they are cooled today, and we reply with what looks workable for that site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Marib Governorate?",
      answer:
        "Marib has a city page. Another town in the governorate can be put to us through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would a very dry desert-edge town need humidity records?",
      answer:
        "Air that is dry for most of the year can turn damp briefly after a storm or a flood, and dry goods, paper and some medicines react to the change, so a humidity log beside the temperature shows when it happened.",
    },
    {
      question: "Does a logger keep recording through a dust storm or a power cut?",
      answer:
        "It carries on recording on its battery and keeps the readings in memory, so a gap in power or signal still leaves a full record to read when the site connects again.",
    },
  ],
  listing: [
    { slug: "marib", text: "A desert-edge city beside an ancient dam and its modern successor, with farms below, clinics, markets and very hot, dry weather." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
