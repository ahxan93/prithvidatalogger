// /industries/food-beverage | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "food-beverage",
  name: "Food & Beverage",
  summary: "Temperature records for cold storage, processing and commercial kitchens.",
  applications: [
    "Cold storage",
    "Processing plants",
    "Restaurants and cloud kitchens",
  ],
  recommended: ["setu", "setu-x", "nakshatra"],
  whyItMatters:
    "Food safety depends on keeping chilled and frozen products at the right temperature from receipt to service. Continuous records replace manual log sheets, reduce spoilage and make food-safety checks quicker to prepare for.",
  image: "/images/industries/food-beverage.webp",
};

export const content: IndustryContent = {
  metaTitle: "Cold Storage Temperature Monitoring System",
  h1: "Cold Storage Temperature Monitoring System for Food & Beverage",
  lead: "A cold storage temperature monitoring system replaces paper log sheets with automatic records, so an overnight freezer failure is flagged before stock is lost.",
  helpsHeading: "Cold Room Data Logger Records, Instant Alerts",
  metaDescription:
    "Cold storage temperature monitoring system for food and beverage: automatic records, instant alerts, cold rooms and kitchens. Get a solution.",
  challenges: [
    "Chilled and frozen products must stay at the right temperature from receipt to service.",
    "Paper log sheets depend on someone remembering to check.",
    "A freezer failure overnight can spoil stock before the morning shift.",
  ],
  helps: [
    {
      title: "Logging without the clipboard",
      text: "Readings are recorded automatically at an interval you set, from 1 to 60 minutes.",
    },
    {
      title: "Probes for freezers",
      text: "Setu X carries an external probe rated from −100 to +200 °C for freezers and cold rooms.",
    },
    {
      title: "Alerts before stock is lost",
      text: "Email, SMS, app and dashboard alerts go out as soon as a reading leaves its limits.",
    },
  ],
  compliance:
    "Continuous temperature records can support a HACCP-based food safety plan. Your food safety team sets the critical limits; the loggers record and alert against them.",
  faqs: [
    {
      question: "Which logger is right for a walk-in freezer?",
      answer:
        "Setu X or Setu Pro X. The external probe goes inside the freezer and the logger stays outside.",
    },
    {
      question: "Are these suitable for a restaurant or cloud kitchen?",
      answer:
        "Yes. Setu or Nakshatra covers an individual fridge or freezer, and the external hooter adds an audible alarm in the kitchen.",
    },
    {
      question: "Can records be shared with an inspector?",
      answer: "Reports can be exported to PDF, Excel or CSV, as a graph, a table or both.",
    },
    {
      question: "Which cold room data logger suits a large cold store?",
      answer:
        "For a single cold room, Setu X or Setu Pro X puts the external probe inside the room while the logger stays outside. A large cold store with many points is covered by Virat, which connects sixteen sensors to one logger.",
      link: { href: "/products/virat", text: "See the 16-channel Virat logger" },
    },
  ],
};
