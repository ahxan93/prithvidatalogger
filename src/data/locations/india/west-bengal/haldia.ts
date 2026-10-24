// /data-logger-haldia | City | parent: West Bengal
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "haldia",
  name: "Haldia",
  type: "city",
  intro:
    "A logger in Haldia is most often placed at chemical and food and beverage sites around Dock complex and jetties and Refinery and petrochemical estate. Haldia is a port and industrial town in the Purba Medinipur district, where the Haldi river meets the Hooghly, and a temperature data logger here serves a belt of docks, refineries and chemical works. A dock complex receives bulk cargo, an oil refinery and a petrochemical complex process crude and naphtha, fertiliser and edible-oil firms stand on the estates, and tanks and warehouses hold liquid and bagged cargo that waits for ships, barges and trucks. A planned township with hospitals and schools houses the workforce at Durgachak and the neighbourhoods around. Barges and ships move through the river channel, so cargo often changes hands between water and road. Prithvi supplies WiFi loggers for rooms with a network and GSM loggers for trucks, jetty stores and sheds beyond a router.",
  climateAngle:
    "The air is salty and humid for most of the year, the monsoon is heavy and cyclone season brings storms and power cuts, so metal rusts quickly and bagged cargo takes on damp while it waits for a vessel.",
  areas: [
    {
      name: "Dock complex and jetties",
      note: "Warehouses, sheds and tank farms near the berths hold bagged and packed cargo for days before a ship or a barge arrives, in salty air that attacks metal and packaging.",
    },
    {
      name: "Refinery and petrochemical estate",
      note: "Plants and their laboratories keep samples, reagents, spares and instruments in rooms on wide campuses, with stores that are far from any office.",
    },
    {
      name: "Fertiliser and edible-oil firms",
      note: "Firms on the estates store bagged fertiliser, oil in tins and drums, and packing material in sheds that heat under metal roofs and take damp in the rains.",
    },
    {
      name: "Durgachak and the township",
      note: "Hospitals, clinics, shops and canteens serve the workforce, with pharmacy fridges, kitchen coolers and server cupboards in small buildings.",
    },
  ],
  industries: [
    {
      slug: "chemical",
      sentence:
        "Chemical, petrochemical and fertiliser works hold drums, bags and reagents with printed storage limits, and an alert from a hot shed lets the storekeeper act before material is spoiled.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Edible-oil firms and food importers hold oils, packed goods and ingredients that suffer in salty heat, and a record of each store shows an overseas or local buyer how a lot was kept.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Port warehouses and carriers hold cargo while it waits for a vessel or a truck, and a logger placed among the cargo records the heat and damp it met on the dock.",
    },
    {
      slug: "laboratories",
      sentence:
        "Plant and testing laboratories keep samples and reagents in fridges and cabinets that each need their own limits, and an exported log is ready for an audit.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a port godown or a packing store, where salty damp air is what harms bagged and packed cargo.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a large dock warehouse or a plant store across bays and heights, so one report shows where heat and damp gather.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger rides in a truck or reports from a jetty store beyond any router, and sends an alert to a phone when a reading drifts.",
    },
  ],
  faqs: [
    {
      question: "How does salty air change where a logger is placed in Haldia?",
      answer:
        "We keep the logger body indoors and away from open doors and seaward walls where salt settles, with only the probe cable entering the cold or damp space, and suggest wiping probes at routine cleaning.",
    },
    {
      question: "Can a temperature data logger in Haldia record the conditions of cargo waiting for a vessel?",
      answer:
        "Yes. A logger placed among the cargo records temperature and humidity while it waits, and the report can be exported for the shipper or the buyer.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do you visit plants with strict safety rules?",
      answer:
        "Tell us the rules, passes and briefings in advance through the enquiry form, WhatsApp or a call, and we plan the visit around them and keep the equipment list short.",
    },
    {
      question: "Who calibrates loggers used in a Haldia plant laboratory?",
      answer:
        "VEGA Calibrations, our parent company, can calibrate the loggers and carry out temperature mapping, and the work can be planned together with the first visit.",
    },
  ],
  nearby: [
    { slug: "kharagpur", name: "Kharagpur" },
    { slug: "howrah", name: "Howrah" },
    { slug: "kolkata", name: "Kolkata" },
  ],
  metaTitle: "Temperature Data Loggers in Haldia | Prithvi",
  metaDescription:
    "Haldia: temperature and humidity data loggers for dock warehouses, chemical and fertiliser works and laboratories. Get Solution to begin in Haldia.",
  indexable: true,
};

export default city;
