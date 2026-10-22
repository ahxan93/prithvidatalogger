// Page copy for /industries/[slug] (brief §7.5).
// Rule (brief §1): product facts come only from docs/MASTER-BRIEF.md §2–§4.
// Everything else is general, reasoned wording: no invented specs, timings,
// statistics or guarantees, and no claims about specific regulations.
// Validated by `npm run check:data`.

export type IndustryFaq = { question: string; answer: string; link?: { href: string; text: string } };

export type IndustryContent = {
  /** <title> text when it should differ from the default "{name} Temperature Monitoring". */
  metaTitle?: string;
  /** H1 when it should differ from the default "{name} Temperature Monitoring". */
  h1?: string;
  /** One sentence placed before the intro paragraph (first 100 words). */
  lead?: string;
  /** Replaces the "Continuous Records, Instant Alerts" heading. */
  helpsHeading?: string;
  /** Meta description; ≤ 155 characters, unique. */
  metaDescription: string;
  /** Three everyday monitoring problems in this industry (general, reasoned). */
  challenges: string[];
  /** How Prithvi helps: each point maps to a product fact in the brief. */
  helps: { title: string; text: string }[];
  /** General compliance wording only. */
  compliance: string;
  faqs: IndustryFaq[];
};

export const industryContent: Record<string, IndustryContent> = {
  pharmaceutical: {
    metaTitle: "Pharma Warehouse Temperature Monitoring",
    h1: "Pharma Warehouse Temperature Monitoring",
    lead: "Pharma warehouse temperature monitoring gives QA a continuous record of every storage room, from the first shift to the last.",
    helpsHeading: "Warehouse Alerts and a Stability Chamber Data Logger",
    metaDescription:
      "Pharma warehouse temperature monitoring with WiFi loggers: instant alerts, audit trail and reports that support GDP and 21 CFR Part 11 compliance.",
    challenges: [
      "Storage rooms, warehouses and stability areas each have their own limits, and every one needs a continuous record.",
      "Manual readings leave gaps between checks, including nights and weekends.",
      "Hand-written log sheets are hard to review and easy to question during an audit.",
    ],
    helps: [
      {
        title: "Alerts that reach the right person",
        text: "Email, SMS, app and dashboard alerts when a room leaves its limits, escalating from Level 1 to Level 3 if nobody acknowledges.",
      },
      {
        title: "A record built for audits",
        text: "Role-based user access, a complete audit trail and acknowledgement notes for root cause and corrective action.",
      },
      {
        title: "No gaps during calibration",
        text: "A substitute device covers a logger that is away for calibration, and its data is merged back afterwards.",
      },
    ],
    compliance:
      "Role-based access and the audit trail support 21 CFR Part 11, GMP and GDP compliance. Qualification of the system (IQ, OQ, PQ) is available through VEGA Calibrations. Your own quality system defines the limits and procedures the loggers work to.",
    faqs: [
      {
        question: "Which data logger suits a medicine storage room?",
        answer:
          "Nakshatra records temperature and humidity in one device. Where a room or stability area needs several points, Rajmudra Pro covers two and Dhruva Pro covers four.",
      },
      {
        question: "Can the records be used in an audit?",
        answer:
          "Reports can be produced as a graph, a table or both, and exported to PDF, Excel or CSV. Calibration and mapping reports can be stored against each device and room.",
      },
      {
        question: "Who calibrates the loggers?",
        answer:
          "Our parent lab, VEGA Calibrations.",
      },
      {
        question: "Can one logger work as a stability chamber data logger?",
        answer:
          "Where the chamber's range suits it, yes. Rajmudra Pro records temperature and humidity at two points and Dhruva Pro at four, with the sensors on a cable so they sit inside the chamber while the logger stays outside.",
        link: { href: "/products/dhruva", text: "See the Dhruva multi-point logger" },
      },
    ],
  },
  "vaccine-cold-chain": {
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
  },
  "hospitals-blood-banks": {
    metaTitle: "Temperature & Humidity Data Logger for Hospitals",
    h1: "Temperature and Humidity Data Logger for Hospitals & Blood Banks",
    lead: "A temperature and humidity data logger for hospitals records fridges, pharmacies and labs continuously, so no department relies on manual rounds.",
    helpsHeading: "Temperature and Humidity Records Across Departments",
    metaDescription:
      "Temperature and humidity data logger for hospitals and blood banks: live alerts, on-site hooter alarms and door-open monitoring. Get a solution.",
    challenges: [
      "Blood, medicines and samples are stored around the clock, including when fewer staff are on duty.",
      "Refrigerators and stores are spread across departments and are hard to check by hand.",
      "A door left open can go unnoticed until stock is affected.",
    ],
    helps: [
      {
        title: "An alarm staff can hear",
        text: "The external hooter gives an audible alarm on any excursion and supports up to 4 door sensors.",
      },
      {
        title: "Every department on one screen",
        text: "Devices are organised by organisation, site, room and device, with role-based access for each team.",
      },
      {
        title: "Escalation if nobody responds",
        text: "An unacknowledged alert moves up from Level 1 to Level 2 and Level 3.",
      },
    ],
    compliance:
      "Complete digital records with an audit trail support internal quality audits. We do not claim conformity with any specific hospital standard.",
    faqs: [
      {
        question: "Which loggers suit blood bank refrigerators?",
        answer:
          "Setu records temperature for an individual unit. Nakshatra adds humidity for rooms and stores where both matter.",
      },
      {
        question: "Can staff be warned on site, not only by phone?",
        answer:
          "Yes. The external hooter sounds an alarm in the room when a limit is crossed or a door stays open beyond the set time.",
      },
      {
        question: "Can the pharmacy, lab and blood bank be viewed together?",
        answer:
          "Yes. All devices sit in one location hierarchy, and each user sees what their role allows.",
      },
      {
        question: "Which data logger with alarm suits a hospital pharmacy?",
        answer:
          "The external hooter gives an audible alarm on any excursion and supports up to 4 door sensors. Choose Nakshatra where humidity matters as well as temperature, and our team will confirm the hooter works with your model when we prepare your quote.",
        link: { href: "/products/accessories", text: "See the data logger with alarm accessories" },
      },
    ],
  },
  "food-beverage": {
    metaTitle: "Cold Storage Temperature Monitoring System",
    h1: "Cold Storage Temperature Monitoring System for Food & Beverage",
    lead: "A cold storage temperature monitoring system replaces paper log sheets with automatic records, so an overnight freezer failure is flagged before stock is lost.",
    helpsHeading: "Cold Room Data Logger Records, Instant Alerts",
    metaDescription:
      "Cold storage temperature monitoring system for food and beverage: automatic records, instant alerts, cold rooms and kitchens. Get a solution.",
    challenges: [
      "Chilled and frozen products must stay at the right temperature from receipt to service.",
      "Paper log sheets depend on someone remembering to check.",
      "A freezer failure overnight can spoil stock before the morning shift.",
    ],
    helps: [
      {
        title: "Logging without the clipboard",
        text: "Readings are recorded automatically at an interval you set, from 1 to 60 minutes.",
      },
      {
        title: "Probes for freezers",
        text: "Setu X carries an external probe rated from −100 to +200 °C for freezers and cold rooms.",
      },
      {
        title: "Alerts before stock is lost",
        text: "Email, SMS, app and dashboard alerts go out as soon as a reading leaves its limits.",
      },
    ],
    compliance:
      "Continuous temperature records can support a HACCP-based food safety plan. Your food safety team sets the critical limits; the loggers record and alert against them.",
    faqs: [
      {
        question: "Which logger is right for a walk-in freezer?",
        answer:
          "Setu X or Setu Pro X. The external probe goes inside the freezer and the logger stays outside.",
      },
      {
        question: "Are these suitable for a restaurant or cloud kitchen?",
        answer:
          "Yes. Setu or Nakshatra covers an individual fridge or freezer, and the external hooter adds an audible alarm in the kitchen.",
      },
      {
        question: "Can records be shared with an inspector?",
        answer: "Reports can be exported to PDF, Excel or CSV, as a graph, a table or both.",
      },
      {
        question: "Which cold room data logger suits a large cold store?",
        answer:
          "For a single cold room, Setu X or Setu Pro X puts the external probe inside the room while the logger stays outside. A large cold store with many points is covered by Virat, which connects sixteen sensors to one logger.",
        link: { href: "/products/virat", text: "See the 16-channel Virat logger" },
      },
    ],
  },
  "logistics-warehousing": {
    metaTitle: "Shipment Temperature Data Logger for Logistics",
    h1: "Shipment Temperature Data Logger for Logistics & Warehousing",
    lead: "A shipment temperature data logger produces a journey report for each trip, so a consignment's temperature can be checked after delivery.",
    helpsHeading: "Shipment and Warehouse Monitoring, Point by Point",
    metaDescription:
      "Shipment temperature data logger and warehouse monitoring: 10 and 16 channel WiFi loggers and consignment journey reports. Get a solution.",
    challenges: [
      "Large storage areas have hot and cold spots that a single sensor cannot see.",
      "Goods in transit are out of sight between dispatch and delivery.",
      "One team often has to watch several warehouses and distribution centres.",
    ],
    helps: [
      {
        title: "Many points from one logger",
        text: "Veer connects 10 sensors and Virat connects 16, with temperature sensor cables extendable to 50 m.",
      },
      {
        title: "Sensors in the right places",
        text: "A temperature mapping study by VEGA Calibrations identifies hot and cold spots and the right sensor positions.",
      },
      {
        title: "Records for every journey",
        text: "Consignment monitoring produces a journey report for each trip. GSM versions are available for vehicles.",
      },
    ],
    compliance:
      "The audit trail and reports support GDP compliance for medicine and healthcare supply chains. We make no claim about specific national rules.",
    faqs: [
      {
        question: "How many sensors does a warehouse need?",
        answer:
          "It depends on the size and layout. A temperature mapping study identifies the hot and cold spots and the right sensor positions.",
      },
      {
        question: "Should I choose Veer or Virat?",
        answer:
          "Veer has 10 channels and Virat has 16. Choose by the number of points you need to cover from one logger.",
      },
      {
        question: "Can several sites be monitored together?",
        answer:
          "Yes. The location hierarchy groups devices by organisation, site, room and device, so every warehouse appears in one place.",
      },
      {
        question: "Can I use a reefer container temperature data logger for loads in transit?",
        answer:
          "Reefer vehicles and containers are covered by consignment monitoring, which produces a journey report for each trip. Share the route and the load, and our team will recommend the logger. A mapping study can also show the right sensor positions inside a reefer vehicle.",
        link: { href: "/services/temperature-mapping", text: "See the temperature mapping service" },
      },
    ],
  },
  "data-centers": {
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
  },
  laboratories: {
    metaTitle: "Temperature & Humidity Data Logger for Laboratories",
    h1: "Temperature and Humidity Data Logger for Research Laboratories",
    lead: "A temperature and humidity data logger for laboratories gives every freezer, sample store and test area a complete history for review.",
    helpsHeading: "Temperature and Humidity Records for Sample Storage",
    metaDescription:
      "Temperature and humidity data logger for laboratories: sample storage, testing and R&D, external probes from −100 to +200 °C, complete audit trail.",
    challenges: [
      "Storage ranges from deep-freeze to room temperature, so one sensor type does not fit every unit.",
      "Samples can represent months of work that cannot easily be repeated.",
      "Results are harder to defend if storage conditions cannot be shown.",
    ],
    helps: [
      {
        title: "Probes for low temperatures",
        text: "Setu X uses an external probe rated from −100 to +200 °C on a 1 m cable.",
      },
      {
        title: "Two points side by side",
        text: "Rajmudra records two temperature channels at once, which suits comparative studies.",
      },
      {
        title: "Traceable records",
        text: "A complete audit trail, with calibration reports stored against each device.",
      },
    ],
    compliance:
      "Timestamped records with an audit trail support data-integrity expectations, and the platform supports 21 CFR Part 11 compliance. Your quality system defines how it is applied.",
    faqs: [
      {
        question: "Which logger works for a laboratory freezer?",
        answer:
          "Setu X. Its probe is rated down to −100 °C and sits inside the freezer on a 1 m cable.",
      },
      {
        question: "Can I compare two chambers or two positions?",
        answer:
          "Yes. Rajmudra is a two-channel logger, so both points are recorded together.",
      },
      {
        question: "Can calibration certificates be kept with the data?",
        answer:
          "Yes. Calibration and mapping reports can be stored against each device and room, ready for audits.",
      },
      {
        question: "Which temperature and humidity data logger suits a lab storeroom?",
        answer:
          "Nakshatra measures −30 to +70 °C and 0–100 %RH from one logger. For a deep freezer, choose Setu X, whose external probe is rated down to −100 °C.",
        link: { href: "/products/nakshatra", text: "See the Nakshatra logger" },
      },
    ],
  },
  chemical: {
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
  },
  electronics: {
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
  },
  textile: {
    metaTitle: "Temperature & Humidity Data Logger for Textiles",
    h1: "Temperature and Humidity Data Logger for Textile Mills",
    lead: "A temperature and humidity data logger in each store and production area shows when humidity drifts, before yarn or fabric is affected.",
    helpsHeading: "Humidity and Temperature Records by Area",
    metaDescription:
      "Temperature and humidity data logger for yarn and fabric storage and production areas, with instant alerts. Get a solution from Prithvi.",
    challenges: [
      "Yarn and fabric react to humidity, which affects quality and how production runs.",
      "Conditions differ between stores and production areas.",
      "Manual checks miss the changes that happen between rounds.",
    ],
    helps: [
      {
        title: "Humidity and temperature together",
        text: "Nakshatra measures 0–100 %RH and −30 to +70 °C from one logger.",
      },
      {
        title: "Ten points across a mill",
        text: "Veer Pro connects ten temperature + humidity sensors to a single logger.",
      },
      {
        title: "Alerts when humidity drifts",
        text: "Email, SMS, app and dashboard alerts when a reading leaves the limits you set.",
      },
    ],
    compliance:
      "No regulatory claim is made here. You set the humidity and temperature limits your materials need, and the loggers record and alert against them.",
    faqs: [
      {
        question: "Which logger suits a yarn store?",
        answer:
          "Nakshatra, which measures both humidity and temperature. Veer Pro covers ten points for larger areas.",
      },
      {
        question: "What humidity range is covered?",
        answer: "0–100 %RH, with ±2 %RH accuracy, on the RH models.",
      },
      {
        question: "Can production and storage be logged separately?",
        answer:
          "Yes. Each room is its own location in the dashboard hierarchy, so stores and production areas are viewed separately.",
      },
      {
        question: "Do I need a temperature and humidity data logger in every room?",
        answer:
          "Each room is its own location on the dashboard, so you can place a Nakshatra in each store, or use Veer Pro to cover up to ten points from one logger.",
        link: { href: "/products/nakshatra", text: "See the Nakshatra logger" },
      },
    ],
  },
};
