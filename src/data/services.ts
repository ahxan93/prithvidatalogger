// Service data. Source of truth: docs/MASTER-BRIEF.md §4.
// All services are delivered by our parent company, VEGA Calibrations.
// Compliance wording: "helps meet", never "guarantees compliance".

export type ServiceSlug = "calibration" | "temperature-mapping" | "validation";

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Menu label (header, footer). */
  shortName: string;
  href: string;
  /** One line for cards. */
  summary: string;
  /** What is covered (brief §4). */
  scope: string[];
  /** Short statement of the outcome or standard behind the service. */
  keyPoint: string;
  /** Value for the EnquiryForm product dropdown when this service is preselected. */
  enquiryOption: string;
  deliveredBy: { name: string; url: string };
  seo: { primaryKeyword: string; supporting: string[] };
};

const VEGA = { name: "VEGA Calibrations", url: "https://www.vegacalibrations.com" } as const;

export const services: Service[] = [
  {
    slug: "calibration",
    name: "Calibration",
    shortName: "Calibration",
    href: "/services/calibration",
    summary:
      "NABL-accredited (ISO/IEC 17025:2017) calibration for data loggers and a wide range of instruments.",
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
      primaryKeyword: "NABL calibration services Mumbai",
      supporting: ["data logger calibration", "ISO 17025"],
    },
  },
  {
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
  },
  {
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
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
