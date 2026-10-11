// Homepage copy. Source of truth: docs/MASTER-BRIEF.md §7.1.
// Facts only from the brief: no statistics, delivery times, warranty or
// response-time promises, and never the cloud software's name.

/** Icon keys are mapped to components in the homepage sections. */
export type HomeIcon =
  | "activity" | "badge-check" | "map" | "shield-check" | "wrench"
  | "bell-ring" | "trending-down" | "file-check" | "clipboard-x" | "layers"
  | "door-open" | "refresh-cw" | "monitor" | "flask-conical" | "indian-rupee"
  | "headset" | "globe" | "list-checks" | "message-circle" | "handshake" | "truck";

export type HomeCard = { icon: HomeIcon; title: string; description: string; href?: string };

export const hero = {
  h1Lead: "WiFi Temperature & Humidity Data Loggers",
  h1Accent: "for Real-Time Monitoring",
  sub: "Protect medicines, vaccines, food and critical environments with live readings, instant alerts and audit-ready records, backed by an NABL-accredited calibration lab.",
  trust: ["NABL / ISO 17025 parent lab", "Supports 21 CFR Part 11", "India & GCC"],
  imageAlt:
    "Nakshatra WiFi temperature and humidity data logger showing a live reading on its display",
  chips: { alert: "Alert sent to QA team", door: "Door closed", sync: "Synced 1 min ago" },
} as const;

/** "What we do" strip (5 cards). */
export const whatWeDo: HomeCard[] = [
  {
    icon: "activity",
    title: "Real-Time Monitoring Data Loggers",
    description: "WiFi and GSM loggers that send live readings and instant alerts to your team.",
    href: "/products",
  },
  {
    icon: "badge-check",
    title: "NABL Calibration",
    description: "ISO/IEC 17025:2017 accredited calibration through our parent lab, VEGA Calibrations.",
    href: "/services/calibration",
  },
  {
    icon: "map",
    title: "Temperature Mapping",
    description: "Find hot and cold spots and the right sensor positions in rooms, freezers and vehicles.",
    href: "/services/temperature-mapping",
  },
  {
    icon: "shield-check",
    title: "Validation (IQ/OQ/PQ)",
    description: "Qualification and software validation that helps you meet GMP, GDP and WHO guidelines.",
    href: "/services/validation",
  },
  {
    icon: "wrench",
    title: "Installation & Support",
    description: "Help from enquiry to installation: setup, alert rules and user access.",
    href: "/contact",
  },
];

/** "Why Real-Time Data Loggers Pay for Themselves" (8 cards). */
export const benefits: HomeCard[] = [
  {
    icon: "bell-ring",
    title: "Instant excursion alerts",
    description: "Email, SMS, app and dashboard alerts the moment a reading leaves its limits.",
  },
  {
    icon: "trending-down",
    title: "Less product loss",
    description: "Act on a failing fridge or cold room before stock has to be discarded.",
  },
  {
    icon: "file-check",
    title: "Audit-ready digital records",
    description: "Complete, timestamped history with an audit trail, exported to PDF, Excel or CSV.",
  },
  {
    icon: "clipboard-x",
    title: "No manual readings",
    description: "Replace clipboards and log sheets with automatic logging every 1–60 minutes.",
  },
  {
    icon: "layers",
    title: "Multi-level escalation",
    description: "If an alert isn't acknowledged, it moves up from Level 1 to Level 2 and Level 3.",
  },
  {
    icon: "door-open",
    title: "Door-open monitoring",
    description: "Door sensors and an on-site hooter flag doors left open beyond the set time.",
  },
  {
    icon: "refresh-cw",
    title: "No data gaps during calibration",
    description: "A substitute device covers the gap, and its data is merged back afterwards.",
  },
  {
    icon: "monitor",
    title: "Monitor every site from one screen",
    description: "Organisation, site, room and device in one view, with role-based access.",
  },
];

