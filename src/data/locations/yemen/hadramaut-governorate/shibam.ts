// /data-logger-shibam | City | parent: Hadramaut Governorate
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "shibam",
  name: "Shibam",
  type: "city",
  intro:
    "A logger in Shibam is arranged case by case, whether for food and beverage or laboratory sites. Shibam is a walled town in the Wadi Hadramaut, famous for its tall mud-brick tower houses, some of them five to eight storeys high, and a World Heritage site, and a temperature data logger here serves a small place where heritage, hospitality and farming meet. Palm gardens surround the walls, guesthouses and small restaurants serve visitors, and families store dates, honey and household goods in the lower rooms of their towers. Conservation of the buildings depends on keeping damp out of mud brick, and any archive, workshop or collection in the town needs steady air. Summers are very hot, winters mild, and rare rain can bring floods. Prithvi loggers store readings on their batteries without a network. We review any request from Shibam case by case.",
  climateAngle:
    "The air is very dry and hot for most of the year, but flash floods and rare heavy rain bring sudden damp to thick mud-brick walls, so stores and heritage rooms feel dryness and moisture in sharp swings. Visitors arrive in the cooler months, when guesthouse kitchens are busiest, and a failed refrigerator can go unnoticed in a quiet corner of an old building.",
  areas: [
    {
      name: "Tower houses and family stores",
      note: "Families keep dates, honey, grain and household goods in the lower rooms of tall mud-brick houses, which stay cooler than the street but can take on damp after rain.",
    },
    {
      name: "Guesthouses and small restaurants",
      note: "Visitor accommodation and restaurants run small kitchens, refrigerators and dry stores in old buildings where space and power are limited.",
    },
    {
      name: "Conservation workshops and archive rooms",
      note: "Rooms used for building conservation, documents and collections need steady temperature and humidity, because swings crack plaster and curl paper.",
    },
    {
      name: "Palm gardens outside the walls",
      note: "Growers outside the walls store dates and garden produce in shaded sheds, where the heat after harvest is the main danger.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Guesthouses, small restaurants and date and honey sellers hold food that spoils in heat, and a record from each refrigerator or store shows when a unit began to drift.",
    },
    {
      slug: "laboratories",
      sentence:
        "Conservation and research rooms keep materials, samples and documents to set limits of temperature and humidity, and an exported log supports a conservation plan.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Supplies reach the town over long roads, and a logger placed in a load shows how long goods stood in a vehicle in the sun before they reached a small store.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A clinic serving the town and its villages holds vaccines and medicines in a refrigerator that needs a steady record through power interruptions.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Reading humidity beside temperature, one unit watches an archive or conservation room where dryness and damp are the real dangers.",
    },
    {
      slug: "setu",
      reason:
        "A single probe fits a guesthouse refrigerator or a clinic fridge and leaves the way staff use the unit unchanged.",
    },
    {
      slug: "dhruva",
      reason:
        "Four channels follow a family store or a guesthouse pantry at several heights and by the door, showing how it behaves through the day.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Shibam, why would a heritage room in Shibam need a humidity record?",
      answer:
        "Plaster, paper and textiles react to dryness and damp, so a log of temperature and humidity shows whether the air stayed steady and when it swung, which supports a conservation plan.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a small guesthouse use a single logger?",
      answer:
        "Yes. A single logger with a phone alert is enough for one refrigerator if the room is within reach of a router, and further points can join the same account when needed.",
    },
    {
      question: "How would a Shibam request be handled?",
      answer:
        "Tell us the place, what you keep and who to contact, using the enquiry form or WhatsApp; Yemen requests are looked at case by case and we reply with what is practical.",
    },
    {
      question: "Is calibration discussed for loggers used in conservation rooms?",
      answer:
        "Calibration of loggers and probes is handled by our parent company, VEGA Calibrations; share the model and the range and we explain what could be considered.",
    },
  ],
  nearby: [
    { slug: "seiyun", name: "Seiyun" },
    { slug: "mukalla", name: "Mukalla" },
  ],
  metaTitle: "Temperature Data Loggers in Shibam | Prithvi",
  metaDescription:
    "Shibam: temperature data loggers for heritage rooms, guesthouse kitchens and date stores in Wadi Hadramaut, reviewed case by case. Get Solution for Shibam.",
  indexable: true,
};

export default city;
