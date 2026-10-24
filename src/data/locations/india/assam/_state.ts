// /data-logger-assam | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "assam",
  name: "Assam",
  type: "state",
  intro:
    "A logger in Assam mostly serves tea stores, medicine distributors and hospitals. Assam is the gateway to the North East, a long valley of tea gardens, oilfields and rivers carved by the Brahmaputra, and its storage follows the river, the railway and the hill roads. Guwahati is the commercial, medical and distribution centre for the whole region, Dibrugarh sits in the tea and oil country of the upper valley, Tezpur lies on the north bank among gardens and a university campus, and Silchar is the main city of the southern Barak Valley, the doorway to Manipur and Mizoram. Rain is very heavy, the air is humid for most of the year, and floods and landslides cut roads for days. Open any city below to see its estates, its stores and the loggers we would start with.",
  localIndustries: [
    "Tea packing and storage",
    "Pharmaceutical and medical distribution",
    "Oil, gas and engineering supply",
    "Hospitals and university laboratories",
  ],
  citiesServed: ["Guwahati","Dibrugarh","Silchar","Tezpur"],
  supportNote:
    "Supply, installation support and site visits for Assam sites are arranged from our Mumbai office. Tell us the city, the garden or the estate and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Assam?",
      answer:
        "Guwahati, Dibrugarh, Silchar and Tezpur each have a city page. For any other Assam town, send us a note through the enquiry form and we confirm what we can arrange.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does humidity matter so much in a tea store?",
      answer:
        "Made tea takes up moisture from heavy air and loses aroma, so a record of humidity and temperature in the store shows the day damp began to reach the chests and cartons.",
    },
    {
      question: "What happens to monitoring when floods or landslides cut the road and the power?",
      answer:
        "A battery keeps each logger recording through a cut, the stored readings follow once the network is back, and a lost-mains alert warns the named person that a room has lost its protection.",
    },
  ],
  listing: [
    { slug: "guwahati", text: "The gateway city on the Brahmaputra, with Amingaon, Jalukbari and Changsari estates, a medical institute and the region's distribution trade." },
    { slug: "dibrugarh", text: "The tea and oilfield city of upper Assam, with garden factories, a medical college, a university and a bridge across the river." },
    { slug: "silchar", text: "The Barak Valley's trading city, with a medical college, a university and the road and rail routes toward Manipur and Mizoram." },
    { slug: "tezpur", text: "A north-bank town of tea gardens, a university and a medical college, joined to the south bank by a long river bridge." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
