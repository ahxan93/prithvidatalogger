// /data-logger-himachal-pradesh | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "himachal-pradesh",
  name: "Himachal Pradesh",
  type: "state",
  intro:
    "A logger in Himachal Pradesh is mostly placed in pharma plants, quality laboratories and packaging units. Himachal Pradesh is a hill state, and its storage follows the road up from the plains. At the foot, around Baddi, Barotiwala and Nalagarh in Solan district and again at Parwanoo, Paonta Sahib and Una, pharmaceutical, packaging, steel and food units work to written limits in warm, damp air. Higher up, the mushroom growers and university laboratories of Solan and the hospitals, hotels and apple stores of Shimla deal with cold as much as with heat. Hill roads and the narrow-gauge railway slow deliveries, and winter snow can cut both power and access, so records have to survive delays. Each page below describes one town, its rooms and the loggers that suit them.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Laboratories and quality control",
    "Packaging and allied units",
    "Horticulture, mushrooms and hill hospitality",
  ],
  citiesServed: ["Baddi", "Solan", "Parwanoo", "Paonta Sahib", "Una", "Shimla"],
  supportNote:
    "Supply, installation support and site visits for Himachal Pradesh plants are arranged from our Mumbai office. Tell us the estate and the plant's storage rooms.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Himachal Pradesh?",
      answer:
        "Baddi, Solan, Parwanoo, Paonta Sahib, Una and Shimla have city pages, and the Baddi page also covers Barotiwala and Nalagarh. Other parts of the hill state have no page of their own yet.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why are three estates covered on one page?",
      answer:
        "They lie close together on the same road network and share the same kinds of plant, so one page can describe their rooms, climate and visit planning without repeating itself.",
    },
    {
      question: "Can several plants of one company share a dashboard?",
      answer:
        "Each plant is its own site with its own alert recipients, and a group quality head can open every site in one list, compare records and export a report for any room.",
    },
  ],
  listing: [
    { slug: "baddi", text: "A foothill pharmaceutical cluster with Barotiwala and Nalagarh, where formulation plants keep warehouses and quality laboratories to written limits." },
    { slug: "solan", text: "The district town on the road to Shimla, with a mushroom research centre, a horticulture university, vegetable growers and highway depots." },
    { slug: "parwanoo", text: "The first town above the plains, with industrial units, overnight transport yards at the foot of the climb and roadside hotels." },
    { slug: "paonta-sahib", text: "A Yamuna-bank town on the Uttarakhand border with pharmaceutical, paper and engineering units, pilgrim kitchens and border-road godowns." },
    { slug: "una", text: "A warm foothill district beside Punjab with Gagret, Mehatpur, Bathri and Haroli estates of steel, food and packaging units." },
    { slug: "shimla", text: "The hill capital of hospitals, hotels, apple cold stores and mountain-road deliveries, where freezing is as likely a danger as heat." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
