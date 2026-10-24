// /data-logger-mundra | City | parent: Gujarat
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "mundra",
  name: "Mundra",
  type: "city",
  intro:
    "Mundra is a port town on the Gulf of Kutch, and its storage is shaped by the container terminals, a special economic zone and the warehouses that surround them. Ships load and unload containers, vehicles and bulk cargo; boxes move by road and rail towards the northern states; refrigerated containers wait on power points before sailing; and power plants and industrial units have grown on the coast around the port. A temperature data logger in Mundra often follows goods in transit, in a container yard, a cold store or a cross-dock warehouse, for owners who are not on site. The land is arid, the sun is fierce and the sea wind carries salt, so equipment and cargo both need steady attention, and a record that continues when the power flickers is valuable.",
  climateAngle:
    "The country is arid, summers are scorching, rain is rare and the sea wind carries salt, while cyclones from the Arabian Sea occasionally reach the Kutch coast, so power cuts and corrosion matter alongside heat.",
  areas: [
    {
      name: "Port terminals",
      note: "The container and cargo terminals on the gulf, where boxes, vehicles and refrigerated containers wait for a berth, a train or a lorry.",
    },
    {
      name: "Special economic zone",
      note: "A large export-oriented zone beside the port with factories, warehouses and cold rooms working to shipping schedules set by overseas buyers.",
    },
    {
      name: "Container freight stations and logistics parks",
      note: "Yards and sheds on the approach roads where boxes are stuffed, unstuffed, sorted and held while customs and carriers are arranged.",
    },
    {
      name: "Mundra town",
      note: "The older town inland from the harbour, with markets, clinics, a hospital, hotels and kitchens that serve a mixed workforce of port and factory staff.",
    },
  ],
  industries: [
    {
      slug: "logistics-warehousing",
      sentence:
        "Cross-dock sheds and container yards hold goods between a ship and a train, and a reading at every bay shows how long a consignment waited in heat that rises quickly on open ground.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Importers and exporters of food and edible oil use cold rooms and refrigerated containers, and a continuous log gives the owner abroad a record of how each lot was held.",
    },
    {
      slug: "pharmaceutical",
      sentence:
        "Medicines and healthcare goods pass through for export and import, and a dated temperature record supports a shipper who must show a buyer how a pallet was kept.",
    },
    {
      slug: "chemical",
      sentence:
        "Tank farms and drum stores hold chemical cargo in a hot, salty climate, and an alert reaches the supervisor when a store drifts toward a limit.",
    },
  ],
  recommendedSeries: [
    {
      slug: "virat",
      reason:
        "Sixteen channels map a large free-zone warehouse across racks, dock doors and floor positions, so one report shows how the whole hall behaved.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger with an external probe rides in a container or sits in a yard without WiFi, and sends alerts over the mobile network.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two external probes show the warm and cool ends of a cold room or the front and rear of a container load.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Mundra, can an exporter in another city watch stock held in Mundra?",
      answer:
        "Yes. The record is on the dashboard, so an owner in any city can read a room or a lot and receive the same alerts as the supervisor on site.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "What suits a refrigerated container waiting in a yard?",
      answer:
        "A GSM logger with an external probe inside the load reports over the mobile network and keeps its own record, so the owner has a log even if the yard has no WiFi.",
    },
    {
      question: "How are loggers kept safe from salt and dust?",
      answer:
        "A logger belongs inside, in a sheltered spot, with an external probe on a cable for the exposed point. We advise on cable length once we know the shed or yard.",
    },
    {
      question: "Can mapping and calibration be arranged for a Mundra warehouse?",
      answer:
        "VEGA Calibrations, our parent company, carries out temperature mapping, calibration and validation support, and the work can be planned with the supply. Send the warehouse size and limits and we explain how it is arranged.",
    },
  ],
  nearby: [
    { slug: "kandla", name: "Kandla" },
    { slug: "morbi", name: "Morbi" },
    { slug: "jamnagar", name: "Jamnagar" },
  ],
  metaTitle: "Temperature Data Loggers in Mundra | Prithvi",
  metaDescription:
    "Mundra, Gujarat: temperature data loggers for port terminals, SEZ warehouses, container yards and cold rooms. Get Solution to start in Mundra.",
  indexable: true,
};

export default city;
