// /industries/laboratories | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "laboratories",
  name: "Research Laboratories",
  summary: "Reliable records for sample storage, testing and R&D environments.",
  applications: [
    "Biological sample storage",
    "Environmental testing",
    "R&D labs",
  ],
  recommended: ["setu-x", "rajmudra"],
  whyItMatters:
    "Research results are only as reliable as the conditions the samples were kept in. A complete temperature history protects months of work and supports data integrity when results are reviewed.",
  image: "/images/industries/laboratories.webp",
};

export const content: IndustryContent = {
  metaTitle: "Temperature & Humidity Data Logger for Laboratories",
  h1: "Temperature and Humidity Data Logger for Research Laboratories",
  lead: "A temperature and humidity data logger for laboratories gives every freezer, sample store and test area a complete history for review.",
  helpsHeading: "Temperature and Humidity Records for Sample Storage",
  metaDescription:
    "Temperature and humidity data logger for laboratories: sample storage, testing and R&D, external probes from −100 to +200 °C, complete audit trail.",
  challenges: [
    "Storage ranges from deep-freeze to room temperature, so one sensor type does not fit every unit.",
    "Samples can represent months of work that cannot easily be repeated.",
    "Results are harder to defend if storage conditions cannot be shown.",
  ],
  helps: [
    {
      title: "Probes for low temperatures",
      text: "Setu X uses an external probe rated from −100 to +200 °C on a 1 m cable.",
    },
    {
      title: "Two points side by side",
      text: "Rajmudra records two temperature channels at once, which suits comparative studies.",
    },
    {
      title: "Traceable records",
      text: "A complete audit trail, with calibration reports stored against each device.",
    },
  ],
  compliance:
    "Timestamped records with an audit trail support data-integrity expectations, and the platform supports 21 CFR Part 11 compliance. Your quality system defines how it is applied.",
  faqs: [
    {
      question: "Which logger works for a laboratory freezer?",
      answer:
        "Setu X. Its probe is rated down to −100 °C and sits inside the freezer on a 1 m cable.",
    },
    {
      question: "Can I compare two chambers or two positions?",
      answer:
        "Yes. Rajmudra is a two-channel logger, so both points are recorded together.",
    },
    {
      question: "Can calibration certificates be kept with the data?",
      answer:
        "Yes. Calibration and mapping reports can be stored against each device and room, ready for audits.",
    },
    {
      question: "Which temperature and humidity data logger suits a lab storeroom?",
      answer:
        "Nakshatra measures −30 to +70 °C and 0–100 %RH from one logger. For a deep freezer, choose Setu X, whose external probe is rated down to −100 °C.",
      link: { href: "/products/nakshatra", text: "See the Nakshatra logger" },
    },
  ],
};
