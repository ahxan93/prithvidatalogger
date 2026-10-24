// Service data. Source of truth: docs/MASTER-BRIEF.md §4.
// All services are delivered by our parent company, VEGA Calibrations.
// Compliance wording: "helps meet", never "guarantees compliance".

import * as calibrationService from "./services/calibration.ts";
import * as temperatureMappingService from "./services/temperature-mapping.ts";
import * as validationService from "./services/validation.ts";

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

export const services: Service[] = [
  calibrationService.service,
  temperatureMappingService.service,
  validationService.service,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
