// Page copy for /industries/[slug] (brief §7.5).
// Rule (brief §1): product facts come only from docs/MASTER-BRIEF.md §2–§4.
// Everything else is general, reasoned wording: no invented specs, timings,
// statistics or guarantees, and no claims about specific regulations.
// Validated by `npm run check:data`.

export type IndustryFaq = { question: string; answer: string };

export type IndustryContent = {
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
    metaDescription:
      "Pharmaceutical temperature monitoring with WiFi data loggers: instant alerts, audit trail and reports that support GDP and 21 CFR Part 11 compliance.",
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
          "Our parent lab, VEGA Calibrations, which is NABL accredited to ISO/IEC 17025:2017.",
      },
    ],
  },
  "vaccine-cold-chain": {
    metaDescription:
      "Vaccine cold chain monitoring for refrigerators, cold rooms and reefer vehicles, with instant alerts and journey reports. Get a quote from Prithvi.",
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
    ],
  },
  "hospitals-blood-banks": {
    metaDescription:
      "Temperature monitoring for hospitals and blood banks: live alerts, on-site hooter alarms and door-open monitoring for fridges, pharmacies and labs.",
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
      "Complete digital records with an audit trail support accreditation and internal quality audits. We do not claim conformity with any specific hospital standard.",
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
    ],
  },
  "food-beverage": {
    metaDescription:
      "Temperature monitoring for food and beverage: cold storage, processing plants and kitchens, with automatic records and instant alerts. Get a quote.",
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
    ],
  },
  "logistics-warehousing": {
    metaDescription:
      "Warehouse and logistics temperature monitoring with 10 and 16 channel WiFi data loggers, consignment journey reports and multi-site dashboards.",
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
    ],
  },
  "data-centers": {
    metaDescription:
      "Server room and data centre temperature and humidity monitoring with WiFi data loggers and instant alerts to help prevent overheating.",
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
    ],
  },
  laboratories: {
    metaDescription:
      "Laboratory temperature monitoring for sample storage, testing and R&D, with external probes from −100 to +200 °C and a complete audit trail.",
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
    ],
  },
  chemical: {
    metaDescription:
      "Chemical storage temperature monitoring with 4 and 10 channel WiFi data loggers for stores, raw-material warehouses and process areas.",
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
    metaDescription:
      "Electronics manufacturing temperature and humidity monitoring for component stores, clean rooms and semiconductor facilities. Get a quote.",
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
    ],
  },
  textile: {
    metaDescription:
      "Textile humidity and temperature monitoring for yarn and fabric storage and production areas, with WiFi data loggers and instant alerts.",
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
    ],
  },
};