/** Industries shown on the homepage (8 of 10). */
export const featuredIndustrySlugs = [
  "pharmaceutical",
  "vaccine-cold-chain",
  "hospitals-blood-banks",
  "food-beverage",
  "logistics-warehousing",
  "laboratories",
  "data-centers",
  "electronics",
];

/** "Why Prithvi" (6 points). */
export const whyPrithvi: HomeCard[] = [
  {
    icon: "badge-check",
    title: "Parent NABL-accredited lab",
    description: "Backed by VEGA Calibrations, accredited to ISO/IEC 17025:2017 and certified to ISO 9001:2015.",
  },
  {
    icon: "flask-conical",
    title: "In-house calibration & mapping",
    description: "Calibration, temperature mapping and validation from the same group that supplies your loggers.",
  },
  {
    icon: "indian-rupee",
    title: "Transparent MRP pricing",
    description: "MRP is shown openly with GST stated separately, and there are no hidden charges.",
  },
  {
    icon: "headset",
    title: "Fast, responsive support",
    description: "Talk to the team directly by phone or WhatsApp, from first question to after-sales help.",
  },
  {
    icon: "globe",
    title: "India & GCC supply",
    description: "Supplied across India and to Saudi Arabia, the UAE, Qatar, Oman, Kuwait, Bahrain and Yemen.",
  },
  {
    icon: "wrench",
    title: "Installation guidance",
    description: "Help with Wi-Fi setup, sensor placement, alert limits and user access.",
  },
];

/** "How buying works" (4 steps). */
export const buyingSteps: HomeCard[] = [
  {
    icon: "list-checks",
    title: "Choose a product",
    description: "Browse the range, or tell us what you need to monitor and we'll suggest options.",
  },
  {
    icon: "message-circle",
    title: "Call, WhatsApp or enquire",
    description: "Reach us however suits you. There is no online checkout.",
  },
  {
    icon: "handshake",
    title: "Expert consultation & quote",
    description: "We confirm the right models and send a clear quote: MRP plus 18% GST.",
  },
  {
    icon: "truck",
    title: "Delivery & installation support",
    description: "We dispatch your loggers and help you set them up and start monitoring.",
  },
];

/** Homepage FAQ (6). Rendered visibly and as FAQPage JSON-LD. */
export const homeFaqs: { question: string; answer: string }[] = [
  {
    question: "What is the difference between WiFi and GSM data loggers?",
    answer:
      "WiFi loggers suit sites that already have Wi-Fi, such as stores, labs and warehouses. GSM loggers use a SIM card and work where there is mobile coverage, which suits remote sites and vehicles. LoRa versions with long-range radio are also available on request. Outside India, contact us to confirm GSM network compatibility for your country.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "About 3 months at a 10-minute logging interval. Batteries are rechargeable Li-ion with universal USB Type-C charging. Pro versions of Setu and Nakshatra carry a high-capacity 7000 + 7000 mAh battery, and the Charging Dock keeps a charged spare ready.",
  },
  {
    question: "What happens to the data if the internet goes down?",
    answer:
      "The logger keeps recording to its internal memory, which holds up to 1,00,000 records. Data can also be downloaded offline using the PC software.",
  },
  {
    question: "Can you provide calibration certificates?",
    answer:
      "Yes. Calibration is carried out by our parent company, VEGA Calibrations, an NABL-accredited (ISO/IEC 17025:2017) laboratory. Certificates are traceable to national standards.",
  },
  {
    question: "Do you supply data loggers to GCC countries?",
    answer:
      "Yes. We supply to Saudi Arabia, the UAE, Qatar, Oman, Kuwait and Bahrain from India, and to Yemen case by case. After dispatch, our team supports setup remotely by phone, WhatsApp or video call.",
  },
  {
    question: "How do I order?",
    answer:
      "Call, WhatsApp or send an enquiry. Our team discusses your requirements and sends a quote showing the MRP plus 18% GST. Purchase is completed offline; there is no online checkout.",
  },
];
