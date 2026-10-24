// /data-logger-mangaluru | City | parent: Karnataka
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "mangaluru",
  name: "Mangaluru",
  type: "city",
  intro:
    "Mangaluru is the port city of coastal Karnataka, set between the Arabian Sea and the Western Ghats, and its economy runs through the New Mangalore Port. A refinery and petrochemical complex and a fertiliser plant stand in the north, cashew factories and seafood processors work in estates such as Baikampady, and a cluster of medical colleges and hospitals draws patients from several coastal districts. A temperature data logger in Mangaluru therefore watches cargo as often as rooms: chemical drums in port-side yards, cashew and packed food in humid sheds, fish in ice and cold stores near the harbour, and vaccines in hospital pharmacies. The air is warm and salty for most of the year, and stock that is fine inland can deteriorate here. Prithvi supplies WiFi loggers for sheds and cold rooms and GSM loggers for lorries and yards, so a reading follows the stock to a phone.",
  climateAngle:
    "The coast is warm and humid all year, the monsoon is long and extremely wet, and salt in the air attacks metal and packaging, so humidity and heat are watched together and probes are kept clear of damp walls.",
  areas: [
    {
      name: "Baikampady and Yeyyadi industrial areas",
      note: "Estates with food, chemical and engineering units, cashew factories and packing sheds on plots of mixed size, where damp air gets into stores through the long monsoon.",
    },
    {
      name: "Port and Panambur",
      note: "The port, its yards and the chemical and fertiliser stores near Panambur hold cargo that waits on a vessel or a lorry, in sun and salt wind.",
    },
    {
      name: "Fishing harbour and Bunder",
      note: "Boats land fish at the harbour and the old port area, and ice plants, cold stores and processors hold the catch before it is packed and sent inland or abroad.",
    },
    {
      name: "Medical college and hospital belt",
      note: "Several medical colleges and large hospitals in the city keep vaccines, blood components and medicines in many refrigerators serving the coastal districts.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Cashew processors and seafood handlers hold goods that spoil in warm, damp air, and a record from each cold store and shed shows a buyer how a lot was kept before shipment.",
    },
    {
      slug: "chemical",
      sentence:
        "Chemical and fertiliser stores near the port carry limits printed on their labels, and an alert from a heated yard shed gives the supervisor time to act before the label is breached.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals and medical colleges keep vaccines and blood components in many refrigerators, and alerts on a phone mean a failing unit is noticed during the long monsoon nights.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Warehouses and container yards around the port hold goods bound for ships, and a logger in the consignment records how long it stood in the open between gate and vessel.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Temperature and humidity at one point suit a cashew or packaging store, where damp coastal air reaching the stock is the main danger.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels in a fish cold room, one at each end, show whether the whole space is cooled or only the part nearest the unit.",
    },
    {
      slug: "vayu",
      reason:
        "A SIM-based GSM logger travels in a lorry or reports from a yard with no Wi-Fi, which suits goods moving between the port and the estates.",
    },
  ],
  faqs: [
    {
      question: "Where should probes sit in a cold store with salty, damp air?",
      answer:
        "We place probes near doors and anterooms where damp air first meets a cold store, away from evaporator coils, and we use a second probe at the far end, so a report shows whether the whole room is cooled.",
    },
    {
      question: "Can a temperature data logger in Mangaluru ride with a consignment from the harbour?",
      answer:
        "A SIM-based Vayu logger placed in the load keeps recording on its battery and sends readings over the mobile network, and the report can be exported by lot when the goods reach their destination.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do you cover Panambur and the estates north of the city?",
      answer:
        "Send the area, the unit and a contact through the enquiry form, WhatsApp or a call, and we confirm how a visit would be arranged for Panambur, Baikampady and other pockets around Mangaluru.",
    },
    {
      question: "Can several seafood or cashew units be watched together?",
      answer:
        "Each unit becomes a site with its own alert recipients, so an owner with several sheds can open all of them in one list and export a report for any room.",
    },
  ],
  nearby: [
    { slug: "goa", name: "Goa" },
    { slug: "kochi", name: "Kochi" },
  ],
  metaTitle: "Temperature Data Loggers in Mangaluru | Prithvi",
  metaDescription:
    "Mangaluru, Karnataka: temperature and humidity data loggers for port yards, cashew and seafood units and hospitals. Get Solution: Mangaluru.",
  indexable: true,
};

export default city;
