// /data-logger-madhya-pradesh | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "madhya-pradesh",
  name: "Madhya Pradesh",
  type: "state",
  intro:
    "A logger in Madhya Pradesh is often placed in food plants, pharma units and engineering works. Madhya Pradesh sits at the middle of the country, and our pages follow its main centres: Indore, the commercial capital of snack makers, pharmaceutical plants and wholesale godowns; Bhopal, the capital with its hospitals, institutions and the Mandideep estate; Jabalpur, with defence works and pulse godowns; Gwalior, where the Malanpur estate meets the highway and the rail line to Delhi; and the Malwa towns of Pithampur, Dewas and Ujjain. Summer heat builds slowly and the monsoon arrives with real weight, so a store that held its range in April can fail an inspection in June. The pages below take each city in turn, with its estates, its stores and the loggers that suit them.",
  localIndustries: [
    "Food processing",
    "Pharmaceutical manufacturing",
    "Automotive and engineering",
  ],
  citiesServed: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Pithampur", "Ujjain", "Dewas"],
  supportNote:
    "Supply, installation support and site visits for Madhya Pradesh plants are arranged from our Mumbai office. Send the estate and the stores in question.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Madhya Pradesh?",
      answer:
        "Indore has a city page covering Pithampur, Sanwer Road and the food processors, and Bhopal, Jabalpur, Gwalior, Pithampur, Ujjain and Dewas each have a city page of their own. A site elsewhere in the state can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why watch humidity in a food store?",
      answer:
        "Ingredients clump or spoil when the air turns damp, and a humidity trend shows the day a store starts to take on moisture, so a seal or a dehumidifier can be fixed first.",
    },
    {
      question: "Can plants and godowns in different towns share one account?",
      answer:
        "Yes. Each plant and godown is a site with its own alert recipients, and a group quality head opens every site in a single list.",
    },
  ],
  listing: [
    { slug: "indore", text: "The commercial capital, with snack and sweet makers, pharmaceutical plants, the Pithampur and Sanwer Road estates and busy wholesale godowns." },
    { slug: "bhopal", text: "The capital of lakes and hospitals, with a national medical institute, laboratories, Govindpura workshops and the Mandideep pharmaceutical and food estate." },
    { slug: "jabalpur", text: "A Narmada-side city of defence factories, a rail junction, pulse and rice godowns and the Richhai and Adhartal industrial areas." },
    { slug: "gwalior", text: "A fort city on the Agra to Mumbai road and the Delhi rail line, with Malanpur and Banmore estates, dairies and highway godowns." },
    { slug: "pithampur", text: "A planned factory belt west of Indore with vehicle, component, pharmaceutical and engineering plants on wide campuses and contract warehouses." },
    { slug: "ujjain", text: "The temple city on the Kshipra, with pilgrim sweet and flower trades, soybean and grain mills, an Indore road estate and the Nagda works." },
    { slug: "dewas", text: "An industrial town on the Agra to Mumbai road between Indore and Ujjain, with auto-part, chemical and food plants and highway yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
