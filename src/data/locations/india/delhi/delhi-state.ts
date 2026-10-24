// /data-logger-delhi-state | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "delhi",
  name: "Delhi",
  type: "state",
  intro:
    "A logger in the Delhi Region mostly watches hospital fridges, medicine stores and cold stores. Delhi is a city and a state in one, and its storage is correspondingly concentrated: hospitals, nursing homes and diagnostic laboratories, wholesale medicine markets, food and cold stores that feed the capital, and a ring of industrial areas at Okhla, Naraina, Bawana and Narela. Buildings are often old, multi-storey and cramped, so wireless loggers are the practical choice, and the climate pushes both ways, with extreme summer heat and cold winter nights. This regional page sits above the Delhi city page and its area pages, and it is the place to start if you are not sure which part of the capital region applies to your site.",
  localIndustries: [
    "Hospitals and diagnostic laboratories",
    "Pharmaceutical distribution",
    "Food and cold storage",
  ],
  citiesServed: ["Delhi"],
  supportNote:
    "Supply, installation support and site visits for Delhi are arranged from our Mumbai office. Tell us the area and which rooms need watching.",
  faqs: [
    {
      question: "How is this page different from the Delhi city page?",
      answer:
        "The city page goes into the capital's rooms, climate and loggers in depth, while this page gives the regional picture and lists every Delhi area page we have written in one place.",
    },
    {
      question: "Where can I find a temperature data logger in the Delhi Region?",
      answer:
        "The industrial areas of Okhla, Bawana and Narela have their own pages, and nearby Noida and Manesar have city pages under their own states.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can one hospital group watch several buildings in the capital?",
      answer:
        "Yes. Each building is a site on the dashboard with its own alert recipients, and the group's quality head sees every site together and can export a report for any period.",
    },
  ],
  listing: [
    { slug: "delhi", text: "The capital's full city page, covering hospitals, medicine distributors, food stores and laboratories and the climate that tests them." },
  ],
  areaListing: [
    { slug: "okhla", text: "A south-eastern district of pharmaceutical, packaging, garment and electrical units on closely packed plots over several floors." },
    { slug: "bawana", text: "A large north-western estate of food processing, plastics and warehousing, with long distances between buildings." },
    { slug: "narela", text: "A northern industrial and warehousing belt near the Haryana border, with distribution sheds and a dependence on road transport." },
    { slug: "mayapuri", text: "A west Delhi estate of engineering workshops, machinery and spares dealers, where steel stock and panel rooms fear damp and heat." },
    { slug: "wazirpur", text: "A north-west steel and stainless steel district of coil godowns, finishing stores and acid drums, where condensation stains metal." },
    { slug: "mundka", text: "A western-edge mixed estate beside the Rohtak road, with packing units and warehouse sheds now served by the Green Line Metro." },
  ],
  indexable: true,
};

export default state;
