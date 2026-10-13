// Location tree. Source of truth: docs/MASTER-BRIEF.md §7.9.
// Rules: every indexable node has genuinely unique copy (no shared paragraphs);
// no country-specific regulations, delivery times or statistics; contact
// details only from src/config/site.ts. Nodes with `indexable: false` are
// rendered noindex and left out of sitemap.xml.

import { areas } from "./areas.ts";

export type LocationType = "country" | "state" | "city";

export type LocationFaq = { question: string; answer: string };

/** Fields every node shares. */
type NodeBase = {
  slug: string;
  name: string;
  type: LocationType;
  /** Only true once the node passes every rule in docs/LOCATION-PAGES-PLAYBOOK.md. */
  indexable: boolean;
  /** Brief §5 keyword map; undefined where the brief sets none. */
  seo?: { primaryKeyword: string; supporting: string[] };
};

/**
 * Country and state hubs, plus any city not yet upgraded to the playbook
 * template (those are indexable: false until their own prompt runs).
 */
export type LegacyLocationNode = NodeBase & {
  /** Unique intro paragraph. */
  intro: string;
  /** Industries we serve there. */
  localIndustries: string[];
  /** Cities (for a country/state) or areas (for a city) we supply. */
  citiesServed: string[];
  /** How supply and support work for this place. */
  supportNote: string;
  faqs: LocationFaq[];
  children?: LocationNode[];
};

/**
 * A city page built to docs/LOCATION-PAGES-PLAYBOOK.md section 3 (12 sections).
 * Every field is unique to the city; nothing here may be copied to another city.
 */
export type CityLocationNode = NodeBase & {
  type: "city";
  /** 120-180 words: the city's industrial character and why monitoring matters there. */
  intro: string;
  /** One or two sentences on the local climate and what it means for monitoring. */
  climateAngle: string;
  /** Industrial areas we serve, each with an area-specific one-line note. */
  areas: { name: string; note: string }[];
  /** 3-5 industries: slug of an industry page plus a city-specific sentence. */
  industries: { slug: string; sentence: string }[];
  /** Exactly 3 series (never Vayu outside India) with a reason tied to the city. */
  recommendedSeries: { slug: string; reason: string }[];
  /** 4 city-specific questions, shown on the page and in FAQPage JSON-LD. */
  faqs: LocationFaq[];
  /** 2-3 nearby cities; linked once their own page exists. */
  nearby: { slug: string; name: string }[];
  /** At most 60 characters, includes the brand suffix. */
  metaTitle: string;
  /** At most 155 characters, unique. */
  metaDescription: string;
  children?: undefined;
};

export type LocationNode = LegacyLocationNode | CityLocationNode;

/** True for nodes built to the playbook's city template. */
export function isCityPage(node: LocationNode): node is CityLocationNode {
  return "climateAngle" in node;
}

