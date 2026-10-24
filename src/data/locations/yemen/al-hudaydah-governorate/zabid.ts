// /data-logger-zabid | City | parent: Al Hudaydah Governorate
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "zabid",
  name: "Zabid",
  type: "city",
  intro:
    "A logger in Zabid is arranged case by case, whether for food and beverage or laboratory sites. Zabid is a historic town on the Tihama plain of western Yemen, a World Heritage site known for its old mosques, its houses of brick and its long record as a centre of Islamic learning, and a temperature data logger here serves a small, hot, humid town where heritage, farming and trade overlap. Date palms and farm plots surround the old quarter, markets sell food and household goods to nearby villages, and clinics serve the district. Many buildings are old and thick-walled, and collections and libraries in them need steady air. Summers are very hot and the air is moist. The loggers keep readings in memory on battery power without a network. We consider each request from Zabid case by case.",
  climateAngle:
    "Heat and moisture are both high for most of the year, rain is seasonal and sometimes heavy, and old walls hold damp, so heritage rooms and food stores feel slow, sticky swings rather than sharp ones. Because the old town is compact and its lanes are narrow, vehicles rarely reach the door of a store, and goods are carried the last stretch by hand or cart in the sun. Visitors and scholars arrive in the cooler months, and guesthouse kitchens add to the list of small refrigerators worth watching.",
  areas: [
    {
      name: "Old mosques, libraries and manuscript rooms",
      note: "Historic buildings hold books and manuscripts in rooms of thick masonry, where steady humidity matters more than cold because paper and ink react to damp.",
    },
    {
      name: "The town market and food stores",
      note: "Shops and stalls sell grain, dates, oil and household goods from small rooms in old buildings that heat up in the afternoon.",
    },
    {
      name: "Palm plots and produce sheds",
      note: "Growers store dates and vegetables in sheds close to the palms, where heat after harvest is the main danger to the crop.",
    },
    {
      name: "Clinic and pharmacy refrigerators",
      note: "A clinic and pharmacies serve the town and its villages and keep vaccines and medicines in refrigerators that must hold their range in hot, moist weather.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Date growers, grain dealers and grocers in Zabid hold goods that suffer in heat and damp, and a log from each store shows a buyer how a lot was kept.",
    },
    {
      slug: "laboratories",
      sentence:
        "Conservation and study rooms in Zabid keep manuscripts and materials to set limits of temperature and humidity, and an exported report supports a conservation plan.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "The Zabid clinic holds vaccines for the town and its villages, and a phone alert reaches the right person if its refrigerator warms.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Goods reach Zabid over long, hot roads, and a logger placed in a load shows how long it stood in a vehicle before arriving at a small store.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a manuscript room or a date store where damp is the quiet danger.",
    },
    {
      slug: "setu",
      reason:
        "A single probe fits a clinic or shop refrigerator in Zabid and leaves the way the unit is used unchanged.",
    },
    {
      slug: "dhruva",
      reason:
        "Four channels follow a produce shed at several heights and by the door, showing which shelf runs warmest during the day.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Zabid, why would a library or study room in Zabid need a humidity record?",
      answer:
        "Paper, ink and bindings react to damp, so a log of temperature and humidity shows whether the air stayed steady and when it swung, which helps a conservation plan.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a small Zabid shop use a single logger?",
      answer:
        "Yes. One logger with a phone alert covers a single refrigerator if a router is within reach, and further points can join the same account when needed.",
    },
    {
      question: "How would a request from Zabid be handled?",
      answer:
        "Tell us the place, what you keep and a contact through the enquiry form or WhatsApp. Yemen requests are judged case by case, and we reply with what seems practical.",
    },
    {
      question: "Is calibration discussed for Zabid loggers?",
      answer:
        "For Zabid sites, VEGA Calibrations, our parent company, looks after calibration of loggers and probes; send the model and your working range and we explain what could be done.",
    },
  ],
  nearby: [
    { slug: "hodeidah", name: "Hodeidah" },
    { slug: "bajil", name: "Bajil" },
  ],
  metaTitle: "Temperature Data Loggers in Zabid | Prithvi",
  metaDescription:
    "Zabid: temperature data loggers for heritage rooms, date stores, markets and clinic refrigerators, reviewed case by case. Get Solution to begin in Zabid.",
  indexable: true,
};

export default city;
