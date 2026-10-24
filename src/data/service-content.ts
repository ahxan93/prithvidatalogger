// Page copy for the service pages (brief §7.6). Scope lists live in services.ts
// and come straight from brief §4. All services are delivered by VEGA Calibrations.
// Rule (brief §1): no facts beyond the brief. Definitions and process steps here
// are general and carry no turnaround times, locations or guarantees.
// "helps meet", never "guarantees compliance". Validated by `npm run check:data`.

import type { ServiceSlug } from "./services";

import * as calibrationService from "./services/calibration.ts";
import * as temperatureMappingService from "./services/temperature-mapping.ts";
import * as validationService from "./services/validation.ts";

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
  calibration: calibrationService.content,
  "temperature-mapping": temperatureMappingService.content,
  validation: validationService.content,
};
