// /services/temperature-mapping | Service
import type { Service } from "../services.ts";
import type { ServiceContent } from "../service-content.ts";
import { VEGA } from "./_shared.ts";

export const service: Service = {
  slug: "temperature-mapping",
  name: "Temperature Mapping",
  shortName: "Temperature Mapping",
  href: "/services/temperature-mapping",
  summary:
    "Mapping studies that find hot and cold spots and the right sensor positions in your storage spaces.",
  scope: [
    "Cold rooms",
    "Warehouses",
    "Deep freezers",
    "Refrigerators",
    "Insulated boxes",
    "Reefer vehicles",
  ],
  keyPoint: "Identifies hot and cold spots and the right sensor positions.",
  enquiryOption: "Calibration / Temperature Mapping",
  deliveredBy: VEGA,
  seo: {
    primaryKeyword: "temperature mapping services",
    supporting: ["warehouse mapping", "cold room mapping"],
  },
};

export const content: ServiceContent = {
  h1: "Temperature Mapping Services",
  metaTitle: "Temperature Mapping Service for Cold Rooms & Reefers",
  whyHeading: "Why a Temperature Mapping Service Matters",
  metaDescription:
    "Temperature mapping service for cold rooms, warehouses, freezers and reefer vehicles. Find hot and cold spots and the right sensor positions.",
  intro:
    "Temperature mapping services for cold rooms, warehouses and reefer vehicles, delivered by our parent company, VEGA Calibrations. A mapping study identifies the hot and cold spots in a space and the right positions for your sensors.",
  whatItIs:
    "Temperature mapping is a study of how temperature varies across a storage space. It shows where the warmest and coldest points are, instead of assuming the whole space is the same.",
  whyItMatters: [
    "A single sensor cannot show how temperature differs across a room or vehicle.",
    "Knowing the hot and cold spots tells you where monitoring sensors should go.",
    "Mapping reports can be stored against each room on the monitoring dashboard, ready for audits.",
  ],
  process: [
    { title: "Tell us about the space", text: "Share the type of space and what is stored in it." },
    { title: "Scope and quote", text: "We confirm the study and send a clear quote." },
    { title: "Mapping study by VEGA", text: "VEGA Calibrations carries out the temperature mapping study." },
    { title: "Report issued", text: "You receive the mapping report with its findings." },
  ],
  deliverables: [
    "Mapping report identifying hot and cold spots",
    "The right sensor positions for ongoing monitoring",
  ],
  faqs: [
    {
      question: "What kinds of spaces can be mapped?",
      answer:
        "Cold rooms, warehouses, deep freezers, refrigerators, insulated boxes and reefer vehicles.",
    },
    {
      question: "How is mapping different from monitoring?",
      answer:
        "Mapping is a study that finds the hot and cold spots and the right sensor positions. Monitoring is the continuous logging and alerting that follows.",
    },
    {
      question: "What happens after the mapping study?",
      answer:
        "Loggers can be installed at the positions the study identifies. Multi-channel loggers such as Veer and Virat cover many of those points from one device.",
    },
    {
      question: "Do I need a temperature mapping service before installing data loggers?",
      answer:
        "A mapping study is the step that shows where the hot and cold spots are, so your loggers go in the right positions. Without one, sensors are placed by assumption.",
      link: { href: "/products/veer", text: "See the multi-channel Veer logger" },
    },
  ],
};
