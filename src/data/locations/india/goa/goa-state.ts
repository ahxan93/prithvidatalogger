// /data-logger-goa-state | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "goa",
  name: "Goa",
  type: "state",
  intro:
    "A logger in Goa covers pharma plants and coastal hotel kitchens. Goa is a small coastal state with two quite different storage worlds: a handful of inland industrial estates where pharmaceutical manufacturers work, and the long strip of coast where hotels, resorts, restaurants and the suppliers that stock them run walk-in fridges at their hardest in the tourist season. Salt air and humidity affect both, and the monsoon is heavy, while rooms that empty out in the off-season can drift unseen. This regional page introduces the state in our map and links to the Goa city page, which holds the detail for Verna, Kundaim and the coastal kitchens. The state is small, so a single page describes the plants and the kitchens side by side.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Hotels and restaurant kitchens",
    "Food distribution",
  ],
  citiesServed: ["Goa"],
  supportNote:
    "Supply, installation support and site visits for Goa sites are arranged from our Mumbai office. Tell us the area and whether it is a plant or a kitchen.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in the State of Goa?",
      answer:
        "The Goa city page covers Verna and Kundaim and the hotel kitchens along the coast, and Panjim, Verna, Ponda and Margao each have an area page of their own. A site elsewhere in Goa can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do you serve hotels as well as plants?",
      answer:
        "Yes. A hotel's kitchens and cold rooms and a plant's warehouses are both rooms on the dashboard, with alerts that go to the engineer or the quality head responsible.",
    },
    {
      question: "How should visits be planned around the season?",
      answer:
        "Tell us the busiest and quietest weeks when you write, and we propose a day when kitchens and stores can spare the time.",
    },
  ],
  listing: [
    { slug: "goa", text: "A coastal state's pharmaceutical plants at Verna and Kundaim and its hotel and restaurant kitchens, exposed to salt air and a heavy monsoon." },
  ],
  areaListing: [
    { slug: "panjim", text: "The riverside capital of old lanes, hotels, pharmacies, clinics and offices, where small cold rooms work in salty, damp air." },
    { slug: "verna", text: "The South Goa plateau estate of pharmaceutical, electronics and packaging plants, with stores that must stay dry through the monsoon." },
    { slug: "ponda", text: "An inland town among hills and plantations, with plateau industrial estates, a busy market and highway godowns." },
    { slug: "margao", text: "The commercial town of Salcete with a large market, cold stores, hospitals, retail depots and a Konkan railway junction." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
