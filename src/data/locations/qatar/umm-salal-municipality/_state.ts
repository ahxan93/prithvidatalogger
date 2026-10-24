// /data-logger-umm-salal-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "umm-salal-municipality",
  name: "Umm Salal Municipality",
  type: "state",
  intro:
    "A logger in Umm Salal Municipality mostly serves farm produce and fodder, as well as supermarkets and neighbourhood shops. Umm Salal Municipality lies north of the capital, inland from the coast, in a landscape of farms, villas, schools and open desert, with an old fort standing in the town of Umm Salal that has become a landmark of the district. Farms grow vegetables and fodder under irrigation, neighbourhood shops and clinics serve family streets, and workshops and warehouses sit along the main roads. Summers are very hot and dry, winters mild, and dust blows in from the desert. Food, farm produce and medicines wait in sheds, clinics and shops in such heat. The page below describes the town and the rooms where a temperature record would help.",
  localIndustries: [
    "Farm produce and fodder",
    "Supermarkets and neighbourhood shops",
    "Clinics, pharmacies and care centres",
    "Warehouses and workshops",
  ],
  citiesServed: ["Umm Salal"],
  supportNote:
    "Enquiries from Umm Salal Municipality are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and how they are cooled, and our reply covers what seems suitable here.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Umm Salal Municipality?",
      answer:
        "Umm Salal has a city page. Another place in the municipality can be raised through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do farm sheds differ from city stores for a logger?",
      answer:
        "Farm sheds heat up from direct sun and open sides, so a logger is placed among the produce and shaded from the roof, while city stores are watched mainly at the door and the back wall.",
    },
    {
      question: "What does a logger do through a long power cut on a farm?",
      answer:
        "It carries on recording from its battery and keeps the readings, so the hours of an outage are still on record when the site is connected again.",
    },
  ],
  listing: [
    { slug: "umm-salal", text: "A fort town and farming district north of the capital, with villas, shops, clinics and workshops in hot, dry summers." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
