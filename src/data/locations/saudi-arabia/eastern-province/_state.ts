// /data-logger-eastern-province | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "eastern-province",
  name: "Eastern Province",
  type: "state",
  intro:
    "A logger in Eastern Province mostly serves chemicals and heavy industry, as well as port yards and logistics. The Eastern Province stretches along the Gulf coast and far inland across the desert, and it holds much of the kingdom's energy and heavy industry. Dammam, Al Khobar and Dhahran form a coastal cluster of ports, offices and hospitals; Jubail and Ras Al Khair are planned industrial cities; Ras Tanura and Abqaiq are linked to oil handling; and Al Ahsa is a great date-growing oasis inland. Summers are hot and humid on the coast and fiercely dry inland, so chemical stores, port yards, food depots and hospital refrigerators all work against the climate. Each place below has its own page, with its main stores and the loggers we would suggest.",
  localIndustries: [
    "Chemicals and heavy industry",
    "Port yards and logistics",
    "Food depots and date processing",
    "Hospitals and retail distribution",
  ],
  citiesServed: ["Dammam", "Al Khobar", "Jubail", "Al Ahsa", "Dhahran", "Qatif", "Ras Al Khair"],
  supportNote:
    "Set-up, alert rules and user access for Eastern Province sites are arranged remotely by call or video. Tell us the city or the plant and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Eastern Province?",
      answer:
        "Dammam, Al Khobar, Jubail, Al Ahsa, Dhahran, Qatif and Ras Al Khair each have a city page, and Dammam and Jubail also have area pages for their port and industrial cities. A town not yet written up can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do plants on the Gulf coast need humidity as well as temperature?",
      answer:
        "Salt-laden humid air attacks metal and packaging, so a humidity reading beside the temperature shows when a store is taking on moisture even while the cooling plant seems to be coping.",
    },
    {
      question: "Can a company with sites in Dammam and Jubail use one account?",
      answer:
        "Yes. Every plant or depot is a site on the same dashboard with its own alert contacts, and a manager sees the coastal cluster and the industrial cities together in one list.",
    },
  ],
  listing: [
    { slug: "dammam", text: "The Gulf-coast hub of the province, with chemical plants, a major port, fabrication yards and food depots under metal-roof heat." },
    { slug: "al-khobar", text: "A seafront city of hotels, hospitals, malls and a university, in hot, humid air beside Dammam and Dhahran." },
    { slug: "jubail", text: "A very large industrial city on the shore, with petrochemical, fertiliser and steel plants, ports, camps and laboratories." },
    { slug: "al-ahsa", text: "A great date oasis around Hofuf, with date packing houses, rice mills, a university and hospitals." },
    { slug: "dhahran", text: "A planned campus city of research laboratories, a petroleum university, an archive-rich cultural centre and compound clinics." },
    { slug: "qatif", text: "An old oasis city of palm gardens, fish landings, bakeries and clinics just north of Dammam." },
    { slug: "ras-al-khair", text: "An industrial city of aluminium, phosphate and desalination plants, rail and port yards and contractor camps." },
  ],
  areaListing: [
    { slug: "king-abdulaziz-port-dammam", text: "The main Gulf-coast seaport, where containers, cold stores and rail sidings hand cargo from ship to train and truck." },
    { slug: "dammam-1st-industrial-city", text: "An established estate of food, plastics, fabrication and warehouse firms that supply the Gulf coast's plants." },
    { slug: "jubail-industrial-city-1", text: "The original part of the Jubail industrial city, with large chemical stores, spares warehouses and laboratories." },
    { slug: "jubail-industrial-city-2", text: "A later extension with downstream plants, big warehouses and camp kitchens spread over a wide estate." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
