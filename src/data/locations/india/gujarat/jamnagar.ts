// /data-logger-jamnagar | City | parent: Gujarat
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "jamnagar",
  name: "Jamnagar",
  type: "city",
  intro:
    "Jamnagar lies near the Gulf of Kutch on the Kathiawar peninsula, and two things shape its storage: a very large refinery belt on the coast west of the city, and a brass-parts industry that has filled the Dared estate and the older lanes for decades. The refineries draw a supply chain of engineering shops, contractors, caterers, transport firms and chemical suppliers into the city, while naval and air force stations and a medical college add stores of their own. Bandhani tie-dye cloth and groundnut trade give the older side of the city its character. A temperature data logger in Jamnagar might be watching a lubricant store, a brass-parts warehouse or a hospital pharmacy, in salty air and a hot, dry climate that gives little rain.",
  climateAngle:
    "The air is dry and hot for most of the year with a salty breeze off the gulf, rain is sparse and cyclones occasionally threaten the coast, so power cuts and corrosion are as real as heat.",
  areas: [
    {
      name: "Dared",
      note: "The estate that made Jamnagar's name for brass parts, with foundries, machining shops and warehouses that hold finished components for export orders.",
    },
    {
      name: "Shankar Tekri",
      note: "An older estate within reach of the city centre, where workshops, small engineering units and repair shops hold stock in cramped sheds.",
    },
    {
      name: "Refinery belt at Motikhavdi",
      note: "The coastal belt west of the city with the refineries, contractors' yards and spares stores that serve continuous process plants and need steady storage conditions.",
    },
    {
      name: "Bedi port area",
      note: "The small port on the gulf, with godowns for bulk cargo and general goods that wait for a vessel or a lorry in humid, salty air.",
    },
    {
      name: "Old city lanes",
      note: "Dense lanes of bandhani cloth shops, groundnut traders, clinics and hotels around the old lake and palace, in buildings that hold the day's heat.",
    },
  ],
  industries: [
    {
      slug: "chemical",
      sentence:
        "Suppliers to the refineries hold lubricants, additives and catalysts in stores with stated limits, and a reading in each room shows how it behaved on the hottest afternoon.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Brass-parts warehouses and port godowns hold goods for export orders, and a log at the dock door shows how long a lot stood in the salty heat before it was crated.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Groundnut and edible oil traders and hotel kitchens hold produce and oil that change when heat builds up, and a probe in each store gives a record a buyer can see.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A government hospital, a medical college and military and private hospitals keep blood banks and vaccine fridges that need alarms to reach staff when a storm interrupts the power.",
    },
  ],
  recommendedSeries: [
    {
      slug: "dhruva",
      reason:
        "Four probes cover the receiving bay, the main store, the loading door and the power room of a supplier's depot from one logger.",
    },
    {
      slug: "nakshatra",
      reason:
        "Reads humidity as well as temperature, the pair that matters when salty damp air reaches packaging and electrical stock.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger with an external probe keeps reporting over the mobile network from a port godown or a remote yard where WiFi is unavailable.",
    },
  ],
  faqs: [
    {
      question: "Do you supply contractors and vendors serving the refineries?",
      answer:
        "We supply loggers to any business with stores to watch. Tell us what you hold, the limits you work to and where the store is, and we propose points and alert contacts.",
    },
    {
      question: "How does the sea air affect loggers?",
      answer:
        "Salt in the air is hard on electronics, so we advise placing a logger indoors away from open doors and using a probe cable to reach a damp or exposed spot.",
    },
    {
      question: "Can estates at Dared and the coast be watched together?",
      answer:
        "Yes. Each estate is its own site with alerts for its own team, and an owner with units in both sees them in one list, with reports that can be exported for any period.",
    },
    {
      question: "Can a temperature data logger for a Jamnagar hospital or plant be calibrated?",
      answer:
        "Calibration of loggers and probes is delivered by VEGA Calibrations, our parent company, and can be timed with an audit date. Share the model and range and we explain the arrangement.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
  ],
  nearby: [
    { slug: "rajkot", name: "Rajkot" },
    { slug: "morbi", name: "Morbi" },
    { slug: "mundra", name: "Mundra" },
  ],
  metaTitle: "Temperature Data Loggers in Jamnagar | Prithvi",
  metaDescription:
    "Jamnagar: temperature data loggers for the Dared brass estate, the refinery belt, port godowns and hospitals. Get Solution, or WhatsApp us about Jamnagar.",
  indexable: true,
};

export default city;
