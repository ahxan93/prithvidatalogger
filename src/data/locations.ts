// Location tree. Source of truth: docs/MASTER-BRIEF.md §7.9.
// Rules: every indexable node has genuinely unique copy (no shared paragraphs);
// no country-specific regulations, delivery times or statistics; contact
// details only from src/config/site.ts. Nodes with `indexable: false` are
// rendered noindex and left out of sitemap.xml.

export type LocationType = "country" | "state" | "city";

export type LocationFaq = { question: string; answer: string };

export type LocationNode = {
  slug: string;
  name: string;
  type: LocationType;
  /** Unique intro paragraph. */
  intro: string;
  /** Industries we serve there. */
  localIndustries: string[];
  /** Cities (for a country/state) or areas (for a city) we supply. */
  citiesServed: string[];
  /** How supply and support work for this place. */
  supportNote: string;
  faqs: LocationFaq[];
  /** Only true once the node has genuinely unique content. */
  indexable: boolean;
  /** Brief §5 keyword map; undefined where the brief sets none. */
  seo?: { primaryKeyword: string; supporting: string[] };
  children?: LocationNode[];
};

export const locations: LocationNode[] = [
  {
    slug: "india",
    name: "India",
    type: "country",
    intro:
      "Prithvi Data Loggers is based in Mumbai and supplies WiFi and GSM temperature and humidity data loggers to businesses across India. Our parent company, VEGA Calibrations, is an NABL-accredited calibration laboratory, so the team that supplies your loggers can also calibrate them and map your storage areas. Pharma plants, cold chain operators, hospitals, food businesses and warehouses use our loggers to replace manual readings with live, audit-ready records.",
    localIndustries: [
      "Pharmaceutical manufacturing and distribution",
      "Vaccine and cold chain logistics",
      "Hospitals and blood banks",
      "Food processing and cold storage",
      "Warehousing and distribution",
    ],
    citiesServed: ["Mumbai", "Pune", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Ahmedabad", "Kolkata"],
    supportNote:
      "Loggers are dispatched from our Mumbai office. Our team helps you with Wi-Fi setup, alert rules and dashboard access by phone, WhatsApp or video call. Calibration and temperature mapping are delivered by VEGA Calibrations; tell us your location and we will confirm what can be arranged.",
    faqs: [
      {
        question: "Do you supply data loggers outside Maharashtra?",
        answer:
          "Yes. We supply across India from Mumbai, and setup support is given remotely by phone, WhatsApp or video call.",
      },
      {
        question: "How do we find out the price?",
        answer:
          "Share your requirement and we will send a clear quote.",
      },
      {
        question: "Can my loggers be calibrated in India?",
        answer:
          "Yes. Calibration is carried out by our parent company, VEGA Calibrations, an NABL-accredited (ISO/IEC 17025:2017) laboratory. Certificates are traceable to national standards.",
      },
    ],
    indexable: true,
    children: [
      {
        slug: "maharashtra",
        name: "Maharashtra",
        type: "state",
        intro:
          "Maharashtra is our home state, with a busy mix of pharmaceutical units, logistics parks, food-processing plants and hospitals. From our Mumbai office we supply data loggers to sites across the state, from Thane and Navi Mumbai to Pune, Nashik and Nagpur, and help teams move from paper logs to live monitoring.",
        localIndustries: [
          "Pharmaceutical and API units",
          "Warehousing and logistics parks",
          "Food processing and cold storage",
          "Hospitals and diagnostic labs",
          "Server rooms and data centres",
        ],
        citiesServed: [
          "Mumbai",
          "Thane",
          "Navi Mumbai",
          "Pune",
          "Nashik",
          "Nagpur",
          "Chhatrapati Sambhajinagar",
        ],
        supportNote:
          "Working in the same state as our head office keeps coordination simple. Orders leave from Mumbai, and our team guides installation and alert setup with you. For calibration or temperature mapping at a site in Maharashtra, contact us to plan it with VEGA Calibrations.",
        faqs: [
          {
            question: "Where is your office in Maharashtra?",
            answer:
              "Our head office is in Mumbai. The full address is on our contact page.",
          },
          {
            question: "Which logger suits a large warehouse near Mumbai or Pune?",
            answer:
              "For many monitoring points, a multi-channel logger such as Veer (10 channels) or Virat (16 channels) covers the space from one device. Where Wi-Fi does not reach, the GSM-based Vayu is an option.",
          },
        ],
        indexable: true,
        children: [
          {
            slug: "mumbai",
            name: "Mumbai",
            type: "city",
            intro:
              "Mumbai is where our head office is, and where many of the pharma distributors, hospitals, cold stores and logistics firms we work with are based. Customers in the city can speak to our team directly, plan calibration or temperature mapping with VEGA Calibrations, our parent laboratory, and get help setting up live monitoring across one site or several.",
            localIndustries: [
              "Pharma distributors and stockists",
              "Hospitals, blood banks and diagnostic labs",
              "Cold storage and food businesses",
              "Restaurants and cloud kitchens",
              "Port-linked logistics and warehousing",
            ],
            citiesServed: ["South Mumbai", "Western suburbs", "Central suburbs", "Navi Mumbai", "Thane"],
            supportNote:
              "Because our team is based in Mumbai, it is straightforward to coordinate installation guidance, calibration and mapping work in the city. Call or WhatsApp us to discuss your site.",
            faqs: [
              {
                question: "Can I visit your Mumbai office?",
                answer:
                  "Visits are by appointment only. Please call ahead to book a visit.",
              },
              {
                question: "Can VEGA calibrate data loggers we already own?",
                answer:
                  "Calibration of temperature and humidity instruments and data loggers is part of VEGA Calibrations' NABL-accredited scope. Share your instrument details and we will confirm.",
              },
            ],
            indexable: true,
          },
        ],
      },
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    type: "country",
    intro:
      "Saudi Arabia's pharmaceutical, food and healthcare supply chains stretch across long distances between ports, cities and regional warehouses. Prithvi Data Loggers supplies WiFi loggers for warehouses, cold rooms and pharmacies, so temperature records stay complete from a distribution centre in Riyadh to a pharmacy in Jeddah.",
    localIndustries: [
      "Pharmaceutical warehousing and distribution",
      "Hospitals and medical supply",
      "Food and dairy cold chain",
      "Long-haul reefer transport",
      "Retail distribution centres",
    ],
    citiesServed: ["Riyadh", "Jeddah", "Dammam", "Al Khobar"],
    supportNote:
      "Share your sites and requirements by WhatsApp or the enquiry form. We recommend models, send a quote, dispatch from India and then set up the loggers, alerts and user access with your team over a video call.",
    faqs: [
      {
        question: "Can we keep records for consignments travelling between Saudi cities?",
        answer:
          "Consignment monitoring produces a journey report for each trip. For vehicles, ask about our GSM versions and we will check network compatibility in Saudi Arabia before you order.",
      },
      {
        question: "Can we see warehouses in Riyadh and Jeddah on one screen?",
        answer:
          "Yes. The monitoring dashboard groups devices by organisation, site, room and device, so every location appears in one place.",
      },
    ],
    indexable: true,
    seo: {
      primaryKeyword: "temperature data logger Saudi Arabia",
      supporting: ["Riyadh", "Jeddah", "Dammam"],
    },
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    type: "country",
    intro:
      "The UAE is a trading and re-export hub for the Gulf, with food, medicines and healthcare products moving through its ports, free zones and warehouses every day. We supply WiFi temperature and humidity data loggers to UAE businesses from India, with live alerts that help teams in Dubai, Abu Dhabi and Sharjah protect stock in a hot climate.",
    localIndustries: [
      "Free-zone and port warehousing",
      "Food import and distribution",
      "Pharmaceutical and healthcare distribution",
      "Hospitality and catering",
      "Reefer transport",
    ],
    citiesServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    supportNote:
      "International orders follow a simple path: enquiry, quote, dispatch from India and remote setup support. Our team configures Wi-Fi, alert recipients and escalation levels with you once the loggers arrive.",
    faqs: [
      {
        question: "Do you supply data loggers to the UAE?",
        answer:
          "Yes. We supply from India and support installation remotely by phone, WhatsApp or video call.",
      },
      {
        question: "Can we monitor stores in different emirates from one dashboard?",
        answer:
          "Yes. Multi-site monitoring lets you view every store, room and device together, with alerts sent to the right people at each site.",
      },
    ],
    indexable: true,
    seo: {
      primaryKeyword: "temperature data logger UAE",
      supporting: ["Dubai cold chain monitoring", "Abu Dhabi cold chain monitoring"],
    },
    children: [
      {
        slug: "dubai",
        name: "Dubai",
        type: "city",
        intro:
          "Dubai's hotels, cold stores, clinics, pharmacies and food distributors all have to keep stock at the right temperature while summer heat works against their refrigeration. Our loggers send live readings and instant alerts, so a cooling failure in a store in Al Quoz or a warehouse near Jebel Ali is noticed straight away rather than at the next manual check.",
        localIndustries: [
          "Hotels, restaurants and catering kitchens",
          "Cold stores and food distributors",
          "Clinics, pharmacies and medical stores",
          "Logistics warehouses",
          "Last-mile delivery fleets",
        ],
        citiesServed: ["Jebel Ali", "Al Quoz", "Dubai Investments Park", "Deira", "Dubai South"],
        supportNote:
          "Loggers for Dubai sites are shipped from India. Once they arrive, we walk your team through connecting them to Wi-Fi and setting alert limits, so monitoring starts without anyone needing to fly in.",
        faqs: [
          {
            question: "Will WiFi loggers work in a large warehouse with tall racking?",
            answer:
              "Multi-channel loggers place several probes from one device, which helps in large or obstructed spaces. LoRa versions with long-range radio are available on request.",
          },
          {
            question: "What suits a hotel or restaurant kitchen?",
            answer:
              "Setu or Nakshatra loggers suit individual fridges and freezers. The external hooter adds an audible alarm in the kitchen when a temperature goes out of range or a door is left open.",
          },
        ],
        indexable: true,
      },
    ],
  },
  {
    slug: "qatar",
    name: "Qatar",
    type: "country",
    intro:
      "Much of the food and many of the medicines used in Qatar are imported, and they must stay within range from the port all the way to the shelf. Prithvi loggers give hospitals, hotels, caterers and distributors in Doha a continuous temperature record and an alert the moment a fridge, freezer or cold room drifts.",
    localIndustries: [
      "Food import and cold storage",
      "Hospitals and clinics",
      "Hotels and catering",
      "Pharmaceutical distribution",
    ],
    citiesServed: ["Doha", "Al Rayyan", "Al Wakrah", "Lusail"],
    supportNote:
      "Send us your requirements and we will recommend the right mix of loggers and accessories. After dispatch from India, our team supports setup over WhatsApp or a video call.",
    faqs: [
      {
        question: "We have many fridges across one hotel. How is that managed?",
        answer:
          "Each fridge gets its own logger, and all of them appear on one dashboard with alerts sent to the kitchen and engineering teams.",
      },
      {
        question: "How do we order from Qatar?",
        answer:
          "Call, WhatsApp or use the enquiry form. We discuss your needs, send a quote and arrange dispatch from India.",
      },
    ],
    indexable: true,
  },
  {
    slug: "oman",
    name: "Oman",
    type: "country",
    intro:
      "Oman's fisheries, food distributors and hospitals depend on dependable cold storage, from seafood freezers on the coast to medicine stores in Muscat. Prithvi supplies loggers that record temperature continuously and raise an alert as soon as a freezer or cold room starts to drift.",
    localIndustries: [
      "Fisheries and seafood cold storage",
      "Food distribution",
      "Hospitals and pharmacies",
      "Port and logistics warehousing",
    ],
    citiesServed: ["Muscat", "Sohar", "Salalah", "Nizwa"],
    supportNote:
      "We quote from India, dispatch the loggers and then help your staff connect and configure them remotely. If a site has no Wi-Fi, ask us about GSM versions and we will check network compatibility in Oman first.",
    faqs: [
      {
        question: "Which logger can monitor a deep freezer for seafood?",
        answer:
          "Setu X uses an external probe rated from −100 to +200 °C, so the probe can sit inside the freezer while the logger stays outside.",
      },
      {
        question: "Our site is inland with weak Wi-Fi. What can we use?",
        answer:
          "GSM versions are available for sites without Wi-Fi. Network compatibility in Oman must be confirmed with us before ordering.",
      },
    ],
    indexable: true,
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    type: "country",
    intro:
      "In Kuwait, long and very hot summers put constant pressure on refrigeration in warehouses, pharmacies, co-operative stores and food outlets. Prithvi data loggers watch those fridges and cold rooms around the clock and alert your team when temperature or humidity moves outside the limits you set.",
    localIndustries: [
      "Food retail and co-operative stores",
      "Pharmacies and medical stores",
      "Hospitals and laboratories",
      "Warehousing",
    ],
    citiesServed: ["Kuwait City", "Hawalli", "Farwaniya", "Ahmadi", "Jahra"],
    supportNote:
      "Tell us how many rooms and units you need to cover. We prepare a quote, ship from India and help you set up alerts and user access over a call.",
    faqs: [
      {
        question: "What happens if the internet goes down?",
        answer:
          "The logger keeps recording to its internal memory (up to 1,00,000 records) on battery power, and data can also be downloaded offline through the PC software.",
      },
      {
        question: "Which logger is right for a pharmacy?",
        answer:
          "Nakshatra records both temperature and humidity, which suits medicine shelves and storerooms.",
      },
    ],
    indexable: true,
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    type: "country",
    intro:
      "Bahrain's food distributors, hospitals, pharmacies and logistics firms work in a compact market with close road links to Saudi Arabia. With multi-site monitoring, a team in Manama can watch stores in Bahrain and across the causeway from one dashboard, with every reading and alert kept on record.",
    localIndustries: [
      "Food distribution",
      "Hospitals and pharmacies",
      "Logistics and cross-border transport",
      "Hospitality",
    ],
    citiesServed: ["Manama", "Muharraq", "Riffa", "Sitra"],
    supportNote:
      "Our team handles Bahrain enquiries directly from India: we confirm the right models, quote, dispatch and then guide your staff through setup remotely.",
    faqs: [
      {
        question: "Can we track temperature on trucks crossing into Saudi Arabia?",
        answer:
          "Consignment monitoring creates a journey report for each trip. For trucks, ask about GSM versions and we will confirm network compatibility along your route first.",
      },
      {
        question: "Do we need separate accounts for each site?",
        answer:
          "No. Sites, rooms and devices are organised in one hierarchy, with role-based access for each user.",
      },
    ],
    indexable: true,
  },
  {
    slug: "yemen",
    name: "Yemen",
    type: "country",
    intro:
      "Healthcare providers and distributors in Yemen store medicines, vaccines and food in conditions where power and connectivity are not always reliable. Prithvi loggers keep recording on battery to internal memory, which helps keep temperature records complete when power or Wi-Fi is interrupted.",
    localIndustries: [
      "Healthcare and medical stores",
      "Vaccine and medicine storage",
      "Food storage and distribution",
    ],
    citiesServed: ["Sana'a", "Aden"],
    supportNote:
      "Supply to Yemen is arranged case by case. Contact us with your location and requirements, and we will confirm what is possible before quoting.",
    faqs: [
      {
        question: "How long does the battery last if power is cut?",
        answer:
          "Battery life is about 3 months at a 10-minute logging interval, and the logger keeps recording during power cuts.",
      },
      {
        question: "How do we start an enquiry from Yemen?",
        answer:
          "Send your requirements by WhatsApp or the enquiry form and our team will reply to discuss supply.",
      },
    ],
    indexable: true,
  },
];

/**
 * Owner decision (brief §1): Vayu/GSM network compatibility outside India is not
 * confirmed. The location template shows this note on every non-India page.
 * It is kept out of the per-page copy so it doesn't count as duplicated content.
 */
export const GSM_NETWORK_NOTE =
  "GSM versions are available. Contact us to confirm network compatibility for your country.";

/** True for every location outside India (where the GSM note must be shown). */
export function needsGsmNetworkNote(path: string[]): boolean {
  return path[0] !== "india";
}

export type ResolvedLocation = {
  node: LocationNode;
  /** Slug segments from the root, e.g. ["india", "maharashtra", "mumbai"]. */
  path: string[];
  /** Nodes from the country down to (and including) `node`. */
  trail: LocationNode[];
};

/** Every node in the tree, depth-first, with its full slug path. */
export function getAllLocations(
  nodes: LocationNode[] = locations,
  parentTrail: LocationNode[] = [],
): ResolvedLocation[] {
  return nodes.flatMap((node) => {
    const trail = [...parentTrail, node];
    const resolved: ResolvedLocation = {
      node,
      path: trail.map((n) => n.slug),
      trail,
    };
    return [resolved, ...getAllLocations(node.children ?? [], trail)];
  });
}

/** Resolves a slug path like ["india", "maharashtra"] to a node, or undefined if unknown. */
export function findLocation(path: string[]): ResolvedLocation | undefined {
  const trail: LocationNode[] = [];
  let level: LocationNode[] | undefined = locations;

  for (const slug of path) {
    const node: LocationNode | undefined = level?.find((n) => n.slug === slug);
    if (!node) return undefined;
    trail.push(node);
    level = node.children;
  }

  const node = trail.at(-1);
  return node ? { node, path, trail } : undefined;
}

export function locationHref(path: string[]): string {
  return `/locations/${path.join("/")}`;
}
