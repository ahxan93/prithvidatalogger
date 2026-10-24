// /products/setu | Product
import type { ProductContent } from "../product-content.ts";

const content: ProductContent = {
  metaTitle: "Setu – WiFi Data Logger for Fridges & Cold Rooms",
  metaDescription:
    "Setu is a single-channel WiFi data logger with an internal sensor or external probe (−100 to +200 °C) and instant alerts. Get a solution.",
  intro:
    "Setu is a single-channel WiFi data logger for refrigerators, freezers, cold rooms and storage areas. It records temperature at the interval you set, syncs readings over Wi-Fi and alerts your team the moment a limit is crossed.",
  measures: "Temperature",
  rangeSummary: "−30 to +70 °C · −100 to +200 °C with external probe",
  keyFeatures: [
    "Single-channel temperature logging with live Wi-Fi sync",
    "Internal sensor for −30 to +70 °C, or an external probe on a 1 m cable for −100 to +200 °C (X models)",
    "Pro models carry a high-capacity 7000 + 7000 mAh battery",
    "±0.5 °C accuracy with 0.1 °C resolution",
    "Stores up to 1,00,000 records, with offline download via PC software",
  ],
  faqs: [
    {
      question: "Which Setu should I use for a deep freezer?",
      answer:
        "Choose Setu X or Setu Pro X. Their external probe is rated from −100 to +200 °C, so the probe sits inside the freezer while the logger stays outside.",
    },
    {
      question: "What is the difference between Setu and Setu Pro?",
      answer:
        "The battery. Setu has a 3000 mAh battery; Setu Pro has a high-capacity 7000 + 7000 mAh battery. Temperature range and accuracy are the same.",
    },
    {
      question: "Does Setu measure humidity?",
      answer:
        "No. Setu measures temperature only. For temperature and humidity together, choose the Nakshatra series.",
    },
    {
      question: "How is Setu charged?",
      answer:
        "Through a universal USB Type-C port. The rechargeable Li-ion battery lasts about 3 months at a 10-minute logging interval.",
    },
    {
      question: "Is Setu a WiFi data logger I can use for a vaccine fridge or cold room?",
      answer:
        "Yes. Setu X and Setu Pro X have an external probe on a 1 m cable, so the probe sits inside the fridge or cold room while the logger stays outside and syncs over your Wi-Fi.",
      link: { href: "/industries/vaccine-cold-chain", text: "See the vaccine temperature data logger guide" },
    },
  ],
};

export default content;
