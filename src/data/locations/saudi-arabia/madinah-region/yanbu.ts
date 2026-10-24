// /data-logger-yanbu | City | parent: Madinah Region
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "yanbu",
  name: "Yanbu",
  type: "city",
  intro:
    "A logger in Yanbu mostly serves food and beverage sites, as well as logistics and warehousing sites. Yanbu is the Red Sea port of the Madinah Region, a coastal town of two old centres beside a large industrial city, and a temperature data logger here serves the harbour, the town and the workforce that lives around them. Boats still fish from the old waterfront, divers and holidaymakers fill hotels along a coral shore, and a commercial port and an industrial port handle cargo for the plants inland. Hospitals and clinics serve a large population of workers and families, supermarkets and canteens feed them, and warehouses hold supplies brought from Jeddah by road. The coast is hot and humid with salt in the air. Prithvi supplies WiFi loggers from India, registers them to a dashboard you control and walks your team through alert rules over a call.",
  climateAngle:
    "The Red Sea coast is hot and heavy with moisture for most of the year, salt corrodes metal and packaging, and sudden dust and sea fog can interrupt journeys and cooling alike.",
  areas: [
    {
      name: "Old waterfront, fishing landings and ice rooms",
      note: "Boats land fish at the old harbour towns, where ice rooms and cold stores hold the catch for markets in warm, salty air.",
    },
    {
      name: "Hotels, resorts and dive centres",
      note: "Coastal hotels and dive centres run kitchens, bar fridges and walk-in coolers in buildings that face the sun and the sea air.",
    },
    {
      name: "Hospitals, clinics and supermarkets",
      note: "Hospitals and clinics hold vaccines and medicines in refrigerators, while supermarkets and wholesalers stock chilled food for a workforce of families and contractors.",
    },
    {
      name: "Commercial and industrial port warehouses",
      note: "Warehouses near the ports hold imported goods and packed products between a vessel and a truck, in humid air that soaks cartons.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Fish traders, hotel kitchens, supermarkets and caterers hold stock that spoils in coastal heat, and a record from each cold room shows when one began to fail during a power interruption.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Port warehouses and carriers hold goods for several clients, and a reading for each bay lets an operator send a client a report for its own pallets.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals and clinics hold vaccines and blood products for a large resident population, and an alert on a phone reaches the right person if a unit warms.",
    },
    {
      slug: "chemical",
      sentence:
        "Suppliers to the industrial city keep drums, coatings and consumables with limits printed on the label, and an alert from a hot store room lets the storekeeper act in time.",
    },
  ],
  recommendedSeries: [
    {
      slug: "dhruva",
      reason:
        "Four channels watch a canteen store or a supermarket stock room at several heights and by the door, showing how a busy room behaves between deliveries.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels spread over a long port warehouse give one report for each bay and shelf level, showing which corner holds the heat and damp.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels let a fish room be read near the door and at the back wall, showing whether the cold reaches the far shelves.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Yanbu, how does salt in the air change where a logger is placed at Yanbu?",
      answer:
        "The body is mounted indoors, clear of spray and wet walls, with only the probe lead entering the cold room, and the probe is wiped whenever the room is cleaned.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a Yanbu business get started with loggers supplied from India?",
      answer:
        "After the loggers arrive they are registered to your dashboard, and a phone or video session sets the rooms, the limits and the people who receive alerts. Each room should be within reach of a router.",
    },
    {
      question: "Can a fish trader show a buyer how a catch was held?",
      answer:
        "A logger in the ice room and the cold store records the chain, and a report for the dates of one lot can be exported in PDF, Excel or CSV form.",
    },
    {
      question: "Can calibration for loggers at Yanbu be arranged?",
      answer:
        "VEGA Calibrations, our parent company, can calibrate loggers and probes; send the model and the range you use and we confirm what can be arranged.",
    },
  ],
  nearby: [
    { slug: "madinah", name: "Madinah" },
    { slug: "rabigh", name: "Rabigh" },
    { slug: "jeddah", name: "Jeddah" },
  ],
  metaTitle: "Temperature Data Loggers in Yanbu | Prithvi",
  metaDescription:
    "Yanbu: WiFi temperature data loggers for fish ice rooms, hotel kitchens, clinics and port warehouses, set up from India. Get Solution to begin in Yanbu.",
  indexable: true,
};

export default city;
