// /data-logger-chhattisgarh | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "chhattisgarh",
  name: "Chhattisgarh",
  type: "state",
  intro:
    "A logger in Chhattisgarh is often placed in rice godowns, steel stores and hospitals. Chhattisgarh sits in the middle of the country on a plain of rice fields ringed by coal, iron ore and forest, and its storage follows the railway and the mines. Raipur, the capital, holds rice mills, sponge-iron and steel works, hospitals and wholesale godowns; Bhilai is a steel township twinned with Durg; Bilaspur is the rail and coalfield administrative centre; and Korba is a city of coal mines, power stations and an aluminium smelter. Summers are very hot and dusty, the monsoon is heavy and winter nights are cool, so spares stores, grain godowns and hospital refrigerators meet dust, damp and chill in a single year. The page for each city names its estates and suggests matching loggers.",
  localIndustries: [
    "Steel and sponge iron",
    "Coal, power and aluminium",
    "Rice milling and agro processing",
    "Hospitals and railway stores",
  ],
  citiesServed: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  supportNote:
    "Supply, installation support and site visits for Chhattisgarh sites are arranged from our Mumbai office. Send the city, the works or the mine-side shed and a note of what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Chhattisgarh?",
      answer:
        "Raipur, Bhilai, Bilaspur and Korba each have a city page. A town elsewhere in the state can be raised by writing to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why watch humidity in a rice or sponge-iron store?",
      answer:
        "Grain takes up moisture and spoils when the monsoon air turns heavy, and iron products and electrical spares rust in damp sheds, so a humidity trend shows the day a store starts to slip.",
    },
    {
      question: "Can plants in Chhattisgarh and Odisha or Madhya Pradesh be watched together?",
      answer:
        "Yes. Each plant is a site with its own alert contacts, so a head of operations can see works in neighbouring states in one list and export a report for any room.",
    },
  ],
  listing: [
    { slug: "raipur", text: "The capital of rice mills, Siltara and Urla steel and sponge-iron estates, a medical institute and the new city of Naya Raipur." },
    { slug: "bhilai", text: "A steel township and its twin Durg, with a large steel works, ancillary engineering estates and a big hospital." },
    { slug: "bilaspur", text: "The rail, court and coalfield-office city, with the Sirgitti estate, a central university and a teaching hospital." },
    { slug: "korba", text: "A city of coal mines, thermal power stations and an aluminium smelter on the Hasdeo, in heat and coal dust." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
