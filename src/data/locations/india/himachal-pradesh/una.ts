// /data-logger-una | City | parent: Himachal Pradesh
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "una",
  name: "Una",
  type: "city",
  intro:
    "Una lies in the low hills and plain on the Punjab side of Himachal Pradesh, close to the border and to the roads and railway that run to Chandigarh and Delhi, and its industrial areas at Gagret, Mehatpur, Bathri and Haroli have drawn steel, food, packaging and engineering units over the years. Much of the town's trade looks across the boundary to Punjab, and goods move by road in both directions all day. A temperature data logger in Una therefore watches rolling-mill stores, ingredient rooms in food units, packaging stores, transport depots and the pharmacies of a district town. Heat is the main enemy: this is one of the warmest parts of the state, and a shed with a metal roof can become a danger to stock by May. Prithvi supplies WiFi and GSM loggers, with alerts that reach a phone or an inbox.",
  climateAngle:
    "The district is among the warmer parts of the state, with hot, dry summers, a heavy monsoon and cool winters, so roof heat in the months before the rains is the largest risk to stored goods.",
  areas: [
    {
      name: "Gagret and Mehatpur industrial areas",
      note: "Estates with steel, food and engineering units on plots of mixed size, where one owner may run a mill store, a packing room and a dispatch bay a short walk apart.",
    },
    {
      name: "Bathri and Haroli estates",
      note: "Further industrial areas with packaging, processing and manufacturing units, where factory sheds stand beside farmland and stores heat up under metal roofs.",
    },
    {
      name: "Punjab border road depots",
      note: "Transport yards and godowns along the roads toward Punjab hold goods that cross the state boundary and wait for loads to be matched to vehicles.",
    },
    {
      name: "District hospital and pharmacy belt",
      note: "The regional hospital and the pharmacies and clinics of the town keep vaccines and medicines in refrigerators that serve villages across a wide area.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Food and beverage units and bottling stores hold ingredients and finished stock that suffer in the dry heat, and a temperature record shows an owner when a lot began to warm.",
    },
    {
      slug: "chemical",
      sentence:
        "Steel and packaging units hold coatings, lubricants and adhesives with printed storage limits, and an alert from a hot shed lets the storekeeper act before a batch is spoiled.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Godown operators on the border roads hold cartons and bags for traders in two states, and a reading for each bay shows where a consignment spent its time.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "The regional hospital and private clinics keep vaccines and blood components in refrigerators that must survive summer power cuts, and a phone alert shows which unit is drifting.",
    },
  ],
  recommendedSeries: [
    {
      slug: "veer",
      reason:
        "Ten channels spread through a long mill or packing shed at different heights show how much hotter the roofline runs than the floor.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels at the top and bottom of a food store give a paired record that shows whether heat collects under the roof.",
    },
    {
      slug: "vayu",
      reason:
        "A SIM-based GSM logger rides in a lorry crossing the border or reports from a depot without Wi-Fi, which suits goods moving between Una and Punjab.",
    },
  ],
  faqs: [
    {
      question: "Do you visit Gagret, Mehatpur, Bathri and Haroli to fit a temperature data logger?",
      answer:
        "Send the estate, the unit and the person who controls the gate through the enquiry form, WhatsApp or a call, and we confirm how a visit would be arranged for each of the industrial areas around Una.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How should a logger be placed in a shed with a metal roof?",
      answer:
        "We keep loggers out of direct sun and away from hot roofs and walls, and add a second probe near the floor, so a report shows how much hotter the upper stock runs than the lower.",
    },
    {
      question: "Can a firm with units in Una and in Punjab watch both?",
      answer:
        "Each unit becomes a site with its own alert recipients, whichever state it stands in, so an owner can open both in one list and export a report for any room.",
    },
    {
      question: "What happens to the record during a summer power cut?",
      answer:
        "A logger carries on recording from its own battery, uploads the stored readings when the network is back, and can warn the person in charge that the supply has been lost.",
    },
  ],
  nearby: [
    { slug: "chandigarh", name: "Chandigarh" },
    { slug: "mohali", name: "Mohali" },
    { slug: "baddi", name: "Baddi" },
  ],
  metaTitle: "Temperature Data Loggers in Una | Prithvi",
  metaDescription:
    "Una: temperature data loggers for Gagret and Mehatpur units, steel and food stores, border depots and hospitals. Get Solution to begin in Una.",
  indexable: true,
};

export default city;
