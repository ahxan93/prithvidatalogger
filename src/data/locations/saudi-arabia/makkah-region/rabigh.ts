// /data-logger-rabigh | City | parent: Makkah Region
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "rabigh",
  name: "Rabigh",
  type: "city",
  intro:
    "A logger in Rabigh mostly serves chemical sites, as well as food and beverage sites. Rabigh is a coastal town on the Red Sea north of Jeddah, and a temperature data logger here serves a district of heavy industry, power and farming. A large refinery and petrochemical complex stands on the shore, with a power and desalination plant nearby, and a port handles cargo for the industrial zone. Date palms and vegetable fields grow along the wadi inland, and fishing boats work the coast. The newer planned city of King Abdullah Economic City lies a short way to the north. Workers and contractors depend on canteens, clinics and warehouses, and goods come from Jeddah by road. Prithvi sends WiFi loggers from India, registers them to a dashboard you control and walks your team through alert rules over a call.",
  climateAngle:
    "The coast is hot and heavy with moisture for most of the year, salt in the air attacks metal and packaging, and dust blows in from the desert, so stores of spares, chemicals and food all work against the climate.",
  areas: [
    {
      name: "Refinery and petrochemical complex stores",
      note: "Plant stores hold spares, instruments, laboratory reagents and drummed material on wide campuses, with rooms far from any office and strict rules for access.",
    },
    {
      name: "Contractor camps, canteens and clinics",
      note: "Large workforces are fed from canteen kitchens with walk-in coolers and freezers, and clinics hold medicines and vaccines in refrigerators that cannot be allowed to warm.",
    },
    {
      name: "Port and industrial-zone warehouses",
      note: "Warehouses near the port hold packed goods and industrial supplies that wait for a vessel or a truck, in salty, humid air.",
    },
    {
      name: "Date farms and fishing landings",
      note: "Growers along the wadi store dates and vegetables in small cold rooms, and boats land fish for ice rooms and cold stores on the coast.",
    },
  ],
  industries: [
    {
      slug: "chemical",
      sentence:
        "Refinery and petrochemical stores keep drums, bags and reagents with printed storage limits, and an alert from a hot store room lets the storekeeper act before the limit is crossed.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Canteens, caterers and fish and date businesses hold stock that spoils in coastal heat, and a record from each room shows when one began to fail during a power interruption.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Clinics and hospitals serving the workforce and the town hold vaccines and medicines in refrigerators that need a steady record, and an alert on a phone reaches the right person.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Goods reach the coast by sea and by road from Jeddah, and a logger placed among them records the heat and salty damp they met in a yard or a vehicle.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Reads humidity along with temperature at one point, which tells a plant store or a port shed when salty damp has overcome a dehumidifier or a door seal.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a large warehouse or a plant store across bays and heights, so one report shows where heat and moisture gather.",
    },
    {
      slug: "dhruva",
      reason:
        "Four channels watch a canteen store or a clinic pharmacy at several heights and at the door, which shows how a busy room behaves between loadings.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Rabigh, how does salty air affect where a logger is fitted at Rabigh?",
      answer:
        "We keep the logger body indoors, clear of spray and wet walls, let only the probe lead enter the cold room and recommend a wipe of the probe whenever the room is cleaned.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a Rabigh plant or camp get its loggers from India and go live?",
      answer:
        "The loggers are sent from India and registered to your dashboard before set-up, and a call or video session settles the rooms, limits and alert recipients. A WiFi logger needs a router in range of its room.",
    },
    {
      question: "Can plant stores with strict access rules be covered?",
      answer:
        "Set-up is remote, so the loggers are fitted by your own staff following our guidance, and access to the dashboard can be limited so each user sees only the rooms they are responsible for.",
    },
    {
      question: "Is calibration available for plant laboratories at Rabigh?",
      answer:
        "VEGA Calibrations, our parent company, can calibrate loggers and probes for refinery and camp laboratories; share the model and the range and we confirm the options.",
    },
  ],
  nearby: [
    { slug: "king-abdullah-economic-city", name: "King Abdullah Economic City" },
    { slug: "jeddah", name: "Jeddah" },
  ],
  metaTitle: "Temperature Data Loggers in Rabigh | Prithvi",
  metaDescription:
    "Rabigh: WiFi temperature data loggers for refinery stores, camp canteens, clinics and port warehouses, set up remotely. Get Solution to begin in Rabigh.",
  indexable: true,
};

export default city;
