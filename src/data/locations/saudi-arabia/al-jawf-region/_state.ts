// /data-logger-al-jawf-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-jawf-region",
  name: "Al Jawf Region",
  type: "state",
  intro:
    "A logger in Al Jawf Region mostly serves olives, dates and farm produce, as well as food and dairy depots. The Al Jawf Region lies in the far north of the kingdom, an area of desert plains with scattered oases, and its economy is built on farming, above all olives, dates and other crops grown on irrigated fields. Sakaka, the regional capital, has markets, hospitals, hotels and distribution depots, and olive presses and date packers hold their produce in stores that must be kept cool and dry. Summers are very hot, winter nights are cold with frost, and long roads connect the region with the rest of the kingdom. Cold rooms and warehouses meet both extremes in a single year. The Sakaka page below covers the olive and date stores and the hospital rooms of the regional capital.",
  localIndustries: [
    "Olives, dates and farm produce",
    "Food and dairy depots",
    "Hospitals and medicine supply",
    "Retail distribution",
  ],
  citiesServed: ["Sakaka"],
  supportNote:
    "Set-up, alert rules and user access for Al Jawf Region sites are arranged remotely by call or video. Give us the town and a short note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Jawf Region?",
      answer:
        "Sakaka has a city page. Other oasis towns can be raised through the enquiry form, and further pages are added as they are written.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a logger help an olive or date store?",
      answer:
        "Oil and fruit keep their quality in steady, cool rooms, so a record of temperature and humidity shows when a store drifted, and an alert warns the owner while there is time to act.",
    },
    {
      question: "Can one dashboard hold a farm store and a town depot?",
      answer:
        "Yes. Each site is a point on the same account with its own alert contacts, so an owner sees the farm and the town together in one list.",
    },
  ],
  listing: [
    { slug: "sakaka", text: "An oasis capital of olive groves, presses and date packers, with a university, a regional hospital and an industrial city." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
