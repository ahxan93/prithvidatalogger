// /industries/data-centers | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "data-centers",
  name: "Data Centres & Server Rooms",
  summary: "Temperature and humidity alerts that help prevent overheating and downtime.",
  applications: [
    "Server room temperature and humidity",
    "Overheating prevention",
    "Network and UPS rooms",
  ],
  recommended: ["nakshatra", "dhruva-pro"],
  whyItMatters:
    "Servers and network equipment fail faster when rooms run too hot or humidity drifts too high or low. Early alerts give IT teams time to fix a cooling problem before it turns into downtime.",
  image: "/images/industries/data-centers.jpg",
};

export const content: IndustryContent = {
  metaTitle: "Temperature & Humidity Data Logger for Server Rooms",
  h1: "Temperature and Humidity Data Logger for Data Centres & Server Rooms",
  lead: "A temperature and humidity data logger in the server room warns IT before a cooling fault turns into downtime.",
  helpsHeading: "Server Room Temperature and Humidity Records",
  metaDescription:
    "Temperature and humidity data logger for server rooms and data centres, with instant alerts that help prevent overheating. Get a solution.",
  challenges: [
    "Equipment runs continuously, so a cooling fault needs attention straight away.",
    "Humidity that drifts too high or too low is easy to miss.",
    "Server rooms are often unattended outside working hours.",
  ],
  helps: [
    {
      title: "Temperature and humidity together",
      text: "Nakshatra measures −30 to +70 °C and 0–100 %RH from one logger.",
    },
    {
      title: "Several points in one room",
      text: "Dhruva Pro connects four temperature + humidity sensors to a single logger.",
    },
    {
      title: "Alerts around the clock",
      text: "Email, SMS, app and dashboard alerts, with escalation if the first alert is not acknowledged.",
    },
  ],
  compliance:
    "No regulatory claim is made here. You set the temperature and humidity limits your equipment needs, and the loggers record and alert against them.",
  faqs: [
    {
      question: "Which logger suits a server room?",
      answer:
        "Nakshatra covers one point for temperature and humidity. Dhruva Pro covers four points from one logger.",
    },
    {
      question: "How do alerts reach the on-call person?",
      answer:
        "By email, SMS, mobile app and dashboard. If an alert is not acknowledged, it escalates to the next level.",
    },
    {
      question: "What if the Wi-Fi goes down?",
      answer:
        "The logger continues recording to its internal memory, and readings can be downloaded offline through the PC software.",
    },
    {
      question: "Can one temperature and humidity data logger cover several racks?",
      answer:
        "Dhruva Pro connects four temperature + humidity sensors to one logger, so a room can be watched at several positions. Veer Pro extends that to ten.",
      link: { href: "/products/dhruva", text: "See the Dhruva Pro four-point logger" },
    },
  ],
};
