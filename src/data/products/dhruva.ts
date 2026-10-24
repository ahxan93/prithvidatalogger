// /products/dhruva | Product
import type { ProductContent } from "../product-content.ts";

const content: ProductContent = {
  metaTitle: "Dhruva – 4-Channel WiFi Logger for Chambers & Rooms",
  metaDescription:
    "Dhruva connects four sensors to one WiFi logger to cover chambers, rooms and storage areas at several positions. Get a solution.",
  intro:
    "Dhruva is a 4 channel temperature data logger for multi-point monitoring. Four sensors connect to one Wi-Fi logger, so a room, chamber or storage area can be covered at several positions and seen on one screen.",
  measures: "4 × temperature, or 4 × temperature + humidity (Pro)",
  rangeSummary: "−100 to +200 °C · Pro: −30 to +70 °C, 0–100 %RH",
  keyFeatures: [
    "Four measurement channels in one Wi-Fi logger",
    "Dhruva: 4 temperature sensors, −100 to +200 °C, 3 m cable included and extendable to 50 m",
    "Dhruva Pro: 4 temperature + humidity sensors, 3 m cable included and extendable to 10 m",
    "7000 mAh rechargeable battery with USB Type-C charging",
    "±0.5 °C accuracy (±2 %RH on Pro)",
  ],
  faqs: [
    {
      question: "What is the difference between Dhruva and Dhruva Pro?",
      answer:
        "Dhruva has four temperature sensors covering −100 to +200 °C. Dhruva Pro has four temperature + humidity sensors covering −30 to +70 °C and 0–100 %RH.",
    },
    {
      question: "Why use one 4-channel logger instead of four single loggers?",
      answer:
        "One device covers four positions, with one battery to charge and one Wi-Fi connection to set up, and all four readings appear together.",
    },
    {
      question: "What if I need more than four points?",
      answer: "Veer covers 10 channels and Virat covers 16 channels from a single logger.",
    },
  ],
};

export default content;
