// /industries/pharmaceutical | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "pharmaceutical",
  name: "Pharmaceutical",
  summary: "Continuous temperature and humidity records for medicine storage and stability areas.",
  applications: ["Medicine storage rooms", "Drug warehouses", "Stability areas"],
  recommended: ["nakshatra", "rajmudra-pro", "dhruva-pro"],
  whyItMatters:
    "Medicines can lose potency when storage drifts outside its labelled range, often without any visible sign. Continuous logging with alerts lets QA teams act as soon as an excursion happens, and the stored records give auditors a complete history instead of hand-written spot checks.",
  image: "/images/industries/pharmaceutical.webp",
  seo: {
    primaryKeyword: "pharmaceutical temperature monitoring",
    supporting: ["GDP", "21 CFR Part 11 data logger"],
  },
};

export const content: IndustryContent = {
  metaTitle: "Pharma Warehouse Temperature Monitoring",
  h1: "Pharma Warehouse Temperature Monitoring",
  lead: "Pharma warehouse temperature monitoring gives QA a continuous record of every storage room, from the first shift to the last.",
  helpsHeading: "Warehouse Alerts and a Stability Chamber Data Logger",
  metaDescription:
    "Pharma warehouse temperature monitoring with WiFi loggers: instant alerts, audit trail and reports that support GDP and 21 CFR Part 11 compliance.",
  challenges: [
    "Storage rooms, warehouses and stability areas each have their own limits, and every one needs a continuous record.",
    "Manual readings leave gaps between checks, including nights and weekends.",
    "Hand-written log sheets are hard to review and easy to question during an audit.",
  ],
  helps: [
    {
      title: "Alerts that reach the right person",
      text: "Email, SMS, app and dashboard alerts when a room leaves its limits, escalating from Level 1 to Level 3 if nobody acknowledges.",
    },
    {
      title: "A record built for audits",
      text: "Role-based user access, a complete audit trail and acknowledgement notes for root cause and corrective action.",
    },
    {
      title: "No gaps during calibration",
      text: "A substitute device covers a logger that is away for calibration, and its data is merged back afterwards.",
    },
  ],
  compliance:
    "Role-based access and the audit trail support 21 CFR Part 11, GMP and GDP compliance. Qualification of the system (IQ, OQ, PQ) is available through VEGA Calibrations. Your own quality system defines the limits and procedures the loggers work to.",
  faqs: [
    {
      question: "Which data logger suits a medicine storage room?",
      answer:
        "Nakshatra records temperature and humidity in one device. Where a room or stability area needs several points, Rajmudra Pro covers two and Dhruva Pro covers four.",
    },
    {
      question: "Can the records be used in an audit?",
      answer:
        "Reports can be produced as a graph, a table or both, and exported to PDF, Excel or CSV. Calibration and mapping reports can be stored against each device and room.",
    },
    {
      question: "Who calibrates the loggers?",
      answer:
        "Our parent lab, VEGA Calibrations.",
    },
    {
      question: "Can one logger work as a stability chamber data logger?",
      answer:
        "Where the chamber's range suits it, yes. Rajmudra Pro records temperature and humidity at two points and Dhruva Pro at four, with the sensors on a cable so they sit inside the chamber while the logger stays outside.",
      link: { href: "/products/dhruva", text: "See the Dhruva multi-point logger" },
    },
  ],
};
