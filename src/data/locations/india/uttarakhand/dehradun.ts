// /data-logger-dehradun | City | parent: Uttarakhand
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "dehradun",
  name: "Dehradun",
  type: "city",
  intro:
    "A logger in Dehradun is most often placed at pharmaceutical and hospital and blood bank sites around Selaqui industrial area and Sahaspur industrial area. Dehradun is the capital of Uttarakhand, set in the Doon valley between the Shivalik foothills and the Himalaya, and a temperature data logger here serves a city of institutions, hospitals, hotels and growing industry. Research institutes, a military academy, a university and many schools fill the leafy neighbourhoods and give the capital a quiet, orderly feel, while Paltan Bazaar and the streets around the clock tower hold the wholesale trade. Industrial areas at Selaqui and Sahaspur, on the plain beyond the town, hold pharmaceutical, food and technology firms. Hospitals draw patients from the hills, and hotels and restaurants serve visitors bound for Mussoorie and Rishikesh. Prithvi supplies WiFi loggers for rooms and wards with a network and GSM loggers for vehicles and hill stores.",
  climateAngle:
    "The valley is mild in the shoulder months, summers are warm and the monsoon is exceptionally heavy, while winter nights are cold, so stores meet damp for weeks and a delivery to a hill town can pass from warm to near freezing in a single day.",
  areas: [
    {
      name: "Selaqui industrial area",
      note: "A planned estate on the western plain with pharmaceutical, food and technology firms on large plots, where stores and quality rooms are spread across wide campuses.",
    },
    {
      name: "Sahaspur industrial area",
      note: "An industrial belt toward the east with pharmaceutical and manufacturing firms and godowns, on roads that carry trucks to Haridwar and the hills.",
    },
    {
      name: "Paltan Bazaar and the clock tower",
      note: "Wholesalers of food, medicines and general goods work in crowded lanes, with chillers and stock rooms in old buildings opened all day.",
    },
    {
      name: "Rajpur Road and the hospital district",
      note: "Hotels, restaurants and clinics line the road toward the hills, and large hospitals hold blood units, vaccines and medicines for patients from the mountain districts.",
    },
  ],
  industries: [
    {
      slug: "pharmaceutical",
      sentence:
        "Plants at Selaqui and Sahaspur hold ingredients and finished packs in controlled rooms, and a dated record backs a quality head who must answer a customer audit.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Large hospitals receive patients from the mountain districts and hold blood and vaccines that must survive monsoon outages, and an alert to the duty staff covers the minutes between mains and generator.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Hotels, restaurants, bakeries and caterers run walk-in coolers through the tourist months, and a reading from each unit shows exactly when one failed during a busy evening.",
    },
    {
      slug: "laboratories",
      sentence:
        "Research institutes, a university and testing houses keep samples and reagents in fridges and cabinets with their own limits, and an exported log is ready for a project review.",
    },
  ],
  recommendedSeries: [
    {
      slug: "rajmudra",
      reason:
        "Two channels watch a pharmaceutical store or a hospital pharmacy at two points at once, one near the door and one deep inside.",
    },
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a hotel dry store or an instrument room, where the long monsoon brings damp that the dry months never do.",
    },
    {
      slug: "vayu",
      reason:
        "A SIM-based GSM logger rides in a vehicle climbing to a hill town and reports from stores where no Wi-Fi network exists.",
    },
  ],
  faqs: [
    {
      question: "Can a distributor show how a delivery fared on the climb to a hill town?",
      answer:
        "A GSM logger placed with the goods records readings along the road, and the owner can open the journey on a phone and export the record for the buyer.",
    },
    {
      question: "How does the long monsoon change where a logger is placed?",
      answer:
        "Damp collects on walls and floors, so we hang the logger away from wet surfaces and run only the probe cable into the cold or damp space, which keeps the record steady.",
    },
    {
      question: "Do you visit Selaqui and Sahaspur as well as the town to fit a temperature data logger?",
      answer:
        "Tell us the estate, the plant and a person to meet using the enquiry form, WhatsApp or a call, and we plan a day. The two estates lie in different directions, so we sequence them.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can calibration for a Dehradun hospital or laboratory be arranged?",
      answer:
        "Loggers and probes can be calibrated through VEGA Calibrations, our parent company, with the date fixed together with the supply order.",
    },
  ],
  nearby: [
    { slug: "haridwar", name: "Haridwar" },
    { slug: "roorkee", name: "Roorkee" },
    { slug: "paonta-sahib", name: "Paonta Sahib" },
  ],
  metaTitle: "Temperature Data Loggers in Dehradun | Prithvi",
  metaDescription:
    "Dehradun: temperature and humidity data loggers for Selaqui and Sahaspur plants, hospitals, hotels and institutes. Use Get Solution for Dehradun.",
  indexable: true,
};

export default city;
