// /data-logger-ras-al-khair | City | parent: Eastern Province
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "ras-al-khair",
  name: "Ras Al Khair",
  type: "city",
  intro:
    "A logger in Ras Al Khair mostly serves chemical sites, as well as logistics and warehousing sites. Ras Al Khair is an industrial city on the Gulf coast north of Jubail, built around mining, metals and water, and a temperature data logger here serves plant stores and camps in a place with very little else. A large aluminium smelter and rolling mill, phosphate fertiliser plants and a big desalination and power complex stand on the shore, and minerals from the north arrive by a dedicated railway for processing and export through a port. Contractor camps, canteens and clinics feed and treat the workforce. Everything stored here arrived by rail, road or sea, and dust, salt and heat attack every store. Prithvi supplies WiFi loggers from India for plant stores, camp canteens and clinics and configures alerts and access with the site team over video.",
  climateAngle:
    "The shore is hot and humid in summer, salt in the air and fine mineral dust attack equipment, and sudden dust storms can stop work, so stores of spares, chemicals and food must be watched through heat and outages. The site is remote from any town, so supplies, food and medicines are held in larger quantities than in a city, which raises the loss from a failed cooler.",
  areas: [
    {
      name: "Smelter and rolling-mill stores",
      note: "Plant stores hold spares, instruments, electrical panels and consumables on very large campuses, with rooms far from any office and strict rules for access.",
    },
    {
      name: "Phosphate and fertiliser plant stores",
      note: "Bags, drums and laboratory reagents are held in sheds exposed to heat, dust and salt, and a failed ventilation system can go unnoticed for days.",
    },
    {
      name: "Port and rail terminal yards",
      note: "Minerals and products move between rail and ship through terminal yards and warehouses, where goods wait in sun and salty air.",
    },
    {
      name: "Camps, canteens and clinics",
      note: "Camp kitchens feed large workforces from walk-in coolers and freezers, and clinics hold medicines and vaccines in refrigerators that cannot be allowed to warm.",
    },
  ],
  industries: [
    {
      slug: "chemical",
      sentence:
        "Fertiliser and metals plants keep bags, drums and reagents with printed storage limits, and an alert from a hot store lets the storekeeper act before material is spoiled.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Rail and port terminals hold goods between a train and a vessel, and a logger placed in a consignment records the heat and dust it met on the way.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Camp caterers cook for large populations from cold rooms and freezers, and a record from each room shows when one began to fail.",
    },
    {
      slug: "laboratories",
      sentence:
        "Plant laboratories keep samples and reagents in fridges and cabinets with their own limits, and an exported log supports an audit.",
    },
  ],
  recommendedSeries: [
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a very long plant warehouse across racks and bays, so one report shows which corner runs hottest under the roof.",
    },
    {
      slug: "dhruva",
      reason:
        "Four channels follow a camp food store at several heights and at the door, showing how the room behaves through the day.",
    },
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a chemical store near the coast, where salty damp air is the danger.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Ras Al Khair, can stores with strict access rules at Ras Al Khair be covered?",
      answer:
        "Set-up is remote, so your own staff fit the loggers following our guidance, and access to the dashboard can be limited so each user sees only the rooms they are responsible for.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does mineral dust change where a logger is placed?",
      answer:
        "Dust coats vents and probe tips, so we keep the body in the cleanest air available, leave probes sealed and recommend a wipe when the room is cleaned.",
    },
    {
      question: "Can a camp operator give each client a record of its own kitchen?",
      answer:
        "Each kitchen or store can be its own point on the dashboard with separate alert contacts, and a report for it can be exported when the client asks.",
    },
    {
      question: "Is calibration available for plant laboratories at Ras Al Khair?",
      answer:
        "VEGA Calibrations, our parent company, can calibrate loggers and probes, and we explain the options once we know the model and the range you use.",
    },
  ],
  nearby: [
    { slug: "jubail", name: "Jubail" },
    { slug: "dammam", name: "Dammam" },
  ],
  metaTitle: "Temperature Data Loggers in Ras Al Khair | Prithvi",
  metaDescription:
    "Ras Al Khair: WiFi temperature data loggers for plant stores, port and rail yards, camp canteens and clinics, set up remotely. Get Solution: Ras Al Khair.",
  indexable: true,
};

export default city;
