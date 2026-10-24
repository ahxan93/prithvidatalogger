// /data-logger-jazan-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "jazan-region",
  name: "Jazan Region",
  type: "state",
  intro:
    "A logger in Jazan Region mostly serves fruit, coffee and farm produce, as well as fishing and food depots. The Jazan Region occupies the south-western corner of the kingdom, a hot, humid Red Sea plain backed by green mountains. Jazan, the regional capital and port, Sabya and Abu Arish are the main towns, with farms that grow mangoes, bananas and other fruit on the plain and coffee on the mountain slopes, along with fishing, hospitals and markets. Summers are among the most humid in the kingdom, so cartons, produce and medicines take on moisture quickly, and a planned economic city on the coast is meant to add industry and port activity. Open the pages below for the port town and the planned coastal city, with the loggers we would suggest.",
  localIndustries: [
    "Fruit, coffee and farm produce",
    "Fishing and food depots",
    "Hospitals and medicine distribution",
    "Port and coastal industry",
  ],
  citiesServed: ["Jazan"],
  supportNote:
    "Set-up, alert rules and user access for Jazan Region sites are arranged remotely by call or video. Send the town and a short note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Jazan Region?",
      answer:
        "Jazan has a city page, and the planned Jazan Economic City has an area page. Sabya, Abu Arish and the region's other towns can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why is humidity a bigger worry than heat in a Jazan store?",
      answer:
        "Hot, damp air condenses on cold surfaces and soaks cartons, so a humidity reading beside the temperature shows the day a store began to take on moisture, even when the temperature looks acceptable.",
    },
    {
      question: "Can a fruit trader show a buyer how mangoes were held?",
      answer:
        "A logger in the cold room and the truck records the whole chain, and a report for the dates of one lot can be exported as PDF, Excel or CSV for the buyer.",
    },
  ],
  listing: [
    { slug: "jazan", text: "The Red Sea port and regional capital, with fish landings, mango and banana packing houses, port warehouses and a central hospital." },
  ],
  areaListing: [
    { slug: "jazan-economic-city", text: "A planned industrial and port city north of Jazan, with a refinery and power complex, camps and stores in very hot, wet air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
