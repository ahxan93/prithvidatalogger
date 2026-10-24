// /data-logger-amanat-al-asimah | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "amanat-al-asimah",
  name: "Amanat Al Asimah",
  type: "state",
  intro:
    "Any logger in Amanat Al Asimah is arranged case by case, whether for medicine and vaccine storage or food, coffee and raisin trade. Amanat Al Asimah is the administrative area that covers the city of Sana'a, set high in the western mountains of Yemen on a broad plateau ringed by peaks. Its Old City, a World Heritage site, is a maze of tall brick houses, covered markets and gardens, while newer districts spread across the valley floor with hospitals, a university, workshops and warehouses. Altitude gives the area a mild, dry climate with sharp swings between warm afternoons and cold nights, and rain comes mainly in a short summer season. Medicines, food, coffee, raisins and laboratory samples all need steady storage. The pages below describe the city, an industrial area and the airport on its northern side, and the rooms where a temperature record would help.",
  localIndustries: [
    "Medicine and vaccine storage",
    "Food, coffee and raisin trade",
    "Workshops and small factories",
    "Air cargo and warehousing",
  ],
  citiesServed: ["Sana'a"],
  supportNote:
    "Enquiries from Amanat Al Asimah are reviewed case by case. Tell us which district of Sana'a you mean, what is kept there and how the room is cooled, and we reply with what looks workable.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Amanat Al Asimah?",
      answer:
        "Sana'a has a city page, and the Sana'a Industrial Area and Sana'a International Airport have area pages under it. Another district can be put to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a high, dry plateau still call for humidity records?",
      answer:
        "Summer rain and cold nights bring condensation into stores that are dry for most of the year, and thick old walls hold damp, so a humidity reading beside the temperature shows when a room has drifted.",
    },
    {
      question: "What does a logger do while the power is off?",
      answer:
        "It carries on recording from its own battery and keeps the readings in memory, so the hours without power are still on record when the site next connects.",
    },
  ],
  listing: [
    { slug: "sanaa", text: "A highland city on a mountain-ringed plateau, with a World Heritage Old City, a university, hospitals, markets and cold nights." },
  ],
  areaListing: [
    { slug: "sanaa-industrial-area", text: "An industrial area on the edge of the city, with small factories, workshops and warehouses." },
    { slug: "sanaa-international-airport", text: "The airport north of Sana'a, where medicines and perishable goods wait between aircraft and onward vehicles." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