export const locations: LegacyLocationNode[] = [
  {
    slug: "india",
    name: "India",
    type: "country",
    intro:
      "Prithvi Data Loggers is based in Mumbai and supplies WiFi and GSM temperature and humidity data loggers to businesses across India. Our parent company, VEGA Calibrations, is a calibration laboratory, so the team that supplies your loggers can also calibrate them and map your storage areas. Pharma plants, cold chain operators, hospitals, food businesses and warehouses use our loggers to replace manual readings with live, audit-ready records.",
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
          "Yes. Calibration is carried out by our parent company, VEGA Calibrations. Certificates are traceable to national standards.",
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
              "Mumbai is where Prithvi Data Loggers is based, and it is a city of dense, mixed-use storage: pharma head offices and distributors, hospitals and blood banks, cold stores and food businesses, and the server rooms that keep them running. A temperature data logger in Mumbai has to cope with weather as much as with equipment. The coast keeps humidity high for much of the year and the monsoon pushes it higher still, which strains refrigeration, air conditioning and sealed storage rooms. Manual checks with a clipboard miss what happens between rounds, and a drift found the next morning can already mean spoiled stock or a gap in the record that an auditor will question. Continuous WiFi or GSM monitoring with alerts to phones and email closes that gap. Because our head office is in Mumbai, our team can plan site visits and installation with you directly, with calibration delivered by our parent lab, VEGA Calibrations.",
            climateAngle:
              "The city is coastal, humid for most of the year and hit by a heavy monsoon. Relative humidity matters as much as temperature here, so we lean towards loggers that read both, and we place probes away from door seals and damp walls where readings can mislead.",
            areas: [
              {
                name: "Andheri MIDC",
                note: "An industrial estate in the western suburbs. Where a factory floor, a stores room and a small cold room share one site, a few single-point loggers or one multi-channel unit can cover all of them.",
              },
              {
                name: "Marol",
                note: "A compact industrial and commercial pocket next to Andheri East. Where stores, labs and cold rooms sit close together, loggers on one Wi-Fi network and one dashboard keep them all in view.",
              },
              {
                name: "Thane",
                note: "Mumbai's neighbour to the north-east, with an industrial belt of its own. Larger sheds and stores here often call for temperature mapping, which VEGA Calibrations can carry out.",
              },
              {
                name: "Lower Parel commercial hubs",
                note: "A central business district of offices, corporate floors and hospitality. Server rooms and temperature-sensitive storage inside tall buildings can be watched from one remote dashboard.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Mumbai is home to pharma head offices and distributors, where stockists hold medicines in rooms that need steady temperature and humidity records ready for audits.",
              },
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Hospitals, blood banks and diagnostic centres across the city rely on fridges and freezers that cannot be left unwatched overnight, so an alert has to reach the right person at once.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Cold stores, food importers and restaurant kitchens deal with humid air and frequent door openings, and continuous logs show when a store drifts and for how long.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Server rooms in office towers and dedicated data centres need steady temperature and humidity, and one dashboard can watch several rooms across different buildings.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity as well as temperature, which matters most in Mumbai's humid, monsoon-heavy months.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four channels from one device suit a distributor's cold room or a clinic's storage area where several points need watching.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels cover a larger multi-zone store or warehouse in and around the city from a single logger.",
              },
            ],
            faqs: [
              {
                question: "Can I visit your Mumbai office?",
                answer: "Visits are by appointment only. Please call ahead to book a visit.",
              },
              {
                question: "Which logger suits Mumbai's humid monsoon months?",
                answer:
                  "Choose a model that measures relative humidity as well as temperature, such as the Nakshatra series for single points or the Pro versions of the multi-channel loggers. A humidity reading shows when a storage room is drawing in damp air even while the temperature still looks fine.",
              },
              {
                question: "Can loggers we already own be calibrated in Mumbai?",
                answer:
                  "Calibration of temperature and humidity instruments and data loggers is part of VEGA Calibrations' calibration scope. Share your instrument details and we will confirm how it can be arranged for your site.",
              },
              {
                question: "Can one dashboard monitor several sites in and around Mumbai?",
                answer:
                  "Yes. Devices are organised by organisation, site, room and device, so a distributor with a warehouse in Bhiwandi, a store in Andheri and an office in Lower Parel sees them together, with role-based access for each team.",
              },
            ],
            nearby: [
              { slug: "navi-mumbai", name: "Navi Mumbai" },
              { slug: "thane-bhiwandi", name: "Thane & Bhiwandi" },
              { slug: "panvel", name: "Panvel" },
              { slug: "pune", name: "Pune" },
            ],
            metaTitle: "Temperature Data Loggers in Mumbai | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers in Mumbai from our head office, with site visits and calibration support. Get Solution for your site.",
            indexable: true,
          },
          {
            slug: "navi-mumbai",
            name: "Navi Mumbai",
            type: "city",
            intro:
              "Navi Mumbai was laid out as a planned city across the creek from Mumbai, and its industrial identity follows the Thane–Belapur belt, from Turbhe through Rabale and Mahape to the plots further south. A temperature data logger here covers a very different mix from the island city: factory units and chemical sheds, cold stores that serve the wholesale markets, warehouse yards near the port roads and server halls in the business parks. The sea keeps the air humid for much of the year and the monsoon makes storage rooms damp. Goods move in and out constantly, so a drift is easy to miss between rounds. Loggers that send alerts to a phone and keep a dated record turn those rounds into evidence, whichever estate the room happens to stand in.",
            climateAngle:
              "The air is humid and salty along the creek for most months, and the monsoon pushes dampness into stores and plant rooms, so humidity records matter next to temperature for packaging, electronics and food.",
            areas: [
              {
                name: "Turbhe",
                note: "The western end of the industrial belt, where manufacturing sheds sit close to the wholesale produce markets and the cold stores that supply traders.",
              },
              {
                name: "Rabale",
                note: "A belt of compact plots between the railway and the hills, where many independent firms each keep one or two rooms that need watching.",
              },
              {
                name: "Mahape",
                note: "Factory units share the district with business parks and data-centre buildings, so heavy-duty stores and climate-controlled halls sit within sight of each other.",
              },
              {
                name: "Taloja",
                note: "A large estate toward Panvel with wide plots and long distances between buildings, where wireless loggers reach rooms that cabling would struggle to serve.",
              },
              {
                name: "Vashi",
                note: "The commercial centre of the city and home to the wholesale market complex, with hospitals, hotels and offices alongside food trading and storage.",
              },
              {
                name: "Pawane",
                note: "An industrial estate on the belt where chemical and pharmaceutical units keep raw materials and finished goods in rooms with stated limits.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical and chemical units along the belt keep active ingredients and packed goods in rooms that are reviewed at every audit, so the monitoring record is part of the product file.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Cold storage linked to the wholesale markets holds fruit, dairy and frozen stock for traders, and a warm afternoon in a holding room can undo a day of handling.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Data-centre and IT campuses on the belt run cold aisles and plant rooms where a drift of a few degrees is something an engineer wants to hear about immediately.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Warehouse yards near the port-linked roads receive mixed cargo, and a log at the dock door shows how long a chilled load actually waited before it was stored.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity as well as temperature, which matters through the damp monsoon months that Navi Mumbai's stores and server rooms face.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels watch the corners, the middle and the door of a large market-side cold room or a multi-bay warehouse from one device.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe suits yards and transit bays between plots, where no Wi-Fi reaches and a vehicle or container needs watching.",
              },
            ],
            faqs: [
              {
                question: "How do you arrange a site visit in Navi Mumbai?",
                answer:
                  "Send the estate or plot, the rooms involved and what you store through the enquiry form, WhatsApp or a call, and we agree a day with your stores or quality team. Visits to our own Mumbai office are by appointment, so please phone before coming.",
              },
              {
                question: "Which logger suits a humid, salt-air site near the creek?",
                answer:
                  "A model that reads relative humidity as well as temperature, such as Nakshatra or the Pro versions of the multi-channel loggers, gives the fuller picture. Mounting the probe away from door seals and wet walls keeps readings honest.",
              },
              {
                question: "Can the loggers we already own be calibrated for a Navi Mumbai plant?",
                answer:
                  "Calibration of temperature and humidity instruments is carried out by VEGA Calibrations, our parent company. Send us the instrument list and the ranges you use, and we confirm how the work is arranged for your plant.",
              },
              {
                question: "Can one account cover units in Turbhe, Mahape and Taloja?",
                answer:
                  "Yes. Rooms from different estates sit on a single dashboard grouped by site, with separate user access, so a head of quality can compare units while each plant manager sees only their own.",
              },
            ],
            nearby: [
              { slug: "mumbai", name: "Mumbai" },
              { slug: "thane-bhiwandi", name: "Thane & Bhiwandi" },
              { slug: "panvel", name: "Panvel" },
            ],
            metaTitle: "Temperature Data Loggers in Navi Mumbai | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Navi Mumbai's Turbhe, Rabale, Mahape and Taloja estates, with site visits arranged. Get Solution.",
            indexable: true,
          },
          {
            slug: "thane-bhiwandi",
            name: "Thane & Bhiwandi",
            type: "city",
            intro:
              "Thane and Bhiwandi sit to the north-east of Mumbai, and together they hold some of the busiest storage in the region. Thane brings established industrial estates and multi-storey factory buildings; Dombivli adds process industry on the Kalyan side; Bhiwandi is a warehouse town whose sheds feed shops and homes across the metropolitan area. A temperature data logger in this belt has to cope with tall sheds, long loading bays and buildings where signals do not travel easily from floor to floor. The pre-monsoon weeks are hot and the monsoon is humid. Alerts that reach a phone, and a record that can be exported for a customer, replace the clipboard and the walk-round. For a firm with a unit in Thane and a bay in a Bhiwandi park, one account can show both, so a quality head is not reading two sets of paper.",
            climateAngle:
              "Large sheds heat up in the weeks before the monsoon and turn humid once it arrives, and upper racks run warmer than the floor, so readings from several heights tell more than a single probe.",
            areas: [
              {
                name: "Wagle Estate",
                note: "Established estate on the western side of Thane, with pharmaceutical, electronics and engineering units stacked in multi-storey buildings where each floor may hold a store, a quality room and a packing area of its own.",
              },
              {
                name: "Dombivli MIDC",
                note: "Two phases of process industry on the Kalyan side, with chemical, pharmaceutical intermediate and food units close to dense housing, which makes an automatic record of storage conditions worth more than a register filled by hand.",
              },
              {
                name: "Bhiwandi",
                note: "A town of warehouse parks and powerloom units along the Nashik highway, where third-party operators share sheds between many customers and tall racking makes the top shelves run warmer than the floor.",
              },
            ],
            industries: [
              {
                slug: "logistics-warehousing",
                sentence:
                  "Third-party warehouse operators serve many customers from one shed, and a separate record for each customer's bay settles most questions about how goods were kept.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Formulation units in Thane and distribution bays in Bhiwandi both need dated storage records that a customer or an inspector can read without help.",
              },
              {
                slug: "chemical",
                sentence:
                  "Process units on the Dombivli estates store intermediates and solvents with printed limits, and an automatic log shows whether those limits held through a hot afternoon.",
              },
              {
                slug: "textile",
                sentence:
                  "Powerloom and processing units in Bhiwandi work with yarn and cloth that behave differently in damp and dry air, so humidity is monitored alongside temperature.",
              },
            ],
            recommendedSeries: [
              {
                slug: "virat",
                reason:
                  "Sixteen channels spread probes across the height and length of a large Bhiwandi shed from a single logger.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four channels suit a multi-floor Thane building where each floor's store needs its own reading on one account.",
              },
              {
                slug: "setu",
                reason:
                  "A single-point logger with an optional external probe covers the individual fridge or small store of a stockist or a unit's quality room.",
              },
            ],
            faqs: [
              {
                question: "Do you visit warehouse parks in Bhiwandi?",
                answer:
                  "Yes. Tell us the park, the size of the shed and whether you run it or rent bays in it, and we arrange the day with whoever manages access. Shared parks usually need the park manager to agree the walk-through, and it helps to say which bay or customer area you want looked at first.",
              },
              {
                question: "What helps when Wi-Fi does not reach inside a tall multi-storey unit?",
                answer:
                  "GSM versions work without a local network, and wireless loggers can be placed to follow the building's layout. We usually start with one floor, see how it reports, then extend to the others, adding a repeater or a GSM unit only where a stairwell or lift shaft really blocks the signal.",
              },
              {
                question: "Can a mapping study be arranged for a large Thane or Bhiwandi shed?",
                answer:
                  "Temperature mapping is carried out by VEGA Calibrations, our parent company. A study shows the warm and cool zones of a shed so loggers go where they are most informative.",
              },
              {
                question: "How do we give each customer in a shared warehouse its own record?",
                answer:
                  "Assign each customer's bay to its own room and logger on the dashboard, and export that room's report when the customer asks. Access can be limited so tenants see only their bay, while the operator keeps the view of the whole shed.",
              },
            ],
            nearby: [
              { slug: "mumbai", name: "Mumbai" },
              { slug: "navi-mumbai", name: "Navi Mumbai" },
              { slug: "panvel", name: "Panvel" },
              { slug: "pune", name: "Pune" },
            ],
            metaTitle: "Temperature Data Loggers in Thane & Bhiwandi | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers in Thane & Bhiwandi: Wagle Estate, Dombivli MIDC and warehouse parks, with site visits. Get Solution.",
            indexable: true,
          },
          {
            slug: "panvel",
            name: "Panvel",
            type: "city",
            intro:
              "Panvel is the southern gateway of the Mumbai region, where the harbour-side roads, the expressway to Pune and the highway toward Goa all begin. A temperature data logger here works at the point where cargo changes hands: container freight stations, open and bonded warehouses, cold rooms that hold food and pharmaceutical consignments waiting for onward transport, and chemical and engineering units spread across the estates around the town. Goods often wait longer than planned for a berth, a customs release or a truck, and the wait is the part nobody watched. The coast is humid and the monsoon is heavy, so sheds and stores swing between heat and damp. Continuous monitoring with alerts to a phone, and a dated record for each consignment, turns that waiting time into something that can be shown to a customer or an inspector.",
            climateAngle:
              "Coastal humidity and a heavy monsoon sit on top of long waiting times at the port end of the supply chain, so a consignment can spend hours in heat or damp air before it moves on; a record of those hours is what a logger adds.",
            areas: [
              {
                name: "Taloja MIDC",
                note: "The estate on the Navi Mumbai side of the town, where chemical, engineering and plastics plants sit on wide plots and the nearby roads lead straight to the port belt.",
              },
              {
                name: "Port-linked logistics belt",
                note: "Warehouse parks and container freight stations along the roads toward the container port hold import and export cargo for many shippers at once.",
              },
              {
                name: "Kalamboli and the highway junction",
                note: "A transport and trading node where the expressway and the highways meet, with truck terminals, steel traders and godowns that handle goods in transit.",
              },
              {
                name: "Panvel town and its markets",
                note: "A dense town centre with hospitals, pharmacies, food traders and small cold rooms that serve a growing residential belt.",
              },
            ],
            industries: [
              {
                slug: "logistics-warehousing",
                sentence:
                  "Container freight stations and shared warehouses near the port handle cargo for many shippers, and a log for each bay shows how long a consignment sat in heat before release.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Imported fruit, frozen food and dairy stop in cold rooms around the port belt before they travel on, and a reading every few minutes shows whether the chain held while they waited.",
              },
              {
                slug: "chemical",
                sentence:
                  "Chemical units and traders around the estates keep drums and containers in sheds that heat quickly in the pre-monsoon weeks, so an alert on a high reading is as useful as one on a low reading.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical consignments entering or leaving through the port need a continuous record at each stop, because the paperwork often asks where a pack was held and for how long.",
              },
            ],
            recommendedSeries: [
              {
                slug: "veer",
                reason:
                  "Ten channels cover the bays, racks and dock doors of a large freight station or shared warehouse from one device.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe follows a container, trailer or open yard where no Wi-Fi exists and a consignment may wait for days.",
              },
              {
                slug: "rajmudra",
                reason:
                  "Two channels watch a small cold room at the back and at the door, which is where chilled stock at a transit stop is most exposed.",
              },
            ],
            faqs: [
              {
                question: "Do you visit port-linked premises around Panvel?",
                answer:
                  "Yes. Send the park or plot, the type of cargo and the person who controls entry, and we agree a day with them. Many freight stations ask for a gate pass or a safety briefing, so mention that when you write.",
              },
              {
                question: "Can a consignment waiting in a yard or container be monitored?",
                answer:
                  "GSM versions with an external probe report over the mobile network, so a logger can stay with a load that sits outside any building. Ask us to confirm the model and probe length for your cargo.",
              },
              {
                question: "Who calibrates and maps for a Panvel warehouse?",
                answer:
                  "Calibration and temperature mapping are carried out by VEGA Calibrations, our parent company. A mapping study of a large shed shows where heat gathers before any logger is mounted.",
              },
              {
                question: "How do alerts work for a site that nobody staffs at night?",
                answer:
                  "Alerts go out by email, SMS and the app, and can escalate to a second and third person if the first does not acknowledge. Each acknowledgement can carry a note about the cause and the action taken.",
              },
            ],
            nearby: [
              { slug: "navi-mumbai", name: "Navi Mumbai" },
              { slug: "mumbai", name: "Mumbai" },
              { slug: "pune", name: "Pune" },
            ],
            metaTitle: "Temperature Data Loggers in Panvel | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Panvel's Taloja MIDC and port-linked warehouses, with site visits arranged. Get Solution.",
            indexable: true,
          },
          {
            slug: "pune",
            name: "Pune",
            type: "city",
            intro:
              "Pune sits inland on the Deccan plateau, and its industry is spread in a ring around the city instead of in one block. Automotive and engineering plants fill the townships to the north, consumer-goods and electronics units line the estates along the Nashik and Ahmednagar roads, pharmaceutical and food firms cluster in the smaller estates, and IT parks on the western edge run server rooms of their own. A temperature data logger in Pune therefore has to serve very different rooms: a paint shop store, a packaging warehouse, a stability chamber, a server hall. The summers are hot and dry and the monsoon brings damp air back into stores. Alerts that reach a phone and a dated log for each room let one quality team watch estates that sit far apart.",
            climateAngle:
              "Summer afternoons are hot and dry on the plateau, and the monsoon then brings humid air into stores that were bone-dry a month earlier, so both temperature and humidity logs matter across the year.",
            areas: [
              {
                name: "Pimpri-Chinchwad",
                note: "A dense industrial township to the north-west of the city, long associated with automotive and engineering plants and their many component suppliers.",
              },
              {
                name: "Chakan",
                note: "An estate on the road to Nashik where automotive assembly and component makers sit alongside warehousing for the parts that feed them.",
              },
              {
                name: "Ranjangaon",
                note: "An estate on the Ahmednagar road where consumer-goods, electronics, food and automotive units share a planned layout of wide roads and large plots.",
              },
              {
                name: "Talegaon",
                note: "An estate toward the Mumbai side of the city, with engineering, automotive and light manufacturing units and the logistics firms that serve them.",
              },
              {
                name: "Kurkumbh",
                note: "A smaller estate south-east of the city where chemical and food-processing units hold raw materials and finished goods in simple stores.",
              },
              {
                name: "Hinjewadi",
                note: "The IT park district on the western edge, where offices and technology campuses run server rooms and small laboratories inside ordinary buildings.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical and formulation units in the smaller estates keep ingredients and finished packs in stores that are reviewed at each customer audit, which makes a continuous log part of the quality file.",
              },
              {
                slug: "electronics",
                sentence:
                  "Electronics and electrical manufacturers hold boards and components in stores that suffer when monsoon air comes in, and a humidity record shows the days a dehumidifier or a roof let them down.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Food processors and ingredient suppliers run chillers and dry stores whose afternoon temperature climbs fast in April and May, which is when an alert at the shift lead's phone matters most.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Technology campuses and data-centre buildings run server halls where a cooling failure is an outage, so readings along the aisle and at the door are watched continuously.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity along with temperature, which is what a server room or an electronics store needs once the monsoon arrives on the plateau.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four channels cover a food or pharmaceutical store from the floor to the top rack and the door from a single device.",
              },
              {
                slug: "virat",
                reason:
                  "Sixteen channels suit the large warehouses of the automotive and consumer-goods estates, where a hot corner can hide behind racking.",
              },
            ],
            faqs: [
              {
                question: "How are visits planned for Pune sites that sit in different estates?",
                answer:
                  "Pune is inland and its estates are spread out, so we group visits by direction: the northern townships on one trip, the Ahmednagar road estates on another. Tell us the estates and rooms and we propose a sequence with your teams.",
              },
              {
                question: "Which logger copes with hot dry summers and a damp monsoon in the same store?",
                answer:
                  "Choose a model that reads humidity as well as temperature, with alert limits set for each season if your product needs it. Keep the probe off sun-facing walls, where afternoon heat distorts the reading.",
              },
              {
                question: "Can server rooms in a technology park be monitored without wiring?",
                answer:
                  "Yes. Wireless loggers report over the building's Wi-Fi or over GSM, so a server room, a UPS room and a pantry store can each be added to one dashboard without trunking or a rebuild.",
              },
              {
                question: "Can plants in Chakan and Ranjangaon be compared on one view?",
                answer:
                  "Yes. Group each plant as a site and give the quality head access to all of them, while a plant manager's login shows only that plant's rooms and its own alert history.",
              },
            ],
            nearby: [
              { slug: "mumbai", name: "Mumbai" },
              { slug: "panvel", name: "Panvel" },
              { slug: "goa", name: "Goa" },
            ],
            metaTitle: "Temperature Data Loggers in Pune | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Pune's Chakan, Ranjangaon, Pimpri-Chinchwad and Talegaon estates, with site visits. Get Solution.",
            indexable: true,
          },
          {
            slug: "vasai-palghar",
            name: "Vasai-Palghar",
            type: "city",
            intro:
              "North of Mumbai the coast flattens into a long belt where creek towns, farmland and heavy industry sit within a few kilometres of one another. Vasai and Virar are dense towns with their own markets, godowns and estates; Palghar and the coastal plain beyond it hold process industry on a much larger scale. A temperature data logger in this belt has to suit a fishmonger's cold room as readily as a chemical store on a wide plot. The sea keeps the air salty and humid, the sun is hard before the rains, and distances between towns mean a problem at night may be an hour or more from anyone who can fix it. Alerts to a phone and a dated record of each room give a small team a way to cover that distance.",
            climateAngle:
              "Salt-laden air and a long, heavy monsoon are hard on electronics, packaging and cardboard, so loggers here should be placed away from open doors and wet walls, and humidity belongs in the record next to temperature.",
            areas: [
              {
                name: "Vasai",
                note: "The creek town on the railway line, with godowns on the highway side, small estates to the east and markets that supply the northern suburbs.",
              },
              {
                name: "Tarapur",
                note: "A coastal process-industry estate where chemical, pharmaceutical intermediate and engineering plants share a planned layout beside the sea.",
              },
              {
                name: "Boisar",
                note: "The railway town beside the estate, with plants, packers and traders along its approach roads and a market that serves their staff.",
              },
              {
                name: "Palghar town and its estates",
                note: "The district's administrative town on the highway, with its own industrial estate and a mix of food, packaging and light engineering firms.",
              },
            ],
            industries: [
              {
                slug: "chemical",
                sentence:
                  "Process plants along the coast keep intermediates, solvents and drums in stores whose labels give a limit, and the record that the limit held is part of what they send to customers.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical makers and stockists in the creek towns and on the estates need a dated record of storage that is easier to read than a hand-filled register.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Fish, dairy and fruit traders in the market towns work from cold rooms and ice stores that carry a heavy load through the summer.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Highway godowns take mixed loads bound for Mumbai and Gujarat, and a reading at the dock door shows how long each load stood before it was put away.",
              },
            ],
            recommendedSeries: [
              {
                slug: "setu",
                reason:
                  "A single-point logger with an optional external probe suits the small cold room, medicine store or fridge that a market-town trader depends on.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four channels cover a process plant's store from floor to rack and door, with the tank room or hot corner given a probe of its own.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe follows loads and open yards along the highway where no Wi-Fi exists and nobody is on site overnight.",
              },
            ],
            faqs: [
              {
                question: "How far apart are visits planned in the Palghar belt?",
                answer:
                  "The towns are spread along the railway and the highway, so we group them by direction: the creek towns together, the coastal estates together. Tell us where your sites are and we propose a sequence with your teams.",
              },
              {
                question: "What suits a small trader who is rarely at the shop at night?",
                answer:
                  "A single WiFi logger on the cold room, with alerts to the owner's phone and a second person set as the escalation, covers the hours when nobody is watching. It can be moved or added to as the business grows.",
              },
              {
                question: "Can plants on the coastal estates have storage mapped and loggers calibrated?",
                answer:
                  "Yes. VEGA Calibrations, our parent company, carries out calibration of instruments, temperature mapping of larger stores and validation support, and can plan it alongside the loggers.",
              },
              {
                question: "Does sea air affect the loggers themselves?",
                answer:
                  "Salt and damp are hard on any electronics, so we advise mounting loggers indoors away from open doors and using external probes for coastal sheds. Ask us about probe length and cable runs for your layout.",
              },
            ],
            nearby: [
              { slug: "mumbai", name: "Mumbai" },
              { slug: "thane-bhiwandi", name: "Thane & Bhiwandi" },
            ],
            metaTitle: "Temperature Data Loggers in Vasai-Palghar | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers in Vasai-Palghar: Vasai, Tarapur and Boisar estates and godowns, with site visits. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "gujarat",
        name: "Gujarat",
        type: "state",
        intro:
          "Gujarat's industry is spread along the corridor between Ahmedabad and the coast, from the estates around the state's largest city to the chemical belt of the south. This state page is the parent of our Gujarat city pages; it will be written in full when the state hubs are built, and it stays noindex until then.",
        localIndustries: [
          "Pharmaceutical manufacturing",
          "Chemical and dye industry",
          "Food processing and dairy",
        ],
        citiesServed: ["Ahmedabad", "Vapi", "Ankleshwar", "Surat"],
        supportNote:
          "Supply, installation support and site visits for Gujarat estates are arranged from our Mumbai office. Write to us with the estate and what you store.",
        faqs: [
          {
            question: "Which Gujarat city do you cover first?",
            answer: "Ahmedabad, Vapi, Ankleshwar and Surat each have their own city page under this state.",
          },
          {
            question: "How is a visit arranged for a Gujarat plant?",
            answer: "Send the estate and what you store through the enquiry form, WhatsApp or a call, and we agree a day with your team.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city pages.
        indexable: false,
        children: [
          {
            slug: "ahmedabad",
            name: "Ahmedabad",
            type: "city",
            intro:
              "Ahmedabad is the commercial centre of Gujarat, and its factories sit in a ring of planned estates around the Sabarmati plain instead of in one district. Pharmaceutical makers, chemical and dye units, food and dairy processors and engineering firms each have their own cluster, and the city's own warehouses and hospitals sit between them. A temperature data logger in Ahmedabad works against a hard fact of the climate: summers are very hot and dry, and a closed shed or a vehicle bay can climb far above the outside air by the afternoon. Alerts that reach a phone, and a log that shows when and for how long a room left its limits, give a quality head something firmer than a morning walk-round.",
            climateAngle:
              "Very hot, dry summers heat sheds and loading bays well past the outside temperature, while winter nights are mild, so the swing between day and night is large and a room's real behaviour shows only in a continuous record.",
            areas: [
              {
                name: "Naroda",
                note: "An older estate on the northern side of the city, with engineering, chemical, plastics and packaging units that grew up alongside the surrounding neighbourhoods.",
              },
              {
                name: "Vatva",
                note: "A south-eastern estate long associated with chemical, dye and pharmaceutical intermediate units, many of them on compact plots.",
              },
              {
                name: "Changodar",
                note: "An estate on the western highway where pharmaceutical manufacturers and logistics firms sit within a short distance of each other.",
              },
              {
                name: "Sanand",
                note: "A newer industrial district beyond the city's western ring road, with automotive, electronics, food and consumer-goods plants on large plots.",
              },
              {
                name: "Bavla",
                note: "An estate to the south-west of the city, where food, chemical and engineering units use wider plots than the older estates allow.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical manufacturers keep ingredients and finished goods in stores with printed limits, and in an Ahmedabad summer an air-conditioning fault is noticed on a log long before it is noticed on a shelf.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Dairy and food processors depend on chillers and cold rooms that work hardest in the dry heat, and an alert that escalates to a second and third person covers a failure that starts at night.",
              },
              {
                slug: "chemical",
                sentence:
                  "Chemical and dye units hold raw materials and drums in sheds where the afternoon heat is the main risk, so a high-temperature alert is as important as a low one.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Third-party warehouses and transport yards on the highways around the city hold goods briefly between plants and the road, and a dock-door reading shows how long a load stood in the sun.",
              },
            ],
            recommendedSeries: [
              {
                slug: "dhruva",
                reason:
                  "Four channels watch a dairy or food cold room from floor to top rack and door, so a hot corner cannot hide behind the stock.",
              },
              {
                slug: "rajmudra",
                reason:
                  "Two channels suit a chemical drum store or a stability room, with one probe in the hottest corner and one near the door.",
              },
              {
                slug: "virat",
                reason:
                  "Sixteen channels cover a large highway warehouse or a bulk pharmaceutical store, where heat builds unevenly under a metal roof.",
              },
            ],
            faqs: [
              {
                question: "How do you arrange visits to estates around Ahmedabad?",
                answer:
                  "Send the estate, the plot and the rooms you want looked at through the enquiry form, WhatsApp or a call, and we agree a day with the person who controls entry. Many estates ask for a gate pass in advance, so mention it when you write.",
              },
              {
                question: "Will the loggers cope with very hot rooms?",
                answer:
                  "Internal sensors read from minus 30 to plus 70 degrees Celsius, and external probes extend that range far beyond it, so a probe can sit in a hot process area while the logger stays outside it in the cooler corridor.",
              },
              {
                question: "Can calibration and mapping be arranged for an Ahmedabad plant?",
                answer:
                  "Calibration, temperature mapping and validation support are carried out by VEGA Calibrations, our parent company. Send the instrument list and the rooms to be mapped, and we plan the work with you.",
              },
              {
                question: "What happens if the first person does not answer an alert?",
                answer:
                  "The alert moves up to a second and then a third recipient, and each acknowledgement can record the cause and the action taken, so the log shows what was done as well as what went wrong.",
              },
            ],
            nearby: [
              { slug: "mumbai", name: "Mumbai" },
              { slug: "indore", name: "Indore" },
              { slug: "jaipur", name: "Jaipur" },
            ],
            metaTitle: "Temperature Data Loggers in Ahmedabad | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Ahmedabad's Naroda, Vatva, Changodar and Sanand estates, with site visits arranged. Get Solution.",
            indexable: true,
          },
          {
            slug: "vapi",
            name: "Vapi",
            type: "city",
            intro:
              "Vapi is the first large industrial town on the Gujarat side of the Maharashtra border, set between the railway, the national highway and the coast. Its estate is dense and old by industrial standards, with chemical, dye, pharmaceutical, paper and plastics units packed onto narrow plots that run street after street. A temperature data logger here serves stores that are small, crowded and close to process areas that run hot. Heat from reactors and boilers leaks into the stores beside them, and the sea air and heavy rains of South Gujarat add damp on top. A reading that is only checked when someone walks past misses the hours that matter, so alerts to a phone and a continuous record become the practical way to watch a room that nobody can stand next to.",
            climateAngle:
              "South Gujarat gets a heavier monsoon than the north of the state, and the coast keeps the air humid for most months, so damp packaging and sweating containers are as common a problem here as heat.",
            areas: [
              {
                name: "Vapi GIDC",
                note: "The main estate, laid out in numbered phases with chemical, dye and pharmaceutical intermediate units sharing narrow streets and common services.",
              },
              {
                name: "Paper and packaging units",
                note: "Mills and converters on the estate keep reels, boards and finished packs in large stores where humidity changes how the material behaves.",
              },
              {
                name: "Plastics and polymer processors",
                note: "Processors hold resins and compounds in sheds that warm up quickly, and many keep a separate small room for additives with their own limits.",
              },
              {
                name: "Transport and godown belt on the highway",
                note: "Godowns and transport firms along the highway take drums and bags in and out through the day for the units behind them.",
              },
            ],
            industries: [
              {
                slug: "chemical",
                sentence:
                  "Chemical and dye units store intermediates and finished product in rooms that sit beside process areas, so a logger placed away from the heat shows what the store itself is doing.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical intermediate makers keep controlled stores whose records are reviewed by the customers who buy from them, and an exported log answers that review quickly.",
              },
              {
                slug: "textile",
                sentence:
                  "Fabric processors and dyers in the wider belt work with materials that gain and lose moisture, so humidity is watched next to temperature in the grey and finished stores.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Highway godowns hold drums and bags for several plants, and a dated reading for each bay settles most arguments about how a lot was kept.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity as well as temperature, which suits packaging, paper and intermediate stores that face salty, damp air for most of the year.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels cover a long, crowded store from end to end and the door from one device, which saves running a logger per aisle.",
              },
              {
                slug: "setu",
                reason:
                  "A single-point logger with an optional external probe fits the small additive room or the quality-control fridge that every unit has.",
              },
            ],
            faqs: [
              {
                question: "What should we expect when visiting a unit on the Vapi estate?",
                answer:
                  "Process plants usually ask for a safety briefing and the right footwear, and some need a permit for the gate. Tell us the unit, the store and the person who controls entry when you write, and we plan the day around those rules.",
              },
              {
                question: "How do you place a logger in a store next to a hot process area?",
                answer:
                  "We keep the logger on the cooler side of the wall and run an external probe into the store, so the device is not sitting in the heat it is trying to measure. Probe length is agreed during the visit.",
              },
              {
                question: "Can several plants on the estate be watched from one view?",
                answer:
                  "Yes. Each plant is a site on the dashboard and each shift lead gets alerts for their own rooms, while a group quality head can see every site and compare their records side by side.",
              },
              {
                question: "Who handles calibration of the loggers in a Vapi plant?",
                answer:
                  "VEGA Calibrations, our parent company, calibrates instruments and loggers and can also map a large store before probes are placed. Send the instrument list and ranges and we confirm how it is arranged.",
              },
            ],
            nearby: [
              { slug: "vasai-palghar", name: "Vasai-Palghar" },
              { slug: "surat", name: "Surat" },
              { slug: "ankleshwar", name: "Ankleshwar" },
            ],
            metaTitle: "Temperature Data Loggers in Vapi | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Vapi's GIDC chemical, pharma and paper units and highway godowns, with site visits. Get Solution.",
            indexable: true,
          },
          {
            slug: "ankleshwar",
            name: "Ankleshwar",
            type: "city",
            intro:
              "Ankleshwar sits on the Narmada plain near Bharuch, and around it the map fills with industrial estates built for chemicals: its own large estate, the neighbouring Panoli and Jhagadia estates and the coastal belt toward Dahej. A temperature data logger in this district watches rooms that are bigger and more varied than in most towns: solvent and intermediate stores, bulk-drug warehouses, packing halls and tank rooms spread across wide plots with long walks between buildings. Many plants run through the night and a reading that drifts at three in the morning is only noticed if something tells someone. Alerts, an escalation chain and a dated log of every acknowledgement turn that overnight gap into a record that a customer's auditor can follow.",
            climateAngle:
              "Hot, humid summers followed by a heavy monsoon load the stores with both heat and damp, and the Narmada plain is flat and open, so afternoon sun on metal roofs raises shed temperatures sharply.",
            areas: [
              {
                name: "Ankleshwar GIDC",
                note: "The town's own estate, with chemical, pharmaceutical intermediate and dye plants on a grid of plots that has grown outward over many years.",
              },
              {
                name: "Panoli",
                note: "A neighbouring estate with chemical and pharmaceutical manufacturers on larger plots, reached by a short drive along the highway, where each plant usually runs its own quality laboratory and its own set of controlled stores.",
              },
              {
                name: "Jhagadia",
                note: "An estate further inland where newer chemical and specialty plants have more room, and distances between buildings are correspondingly long, which suits wireless loggers that need no cable between a store and the control room.",
              },
              {
                name: "Dahej",
                note: "The coastal industrial region beside the port, with large chemical and petrochemical-linked plants and warehouses that serve the sea-borne trade.",
              },
            ],
            industries: [
              {
                slug: "chemical",
                sentence:
                  "Bulk chemical and specialty plants keep raw materials, intermediates and finished product in stores with stated limits, where a continuous log is the proof that the limit held overnight.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Bulk-drug and formulation units hold ingredients and packed goods in controlled rooms that are reviewed during customer and regulatory audits.",
              },
              {
                slug: "laboratories",
                sentence:
                  "Quality control and research laboratories in the plants keep retained samples and reference standards in fridges and incubators that each report on their own.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Port-linked warehouses at Dahej and on the highway hold cargo bound for sea shipment, and a record of each bay answers questions raised after the goods leave.",
              },
            ],
            recommendedSeries: [
              {
                slug: "dhruva",
                reason:
                  "Four channels watch a solvent or intermediate store from floor to rack and door, with one probe reserved for the hottest corner under the roof.",
              },
              {
                slug: "virat",
                reason:
                  "Sixteen channels cover a long bulk warehouse on a wide plot, so one device reports on bays that are a long walk apart.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe goes with loads and open yards at the far end of a large estate where no Wi-Fi reaches.",
              },
            ],
            faqs: [
              {
                question: "Do you visit plants across Ankleshwar, Panoli and Dahej in one trip?",
                answer:
                  "We plan them as a sequence, since the estates lie along the same highway. Send the plants, the stores and the contact at each, and we propose an order that suits their entry rules and shift timings.",
              },
              {
                question: "How does a logger report from the far end of a large plot?",
                answer:
                  "A GSM version reports over the mobile network and needs no local Wi-Fi, while a Wi-Fi version can use an access point placed in the building. We decide which fits when we see the layout.",
              },
              {
                question: "Can records be handed to a customer who audits the plant?",
                answer:
                  "Reports can be exported as PDF, Excel or CSV for any room and any period, and calibration records can be stored against each device on the dashboard, ready to share.",
              },
              {
                question: "Can mapping and calibration be arranged for a chemical store?",
                answer:
                  "Temperature mapping, calibration and validation support come from VEGA Calibrations, our parent company, and can be planned alongside the loggers so one visit sorts out placement and certificates together.",
              },
            ],
            nearby: [
              { slug: "surat", name: "Surat" },
              { slug: "vapi", name: "Vapi" },
              { slug: "ahmedabad", name: "Ahmedabad" },
            ],
            metaTitle: "Temperature Data Loggers in Ankleshwar | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Ankleshwar, Panoli, Jhagadia and Dahej chemical and pharma plants, with site visits. Get Solution.",
            indexable: true,
          },
          {
            slug: "surat",
            name: "Surat",
            type: "city",
            intro:
              "Surat is a city of fabric and stone: powerloom and processing units, embroidery and trading houses on one side, diamond cutting and polishing workshops on the other, with a heavy-industry belt along the coast at Hazira. A temperature data logger in Surat serves a city whose storage is mostly of the dry kind, such as yarn, grey cloth, finished garments and chemicals for dyeing, where humidity, not cold, is the usual threat. The monsoon is long, the Tapi runs through the middle of the city and the air stays damp for months. Heavy rain also brings power cuts, so records that continue on battery, and alerts that reach a phone when a store changes, matter as much here as in a cold chain.",
            climateAngle:
              "A long, heavy monsoon and a river city's damp air keep humidity high for months, which is hard on yarn, fabric and cartons, and power cuts in bad weather make battery-backed logging more than a convenience.",
            areas: [
              {
                name: "Pandesara",
                note: "A processing estate for dyeing and finishing, where fabric arrives grey and leaves coloured and each stage has its own store of chemicals and cloth.",
              },
              {
                name: "Sachin",
                note: "An estate to the south of the city with textile, chemical and engineering units on larger plots, linked to the highway and the railway.",
              },
              {
                name: "Hazira",
                note: "A coastal heavy-industry belt with steel, energy and gas-linked plants and the port-side warehouses that serve them.",
              },
              {
                name: "Textile markets and trading houses",
                note: "Dense market complexes in the old city hold fabric and garments in godowns above shops, many of them in buildings never designed for storage.",
              },
            ],
            industries: [
              {
                slug: "textile",
                sentence:
                  "Weaving, processing and trading units store yarn, grey cloth and finished goods that gain moisture in damp air, and a humidity record shows which weeks a store was out of its comfortable range.",
              },
              {
                slug: "chemical",
                sentence:
                  "Dyeing and finishing houses keep dyes, auxiliaries and process chemicals in stores that carry printed limits, and a high-temperature alert protects stock in the pre-monsoon heat.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Transport and godown operators serving the markets handle bales and cartons that wait in sheds for a truck, and a reading at the shed door shows how damp the air was while they waited.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical stockists and hospitals in the city keep medicine stores and vaccine fridges that need a logged temperature and a person told when the power fails.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity along with temperature, which is the more important number for a fabric, yarn or carton store during the monsoon.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four channels cover the stages of a processing house, such as the dye store, the grey store and the finished goods bay, from one device.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels spread through a market-side godown or a port-side warehouse so damp corners and hot top shelves both show up.",
              },
            ],
            faqs: [
              {
                question: "How are visits arranged across Pandesara, Sachin and Hazira?",
                answer:
                  "Send the estates, the buildings and the rooms through the enquiry form, WhatsApp or a call, and we group the visits by direction. Market-side godowns are easiest to look at when the shops are quiet, and we plan around that with you.",
              },
              {
                question: "Which logger copes with a damp textile store?",
                answer:
                  "A model that reads relative humidity, such as Nakshatra or the Pro versions of the multi-channel loggers, shows the dampness that a temperature-only logger would miss. Keep probes off outside walls where condensation forms.",
              },
              {
                question: "Will the logger keep recording when the power goes during a storm?",
                answer:
                  "Loggers run on a rechargeable battery and keep storing readings during a cut, and GSM versions can still report when a building's Wi-Fi is down. Charging docks keep spare batteries ready.",
              },
              {
                question: "Can a trading house with godowns in several buildings use one account?",
                answer:
                  "Yes. Each godown becomes a room under one site or several, with its own alert recipient, so the owner can see every building while each manager sees only theirs.",
              },
            ],
            nearby: [
              { slug: "vapi", name: "Vapi" },
              { slug: "ankleshwar", name: "Ankleshwar" },
              { slug: "mumbai", name: "Mumbai" },
            ],
            metaTitle: "Temperature Data Loggers in Surat | Prithvi",
            metaDescription:
              "WiFi and GSM temperature and humidity data loggers for Surat's textile, dyeing and Hazira units, with site visits arranged. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "delhi",
        name: "Delhi",
        type: "state",
        intro:
          "Delhi is a city-state with its own cluster of industrial areas at Okhla, Naraina, Bawana and Narela, around a very large base of hospitals, medicine distributors and food businesses. This state page is the parent of our Delhi city page; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Hospitals and diagnostic laboratories",
          "Pharmaceutical distribution",
          "Food and cold storage",
        ],
        citiesServed: ["Delhi"],
        supportNote:
          "Supply, installation support and site visits for Delhi are arranged from our Mumbai office. Write to us with the area and what you store.",
        faqs: [
          {
            question: "Which Delhi page covers the industrial areas?",
            answer: "The Delhi city page describes Okhla, Naraina, Bawana and Narela and links to the loggers we suggest for each kind of room.",
          },
          {
            question: "How do we arrange a visit in Delhi?",
            answer: "Send the area, the rooms and a contact through the enquiry form, WhatsApp or a call, and we agree a day with your team.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "delhi",
            name: "Delhi",
            type: "city",
            intro:
              "Delhi is a city of records: hospitals and nursing homes, wholesale medicine markets, cold stores that feed the capital's kitchens and a dense spread of laboratories, all in a city that never quite switches off. A temperature data logger in Delhi has to cover rooms of very different kinds, from a hospital blood bank to a godown in an industrial area on the northern edge. The estates at Okhla, Naraina, Bawana and Narela each have their own character, and many of the buildings are older, multi-storey and cramped, so running cable is rarely an option. Wireless loggers with alerts to phones and email let one person watch rooms in several parts of the city, and a dated log gives hospitals, distributors and food businesses something firm to show when an inspector or a customer asks how a room was kept.",
            climateAngle:
              "Summers are extreme and dry, with afternoon heat that overwhelms ageing cooling in godowns and upper-floor stores, while cold winter nights can chill rooms that were only ever designed to stay warm.",
            areas: [
              {
                name: "Okhla",
                note: "A long-established industrial area in the south of the city where pharmaceutical, packaging, garment and electrical units share tight plots and storage is a room or a floor beside production.",
              },
              {
                name: "Naraina",
                note: "A compact industrial area in the west with small manufacturers, printers and workshops, where goods are kept on upper floors that hold the day's heat long after sunset.",
              },
              {
                name: "Bawana",
                note: "A large estate on the north-western edge, laid out later than the older areas, with food-processing, plastics and warehousing units on bigger plots and long distances between buildings.",
              },
              {
                name: "Narela",
                note: "A northern industrial and warehousing belt where distribution firms and food businesses keep stock in large sheds, often far from the person responsible for it.",
              },
            ],
            industries: [
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Hospitals and nursing homes in the city keep blood bank fridges, medicine rooms and vaccine stores that must stay in range through a power cut, and an alert to the duty staff matters most at night.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Medicine wholesalers and distributors hold stock in shop-floor stores and small warehouses where the compressor of one air conditioner decides the temperature of everything on the shelves.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Cold stores, dairy depots and kitchens that supply hotels and caterers have chambers opened many times a day, so a reading every few minutes shows the pattern of each door opening.",
              },
              {
                slug: "laboratories",
                sentence:
                  "Diagnostic and testing laboratories keep reagents, samples and reference materials in fridges and freezers that are checked by hand at most twice a day.",
              },
            ],
            recommendedSeries: [
              {
                slug: "dhruva",
                reason:
                  "Four channels cover a hospital pharmacy or distributor's store from floor to top shelf and door with one device, which keeps a crowded small room tidy.",
              },
              {
                slug: "setu",
                reason:
                  "A single-point logger with an external probe sits inside a laboratory freezer or a ward fridge without needing a cable through the door seal.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger keeps reporting from a godown or a delivery vehicle where the building has no usable Wi-Fi, which is common in older industrial lanes.",
              },
            ],
            faqs: [
              {
                question: "Do you arrange site visits across Okhla, Naraina, Bawana and Narela?",
                answer:
                  "Yes. We plan visits by direction so one day covers neighbouring areas. Send the area, the rooms and a contact through the enquiry form, WhatsApp or a call, and we confirm a day with you.",
              },
              {
                question: "How do cold winter nights affect the alerts?",
                answer:
                  "A low limit can be set alongside the high one, so a store that gets too cold on a winter night raises an alert just as a hot afternoon would. Limits are set room by room, so a medicine fridge and a dry store each get their own.",
              },
              {
                question: "Can a hospital group watch several buildings from one login?",
                answer:
                  "Yes. Each building is a site with its rooms beneath it, alerts go to the person responsible for each room, and a head of quality sees every site in one view and can export a report for any period.",
              },
              {
                question: "What do you do in old multi-storey buildings where cabling is hard?",
                answer:
                  "Loggers run on rechargeable batteries and connect over Wi-Fi, and GSM versions use the mobile network, so nothing has to be chased through a wall. We check the signal in each room during the visit before fixing positions.",
              },
            ],
            nearby: [
              { slug: "noida", name: "Noida" },
              { slug: "manesar", name: "Manesar" },
              { slug: "chandigarh", name: "Chandigarh" },
            ],
            metaTitle: "Temperature Data Loggers in Delhi | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Delhi's hospitals, medicine distributors and cold stores in Okhla, Bawana and Narela. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "uttar-pradesh",
        name: "Uttar Pradesh",
        type: "state",
        intro:
          "Uttar Pradesh's industry that we serve first sits on the eastern edge of the capital region, in the planned townships of Noida and Greater Noida. This state page is the parent of our Uttar Pradesh city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Electronics manufacturing",
          "Data centres and server rooms",
          "Warehousing and distribution",
        ],
        citiesServed: ["Noida", "Lucknow"],
        supportNote:
          "Supply, installation support and site visits for Uttar Pradesh sites are arranged from our Mumbai office. Write to us with the sector and what you store.",
        faqs: [
          {
            question: "Which Uttar Pradesh city page is available?",
            answer: "The Noida page covers Noida and Greater Noida and the Lucknow page covers the state capital, and more cities will follow with their own pages.",
          },
          {
            question: "How do we start an enquiry from Uttar Pradesh?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city pages.
        indexable: false,
        children: [
          {
            slug: "noida",
            name: "Noida",
            type: "city",
            intro:
              "Noida is a planned township on the eastern bank of the Yamuna, built in numbered sectors with industrial blocks, office parks and warehouses kept apart from the residential grid. Electronics assemblers and component makers, data centre operators and the warehouses that move their goods all share the same wide roads. A temperature data logger in Noida usually watches rooms that are larger and newer than those of the old city, such as a clean assembly area, a server hall or a long distribution shed, and those rooms often belong to firms with a head office elsewhere that wants one view of many sites. Greater Noida repeats the pattern further south-east, with bigger plots and longer distances between buildings. Wireless loggers with alerts and exportable reports let a regional manager keep watch without driving from one site to the next.",
            climateAngle:
              "Hot, dry summers put strong sun on large metal roofs and cold, foggy winters follow, so a big shed swings between extremes within a year, and the damp spell of the monsoon matters for boards and packaging.",
            areas: [
              {
                name: "Noida Phase I–II",
                note: "The older industrial blocks of the township, laid out in sectors, where electronics, garment and engineering units sit on mid-sized plots beside offices and service lanes.",
              },
              {
                name: "Greater Noida",
                note: "A newer township to the south-east with large plots, logistics parks and wide spacing between buildings, which suits wireless loggers that need no cable run between a store and a control room.",
              },
              {
                name: "Data centre and warehouse parks",
                note: "Purpose-built blocks of server halls and distribution sheds, where cooling is engineered but a single failed unit can still warm a room quickly.",
              },
            ],
            industries: [
              {
                slug: "electronics",
                sentence:
                  "Assembly and component firms hold boards, displays and finished sets in stores that must stay dry, and a humidity log shows whether the dehumidifier held through a damp week.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Data centre and server room operators watch inlet temperature and humidity at rack height, so that a failing cooling unit shows up as a trend before equipment raises its own alarm.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Distribution warehouses hold goods for several customers under one roof, and a reading for each bay shows which customer's stock stood in the warmest corner. Several of these sheds sit on plots large enough that a dock at one end and a store at the other behave like separate buildings, so each end is worth its own probe.",
              },
            ],
            recommendedSeries: [
              {
                slug: "virat",
                reason:
                  "Sixteen channels cover a long distribution shed across several bays and heights, so one device reports on spots that are a long walk apart.",
              },
              {
                slug: "nakshatra",
                reason:
                  "Reads relative humidity as well as temperature, which is the number that matters most in a store of boards and components.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four probes cover the inlet, the hot aisle, the cooling plant door and the UPS room of a small server hall, from a single logger.",
              },
            ],
            faqs: [
              {
                question: "Can one manager watch plants in Noida, Greater Noida and Manesar together?",
                answer:
                  "Yes. Each plant is its own site on the dashboard, shift leads receive alerts for their own rooms and a regional manager can open every site in one list and compare records side by side.",
              },
              {
                question: "How do you position probes in a server hall?",
                answer:
                  "We place probes at rack inlet height along the cold aisle, one at the top of a row where hot air collects and one near the cooling plant, and add humidity where the room has an open window or door to a corridor.",
              },
              {
                question: "What happens to the readings if a shed loses power?",
                answer:
                  "The logger keeps storing readings on its battery through a cut and sends them when the network returns, and GSM versions can still report while the building's Wi-Fi is down.",
              },
              {
                question: "Is calibration available for loggers used on an electronics line?",
                answer:
                  "Calibration of loggers and probes, and temperature mapping of larger rooms, are delivered by VEGA Calibrations, which can plan certificates around your production calendar. Tell us the ranges and the probe positions you use, and we confirm how the work is arranged and which certificates come with it.",
              },
            ],
            nearby: [
              { slug: "delhi", name: "Delhi" },
              { slug: "manesar", name: "Manesar" },
              { slug: "lucknow", name: "Lucknow" },
            ],
            metaTitle: "Temperature Data Loggers in Noida | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Noida and Greater Noida's electronics plants, data centres and warehouses. Get Solution.",
            indexable: true,
          },
          {
            slug: "lucknow",
            name: "Lucknow",
            type: "city",
            intro:
              "Lucknow is the capital of Uttar Pradesh, and its storage needs follow from that: government and private hospitals, medicine wholesalers who supply towns across the state, food distributors and cold stores that serve a large population, and industrial areas on the city's edges. A temperature data logger in Lucknow most often watches a hospital pharmacy, a stockist's medicine room or a cold store whose contents are bound for districts a long drive away. Summers are fierce, the monsoon air is heavy with moisture and the power supply to older buildings is not always steady. Alerts that reach a phone, and a record that keeps going on battery through a cut, let a pharmacy head or a stockist hear about a problem while there is still time to move the stock, and leave a dated log to show when an inspection comes.",
            climateAngle:
              "Summer heat on the plains is intense and long, and the humid monsoon that follows puts damp air into stores and cartons, so rooms are tested by both extremes within a few months of each other.",
            areas: [
              {
                name: "Chinhat",
                note: "An industrial area on the eastern side of the city where manufacturers, packaging firms and warehouse operators hold goods on larger plots along the road out of town.",
              },
              {
                name: "Amausi",
                note: "An industrial area on the southern side near the airport, with food, engineering and distribution units whose goods leave by road and air.",
              },
              {
                name: "Nadarganj",
                note: "An older industrial area in the west, with small and medium units, workshops and godowns packed on narrow plots beside residential lanes.",
              },
            ],
            industries: [
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Teaching hospitals and private clinics keep blood storage, medicine rooms and vaccine fridges that are watched through the night, and a missed power cut is the event the duty staff most need to hear about.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Stockists who supply chemists across the state hold medicines in rooms served by one or two air conditioners, so a rise in the reading is the first sign that one has tripped.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Dairy depots, sweet and bakery suppliers and food distributors keep chilled stock that moves out each morning, and an overnight record shows that a chamber held its range before the loading began.",
              },
              {
                slug: "vaccine-cold-chain",
                sentence:
                  "District cold rooms and regional vaccine stores hold stock for centres far from the city, so a log that proves unbroken storage travels with each issue.",
              },
            ],
            recommendedSeries: [
              {
                slug: "setu",
                reason:
                  "A single-point logger with an external probe sits inside a ward fridge or a vaccine refrigerator, where one number and one alert contact are all that is needed.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels spread across a stockist's medicine room or a dairy cold store show the warmest shelf, the door and the corners that a single probe would miss.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger keeps reporting from a delivery van or a district store without Wi-Fi, which suits goods that leave the city for towns with patchy coverage.",
              },
            ],
            faqs: [
              {
                question: "How is a visit arranged for Chinhat, Amausi or Nadarganj?",
                answer:
                  "Send the area, the stores and a contact through the enquiry form, WhatsApp or a call, and we group visits by side of the city. A hospital is visited around pharmacy hours and an industrial unit around its shifts.",
              },
              {
                question: "What happens to monitoring during frequent power cuts?",
                answer:
                  "Loggers run on rechargeable batteries and keep storing readings through a cut, and an alert for a lost mains supply can go to the person who looks after the room. GSM versions report even when a building's Wi-Fi is down.",
              },
              {
                question: "Can a stockist show a record to a visiting drug inspector?",
                answer:
                  "Reports for any room and any period can be exported as PDF, Excel or CSV, so a stockist can hand over a dated log instead of searching through a register.",
              },
              {
                question: "Who handles calibration of the loggers for a Lucknow hospital?",
                answer:
                  "VEGA Calibrations, our parent company, calibrates loggers and probes, and the schedule can be set so that certificates are current before an inspection date you give us.",
              },
            ],
            nearby: [
              { slug: "noida", name: "Noida" },
              { slug: "delhi", name: "Delhi" },
              { slug: "kolkata", name: "Kolkata" },
            ],
            metaTitle: "Temperature Data Loggers in Lucknow | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Lucknow's hospitals, medicine stockists and cold stores, with site visits arranged. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "haryana",
        name: "Haryana",
        type: "state",
        intro:
          "Haryana's industry that we serve first lies on the highway south of Gurugram, in the large estates and warehouse parks around Manesar. This state page is the parent of our Haryana city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Automotive and electronics",
          "Warehousing and distribution",
          "Pharmaceutical manufacturing",
        ],
        citiesServed: ["Manesar"],
        supportNote:
          "Supply, installation support and site visits for Haryana plants are arranged from our Mumbai office. Write to us with the estate and what you store.",
        faqs: [
          {
            question: "Which Haryana city page is available?",
            answer: "The Manesar page covers IMT Manesar and the warehouse parks near it, and more Haryana cities will follow with their own pages.",
          },
          {
            question: "How do we arrange a plant visit in Haryana?",
            answer: "Send the estate, the buildings and a contact through the enquiry form, WhatsApp or a call, and we agree a day with your team.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city pages.
        indexable: false,
        children: [
          {
            slug: "manesar",
            name: "Manesar",
            type: "city",
            intro:
              "Manesar lies along the Delhi–Jaipur highway south of Gurugram, and most of its industry sits inside IMT Manesar, the Industrial Model Township, and the warehouse parks that have grown up beside it. Automotive and electronics plants and their component suppliers fill the estate, with pharmaceutical units and large distribution sheds for goods moving across north India. A temperature data logger in Manesar mostly watches big, relatively new buildings: a paint and adhesive store at an assembly plant, a component room beside an electronics line, a long warehouse bay with several customers' pallets. Distances inside a single plant are long and the people responsible for a store may be a few buildings away, so alerts that follow a person to their phone and a log that survives a shift change are what make the monitoring useful.",
            climateAngle:
              "Summers are hot and dry with dust blowing across the plains, and winters are cold enough to chill unheated stores, so the same shed has to be watched against both a high and a low limit.",
            areas: [
              {
                name: "IMT Manesar",
                note: "The planned township's industrial sectors, where assembly plants, component suppliers and electronics units stand on large plots with their own stores, utilities and quality rooms.",
              },
              {
                name: "Warehouse parks along the highway",
                note: "Distribution sheds built for national logistics firms stand beside the highway and hold goods for several customers, each in a bay with its own storage conditions.",
              },
              {
                name: "Supplier units around the plants",
                note: "Smaller firms that make parts, coatings and packaging for the assembly plants keep materials in rooms that must meet the buyer's written storage limits.",
              },
            ],
            industries: [
              {
                slug: "electronics",
                sentence:
                  "Electronics lines keep components and finished units in stores that need steady, dry air, and a logged humidity trend shows the buyer how a lot was held before it was fitted.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Warehouse operators on the highway hold pallets for several customers in the same building, and a reading for each bay settles disputes about whose stock stood where.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical units and the stores that serve them hold ingredients and packed goods in controlled rooms that are reviewed during customer visits.",
              },
              {
                slug: "chemical",
                sentence:
                  "Paint, adhesive and coating stores at assembly plants carry printed storage limits, and an alert on a rising reading gives time to act before a batch is wasted.",
              },
            ],
            recommendedSeries: [
              {
                slug: "veer",
                reason:
                  "Ten channels spread through a long warehouse bay at different heights, so hot top shelves and cold floor-level pallets both show up in the same report.",
              },
              {
                slug: "rajmudra",
                reason:
                  "Two channels sit at the top and bottom of a curing or storage room, which gives a supplier a paired record for a buyer's qualification file.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger keeps reporting from a yard or a loaded vehicle where no building Wi-Fi reaches, which suits goods waiting between the plant and the road.",
              },
            ],
            faqs: [
              {
                question: "What do you need to know before a visit to an IMT Manesar plant?",
                answer:
                  "Send the plant, the stores to look at and the person who controls the gate. Most plants need visitors registered in advance, and we plan the day around that and your safety rules. If a plant has several buildings, tell us which stores matter most and we start there, so a first visit ends with a clear list of positions instead of a half-finished walk-through.",
              },
              {
                question: "Can the same setup watch a supplier's stores and our own?",
                answer:
                  "Each firm can have its own site and alert recipients, and a buyer can be given access to the reports it needs without seeing the rest of the supplier's account.",
              },
              {
                question: "How are long distances between buildings handled?",
                answer:
                  "Loggers are battery powered and report over the plant's Wi-Fi or the mobile network, so no cable is needed between a store and the control room, and we choose which fits after seeing the layout.",
              },
              {
                question: "Can mapping be arranged for a large warehouse bay?",
                answer:
                  "Temperature mapping is delivered by VEGA Calibrations, our parent company, and it shows where the warm and cold spots sit before permanent loggers are placed at those positions.",
              },
            ],
            nearby: [
              { slug: "delhi", name: "Delhi" },
              { slug: "noida", name: "Noida" },
              { slug: "jaipur", name: "Jaipur" },
            ],
            metaTitle: "Temperature Data Loggers in Manesar | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for IMT Manesar's automotive, electronics and pharma plants and highway warehouses. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "telangana",
        name: "Telangana",
        type: "state",
        intro:
          "Telangana's industry that we serve sits around its capital: pharmaceutical and chemical estates to the north-west and west, and a life-science research cluster to the north. This state page is the parent of our Telangana city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Pharmaceutical manufacturing",
          "Life-science research and laboratories",
          "Data centres and server rooms",
        ],
        citiesServed: ["Hyderabad"],
        supportNote:
          "Supply, installation support and site visits for Telangana sites are arranged from our Mumbai office. Write to us with the estate and what you store.",
        faqs: [
          {
            question: "Which Telangana city page is available?",
            answer: "The Hyderabad page covers Genome Valley, Jeedimetla, Pashamylaram and Patancheru, and more cities will follow with their own pages.",
          },
          {
            question: "How do we start an enquiry from Telangana?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "hyderabad",
            name: "Hyderabad",
            type: "city",
            intro:
              "Hyderabad's industry is arranged in rings around the old city, with pharmaceutical and chemical estates to the north-west and west, a life-science campus cluster to the north and technology parks and server halls on the western side. A temperature data logger in Hyderabad therefore watches a wider range of rooms than most cities offer: bulk-drug warehouses, vaccine and biologics cold rooms, research freezers, stability chambers and the cooling plant of a data centre. Many of these rooms answer to an auditor, whether a customer's, a regulator's or a research sponsor's, and the evidence they are asked for is a continuous, dated record rather than a signature on a round sheet. Wireless loggers with alerts to phones and email let one quality team keep watch over estates that lie far apart in traffic, and exports give each audit the record it needs.",
            climateAngle:
              "Summers are hot and dry, with roof heat that overwhelms ageing cooling in godowns, and the short, sharp monsoon brings humidity back into stores that spend most of the year dry, so both extremes need watching.",
            areas: [
              {
                name: "Genome Valley",
                note: "A life-science cluster north of the city where research campuses, biotech firms and vaccine and biologics makers keep samples and products in cold rooms and freezers.",
              },
              {
                name: "Jeedimetla",
                note: "An older estate in the north-west with bulk-drug, formulation and chemical units packed on small plots, where solvent and ingredient stores sit beside production.",
              },
              {
                name: "Pashamylaram",
                note: "An estate on the western side with pharmaceutical and chemical manufacturers on larger plots, each running its own warehouse and quality laboratory.",
              },
              {
                name: "Patancheru",
                note: "A large western industrial area where bulk-drug and chemical plants stand across wide plots, and distances between stores make wireless monitoring the practical choice.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Bulk-drug and formulation makers hold ingredients and finished packs in warehouses that customers and regulators inspect, and a continuous log is as much a part of the batch file as the label.",
              },
              {
                slug: "vaccine-cold-chain",
                sentence:
                  "Vaccine and biologics makers keep product in cold rooms and ultra-cold freezers, where a failed compressor overnight is the single event a quality team most wants to know about at once.",
              },
              {
                slug: "laboratories",
                sentence:
                  "Research and testing laboratories keep samples, reagents and cell material in freezers and incubators that each need their own limits and their own named contact.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Server halls and network rooms on the technology parks need steady air, and probes at rack height show a cooling fault as a trend before equipment complains.",
              },
            ],
            recommendedSeries: [
              {
                slug: "rajmudra",
                reason:
                  "Two channels record two points at once, such as the top and bottom of a chamber, which gives a qualification or stability study a paired record from one device.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels cover a large bulk-drug warehouse from floor to roof beam and across several aisles, so one report shows where the room is warmest.",
              },
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity as well as temperature, which matters in stores that are bone dry for months and then take on damp air in the monsoon.",
              },
            ],
            faqs: [
              {
                question: "Can you visit Jeedimetla, Patancheru and Genome Valley on one trip?",
                answer:
                  "We plan them in an order that follows the road, since the estates lie in different directions from the city. Send the sites, the rooms and the contact at each, and we propose a sequence that suits their entry rules.",
              },
              {
                question: "What alert set-up suits an ultra-cold freezer holding research material?",
                answer:
                  "A low-range probe goes inside the freezer with a tight high limit, and alerts go to two named people so that a night-time fault is never left with one phone. Limits and contacts are set freezer by freezer.",
              },
              {
                question: "Can records be handed to an auditor from a customer?",
                answer:
                  "Reports can be exported for any room and any period as PDF, Excel or CSV, and calibration records can be kept against each device, so the file an auditor asks for is ready without retyping.",
              },
              {
                question: "Who arranges mapping of a large Hyderabad warehouse?",
                answer:
                  "VEGA Calibrations, our parent company, carries out temperature mapping and calibration, and the study can be planned before loggers are placed so each permanent probe sits where the room is least stable.",
              },
            ],
            nearby: [
              { slug: "bengaluru", name: "Bengaluru" },
              { slug: "chennai", name: "Chennai" },
              { slug: "pune", name: "Pune" },
            ],
            metaTitle: "Temperature Data Loggers in Hyderabad | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Hyderabad's pharma estates, life-science labs and data centres, with site visits arranged. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "karnataka",
        name: "Karnataka",
        type: "state",
        intro:
          "Karnataka's industry that we serve first is concentrated around its capital: engineering estates in the north-west, electronics and technology parks in the south and east, and a research and biotech base that runs across the city. This state page is the parent of our Karnataka city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Electronics and technology parks",
          "Biotech and research laboratories",
          "Data centres and server rooms",
        ],
        citiesServed: ["Bengaluru"],
        supportNote:
          "Supply, installation support and site visits for Karnataka sites are arranged from our Mumbai office. Write to us with the area and what you store.",
        faqs: [
          {
            question: "Which Karnataka city page is available?",
            answer: "The Bengaluru page covers Peenya, Electronic City, Whitefield, Bommasandra and Jigani, and more cities will follow with their own pages.",
          },
          {
            question: "How do we start an enquiry from Karnataka?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "bengaluru",
            name: "Bengaluru",
            type: "city",
            intro:
              "Bengaluru, still called Bangalore by many who live and work there, is a city of campuses more than of factories. Technology parks, research institutes, biotech firms, hospitals and electronics makers share the same ring roads with the older engineering estates of the north-west. A temperature data logger in Bengaluru therefore spends much of its time in rooms that exist to protect something delicate: a server hall, a laboratory freezer, a clean assembly area, an operating theatre store. The climate is mild, so the load comes from inside the building, from racks and compressors and people, and a cooling fault can raise a room's temperature faster than the weather ever would. Alerts to phones and email, with a dated record behind them, let a facilities or quality team look after several campuses without sitting beside the equipment.",
            climateAngle:
              "The weather is mild for most of the year, so heat in a room usually comes from its own equipment, and the afternoon showers of the monsoon months raise humidity in stores that are otherwise comfortably dry.",
            areas: [
              {
                name: "Peenya",
                note: "One of the older and larger engineering estates, in the north-west, where machine shops, component makers and small electronics firms hold material in sheds on compact plots.",
              },
              {
                name: "Electronic City",
                note: "A technology and electronics township in the south with large campuses, laboratories and server rooms in buildings that were designed around air conditioning.",
              },
              {
                name: "Whitefield",
                note: "A technology and healthcare district on the east side, where office parks, research centres and hospitals keep server halls, pharmacies and laboratories on one campus.",
              },
              {
                name: "Bommasandra",
                note: "An industrial area on the south-eastern edge with pharmaceutical, electronics and engineering units on larger plots, linked to the city by a busy highway.",
              },
              {
                name: "Jigani",
                note: "An estate further south where newer plants and warehouses have more space, and the distances between buildings favour wireless monitoring.",
              },
            ],
            industries: [
              {
                slug: "laboratories",
                sentence:
                  "Research institutes and biotech firms keep reagents, cell material and samples in freezers and incubators, and a probe inside each unit gives a record that does not depend on the door display.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Server halls and network closets on the technology parks run on engineered cooling, and a logged trend at rack inlet height shows a failing unit long before equipment trips its own alarm.",
              },
              {
                slug: "electronics",
                sentence:
                  "Electronics makers hold components and finished boards in stores that must stay dry, and a humidity record shows how a room behaved through the showers of the rainy months.",
              },
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Hospital pharmacies, blood banks and vaccine fridges are watched around the clock, with alerts that reach the duty pharmacist when a door is left open or a unit loses power.",
              },
            ],
            recommendedSeries: [
              {
                slug: "setu",
                reason:
                  "A single-point logger with an optional external probe fits a laboratory fridge or a ward medicine cabinet without changing how the unit is used.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four probes cover the cold aisle, the hot aisle, the cooling unit door and the power room of a server hall from one logger.",
              },
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity along with temperature, which is the number that decides whether a component store or a clean area is within its limits in the rainy months.",
              },
            ],
            faqs: [
              {
                question: "Do you cover Bangalore as well as Bengaluru?",
                answer:
                  "Yes, they are the same city. Whichever name you use, send the area and what you store through the enquiry form, WhatsApp or a call, and we arrange the visit.",
              },
              {
                question: "How is a server room different from a store when placing probes?",
                answer:
                  "A server hall is watched at rack inlet height along the cold aisle and at the top of a row where heat collects, while a store is watched at the warmest shelf and near the door. We set limits for each room's purpose.",
              },
              {
                question: "Can several campuses be watched by one facilities team?",
                answer:
                  "Yes. Each campus is a site on the dashboard, each building's alerts go to the person who looks after it and a head of facilities sees every site together, with reports that can be exported for any period.",
              },
              {
                question: "Can we have the loggers calibrated before a laboratory audit?",
                answer:
                  "Calibration of loggers and probes is delivered by VEGA Calibrations, our parent company, and can be timed ahead of an audit date. Send the audit date and the ranges you use and we confirm how it is arranged.",
              },
            ],
            nearby: [
              { slug: "chennai", name: "Chennai" },
              { slug: "hyderabad", name: "Hyderabad" },
              { slug: "coimbatore", name: "Coimbatore" },
            ],
            metaTitle: "Temperature Data Loggers in Bengaluru | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers in Bengaluru (Bangalore) for labs, data centres, electronics plants and hospitals. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "tamil-nadu",
        name: "Tamil Nadu",
        type: "state",
        intro:
          "Tamil Nadu's industry that we serve first sits around its capital and the coast: engineering and electronics estates in the north-west, and the manufacturing parks to the south-west that feed the ports. This state page is the parent of our Tamil Nadu city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Electronics and automotive manufacturing",
          "Pharmaceutical manufacturing",
          "Port logistics and distribution",
        ],
        citiesServed: ["Chennai", "Coimbatore"],
        supportNote:
          "Supply, installation support and site visits for Tamil Nadu sites are arranged from our Mumbai office. Write to us with the estate and what you store.",
        faqs: [
          {
            question: "Which Tamil Nadu city page is available?",
            answer: "The Chennai page covers Ambattur, Sriperumbudur and Oragadam and the Coimbatore page covers the western mills and estates, and more cities will follow with their own pages.",
          },
          {
            question: "How do we start an enquiry from Tamil Nadu?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "chennai",
            name: "Chennai",
            type: "city",
            intro:
              "Chennai is a port city whose industry fans out inland: engineering and electronics estates on the north-western side, large manufacturing parks to the south-west along the highways, and the container yards and warehouses that sit between the factories and the sea. A temperature data logger in Chennai has to cope with salty, humid air as much as with heat, and with goods that spend days between a plant and a ship. Pharmaceutical, electronics, automotive component and food firms all keep stock here that is sensitive to both, and many of them export, so customers abroad ask for the record of how a consignment was held. Wireless loggers with alerts to phones and email, and a dated log that can be exported by lot, give a plant and its forwarder one shared account.",
            climateAngle:
              "The coast keeps heat and humidity high for most of the year and the north-east monsoon adds heavy rain late in it, so stores face sweating cartons and corroding contacts as well as warm air, and storms can cut power for long periods.",
            areas: [
              {
                name: "Ambattur",
                note: "A large industrial estate in the north-west with engineering, electronics and small manufacturing units on compact plots, many of them supplying the larger plants further out.",
              },
              {
                name: "Sriperumbudur",
                note: "A manufacturing hub to the south-west where electronics and automotive plants and their suppliers stand on large plots across a wide park.",
              },
              {
                name: "Oragadam",
                note: "An industrial park further along the south-western corridor with automotive, electronics and warehousing units that move goods toward the ports.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Pharmaceutical makers and distributors hold ingredients and finished packs in rooms with stated limits, and export customers expect a log that shows the room stayed in range through the humid months.",
              },
              {
                slug: "electronics",
                sentence:
                  "Electronics and component plants keep boards, connectors and finished sets in stores where salty air makes damp a quiet cause of failures, so humidity is watched alongside temperature.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Food processors and seafood exporters hold chilled and frozen stock in chambers that must stay in range through a long power cut during a storm.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Container freight stations and port-side warehouses hold goods that wait on a vessel's schedule, and a record for each bay shows how long a lot stood in coastal heat.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads relative humidity together with temperature, which matters most in stores where sea air carries moisture through every door.",
              },
              {
                slug: "virat",
                reason:
                  "Sixteen channels cover a large export warehouse across racks, dock doors and floor positions, so one device reports on a hall that would otherwise need many.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe keeps reporting from a container or a yard where there is no building Wi-Fi, so a consignment's journey to the port is on record.",
              },
            ],
            faqs: [
              {
                question: "Can you visit Ambattur, Sriperumbudur and Oragadam in one trip?",
                answer:
                  "We plan them as separate days by direction, since Ambattur lies on the north-western side and the other two on the south-western corridor. Send the plants, the stores and the contacts and we propose an order.",
              },
              {
                question: "How do you handle a power cut during a heavy storm?",
                answer:
                  "Loggers carry on recording on their batteries, send stored readings when the network returns and GSM versions can still report if a building's Wi-Fi is down. Alerts for a lost mains supply go to the named people.",
              },
              {
                question: "Can we give an overseas customer the record of a consignment?",
                answer:
                  "Journey and storage reports can be exported as PDF, Excel or CSV for each lot, so the file that travels with an export shipment shows the conditions it was held in before the port.",
              },
              {
                question: "Who handles calibration and mapping for a Chennai plant?",
                answer:
                  "VEGA Calibrations, our parent company, calibrates loggers and probes and carries out temperature mapping, and the work can be scheduled with the visit so that placement and certificates are settled together.",
              },
            ],
            nearby: [
              { slug: "bengaluru", name: "Bengaluru" },
              { slug: "coimbatore", name: "Coimbatore" },
              { slug: "hyderabad", name: "Hyderabad" },
            ],
            metaTitle: "Temperature Data Loggers in Chennai | Prithvi",
            metaDescription:
              "WiFi and GSM temperature and humidity data loggers for Chennai's pharma, electronics and port-linked warehouses, with site visits. Get Solution.",
            indexable: true,
          },
          {
            slug: "coimbatore",
            name: "Coimbatore",
            type: "city",
            intro:
              "Coimbatore is an industrial city of mills and workshops: spinning and weaving units, pump, motor and machine-tool makers, foundries, control-panel assemblers and a large number of small suppliers, backed by a busy hospital sector and food businesses. A temperature data logger in Coimbatore often has humidity to think about before heat, because yarn and fabric take up and lose moisture with the air around them, and that changes how they run on a machine and how they weigh. The city's own climate is moderate, with the cooling influence of the western hills, but the air swings between dry spells and damp ones, so a store that behaved last month may not this month. Wireless loggers with alerts to phones and email, and a dated humidity record, give a mill or a workshop evidence of what its rooms actually did.",
            climateAngle:
              "Temperatures stay moderate through most of the year, but humidity swings between dry spells and the damp weeks of the two monsoons, and that swing is what yarn, fabric and electrical stores respond to.",
            areas: [
              {
                name: "SIDCO industrial estates",
                note: "Planned estates of small and medium units where engineering shops, foundries and component makers hold material in sheds on regular plots near the city.",
              },
              {
                name: "Textile mills and spinning units",
                note: "Mills keep cotton, yarn and finished fabric in large halls where moisture content decides how the material runs and how heavy a lot weighs.",
              },
              {
                name: "Hospitals and diagnostic centres",
                note: "A large healthcare sector draws patients from the region, with pharmacies, blood storage and laboratories packed on busy hospital campuses.",
              },
            ],
            industries: [
              {
                slug: "textile",
                sentence:
                  "Spinning and weaving units store cotton, yarn and cloth whose moisture content shifts with the air, and a humidity trend by hall shows which room drifted before a lot ran differently on the machines.",
              },
              {
                slug: "electronics",
                sentence:
                  "Pump, motor and control-panel makers keep windings, boards and instruments in stores that must not sweat, and a logged cupboard shows that a damp week did not reach the components.",
              },
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Hospital pharmacies and blood banks hold stock for patients arriving from several districts, and an alert to the duty staff covers the hours between rounds.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Snack makers, sweet shops and food processors hold ingredients and finished goods in chambers and dry stores that must be shown to have stayed in range through a day of loading.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads relative humidity along with temperature, which is the number that decides how yarn, fabric and electrical windings behave in a store.",
              },
              {
                slug: "veer",
                reason:
                  "Ten channels spread through a long spinning hall or a mill godown show where the air is dampest and where the top stack runs warm, in one report.",
              },
              {
                slug: "setu",
                reason:
                  "A single-point logger with an optional external probe fits a hospital pharmacy fridge or a laboratory freezer that needs one limit and one named contact.",
              },
            ],
            faqs: [
              {
                question: "Why does a textile store need humidity monitoring rather than temperature alone?",
                answer:
                  "Cotton and yarn gain and lose water with the surrounding air, and a store at a comfortable temperature can still be too damp or too dry. A humidity reading by hall shows when conditions moved.",
              },
              {
                question: "How do you cover the SIDCO estates and the mills in one visit?",
                answer:
                  "Send the estate, the units and a contact at each through the enquiry form, WhatsApp or a call, and we group the stops by side of the city so one day covers neighbours.",
              },
              {
                question: "Can one logger watch a long spinning hall?",
                answer:
                  "A multi-channel logger takes several probes on cables of different lengths, so one device can report from the near end, the middle and the far end of a hall and from the stacks at height.",
              },
              {
                question: "Is calibration of humidity sensors available locally?",
                answer:
                  "VEGA Calibrations, our parent company, calibrates loggers and their probes, and we confirm the arrangement for humidity sensors when you send the model and the range you work to.",
              },
            ],
            nearby: [
              { slug: "kochi", name: "Kochi" },
              { slug: "chennai", name: "Chennai" },
              { slug: "bengaluru", name: "Bengaluru" },
            ],
            metaTitle: "Temperature Data Loggers in Coimbatore | Prithvi",
            metaDescription:
              "WiFi and GSM temperature and humidity data loggers for Coimbatore's mills, engineering estates, hospitals and food firms. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "chandigarh",
        name: "Chandigarh",
        type: "state",
        intro:
          "Chandigarh is a union territory that is the shared capital of Punjab and Haryana, with the industrial areas of Mohali and Panchkula running into its edges. This page is the parent of our Chandigarh city page; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Hospitals and diagnostic laboratories",
          "Pharmaceutical distribution",
          "Food and dairy distribution",
        ],
        citiesServed: ["Chandigarh"],
        supportNote:
          "Supply, installation support and site visits for the Chandigarh region are arranged from our Mumbai office. Write to us with the area and what you store.",
        faqs: [
          {
            question: "Which page covers Mohali and Panchkula?",
            answer: "The Chandigarh city page describes the industrial area phases, Mohali and Panchkula together.",
          },
          {
            question: "How do we start an enquiry from the Chandigarh region?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "chandigarh",
            name: "Chandigarh",
            type: "city",
            intro:
              "Chandigarh is a planned city, laid out in numbered sectors with its industrial areas set apart, and it is the shared capital of two states whose neighbouring towns of Mohali and Panchkula have grown into the city's edges. A temperature data logger in Chandigarh mostly serves hospitals and research institutes, the medicine distributors who supply the surrounding districts, and the food and dairy firms that keep chilled stock for a prosperous region. Rooms are modern but busy: a pharmacy store that is opened a hundred times a day, a vaccine fridge in a clinic, a chiller in a distribution depot. Alerts to a phone and a dated record that can be exported on request give a duty pharmacist or a depot manager an early warning and an answer for an inspection. Because the sectors are close together, one team can look after sites on both sides of a sector road from a single dashboard.",
            climateAngle:
              "Summers are hot and dry, and winters are cold enough to chill stores that were only ever designed to keep heat out, so a low limit matters here alongside the high one.",
            areas: [
              {
                name: "Industrial Area Phase I–II",
                note: "The city's own planned industrial areas, where printing, engineering, food and pharmaceutical distribution firms stand on regular plots with stores beside the work floor.",
              },
              {
                name: "Mohali",
                note: "A neighbouring town to the south-west with technology parks, pharmaceutical units and warehouses on larger plots, and server rooms in the office blocks around them.",
              },
              {
                name: "Panchkula",
                note: "A town on the Haryana side to the east, where industrial plots, medicine stockists and healthcare facilities serve the northern districts.",
              },
            ],
            industries: [
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Large hospitals and research institutes keep blood storage and medicine rooms under constant watch, and an alert that reaches a named duty person is part of every night procedure.",
              },
              {
                slug: "pharmaceutical",
                sentence:
                  "Distributors that supply chemists across the region keep medicines in rooms where doors open all day, so a reading every few minutes shows what a busy afternoon did to the shelf.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Dairy, bakery and packaged-food firms hold chilled stock in depots that dispatch before dawn, and a log kept overnight shows the chambers stayed in range through the cold hours.",
              },
              {
                slug: "laboratories",
                sentence:
                  "Diagnostic and research laboratories keep samples and reagents in fridges and freezers, each with its own limit, and one dashboard lists every unit by room.",
              },
            ],
            recommendedSeries: [
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity as well as temperature, which suits pharmacy stores that go from dry winter air to a damp monsoon within a few months.",
              },
              {
                slug: "dhruva",
                reason:
                  "Four channels cover a distributor's medicine room at several shelf heights and at the door, which shows how a room really behaves between openings.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe rides in a delivery vehicle or sits in a rural stockist's room, reporting where no Wi-Fi is available.",
              },
            ],
            faqs: [
              {
                question: "Do you cover Mohali and Panchkula as well as the city?",
                answer:
                  "Yes, they are served together with the city. Send the town, the stores and a contact through the enquiry form, WhatsApp or a call, and we plan the visits by town so one day covers neighbours. Hospitals are visited around pharmacy hours, and we agree who will let us into each room before we arrive.",
              },
              {
                question: "Can a logger raise an alert when a store gets too cold?",
                answer:
                  "A low limit can be set next to the high one, so a store that drops below its range on a winter night raises an alert in the same way as a warm afternoon does.",
              },
              {
                question: "How do clinics with several floors watch every fridge?",
                answer:
                  "Each fridge is a device in a room under the clinic's site, and alerts go to the person for that floor while a manager sees every floor in one list and can export a report for any period.",
              },
              {
                question: "Is calibration available before a healthcare audit?",
                answer:
                  "VEGA Calibrations, our parent company, calibrates loggers and probes and can schedule the work ahead of an audit date, with certificates stored against each device on the dashboard.",
              },
            ],
            nearby: [
              { slug: "baddi", name: "Baddi" },
              { slug: "delhi", name: "Delhi" },
              { slug: "manesar", name: "Manesar" },
            ],
            metaTitle: "Temperature Data Loggers in Chandigarh | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Chandigarh, Mohali and Panchkula hospitals, pharma distributors and food depots. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "himachal-pradesh",
        name: "Himachal Pradesh",
        type: "state",
        intro:
          "Himachal Pradesh's industry that we serve first sits in the foothills near the plains, where pharmaceutical manufacturers have gathered around Baddi, Barotiwala and Nalagarh. This state page is the parent of our Himachal Pradesh city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Pharmaceutical manufacturing",
          "Laboratories and quality control",
          "Packaging and allied units",
        ],
        citiesServed: ["Baddi"],
        supportNote:
          "Supply, installation support and site visits for Himachal Pradesh plants are arranged from our Mumbai office. Write to us with the estate and what you store.",
        faqs: [
          {
            question: "Which Himachal Pradesh page is available?",
            answer: "The Baddi page covers Baddi, Barotiwala and Nalagarh, and more of the state will follow with its own pages.",
          },
          {
            question: "How do we arrange a plant visit in the foothills?",
            answer: "Send the estate, the plant and a contact through the enquiry form, WhatsApp or a call, and we agree a day with your team.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "baddi",
            name: "Baddi",
            type: "city",
            intro:
              "Baddi sits in the foothills of Himachal Pradesh in Solan district, and with Barotiwala and Nalagarh nearby it forms a cluster of pharmaceutical manufacturers set among hills and farmland close to the border with the plains. A temperature data logger in Baddi watches the stores of formulation plants: raw-material warehouses, packaging stores, finished-goods rooms and the quality laboratory, each with a stated range. Plants are large and built to work to written procedures, and those procedures call for a record that is continuous and traceable. The foothill climate swings through the year, so a store that is easy in March can strain in June, and one dashboard that shows every room at once helps a quality head see which part of a plant needs attention first. Where a company runs plants in more than one of the three estates, the same alert rules can be copied from one plant to the next so every site is judged on the same footing.",
            climateAngle:
              "Summers are hot, the monsoon in the hills is heavy and winter nights are cold, so a single warehouse sees a wide seasonal range that changes the load on cooling and dehumidification through the year.",
            areas: [
              {
                name: "Baddi",
                note: "The main industrial area, where formulation plants and their packaging suppliers stand on plots of many sizes, each with its own warehouses and quality laboratory.",
              },
              {
                name: "Barotiwala",
                note: "A neighbouring industrial area with pharmaceutical plants and allied units, reached by a short drive on the same road network.",
              },
              {
                name: "Nalagarh",
                note: "A further estate toward the plains, with pharmaceutical and packaging units whose distance from one another favours wireless loggers over cable.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Formulation plants hold raw materials, in-process goods and finished packs in warehouses that follow written storage limits, and a continuous log sits beside the batch record as evidence the limit held.",
              },
              {
                slug: "laboratories",
                sentence:
                  "Quality control laboratories keep retained samples, stability chambers and reference standards that each need their own watched limits and a named contact.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Warehouse operators in the cluster hold packaging and finished goods for several plants and need a record by bay to show whose stock stood where.",
              },
              {
                slug: "chemical",
                sentence:
                  "Suppliers of excipients, solvents and packaging chemicals store drums with printed limits, and a rise in the reading warns the store keeper before a lot is compromised.",
              },
            ],
            recommendedSeries: [
              {
                slug: "rajmudra",
                reason:
                  "Two channels sit at the top and bottom of a stability chamber or a storage room, giving a paired record that a qualification report can use directly.",
              },
              {
                slug: "virat",
                reason:
                  "Sixteen channels cover a large raw-material or finished-goods warehouse from floor to roof beam, so one report shows where the building is least stable.",
              },
              {
                slug: "setu",
                reason:
                  "A single-point logger with an external probe fits a laboratory fridge or a retention-sample cabinet without changing how the unit is used.",
              },
            ],
            faqs: [
              {
                question: "Can you cover Baddi, Barotiwala and Nalagarh on one trip?",
                answer:
                  "We plan them as a sequence along the same roads. Send the plants, the stores and the contact at each, and we propose an order that suits their gate rules and shifts.",
              },
              {
                question: "What do pharmaceutical plants usually need arranged before a visit?",
                answer:
                  "Most plants register visitors in advance and ask for gowning or footwear rules to be followed in production areas. Tell us what applies and we plan the walk-through around it. A first visit usually ends with a short list of rooms, probe positions and alert contacts that your quality head can approve before anything is fitted.",
              },
              {
                question: "Can mapping be done before permanent loggers are fixed?",
                answer:
                  "Yes. VEGA Calibrations, our parent company, maps temperature in a warehouse or chamber, and the permanent loggers are then placed at the positions the study shows to be least stable.",
              },
              {
                question: "Does one dashboard work for several plants of the same group?",
                answer:
                  "Each plant is its own site with its own alert recipients, and a group quality head can open every site in one list, compare records and export a report for any room and period.",
              },
            ],
            nearby: [
              { slug: "chandigarh", name: "Chandigarh" },
              { slug: "delhi", name: "Delhi" },
            ],
            metaTitle: "Temperature Data Loggers in Baddi | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Baddi, Barotiwala and Nalagarh pharma plants and laboratories, with site visits. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "kerala",
        name: "Kerala",
        type: "state",
        intro:
          "Kerala's industry that we serve first lies around the port city of Kochi: seafood and spice exporters, port-side warehouses, a large hospital sector and the technology park at Kakkanad. This state page is the parent of our Kerala city pages; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Seafood processing and export",
          "Port logistics and warehousing",
          "Hospitals and healthcare",
        ],
        citiesServed: ["Kochi"],
        supportNote:
          "Supply, installation support and site visits for Kerala sites are arranged from our Mumbai office. Write to us with the area and what you store.",
        faqs: [
          {
            question: "Which Kerala city page is available?",
            answer: "The Kochi page covers Kakkanad, Kalamassery and Edayar, and more of the state will follow with its own pages.",
          },
          {
            question: "How do we start an enquiry from Kerala?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "kochi",
            name: "Kochi",
            type: "city",
            intro:
              "Kochi is a port city built across islands and backwaters, and its industry is arranged around the water: seafood processors and exporters, spice traders, shipping agents and container yards, a large private hospital sector and the technology park at Kakkanad. A temperature data logger in Kochi spends its life in air that is warm and wet for most of the year, watching cold rooms that are opened many times a day, freezers that wait for a vessel and warehouses where cartons sweat. Many of the goods are exported, so the buyer abroad asks for a record of how a lot was held before it left. Wireless loggers with alerts to phones and email, and reports that can be exported by lot, give a processor and its forwarder the same dated account.",
            climateAngle:
              "The air stays warm and very humid for most months and the southwest monsoon is heavy and long, so condensation, corroded contacts and long power cuts in storms are as common a risk to a cold chain as ordinary heat.",
            areas: [
              {
                name: "Kakkanad",
                note: "A technology and commercial district to the east of the city, with the IT park and its server rooms, plus hospitals and laboratories in the surrounding blocks.",
              },
              {
                name: "Kalamassery",
                note: "An industrial area north of the city with engineering, processing and warehousing units, and the roads that carry goods toward the port.",
              },
              {
                name: "Edayar",
                note: "An industrial estate on the northern side with food, chemical and manufacturing units on the river bank, where goods leave by road for the harbour.",
              },
            ],
            industries: [
              {
                slug: "food-beverage",
                sentence:
                  "Seafood processors and spice exporters keep freezers, chill rooms and dry stores that must hold their ranges through a long storm, with an overnight record to show an overseas buyer.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Container yards, freight stations and shipping agents hold goods that wait on a vessel, and a reading for each bay shows how long a lot stood in the humid heat of the harbour.",
              },
              {
                slug: "hospitals-blood-banks",
                sentence:
                  "Large private hospitals keep blood storage, vaccine fridges and pharmacies on campuses where a monsoon outage can last hours, so battery-backed logging carries on while the mains is down.",
              },
              {
                slug: "data-centers",
                sentence:
                  "Server rooms in the technology park cool against humid air, and a logged trend at rack height shows a cooling unit losing capacity long before equipment raises its own alarm.",
              },
            ],
            recommendedSeries: [
              {
                slug: "dhruva",
                reason:
                  "Four channels watch a seafood chill room from the floor stack to the top rack and the door, so a cold spot and a warm door are both visible in one report.",
              },
              {
                slug: "vayu",
                reason:
                  "A GSM logger with an external probe rides in a reefer container or a truck on its way to the harbour, reporting where a yard has no building Wi-Fi.",
              },
              {
                slug: "virat",
                reason:
                  "Sixteen channels cover a long freezer warehouse or a port-side shed across racks and dock doors, so one device reports on a hall that would otherwise need many.",
              },
            ],
            faqs: [
              {
                question: "How is monitoring arranged for an export consignment of seafood?",
                answer:
                  "A logger on the cold room records the storage period and one in the container or truck records the journey, and a report for each lot can be exported as PDF, Excel or CSV for the buyer.",
              },
              {
                question: "What happens to the record in a long monsoon power cut?",
                answer:
                  "Loggers keep storing readings on their batteries, send them when the network returns and GSM versions can still report while the building's Wi-Fi is down, with an alert for the lost mains supply.",
              },
              {
                question: "Can you cover Kakkanad, Kalamassery and Edayar in one visit?",
                answer:
                  "Yes, we plan them as a short round since they lie within one corridor of the city. Send the sites, the rooms and a contact at each and we agree a sequence with you.",
              },
              {
                question: "Who looks after calibration for an exporter's cold rooms?",
                answer:
                  "VEGA Calibrations, our parent company, calibrates loggers and probes and carries out temperature mapping, which can be planned ahead of an overseas buyer's inspection.",
              },
            ],
            nearby: [
              { slug: "coimbatore", name: "Coimbatore" },
              { slug: "bengaluru", name: "Bengaluru" },
              { slug: "goa", name: "Goa" },
            ],
            metaTitle: "Temperature Data Loggers in Kochi | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Kochi's seafood cold chain, port warehouses and hospitals, with site visits arranged. Get Solution.",
            indexable: true,
          },
        ],
      },
      {
        slug: "goa",
        name: "Goa",
        type: "state",
        intro:
          "Goa's industry that we serve first sits in the industrial estates of the interior, where pharmaceutical manufacturers work, and among the hotels and kitchens of the coast. This state page is the parent of our Goa city page; it will be written in full when the hub pages are built.",
        localIndustries: [
          "Pharmaceutical manufacturing",
          "Hotels and restaurant kitchens",
          "Food distribution",
        ],
        citiesServed: ["Goa"],
        supportNote:
          "Supply, installation support and site visits for Goa sites are arranged from our Mumbai office. Write to us with the area and what you store.",
        faqs: [
          {
            question: "Which Goa page covers the industrial estates?",
            answer: "The Goa city page describes Verna and Kundaim and the hotels and kitchens of the coast.",
          },
          {
            question: "How do we start an enquiry from Goa?",
            answer: "Send the location and what you need to monitor through the enquiry form, WhatsApp or a call, and our team replies to discuss it.",
          },
        ],
        // Noindex until its hub prompt runs; it exists as the parent of its city page.
        indexable: false,
        children: [
          {
            slug: "goa",
            name: "Goa",
            type: "city",
            intro:
              "Goa is better known for beaches than for factories, but its inland estates hold a notable group of pharmaceutical manufacturers, and the coast is lined with hotels, resorts, restaurants and the food suppliers that keep them stocked. A temperature data logger in Goa therefore has two quite different jobs: watching raw-material and finished-goods stores in a manufacturing plant, and watching walk-in fridges, bar coolers and banquet kitchens that work hardest at the peak of the tourist season. Air on the coast is salty and humid for most of the year, the monsoon is heavy and rooms that empty out in the off-season can drift unseen. Alerts to a phone and a dated record let a plant head or a hotel engineer know which room needs attention first.",
            climateAngle:
              "Humid coastal air and a heavy monsoon keep damp in every store, and the hot weeks before the rains push walk-in fridges and shed roofs to their limits just as the busiest part of the season arrives.",
            areas: [
              {
                name: "Verna",
                note: "An industrial estate in the south with pharmaceutical and packaging plants, each with raw-material stores and finished-goods rooms behind secured gates.",
              },
              {
                name: "Kundaim",
                note: "An inland estate where manufacturers have more room and longer walks between buildings, which suits battery-powered wireless loggers.",
              },
              {
                name: "Hotel and restaurant kitchens along the coast",
                note: "Resorts and restaurants run walk-in fridges, bar coolers and banquet kitchens that are loaded hardest during the tourist season and sometimes closed in the off-season.",
              },
            ],
            industries: [
              {
                slug: "pharmaceutical",
                sentence:
                  "Formulation plants hold ingredients and finished packs in controlled rooms where the monsoon tests dehumidification, and a continuous record backs each batch file, so a quality head can answer a customer's audit from a dated report instead of a manual round sheet.",
              },
              {
                slug: "food-beverage",
                sentence:
                  "Hotels, caterers and food suppliers keep walk-in fridges and freezers that are opened constantly, so an alert to a named engineer matters most at the busiest hour of the evening.",
              },
              {
                slug: "logistics-warehousing",
                sentence:
                  "Distributors that supply the coast hold chilled and dry stock in warehouses inland, and a reading for each bay shows what happened between the depot and the kitchen door.",
              },
              {
                slug: "laboratories",
                sentence:
                  "Plant laboratories and testing houses keep samples and standards in fridges and cabinets that each need their own limit, and an export of the log is ready for an inspection.",
              },
            ],
            recommendedSeries: [
              {
                slug: "rajmudra",
                reason:
                  "Two channels record a stability room or a validation run at two points at once, giving a plant a paired record from a single device.",
              },
              {
                slug: "setu",
                reason:
                  "A single-point logger with an external probe fits a kitchen walk-in or a bar cooler without altering the way the unit is used.",
              },
              {
                slug: "nakshatra",
                reason:
                  "Reads humidity as well as temperature, which tells a plant or a resort store when the monsoon has beaten its dehumidifier.",
              },
            ],
            faqs: [
              {
                question: "Do you cover hotels as well as manufacturing plants in Goa?",
                answer:
                  "Yes. A hotel's kitchens and cold rooms and a plant's warehouses each appear as rooms on the dashboard, with alerts that go to the engineer or the quality head who looks after them.",
              },
              {
                question: "How are visits arranged around the tourist season?",
                answer:
                  "Tell us the busiest weeks and the quietest ones when you write through the enquiry form, WhatsApp or a call, and we propose a day when your kitchens and stores can spare time for us. A first visit is usually a short walk through the walk-ins, the dry store and the plant room, which is enough to list the positions and the people who should receive each alert.",
              },
              {
                question: "What about rooms that stand empty in the off-season?",
                answer:
                  "A logger left in an empty room keeps recording, and an alert for a door opened or a temperature drifting tells the engineer that something has changed in a room nobody visits. When the season starts again, the log from the quiet months shows whether a unit held through the damp and is ready to be loaded.",
              },
              {
                question: "Who handles calibration and mapping for a Goa plant?",
                answer:
                  "VEGA Calibrations, our parent company, carries out calibration and temperature mapping, and the work can be planned with the visit so placement and certificates are settled together.",
              },
            ],
            nearby: [
              { slug: "pune", name: "Pune" },
              { slug: "mumbai", name: "Mumbai" },
              { slug: "kochi", name: "Kochi" },
            ],
            metaTitle: "Temperature Data Loggers in Goa | Prithvi",
            metaDescription:
              "WiFi and GSM temperature data loggers for Goa's pharma plants in Verna and Kundaim and coastal hotel kitchens. Get Solution.",
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
    children: [
      {
        slug: "riyadh",
        name: "Riyadh",
        type: "city",
        intro:
          "Riyadh sits in the middle of the Arabian desert, far from any port, so almost everything its hospitals, pharmacies and food businesses store has travelled a long way and then waits in a warehouse before it is used. A temperature data logger in Riyadh watches those waiting rooms: distribution warehouses that hold medicines for chemists across the region, hospital stores, and chilled and frozen food depots fed by long road journeys. The dry heat of the city is severe for much of the year, cooling plants work close to their limits for months, and a single failed unit can warm a large room in a short time. Prithvi supplies WiFi loggers from India with alerts to phones and email, and sets them up with your team remotely, so a quality manager can follow a room's record without being on site.",
        climateAngle:
          "Extreme dry heat keeps air conditioning and refrigeration under load for most of the year, so a logger earns its place by showing a trend toward trouble in the afternoon before a unit trips, rather than a failure discovered at dawn.",
        areas: [
          {
            name: "Industrial zones",
            note: "Manufacturing and processing zones on the edges of the city, where plants hold raw materials and finished goods in large halls that are cooled against desert heat.",
          },
          {
            name: "Logistics and distribution zones",
            note: "Distribution parks and freight yards where goods arrive after long road journeys and wait in warehouses before being sent on to shops, clinics and hospitals.",
          },
          {
            name: "Pharmaceutical and food warehouses",
            note: "Temperature-controlled stores for medicines and chilled and frozen food, often several rooms in one building each with its own stated range.",
          },
        ],
        industries: [
          {
            slug: "pharmaceutical",
            sentence:
              "Medicine distributors hold stock for pharmacies across a wide region in warehouses that are cooled round the clock, and a continuous record shows how a room behaved on the hottest afternoons.",
          },
          {
            slug: "hospitals-blood-banks",
            sentence:
              "Hospital pharmacies and blood storage need an alert that reaches a named person when a fridge or a room drifts, since a failed compressor can go unnoticed for hours in a large building.",
          },
          {
            slug: "food-beverage",
            sentence:
              "Chilled and frozen food depots receive loads from long road journeys, and a log kept at the dock and in the chamber shows where in the chain a warm spell began.",
          },
          {
            slug: "logistics-warehousing",
            sentence:
              "Distribution warehouses hold goods for several customers and need readings by bay, because a single air-conditioning unit failing in one corner affects only some of the stock.",
          },
        ],
        recommendedSeries: [
          {
            slug: "setu",
            reason:
              "A single-point logger with an external probe fits a hospital ward fridge or a clinic's medicine cabinet without changing how the unit is used.",
          },
          {
            slug: "dhruva",
            reason:
              "Four channels watch a pharmacy store at several shelf heights and at the door, which shows how a busy room really behaves between deliveries.",
          },
          {
            slug: "veer",
            reason:
              "Ten channels spread through a long distribution warehouse show which bays run warmest under a desert roof, in one report.",
          },
        ],
        faqs: [
          {
            question: "How are loggers set up for a Riyadh site when the supply comes from India?",
            answer:
              "Loggers are dispatched from India and registered to your dashboard, and we set up alert rules, rooms and user access with your team over a call or video. No visit is needed to start recording.",
          },
          {
            question: "Why does extreme dry heat call for alert limits on the high side as well as the low?",
            answer:
              "A cooling plant that runs near its limit can trip on a hot afternoon, so a high limit with a short delay warns the engineer early. A low limit protects stock that could freeze when a unit overshoots.",
          },
          {
            question: "Can records be shared with a customer or an inspector?",
            answer:
              "Reports for any room and any period can be exported as PDF, Excel or CSV, so a quality manager can hand over a dated log without retyping a register.",
          },
          {
            question: "Can calibration be discussed for loggers used in Riyadh?",
            answer:
              "Calibration of loggers and probes is delivered by VEGA Calibrations, our parent company. Send the model and the range you use and we confirm how the work can be arranged for your site.",
          },
        ],
        nearby: [
          { slug: "dammam", name: "Dammam" },
          { slug: "jeddah", name: "Jeddah" },
          { slug: "bahrain", name: "Bahrain" },
        ],
        metaTitle: "Temperature Data Loggers in Riyadh | Prithvi",
        metaDescription:
          "WiFi temperature data loggers for Riyadh's pharma warehouses, hospitals and food depots, supplied from India with remote set-up. Get Solution.",
        indexable: true,
      },
      {
        slug: "jeddah",
        name: "Jeddah",
        type: "city",
        intro:
          "Jeddah is the Red Sea gateway of the kingdom, a port city where containers, food imports and medicines arrive by sea and are cleared, stored and sent inland. A temperature data logger in Jeddah mostly follows goods through that handover: cold rooms and freezers in the port-side warehouses, chilled stores in distribution depots and the hospital pharmacies that supply a large and varied population. The coastal air is hot and heavy with moisture for most of the year, so cartons sweat, condensation forms where cold rooms meet warm corridors and a door left open lets in damp as well as heat. Prithvi supplies WiFi loggers from India with alerts to phones and email and sets them up remotely, so an importer and its warehouse can share one record of how a lot was held.",
        climateAngle:
          "Heat combines with high humidity along the Red Sea coast, so a store that is cool at the thermostat can still sweat its cartons, and humidity needs a reading beside temperature in every chilled room that opens onto a warm yard.",
        areas: [
          {
            name: "Port logistics zones",
            note: "Warehouses and container yards near the harbour hold imported goods between a vessel's arrival and the lorry that takes them inland.",
          },
          {
            name: "Industrial zones",
            note: "Light manufacturing, packaging and food-processing units on the edges of the city hold ingredients and finished goods in cooled rooms.",
          },
          {
            name: "Cold stores for imported food",
            note: "Chill rooms and freezers that receive imported meat, dairy and produce, then release it to retailers and kitchens across the western region.",
          },
        ],
        industries: [
          {
            slug: "logistics-warehousing",
            sentence:
              "Port-side warehouses hold imported cargo between the quay and the road, and a record for each bay shows how long a lot waited in the coastal air.",
          },
          {
            slug: "food-beverage",
            sentence:
              "Importers of meat, dairy and produce keep cold rooms that are opened for every delivery, so a reading every few minutes shows how long the door stood open and what it did to the chamber.",
          },
          {
            slug: "hospitals-blood-banks",
            sentence:
              "Hospital pharmacies and laboratories serve a large population in a humid climate, and an alert to the duty staff matters most when the air conditioning of a store room fails overnight.",
          },
        ],
        recommendedSeries: [
          {
            slug: "nakshatra",
            reason:
              "Reads relative humidity along with temperature, which tells a warehouse when sea air and an open door have beaten the dehumidification in a chilled store.",
          },
          {
            slug: "virat",
            reason:
              "Sixteen channels cover a long port-side shed across racks, dock doors and floor positions, so one report shows how the whole building behaves.",
          },
          {
            slug: "rajmudra",
            reason:
              "Two channels record a cold room and its anteroom at once, which shows how much warm, damp air each delivery brings through the door.",
          },
        ],
        faqs: [
          {
            question: "Can a logger report on a shipment between the port and a Jeddah warehouse?",
            answer:
              "A logger placed in the load records the whole stay, and its report can be exported by lot, so an importer and a warehouse can compare the same record when a question is raised.",
          },
          {
            question: "How does coastal humidity change where probes are placed?",
            answer:
              "We place humidity-reading loggers near doors and anterooms, where damp air first meets a cold room, and away from evaporators that would show the coil instead of the room. A second probe at the far end of the room tells the engineer whether the whole space is cooled or only the part nearest the unit.",
          },
          {
            question: "How is a logger set up for a Jeddah warehouse?",
            answer:
              "Loggers are dispatched from India and registered to your dashboard, and we set up rooms, limits and alert contacts with your team over a call or video. After the first fortnight of readings we review the limits with you, so routine door openings stop raising alarms and a real fault stands out.",
          },
          {
            question: "What happens to the record if a warehouse loses power for a spell?",
            answer:
              "Loggers keep storing readings on their batteries during a cut and send them when the network returns, and an alert for the lost mains supply can go to the person who looks after the room.",
          },
        ],
        nearby: [
          { slug: "riyadh", name: "Riyadh" },
          { slug: "dammam", name: "Dammam" },
        ],
        metaTitle: "Temperature Data Loggers in Jeddah | Prithvi",
        metaDescription:
          "WiFi temperature and humidity data loggers for Jeddah's port warehouses, food import cold rooms and hospitals, set up remotely. Get Solution.",
        indexable: true,
      },
      {
        slug: "dammam",
        name: "Dammam",
        type: "city",
        intro:
          "Dammam is the main city of the Eastern Province, on the Gulf coast, with industry that is larger in scale and heavier in character than most of the country: chemical and petrochemical-linked plants, industrial suppliers, a port and the warehouses that serve it, and food importers on the same roads. A temperature data logger in Dammam works as much in sheds and yards as in air-conditioned rooms: drums and containers of chemical products, packaged goods waiting for a vessel, chilled stock moving out to the kingdom's other cities. The Gulf air is hot and humid, summer sun on metal roofs is relentless and storage that is perfectly good in winter strains in summer. Prithvi supplies WiFi loggers from India with alerts to phones and email, set up remotely with your team.",
        climateAngle:
          "The Gulf coast is hot and damp for much of the year, and metal roofs on sheds and containers turn summer sun into radiant heat that reaches the stock long after the air outside has cooled.",
        areas: [
          {
            name: "Industrial zones",
            note: "Chemical, process and engineering plants on large plots hold raw materials, drums and finished product in sheds and tank farms spaced far apart.",
          },
          {
            name: "Port logistics zones",
            note: "Warehouses and yards around the port hold cargo that waits on a vessel, with long dwell times in hot, humid air.",
          },
          {
            name: "Food import and distribution depots",
            note: "Chilled and frozen stores take in imported food and send it to retailers and caterers in the Eastern Province and beyond.",
          },
        ],
        industries: [
          {
            slug: "chemical",
            sentence:
              "Chemical and process plants keep drums and containers with printed storage limits, and a high-temperature alert to the shift supervisor gives a chance to shade or move stock before it is spoiled.",
          },
          {
            slug: "logistics-warehousing",
            sentence:
              "Port yards and freight sheds hold cargo for long periods, and a reading for each bay shows which part of a shed ran hottest under the sun, which is the evidence a plant needs when a customer asks why one lot looks different from another.",
          },
          {
            slug: "food-beverage",
            sentence:
              "Importers and distributors keep chilled and frozen stores that supply the whole province, and an overnight record shows that a chamber held while the building was empty.",
          },
        ],
        recommendedSeries: [
          {
            slug: "virat",
            reason:
              "Sixteen channels cover a long chemical store or port shed from floor to roof beam, so one device reports on bays that are a long walk apart.",
          },
          {
            slug: "dhruva",
            reason:
              "Four channels suit a chilled store or a laboratory room, watching floor, shelf and door positions from one logger.",
          },
          {
            slug: "nakshatra",
            reason:
              "Reads humidity along with temperature, which matters for packaging, paper and electrical equipment stored in damp Gulf air.",
          },
        ],
        faqs: [
          {
            question: "How does a metal-roofed shed change where loggers go?",
            answer:
              "We put probes at roof-beam height and at the floor, since the top of a stack near a metal roof can run far warmer than the air at the door. The difference between the two is what a single reading would miss, and it often decides whether a second row of probes is worth fitting.",
          },
          {
            question: "Can several plants be seen on one dashboard?",
            answer:
              "Each plant is its own site with its own alert recipients, and a group manager can open every site in one list, compare records side by side and export a report for any room.",
          },
          {
            question: "How is the set-up done for a Dammam plant?",
            answer:
              "Loggers are dispatched from India and registered to your dashboard, and we set up rooms, alert limits and user access with your team by call or video, then stay available as the site changes. A plant with several sheds usually starts with the two that hold the most sensitive stock and adds the rest once the alert rules have settled.",
          },
          {
            question: "Who can map a large store before loggers are fixed?",
            answer:
              "Temperature mapping is delivered by VEGA Calibrations, our parent company. Send the room's size and what it holds and we confirm how a mapping study can be arranged for your site.",
          },
        ],
        nearby: [
          { slug: "riyadh", name: "Riyadh" },
          { slug: "bahrain", name: "Bahrain" },
          { slug: "jeddah", name: "Jeddah" },
        ],
        metaTitle: "Temperature Data Loggers in Dammam | Prithvi",
        metaDescription:
          "WiFi temperature and humidity data loggers for Dammam's chemical plants, port warehouses and food depots, set up remotely. Get Solution.",
        indexable: true,
      },
    ],
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
          "Dubai is a trading city where goods arrive, wait and leave again: shipped into Jebel Ali, held in free-zone and bonded warehouses, repacked and sent on to markets across the region. A temperature data logger in Dubai therefore watches stock that is passing through as often as stock that stays, and the time a lot spends in a store matters to an owner who may be in another country. Food importers, medicine distributors, hotels with dozens of kitchens and re-export traders all work in a climate where summer heat and humidity press on every cooling plant. Prithvi supplies WiFi loggers from India, with alerts to phones and email and remote set-up with your team, so a trader, a chef or a quality manager can read a room's record from anywhere without a visit.",
        climateAngle:
          "Heat and humidity peak together through the long summer, and the cooling that carries a store through it runs close to its limit for months, so condenser coils work hard, doors fog when they open onto warm corridors and a store that is comfortable in winter can drift out of range by the afternoon.",
        areas: [
          {
            name: "Jebel Ali",
            note: "The port and free-zone district to the south-west, where containers are unloaded and goods wait in large bonded and free-zone warehouses before onward movement.",
          },
          {
            name: "Al Quoz",
            note: "An industrial and warehouse district inland, where traders, food suppliers and service firms keep stock in mid-sized units close to the city's shops and kitchens.",
          },
          {
            name: "Hotel and restaurant kitchens",
            note: "Hospitality businesses run walk-in fridges, freezers and bar coolers by the dozen, many of them opened constantly through service and several floors away from the engineer.",
          },
        ],
        industries: [
          {
            slug: "logistics-warehousing",
            sentence:
              "Re-export and freight warehouses hold goods for owners overseas, and a reading for each bay shows exactly how long a lot stood in the warm air before it was released.",
          },
          {
            slug: "food-beverage",
            sentence:
              "Importers, caterers and hotel kitchens keep chillers and freezers that are opened all day, so one dashboard with an alert to the duty engineer replaces a round of manual checks, and the chef or store manager can open the same view from a phone during service.",
          },
          {
            slug: "pharmaceutical",
            sentence:
              "Medicine distributors and pharmacies hold stock in rooms with stated ranges, and an exported log lets a distributor answer a customer's query without searching through paper records.",
          },
        ],
        recommendedSeries: [
          {
            slug: "virat",
            reason:
              "Sixteen channels cover a large free-zone warehouse across racks, dock doors and floor positions, so one report shows how a whole bonded hall behaves.",
          },
          {
            slug: "setu",
            reason:
              "A single-point logger with an external probe sits inside a kitchen walk-in or a bar cooler without altering how the unit is used or opened.",
          },
          {
            slug: "nakshatra",
            reason:
              "Reads humidity along with temperature, which shows when warm, damp air from a corridor or a loading door is fogging a chilled room.",
          },
        ],
        faqs: [
          {
            question: "How is monitoring started for a Dubai site when the loggers come from India?",
            answer:
              "Loggers are dispatched from India and registered to your dashboard. We then connect them to your Wi-Fi and set rooms, limits and alert contacts with your team over a call or video, so recording begins without a visit. After the first few weeks we review the limits with you, so routine door openings during service stop raising alarms and a real fault stands out.",
          },
          {
            question: "Can one hotel group watch every property from a single login?",
            answer:
              "Yes. Each property is a site on the dashboard, each kitchen's alerts go to its own engineer and a group manager sees every site together, with reports that can be exported for any period.",
          },
          {
            question: "How does a re-export trader show an overseas owner how goods were held?",
            answer:
              "A report for the bay or room can be exported as PDF, Excel or CSV for the period the lot stayed, so the owner receives the same dated record the warehouse sees.",
          },
          {
            question: "Can calibration be discussed for loggers used in Dubai?",
            answer:
              "VEGA Calibrations, our parent company, handles the calibration of loggers and probes. Tell us the model and the range you work to, and we explain how a hotel or a warehouse in Dubai can have it arranged.",
          },
        ],
        nearby: [
          { slug: "riyadh", name: "Riyadh" },
          { slug: "dammam", name: "Dammam" },
          { slug: "bahrain", name: "Bahrain" },
        ],
        metaTitle: "Temperature Data Loggers in Dubai | Prithvi",
        metaDescription:
          "WiFi temperature and humidity data loggers for Dubai's re-export warehouses, food importers and hotel kitchens, set up remotely. Get Solution.",
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

// ---------------------------------------------------------------------------
// URLs. The data tree stays hierarchical (country > state > city > area), but
// every public URL is a single flat segment: /data-logger-{slug}. When a city
// and an area share a slug the area takes the AREA_SLUG_SUFFIX (and a state
// that shares a city's slug, like Delhi, takes STATE_SLUG_SUFFIX); any slug still
// duplicated after that is reported by locationUrlProblems() and fails
// `npm run check:data`.
// ---------------------------------------------------------------------------

export const LOCATION_URL_PREFIX = "data-logger-";
export const AREA_SLUG_SUFFIX = "-industrial-area";
export const STATE_SLUG_SUFFIX = "-state";

type FlatEntry = { key: string; base: string; kind: LocationType | "area" };

type FlatIndex = {
  /** tree path ("india/maharashtra/mumbai") -> flat slug ("mumbai") */
  byPath: Map<string, string>;
  /** flat slug -> tree path */
  bySlug: Map<string, string[]>;
  problems: string[];
};

let flatIndex: FlatIndex | undefined;

function buildFlatIndex(): FlatIndex {
  const all = getAllLocations();
  const entries: FlatEntry[] = all.map((l) => ({ key: l.path.join("/"), base: l.node.slug, kind: l.node.type }));
  for (const area of areas) {
    const city = all.find((l) => l.node.type === "city" && l.node.slug === area.citySlug);
    // An area whose city has no page yet still reserves its slug (so it never
    // takes another page's URL later) but has no path of its own.
    const key = city ? [...city.path, area.slug].join("/") : `unplaced/${area.citySlug}/${area.slug}`;
    entries.push({ key, base: area.slug, kind: "area" });
  }

  const byPath = new Map<string, string>();
  const bySlug = new Map<string, string[]>();
  const problems: string[] = [];
  const claim = (entry: FlatEntry, slug: string) => {
    const owner = bySlug.get(slug);
    if (owner) {
      problems.push(`duplicate location slug "${slug}": ${owner.join("/")} and ${entry.key}`);
      return;
    }
    byPath.set(entry.key, slug);
    bySlug.set(slug, entry.key.split("/"));
  };

  // Countries and cities keep their own slug. A state yields to a city or country
  // of the same name (Delhi the state vs Delhi the city), and an area yields to
  // any node.
  for (const entry of entries.filter((e) => e.kind === "country" || e.kind === "city")) claim(entry, entry.base);
  for (const entry of entries.filter((e) => e.kind === "state")) {
    claim(entry, bySlug.has(entry.base) ? `${entry.base}${STATE_SLUG_SUFFIX}` : entry.base);
  }
  for (const entry of entries.filter((e) => e.kind === "area")) {
    claim(entry, bySlug.has(entry.base) ? `${entry.base}${AREA_SLUG_SUFFIX}` : entry.base);
  }
  return { byPath, bySlug, problems };
}

function getFlatIndex(): FlatIndex {
  return (flatIndex ??= buildFlatIndex());
}

/** The flat slug of a node or area given its tree path (without the data-logger- prefix). */
export function locationFlatSlug(path: string[]): string {
  return getFlatIndex().byPath.get(path.join("/")) ?? path[path.length - 1];
}

/** Public URL of a location node or area page, e.g. /data-logger-mumbai. */
export function locationHref(path: string[]): string {
  return `/${LOCATION_URL_PREFIX}${locationFlatSlug(path)}`;
}

/** Tree path for a flat slug (the part after data-logger-), or undefined. */
export function pathForFlatSlug(flat: string): string[] | undefined {
  return getFlatIndex().bySlug.get(flat);
}

/** Every flat slug in use, for static params, sitemap checks and redirects. */
export function allFlatSlugs(): string[] {
  return [...getFlatIndex().bySlug.keys()];
}

/** Duplicate flat slugs; must stay empty. */
export function locationUrlProblems(): string[] {
  return getFlatIndex().problems;
}

/** The retired nested URL of a tree path; only used to build 301 redirects and to detect stray links. */
export function legacyLocationHref(path: string[]): string {
  return `/locations/${path.join("/")}`;
}

export type ResolvedCity = ResolvedLocation & { node: CityLocationNode };

/** Every city built to the playbook template, in tree order. */
export function getCityPages(): ResolvedCity[] {
  return getAllLocations().filter((l): l is ResolvedCity => isCityPage(l.node));
}

/** The indexable, playbook-built city with this slug, if its page exists yet. */
export function findCityBySlug(slug: string): ResolvedCity | undefined {
  return getCityPages().find((c) => c.node.slug === slug && c.node.indexable);
}

/** Playbook section 4, biggest cities first; drives the footer and industry blocks. */
const CITY_PRIORITY = [
  "mumbai",
  "delhi",
  "bengaluru",
  "hyderabad",
  "chennai",
  "pune",
  "ahmedabad",
  "kolkata",
  "navi-mumbai",
  "noida",
];

function cityRank(slug: string): number {
  const i = CITY_PRIORITY.indexOf(slug);
  return i === -1 ? CITY_PRIORITY.length : i;
}

/** Indexable city pages that support an industry, most relevant (biggest) first. */
export function citiesForIndustry(industrySlug: string, limit = 8): ResolvedCity[] {
  return getCityPages()
    .filter((c) => c.node.indexable && c.node.industries.some((i) => i.slug === industrySlug))
    .sort((a, b) => cityRank(a.node.slug) - cityRank(b.node.slug))
    .slice(0, limit);
}

/**
 * Footer "Top locations": the biggest cities that have a live page, topped up
 * with indexable country hubs so the list is never a single link.
 */
export function topLocations(limit = 10): { name: string; href: string }[] {
  const cities = getCityPages()
    .filter((c) => c.node.indexable)
    .sort((a, b) => cityRank(a.node.slug) - cityRank(b.node.slug))
    .map((c) => ({ name: c.node.name, href: locationHref(c.path) }));
  const countries = locations
    .filter((c) => c.indexable)
    .map((c) => ({ name: c.name, href: locationHref([c.slug]) }));
  return [...cities, ...countries].slice(0, limit);
}
