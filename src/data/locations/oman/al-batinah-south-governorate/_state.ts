// /data-logger-al-batinah-south-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-batinah-south-governorate",
  name: "Al Batinah South Governorate",
  type: "state",
  intro:
    "A logger in Al Batinah South Governorate mostly serves dates, fruit and farm produce, as well as fish and market trade. Al Batinah South Governorate covers the southern part of the Batinah, where the flat coastal plain on the Gulf of Oman gives way to the foothills of the Hajar mountains. On the coast, Barka is a market town of fish, fruit and dates with an industrial area beside the road, while inland Rustaq and Nakhal are oasis towns at the foot of the mountains, with date palms, small farms and ancient irrigation channels running between the groves. The coast is hot and humid in summer, the foothills hot by day and cooler at night, and storms send water down the wadis. Fish, dates, farm produce and building materials wait in sheds in such heat. The pages below cover the three towns and the industrial area at Barka.",
  localIndustries: [
    "Dates, fruit and farm produce",
    "Fish and market trade",
    "Industrial and workshop storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Barka","Rustaq","Nakhal"],
  supportNote:
    "Enquiries from Al Batinah South Governorate are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and how they are cooled, and our reply covers what seems suitable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Batinah South Governorate?",
      answer:
        "Barka, Rustaq and Nakhal each have a city page, and the Barka Industrial Area has an area page under Barka. A town elsewhere in the governorate can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do foothill oasis towns differ from the coast for storage?",
      answer:
        "Oasis towns are hot by day but cooler at night and damp among the palms, while the coast is hot and salty round the clock, so mounting spots, humidity checks and alert rules differ between the two.",
    },
    {
      question: "Can one dashboard hold a coastal market and an inland date farm?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can view the coast and the foothills together in a single exported report.",
    },
  ],
  listing: [
    { slug: "barka", text: "A coastal market town of fish, fruit and dates with a market, farms and an industrial area, in hot, humid sea air." },
    { slug: "rustaq", text: "A foothill oasis town below the mountains, with date palms, irrigation channels, a hillside quarter and hot days and cooler nights." },
    { slug: "nakhal", text: "A small oasis town at the foot of the mountains, with groves of date palms, a hillside quarter, farms and warm springs nearby." },
  ],
  areaListing: [
    { slug: "barka-industrial-area", text: "The industrial area beside Barka, with workshops, warehouses, light factories and building-material yards." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
