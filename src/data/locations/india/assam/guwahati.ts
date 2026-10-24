// /data-logger-guwahati | City | parent: Assam
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "guwahati",
  name: "Guwahati",
  type: "city",
  intro:
    "A logger in Guwahati is most often placed at pharmaceutical and hospital and blood bank sites around Amingaon and Jalukbari and Noonmati and the refinery side. Guwahati is the gateway to the North East, a city of hills and the wide Brahmaputra that gathers goods, patients and travellers for seven states, and a temperature data logger here serves a distribution and healthcare hub. The Kamakhya temple draws pilgrims, a medical college, a national medical institute at Changsari and many private hospitals serve the whole region, and wholesalers at Fancy Bazar and Paltan Bazar send medicines, food and consumer goods up the hill roads. Industrial areas at Amingaon, Jalukbari, Noonmati and Changsari hold warehouses, a refinery, food and engineering firms. The headquarters of a railway zone and an international airport link the city to the rest of the country. Prithvi supplies WiFi loggers for wards and rooms with a network and GSM loggers for lorries and distant stores.",
  climateAngle:
    "Rain is very heavy for months, the air is humid in every season and low lanes flood, so medicines and cartons take on moisture while refrigerators work through frequent power cuts.",
  areas: [
    {
      name: "Amingaon and Jalukbari",
      note: "Freight yards, warehouses and distribution sheds on the north-western side receive goods by rail and road for the whole region, and stock waits in humid sheds before the long haul.",
    },
    {
      name: "Noonmati and the refinery side",
      note: "An industrial pocket around a refinery holds engineering, bottling and food firms and the godowns that serve them, in heavy air and frequent rain.",
    },
    {
      name: "Changsari",
      note: "A growing area to the west holds a national medical institute with its laboratories and wards, a dry port and warehouses beside the river road.",
    },
    {
      name: "Fancy Bazar, Paltan Bazar and Pan Bazar",
      note: "Wholesale lanes stock medicines, food and general goods for shops across the North East, in crowded buildings where back rooms are hot and damp.",
    },
  ],
  industries: [
    {
      slug: "pharmaceutical",
      sentence:
        "Distributors supply chemists and hospitals across seven states from the city, and a dated log answers a buyer who asks how a pack was held during a monsoon journey.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A medical college, a national institute and private hospitals receive patients from across the region, and an alert to the duty staff covers the minutes between a mains failure and the generator.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Tea packers, dairies, bakeries and caterers store stock that suffers in heavy air, and a record from each room shows the day moisture began to enter the cartons.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Carriers move goods by rail, road and river to the hills and valleys beyond, and a logger in the consignment records the heat and damp it met on the way.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Reads humidity along with temperature at one point, which is what a medicine godown or a tea store needs in air that is damp in every season.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels let a medicine godown be read near the door and near the back wall with one device on the wall, which shows whether the damp has reached the far shelves.",
    },
    {
      slug: "vayu",
      reason:
        "A SIM-based GSM logger rides in a lorry up the hill road and reports from stores where no Wi-Fi network exists.",
    },
  ],
  faqs: [
    {
      question: "Can a Guwahati distributor show how medicines fared on the road to the hills?",
      answer:
        "A GSM logger placed with the pack records readings along the road, and the owner can open the journey on a phone and export the record for the buyer.",
    },
    {
      question: "How does heavy rain change where a logger is placed?",
      answer:
        "Damp collects on walls and floors, so we hang the logger away from wet surfaces, mount it above a flood line where we can, and run only the probe cable into the cold space.",
    },
    {
      question: "Do you supply a temperature data logger in Amingaon, Noonmati and Changsari as well as the city?",
      answer:
        "Send the estate, the unit and a person to meet using the enquiry form, WhatsApp or a call, and we propose a date. The estates lie on different sides of the river and the city, so they are taken in order.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Who calibrates loggers used in a Guwahati hospital or laboratory?",
      answer:
        "A Guwahati hospital or laboratory can have its loggers and probes calibrated by VEGA Calibrations, our parent company, with the date agreed at the time of the order.",
    },
  ],
  nearby: [
    { slug: "tezpur", name: "Tezpur" },
    { slug: "shillong", name: "Shillong" },
    { slug: "dibrugarh", name: "Dibrugarh" },
  ],
  metaTitle: "Temperature Data Loggers in Guwahati | Prithvi",
  metaDescription:
    "Guwahati, Assam: temperature and humidity data loggers for medicine distributors, hospitals, Amingaon yards and bazaars. Get Solution to begin in Guwahati.",
  indexable: true,
};

export default city;
