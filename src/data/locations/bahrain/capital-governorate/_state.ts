// /data-logger-capital-governorate | State hub | parent: Bahrain
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "capital-governorate",
  name: "Capital Governorate",
  type: "state",
  intro:
    "A logger in Capital Governorate mostly serves hospitals, clinics and pharmacies, as well as hotel, restaurant and catering kitchens. The Capital Governorate holds Manama and its surroundings on the north-east of Bahrain's main island, a dense strip of towers, covered markets, hotels, hospitals, shopping streets and apartment blocks packed along the Gulf shore. A waterfront district of glass towers and a commercial quarter of malls and offices have grown on reclaimed ground along the northern coast, while a commercial port stands to the south-east. Summers are long, very hot and humid, winters mild and pleasant, and dust and sea haze blow in on some days. Food, medicines and household goods wait in kitchens, clinics and warehouses in such air. The pages below cover the city, the built-up districts of Juffair and Adliya, two commercial and waterfront districts and the port.",
  localIndustries: [
    "Hospitals, clinics and pharmacies",
    "Hotel, restaurant and catering kitchens",
    "Port-side warehousing",
    "Markets and food retail",
  ],
  citiesServed: ["Manama", "Juffair", "Adliya"],
  supportNote:
    "Enquiries from the Capital Governorate are handled through the enquiry form, Call or WhatsApp. Say which district, which rooms and how they are cooled, and our reply sets out what seems suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Capital Governorate?",
      answer:
        "Manama, Juffair and Adliya have city pages. Bahrain Financial Harbour, Seef District and Mina Salman Port have area pages under Manama. A district not listed here can still be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does hot, humid air call for humidity records as well as temperature?",
      answer:
        "Moist sea air condenses on cold surfaces whenever a cooler is opened, and it softens cartons and spoils dry goods, so a humidity trend beside the temperature shows moisture that a thermometer alone would miss.",
    },
    {
      question: "What does a logger do when the power or WiFi drops?",
      answer:
        "It keeps recording on its own battery and stores the readings, so the hours of an outage are still on record when the site is connected again.",
    },
  ],
  listing: [
    { slug: "manama", text: "The island's capital on the north-east shore, with towers, covered markets, hotels, hospitals and a port, in long, hot, humid summers." },
    { slug: "juffair", text: "A district of tall apartment blocks, serviced flats, cafes and neighbourhood shops on the south-east edge of the capital, facing the Gulf." },
    { slug: "adliya", text: "A central district of converted villas, cafe kitchens, bakeries and clinics on quiet streets, where older buildings meet modern cooling." },
  ],
  areaListing: [
    { slug: "bahrain-financial-harbour", text: "A waterfront district of glass towers on reclaimed ground, with offices, a mall, restaurants and hotel kitchens beside the sea." },
    { slug: "seef-district", text: "A commercial district of malls, hotels, offices and food courts along the northern coast road." },
    { slug: "mina-salman-port", text: "The commercial port south-east of the city, where food, supplies and general goods wait on quays and in sheds in hot, damp air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
