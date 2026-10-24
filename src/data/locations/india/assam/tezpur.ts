// /data-logger-tezpur | City | parent: Assam
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "tezpur",
  name: "Tezpur",
  type: "city",
  intro:
    "A logger in Tezpur is most often placed at food and beverage and laboratory sites around Tea estates and garden factories and University campus and laboratories. Tezpur is a town of the north bank of the Brahmaputra in Sonitpur district, among tea gardens and low hills, and a temperature data logger here serves a quieter city than Guwahati with its own gardens, campus and base. A central university stands on its campus at Napaam, a medical college and hospital serve the district, and tea estates around the town run factories through the plucking season. An air force station lies beside the airfield, and the Kolia Bhomora bridge joins the two banks of the river. Wholesale lanes supply the surrounding villages, and the river brings fish and farm produce. Prithvi supplies WiFi loggers for laboratories and rooms with a network and GSM loggers for lorries and garden stores.",
  climateAngle:
    "Rain is heavy for months, the air is humid in every season and the river floods the low ground, so tea, medicines and cartons take on moisture and power fails in storms. Gardens lie far from the town on poor roads, and a factory store can be reached only by a long, slow drive during the rains.",
  areas: [
    {
      name: "Tea estates and garden factories",
      note: "Estates around the town run factories that wither, roll and dry the leaf and store made tea in chests, in damp air that robs the leaf of aroma.",
    },
    {
      name: "University campus and laboratories",
      note: "Laboratories on the wide campus at Napaam hold samples, cultures and reagents in freezers and fridges that need their own limits.",
    },
    {
      name: "Medical college hospital and clinics",
      note: "A teaching hospital and clinics hold blood units, vaccines and medicines for the district, with refrigerators that depend on a power supply that storms interrupt.",
    },
    {
      name: "Town market and river trade",
      note: "Wholesalers of food, medicines and farm produce, and traders in fish and vegetables from the river, work in crowded lanes with chillers opened from early morning.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Tea factories, fish traders and sweet makers hold stock that spoils in heavy air or heat, and a record from each room shows the day a chiller or a store began to slip.",
    },
    {
      slug: "laboratories",
      sentence:
        "University laboratories keep samples and reagents with their own limits, and an exported log supports a research file or an inspection.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A medical college hospital and clinics hold blood and vaccines for the district, and an alert on a phone means a failing refrigerator is found at night.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Trucks cross the bridge toward Guwahati and the hills, and a logger placed with a consignment records how long it stood at a halt in the heat and damp.",
    },
  ],
  recommendedSeries: [
    {
      slug: "setu",
      reason:
        "One probe on a short lead is enough for a campus freezer or a clinic refrigerator in Tezpur, and the log builds up with nobody having to attend it.",
    },
    {
      slug: "nakshatra",
      reason:
        "Humidity and temperature at one point suit a tea store or a godown, where heavy air is the main danger to stock.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger rides in a lorry or reports from a garden store with no router, and sends an alert to a phone.",
    },
  ],
  faqs: [
    {
      question: "Can a university laboratory in Tezpur export a log for a project review?",
      answer:
        "Yes. A report on any freezer, fridge or room, for any dates, can be exported in PDF, Excel or CSV form and added to the project file of a research group.",
    },
    {
      question: "Do you visit tea gardens outside the town to fit a temperature data logger?",
      answer:
        "Give us the garden, the factory and a name to ask for by the enquiry form, WhatsApp or a call, and we propose a day. Gardens in the same direction are grouped on one trip.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can Tezpur and Guwahati sites be watched on one dashboard?",
      answer:
        "Both cities can sit on one account, each site with its own alert contacts, so a manager reads the two towns from a single list and pulls a report for whichever dates are needed.",
    },
    {
      question: "Can calibration for a Tezpur hospital be arranged?",
      answer:
        "VEGA Calibrations, our parent company, can calibrate loggers and probes, and the work can be booked with the supply.",
    },
  ],
  nearby: [
    { slug: "guwahati", name: "Guwahati" },
    { slug: "dibrugarh", name: "Dibrugarh" },
  ],
  metaTitle: "Temperature Data Loggers in Tezpur | Prithvi",
  metaDescription:
    "Tezpur, Assam: temperature and humidity data loggers for tea factories, university laboratories, the hospital and river-trade market. Get Solution: Tezpur.",
  indexable: true,
};

export default city;
