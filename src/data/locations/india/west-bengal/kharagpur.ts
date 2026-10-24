// /data-logger-kharagpur | City | parent: West Bengal
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "kharagpur",
  name: "Kharagpur",
  type: "city",
  intro:
    "A logger in Kharagpur is most often placed at laboratory and food and beverage sites around Institute campus and laboratories and Railway workshops and the junction. Kharagpur is a railway and university town in the Paschim Medinipur district of West Bengal, and a temperature data logger here serves laboratories, rail stores and the trade of a large farming district. The first Indian Institute of Technology stands on a wide campus on the edge of the town, with research laboratories, workshops and hostels, while the railway junction, workshops and a large colony form the other half of the town. An air force station lies not far away at Kalaikunda. Rice and oilseed mills, wholesalers and small food makers supply the villages around, and hospitals serve the district. Prithvi supplies WiFi loggers for laboratories and rooms with a network and GSM loggers for vehicles, mills and remote stores.",
  climateAngle:
    "The plains are hot and humid for most of the year, the monsoon is heavy and cyclone rains can arrive in the post-monsoon weeks, so stored rice and rolled stock take on damp and laboratory equipment needs steady air.",
  areas: [
    {
      name: "Institute campus and laboratories",
      note: "Research laboratories, workshops and hostel kitchens spread over a wide campus hold samples, reagents and food in fridges and stores that need their own limits, and hostel kitchens cook for large numbers of students every day from walk-in coolers and dry stores.",
    },
    {
      name: "Railway workshops and the junction",
      note: "Workshops, stores and goods sheds around the junction hold electrical items, spares and supplies, and parcels wait on platforms and in wagons between trains.",
    },
    {
      name: "Rice and oilseed mills",
      note: "Mills around the town hull rice and press oilseed, with sacks and tins held in godowns where monsoon damp threatens stored grain.",
    },
    {
      name: "Town market and hospitals",
      note: "Wholesalers, sweet makers and chemists in the town centre keep stock in small rooms and fridges, with hospitals nearby holding blood, vaccines and medicines.",
    },
  ],
  industries: [
    {
      slug: "laboratories",
      sentence:
        "Research and teaching laboratories keep samples, standards and reagents in freezers, fridges and cabinets with their own limits, and an exported log is ready for a project audit or an inspector.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Rice millers, sweet makers and grocery wholesalers hold stock that spoils in damp heat, and an alert on a phone reaches the owner on a holiday when a chiller fails.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals and clinics serve patients from the town and the district, and a dated record backs each shift handover for vaccines and blood units.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Goods sheds and carriers at the junction move grain, food and medicine by rail and road, and a logger placed in a consignment records how long it stood in a wagon or a yard.",
    },
  ],
  recommendedSeries: [
    {
      slug: "setu",
      reason:
        "A single-point logger with an external probe fits a laboratory freezer or a clinic refrigerator and keeps a quiet, continuous record.",
    },
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a rice godown or an instrument store, where damp air in the monsoon is the danger.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels give a laboratory a paired record from one device, such as the top and bottom of a large cold room.",
    },
  ],
  faqs: [
    {
      question: "Can a research laboratory export a log for a project audit?",
      answer:
        "Yes. Reports for any freezer, fridge or room and any period can be exported as PDF, Excel or CSV, so a project coordinator can hand over a dated record on request.",
    },
    {
      question: "How does a temperature data logger help a rice miller near Kharagpur?",
      answer:
        "A record of humidity and temperature in the godown shows when damp began to reach the sacks, so the staff can cover, dry or move stock before it is damaged.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can sites across a large campus be watched on one dashboard?",
      answer:
        "Yes. Every laboratory and store is a point on one account, alerts go to the person responsible for each, and the head of a department sees all of them in a list.",
    },
    {
      question: "Who calibrates loggers used in a Kharagpur laboratory?",
      answer:
        "VEGA Calibrations, our parent company, can calibrate the loggers and probes, and the work can be planned together with the visit.",
    },
  ],
  nearby: [
    { slug: "howrah", name: "Howrah" },
    { slug: "haldia", name: "Haldia" },
    { slug: "kolkata", name: "Kolkata" },
  ],
  metaTitle: "Temperature Data Loggers in Kharagpur | Prithvi",
  metaDescription:
    "Kharagpur: temperature and humidity data loggers for campus laboratories, rail stores, rice mills and hospitals. Get Solution to cover Kharagpur.",
  indexable: true,
};

export default city;
