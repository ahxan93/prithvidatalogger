// /data-logger-odisha | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "odisha",
  name: "Odisha",
  type: "state",
  intro:
    "A logger in Odisha is mostly placed in steel works, port stores and hospitals. Odisha runs along the Bay of Bengal from the Mahanadi delta to the mineral-rich western plateau, and its storage divides in the same way. On the coast, Bhubaneswar and Cuttack hold hospitals, institutes, markets and small industrial estates, while a port, a refinery and fertiliser works line the shore at Paradip. Inland, Rourkela's steel town and the mining and power country around Jharsuguda hold heavy industry with long supply chains. The coast is hot, humid and exposed to cyclones, the plateau is scorching in summer and cold on winter nights, and the monsoon is heavy everywhere. Cold rooms, chemical stores and hospital refrigerators must therefore cope with storms and outages as well as simple heat. The page for each city describes its stores and suggests matching loggers.",
  localIndustries: [
    "Steel, aluminium and power works",
    "Ports, refinery and fertiliser stores",
    "Hospitals and institutions",
    "Food and seafood processing",
  ],
  citiesServed: ["Bhubaneswar", "Cuttack", "Rourkela", "Paradip", "Jharsuguda"],
  supportNote:
    "Supply, installation support and site visits for Odisha sites are arranged from our Mumbai office. Tell us the city, the estate or the plant and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Odisha?",
      answer:
        "Bhubaneswar, Cuttack, Rourkela, Paradip and Jharsuguda each have a city page. A site in another town of the state can be raised by writing to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why plan for a cyclone when choosing a logger?",
      answer:
        "A cyclone brings days of power loss and blocked roads, so a logger with a battery keeps recording and an alert for a lost mains supply tells the responsible person that a cold room has been left unprotected.",
    },
    {
      question: "Can a company with plants on the coast and the plateau use one account?",
      answer:
        "Yes. Every plant is a site with its own alert contacts, and a head of operations sees the coast and the western plateau together in one list.",
    },
  ],
  listing: [
    { slug: "bhubaneswar", text: "The temple capital of hospitals, institutes and technology parks, with Mancheswar, Rasulgarh and Chandaka estates in hot humid coastal air." },
    { slug: "cuttack", text: "The old twin city on the Mahanadi, with silver filigree workshops, wholesale markets, a teaching hospital and the Choudwar and Jagatpur estates." },
    { slug: "rourkela", text: "A steel town of the western plateau with planned sectors, a technology institute, a large works hospital and ancillary estates." },
    { slug: "paradip", text: "The deepwater port at the Mahanadi mouth, with a refinery, fertiliser sheds, dock warehouses and a fishing harbour in cyclone-prone, salty air." },
    { slug: "jharsuguda", text: "A rail and coal-country town of aluminium and power works, sponge-iron firms and neighbouring glass and refractory towns." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
