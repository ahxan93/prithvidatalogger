// Company story, founder and principles. Source of truth: docs/MASTER-BRIEF.md §1.
// Contact details are NOT here: they live only in src/config/site.ts.
//
// Not confirmed by the owner, so never state: statistics, "12 years of
// experience", warranty periods, delivery timelines, response-time promises,
// a free calibration certificate with the device, or the cloud software's name.

export const founder = {
  name: "Ashwin Masurkar",
  honorific: "Mr.",
  title: "Director (TM)",
  // Only the facts in the brief (owner decision): no career history, years or awards.
  expertise: ["Temperature mapping & monitoring", "Calibration", "Validation"],
  bio: "Temperature mapping and monitoring expert, working in calibration and validation. He helps pharma QA and cold chain teams become audit-ready.",
  quote: "Measurements exist. Understanding does not.",
  /** Base path without extension; resolved with the image helper (any format). */
  photo: "/images/founder/founder",
} as const;

/** Our story, as short paragraphs (About page). */
export const brandStory: string[] = [
  "Every regulated industry depends on one invisible asset: its environment. Medicines, vaccines, lab results, food and manufacturing all rely on controlled conditions.",
  "Yet many monitoring systems are still disconnected, manual and delayed. Measurements exist. Understanding does not. Prithvi exists to bridge this gap.",
  "Prithvi grew out of VEGA Calibrations' years of calibration and temperature mapping work, which showed us the practical limits of conventional monitoring.",
];

export const nameMeaning =
  "In Indian philosophy, Prithvi (Earth) is the foundation on which every environment exists. In the same way, controlled environments are the foundation that protects products, processes and people.";

export const vision = "A world where every critical environment is protected.";
export const mission = "To enable confident action through trusted environmental information.";
export const corePurpose =
  "To protect products, processes, and people with trusted environmental intelligence.";

/** The Prithvi Framework, in order (7 stages). */
export const framework = [
  "Connect",
  "Observe",
  "Preserve",
  "Validate",
  "Understand",
  "Predict",
  "Decide",
] as const;

/** How we work (owner's request; plain wording, no exaggeration). */
export const howWeWork: { title: string; description: string }[] = [
  {
    title: "Fast service",
    description: "Quick, direct answers by phone, WhatsApp or the enquiry form.",
  },
  {
    title: "Clean, transparent work",
    description: "Clear recommendations and clear quotes, with nothing left vague.",
  },
  {
    title: "No hidden charges",
    description: "Clear, itemised quotes with no hidden charges.",
  },
  {
    title: "Traceable calibration",
    description: "Calibration from our parent lab, VEGA Calibrations, traceable to national standards.",
  },
  {
    title: "Support from enquiry to installation",
    description: "One team helps you choose, set up and start monitoring.",
  },
];

/**
 * Certifications held by our parent company, VEGA Calibrations (brief §1, §7.7).
 * `image` is an extension-less path: the real scan is used when present, and a
 * designed panel is shown until then.
 */
export const certifications = [
  {
    title: "NABL Accreditation",
    standard: "ISO/IEC 17025:2017",
    description: "VEGA Calibrations is an NABL accredited calibration laboratory.",
    image: "/images/certificates/nabl-certificate",
  },
  {
    title: "ISO 9001:2015",
    standard: "Quality Management System",
    description: "VEGA Calibrations is ISO 9001:2015 certified.",
    image: "/images/certificates/iso-9001-certificate",
  },
] as const;

/** How international supply works (brief §7.8). No delivery-time promises. */
export const supplySteps: { title: string; description: string }[] = [
  { title: "Enquiry", description: "Tell us your sites and what you need to monitor." },
  { title: "Quote", description: "We recommend models and send a clear quote." },
  { title: "Dispatch from India", description: "Your loggers are dispatched from India." },
  { title: "Remote setup support", description: "We help you connect the loggers and set up alerts by phone, WhatsApp or video call." },
];

/** Offline buying process (brief §1, §7.1). */
export const buyingSteps: string[] = [
  "Choose a product",
  "Call, WhatsApp or send an enquiry",
  "Expert consultation and quote",
  "Delivery and installation support",
];
