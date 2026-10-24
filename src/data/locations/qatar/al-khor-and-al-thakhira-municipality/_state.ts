// /data-logger-al-khor-and-al-thakhira-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-khor-and-al-thakhira-municipality",
  name: "Al Khor and Al Thakhira Municipality",
  type: "state",
  intro:
    "A logger in Al Khor and Al Thakhira mostly serves fish, food and market trade, as well as industrial support stores and laboratories. The Al Khor and Al Thakhira Municipality covers a stretch of the north-east coast of Qatar, where a creek-side fishing town, shallow mangrove-lined inlets and a flat headland meet the Gulf. Al Khor is the main town, with a harbour for fishing boats, a corniche, parks and family neighbourhoods, while Ras Laffan lies further along the coast on a headland that has been laid out as an industrial city with a harbour of its own. Summers are long, very hot and humid on the shore, winters mild, and sandy winds blow in from the desert. Food, fish, chemicals and medicines wait in shops, sheds and warehouses in such heat. The pages below cover the two towns and the industrial city at Ras Laffan.",
  localIndustries: [
    "Fish, food and market trade",
    "Industrial support stores and laboratories",
    "Clinics, pharmacies and care centres",
    "Warehouses and workshops",
  ],
  citiesServed: ["Al Khor","Ras Laffan"],
  supportNote:
    "Enquiries from Al Khor and Al Thakhira Municipality are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Khor and Al Thakhira?",
      answer:
        "Al Khor and Ras Laffan each have a city page, and the Ras Laffan Industrial City has an area page under Ras Laffan. Another place on the coast can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a creek and mangrove coast matter for stores?",
      answer:
        "Still, damp air above the creek and salt on the breeze reach every shed and cold box, so a humidity record beside the temperature shows moisture that a thermometer alone would miss.",
    },
    {
      question: "Can one dashboard cover a fishing town and an industrial site?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can view both places together in a single exported report.",
    },
  ],
  listing: [
    { slug: "al-khor", text: "A creek-side fishing town with a corniche, parks, a harbour and family neighbourhoods, in hot, humid summers and salt air." },
    { slug: "ras-laffan", text: "A headland city on the north-east coast with a harbour, support stores, laboratories, workshops and housing for a working community." },
  ],
  areaListing: [
    { slug: "ras-laffan-industrial-city", text: "The planned industrial city on the Ras Laffan headland, with materials and parts stores, laboratories, canteens and workshops beside the shore." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
