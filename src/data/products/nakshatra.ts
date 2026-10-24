// /products/nakshatra | Product
import type { ProductContent } from "../product-content.ts";

const content: ProductContent = {
  metaTitle: "Nakshatra – IoT Temperature & Humidity Logger",
  metaDescription:
    "Nakshatra is an IoT temperature data logger that also reads 0–100 %RH, syncs over Wi-Fi and sends instant alerts. Get a solution.",
  intro:
    "Nakshatra is an IoT temperature data logger with a humidity sensor, for rooms, stores and warehouses where both conditions matter. It measures −30 to +70 °C and 0–100 %RH, syncs readings over Wi-Fi to the cloud dashboard and sends an alert when temperature or humidity leaves its limits.",
  measures: "Temperature + humidity",
  rangeSummary: "−30 to +70 °C · 0–100 %RH",
  keyFeatures: [
    "Temperature and humidity from one single-channel logger",
    "Internal sensor, or an external sensor on a 1 m cable (X models)",
    "Pro models carry a high-capacity 7000 + 7000 mAh battery",
    "±0.5 °C and ±2 %RH accuracy, with 0.1 °C and 0.1 %RH resolution",
    "Stores up to 1,00,000 records, with offline download via PC software",
  ],
  faqs: [
    {
      question: "When should I choose Nakshatra X instead of Nakshatra?",
      answer:
        "Nakshatra X has its sensor on a 1 m cable, so the sensor can sit inside a chamber or cabinet while the logger stays outside. Nakshatra has the sensor built in.",
    },
    {
      question: "How is Nakshatra different from Setu?",
      answer:
        "Nakshatra measures humidity as well as temperature. Setu measures temperature only.",
    },
    {
      question: "What does Pro add on Nakshatra?",
      answer:
        "A high-capacity 7000 + 7000 mAh battery in place of the 3000 mAh battery. Measurement range and accuracy stay the same.",
    },
    {
      question: "How accurate is the humidity reading?",
      answer: "±2 %RH, with a resolution of 0.1 %RH, across 0–100 %RH.",
    },
    {
      question: "Is Nakshatra an IoT temperature data logger, and does it need Wi-Fi?",
      answer:
        "Yes. Nakshatra syncs readings over Wi-Fi to the cloud dashboard and alerts your team by email, SMS and app. If the connection drops it keeps recording to its internal memory, and data can be downloaded offline through the PC software.",
      link: { href: "/products", text: "Compare the full temperature and humidity data logger range" },
    },
  ],
};

export default content;
