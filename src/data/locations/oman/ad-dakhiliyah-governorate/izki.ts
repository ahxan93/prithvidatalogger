// /data-logger-izki | City | parent: Ad Dakhiliyah Governorate
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "izki",
  name: "Izki",
  type: "city",
  intro:
    "A logger in Izki mostly serves food and beverage sites, as well as hospital and blood bank sites. Izki is an ancient oasis town at the foot of the mountains, where old mud houses stand among date groves watered by a long irrigation channel, and a temperature data logger here serves a small farming place of date sheds, shops, workshops and a clinic in dry heat. Farmers harvest dates and vegetables, shops along the main road sell food and household goods, and the old quarter keeps narrow lanes of mud-brick buildings. A clinic and pharmacies care for the townspeople and the hamlets around the groves, and school buses and pickups use the main road all day. Summer days are very hot, winter nights are cold, and dust is common. Enquiries from Izki are handled through the enquiry form, Call or WhatsApp.",
  climateAngle:
    "The air is dry and bright, summer afternoons are fierce and winter nights can be cold, while the damp of the irrigation channel hangs between the palms, so date sheds and shop coolers swing between heat, cold and moisture within a single week. A cooler that fails in a quiet lane may go unnoticed until morning, and drifting dust clogs vents on roadside units. Old stone and mud walls keep the lanes shaded, but a store room on the sunny side of the quarter can run far hotter than one on the shaded side, and dates left in a hot corner darken and dry.",
  areas: [
    {
      name: "Date groves and farm sheds",
      note: "Farmers keep dates and vegetables in sheds among the palms, where the heat after harvest and the damp near the channel both threaten the crop.",
    },
    {
      name: "Roadside shops and groceries",
      note: "Shops on the main road sell dairy goods, drinks and packaged food from coolers opened constantly through the day.",
    },
    {
      name: "The old quarter's stock rooms",
      note: "Small traders keep dates, spices and household goods in mud-brick rooms that stay cooler by day but never fully dry.",
    },
    {
      name: "The clinic and pharmacies",
      note: "A clinic and pharmacies hold vaccines and medicines for the town and its villages in refrigerators that must survive power interruptions.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Izki date growers and shopkeepers hold goods that suffer in heat, cold snaps and damp, and a log from each store shows a buyer how a lot was kept.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "The Izki clinic holds vaccines for the oasis villages, and a phone alert reaches whoever is on duty if a refrigerator drifts.",
    },
    {
      slug: "pharmaceutical",
      sentence:
        "Pharmacies in Izki store medicines to labelled ranges, and a dated record shows how a room behaved through the hottest weeks and any outage.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Goods reaching Izki wait in vehicles and sheds before use, and a logger tucked into a load records how long it stood warm.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a date shed beside an irrigation channel, where damp is the quiet danger.",
    },
    {
      slug: "setu",
      reason:
        "One probe on a short cable fits a shop or clinic refrigerator in Izki and leaves the way the unit is used unchanged.",
    },
    {
      slug: "dhruva",
      reason:
        "Four channels follow a roadside shop store at floor, shelf and door height, showing which level warms first.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Izki, can an Izki date grower keep a record of a lot in store?",
      answer:
        "Yes. A logger set in a shed or cool room tracks heat and damp through the season, and a report for the dates of one lot can be saved as a PDF, Excel or CSV file for a buyer.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do sheds beside an irrigation channel need a humidity reading?",
      answer:
        "The channel keeps the air damp around the groves, so a humidity trend beside the temperature shows when a store took on moisture even on a dry-looking day.",
    },
    {
      question: "How would an enquiry from Izki be handled?",
      answer:
        "Give the farm, shop or clinic, the rooms and a contact on the enquiry form, Call or WhatsApp, and we reply with what looks suitable for Izki.",
    },
    {
      question: "Is calibration discussed for loggers used in Izki clinics?",
      answer:
        "Calibration of loggers and probes for Izki clinics is looked after by VEGA Calibrations, our parent company; share the model and the range and we outline the options.",
    },
  ],
  nearby: [
    { slug: "nizwa", name: "Nizwa" },
    { slug: "bahla", name: "Bahla" },
    { slug: "sumail", name: "Sumail" },
  ],
  metaTitle: "Temperature Data Loggers in Izki | Prithvi",
  metaDescription:
    "Izki: temperature data loggers for date groves, roadside shops, old-quarter stock rooms and the clinic in an ancient oasis town. Get Solution for Izki.",
  indexable: true,
};

export default city;
