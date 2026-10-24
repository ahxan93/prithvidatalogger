// /data-logger-al-shahaniya-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-shahaniya-municipality",
  name: "Al Shahaniya Municipality",
  type: "state",
  intro:
    "A logger in Al Shahaniya Municipality mostly serves farm produce, animal feed and veterinary supplies, as well as clinics, pharmacies and care centres. Al Shahaniya Municipality covers a broad swathe of the central and western desert of Qatar, from open gravel plains and farms to a long stretch of west-coast shore with dunes and limestone cliffs. Al Shahaniya is a desert town of farms, camel stables, villas and workshops, while Dukhan lies on the west coast, a town of housing, a hospital and shops beside the sea with an industrial area on its edge. Summers are long, very hot and dry inland, humid on the west coast, winters mild, and dust and sandstorms blow through in some seasons. Food, animal feed, medicines and materials wait in sheds and warehouses in such heat. The pages below describe the two towns and the Dukhan Industrial Area.",
  localIndustries: [
    "Farm produce, animal feed and veterinary supplies",
    "Clinics, pharmacies and care centres",
    "Warehouses and workshops",
    "Supermarkets and neighbourhood shops",
  ],
  citiesServed: ["Al Shahaniya","Dukhan"],
  supportNote:
    "Enquiries from Al Shahaniya Municipality are handled through the enquiry form, Call or WhatsApp. Name the town, the rooms to be watched and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Shahaniya Municipality?",
      answer:
        "Al Shahaniya and Dukhan each have a city page, and the Dukhan Industrial Area has an area page under Dukhan. Another place in the municipality can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a desert farm want a logger in the load as well as in the store?",
      answer:
        "Feed, produce and veterinary supplies ride long roads in vehicles that heat up in the sun, so a logger packed with the goods shows how hot the load became before it reached a shed.",
    },
    {
      question: "Does fine sand harm a logger?",
      answer:
        "Sand settles on anything left open, so a logger is fixed on a shaded inner wall away from vents and doors, and its battery keeps the record running through a power cut.",
    },
  ],
  listing: [
    { slug: "al-shahaniya", text: "A desert town of farms, camel stables, villas and workshops in the central plains, in very hot, dry summers and blowing sand." },
    { slug: "dukhan", text: "A west-coast town of housing, a hospital and shops beside dunes and limestone cliffs, with an industrial area on its edge." },
  ],
  areaListing: [
    { slug: "dukhan-industrial-area", text: "The industrial area on the edge of Dukhan, with workshops, warehouses, parts stores and yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
