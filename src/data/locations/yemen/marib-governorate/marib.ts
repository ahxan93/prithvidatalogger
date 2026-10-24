// /data-logger-marib | City | parent: Marib Governorate
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "marib",
  name: "Marib",
  type: "city",
  intro:
    "A logger in Marib is arranged case by case, whether for food and beverage or hospital and blood bank sites. Marib is a city at the eastern edge of the Yemeni mountains, where the land opens into the great desert, and a temperature data logger here serves a hot, dry town built around an ancient dam site. The ruins of the Sabaean dam and temples stand nearby, a modern dam holds back seasonal floodwater, and the irrigated land below grows dates, vegetables and grain. Markets sell food and household goods to the town and to settlements across the dry country, and clinics, hospitals and workshops serve a wide area. Oil and gas fields are known to lie in the region, which brings equipment yards and storage into the picture. Dust is frequent. The loggers hold readings in memory on battery power when a network is absent. We look at each Marib request case by case.",
  climateAngle:
    "Days are very hot and dry, nights can be cool, dust blows for much of the year and rain is rare but sudden, so stores swing between baking heat and brief damp while vehicles waiting in the sun get far hotter than the air. Long roads link the town to the highlands, so goods often spend many hours in a vehicle before arriving, and the hot desert wind dries out anything left uncovered. A refrigerator that fails on a summer afternoon can lose its contents before anyone notices.",
  areas: [
    {
      name: "Dam-fed farms and date stores",
      note: "Growers below the dam keep dates, vegetables and grain in sheds and cool rooms among the fields, where heat after harvest is the main danger to the crop.",
    },
    {
      name: "The town market and wholesale food stores",
      note: "Dealers and shopkeepers stack flour, oil, drinks and household goods in storerooms with simple roofs that bake in the afternoon sun.",
    },
    {
      name: "Hospitals and clinics",
      note: "Hospitals and clinics serve the town and the desert settlements around it and keep vaccines, insulin and blood products in refrigerators that must hold their range through power interruptions.",
    },
    {
      name: "Workshop and equipment yards",
      note: "Yards and workshops hold spare parts, lubricants, adhesives and electronic equipment that suit a steady range better than a cold desert dawn followed by a baking noon.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Marib date growers, wholesalers and grocers hold goods that suffer in desert heat, and a record from each store shows a buyer how a lot was kept after harvest.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Marib hospitals and clinics hold vaccines and blood products for settlements spread across a wide dry region, and a phone alert reaches the person on duty if a refrigerator warms overnight.",
    },
    {
      slug: "pharmaceutical",
      sentence:
        "Medicine wholesalers and pharmacies in Marib store stock to labelled ranges, and a dated log of temperature shows how a room behaved through the hottest weeks and any outage.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Goods reach Marib over long desert and mountain roads, and a logger placed in a load records how long it stood in a vehicle in the sun before it reached a small store.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a date or dry-goods store, where steady, cool and dry air protects the product through long storage.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels let a pharmacy room be read at the door and the far wall, showing whether the air at the back matches the front.",
    },
    {
      slug: "veer",
      reason:
        "Ten channels along a long equipment shed show which stretch of the roof keeps the stock warmest, in one report.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Marib, can a Marib date or food business use a temperature record?",
      answer:
        "A logger in a Marib store logs temperature and humidity across the season, and a report for the dates of one lot can be exported in PDF, Excel or CSV form for a buyer.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does dust matter for where a logger is mounted?",
      answer:
        "Fine dust settles on anything left open, so a logger is mounted on a shaded inner wall and kept away from vents, and its battery keeps the record going if power fails.",
    },
    {
      question: "How would a request from Marib be handled?",
      answer:
        "Give the place, what is kept and a contact on the enquiry form or WhatsApp. Marib requests are examined case by case, and we reply with what looks practical.",
    },
    {
      question: "Is calibration discussed for loggers used in Marib clinics and laboratories?",
      answer:
        "For Marib sites, VEGA Calibrations, our parent company, looks after calibration of loggers and probes; share the model and range and we outline the choices.",
    },
  ],
  nearby: [
    { slug: "sanaa", name: "Sana'a" },
    { slug: "al-jawf", name: "Al Jawf" },
  ],
  metaTitle: "Temperature Data Loggers in Marib | Prithvi",
  metaDescription:
    "Marib: temperature data loggers for desert-edge date stores, clinics, wholesale food rooms and equipment yards, reviewed case by case. Get Solution: Marib.",
  indexable: true,
};

export default city;
