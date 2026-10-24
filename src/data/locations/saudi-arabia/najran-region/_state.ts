// /data-logger-najran-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "najran-region",
  name: "Najran Region",
  type: "state",
  intro:
    "A logger in Najran Region mostly serves dates, fruit and grain, as well as food depots and retail distribution. The Najran Region lies in the south of the kingdom, around a long fertile valley between the mountains and the desert, and its economy rests on farming, trade and services. Najran, the regional capital, has markets, hospitals, hotels and distribution depots, and the valley grows dates, grapes and other fruit and grain. Summers are hot and dry, winters are mild to cold, and rain is scarce but can arrive in heavy bursts. Date and fruit stores, farm cold rooms, hospital refrigerators and retail warehouses must hold their ranges through long hot spells, and goods reach the region over long roads. The Najran page below covers the valley's date stores, markets and clinics.",
  localIndustries: [
    "Dates, fruit and grain",
    "Food depots and retail distribution",
    "Hospitals and medicine supply",
    "Hospitality kitchens",
  ],
  citiesServed: ["Najran"],
  supportNote:
    "Set-up, alert rules and user access for Najran Region sites are arranged remotely by call or video. Share the town and a note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Najran Region?",
      answer:
        "Najran has a city page. Other towns of the valley can be raised through the enquiry form, and further pages are added as they are written.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How can a date or fruit store be kept within range through a hot spell?",
      answer:
        "A logger records the room all season and sends an alert when a reading passes its limit, so a failing cooler is found while the stock can still be saved.",
    },
    {
      question: "Can goods carried over a long road be tracked?",
      answer:
        "A logger placed in the load records every hour of the journey, and the report shows how long goods stood in a vehicle in the heat before they reached the store.",
    },
  ],
  listing: [
    { slug: "najran", text: "A fertile-valley oasis city of date and fruit farms, wholesale markets, a university, hospitals and an industrial city." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
