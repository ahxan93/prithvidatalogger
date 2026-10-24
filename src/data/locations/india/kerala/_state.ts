// /data-logger-kerala | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "kerala",
  name: "Kerala",
  type: "state",
  intro:
    "A logger in Kerala mostly protects seafood stores, port warehouses and hospital stores. Kerala is a long, narrow state between the sea and the hills, and its storage is arranged along the coast road and the railway. Kochi in the middle is the great port, Thiruvananthapuram in the south is the capital with its technology park, hospitals and research institutes, and Kollam holds cashew and fisheries. Thrissur trades in gold and herbal medicine, while Kozhikode in the north still moves spices, timber and oil. The air is warm and very humid for most months and the monsoon is heavy and long, so condensation, mould and storm power cuts matter as much as heat. Each page below describes one city, its rooms and the loggers that suit them.",
  localIndustries: [
    "Seafood processing and export",
    "Port logistics and warehousing",
    "Hospitals and healthcare",
    "Cashew, spice and herbal-medicine trade",
  ],
  citiesServed: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam"],
  supportNote:
    "Supply, installation support and site visits for Kerala sites are arranged from our Mumbai office. Send the area and the cold rooms or stores in question.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Kerala?",
      answer:
        "Kochi has a city page covering Kakkanad, Kalamassery and Edayar, and Thiruvananthapuram, Kozhikode, Thrissur and Kollam have city pages of their own. Other places in the state are served on enquiry.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "What is special about monitoring a cold chain in this climate?",
      answer:
        "Warm, wet air condenses on cold-room doors and probes, so we place probes away from seals and coils and set alerts for a door left open, which is the usual cause of fog and ice.",
    },
    {
      question: "Can a record travel with an export consignment?",
      answer:
        "Yes. A report for the cold room and for the container can be exported for each lot, so an overseas buyer sees the conditions from the store to the port.",
    },
  ],
  listing: [
    { slug: "kochi", text: "A port city of seafood processors, spice exporters, container yards, large hospitals and a technology park, all in warm, humid air." },
    { slug: "thiruvananthapuram", text: "The capital's technology park, medical college, research institutes and new seaport at Vizhinjam in the warm south." },
    { slug: "kozhikode", text: "The northern trading city of spice and oil godowns, the Kallai timber yards, wooden-boat harbours and large hospitals." },
    { slug: "thrissur", text: "The central city of gold jewellers, ayurvedic makers, university laboratories and private hospitals between Kochi and Kozhikode." },
    { slug: "kollam", text: "The cashew port on Ashtamudi Lake, with seafood harbours, coir workshops and ceramic and mineral works in damp, salty air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
