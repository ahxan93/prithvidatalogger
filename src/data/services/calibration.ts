// /services/calibration | Service
import type { Service } from "../services.ts";
import type { ServiceContent } from "../service-content.ts";
import { VEGA } from "./_shared.ts";

export const service: Service = {
  slug: "calibration",
  name: "Calibration",
  shortName: "Calibration",
  href: "/services/calibration",
  summary:
    "Calibration for data loggers and a wide range of instruments, delivered by VEGA Calibrations.",
  scope: [
    "Temperature and humidity instruments and data loggers",
    "Thermometers",
    "Pressure and vacuum gauges",
    "Electrical meters",
    "Mechanical and dimensional instruments (e.g. vernier calipers)",
    "Weighing scales",
    "Force meters",
    "Lux meters",
    "Sound meters",
    "Vibration meters",
    "Anemometers",
  ],
  keyPoint: "Certificates are traceable to national standards.",
  enquiryOption: "Calibration / Temperature Mapping",
  deliveredBy: VEGA,
  seo: {
    primaryKeyword: "data logger calibration",
    supporting: ["instrument calibration"],
  },
};

export const content: ServiceContent = {
  h1: "Data Logger Calibration Services",
  whyHeading: "Why Data Logger Calibration Matters",
  metaDescription:
    "Data logger calibration for loggers, thermometers and gauges, arranged through our parent company VEGA Calibrations. Get a solution.",
  intro:
    "Data logger calibration, and calibration of other measuring instruments, arranged through our parent company, VEGA Calibrations. Certificates are traceable to national standards.",
  whatItIs:
    "Calibration compares an instrument's readings with a reference of known accuracy and records the difference. It tells you how far each measurement can be trusted.",
  whyItMatters: [
    "A monitoring record is only as reliable as the sensor behind it.",
    "A traceable certificate is evidence that your measurements can be trusted.",
    "A substitute device keeps monitoring running while a logger is away for calibration, with its data merged back afterwards.",
  ],
  process: [
    { title: "Share your instrument list", text: "Tell us what needs calibrating and the ranges you use." },
    { title: "Scope and quote", text: "We confirm what is covered and send a clear quote." },
    { title: "Calibration by VEGA", text: "VEGA Calibrations calibrates the instruments." },
    { title: "Certificates issued", text: "You receive a calibration certificate for each instrument." },
  ],
  deliverables: [
    "Calibration certificate for each instrument, traceable to national standards",
    "Certificates can be stored against each device on the monitoring dashboard, ready for audits",
  ],
  faqs: [
    {
      question: "Who carries out the calibration?",
      answer:
        "Calibration is carried out by VEGA Calibrations, our parent company. Ask us for the scope and certificate details that apply to your instruments.",
    },
    {
      question: "Which instruments can be calibrated?",
      answer:
        "Temperature and humidity instruments and data loggers, thermometers, pressure and vacuum gauges, electrical meters, mechanical and dimensional instruments, weighing scales, and force, lux, sound and vibration meters and anemometers.",
    },
    {
      question: "Do the loggers have to be Prithvi loggers?",
      answer:
        "The scope covers temperature and humidity instruments and data loggers in general. Send us your make and model and we will confirm.",
    },
    {
      question: "What does data logger calibration involve?",
      answer:
        "Each logger's readings are compared with a reference of known accuracy and the difference is recorded on a certificate. Send us your list and we will confirm the scope and arrange the work through VEGA Calibrations.",
      link: { href: "/products", text: "Browse Prithvi temperature and humidity data loggers" },
    },
  ],
};
