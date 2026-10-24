// /data-logger-vadodara | City | parent: Gujarat
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "vadodara",
  name: "Vadodara",
  type: "city",
  intro:
    "Vadodara, called Baroda by many and once the seat of the Gaekwad rulers, is an industrial city on the Vishwamitri river and on the main Mumbai–Ahmedabad railway and highway. Its estates ring the city: Makarpura on the southern side, Waghodia on the road towards Halol, Savli to the north-east, Nandesari beyond the city, and the refinery and fertiliser works near Koyali. Pharmaceutical makers, power and process equipment builders, chemical plants and dairies share them, while the university and its hospitals add laboratories and blood banks. A temperature data logger in Vadodara can therefore serve a bulk drug store, a switchgear warehouse and a hospital fridge in the same week. Summers are hot, the monsoon is heavy and the river has flooded the city, so a record that survives an outage matters.",
  climateAngle:
    "Summers are hot and dry, the monsoon is heavy, and the Vishwamitri has overflowed into low parts of the city in wet years, so ground-floor stores meet both damp and interrupted power in the same season.",
  areas: [
    {
      name: "Makarpura",
      note: "An older estate on the southern side of the city, with engineering, pharmaceutical and electrical units on compact plots among housing and busy roads.",
    },
    {
      name: "Waghodia",
      note: "An estate on the road towards Halol with engineering, chemical and plastics plants on larger plots, so stores often stand far from the control room.",
    },
    {
      name: "Savli",
      note: "A newer estate to the north-east where heavy engineering and equipment plants occupy wide plots, with long walks between the warehouse and the shop floor.",
    },
    {
      name: "Nandesari",
      note: "A chemical and intermediate estate outside the city, where solvents, reagents and finished products are held in stores that need stated limits.",
    },
    {
      name: "Koyali",
      note: "The refinery and fertiliser belt on the north-western side, with large tanks, laboratories and spare-parts stores serving continuous process plants.",
    },
  ],
  industries: [
    {
      slug: "pharmaceutical",
      sentence:
        "Bulk drug and formulation units hold materials in stores with written limits through a hot summer, and an alert to the stores head matters most when a standby generator fails to start.",
    },
    {
      slug: "chemical",
      sentence:
        "Chemical makers at Nandesari and Koyali store reagents and intermediates in rooms where a dated record shows how a store behaved on the hottest afternoon of the year.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A large government hospital, a medical college and many private hospitals keep blood banks and vaccine fridges, with alarms that must reach the duty staff in the small hours.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Dairies and food processors in the estates hold milk products and packed goods that spoil quickly if a chiller drifts, and a reading every few minutes shows when it began.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Reads humidity along with temperature, which matters in an electrical equipment store or a pharmaceutical warehouse through the damp weeks of the monsoon.",
    },
    {
      slug: "veer",
      reason:
        "Ten channels cover a long Savli or Waghodia warehouse from dock to far wall, so a single report shows where heat collects under the roof.",
    },
    {
      slug: "setu",
      reason:
        "A single-point logger with an optional external probe suits a hospital vaccine fridge or a laboratory cabinet and is simple for ward staff to read.",
    },
  ],
  faqs: [
    {
      question: "Do you supply a temperature data logger in Baroda as well as Vadodara?",
      answer:
        "Yes. Baroda is the older name of Vadodara, and we supply both in the same way; just tell us the estate and what you store.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can plants at Makarpura, Waghodia and Savli be watched together?",
      answer:
        "Yes. Each plant is its own entry on the dashboard with alerts for the people who run it, and a head of quality can open every plant in one list and compare their records.",
    },
    {
      question: "What should we do about stores that might flood?",
      answer:
        "Mount loggers and their sockets above the likely water level and keep probe cables out of drains. A GSM model keeps reporting even if the WiFi is down, so an alert still reaches a phone.",
    },
    {
      question: "Can calibration be arranged for loggers used in a Vadodara plant?",
      answer:
        "VEGA Calibrations, our parent company, calibrates loggers and probes and can map larger stores. Send the model and the range you work to, and we explain how it is arranged for your estate.",
    },
  ],
  nearby: [
    { slug: "ahmedabad", name: "Ahmedabad" },
    { slug: "bharuch", name: "Bharuch" },
    { slug: "halol-panchmahal", name: "Halol-Panchmahal" },
    { slug: "surat", name: "Surat" },
  ],
  metaTitle: "Temperature Data Loggers in Vadodara | Prithvi",
  metaDescription:
    "Vadodara, Gujarat: temperature data loggers for Makarpura, Waghodia and Savli plants, hospitals and dairies. Get Solution to cover Vadodara.",
  indexable: true,
};

export default city;
