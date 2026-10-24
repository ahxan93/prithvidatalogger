// /data-logger-al-asimah-governorate | State hub | parent: Kuwait
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-asimah-governorate",
  name: "Al Asimah Governorate",
  type: "state",
  intro:
    "A logger in Al Asimah Governorate mostly serves hospitals, clinics and pharmacies, as well as food retail and catering kitchens. Al Asimah Governorate holds the capital area of Kuwait, a compact urban strip along the southern shore of Kuwait Bay where towers of glass stand beside an old covered market and a fish market, and wide roads link districts of offices, shops, hospitals and apartments. To the west a commercial port and an industrial area hold warehouses, workshops and yards. Summers are extremely hot and dry with strong sun, the air by the bay is humid, winters are mild, and dust storms blow in from the desert in some seasons. Food, medicines, electronics and building materials wait in kitchens, clinics and warehouses in such heat. The pages below cover the city, its industrial area and its port.",
  localIndustries: [
    "Hospitals, clinics and pharmacies",
    "Food retail and catering kitchens",
    "Port-side and industrial warehousing",
    "Markets and fish trade",
  ],
  citiesServed: ["Kuwait City"],
  supportNote:
    "Enquiries from Al Asimah Governorate are handled through the enquiry form, Call or WhatsApp. Let us know the district, the rooms and how they are cooled, and we answer with what looks workable at the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Asimah Governorate?",
      answer:
        "Kuwait City has a city page, and the Shuwaikh Industrial Area and Shuwaikh Port have area pages under it. Another district can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does extreme dry heat still call for humidity records near the bay?",
      answer:
        "Air beside the bay is humid, and cold rooms form condensation whenever a door opens to the outside, so a humidity trend beside the temperature shows moisture that a thermometer alone would miss.",
    },
    {
      question: "What happens to the record during a power cut?",
      answer:
        "A logger carries on from its own battery and holds its readings in memory, so an outage leaves a complete record to read once the site is back online.",
    },
  ],
  listing: [
    { slug: "kuwait-city", text: "A harbour capital on Kuwait Bay, with towers, an old covered market, a fish market, hospitals and apartments, in extreme dry summer heat and humid bay air." },
  ],
  areaListing: [
    { slug: "shuwaikh-industrial-area", text: "An industrial area west of the city centre, with workshops, warehouses, spare-parts shops and light factories." },
    { slug: "shuwaikh-port", text: "The commercial port at Shuwaikh, where food, supplies and general goods wait on quays and in sheds in hot, hazy air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
