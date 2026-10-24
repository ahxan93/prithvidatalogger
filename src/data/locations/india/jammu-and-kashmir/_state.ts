// /data-logger-jammu-and-kashmir | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "jammu-and-kashmir",
  name: "Jammu and Kashmir",
  type: "state",
  intro:
    "A logger in Jammu and Kashmir covers pharma plants, fruit cold stores and hospitals. The Union Territory of Jammu and Kashmir joins two very different storage worlds: the hot plains around Jammu, Samba and Kathua, where pharmaceutical, food and engineering estates stand beside the highway from Punjab, and the cool valley around Srinagar, where apples, saffron, dry fruit and handicrafts are grown, traded and stored. Goods move between the two over mountain roads that can close in heavy snow, and winters are cold, so cold stores, medicine godowns and fruit chambers must be watched through power cuts as well as seasons. Summers on the plains are fiercely hot. Each city page below names its estates and the stores we would watch first.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Fruit and dry-fruit cold storage",
    "Handicraft and saffron trade",
    "Hospitals and medicine distribution",
  ],
  citiesServed: ["Jammu","Srinagar","Samba","Kathua"],
  supportNote:
    "Supply, installation support and site visits for sites in the Union Territory are arranged from our Mumbai office. Tell us the town, the estate or the cold store and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Jammu and Kashmir?",
      answer:
        "Jammu, Srinagar, Samba and Kathua each have a city page. For any other town in the Union Territory, send us a note through the enquiry form and we confirm what can be arranged.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a logger help an apple or dry-fruit trader?",
      answer:
        "Fruit holds its quality only within a narrow range, so a logger in the chamber and the truck records the temperature through storage and the mountain road, and an alert warns the owner if a chamber drifts.",
    },
    {
      question: "What if snow closes the road and the power fails?",
      answer:
        "Each logger keeps recording on its battery through a snow outage, the stored readings follow when the network is back, and a lost-mains alert warns the named person that a room has lost its protection.",
    },
  ],
  listing: [
    { slug: "jammu", text: "The plains gateway on the Tawi, with Bari Brahmana and Gangyal estates, pharma and medicine distribution, hospitals and the Narwal market." },
    { slug: "srinagar", text: "The valley city on the Jhelum, with apple and dry-fruit cold stores, saffron and handicraft trade, hospitals and Rangreth estate." },
    { slug: "samba", text: "A highway town beside Jammu, with an industrial complex of pharma and food plants and a medical institute at Vijaypur." },
    { slug: "kathua", text: "The highway entry from Punjab, with a medical college, grain and fruit markets, truck terminals and small industrial estates." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
