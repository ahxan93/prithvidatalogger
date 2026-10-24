// /data-logger-abu-dhabi-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "abu-dhabi-emirate",
  name: "Abu Dhabi Emirate",
  type: "state",
  intro:
    "A logger in Abu Dhabi Emirate mostly serves industrial and warehouse storage, as well as food import and catering. Abu Dhabi Emirate stretches from a string of islands and mangrove shallows on the Arabian Gulf coast, through a broad belt of salt flats, to the sand dunes of the interior and the oasis city of Al Ain near the mountains. The city of Abu Dhabi stands on an island joined to the mainland by bridges, with hospitals, hotels, kitchens and laboratories, while the mainland holds industrial districts, free-zone plots and a deep-water port along the coast. The coast is very hot and humid in summer and the interior hot and dry, with dust and strong sun. Medicines, food, chemicals and electronics wait in warehouses and vehicles in such heat. The pages below describe the city and the districts where a temperature record would help.",
  localIndustries: [
    "Industrial and warehouse storage",
    "Food import and catering",
    "Hospitals and pharmaceutical distribution",
    "Port-side and free-zone logistics",
  ],
  citiesServed: ["Abu Dhabi","Al Ain","Ruwais","Madinat Zayed","Liwa"],
  supportNote:
    "Enquiries from Abu Dhabi Emirate are handled through the enquiry form, Call or WhatsApp. Tell us the district, the rooms you want to watch and how they are cooled, and we reply with what looks suitable.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Abu Dhabi Emirate?",
      answer:
        "Abu Dhabi, Al Ain, Ruwais, Madinat Zayed and Liwa each have a city page, and Mussafah, ICAD, KIZAD, Khalifa Port, Ghantoot, the Al Ain Industrial Area and the Ruwais Industrial Complex have area pages. Another town in the emirate can be put to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do coastal and inland sites need different loggers set-ups?",
      answer:
        "The coast is humid as well as hot, so condensation and damp cartons matter, while inland sites face dry heat and dust, so mounting position and enclosure matter more.",
    },
    {
      question: "Does a logger keep recording through a power cut?",
      answer:
        "It carries on recording on its own battery and stores the readings, so the hours without mains power are still on record when the site is next connected.",
    },
  ],
  listing: [
    { slug: "abu-dhabi", text: "An island city on the Arabian Gulf with hospitals, hotels, food importers and industrial districts on the mainland, in very hot, humid summers." },
    { slug: "al-ain", text: "An inland oasis city near the mountains, with date palms, old irrigation channels, a university, hospitals and hot, dry summers." },
    { slug: "ruwais", text: "An industrial town on the western Gulf coast of the emirate, built around refining and petrochemical works, with hot, humid sea air." },
    { slug: "madinat-zayed", text: "A desert regional town in the Al Dhafra region with farms, a livestock market, shops and clinics in dry heat and dust." },
    { slug: "liwa", text: "An oasis of date plantations at the edge of the great sand desert, with giant dunes, farms, guesthouses and clinics." },
  ],
  areaListing: [
    { slug: "mussafah", text: "An industrial district on the mainland across from Abu Dhabi island, with workshops, yards, warehouses and light factories." },
    { slug: "icad", text: "A planned industrial city in the Mussafah area, laid out in plots for factories, stores and distribution." },
    { slug: "kizad", text: "A large planned industrial zone on the coast road between Abu Dhabi and Dubai, beside Khalifa Port." },
    { slug: "khalifa-port", text: "A deep-water container port on the Gulf coast at Taweelah, with reefer stacks, yards and nearby logistics sheds." },
    { slug: "ghantoot", text: "A coastal area on the road between Abu Dhabi and Dubai, with port-side and industrial sites and seaside leisure facilities." },
    { slug: "al-ain-industrial-area", text: "An industrial area on the edge of Al Ain, with workshops, vehicle yards, warehouses and small factories in dry heat." },
    { slug: "ruwais-industrial-complex", text: "The industrial complex at Ruwais, built around refining and petrochemicals, with storage, laboratories and workshops by the sea." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
