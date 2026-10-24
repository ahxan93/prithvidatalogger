// /data-logger-taiz-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "taiz-governorate",
  name: "Taiz Governorate",
  type: "state",
  intro:
    "Any logger in Taiz Governorate is arranged case by case, whether for medicine and vaccine storage or food processing and wholesale trade. Taiz Governorate lies in the south-west highlands of Yemen and runs down to a stretch of the Red Sea coast. Inland, the city of Taiz climbs the slopes of Mount Sabir with terraced hillsides, dense markets, schools, hospitals and a long record of trade and manufacture. Towards the sea the land drops into a hot coastal plain, where the small port town of Mocha, long linked with coffee, looks out over the water. Cool, damp hills and a hot, humid shore sit within one governorate, so stores face very different weather depending on altitude. Medicines, food, coffee and laboratory samples all need steady storage. The pages below describe the city, the coastal town and its harbour, and the rooms where a temperature record would help.",
  localIndustries: [
    "Medicine and vaccine storage",
    "Food processing and wholesale trade",
    "Coffee and farm produce",
    "Harbour storage and fish",
  ],
  citiesServed: ["Taiz","Mocha"],
  supportNote:
    "Requests from Taiz Governorate are weighed case by case. Name the town, the rooms you want to watch and how they are cooled today, and we reply with what looks workable for that site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Taiz Governorate?",
      answer:
        "Taiz and Mocha each have a city page, and the Port of Mocha has an area page under Mocha. Another town in the governorate can be put to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would highland hills and a hot coast need different logger set-ups?",
      answer:
        "The hills are cooler with damp mornings and the coast is hot and salty all year, so a store in Taiz may need to watch for cold and condensation while a shed at Mocha is watched for heat and humidity together.",
    },
    {
      question: "Does a logger keep working through long power cuts?",
      answer:
        "It carries on recording on its own battery and stores the readings, so a gap in mains power still leaves a full record to read once the site is connected again.",
    },
  ],
  listing: [
    { slug: "taiz", text: "A hill city below Mount Sabir with dense markets, universities, hospitals and many small factories and stores." },
    { slug: "mocha", text: "A small Red Sea port town with a long coffee history, fishing boats and storage in hot, humid, salty air." },
  ],
  areaListing: [
    { slug: "port-of-mocha", text: "The harbour of Mocha, where fish, coffee and general goods wait beside the water in warm, damp air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
