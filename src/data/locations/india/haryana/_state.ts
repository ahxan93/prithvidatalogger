// /data-logger-haryana | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "haryana",
  name: "Haryana",
  type: "state",
  intro:
    "A logger in Haryana covers automotive plants, warehouses, textile units and food processors. Haryana surrounds the capital on three sides, and its storage falls into two broad belts. Around the capital sit Gurugram and Faridabad, Manesar's large plants and highway warehouses, and Sonipat and Panipat along the Grand Trunk Road to the north, where towns make everything from auto parts and packed food to blankets and refined fuels. Further out, Rohtak, Hisar, Karnal and Ambala hold hospitals, research campuses, rice and grain stores, steel works and instrument workshops that buyers and research sponsors inspect. Summers are hot and dry, the monsoon is humid and winter nights are cold and foggy. The pages below describe each place and the loggers we suggest for it.",
  localIndustries: [
    "Automotive and electronics",
    "Warehousing and distribution",
    "Textiles and home furnishing",
    "Rice, grain and dairy processing",
    "Research laboratories and hospitals",
  ],
  citiesServed: ["Manesar", "Gurugram", "Faridabad", "Panipat", "Sonipat", "Rohtak", "Hisar", "Ambala", "Karnal", "Panchkula"],
  supportNote:
    "Supply, installation support and site visits for Haryana plants are arranged from our Mumbai office. Tell us the plant and the stores to look at.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Haryana?",
      answer:
        "Manesar, Gurugram, Faridabad, Panipat, Sonipat, Rohtak, Hisar, Ambala, Karnal and Panchkula have city pages. More of the state will follow, and the capital region pages cover places across the border.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why is Manesar treated as a separate city page from Gurugram?",
      answer:
        "Its industry is large and new enough to have its own climate notes, rooms and loggers, and plants there often ask for records that follow a buyer's written limits.",
    },
    {
      question: "Can a supplier and its buyer see the same record?",
      answer:
        "Each firm can have its own site, and a buyer can be given access to the reports it needs without seeing the rest of the supplier's account.",
    },
  ],
  listing: [
    { slug: "manesar", text: "IMT Manesar's automotive, electronics and pharmaceutical plants and the highway warehouse parks that move goods across north India." },
    { slug: "gurugram", text: "Office towers with server rooms, Udyog Vihar and Sector 37 units, large hospitals and hotels on Delhi's south-western edge." },
    { slug: "faridabad", text: "The NIT and Ballabgarh engineering, component and electrical-goods works, with coating stores and highway warehouses on the Mathura Road." },
    { slug: "panipat", text: "Blanket, rug and home-furnishing mills and export godowns, with chemical suppliers around the refinery and petrochemical complex." },
    { slug: "sonipat", text: "The Kundli, Rai and Barhi estates of food, packaging and engineering units and distribution warehouses beside the capital's northern border." },
    { slug: "rohtak", text: "A medical institute, a university, medicine stockists, grain markets and small factories west of Delhi on the Hisar highway." },
    { slug: "hisar", text: "Steel and galvanised-iron works, an agricultural university with research stations, and oilseed and cotton godowns in the dry west." },
    { slug: "ambala", text: "The cantonment and the old city on the Grand Trunk Road, with laboratory-instrument workshops, hospitals and a busy railway junction." },
    { slug: "karnal", text: "Basmati rice mills at Taraori, grain godowns and national research institutes for dairy, wheat and soil on the highway." },
    { slug: "panchkula", text: "A planned town beside Chandigarh with industrial phases, Raipur Rani and Barwala estates, hospitals and the Pinjore and Kalka hill road." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
