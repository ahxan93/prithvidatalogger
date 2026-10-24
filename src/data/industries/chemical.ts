// /industries/chemical | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "chemical",
  name: "Chemical",
  summary: "Monitoring for chemical stores, raw materials and sensitive process areas.",
  applications: [
    "Chemical storage rooms",
    "Raw-material warehouses",
    "Sensitive processing areas",
  ],
  recommended: ["dhruva", "veer"],
  whyItMatters:
    "Many chemicals degrade or become unstable outside their specified storage temperature. Multi-point monitoring across stores and process areas helps protect material quality and supports safe handling.",
  image: "/images/industries/chemical.webp",
};

export const content: IndustryContent = {
  metaTitle: "Chemical Storage Temperature Monitoring",
  metaDescription:
    "Chemical storage temperature monitoring with 4 and 10 channel loggers for stores, raw-material warehouses and process areas. Get a solution.",
  challenges: [
    "Many chemicals have to be kept within a specified storage temperature.",
    "Stores and process areas are often spread across a site.",
    "Records are needed to show that conditions stayed within limits.",
  ],
  helps: [
    {
      title: "Four points from one logger",
      text: "Dhruva connects four temperature sensors covering −100 to +200 °C.",
    },
    {
      title: "Ten points for larger stores",
      text: "Veer connects ten temperature sensors to a single logger.",
    },
    {
      title: "Sensors where they are needed",
      text: "A 3 m cable is included and can be extended to 50 m on the temperature models.",
    },
  ],
  compliance:
    "No regulatory claim is made for chemical storage. Follow your own storage specifications and site procedures; the loggers record and alert against the limits you set.",
  faqs: [
    {
      question: "Should I choose Dhruva or Veer?",
      answer:
        "Dhruva has 4 channels and Veer has 10. Choose by the number of points you need to monitor.",
    },
    {
      question: "Can sensors be placed away from the logger?",
      answer:
        "Yes. On Dhruva and Veer, the 3 m sensor cable can be extended to 50 m.",
    },
    {
      question: "Can past readings be reviewed?",
      answer:
        "Yes. Reports are available as a graph, a table or both, and can be exported to PDF, Excel or CSV.",
    },
  ],
};
