// /data-logger-karnataka | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "karnataka",
  name: "Karnataka",
  type: "state",
  intro:
    "A logger in Karnataka mostly protects technology parks, biotech laboratories and server rooms. Karnataka's storage falls into several different groups. Bengaluru and its estates hold technology parks, laboratories and electronics makers where a cooling fault matters more than the weather, while Mysuru and Tumakuru add research cold rooms, food plants and highway warehouses on either side of the capital region. On the coast Mangaluru works around a port, cashew and seafood, and in the north-west Hubballi-Dharwad and Belagavi combine trade, universities, foundries and precision engineering. Climates run from a mild plateau to a wet coast, so humidity decides some of the choices. The pages below describe each city and the three area pages written for Bengaluru.",
  localIndustries: [
    "Electronics and technology parks",
    "Biotech and research laboratories",
    "Data centres and server rooms",
    "Port cargo, food processing and precision engineering",
  ],
  citiesServed: ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Tumakuru"],
  supportNote:
    "Supply, installation support and site visits for Karnataka sites are arranged from our Mumbai office. Tell us the campus or estate and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Karnataka?",
      answer:
        "Bengaluru has a city page, with Peenya, Electronic City and Whitefield as area pages, and Mysuru, Hubballi-Dharwad, Mangaluru, Belagavi and Tumakuru have city pages of their own. Bommasandra and Jigani are mentioned on the city page and may follow.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do you use the name Bangalore as well as Bengaluru?",
      answer:
        "They are one city, and the pages below cover it under either name, so an enquiry sent under Bangalore or Bengaluru reaches the same team.",
    },
    {
      question: "Can one facilities team look after several campuses?",
      answer:
        "Each campus is a site on the dashboard, each building's alerts go to the person who looks after it and a head of facilities sees every site together.",
    },
  ],
  listing: [
    { slug: "bengaluru", text: "Also called Bangalore, a city of technology parks, laboratories, hospitals and electronics makers where cooling faults, not weather, are the main risk." },
    { slug: "mysuru", text: "A palace and university city whose research cold rooms, hotel kitchens, teaching hospitals and Nanjangud estate sit along the Bengaluru expressway." },
    { slug: "hubballi-dharwad", text: "Twin cities of trade, railways and universities in the north, with foundries and workshops at Gokul Road and Rayapur and a busy market yard." },
    { slug: "mangaluru", text: "A port city on the coast with cashew factories, seafood cold stores, chemical and fertiliser stores and medical colleges in warm, salty air." },
    { slug: "belagavi", text: "A north-western border city of foundries, an aerospace-components cluster, a cantonment and sugar-belt godowns beneath a heavy monsoon." },
    { slug: "tumakuru", text: "A highway industrial belt north-west of the capital region, with large planned estates, copra and groundnut godowns and district hospitals." },
  ],
  areaListing: [
    { slug: "peenya", text: "The north-western engineering belt of machine shops, tool rooms and small electronics firms whose stock fears damp more than heat." },
    { slug: "electronic-city", text: "A southern technology township of large campuses, hardware makers, test laboratories and the server rooms that serve them." },
    { slug: "whitefield", text: "An eastern district of technology parks, hospitals and research centres stacked in tall buildings under shared management." },
  ],
  indexable: true,
};

export default state;
