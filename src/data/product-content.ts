// Page copy for the series pages and product cards (brief §7.2–7.3).
// Every statement is derived from the specs in docs/MASTER-BRIEF.md §2:
// no invented numbers, warranty, delivery or compliance claims, and the cloud
// software is never named. Validated by `npm run check:data`.

import type { SeriesSlug } from "./products";

export type ProductFaq = { question: string; answer: string };

export type ProductContent = {
  /** <title>; must stay ≤ 60 characters. */
  metaTitle: string;
  /** Meta description; ≤ 155 characters. */
  metaDescription: string;
  /** Short hero paragraph; contains the series' primary keyword. */
  intro: string;
  /** What it measures, for cards and the comparison table. */
  measures: string;
  /** Key range in one line, for cards and the comparison table. */
  rangeSummary: string;
  keyFeatures: string[];
  /** 3–5 product-specific questions. */
  faqs: ProductFaq[];
};

export const productContent: Record<SeriesSlug, ProductContent> = {
  setu: {
    metaTitle: "Setu – WiFi Temperature Data Logger",
    metaDescription:
      "Setu WiFi temperature data logger: single channel, internal sensor or external probe (−100 to +200 °C), instant alerts. From MRP ₹5,500 + 18% GST.",
    intro:
      "Setu is a single-channel WiFi temperature data logger for refrigerators, freezers, cold rooms and storage areas. It records temperature at the interval you set, syncs readings over Wi-Fi and alerts your team the moment a limit is crossed.",
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
    ],
  },
  nakshatra: {
    metaTitle: "Nakshatra – WiFi Temperature & Humidity Data Logger",
    metaDescription:
      "Nakshatra WiFi temperature and humidity data logger: −30 to +70 °C, 0–100 %RH, instant alerts and audit-ready reports. From MRP ₹6,500 + 18% GST.",
    intro:
      "Nakshatra is a WiFi temperature and humidity data logger for rooms, stores and warehouses where both conditions matter. It measures −30 to +70 °C and 0–100 %RH, syncs readings over Wi-Fi and sends an alert when temperature or humidity leaves its limits.",
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
    ],
  },
  rajmudra: {
    metaTitle: "Rajmudra – 2-Channel WiFi Temperature Data Logger",
    metaDescription:
      "Rajmudra dual channel WiFi temperature data logger for validation and comparative studies. Two sensors, cables up to 50 m. From MRP ₹12,000 + 18% GST.",
    intro:
      "Rajmudra is a dual channel temperature data logger that records two points at once over Wi-Fi. Use it for qualification, validation and comparative studies, or wherever two locations need to be monitored from one device.",
    measures: "2 × temperature, or 2 × temperature + humidity (Pro)",
    rangeSummary: "−100 to +200 °C · Pro: −30 to +70 °C, 0–100 %RH",
    keyFeatures: [
      "Two measurement channels in one Wi-Fi logger",
      "Rajmudra: 2 temperature sensors, −100 to +200 °C, 3 m cable included and extendable to 50 m",
      "Rajmudra Pro: 2 temperature + humidity sensors, 3 m cable included and extendable to 10 m",
      "High-capacity 7000 + 7000 mAh battery on both models",
      "±0.5 °C accuracy (±2 %RH on Pro)",
    ],
    faqs: [
      {
        question: "What is the difference between Rajmudra and Rajmudra Pro?",
        answer:
          "Rajmudra has two temperature sensors covering −100 to +200 °C. Rajmudra Pro has two temperature + humidity sensors covering −30 to +70 °C and 0–100 %RH.",
      },
      {
        question: "How far can the sensors be from the logger?",
        answer:
          "A 3 m cable is included. It can be extended to 50 m on Rajmudra and to 10 m on Rajmudra Pro.",
      },
      {
        question: "What is a two-channel logger typically used for?",
        answer:
          "Qualification, validation and comparative studies, where two points are recorded side by side, and any space that needs two monitoring positions from one device.",
      },
    ],
  },
  dhruva: {
    metaTitle: "Dhruva – 4-Channel WiFi Temperature Data Logger",
    metaDescription:
      "Dhruva 4 channel WiFi temperature data logger for multi-point monitoring. Temperature or temperature + RH sensors. From MRP ₹17,000 + 18% GST.",
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
  },
  veer: {
    metaTitle: "Veer – 10-Channel WiFi Temperature Data Logger",
    metaDescription:
      "Veer 10 channel WiFi temperature data logger for warehouses and multi-zone sites. Sensor cables extendable to 50 m. From MRP ₹25,000 + 18% GST.",
    intro:
      "Veer is a 10 channel temperature data logger built for warehouses and multi-zone facilities. Ten sensors run from a single Wi-Fi logger, giving one clear view of temperature across racks, zones and rooms.",
    measures: "10 × temperature, or 10 × temperature + humidity (Pro)",
    rangeSummary: "−100 to +200 °C · Pro: −30 to +70 °C, 0–100 %RH",
    keyFeatures: [
      "Ten measurement channels in one Wi-Fi logger",
      "Veer: 10 temperature sensors, −100 to +200 °C, 3 m cable included and extendable to 50 m",
      "Veer Pro: 10 temperature + humidity sensors, 3 m cable included and extendable to 10 m",
      "7000 mAh rechargeable battery with USB Type-C charging",
      "±0.5 °C accuracy (±2 %RH on Pro)",
    ],
    faqs: [
      {
        question: "What is the difference between Veer and Veer Pro?",
        answer:
          "Veer has ten temperature sensors covering −100 to +200 °C. Veer Pro has ten temperature + humidity sensors covering −30 to +70 °C and 0–100 %RH.",
      },
      {
        question: "How long can the sensor cables be?",
        answer: "A 3 m cable is included. It can be extended to 50 m on Veer and to 10 m on Veer Pro.",
      },
      {
        question: "What if ten channels are not enough?",
        answer: "Virat provides 16 channels from one logger, and several loggers can be viewed together on the monitoring dashboard.",
      },
    ],
  },
  virat: {
    metaTitle: "Virat – 16-Channel WiFi Temperature Data Logger",
    metaDescription:
      "Virat 16 channel WiFi temperature data logger for large facilities and cold stores. Temperature or temperature + RH. From MRP ₹45,000 + 18% GST.",
    intro:
      "Virat is a 16 channel temperature data logger for large facilities. Sixteen sensors connect to one Wi-Fi logger, so big warehouses and cold stores can be monitored point by point without a separate device at each position.",
    measures: "16 × temperature, or 16 × temperature + humidity (Pro)",
    rangeSummary: "−100 to +200 °C · Pro: −30 to +70 °C, 0–100 %RH",
    keyFeatures: [
      "Sixteen measurement channels in one Wi-Fi logger",
      "Virat: 16 temperature sensors, −100 to +200 °C, 3 m cable included and extendable to 50 m",
      "Virat Pro: 16 temperature + humidity sensors, 3 m cable included and extendable to 10 m",
      "7000 mAh rechargeable battery with USB Type-C charging",
      "±0.5 °C accuracy (±2 %RH on Pro)",
    ],
    faqs: [
      {
        question: "What is the difference between Virat and Virat Pro?",
        answer:
          "Virat has sixteen temperature sensors covering −100 to +200 °C. Virat Pro has sixteen temperature + humidity sensors covering −30 to +70 °C and 0–100 %RH.",
      },
      {
        question: "Where is a 16-channel logger the right choice?",
        answer:
          "In large warehouses, cold stores and facilities with many monitoring points, where one logger with sixteen sensors is simpler to run than many separate devices.",
      },
      {
        question: "What if I need humidity as well as temperature?",
        answer:
          "Choose Virat Pro. Its sixteen sensors measure temperature and humidity, from −30 to +70 °C and 0–100 %RH.",
      },
    ],
  },
  vayu: {
    metaTitle: "Vayu – GSM Temperature & Humidity Data Logger",
    metaDescription:
      "Vayu GSM temperature data logger with SIM connectivity for remote sites and reefer trucks. Temperature + humidity. Price on request. Get a quote.",
    intro:
      "Vayu is a GSM temperature data logger that uses a SIM card instead of Wi-Fi. It measures temperature and humidity and suits remote sites, reefer trucks and outdoor locations where Wi-Fi does not reach.",
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
        question: "What does Vayu cost?",
        answer: "Vayu is priced on request. Call, WhatsApp or send an enquiry and we will share a quote.",
      },
    ],
  },
  accessories: {
    metaTitle: "Data Logger Accessories: Hooter & Charging Dock",
    metaDescription:
      "Accessories for Prithvi data loggers: external Wi-Fi hooter with door sensors for audible alarms, and a charging dock for spare batteries.",
    intro:
      "Accessories that extend your Prithvi data loggers: an external hooter with door sensors for audible on-site alarms, and a charging dock that keeps a charged spare battery ready.",
    measures: "Alarm, door sensing and battery charging",
    rangeSummary: "Up to 4 door sensors per hooter",
    keyFeatures: [
      "Wi-Fi hooter with instant audible alarms on any excursion",
      "Supports up to 4 door sensors, with an alarm if a door stays open beyond the set time",
      "One hooter can serve multiple loggers",
      "Logs door open/close and excursion events",
      "Charging dock keeps a charged spare battery ready, minimising downtime",
    ],
    faqs: [
      {
        question: "How many door sensors can one hooter support?",
        answer: "Up to 4 door sensors, with an alarm if a door stays open beyond the time you set.",
      },
      {
        question: "Can one hooter work with several loggers?",
        answer: "Yes. One hooter can serve multiple loggers.",
      },
      {
        question: "How is the hooter powered?",
        answer: "It uses a 12 V DC adapter with a 12 V external hooter. The cable length is configurable.",
      },
      {
        question: "What do the accessories cost?",
        answer: "Accessories are priced on request. Contact us for a quote with your loggers.",
      },
    ],
  },
};
