// /data-logger-kandla | City | parent: Gujarat
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "kandla",
  name: "Kandla",
  type: "city",
  intro:
    "Kandla is a port on the Gulf of Kutch, officially Deendayal Port, and it works as a twin with Gandhidham, the planned town laid out beside it after Partition. The port handles bulk cargo, liquid cargo and containers, with tank farms for edible oil and chemicals along the creek, while the Kandla special economic zone holds export units. Gandhidham, with its markets, hospitals and godowns, is the commercial town for the whole of Kutch. A temperature data logger in Kandla or Gandhidham might be watching an oil tank house, a timber and plywood yard, a chemical store or a hospital pharmacy. The coast is hot, dry and salty, the 1998 cyclone and the 2001 earthquake are not forgotten, and records that carry on through disruption count for more than usual.",
  climateAngle:
    "Summers are hot and dry with a salty wind from the creeks, rain is scanty, and storms from the Arabian Sea occasionally reach the coast, so corrosion and interrupted power sit beside heat as everyday risks.",
  areas: [
    {
      name: "Deendayal Port",
      note: "The port at Kandla with berths, tank farms and transit sheds, where bulk, liquid and container cargo wait for a vessel or a road haul in salty heat.",
    },
    {
      name: "Kandla special economic zone",
      note: "A long-established export zone beside the port with factories and warehouses whose stores follow the schedules of overseas buyers.",
    },
    {
      name: "Gandhidham",
      note: "The planned commercial town beside the port, with wide streets, wholesale markets, hospitals and godowns that supply the whole of Kutch.",
    },
    {
      name: "Timber and plywood yards",
      note: "Yards and processing units around Kandla and Gandhidham that hold imported timber and boards in open sheds, where damp and heat both change the wood.",
    },
    {
      name: "Salt works along the creek",
      note: "Pans and stores along the creek and the gulf, where salt is dried, heaped and loaded in a hot, windy and highly corrosive landscape.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Edible oil importers and food merchants hold oil in tanks and drums that change if left in heat, and a reading in each store shows how the temperature moved while a cargo waited.",
    },
    {
      slug: "chemical",
      sentence:
        "Chemical cargo and drums wait in tank farms and godowns around the port, and an alert reaches the stores manager when a hot afternoon pushes a room toward its upper limit.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Transit sheds, bonded warehouses and container yards hold goods for owners elsewhere, and a log at each bay gives them the record of how long a lot waited in the sun.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals in Gandhidham serve the whole of Kutch, and their blood banks and vaccine fridges need alarms that still reach duty staff when a storm or a cut stops the power.",
    },
  ],
  recommendedSeries: [
    {
      slug: "dhruva",
      reason:
        "Four probes cover an oil tank house, its pump room, its loading bay and its office safe from one logger.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger with an external probe keeps recording in a transit shed or a yard without WiFi and sends alerts over the mobile network.",
    },
    {
      slug: "nakshatra",
      reason:
        "Reads humidity with temperature, which shows when damp sea air begins to affect boards, packaging and electrical stock.",
    },
  ],
  faqs: [
    {
      question: "Do you supply a temperature data logger in Gandhidham and Deendayal Port as well as Kandla?",
      answer:
        "Yes. Kandla and Gandhidham are twin settlements and the port is officially Deendayal Port. Whichever name you use, tell us the site and what you store, and we plan the visit.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "What suits stores that must keep working during a storm?",
      answer:
        "A GSM logger with its own battery keeps recording and sends alerts over the mobile network if the WiFi or power goes, so the record has no gap.",
    },
    {
      question: "Can an importer elsewhere see the record of a lot held in a bonded warehouse?",
      answer:
        "Yes. The dashboard shows each room to anyone you invite, and a report for the period a lot stayed can be exported as PDF, Excel or CSV.",
    },
    {
      question: "Is calibration available for plants at Kandla and Gandhidham?",
      answer:
        "Calibration of loggers and probes comes from VEGA Calibrations, our parent company, and can be planned together with the supply. Send the model and range, and we confirm how it is arranged.",
    },
  ],
  nearby: [
    { slug: "mundra", name: "Mundra" },
    { slug: "morbi", name: "Morbi" },
    { slug: "jamnagar", name: "Jamnagar" },
    { slug: "rajkot", name: "Rajkot" },
  ],
  metaTitle: "Temperature Data Loggers in Kandla | Prithvi",
  metaDescription:
    "Kandla: temperature data loggers for Deendayal Port and Gandhidham tank farms, bonded sheds, hospitals and godowns. Get Solution for Kandla.",
  indexable: true,
};

export default city;
