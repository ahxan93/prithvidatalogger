// /data-logger-tuticorin | City | parent: Tamil Nadu
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "tuticorin",
  name: "Tuticorin",
  type: "city",
  intro:
    "Tuticorin, officially Thoothukudi, is the port city of the far south-east of Tamil Nadu, on the Gulf of Mannar, and the V.O. Chidambaranar Port handles containers and bulk cargo for a wide hinterland. Extensive salt pans stretch along the coast, thermal power stations and a SIPCOT industrial complex stand inland, and chemical, fertiliser and seafood-processing units work in the estates around. Fishing boats land their catch at the harbour, and shipping agents, clearing firms and warehouses fill the streets near the docks. A temperature data logger in Tuticorin therefore follows cargo as often as rooms: reefer containers and seafood in cold stores, chemical drums in yards under a hot sun, and medicines in hospital pharmacies. Prithvi supplies WiFi loggers for sheds and GSM loggers for vehicles, with alerts to phones and email.",
  climateAngle:
    "The coast is hot and humid for most of the year, a salty wind corrodes metal and packaging, the north-east monsoon brings heavy rain and the occasional cyclone, so heat, damp and salt all need watching.",
  areas: [
    {
      name: "Port and harbour area",
      note: "The port's yards, container freight stations and bonded sheds hold cargo that waits for a vessel in sun and salt wind, with long dwell times for some lots.",
    },
    {
      name: "SIPCOT industrial complex",
      note: "A planned complex of chemical, food and engineering units on large plots, with stores for drums, ingredients and finished goods spread across wide sites.",
    },
    {
      name: "Fishing harbour and seafood processors",
      note: "Boats land fish at the harbour, and ice plants, cold stores and processors hold the catch before it is packed and sent inland or abroad.",
    },
    {
      name: "Salt pans and salt-works stores",
      note: "Salt is raked, washed and stored in large heaps and sheds along the coast, and the iodised and packed stock is held in rooms where damp air spoils packaging.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Seafood processors and exporters hold goods that spoil in warm, damp air, and a record from each cold store and reefer shows a buyer how a lot was kept before shipment.",
    },
    {
      slug: "chemical",
      sentence:
        "Chemical and fertiliser stores near the quay carry printed storage limits, and a high-temperature alert from a baking yard shed lets the supervisor move drums before the limit is crossed.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Container yards and freight stations around the port hold goods bound for ships, and a logger in the consignment records how long it stood in the open between gate and vessel.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals in the city and the port's own medical stores keep vaccines and blood components in many refrigerators, and phone alerts mean a failing unit is noticed during the monsoon nights.",
    },
  ],
  recommendedSeries: [
    {
      slug: "rajmudra",
      reason:
        "Two channels in a seafood cold room, one at each end, show whether the whole space is cooled or only the part nearest the unit.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a long port-side shed across racks, doors and floor positions, so one report shows how the whole building behaves.",
    },
    {
      slug: "vayu",
      reason:
        "A SIM-based GSM logger travels in a reefer or a lorry, or reports from a yard with no Wi-Fi, which suits cargo moving between the plants and the quay.",
    },
  ],
  faqs: [
    {
      question: "Can a temperature data logger in Tuticorin ride with a consignment from the harbour to the port?",
      answer:
        "A SIM-based Vayu logger packed into the load records on its own battery and sends readings over the mobile network, and the report can be exported lot by lot once the cargo has arrived.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does salt-laden air affect where a logger should be placed?",
      answer:
        "We keep loggers away from open doors and seaward walls where salt spray settles, and we use a second probe at the far end of a room, so the record reflects the stored goods and not the corroding air by the door.",
    },
    {
      question: "Do you cover the SIPCOT complex and the estates inland?",
      answer:
        "Send the complex, the plant and the person who controls the gate through the enquiry form, WhatsApp or a call, and we confirm how a visit would be arranged, planned around your safety rules.",
    },
    {
      question: "Can several seafood units be watched from one account?",
      answer:
        "Each unit becomes a site with its own alert recipients, so an owner with several cold stores can open all of them in one list and export a report for any room.",
    },
  ],
  nearby: [
    { slug: "madurai", name: "Madurai" },
    { slug: "kochi", name: "Kochi" },
  ],
  metaTitle: "Temperature Data Loggers in Tuticorin | Prithvi",
  metaDescription:
    "Tuticorin: temperature data loggers for Thoothukudi port yards, seafood cold stores, chemical stores and hospitals. Get Solution for Tuticorin.",
  indexable: true,
};

export default city;
