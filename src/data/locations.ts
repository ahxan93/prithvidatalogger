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
        // Awaiting its own playbook prompt; noindex and out of the sitemap until then.
        indexable: false,
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
// and an area share a slug the area takes the AREA_SUFFIX; any slug still
// duplicated after that is reported by locationUrlProblems() and fails
// `npm run check:data`.
// ---------------------------------------------------------------------------

export const LOCATION_URL_PREFIX = "data-logger-";
export const AREA_SLUG_SUFFIX = "-industrial-area";

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

  // Countries, states and cities keep their own slug; areas yield on a clash.
  for (const entry of entries.filter((e) => e.kind !== "area")) claim(entry, entry.base);
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
