// /data-logger-sur | City | parent: Ash Sharqiyah South Governorate
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "sur",
  name: "Sur",
  type: "city",
  intro:
    "A logger in Sur mostly serves food and beverage sites, as well as hospital and blood bank sites. Sur is an old port city on the south-eastern coast of Oman, built around a calm lagoon and a creek where wooden dhows are still built and repaired, and a temperature data logger here serves a place of fishing boats, a market, workshops, a hospital and warehouses in hot, humid sea air. Fishermen land their catch at the harbour, dhow yards line the water with timber, rope and paint, and a market sells food, dates and household goods. Date palms and small farms grow in the valleys behind the coast, and an industrial estate lies beside the road. Summers are long and the sea air stays heavy after dark, while in the cooler evenings people stroll along the lagoon front. Enquiries from Sur are handled through the enquiry form, Call or WhatsApp.",
  climateAngle:
    "The shore is hot and humid through the long summer, salt reaches every shed and cold box, and the low hills behind the town give little shelter from the heat, so ice rooms, shop coolers and clinic refrigerators work against the weather for months. Timber and paint in the yards suffer from damp, power cuts follow storms, and a cooler that fails on an August afternoon warms fast.",
  areas: [
    {
      name: "The fishing harbour and ice stores",
      note: "Boats land the catch at the harbour, where ice stores and cold rooms keep it for the market through the warmest hours in damp, salty air.",
    },
    {
      name: "Dhow yards and boat-building stores",
      note: "Yards keep timber, rope, paints and fittings in open sheds where salt air and damp work on materials with their own storage limits.",
    },
    {
      name: "The market and its stock rooms",
      note: "Traders keep dates, sweets, spices and household goods in small back rooms that were never designed for cooling.",
    },
    {
      name: "The hospital, clinics and pharmacies",
      note: "A hospital, clinics and pharmacies hold vaccines, insulin and medicines in refrigerators that must hold their range through power interruptions.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Sur fish sellers, date traders and grocers hold goods that spoil or soften quickly in damp heat, and a record from each ice store shows when a cold box began to warm.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "The Sur hospital and clinics hold vaccines for the town and the villages down the coast, and a phone alert reaches whoever is on duty if a refrigerator warms in the small hours.",
    },
    {
      slug: "pharmaceutical",
      sentence:
        "Pharmacies in Sur keep stock to labelled ranges, and a dated log shows how a room behaved through the hottest weeks and any storm outage.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Goods brought to Sur wait in vehicles and warehouses before use, and a logger tucked into a load records the heat and humidity each lot met.",
    },
  ],
  recommendedSeries: [
    {
      slug: "rajmudra",
      reason:
        "Two channels follow a harbour fish room from its entrance to its back wall, showing whether the cold reaches the last boxes.",
    },
    {
      slug: "nakshatra",
      reason:
        "Humidity read beside temperature shows when lagoon damp has crept into a dates or spice store that looks fine on a thermometer.",
    },
    {
      slug: "setu",
      reason:
        "One probe on a short cable fits a clinic or pharmacy refrigerator in Sur and leaves daily routines unchanged.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Sur, can a Sur fish seller or date trader keep a temperature record?",
      answer:
        "Yes. A logger set in the ice store or the date room keeps a record through day and night, and a report for the dates of one lot can be exported as a PDF, Excel or CSV file for a buyer.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would a boat-building yard want a humidity record?",
      answer:
        "Timber, paint and fittings take on moisture in salt air, so a log of humidity beside temperature shows whether a store kept materials inside the limits they are sold with.",
    },
    {
      question: "How would an enquiry from Sur be handled?",
      answer:
        "Give the harbour store, yard, shop or clinic, the rooms and a contact on the enquiry form, Call or WhatsApp, and we reply with what looks suitable for Sur.",
    },
    {
      question: "Is calibration discussed for loggers used in Sur clinics?",
      answer:
        "Calibration of loggers and probes for Sur clinics is looked after by VEGA Calibrations, our parent company; share the model and the range and we outline the options.",
    },
  ],
  nearby: [
    { slug: "ibra", name: "Ibra" },
    { slug: "bidiyah", name: "Bidiyah" },
    { slug: "muscat", name: "Muscat" },
  ],
  metaTitle: "Temperature Data Loggers in Sur | Prithvi",
  metaDescription:
    "Sur, Oman: temperature data loggers for harbour ice stores, dhow-yard materials, market stock rooms and the hospital. Get Solution: Sur.",
  indexable: true,
};

export default city;
