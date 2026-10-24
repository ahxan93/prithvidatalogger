// /data-logger-dubai-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "dubai-emirate",
  name: "Dubai Emirate",
  type: "state",
  intro:
    "A logger in Dubai Emirate mostly serves hotel and restaurant kitchens, as well as warehouse and free-zone storage. Dubai Emirate is a narrow strip of the Arabian Gulf coast built around a tidal creek, with a dense modern city on the shore and a belt of industrial and warehouse districts spread inland and to the south-west. Hotels, hospitals, malls and kitchens fill the city, while port-side, free-zone and industrial districts hold stock for shops and businesses across the region. Summers are long, very hot and humid on the coast, winters are mild, and dust and fog come in some seasons. Food, medicines, chemicals and electronics wait in warehouses and vehicles in such heat. The pages below cover the city and each district in turn, with the rooms where a temperature record would help.",
  localIndustries: [
    "Hotel and restaurant kitchens",
    "Warehouse and free-zone storage",
    "Food import and wholesale markets",
    "Hospitals and medicine distribution",
  ],
  citiesServed: ["Dubai"],
  supportNote:
    "Enquiries from Dubai Emirate are handled through the enquiry form, Call or WhatsApp. Name the district, the rooms to be watched and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Dubai Emirate?",
      answer:
        "Dubai has a city page, and Jebel Ali, Dubai Investments Park, Al Quoz Industrial Area, Ras Al Khor Industrial Area, Al Qusais Industrial Area, Al Aweer, Dubai Silicon Oasis, Dubai Industrial City, Dubai South, Dubai Logistics City, Dubai Airport Freezone and Dubai Healthcare City have area pages under it. A district not listed here can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do inland industrial districts and the coast need different logger set-ups?",
      answer:
        "The coast is hot and damp, so condensation and soft cartons matter, while inland districts see dry heat, dust and metal roofs that bake, so mounting position and enclosure matter more.",
    },
    {
      question: "Can one login watch sites across several districts?",
      answer:
        "Yes. Each site is a separate point on one dashboard, alerts go to the people responsible for each room, and a manager sees every site together with reports that can be exported.",
    },
  ],
  listing: [
    { slug: "dubai", text: "A Gulf trading city around a tidal creek, with hotels, hospitals, food importers, malls and warehouses in long, hot, humid summers." },
  ],
  areaListing: [
    { slug: "jebel-ali", text: "The port and free-zone district on the south-western coast, with large warehouses, cold stores and logistics yards." },
    { slug: "dubai-investments-park", text: "A planned park in the south-west of the emirate where factories, warehouses, clinics and homes share the same grid." },
    { slug: "al-quoz-industrial-area", text: "An inland industrial district of workshops, food suppliers and mid-sized warehouses close to the city's shops and kitchens." },
    { slug: "ras-al-khor-industrial-area", text: "An industrial district at the head of the creek, with workshops, spare-parts shops, light industry and warehouses." },
    { slug: "al-qusais-industrial-area", text: "An industrial district in the north-east of the city, with factories, food firms, workshops and stores." },
    { slug: "al-aweer", text: "An eastern district known for its wholesale fruit and vegetable market and for industrial yards and stores." },
    { slug: "dubai-silicon-oasis", text: "A technology-minded community in the east of the city, with offices, electronics and light industry, schools and homes on one grid." },
    { slug: "dubai-industrial-city", text: "A planned industrial city in the south of the emirate, with plots for manufacturing, storage and distribution." },
    { slug: "dubai-south", text: "A planned city around an airport in the south of the emirate, with aviation, logistics, commercial and residential districts." },
    { slug: "dubai-logistics-city", text: "The logistics district inside Dubai South, laid out for warehouses, cold stores and distribution yards." },
    { slug: "dubai-airport-freezone", text: "A free zone beside the city's main airport, with offices and warehouse units for air-related trades." },
    { slug: "dubai-healthcare-city", text: "A healthcare district near the creek, with clinics, hospitals, laboratories and medical suppliers." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
