// /data-logger-madinah-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "madinah-region",
  name: "Madinah Region",
  type: "state",
  intro:
    "A logger in Madinah Region mostly serves hospitality and food supply, as well as hospitals and medicine distribution. The Madinah Region lies in the west of the kingdom, with its capital inland on a plateau of lava fields and its Red Sea port and industrial city at Yanbu on the coast. Madinah itself has a large hospitality and healthcare economy, with hotels, hospitals, pharmacies and food suppliers working throughout the year, while Yanbu holds petrochemical plants, a port and the warehouses that serve them. Summers are very hot and dry inland and hot and humid on the coast. Medicines, chilled food and general cargo travel long roads between the two, so storage rooms are watched both at the destination and on the route. The pages below cover the inland city and the port, with the rooms we would suggest watching in each.",
  localIndustries: [
    "Hospitality and food supply",
    "Hospitals and medicine distribution",
    "Port and petrochemical logistics",
    "Retail distribution",
  ],
  citiesServed: ["Madinah", "Yanbu"],
  supportNote:
    "Set-up, alert rules and user access for Madinah Region sites are arranged remotely by call or video. Send the city and a note of what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Madinah Region?",
      answer:
        "Madinah and Yanbu each have a city page, and Yanbu also has an area page for its industrial city. Any other town can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do alerts help a hotel or hospital store in a very hot inland city?",
      answer:
        "A cooling plant that works near its limit can trip on a hot afternoon, so a high limit with a short delay warns the engineer early, and a low limit protects stock that could freeze when a unit overshoots.",
    },
    {
      question: "Can one dashboard show a coastal depot and an inland store?",
      answer:
        "Yes. Each site is a point on the same account with its own alert contacts, so a supplier sees the port and the city in a single list and exports a report for either.",
    },
  ],
  listing: [
    { slug: "madinah", text: "A hot plateau city of hotel and catering kitchens, hospital and pharmacy stores, date packers and depots supplied by road and rail." },
    { slug: "yanbu", text: "A Red Sea port town beside a large industrial city, with fishing landings, resort kitchens, clinics and port warehouses." },
  ],
  areaListing: [
    { slug: "yanbu-industrial-city", text: "The planned coastal industrial city of refineries, downstream plants, shared utilities, spares warehouses and camps." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
