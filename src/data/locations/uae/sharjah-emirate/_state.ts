// /data-logger-sharjah-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "sharjah-emirate",
  name: "Sharjah Emirate",
  type: "state",
  intro:
    "A logger in Sharjah Emirate mostly serves industrial and light-manufacturing storage, as well as free-zone and port-side warehousing. Sharjah Emirate lies between its two neighbours on the Arabian Gulf coast, with a compact city of creeks, souks, museums and universities beside the water, and industrial and free-zone districts spread inland and along the shore. A second, separate part of the emirate faces the Gulf of Oman on the east coast, where Khor Fakkan and Kalba look out from the foot of the mountains. Summers are long, very hot and humid on both coasts, winters are mild, and dust and sea fog come in some seasons. Food, medicines, chemicals and metals wait in warehouses and vehicles in such heat. The pages below cover the city, the east-coast towns and the districts where a temperature record would help.",
  localIndustries: [
    "Industrial and light-manufacturing storage",
    "Free-zone and port-side warehousing",
    "Food, fish and farm produce",
    "Hospitals, clinics and pharmacies",
  ],
  citiesServed: ["Sharjah","Khor Fakkan","Kalba"],
  supportNote:
    "Enquiries from Sharjah Emirate are handled through the enquiry form, Call or WhatsApp. Tell us the town, the rooms to be watched and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Sharjah Emirate?",
      answer:
        "Sharjah, Khor Fakkan and Kalba each have a city page, and Sajaa Industrial Area, SAIF Zone, Hamriyah Free Zone and Muwaileh have area pages under Sharjah. Another town on the east coast can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Does an east-coast site need a different set-up from the city?",
      answer:
        "The east coast is hot and humid with mountains close behind, so damp and salt matter more there, while industrial yards near the city add dust and metal roofs that bake, so mounting position and enclosure differ.",
    },
    {
      question: "Can one login watch sites in different towns?",
      answer:
        "Yes. Each site is a separate point on one dashboard, alerts go to the person responsible for each room, and a manager sees every site together with reports that can be exported.",
    },
  ],
  listing: [
    { slug: "sharjah", text: "A Gulf city of creeks, souks, museums and universities with industrial and free-zone districts around it, in hot, humid summers." },
    { slug: "khor-fakkan", text: "A port town on the Gulf of Oman at the foot of the mountains, with fishing boats, shops, hotels and warm, damp sea air." },
    { slug: "kalba", text: "A small east-coast town beside a mangrove inlet, with fishing, farms, shops, a hospital and hot, humid weather." },
  ],
  areaListing: [
    { slug: "sajaa-industrial-area", text: "An inland industrial area east of the city, with factories, workshops, storage yards and warehouses on large plots." },
    { slug: "saif-zone", text: "A free zone beside the city's airport, with warehouse units and offices for trading and light-industrial firms." },
    { slug: "hamriyah-free-zone", text: "A coastal free zone north of the city, with plots for heavy and light industry and storage beside the shore." },
    { slug: "muwaileh", text: "A mixed commercial and residential district in the east of the city, with shops, workshops, clinics and storerooms." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
