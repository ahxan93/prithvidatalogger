// /data-logger-dhanbad | City | parent: Jharkhand
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "dhanbad",
  name: "Dhanbad",
  type: "city",
  intro:
    "A logger in Dhanbad is most often placed at electronics and hospital and blood bank sites around Jharia coalfield and mine-side stores and Bank More and Hirapur markets. Dhanbad is the coal city of eastern India, in the Jharia coalfield of Jharkhand, and a temperature data logger here serves a place where mining, railways and trade share the same dusty streets. Open-cast and underground mines surround the town, some of the underground seams having burned for decades, and dealers in mining equipment, spares and supplies fill the lanes of Bank More and Hirapur. A technical institute that began as the school of mines trains engineers, a medical college hospital serves the coalfield, and the railway division offices and junction link the town to Kolkata and Delhi. Prithvi supplies WiFi loggers for rooms and wards with a network and GSM loggers for vehicles, yards and stores near the mines.",
  climateAngle:
    "Summers are hot and thick with coal dust, the monsoon is heavy and turns dust to mud, and winter mornings are cold, so electrical stores, pharmacy fridges and food godowns meet dust, damp and chill in turn. Coal dust drifts into every room, and a storm that cuts the power can leave a pharmacy fridge warming unnoticed through the night.",
  areas: [
    {
      name: "Jharia coalfield and mine-side stores",
      note: "Stores near the collieries hold spares, instruments, electrical gear and consumables in dusty sheds, some of them on ground that is hot from the seams below.",
    },
    {
      name: "Bank More and Hirapur markets",
      note: "Wholesalers of food, medicines, hardware and mining supplies work in crowded lanes, with chillers and back rooms opened from early morning.",
    },
    {
      name: "Technical institute and medical college",
      note: "Laboratories at the institute and a medical college hospital hold samples, reagents, blood units and vaccines in fridges and freezers that serve the whole coalfield.",
    },
    {
      name: "Railway junction and goods sheds",
      note: "Parcels and bulk goods wait in sheds and wagons around the junction between trains and trucks, in dust and the afternoon sun.",
    },
  ],
  industries: [
    {
      slug: "electronics",
      sentence:
        "Suppliers of electrical and control gear for mines hold relays, cables and instruments that suffer in coal dust and monsoon damp, and a humidity trend shows when a store needs attention.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A medical college hospital and private hospitals serve miners and families across the coalfield, and an alert on a phone means a failing blood or vaccine refrigerator is found at night.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Wholesalers of food, dairy and sweets supply a large and busy population, and a record from each chiller shows when a unit failed during a power cut.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Coal moves out and supplies move in through the junction and the highways, and a logger placed in a consignment records how long it stood in a siding or a yard in the heat.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Humidity and temperature at one point suit an electrical store or a spares room, where dust and monsoon damp are what harm the stock.",
    },
    {
      slug: "dhruva",
      reason:
        "A logger with its own display lets a storekeeper read conditions on the round, while the dashboard keeps the complete record.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger with an external probe rides in a vehicle or reports from a store near the mines where no Wi-Fi network exists.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Dhanbad, how does coal dust change how a logger is fitted at Dhanbad?",
      answer:
        "Dust coats open sensors and vents, so the logger body goes in the cleanest air available, probes stay sealed, and a wipe at routine cleaning keeps the readings true.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a store on hot ground near the seams be monitored?",
      answer:
        "Yes. A probe records the air temperature in the shed, and an alert tells the storekeeper when the reading rises past the limit, which helps where the ground itself adds heat.",
    },
    {
      question: "Can Dhanbad and Asansol sites be watched together?",
      answer:
        "Each site is a point on one account with its own alert contacts, and a manager sees stores on both sides of the state line in a single list.",
    },
    {
      question: "Can calibration for a Dhanbad hospital or laboratory be arranged?",
      answer:
        "VEGA Calibrations, our parent company, handles calibration of loggers and probes, and the work can be planned alongside the supply.",
    },
  ],
  nearby: [
    { slug: "bokaro", name: "Bokaro" },
    { slug: "asansol", name: "Asansol" },
    { slug: "durgapur", name: "Durgapur" },
  ],
  metaTitle: "Temperature Data Loggers in Dhanbad | Prithvi",
  metaDescription:
    "Dhanbad: temperature and humidity data loggers for coal-belt stores, hospitals, laboratories and Bank More markets. Get Solution to begin in Dhanbad.",
  indexable: true,
};

export default city;
