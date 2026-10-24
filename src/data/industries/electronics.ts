// /industries/electronics | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "electronics",
  name: "Electronics Manufacturing",
  summary: "Temperature and humidity control for components, clean rooms and fabs.",
  applications: [
    "Component storage",
    "Clean rooms",
    "Semiconductor facilities",
  ],
  recommended: ["nakshatra-pro", "veer-pro"],
  whyItMatters:
    "Electronic components are sensitive to moisture and temperature during storage and assembly. Continuous humidity and temperature records help reduce defects and show that production conditions stayed within limits.",
  image: "/images/industries/electronics.jpg",
};

export const content: IndustryContent = {
  metaTitle: "Temperature & Humidity Data Logger for Electronics",
  h1: "Temperature and Humidity Data Logger for Electronics Manufacturing",
  lead: "A temperature and humidity data logger for component stores and clean rooms records conditions continuously, so you can show they stayed within limits when a defect is investigated.",
  helpsHeading: "Humidity and Temperature Records for Stores and Clean Rooms",
  metaDescription:
    "Temperature and humidity data logger for electronics plants: component stores, clean rooms and semiconductor facilities. Get a solution.",
  challenges: [
    "Components are sensitive to moisture and temperature in storage and assembly.",
    "Clean rooms and stores need humidity held within set limits.",
    "When a defect is investigated, evidence of the conditions is needed.",
  ],
  helps: [
    {
      title: "Temperature and humidity in one device",
      text: "Nakshatra Pro measures both, with a high-capacity 7000 + 7000 mAh battery.",
    },
    {
      title: "Ten points across a facility",
      text: "Veer Pro connects ten temperature + humidity sensors to one logger.",
    },
    {
      title: "A record to look back on",
      text: "Reports as a graph, a table or both, exported to PDF, Excel or CSV.",
    },
  ],
  compliance:
    "No regulatory claim is made here. You define the temperature and humidity limits for your process, and the loggers record and alert against them.",
  faqs: [
    {
      question: "Which logger suits a component store?",
      answer:
        "Nakshatra Pro for a single point. Veer Pro when up to ten points need temperature and humidity.",
    },
    {
      question: "How accurate is the humidity measurement?",
      answer: "±2 %RH with 0.1 %RH resolution on the RH models.",
    },
    {
      question: "Can several rooms be monitored together?",
      answer:
        "Yes. Rooms and devices are grouped in one location hierarchy on the dashboard.",
    },
    {
      question: "Can one temperature and humidity data logger cover a whole clean room?",
      answer:
        "Veer Pro connects ten temperature + humidity sensors to one logger, so a store or clean room can be watched at several positions. Humidity accuracy is ±2 %RH.",
      link: { href: "/products/veer", text: "See the 10-channel Veer logger" },
    },
  ],
};
