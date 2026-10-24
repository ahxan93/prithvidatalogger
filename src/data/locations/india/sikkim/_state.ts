// /data-logger-sikkim | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "sikkim",
  name: "Sikkim",
  type: "state",
  intro:
    "A logger in Sikkim mostly serves pharma plants, hotel kitchens and hospitals. Sikkim is a small Himalayan state of steep valleys, glaciers and terraced farms, and its storage is arranged along a single road that climbs from the Teesta. Rangpo, at the boundary with West Bengal, is the border gateway and the state's industrial entrance, with pharmaceutical and manufacturing plants on its estates, while Gangtok, the capital on its ridge, holds the hotels, hospitals and markets. The state has declared itself organic, so food and farm produce matter. Heavy monsoon rain brings landslides that close the road for days, winters are cold, and the temperature changes sharply between the valley floor and the high roads. Each place page below names its stores and the loggers we would start with.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Hospitality and tourism kitchens",
    "Hospitals and institutes",
    "Organic food and cardamom trade",
  ],
  citiesServed: ["Gangtok","Rangpo"],
  supportNote:
    "Supply, installation support and site visits for Sikkim sites are arranged from our Mumbai office. Tell us the town, the plant or the hotel and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Sikkim?",
      answer:
        "Gangtok and Rangpo each have a page. For any other Sikkim town, send us a note through the enquiry form and we confirm what can be arranged.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a landslide that closes the road affect monitoring?",
      answer:
        "A load can stand for days on a mountain road, so a GSM logger placed with the goods records every hour of the wait, keeps its readings in memory without signal and sends them when coverage returns.",
    },
    {
      question: "Why would an organic-farming state need temperature records?",
      answer:
        "Produce, cardamom and dairy goods lose quality in warm or damp stores, and a record of conditions from the farm store to the market shows a buyer how the goods were kept.",
    },
  ],
  listing: [
    { slug: "gangtok", text: "The ridge-top capital of hotels, hospitals, markets and trade routes to Siliguri and the high passes, in steep, wet mountain country." },
    { slug: "rangpo", text: "The border gateway on the Rangpo river at the Bengal boundary, with industrial estates, pharmaceutical plants and trucks waiting to climb into the state." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
