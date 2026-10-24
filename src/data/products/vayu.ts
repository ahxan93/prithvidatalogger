// /products/vayu | Product
import type { ProductContent } from "../product-content.ts";

const content: ProductContent = {
  metaTitle: "Vayu – GSM Data Logger with SIM Connectivity",
  metaDescription:
    "Vayu is a GSM data logger for remote sites and reefer trucks: SIM-based, temperature plus humidity, instant alerts. Get a solution.",
  intro:
    "Vayu is a GSM data logger that reports over a SIM card, so it keeps working at remote sites and on vehicles where Wi-Fi does not reach. It measures temperature and humidity and suits reefer trucks and outdoor locations.",
  measures: "Temperature + humidity",
  rangeSummary: "−30 to +70 °C · 0–100 %RH",
  keyFeatures: [
    "SIM-based GSM connectivity: no Wi-Fi needed on site",
    "Internal temperature + humidity sensor, −30 to +70 °C and 0–100 %RH",
    "Vayu Pro adds an external temperature probe on a 3 m cable, −100 to +70 °C",
    "5000 mAh rechargeable battery with USB Type-C charging",
    "±0.5 °C and ±2 %RH accuracy",
  ],
  faqs: [
    {
      question: "Does Vayu need Wi-Fi?",
      answer: "No. Vayu is SIM-based and sends its data over the mobile network.",
    },
    {
      question: "What is the difference between Vayu and Vayu Pro?",
      answer:
        "Vayu Pro adds an external temperature probe on a 3 m cable, rated from −100 to +70 °C, alongside the internal temperature and humidity sensor.",
    },
    {
      question: "Will Vayu work in my country?",
      answer:
        "Network compatibility outside India has to be confirmed first. Contact us with your country and mobile operator and we will check before you order.",
    },
    {
      question: "Which GSM data logger suits a reefer truck or a remote site?",
      answer:
        "Vayu, which sends its readings over the mobile network and measures temperature and humidity. Vayu Pro adds an external temperature probe on a 3 m cable, rated from −100 to +70 °C.",
      link: { href: "/industries/logistics-warehousing", text: "See shipment temperature data logger uses" },
    },
    {
      question: "What does Vayu cost?",
      answer: "Share your requirement and we will send a clear quote.",
    },
  ],
};

export default content;
