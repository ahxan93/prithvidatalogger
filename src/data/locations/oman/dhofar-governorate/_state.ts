// /data-logger-dhofar-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "dhofar-governorate",
  name: "Dhofar Governorate",
  type: "state",
  intro:
    "A logger in Dhofar Governorate mostly serves fruit, coconut and fish trade, as well as port-side and free-zone warehousing. Dhofar Governorate occupies the far south of Oman on the Arabian Sea, a region where a coastal plain of coconut palms, banana groves and fishing beaches rises into hills that turn green under the summer monsoon. Salalah is the main city, with a harbour, a market, a hospital and shops, while at Raysut, to the west, a container port, a free zone and an industrial estate stand beside the sea. For several weeks each year mist and drizzle cool the coast and push humidity very high, then the dry heat returns. Fruit, fish, frankincense goods, food and building materials wait in sheds and warehouses in such swings. The pages below cover the city, its port district and its industrial areas.",
  localIndustries: [
    "Fruit, coconut and fish trade",
    "Port-side and free-zone warehousing",
    "Industrial and workshop storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Salalah"],
  supportNote:
    "Enquiries from Dhofar Governorate are handled through the enquiry form, Call or WhatsApp. Say which area, which rooms and how they are cooled, and our reply covers what seems suitable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Dhofar Governorate?",
      answer:
        "Salalah has a city page, and Salalah Free Zone, Raysut Industrial Estate and Port of Salalah have area pages under it. A town elsewhere in the south can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a monsoon season matter for stored goods?",
      answer:
        "For weeks the air is cool, misty and very humid, so cartons soften, dry goods take on moisture and mould can start, and a humidity log beside the temperature shows when a store turned damp.",
    },
    {
      question: "Can one login cover a city market and a port-side warehouse?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can see the city and the port district together in one exported report.",
    },
  ],
  listing: [
    { slug: "salalah", text: "A coastal city of coconut and banana groves, a harbour and market, a hospital and shops, with a misty, very humid monsoon season." },
  ],
  areaListing: [
    { slug: "salalah-free-zone", text: "A free zone beside the port at Raysut, with warehouse units, offices and light industry close to the sea." },
    { slug: "raysut-industrial-estate", text: "The industrial estate at Raysut, with factories, workshops, warehouses and chemical and materials stores." },
    { slug: "port-of-salalah", text: "The container port at Raysut, where food, supplies and general goods wait on quays and in sheds in warm, damp air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
