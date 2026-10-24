// /data-logger-jammu | City | parent: Jammu and Kashmir
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "jammu",
  name: "Jammu",
  type: "city",
  intro:
    "A logger in Jammu is most often placed at pharmaceutical and vaccine and cold chain sites around Bari Brahmana and Gangyal and Digiana. Jammu is the commercial and logistics gateway of the Union Territory, a city on the Tawi river at the foot of the Shivalik hills, and a temperature data logger here serves a trading and healthcare centre on the highway from Punjab. Trains and trucks bring medicines, food and consumer goods that are sorted and sent on to the valley and the hill towns, pilgrims travelling to the shrine at Katra pass through in great numbers, and hospitals and a medical college serve the region. Industrial areas at Bari Brahmana, Gangyal and Digiana hold pharmaceutical, food, steel and packaging firms, and the Narwal market handles fruit and vegetables. Prithvi supplies WiFi loggers for wards and plants with a network and GSM loggers for trucks, mountain loads and distant stores.",
  climateAngle:
    "Summers on the plain are fiercely hot, the monsoon turns the air heavy and winter mornings are cold and foggy, so a godown that is scorching in June can be damp in August and chilled in January.",
  areas: [
    {
      name: "Bari Brahmana",
      note: "A planned industrial complex on the highway side holds pharmaceutical, food, steel and packaging plants on regular plots, with raw-material rooms, finished-goods stores and loading bays open to the sun.",
    },
    {
      name: "Gangyal and Digiana",
      note: "Older industrial areas inside and beside the city hold small factories, engineering workshops and godowns, whose stores are packed into crowded buildings with limited ventilation.",
    },
    {
      name: "Narwal market and the wholesale lanes",
      note: "Traders in fruit, vegetables, dry fruit, medicines and general goods work in busy markets, with cold rooms and back rooms that run hard through the long hot summer.",
    },
    {
      name: "Hospitals and the pilgrim route",
      note: "Government and private hospitals, a medical college and the guesthouses and eating houses used by pilgrims keep medicine fridges, blood storage and kitchen coolers running through the year.",
    },
  ],
  industries: [
    {
      slug: "pharmaceutical",
      sentence:
        "Formulation plants and medicine distributors hold ingredients and finished packs in controlled rooms, and a continuous log of temperature and humidity supports each batch file and answers a buyer's audit.",
    },
    {
      slug: "vaccine-cold-chain",
      sentence:
        "Vaccines reach district centres in the hills by road from Jammu, and a logger in the carrier shows whether the doses stayed within range on a hot plain and on a cold mountain climb.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Dairies, bakeries, dry-fruit dealers and caterers run chillers and cold rooms through the long summer, and an alert on a phone reaches the owner when a unit warms at night.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Warehouses and carriers sort goods for the valley and the hills, and a reading at each bay shows how long a load stood in the heat before it began the climb.",
    },
  ],
  recommendedSeries: [
    {
      slug: "rajmudra",
      reason:
        "Two channels let a pharmaceutical store or a medicine godown be read at its door and at its back wall by a single device on the wall.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels spread along a long warehouse or a plant store give one report for each bay and shelf level, showing which corner holds the heat.",
    },
    {
      slug: "vayu",
      reason:
        "A SIM-based GSM logger travels in a truck bound for the valley, holds its readings in memory through the tunnels and passes, and uploads them as soon as a signal is found.",
    },
  ],
  faqs: [
    {
      question: "Can a Jammu distributor show how medicines fared on the road to the valley?",
      answer:
        "A GSM logger placed with the pack records readings along the road and through any halt, and the owner can open the record on a phone and export it for the buyer.",
    },
    {
      question: "Do you supply a temperature data logger in Bari Brahmana, Gangyal and Digiana in one trip?",
      answer:
        "Send the estate, the unit and a person to meet using the enquiry form, WhatsApp or a call, and we propose a day. The estates lie on different sides of the city, so they are taken in a sensible order.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How are alert limits set for a hot summer and a cold winter?",
      answer:
        "A godown can run hot in June and near freezing in January, so we set both a low and a high limit, and add a short delay to the high one so that an open door does not raise the alarm.",
    },
    {
      question: "Who calibrates loggers used in a Jammu hospital or plant laboratory?",
      answer:
        "For a Jammu hospital or plant laboratory, VEGA Calibrations, our parent company, calibrates the loggers and probes, and the date is agreed with the order.",
    },
  ],
  nearby: [
    { slug: "samba", name: "Samba" },
    { slug: "kathua", name: "Kathua" },
    { slug: "srinagar", name: "Srinagar" },
  ],
  metaTitle: "Temperature Data Loggers in Jammu | Prithvi",
  metaDescription:
    "Jammu, Jammu and Kashmir: temperature and humidity data loggers for Bari Brahmana pharma plants, medicine distributors and hospitals. Get Solution: Jammu.",
  indexable: true,
};

export default city;
