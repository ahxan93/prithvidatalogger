// /data-logger-ajman-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ajman-emirate",
  name: "Ajman Emirate",
  type: "state",
  intro:
    "A logger in Ajman Emirate mostly serves light industry and workshops, as well as food import, fish and market trade. Ajman Emirate is a small coastal emirate on the Arabian Gulf, tucked between its neighbours, where a compact city of creek, fishing harbour and dhow-building yards sits beside busy residential and commercial districts. Inland, industrial districts hold workshops, light factories and warehouses, and a free zone stands near the port. Fishing boats and traditional dhows are still part of daily life here. The coast is very hot and humid in summer, the inland districts hot and dusty, and winters are mild. Food, medicines, chemicals and building materials wait in stores and vehicles in such heat. The pages below cover the city and two districts where a temperature record would help.",
  localIndustries: [
    "Light industry and workshops",
    "Food import, fish and market trade",
    "Free-zone and port-side storage",
    "Clinics, hospitals and pharmacies",
  ],
  citiesServed: ["Ajman"],
  supportNote:
    "Enquiries from Ajman Emirate are handled through the enquiry form, Call or WhatsApp. Say which district, which rooms and how they are cooled, and we answer with what looks suitable here.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ajman Emirate?",
      answer:
        "Ajman has a city page, and the Al Jurf Industrial Area and the Ajman Free Zone have area pages under it. Another district of Ajman can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a small emirate with short distances still need storage records?",
      answer:
        "Distances are short but the heat is not, and goods left in a parked vehicle or an unshaded yard between two points can warm sharply, so a continuous record shows where the warm spells occurred.",
    },
    {
      question: "Does a logger keep recording through a cooling failure?",
      answer:
        "Yes. It keeps recording on its own battery and stores the readings, so the hours when cooling or power failed are still on record when the site is next connected.",
    },
  ],
  listing: [
    { slug: "ajman", text: "A small Gulf city of creek, fishing harbour and dhow yards beside Sharjah, with markets, clinics and workshops in hot, humid summers." },
  ],
  areaListing: [
    { slug: "al-jurf-industrial-area", text: "An industrial district inland from the city, with workshops, light factories, stores and warehouses on a dense grid." },
    { slug: "ajman-free-zone", text: "A free zone near the city's port, with offices, warehouse units and light industry close to the sea." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
