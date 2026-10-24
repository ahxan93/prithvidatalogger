// /data-logger-korba | City | parent: Chhattisgarh
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "korba",
  name: "Korba",
  type: "city",
  intro:
    "A logger in Korba is most often placed at electronics and chemical sites around Coal mines and mine-side stores and Thermal power station stores. Korba is the coal and power city of Chhattisgarh, on the Hasdeo river, and a temperature data logger here serves a district of open-cast mines, thermal stations and smelters. Large open-cast coal mines at Gevra, Dipka and Kusmunda feed the power stations, an aluminium smelter and its township stand at Balco Nagar, and a fertiliser, cement and engineering supply trade has grown around them. Dust from the mines coats every surface, coal trains leave the sidings day and night, and storage in the stores of the plants is on a large scale. The town of Korba and neighbouring Katghora hold the markets, hospitals and schools. Prithvi supplies WiFi loggers for plant stores and wards with a network and GSM loggers for lorries, mine-side sheds and yards.",
  climateAngle:
    "Summers are fierce and thick with coal dust, the monsoon is heavy and turns the dust to mud, and winter mornings are cool, so electrical stores, laboratories and pharmacy fridges meet heat, damp and grit in turn. Fine dust gets into every cabinet and vent, and long outages in a storm can leave a pharmacy fridge warming unnoticed overnight.",
  areas: [
    {
      name: "Coal mines and mine-side stores",
      note: "Stores near the open-cast mines hold spares, instruments, tyres and electrical gear in sheds coated in dust, with rooms far from any office.",
    },
    {
      name: "Thermal power station stores",
      note: "Power stations along the Hasdeo keep laboratory reagents, instrument spares and control equipment on wide campuses, under strict gate rules.",
    },
    {
      name: "Balco Nagar and the smelter belt",
      note: "An aluminium smelter and its township hold raw material stores, laboratories and clinics, with canteens and medicine fridges that serve a large workforce.",
    },
    {
      name: "Korba and Katghora markets and hospitals",
      note: "Wholesalers of food, medicines and hardware and the hospitals of the two towns hold stock in crowded rooms, with chillers and vaccine fridges running all day.",
    },
  ],
  industries: [
    {
      slug: "electronics",
      sentence:
        "Control rooms and electrical stores hold relays, boards and instruments that suffer in coal dust and damp, and a humidity trend shows when a store needs attention.",
    },
    {
      slug: "chemical",
      sentence:
        "Smelting, power and allied works keep drums, bags and reagents with printed storage limits, and an alert from a hot shed lets the storekeeper act before the limit is crossed.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Plant hospitals and town hospitals hold blood, vaccines and medicines for the workforce and the villages, and an alert on a phone means a failing refrigerator is found in the night.",
    },
    {
      slug: "laboratories",
      sentence:
        "Plant and coal-quality laboratories keep samples, standards and reagents in fridges and cabinets with their own limits, and an exported log is ready for an audit.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Humidity and temperature at one point suit an electrical store or an instrument room, where coal dust and monsoon damp are what harm the stock.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a long spares hall or a laboratory block across racks and rooms, so one report shows the whole building.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger with an external probe rides in a vehicle or reports from a mine-side shed where Wi-Fi does not reach.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Korba, how does coal dust change how a logger is fitted at Korba?",
      answer:
        "Dust coats open sensors and vents, so we place the logger body in the cleanest air available, keep probes sealed and suggest a wipe at routine cleaning, which keeps the readings true.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a plant with strict entry rules be covered?",
      answer:
        "Give us the gate rules and a name to ask for by the enquiry form, WhatsApp or a call. Tell us of any pass or safety induction, and the day is arranged around it.",
    },
    {
      question: "Can stores at Korba and Bilaspur be watched together?",
      answer:
        "Yes. Each site is a point on one account with its own alert contacts, and a manager sees the whole coal belt in a single list and exports a report for any period.",
    },
    {
      question: "Who calibrates loggers used in a Korba laboratory or hospital?",
      answer:
        "VEGA Calibrations, our parent company, calibrates loggers and probes for plant and hospital laboratories at Korba, and the date can be fixed with the order.",
    },
  ],
  nearby: [
    { slug: "bilaspur", name: "Bilaspur" },
    { slug: "raipur", name: "Raipur" },
  ],
  metaTitle: "Temperature Data Loggers in Korba | Prithvi",
  metaDescription:
    "Korba: temperature and humidity data loggers for coal-mine stores, power-station laboratories, hospitals and markets. Get Solution to cover Korba.",
  indexable: true,
};

export default city;
