// /data-logger-kolkata | City | parent: West Bengal
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "kolkata",
  name: "Kolkata",
  type: "city",
  intro:
    "Kolkata is an old port city on the Hooghly, and its storage follows the river and the railway: warehouses on the Howrah side, the industrial township at Kalyani to the north, the logistics belt around Dankuni and the port-side godowns that handle goods bound inland and overseas. A temperature data logger in Kolkata is as often watching a medicine distributor's back room or a cold store for fish, dairy and sweets as it is a plant floor. The air is hot and humid for most of the year and the monsoon is long, so cold rooms fight condensation and cartons absorb moisture in every godown. Wireless loggers with alerts to phones and email, and a record that continues through a cut, give distributors, hospitals and cold stores a dated account of how a room really behaved.",
  climateAngle:
    "Hot, humid air and a long monsoon keep condensation on cold-room doors and moisture in cartons for most months, and pre-monsoon storms are a frequent cause of sudden power cuts.",
  areas: [
    {
      name: "Howrah",
      note: "An older industrial and warehouse district across the river, with engineering works, godowns and wholesale trade packed along roads that feed the railway and the bridges.",
    },
    {
      name: "Kalyani",
      note: "A planned industrial township to the north with pharmaceutical, engineering and food plants on regular plots, more spread out than the older districts.",
    },
    {
      name: "Dankuni",
      note: "A logistics and manufacturing belt to the north-west beside the highway, with distribution warehouses and consumer-goods and food units on large plots.",
    },
    {
      name: "Port-side warehouses",
      note: "Godowns near the river port hold goods that wait for a vessel or a rake, with long dwell times in warm, damp air.",
    },
  ],
  industries: [
    {
      slug: "pharmaceutical",
      sentence:
        "Distributors who supply chemists across eastern India hold medicines in crowded back rooms, and a log with a time for each excursion answers a buyer's query about a storage lapse.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Cold stores for fish, dairy and sweets run chambers that are opened through the day in humid air, so a reading every few minutes shows what each loading did to the room.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals and diagnostic centres keep blood storage and vaccine fridges that depend on a steady supply, and an alert to the duty staff covers the minutes when the mains and the generator are both out.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Port and rail-linked godowns hold goods for long periods before they move, and a record for each bay shows how a lot fared while it waited.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Reads humidity along with temperature, which tells a godown or a chilled store when damp air has overcome its dehumidifier or a door seal.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a long port-side shed or a Dankuni distribution hall across racks and dock doors, so one report shows the whole building.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger with an external probe rides in a van or a railway wagon, reporting from places a building's Wi-Fi never reaches.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Kolkata, can you cover Howrah, Kalyani and Dankuni in one trip?",
      answer:
        "We plan them in a sequence that follows the roads, since the three lie in different directions from the city. Send the sites, the rooms and a contact at each and we propose an order.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does a cold store cope with condensation on doors and probes?",
      answer:
        "Probes sit away from the door seal and the evaporator, and an alert on a door left open catches the usual cause of icing and fog before it builds up on the shelves.",
    },
    {
      question: "What happens to monitoring during a pre-monsoon storm outage?",
      answer:
        "Loggers keep recording on their batteries through the cut and send stored readings when the network returns, and an alert for a lost mains supply goes to the named person.",
    },
    {
      question: "Who handles calibration of loggers used in a Kolkata hospital or cold store?",
      answer:
        "Loggers and probes used in a Kolkata hospital or cold store can be calibrated by VEGA Calibrations, our parent company, and we time the work so the certificates are current when an inspector is due.",
    },
  ],
  nearby: [
    { slug: "lucknow", name: "Lucknow" },
    { slug: "hyderabad", name: "Hyderabad" },
    { slug: "delhi", name: "Delhi" },
  ],
  metaTitle: "Temperature Data Loggers in Kolkata | Prithvi",
  metaDescription:
    "Kolkata: WiFi and GSM temperature data loggers for pharma distributors, cold stores and port warehouses. Get Solution: request a plan for Kolkata.",
  indexable: true,
};

export default city;
