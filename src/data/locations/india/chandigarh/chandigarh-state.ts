// /data-logger-chandigarh-state | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "chandigarh",
  name: "Chandigarh",
  type: "state",
  intro:
    "A logger in the Chandigarh Region mostly serves hospitals, medicine distributors and dairy depots. Chandigarh is a planned city and a union territory, the shared capital of two states, and the towns of Mohali and Panchkula have grown into its edges. Its storage is shaped by a prosperous population and a regional role: hospitals and research institutes, medicine distributors who supply surrounding districts, and dairy, bakery and food firms with depots in the industrial area. Rooms are modern but busy, and the climate swings between hot, dry summers and cold winters, so a low limit matters alongside the high one. This regional page introduces the territory and points to the city page, which holds the detail for the sectors, the industrial area and the neighbouring towns.",
  localIndustries: [
    "Hospitals and diagnostic laboratories",
    "Pharmaceutical distribution",
    "Food and dairy distribution",
  ],
  citiesServed: ["Chandigarh"],
  supportNote:
    "Supply, installation support and site visits for the Chandigarh region are arranged from our Mumbai office. Tell us the sector or town and what the rooms hold.",
  faqs: [
    {
      question: "Why is there a separate page for the territory and for the city?",
      answer:
        "The territory page gives the regional picture and links the pages beneath it, while the city page goes into rooms, climate and loggers for Chandigarh, Mohali and Panchkula in depth.",
    },
    {
      question: "Where can I find a temperature data logger in the Chandigarh Region?",
      answer:
        "The city page covers the industrial area phases, Mohali and Panchkula together. Baddi's pharmaceutical cluster, a short drive away, has its own page under Himachal Pradesh.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a clinic with several floors watch every fridge?",
      answer:
        "Each fridge is a device in a room under the clinic's site, alerts go to the person for that floor and a manager sees every floor in one list.",
    },
  ],
  listing: [
    { slug: "chandigarh", text: "The planned city with Mohali and Panchkula beside it, serving hospitals, medicine distributors, dairy and food depots through hot summers and cold winters." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
