// /data-logger-bihar | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "bihar",
  name: "Bihar",
  type: "state",
  intro:
    "A logger in Bihar mostly watches hospital fridges, fruit stores and wholesale godowns. Bihar lies on the flat Gangetic plain, crossed by the Ganga and the rivers that rush down from Nepal, and its storage is shaped by heat, humidity and flood. Patna, the capital, is the state's main centre for hospitals, medicine distribution and wholesale trade; across the river Hajipur holds a railway zone, a pharmaceutical institute and banana yards; Muzaffarpur is the litchi and fruit trading city of the north, and Gaya and Bhagalpur add a pilgrim city and a silk city. Summers are hot and heavy with humidity, the monsoon brings floods that cut roads for days, and winter nights are cold with fog. Cold chains for fruit, vaccines and food therefore depend on records that survive outages. Each city page names its estates and the stores worth watching first.",
  localIndustries: [
    "Hospitals and medicine distribution",
    "Fruit, grain and food processing",
    "Railway and wholesale stores",
    "Pilgrimage hospitality",
  ],
  citiesServed: ["Patna", "Hajipur", "Muzaffarpur", "Gaya", "Bhagalpur"],
  supportNote:
    "Supply, installation support and site visits for Bihar sites are arranged from our Mumbai office. Tell us the city, the market or the estate and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Bihar?",
      answer:
        "Patna, Hajipur, Muzaffarpur, Gaya and Bhagalpur each have a city page. For any other Bihar town, send us a note through the enquiry form and we confirm what we can arrange.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do loggers help a fruit trader during the litchi and mango seasons?",
      answer:
        "Fruit ripens fast in heat, so a logger in the cold room and the truck records how long a lot stayed within range, and an alert reaches the owner if a chamber warms during a power cut.",
    },
    {
      question: "What happens to monitoring when floods cut the roads and the power?",
      answer:
        "Loggers keep recording on their batteries and send the stored readings when the network returns, and an alert for a lost mains supply tells the responsible person that a room is unprotected.",
    },
  ],
  listing: [
    { slug: "patna", text: "The Ganga-side capital of hospitals, medicine distributors, wholesale markets and estates at Bihta, Fatuha and Patliputra." },
    { slug: "hajipur", text: "The north-bank railway-zone city linked by the Gandhi Setu, with a pharmaceutical institute, banana yards and an industrial area." },
    { slug: "muzaffarpur", text: "The litchi and fruit city of north Bihar, with food processors, a teaching hospital and a trading belt in flood-prone country." },
    { slug: "gaya", text: "The pilgrim city of the Vishnupad and Mahabodhi temples, with hotel and sweet-maker kitchens, a teaching hospital and a small industrial area." },
    { slug: "bhagalpur", text: "The silk city on the Ganga, with Nathnagar weaving lanes, silk godowns, mango and rice markets and a medical college hospital." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
