// /data-logger-tabuk-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "tabuk-region",
  name: "Tabuk Region",
  type: "state",
  intro:
    "A logger in Tabuk Region mostly serves farm produce and food depots, as well as hospitals and medicine supply. The Tabuk Region occupies the north-west of the kingdom, a large area of desert, mountains and coast that reaches the Red Sea and the Gulf of Aqaba. Tabuk, the regional capital, has farms, markets, hospitals and distribution depots; Duba and Haql are small coastal towns with port activity; and NEOM is a planned development in the region with a stated purpose of building new cities and industries. Winters are cold, with frost on high ground and occasional snow on the mountains, and summers are hot and dry, so storage rooms meet both extremes. Distances are long, and goods travel far to reach the region. The Tabuk page below covers the farms, depots and hospital stores of the regional capital.",
  localIndustries: [
    "Farm produce and food depots",
    "Hospitals and medicine supply",
    "Coastal port logistics",
    "Retail distribution",
  ],
  citiesServed: ["Tabuk"],
  supportNote:
    "Set-up, alert rules and user access for Tabuk Region sites are arranged remotely by call or video. Send the town and a short note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Tabuk Region?",
      answer:
        "Tabuk has a city page. The coastal towns and other places in the region can be raised through the enquiry form, and further pages are added as they are written.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would a store in a hot desert region need a low limit?",
      answer:
        "Winter nights can be cold enough to chill stock that should not freeze, so we suggest both a low and a high alert limit, with a short delay on the high one.",
    },
    {
      question: "How are long journeys into the region tracked?",
      answer:
        "A logger in the load records every hour of the journey, and the report shows how long goods stood in a vehicle in the heat, which helps a supplier answer a buyer's questions.",
    },
  ],
  listing: [
    { slug: "tabuk", text: "The north-western regional capital of irrigated farms, food depots, a regional hospital and a university, with hot summers and frosty winters." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
