// /data-logger-makkah-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "makkah-region",
  name: "Makkah Region",
  type: "state",
  intro:
    "A logger in Makkah Region mostly serves port logistics and imported goods, as well as hospitality and hotel kitchens. The Makkah Region lies along the Red Sea coast in the west of the kingdom and climbs inland into the Sarawat mountains. Jeddah, the port and commercial centre, receives much of the kingdom's imported food, medicine and general cargo; Makkah and Taif sit inland, with hospitality, healthcare and retail trades; and Rabigh and King Abdullah Economic City stand on the coast to the north with industrial and port facilities. The coast is hot and humid, the mountains are cooler, and dust moves in from the desert. Warehouses, hotel kitchens, hospital stores and port yards hold stock that must stay in range. Open a place below to see its main rooms and the loggers we would suggest.",
  localIndustries: [
    "Port logistics and imported goods",
    "Hospitality and hotel kitchens",
    "Hospitals and medicine supply",
    "Coastal industry and retail distribution",
  ],
  citiesServed: ["Jeddah", "Makkah", "Taif", "Rabigh", "King Abdullah Economic City"],
  supportNote:
    "Set-up, alert rules and user access for Makkah Region sites are arranged remotely by call or video. Tell us the city and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Makkah Region?",
      answer:
        "Jeddah, Makkah, Taif, Rabigh and King Abdullah Economic City each have a city page, and Jeddah also has pages for its Islamic Port and its 1st Industrial City. Other towns follow as their pages are written; meanwhile a site anywhere in the region can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does coastal humidity change where a logger is placed?",
      answer:
        "Damp air condenses on cold surfaces, so we keep the logger body away from door seals and cooling coils, run only the probe into the cold space and set alerts for a door left open.",
    },
    {
      question: "Can a group with sites in Jeddah and Taif view them together?",
      answer:
        "Yes. Each site appears on the same dashboard with its own alert recipients, so a hotel or distribution group sees the coast and the mountains in a single list.",
    },
  ],
  listing: [
    { slug: "jeddah", text: "The Red Sea port city, with harbour warehouses, imported-food cold rooms and hospitals in hot, humid coastal air." },
    { slug: "makkah", text: "A hot mountain-valley city of hotel and catering kitchens, hospital and pharmacy stores and food depots supplied by road from the coast." },
    { slug: "taif", text: "A cooler escarpment city of rose distilleries, fruit packing houses, hotel kitchens and hospitals, linked to the coast by a mountain road." },
    { slug: "rabigh", text: "A coastal town of refinery and petrochemical stores, camp canteens, clinics and port warehouses in salty, humid air." },
    { slug: "king-abdullah-economic-city", text: "A planned Red Sea city with a port, an industrial zone, hotels and clinics, supplied by sea and by road from Jeddah." },
  ],
  areaListing: [
    { slug: "jeddah-islamic-port", text: "The main Red Sea seaport, where containers, cold stores and transit sheds hand cargo from ship to truck in heat and salt." },
    { slug: "jeddah-1st-industrial-city", text: "An early industrial estate of food, plastics, packaging and chemical plants and warehouses in humid heat under metal roofs." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
