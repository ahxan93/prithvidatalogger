// /data-logger-rajasthan | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "rajasthan",
  name: "Rajasthan",
  type: "state",
  intro:
    "A logger in Rajasthan faces dry desert heat. Rajasthan is a desert state, and its storage is shaped by dry heat and a large daily swing: afternoons that overwhelm ageing cooling and nights that cool the same rooms quickly. We serve the capital, Jaipur, where industrial areas on the northern and southern sides sit beside crowded wholesale markets, dairies, hospitals and hotels, and the cities that anchor the other regions: Jodhpur in the west for handicrafts, stone and cloth, Udaipur in the south for lakeside hotels and mineral works, Kota beside the Chambal for chemicals and coaching hostels, and Ajmer for pilgrimage and trade, with Bhilwara's textile mills and the Bhiwadi and Neemrana factory zones toward Delhi. Rooms of stone and concrete hold the day's heat long after dark. The pages below take each city in turn, with its estates, its stores and the loggers that fit them.",
  localIndustries: [
    "Pharmaceutical distribution",
    "Food and dairy processing",
    "Hospitals and hospitality",
  ],
  citiesServed: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bhilwara", "Bhiwadi", "Neemrana"],
  supportNote:
    "Supply, installation support and site visits for Rajasthan sites are arranged from our Mumbai office. Write to us with the district and the rooms to watch.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Rajasthan?",
      answer:
        "Jaipur has a city page covering Sitapura, VKI and the dairies and medicine markets, and Jodhpur, Udaipur, Kota, Ajmer, Bhilwara, Bhiwadi and Neemrana each have a city page of their own. A site elsewhere in Rajasthan can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does the daily swing matter for alerts?",
      answer:
        "A room can be in range at dawn and out of it by mid-afternoon, so a short delay on the high limit catches a warming store, while longer delays avoid false alarms from doors left open.",
    },
    {
      question: "Can a hotel group see all of its Rajasthan kitchens in one place?",
      answer:
        "Each hotel is a site on the dashboard, each kitchen's alerts go to its own engineer and a group manager sees every site together.",
    },
  ],
  listing: [
    { slug: "jaipur", text: "A tourism and trading city of dairies, medicine stockists, hotels and hospitals, with Sitapura and VKI as its industrial areas in desert heat." },
    { slug: "jodhpur", text: "The blue city on the edge of the Thar desert, with furniture and handicraft exporters, sandstone, dyeing works, spice dealers and a national medical institute." },
    { slug: "udaipur", text: "The lake city of heritage hotels and busy kitchens, with marble and mineral works at Madri and Sukher and hospitals serving the hills." },
    { slug: "kota", text: "A Chambal-side city of power, fertiliser and chemical works, Kota stone yards and hostel mess kitchens that feed its coaching students." },
    { slug: "ajmer", text: "A hill-ringed pilgrimage and trade city of sweet makers, railway goods sheds, colleges and hospitals, close to the Kishangarh marble yards." },
    { slug: "bhilwara", text: "The textile city of spinning and weaving mills, dyeing houses and cloth godowns, where humidity decides how yarn runs." },
    { slug: "bhiwadi", text: "A large factory town on the Delhi-region side of the state, with auto-parts, plastics, food and warehouse estates beside the Haryana border." },
    { slug: "neemrana", text: "A planned industrial corridor on the Delhi to Jaipur highway, with the Japanese Zone, automotive and appliance makers and highway warehouses." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
