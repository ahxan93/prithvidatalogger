// /industries/logistics-warehousing | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "logistics-warehousing",
  name: "Logistics & Warehousing",
  summary: "Multi-point monitoring for warehouses, distribution centres and consignments.",
  applications: [
    "Temperature-controlled warehouses",
    "Distribution centres",
    "In-transit consignments",
  ],
  recommended: ["veer", "virat", "vayu"],
  whyItMatters:
    "Large storage areas have hot and cold spots that a single sensor cannot see, and goods in transit are out of sight altogether. Multi-channel loggers cover many points from one device, and GSM loggers keep reporting on the road.",
  image: "/images/industries/logistics-warehousing.jpg",
};

export const content: IndustryContent = {
  metaTitle: "Shipment Temperature Data Logger for Logistics",
  h1: "Shipment Temperature Data Logger for Logistics & Warehousing",
  lead: "A shipment temperature data logger produces a journey report for each trip, so a consignment's temperature can be checked after delivery.",
  helpsHeading: "Shipment and Warehouse Monitoring, Point by Point",
  metaDescription:
    "Shipment temperature data logger and warehouse monitoring: 10 and 16 channel WiFi loggers and consignment journey reports. Get a solution.",
  challenges: [
    "Large storage areas have hot and cold spots that a single sensor cannot see.",
    "Goods in transit are out of sight between dispatch and delivery.",
    "One team often has to watch several warehouses and distribution centres.",
  ],
  helps: [
    {
      title: "Many points from one logger",
      text: "Veer connects 10 sensors and Virat connects 16, with temperature sensor cables extendable to 50 m.",
    },
    {
      title: "Sensors in the right places",
      text: "A temperature mapping study by VEGA Calibrations identifies hot and cold spots and the right sensor positions.",
    },
    {
      title: "Records for every journey",
      text: "Consignment monitoring produces a journey report for each trip. GSM versions are available for vehicles.",
    },
  ],
  compliance:
    "The audit trail and reports support GDP compliance for medicine and healthcare supply chains. We make no claim about specific national rules.",
  faqs: [
    {
      question: "How many sensors does a warehouse need?",
      answer:
        "It depends on the size and layout. A temperature mapping study identifies the hot and cold spots and the right sensor positions.",
    },
    {
      question: "Should I choose Veer or Virat?",
      answer:
        "Veer has 10 channels and Virat has 16. Choose by the number of points you need to cover from one logger.",
    },
    {
      question: "Can several sites be monitored together?",
      answer:
        "Yes. The location hierarchy groups devices by organisation, site, room and device, so every warehouse appears in one place.",
    },
    {
      question: "Can I use a reefer container temperature data logger for loads in transit?",
      answer:
        "Reefer vehicles and containers are covered by consignment monitoring, which produces a journey report for each trip. Share the route and the load, and our team will recommend the logger. A mapping study can also show the right sensor positions inside a reefer vehicle.",
      link: { href: "/services/temperature-mapping", text: "See the temperature mapping service" },
    },
  ],
};
