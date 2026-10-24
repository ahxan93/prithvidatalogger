// /data-logger-jharkhand | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "jharkhand",
  name: "Jharkhand",
  type: "state",
  intro:
    "A logger in Jharkhand mostly protects steel-town stores, hospitals and engineering plants. Jharkhand is a plateau state of coal, iron and steel, and its storage follows the mines, the rail lines and the industrial townships. Ranchi, the capital, holds heavy engineering, hospitals, institutes and a busy trade; Jamshedpur is a steel and vehicle city with an ancillary belt across the river at Adityapur; Dhanbad stands in the Jharia coalfield; and Bokaro is a steel township beside the Damodar. Summers are hot and dusty, the monsoon is heavy and winter nights are cold, so spares stores, laboratories and hospital refrigerators meet dust, damp and chill in a single year. Distances between plants are large and signals can be weak. Each city page below names its estates and the stores worth watching first.",
  localIndustries: [
    "Steel and heavy engineering",
    "Coal and mining supply",
    "Automotive ancillary works",
    "Hospitals and institutes",
  ],
  citiesServed: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  supportNote:
    "Supply, installation support and site visits for Jharkhand sites are arranged from our Mumbai office. Tell us the city, the plant or the mine-side store and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Jharkhand?",
      answer:
        "Ranchi, Jamshedpur, Dhanbad and Bokaro each have a city page. For a town not listed here, write to us through the enquiry form and we confirm how we can help.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does coal and mineral dust affect a logger?",
      answer:
        "Fine dust settles on exposed sensors, so we hang the logger body out of the dustiest air, keep probes sealed and suggest wiping them at routine cleaning, which keeps the record steady.",
    },
    {
      question: "Can plants in Jharkhand and West Bengal be watched together?",
      answer:
        "Yes. Every plant is a site with its own alert contacts, so a head of operations sees works in both states in one list and can export a report for any room and period.",
    },
  ],
  listing: [
    { slug: "ranchi", text: "The capital of the plateau, with heavy engineering at Dhurwa, Namkum and Tatisilwai estates, a medical institute, campuses and busy markets." },
    { slug: "jamshedpur", text: "A steel and vehicle city on the Subarnarekha, with Adityapur's ancillary works across the river, hospitals and a rail junction." },
    { slug: "dhanbad", text: "A coal city in the Jharia field, with mining-supply stores, a technical institute, railway offices and trading lanes in coal dust." },
    { slug: "bokaro", text: "A planned steel township beside the Damodar, with a steel works, thermal power, sector markets and ancillary firms." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
