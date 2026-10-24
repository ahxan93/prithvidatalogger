// /data-logger-west-bengal | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "west-bengal",
  name: "West Bengal",
  type: "state",
  intro:
    "A logger in West Bengal faces river-delta humidity. West Bengal's storage follows the river and the railway: godowns around Kolkata, an industrial township at Kalyani, the logistics belt around Dankuni and port-side warehouses, with the foundries and goods yards of Howrah across the Hooghly, the steel and power city of Durgapur inland, Asansol and its coal and railway belt, the campus town of Kharagpur, the port town of Haldia, and Siliguri far to the north, where tea, medicines and trucks head for the hills. Cold stores for fish, dairy and sweets, medicine distributors and a large hospital sector complete the picture. The air is hot and humid for most of the year, the monsoon is long and pre-monsoon storms cut the power, so condensation and outages are as common a risk as heat. Each city page below lists its main trades and the rooms we would watch first.",
  localIndustries: [
    "Pharmaceutical distribution",
    "Food and cold storage",
    "Port logistics",
  ],
  citiesServed: ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol", "Kharagpur", "Haldia"],
  supportNote:
    "Supply, installation support and site visits for West Bengal sites are arranged from our Mumbai office. Tell us the district and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in West Bengal?",
      answer:
        "Kolkata has a city page covering Howrah, Kalyani, Dankuni and the port-side warehouses, and Howrah, Siliguri, Durgapur, Asansol, Kharagpur and Haldia each have a city page of their own. A site elsewhere in Bengal can be raised with us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How are loggers protected through a storm outage?",
      answer:
        "They record on their batteries through the cut and send the stored readings when the network returns, and an alert for a lost mains supply reaches the person responsible.",
    },
    {
      question: "Can a distributor show a buyer a dated record?",
      answer:
        "Reports for any room and any period can be exported as PDF, Excel or CSV, so a distributor hands over a log instead of searching a register.",
    },
  ],
  listing: [
    { slug: "kolkata", text: "An old port city of cold stores, medicine distributors, hospitals and godowns, with Howrah, Kalyani and Dankuni around it." },
    { slug: "howrah", text: "The railway and foundry city across the Hooghly, with Dasnagar and Bantra workshops, rail goods yards and crowded wholesale lanes in damp air." },
    { slug: "siliguri", text: "The gateway to the hills and the north-east, with tea packers, medicine distributors, hospitals and trucks climbing to mountain towns." },
    { slug: "durgapur", text: "A planned steel and power city on the Damodar, with Fuljhore and Bamunara estates, plant laboratories and township hospitals." },
    { slug: "asansol", text: "A coal, steel and railway city whose electrical and instrument stores meet coal dust, heat and monsoon damp." },
    { slug: "kharagpur", text: "A railway and campus town with research laboratories, rail stores, rice and oilseed mills and district hospitals." },
    { slug: "haldia", text: "A river-mouth port town of dock warehouses, refinery and chemical works, fertiliser and edible-oil firms in salty air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
