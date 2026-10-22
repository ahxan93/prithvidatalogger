// Page copy for the service pages (brief §7.6). Scope lists live in services.ts
// and come straight from brief §4. All services are delivered by VEGA Calibrations.
// Rule (brief §1): no facts beyond the brief. Definitions and process steps here
// are general and carry no turnaround times, locations or guarantees.
// "helps meet", never "guarantees compliance". Validated by `npm run check:data`.

import type { ServiceSlug } from "./services";

export type ServiceFaq = { question: string; answer: string; link?: { href: string; text: string } };

export type ServiceContent = {
  /** <title> text when it should differ from the H1. */
  metaTitle?: string;
  /** Replaces the "Why It Matters" heading. */
  whyHeading?: string;
  /** The page's H1 and <title> (≤ 60 characters). */
  h1: string;
  /** Meta description; ≤ 155 characters. */
  metaDescription: string;
  /** Hero paragraph; contains the service's primary keyword. */
  intro: string;
  /** "What it is": a plain, general definition. */
  whatItIs: string;
  /** "Why it matters": 3 short points. */
  whyItMatters: string[];
  /** Generic process steps (no timings). */
  process: { title: string; text: string }[];
  /** What the customer receives. */
  deliverables: string[];
  faqs: ServiceFaq[];
};

export const serviceContent: Record<ServiceSlug, ServiceContent> = {
  calibration: {
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
  },
  "temperature-mapping": {
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
  },
  validation: {
    h1: "IQ, OQ & PQ Validation Services",
    metaDescription:
      "IQ, OQ and PQ validation services with software validation reports, delivered by VEGA Calibrations. Helps you meet GMP, GDP and WHO guidelines.",
    intro:
      "IQ OQ PQ validation services for monitoring systems and equipment, delivered by our parent company, VEGA Calibrations. Qualification helps you meet GMP, GDP and WHO guideline requirements.",
    whatItIs:
      "Validation is documented evidence that a system is installed correctly, operates as intended and keeps performing in real use. It is carried out in three stages: IQ, OQ and PQ.",
    whyItMatters: [
      "Documented qualification shows that your monitoring system does what it is meant to do.",
      "It helps you meet GMP, GDP and WHO guideline requirements.",
      "A software validation report is part of the scope, alongside IQ, OQ and PQ.",
    ],
    process: [
      { title: "Share your system", text: "Tell us what needs to be qualified and the guidelines you work to." },
      { title: "Scope and quote", text: "We confirm what is covered and send a clear quote." },
      { title: "Qualification by VEGA", text: "VEGA Calibrations carries out IQ, OQ and PQ." },
      { title: "Documents issued", text: "You receive the qualification documents and the software validation report." },
    ],
    deliverables: [
      "Installation Qualification (IQ)",
      "Operational Qualification (OQ)",
      "Performance Qualification (PQ)",
      "Software validation report",
    ],
    faqs: [
      {
        question: "What do IQ, OQ and PQ stand for?",
        answer:
          "Installation Qualification, Operational Qualification and Performance Qualification.",
      },
      {
        question: "Will validation make us compliant?",
        answer:
          "Validation helps you meet GMP, GDP and WHO guideline requirements. Compliance as a whole depends on your quality system and procedures.",
      },
      {
        question: "Is the monitoring software covered?",
        answer: "Yes. A software validation report is included in the scope.",
      },
      {
        question: "Is temperature mapping part of validation?",
        answer:
          "They are separate studies that often go together. Mapping finds the hot and cold spots, and validation documents that the monitoring system performs as intended. Both are arranged through VEGA Calibrations.",
        link: { href: "/services", text: "See temperature mapping and validation services" },
      },
    ],
  },
};
