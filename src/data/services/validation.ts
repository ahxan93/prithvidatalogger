// /services/validation | Service
import type { Service } from "../services.ts";
import type { ServiceContent } from "../service-content.ts";
import { VEGA } from "./_shared.ts";

export const service: Service = {
  slug: "validation",
  name: "Validation & Qualification",
  shortName: "Validation",
  href: "/services/validation",
  summary:
    "IQ, OQ and PQ qualification and software validation for monitoring systems and equipment.",
  scope: [
    "Installation Qualification (IQ)",
    "Operational Qualification (OQ)",
    "Performance Qualification (PQ)",
    "Software validation report",
  ],
  keyPoint: "Helps customers meet GMP, GDP and WHO guideline requirements.",
  enquiryOption: "Validation (IQ/OQ/PQ)",
  deliveredBy: VEGA,
  seo: {
    primaryKeyword: "IQ OQ PQ validation services",
    supporting: ["equipment qualification"],
  },
};

export const content: ServiceContent = {
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
};
