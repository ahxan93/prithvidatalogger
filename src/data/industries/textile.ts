// /industries/textile | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "textile",
  name: "Textile",
  summary: "Humidity monitoring for yarn, fabric and production areas.",
  applications: [
    "Yarn and fabric storage",
    "Humidity-sensitive production areas",
    "Finished-goods warehouses",
  ],
  recommended: ["nakshatra", "veer-pro"],
  whyItMatters:
    "Yarn and fabric react to humidity, which affects strength, weight and how smoothly production runs. Monitoring humidity across storage and production areas helps keep quality consistent from batch to batch.",
  image: "/images/industries/textile.webp",
};

export const content: IndustryContent = {
  metaTitle: "Temperature & Humidity Data Logger for Textiles",
  h1: "Temperature and Humidity Data Logger for Textile Mills",
  lead: "A temperature and humidity data logger in each store and production area shows when humidity drifts, before yarn or fabric is affected.",
  helpsHeading: "Humidity and Temperature Records by Area",
  metaDescription:
    "Temperature and humidity data logger for yarn and fabric storage and production areas, with instant alerts. Get a solution from Prithvi.",
  challenges: [
    "Yarn and fabric react to humidity, which affects quality and how production runs.",
    "Conditions differ between stores and production areas.",
    "Manual checks miss the changes that happen between rounds.",
  ],
  helps: [
    {
      title: "Humidity and temperature together",
      text: "Nakshatra measures 0–100 %RH and −30 to +70 °C from one logger.",
    },
    {
      title: "Ten points across a mill",
      text: "Veer Pro connects ten temperature + humidity sensors to a single logger.",
    },
    {
      title: "Alerts when humidity drifts",
      text: "Email, SMS, app and dashboard alerts when a reading leaves the limits you set.",
    },
  ],
  compliance:
    "No regulatory claim is made here. You set the humidity and temperature limits your materials need, and the loggers record and alert against them.",
  faqs: [
    {
      question: "Which logger suits a yarn store?",
      answer:
        "Nakshatra, which measures both humidity and temperature. Veer Pro covers ten points for larger areas.",
    },
    {
      question: "What humidity range is covered?",
      answer: "0–100 %RH, with ±2 %RH accuracy, on the RH models.",
    },
    {
      question: "Can production and storage be logged separately?",
      answer:
        "Yes. Each room is its own location in the dashboard hierarchy, so stores and production areas are viewed separately.",
    },
    {
      question: "Do I need a temperature and humidity data logger in every room?",
      answer:
        "Each room is its own location on the dashboard, so you can place a Nakshatra in each store, or use Veer Pro to cover up to ten points from one logger.",
      link: { href: "/products/nakshatra", text: "See the Nakshatra logger" },
    },
  ],
};
