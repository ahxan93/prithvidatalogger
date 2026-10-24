// /industries/vaccine-cold-chain | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "vaccine-cold-chain",
  name: "Vaccine & Cold Chain",
  summary: "Live monitoring for vaccine fridges, cold rooms and every leg of the journey.",
  applications: [
    "Vaccine refrigerators",
    "Cold rooms",
    "Reefer trucks and containers",
    "Last-mile delivery",
  ],
  recommended: ["setu-x", "nakshatra", "vayu"],
  whyItMatters:
    "Vaccines stay effective only inside a narrow temperature band, and one unnoticed excursion can mean discarding a whole batch. Real-time alerts and in-transit monitoring show exactly where and when a problem started, from the cold room to the delivery point.",
  image: "/images/industries/vaccine-cold-chain.webp",
  seo: {
    primaryKeyword: "vaccine cold chain monitoring",
    supporting: ["vaccine refrigerator data logger"],
  },
};

export const content: IndustryContent = {
  metaTitle: "Vaccine Temperature Data Logger for Cold Chain",
  h1: "Vaccine Temperature Data Logger for Cold Chain Monitoring",
  lead: "A vaccine temperature data logger keeps a timestamped record of every reading, which is the basis of cold chain temperature monitoring from cold room to delivery.",
  helpsHeading: "Cold Chain Temperature Monitoring, Cold Room to Delivery",
  metaDescription:
    "Vaccine temperature data logger and cold chain temperature monitoring for fridges, cold rooms and reefer trucks, with journey reports. Get a solution.",
  challenges: [
    "Vaccines must stay inside a narrow temperature band from the cold room to the point of use.",
    "A refrigerator can fail, or a door can be left open, when nobody is nearby.",
    "Once a consignment leaves the store, its temperature is out of sight.",
  ],
  helps: [
    {
      title: "Alarms on site and on your phone",
      text: "Instant alerts, plus an external hooter and door sensors that flag a door left open beyond the set time.",
    },
    {
      title: "A probe inside the unit",
      text: "Setu X uses an external probe on a 1 m cable, rated from −100 to +200 °C, so the probe sits inside the refrigerator or freezer.",
    },
    {
      title: "Visibility in transit",
      text: "Consignment monitoring produces a journey report for each trip. GSM versions are available for vehicles.",
    },
  ],
  compliance:
    "Continuous, timestamped records help you show that storage stayed within the range your guidelines set. We keep this wording general and make no claim about any specific national regulation.",
  faqs: [
    {
      question: "Which logger should I use for a vaccine refrigerator?",
      answer:
        "Setu X, with its external probe placed inside the unit. For a cold room where humidity also matters, Nakshatra measures both temperature and humidity.",
    },
    {
      question: "Can vaccines be monitored during transport?",
      answer:
        "Consignment monitoring creates a journey report for each trip, and Vayu is our SIM-based GSM logger. Outside India, contact us to confirm network compatibility for your country.",
    },
    {
      question: "Is data lost if the connection drops?",
      answer:
        "No. Each logger stores up to 1,00,000 records in its own memory, and data can be downloaded offline through the PC software.",
    },
    {
      question: "How do I set up cold chain temperature monitoring for vaccines?",
      answer:
        "Place a logger in each refrigerator and cold room, set the alert limits your guidelines require, and use consignment monitoring so each trip has its own journey report. A mapping study can show where the sensors should go.",
      link: { href: "/services/temperature-mapping", text: "Read about our temperature mapping service" },
    },
  ],
};
