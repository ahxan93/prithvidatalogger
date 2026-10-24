// /data-logger-hail-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "hail-region",
  name: "Hail Region",
  type: "state",
  intro:
    "A logger in Hail Region mostly serves wheat, dates and vegetables, as well as food and dairy depots. The Hail Region lies in the north of the central plateau, ringed by two ranges of granite hills, and its economy is built on farming and trade. Hail, the capital, has markets, hospitals and warehouses, and the fields of the region grow wheat, dates and vegetables that are packed and stored for sale across the kingdom. Summers are very hot and dry, winters are cold with frost on clear nights, and dust storms arrive in spring. Farm cold rooms, date stores, hospital refrigerators and retail depots must hold their limits through the heat and the cold. The Hail page below covers the farms, mills and hospital stores of the regional capital.",
  localIndustries: [
    "Wheat, dates and vegetables",
    "Food and dairy depots",
    "Hospitals and medicine supply",
    "Retail distribution",
  ],
  citiesServed: ["Hail"],
  supportNote:
    "Set-up, alert rules and user access for Hail Region sites are arranged remotely by call or video. Share the town and a note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Hail Region?",
      answer:
        "Hail has a city page. Other towns of the region can be raised through the enquiry form, and further pages are added as they are written.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a logger help a farm cold room in a region with cold winters?",
      answer:
        "It records both the high and the low end of the range, so a room that overheats in summer or chills produce on a frosty night leaves a clear record for the owner.",
    },
    {
      question: "Can a group with stores in Hail and Qassim watch them together?",
      answer:
        "Yes. Each store is a site on the same dashboard with its own alert contacts, so a trader sees both regions in one list and exports a report for any store.",
    },
  ],
  listing: [
    { slug: "hail", text: "A hill-ringed farming capital of wheat, dates and dairies, with a university, a large hospital and an industrial city." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
