// /data-logger-northern-borders-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "northern-borders-region",
  name: "Northern Borders Region",
  type: "state",
  intro:
    "A logger in Northern Borders Region mostly serves food and dairy depots, as well as hospitals and medicine supply. The Northern Borders Region occupies the far north of the kingdom, a wide area of desert plateau where the regional capital, Arar, holds the markets, hospitals and distribution depots. Livestock, farming and transport shape the local economy, and goods travel a long way by road to reach the region, so warehouses for medicines, chilled food and general cargo are the main storage rooms. Summers are hot and dry, winter nights are cold with frost, and dust storms and sudden rain can interrupt journeys. Cold rooms and refrigerators must therefore be watched through power cuts as well as seasons. The Arar page below covers the depots, clinics and farm stores of the regional capital.",
  localIndustries: [
    "Food and dairy depots",
    "Hospitals and medicine supply",
    "Livestock and farm produce",
    "Retail distribution",
  ],
  citiesServed: ["Arar"],
  supportNote:
    "Set-up, alert rules and user access for Northern Borders Region sites are arranged remotely by call or video. Write to us with the town and a note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Northern Borders Region?",
      answer:
        "Arar has a city page. Other towns of the region can be raised through the enquiry form, and further pages are added as they are written.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do long road journeys matter for temperature records?",
      answer:
        "Goods may spend a day or more in a vehicle before they reach a store, so a logger in the load shows the full range of temperature the goods met and not just the reading at the depot.",
    },
    {
      question: "What happens to a record if the power fails?",
      answer:
        "Loggers keep recording on their batteries and send the stored readings when the network returns, and an alert for a lost mains supply warns the named person.",
    },
  ],
  listing: [
    { slug: "arar", text: "A northern plateau capital of food and medicine depots, a regional hospital, a university and farm and livestock stores." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
