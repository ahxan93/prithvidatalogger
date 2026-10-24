// /data-logger-jahra-governorate | State hub | parent: Kuwait
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "jahra-governorate",
  name: "Jahra Governorate",
  type: "state",
  intro:
    "A logger in Jahra Governorate mostly serves farms, livestock and animal feed, as well as industrial and warehouse storage. Jahra Governorate covers a wide stretch of western Kuwait beyond the head of the bay, a flat country of farms, livestock yards, trading yards, industrial districts and housing that spreads out along the main roads. Jahra is the main town, with a large hospital, markets and farms at its edge, while Sulaibiya is a sprawling district of warehouses, workshops, yards and housing, and the Amghara Industrial Area lies near Jahra with workshops and trading yards. Summers are blazing and dry, winters mild and cool at night, and dust storms are frequent. Food, animal feed, medicines and building materials wait in sheds and warehouses in such heat. The pages below cover the two towns and the two industrial areas.",
  localIndustries: [
    "Farms, livestock and animal feed",
    "Industrial and warehouse storage",
    "Clinics, hospitals and pharmacies",
    "Trading yards and workshops",
  ],
  citiesServed: ["Jahra","Sulaibiya"],
  supportNote:
    "Enquiries from Jahra Governorate are handled through the enquiry form, Call or WhatsApp. State the town, the rooms and how they are cooled, and we come back with what looks workable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Jahra Governorate?",
      answer:
        "Jahra and Sulaibiya each have a city page. Sulaibiya Industrial Area has an area page under Sulaibiya, and Amghara Industrial Area has one under Jahra. A place elsewhere in the west can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do big yards and warehouses suit multi-point loggers?",
      answer:
        "A wide shed is warmest under the roof and coolest near the doors and the floor, so probes at several heights and positions show where stock really sits in the heat.",
    },
    {
      question: "Does flying dust matter for a logger on a farm or in a yard?",
      answer:
        "Dust settles on anything left open, so a logger is fixed on a shaded inner wall away from vents and doors, with a battery that keeps the record going through a power cut.",
    },
  ],
  listing: [
    { slug: "jahra", text: "A large western town beyond the head of the bay, with a big hospital, markets, farms and livestock yards, in blazing dry heat and dust." },
    { slug: "sulaibiya", text: "A sprawling district of warehouses, workshops, yards and housing on the flat western plain, in blazing dry heat." },
  ],
  areaListing: [
    { slug: "sulaibiya-industrial-area", text: "An industrial area in Sulaibiya, with workshops, warehouses, light factories and yards on flat open ground." },
    { slug: "amghara-industrial-area", text: "An industrial and trading area near Jahra, with workshops, parts yards and warehouses along wide roads." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
