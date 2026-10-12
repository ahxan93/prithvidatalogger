// Sub-area layer under the city pages: Country > State > City > Area.
//
// Rules (docs/LOCATION-PAGES-PLAYBOOK.md, extended to areas):
//  - every entry is an area the owner confirmed service in (`confirmedService`);
//  - an entry with no `page` is a data entry only: it has no route and is
//    written in a later batch;
//  - copy is unique per area (no sentence shared with the city page, another
//    area or any other location page), at least 400 unique words, and states
//    no statistics, client names, timelines, prices or local regulations;
//  - a page is indexable and in the sitemap only if `indexable` is true AND it
//    passes areaIssues() below; otherwise it renders noindex.
//
// Kept free of runtime imports so scripts/check-data.mjs can load it directly.

import type { DeviceKey } from "./page-heroes";

export type AreaType = "industrial-estate" | "midc-estate" | "business-district" | "mixed-use" | "warehousing-hub";

export type AreaPageContent = {
  /** At most 60 characters, includes the brand suffix. */
  metaTitle: string;
  /** At most 155 characters, unique, says "Get Solution". */
  metaDescription: string;
  /** 70-130 words about the area's real character and why monitoring matters there. */
  intro: string;
  /** Real industrial estates, districts or clusters in the area, each with a note. */
  places: { name: string; note: string }[];
  /** Industries (slugs of industry pages) with an area-specific sentence. */
  industries: { slug: string; sentence: string }[];
  /** The services we offer here, in this area's own words. */
  services: string;
  /** How a visit is arranged, in this area's own words. */
  visits: string;
  /** How we would start monitoring here, in this area's own words. */
  approach: string;
  /** Slugs of other areas worth linking (only areas with pages are shown). */
  nearby: string[];
  /** Author's intent; the page is only indexable if it also passes areaIssues(). */
  indexable: boolean;
};

export type AreaDef = {
  slug: string;
  name: string;
  /** Slug of the parent city (a node in the location tree, or one planned for it). */
  citySlug: string;
  areaType: AreaType;
  /** Industry slugs most relevant here. */
  nearbyIndustries: string[];
  /** The owner confirmed that we serve this area. */
  confirmedService: true;
  /** A distinct logger pair for the area's hero (see PageHero / LiveDeviceVisual). */
  hero: [DeviceKey, DeviceKey];
  /** Present once the area has been written (batch 1: Mumbai, Navi Mumbai, Thane-Bhiwandi). */
  page?: AreaPageContent;
};

/** Cities that have areas, with the state each sits in (state slug as in the location tree). */
export const areaCities: Record<string, { name: string; stateSlug: string; stateName: string }> = {
  mumbai: { name: "Mumbai", stateSlug: "maharashtra", stateName: "Maharashtra" },
  "navi-mumbai": { name: "Navi Mumbai", stateSlug: "maharashtra", stateName: "Maharashtra" },
  "thane-bhiwandi": { name: "Thane & Bhiwandi", stateSlug: "maharashtra", stateName: "Maharashtra" },
  "vasai-palghar": { name: "Vasai-Palghar", stateSlug: "maharashtra", stateName: "Maharashtra" },
  pune: { name: "Pune", stateSlug: "maharashtra", stateName: "Maharashtra" },
  ahmedabad: { name: "Ahmedabad", stateSlug: "gujarat", stateName: "Gujarat" },
  "south-gujarat": { name: "South Gujarat", stateSlug: "gujarat", stateName: "Gujarat" },
  "delhi-ncr": { name: "Delhi NCR", stateSlug: "delhi", stateName: "Delhi" },
  hyderabad: { name: "Hyderabad", stateSlug: "telangana", stateName: "Telangana" },
  bengaluru: { name: "Bengaluru", stateSlug: "karnataka", stateName: "Karnataka" },
  chennai: { name: "Chennai", stateSlug: "tamil-nadu", stateName: "Tamil Nadu" },
};

export const areas: AreaDef[] = [
  // ------------------------------------------------------------------ Mumbai (batch 1)
  {
    slug: "andheri",
    name: "Andheri",
    citySlug: "mumbai",
    areaType: "mixed-use",
    nearbyIndustries: ["pharmaceutical", "electronics", "food-beverage", "hospitals-blood-banks"],
    confirmedService: true,
    hero: ["veer-pro", "vayu-pro"],
    page: {
      metaTitle: "Data Loggers in Andheri, Mumbai | Prithvi",
      metaDescription:
        "WiFi and GSM temperature data loggers for Andheri's MIDC, Marol and SEEPZ units, with site visits arranged by appointment. Get Solution.",
      intro:
        "Andheri is where a great deal of Mumbai's mixed industrial and commercial storage sits side by side: factory units, stockists' godowns, laboratories, hotels near the airport and hospitals that serve the western suburbs. For a team here, a temperature data logger is less about one big cold room and more about many small ones: a stability chamber in one unit, a medicine store two lanes away, a kitchen cooler at a hotel. Prithvi supplies WiFi and GSM loggers to sites like these and sets them up so that every point reports to one dashboard instead of a clipboard.",
      places: [
        {
          name: "MIDC Andheri East",
          note: "The industrial estate on the highway side of Andheri East, with manufacturing and engineering units, packaging sites and storage sheds. Several units on one estate can share a single monitoring account, so a quality head can look at all of them together.",
        },
        {
          name: "Marol industrial area",
          note: "A cluster of small and mid-sized units, offices and stores around Marol Naka. Space is tight in these lanes, so compact wall-mounted loggers with a short external probe usually suit better than bulky equipment.",
        },
        {
          name: "SEEPZ",
          note: "The special economic zone in Andheri East, home to electronics, jewellery and IT-related units. Humidity matters for electronics assembly and storage, so humidity-reading models such as Nakshatra, or the Pro versions of our multi-channel loggers, are a natural fit.",
        },
        {
          name: "Airport-side hotels and food stores",
          note: "Hotels and food suppliers close to the airport run walk-in coolers and freezers around the clock. An external hooter with a door sensor adds a local alarm when a heavy door is left open on a busy shift.",
        },
      ],
      industries: [
        {
          slug: "pharmaceutical",
          sentence:
            "Pharma trading and distribution offices around Marol hold stock in controlled rooms, and a continuous log gives them something concrete to show at an inspection or a customer audit.",
        },
        {
          slug: "electronics",
          sentence:
            "Electronics units in and around SEEPZ care about humidity as much as temperature, and a logged record shows when a store room drifted outside its limits.",
        },
        {
          slug: "food-beverage",
          sentence:
            "Hotels, caterers and cloud kitchens in Andheri depend on coolers that are opened constantly, which is exactly where door sensors and instant alerts earn their place.",
        },
        {
          slug: "hospitals-blood-banks",
          sentence:
            "Hospitals and diagnostic laboratories serving the western suburbs keep vaccines, reagents and blood components in fridges that need an alert the moment they drift.",
        },
      ],
      services:
        "From Andheri we supply the loggers, help you choose probe positions, and connect them to your Wi-Fi, or use GSM versions where a site has none. Our parent company, VEGA Calibrations, carries out calibration, temperature mapping and validation for the same premises, so a logger, its calibration certificate and a mapping study of a storeroom can come from one group. Accessories such as the external hooter with door sensor and the charging dock for spare batteries are available alongside.",
      visits:
        "Our head office is in Malad, only a few stations up the same western line, so Andheri is one of the easier places for us to reach. A visit is arranged by call, WhatsApp or the enquiry form: tell us the estate or building, what you store and how many points need watching, and we agree a day that suits your quality or stores team. The visit itself is used to look at the rooms, settle probe positions and plan the dashboard and its alert recipients.",
      approach:
        "A sensible first step in Andheri is to start with the one room that would hurt most if it failed, whether that is a medicine store, a humidity-sensitive component room or a hotel freezer. Fit a logger there, set alert limits with the person responsible and watch it for a few weeks. Once the team trusts the alerts, the remaining rooms on the estate or in the building are easy to add, because the account, the recipients and the habit already exist.",
      nearby: ["goregaon", "powai", "malad"],
      indexable: true,
    },
  },
  {
    slug: "malad",
    name: "Malad",
    citySlug: "mumbai",
    areaType: "mixed-use",
    nearbyIndustries: ["pharmaceutical", "logistics-warehousing", "data-centers", "food-beverage"],
    confirmedService: true,
    hero: ["veer", "hooter"],
    page: {
      metaTitle: "Data Loggers in Malad, Mumbai | Prithvi",
      metaDescription:
        "Temperature and humidity data loggers for Malad's business parks, godowns and workshops, from our Malad office. Visits by appointment. Get Solution.",
      intro:
        "Malad is the suburb we call home: Prithvi's head office is here, which makes it the area where we are most often asked to simply come and look. The suburb is split in character. Malad West runs along Link Road with business parks, retail and service offices, while Malad East has a mix of warehouses, small industrial units and the stores of distributors who serve the northern suburbs. Temperature-sensitive stock and server equipment move through both halves every day.",
      places: [
        {
          name: "Link Road business parks (Malad West)",
          note: "Office parks and corporate towers hold server rooms, pantries and records stores behind air-conditioned plant rooms. One Nakshatra or Setu logger per server room is usually enough, with alerts going to the facilities desk.",
        },
        {
          name: "Malad East godowns",
          note: "Stockists and distributors keep pharmaceuticals, packaged food and consumer goods in godowns on the east side. A larger godown benefits from a multi-channel logger such as Dhruva or Veer, so one device watches several corners and the cooler section together.",
        },
        {
          name: "Kachpada and Ramchandra Lane",
          note: "Smaller industrial units and workshops sit in the lanes around Kachpada, where our own office is. Being this close, we can often look at a site on the way to or from the office once a visit has been booked.",
        },
      ],
      industries: [
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical distributors and stockists along the Malad corridors need a record of storage temperature for every consignment that passes through their rooms.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Small third-party warehouses and courier hubs in Malad East handle ambient and temperature-controlled parcels that need a trail from receipt to dispatch.",
        },
        {
          slug: "data-centers",
          sentence:
            "Business parks on Link Road run server rooms where a failed air-conditioning unit becomes an outage unless someone is alerted first.",
        },
        {
          slug: "food-beverage",
          sentence:
            "Restaurants, bakeries and dairy outlets in Malad keep display and storage coolers that are checked by hand whenever someone remembers, and loggers take over that checking.",
        },
      ],
      services:
        "For Malad sites we supply and install loggers, set up alert recipients and user access, and give the same phone and WhatsApp support we give to customers outside the city. VEGA Calibrations, our parent company, can calibrate the loggers you already own and carry out temperature mapping for a godown or a cold room. Charging docks for spare batteries and door-open hooters are part of the range for busy loading bays.",
      visits:
        "A visit to our Malad office is by appointment only, so please call ahead. For a visit to your own premises, send the address and a line about what you store through WhatsApp or the enquiry form, and we will fix a day with your team. Many Malad sites are a short drive from us, which keeps a first look at the premises simple to arrange.",
      approach:
        "In Malad we often begin with a server room or a stockist's godown, because both are close to our office and the result is visible quickly. A logger and a couple of probes go in, alert recipients are agreed, and the dashboard is shown to the people who will actually use it. Premises nearby then add rooms as they are comfortable, and calibration of the loggers is planned around their working calendar rather than ours.",
      nearby: ["goregaon", "andheri"],
      indexable: true,
    },
  },
  {
    slug: "goregaon",
    name: "Goregaon",
    citySlug: "mumbai",
    areaType: "business-district",
    nearbyIndustries: ["food-beverage", "hospitals-blood-banks", "laboratories", "data-centers"],
    confirmedService: true,
    hero: ["nakshatra", "rajmudra"],
    page: {
      metaTitle: "Data Loggers in Goregaon, Mumbai | Prithvi",
      metaDescription:
        "Temperature data loggers for Goregaon's offices, exhibition and studio district, hotels, hospitals and labs. Site visits arranged. Get Solution.",
      intro:
        "Goregaon stretches from the railway line in the west to the highway and the wooded hills of the national park in the east. Its character comes mostly from the east side: an exhibition ground, a film studio complex, office towers and small industrial pockets that sit close to residential blocks. Storage needs are scattered rather than concentrated, which suits monitoring that can be added one room at a time and grown as the premises change.",
      places: [
        {
          name: "Goregaon East business and exhibition belt",
          note: "Office towers and the exhibition centre along the Western Express Highway bring hotels, caterers and event organisers, some with permanent cold rooms and others that set up temporary storage for a show.",
        },
        {
          name: "Film City and production houses",
          note: "Studios and post-production houses keep server rooms, editing suites and equipment stores whose temperature needs are modest but whose cost of downtime is high.",
        },
        {
          name: "Small industrial lanes behind the highway",
          note: "Workshops, printing units and light manufacturing sit in compact shed-style rooms where a single logger can cover the whole space, with a second one for the store.",
        },
      ],
      industries: [
        {
          slug: "food-beverage",
          sentence:
            "Event caterers and hotel kitchens around the exhibition ground move a lot of chilled food in and out in short bursts, and logged temperatures show how well that was handled.",
        },
        {
          slug: "hospitals-blood-banks",
          sentence:
            "Hospitals and nursing homes in the residential belt store vaccines and medicines in fridges that are used all day, so a drift is easy to miss without an alert.",
        },
        {
          slug: "laboratories",
          sentence:
            "Pathology and diagnostic laboratories keep samples and reagents in small fridges and freezers, each of which can be watched separately on one dashboard.",
        },
        {
          slug: "data-centers",
          sentence:
            "Media and office tenants in the towers rely on server rooms that were never designed as data centres, which makes room-level temperature alerts especially useful.",
        },
      ],
      services:
        "In Goregaon our work usually starts with a single room and spreads: a server room, then the kitchen cooler, then the medicine store. We supply WiFi loggers for each, add GSM versions for sites without a reliable network, and arrange calibration and temperature mapping through VEGA Calibrations, our parent company. The external hooter with door sensor suits caterers and cold stores where the door is the usual cause of trouble.",
      visits:
        "Goregaon lies between our Malad office and Andheri, which makes it simple to include in a day's visits. Send the building name or estate and what needs watching through the enquiry form or WhatsApp, and we will agree a day with whoever looks after your stores or facilities. Event organisers who need a short-term setup should tell us the dates of the show when they write.",
      approach:
        "The simplest way to begin in Goregaon is with the room that has the most visitors, such as a kitchen cooler, a pharmacy fridge or a studio server room, since that is where an unnoticed drift is most likely. One logger and one alert recipient are enough to start. Because premises here are mixed, we avoid forcing a single design and instead add rooms to the same account as the need appears.",
      nearby: ["malad", "andheri"],
      indexable: true,
    },
  },
  {
    slug: "vikhroli",
    name: "Vikhroli",
    citySlug: "mumbai",
    areaType: "industrial-estate",
    nearbyIndustries: ["pharmaceutical", "chemical", "logistics-warehousing", "laboratories"],
    confirmedService: true,
    hero: ["nakshatra", "hooter"],
    page: {
      metaTitle: "Data Loggers in Vikhroli, Mumbai | Prithvi",
      metaDescription:
        "Temperature and humidity data loggers for Vikhroli's manufacturing campuses, warehouses and business districts. Site visits arranged. Get Solution.",
      intro:
        "Vikhroli sits on the eastern edge of the city between the Eastern Express Highway and the creek, and its industrial identity is older than that of most suburbs around it. Large manufacturing campuses, pharmaceutical and chemical units and warehouses share the area with newer business districts. Temperature and humidity records matter here at a bigger scale: whole production blocks, raw-material stores and finished-goods warehouses rather than single rooms.",
      places: [
        {
          name: "Campuses along the Eastern Express Highway",
          note: "Large manufacturing campuses and the units around them hold raw materials and finished goods that need steady conditions, usually spread across several buildings that are easiest to follow on one screen.",
        },
        {
          name: "Vikhroli East industrial estates",
          note: "Older estates carry a mix of engineering, chemical and pharmaceutical units. The rooms were built long before data logging, so wireless loggers that need no cabling are easier to retrofit.",
        },
        {
          name: "Vikhroli and Kanjurmarg business districts",
          note: "The newer office districts add server rooms, canteen stores and pharmacy-style cabinets, each small but each with someone responsible for it.",
        },
      ],
      industries: [
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical units here store active ingredients and finished packs in rooms with set limits, and the monitoring record is part of what a quality team shows at an audit.",
        },
        {
          slug: "chemical",
          sentence:
            "Chemical units store temperature-sensitive intermediates and solvents, where a long external probe lets a logger sit outside the area while the sensor sits inside it.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Warehouses close to the highway receive and dispatch around the clock, so alerts reach a phone rather than waiting for the next shift's walk-round.",
        },
        {
          slug: "laboratories",
          sentence:
            "Quality control and research laboratories on the campuses keep retained samples and reference standards in incubators and fridges that can each report on their own.",
        },
      ],
      services:
        "For a site the size of a Vikhroli campus we plan monitoring in stages: critical rooms first, then the wider warehouse. Multi-channel loggers such as Veer and Virat watch many points from one device, and external probes reach into chambers and freezers. VEGA Calibrations, our parent company, offers calibration, temperature mapping of large storage areas and validation support, so the mapping that decides where probes go and the loggers that follow can be planned together.",
      visits:
        "Vikhroli is a longer drive from Malad than the western suburbs, so we plan visits here around a full site walk instead of a quick look. Write to us through the enquiry form or WhatsApp with the campus or estate name and the buildings involved, and we will agree a date and the people to meet. Larger campuses often have a security or permit process, and it helps if you tell us about it in advance.",
      approach:
        "At a campus in Vikhroli we suggest mapping before buying more loggers than needed. A temperature mapping study of a warehouse or cold room shows where the warm and cold spots really are, and the loggers are then placed at those positions instead of in convenient corners. The remaining buildings can follow in stages, with the same dashboard showing the older and the newer rooms side by side.",
      nearby: ["mulund", "powai"],
      indexable: true,
    },
  },
  {
    slug: "mulund",
    name: "Mulund",
    citySlug: "mumbai",
    areaType: "mixed-use",
    nearbyIndustries: ["pharmaceutical", "hospitals-blood-banks", "food-beverage", "electronics"],
    confirmedService: true,
    hero: ["setu", "virat-pro"],
    page: {
      metaTitle: "Data Loggers in Mulund, Mumbai | Prithvi",
      metaDescription:
        "WiFi and GSM temperature data loggers for Mulund's industrial lanes, hospitals and food businesses. Site visits arranged. Get Solution.",
      intro:
        "Mulund is the northern edge of Mumbai's eastern suburbs, where the city meets Thane across the creek. The area keeps a tight cluster of factory units and workshops along the long arterial road that links it to the highway, with residential neighbourhoods and hospitals filling the rest. Many businesses here are mid-sized, owner-managed firms, which is the kind of customer that gains most from replacing manual rounds with alerts that reach a phone.",
      places: [
        {
          name: "LBS Marg industrial strip",
          note: "Factory units, godowns and service workshops line the main road, many of them with a single store room that holds the temperature-sensitive stock of the whole unit.",
        },
        {
          name: "Mulund East and Nahur lanes",
          note: "Smaller units tuck into the lanes behind the railway line. Here the loggers are usually small, wall-mounted and Wi-Fi-connected, with alerts going straight to the owner's phone.",
        },
        {
          name: "Hospital and diagnostics cluster",
          note: "Hospitals, clinics and diagnostic centres concentrate near the station, each with its own pharmacy fridge, blood or reagent store and a duty doctor who needs to be told about a drift.",
        },
      ],
      industries: [
        {
          slug: "pharmaceutical",
          sentence:
            "Small pharmaceutical manufacturers and repackers in the industrial lanes need a dependable record without hiring a dedicated monitoring team.",
        },
        {
          slug: "hospitals-blood-banks",
          sentence:
            "Hospitals near the station store vaccines, insulin and blood components, and the alert chain can be set to escalate to a second person if the first does not respond.",
        },
        {
          slug: "food-beverage",
          sentence:
            "Sweet shops, dairies and bakeries in Mulund's busy markets depend on chillers and display coolers that are opened hundreds of times a day.",
        },
        {
          slug: "electronics",
          sentence:
            "Electronics assemblers and repair units hold components that suffer in damp air, and a humidity-reading logger shows how the store behaves through the monsoon.",
        },
      ],
      services:
        "We supply single-point loggers for individual fridges and coolers, multi-channel units for a godown, and accessories for busy doors. Calibration of the loggers you already hold, temperature mapping of a store and validation work are delivered by VEGA Calibrations, our parent company. If a site has no reliable Wi-Fi, we can talk through GSM versions and what to check before ordering.",
      visits:
        "To arrange a visit in Mulund, call us, send a WhatsApp message or use the enquiry form with the road or estate and a note on what you keep. We will propose a day, usually combining it with other eastern-suburb visits, and confirm it with you before we travel. The visit covers the rooms, the Wi-Fi situation and who in your team should receive alerts.",
      approach:
        "Owner-run firms in Mulund usually start small: a single logger on the room that holds the most valuable stock, with alerts to the owner and one trusted colleague. After a month the log shows how the room behaves at night, on holidays and during power cuts, which is often the first time anyone has seen it. That evidence then decides whether a second logger, a hooter or a calibration visit is worth adding.",
      nearby: ["vikhroli", "wagle-estate"],
      indexable: true,
    },
  },
  {
    slug: "powai",
    name: "Powai",
    citySlug: "mumbai",
    areaType: "business-district",
    nearbyIndustries: ["laboratories", "hospitals-blood-banks", "data-centers", "food-beverage"],
    confirmedService: true,
    hero: ["nakshatra", "dock"],
    page: {
      metaTitle: "Data Loggers in Powai, Mumbai | Prithvi",
      metaDescription:
        "Temperature and humidity data loggers for Powai's laboratories, hospitals, offices and hotels. Site visits arranged on request. Get Solution.",
      intro:
        "Powai wraps around its lake and is better known for research and housing than for heavy industry, which is what makes its monitoring needs distinctive. Laboratories, a major technical institute, biotechnology and IT offices, hospitals and hotels all occupy a small area. The rooms are small, the equipment is valuable and the tolerance for a drifting reading is low, so the emphasis is on accuracy, humidity readings and a clean record rather than on scale.",
      places: [
        {
          name: "Hiranandani business and residential district",
          note: "Offices, a hospital, hotels and restaurants share one planned district. Server rooms and hospital pharmacies here suit small, tidy loggers that do not need trunking or special mounting.",
        },
        {
          name: "Institute and research campuses",
          note: "Research laboratories on and around the institute campus hold samples, reagents and sensitive instruments. Each fridge, freezer and incubator can be given its own logger and its own alert limits.",
        },
        {
          name: "Saki Vihar Road strip",
          note: "Commercial and light industrial units along the road toward Saki Naka mix offices, workshops and warehouses, usually in buildings with limited ceiling void and simple wall-mounting options.",
        },
      ],
      industries: [
        {
          slug: "laboratories",
          sentence:
            "Research and testing laboratories in Powai need records that stand up when samples are reviewed, and calibration of the loggers themselves is part of that story.",
        },
        {
          slug: "hospitals-blood-banks",
          sentence:
            "A hospital pharmacy or blood storage unit has several fridges in one corridor, and a dashboard lets one person see all of them at a glance.",
        },
        {
          slug: "data-centers",
          sentence:
            "Technology offices run small server rooms in ordinary floors of an office tower, where cooling failures show up as heat long before anyone notices.",
        },
        {
          slug: "food-beverage",
          sentence:
            "Hotels and restaurants around the lake store dairy, seafood and desserts in coolers that are opened at all hours during busy evenings.",
        },
      ],
      services:
        "In Powai we tend to recommend humidity-reading models such as Nakshatra, or the Pro versions of Rajmudra and Dhruva, because the stored items often react to damp as much as to heat. Calibration, temperature mapping for a larger storeroom and validation support come through VEGA Calibrations, our parent company. Spare batteries can be kept charged on the charging dock so a logger is never left idle between uses.",
      visits:
        "Visits in Powai are arranged ahead through the enquiry form, WhatsApp or a call. Tell us the building or campus and whether the rooms are shared with other tenants, because access to a laboratory or pharmacy often needs a named contact. We then confirm a day with that person and use the visit to agree where each logger sits and who receives its alerts.",
      approach:
        "In Powai, the first logger usually goes where a failure would be hardest to recover from, such as a freezer holding irreplaceable samples or the pharmacy fridge of a hospital. Alert limits are set with the person who is accountable for the contents, not with whoever installs the device. After that, other rooms are added to the same account, each with its own limits and its own named recipient.",
      nearby: ["andheri", "vikhroli"],
      indexable: true,
    },
  },
  // ------------------------------------------------------------------ Navi Mumbai (batch 1)
  {
    slug: "turbhe",
    name: "Turbhe",
    citySlug: "navi-mumbai",
    areaType: "midc-estate",
    nearbyIndustries: ["food-beverage", "logistics-warehousing", "chemical", "pharmaceutical"],
    confirmedService: true,
    hero: ["dhruva", "dock"],
    page: {
      metaTitle: "Data Loggers in Turbhe, Navi Mumbai | Prithvi",
      metaDescription:
        "Temperature data loggers for Turbhe's MIDC units, market-side cold stores and warehouses in Navi Mumbai. Site visits arranged. Get Solution.",
      intro:
        "Turbhe is the western gateway of Navi Mumbai's Thane–Belapur industrial belt, and it feels like a working district: factory units, packaging and chemical sheds, transport yards and the big produce and grain markets in its neighbourhood. Storage here runs on a daily rhythm of goods in and out, so temperature records matter most at the points where stock rests: cold rooms, holding rooms and finished-goods stores that never quite empty.",
      places: [
        {
          name: "Turbhe MIDC",
          note: "Manufacturing, plastics, packaging and chemical units share the estate. Most hold a few rooms that matter for temperature, and a short external probe lets one logger sit safely outside a hot process area.",
        },
        {
          name: "Market-side cold stores",
          note: "The wholesale markets nearby are served by cold stores that hold fruit, vegetables, dairy and frozen goods for traders. These rooms are large and busy, so multi-channel loggers watch several positions and the door.",
        },
        {
          name: "Transport and warehouse yards",
          note: "Yards along the Thane–Belapur road combine open parking, loading bays and covered godowns. Alerts matter at the dock doors, where chilled loads can wait longer than planned.",
        },
      ],
      industries: [
        {
          slug: "food-beverage",
          sentence:
            "Traders and processors who supply the wholesale markets keep produce and dairy in holding rooms where one warm afternoon can undo a day's work.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Transport firms run mixed godowns where a chilled consignment may share a floor with ambient cargo, and a log shows how long each load actually spent out of range.",
        },
        {
          slug: "chemical",
          sentence:
            "Chemical and packaging units store raw material that has a printed storage range, and loggers prove that the range was kept.",
        },
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical distributors using the estate's godowns need separate loggers for the controlled bay and the general store, each with its own alert limits.",
        },
      ],
      services:
        "For Turbhe sites we supply WiFi loggers for rooms with a network and GSM versions for yards and godowns without one. External probes handle freezers and hot process areas, hooters with door sensors suit busy docks, and the charging dock keeps spare batteries ready. Our parent company, VEGA Calibrations, offers calibration, temperature mapping of large cold rooms and validation support for these premises.",
      visits:
        "Turbhe is reached from the Sion–Panvel highway and the Thane–Belapur road, and we plan visits here with other Navi Mumbai stops so the travel makes sense. Send the plot or godown name and a note on what you keep through the enquiry form or WhatsApp, and we will agree a day. Because many sites here run through the night, tell us which shift is best for the walk-through.",
      approach:
        "For a Turbhe unit, the useful first step is to look at the dock door and the room closest to it, because that is where chilled goods are most exposed on a busy day. A logger with a door sensor there, and a second one deeper in the room, shows how much of the day the goods spend out of range. That comparison usually settles what else needs fitting and where.",
      nearby: ["rabale", "mahape"],
      indexable: true,
    },
  },
  {
    slug: "rabale",
    name: "Rabale",
    citySlug: "navi-mumbai",
    areaType: "midc-estate",
    nearbyIndustries: ["electronics", "pharmaceutical", "logistics-warehousing", "chemical"],
    confirmedService: true,
    hero: ["virat", "hooter"],
    page: {
      metaTitle: "Data Loggers in Rabale, Navi Mumbai | Prithvi",
      metaDescription:
        "WiFi and GSM temperature data loggers for Rabale MIDC's manufacturers, warehouses and offices. Site visits arranged. Get Solution.",
      intro:
        "Rabale sits in the middle of the Thane–Belapur industrial belt, between the railway and the hills, and its estate is built from many small and mid-sized plots instead of a few large campuses. That mix produces a particular monitoring pattern: dozens of independent firms, each with one or two rooms that matter, and each owner wanting to know about a problem without driving to the unit at night.",
      places: [
        {
          name: "Rabale MIDC plots",
          note: "Compact manufacturers of electronics, plastics, components and consumer goods occupy the estate's plots. A single logger per store with alerts to the owner's phone is the usual starting point.",
        },
        {
          name: "Warehouse buildings along the main road",
          note: "Multi-tenant warehouse buildings let several firms share one structure. Each tenant can run its own logger and its own account settings while the building owner sees nothing they should not.",
        },
        {
          name: "Neighbouring Ghansoli and Airoli estates",
          note: "The estates on either side add larger offices and data-centre buildings, so a firm in Rabale often sits between a supplier and a customer that also need records.",
        },
      ],
      industries: [
        {
          slug: "electronics",
          sentence:
            "Electronics firms in the estate store boards, components and finished units that are sensitive to damp, and a humidity-reading logger shows the monsoon's effect on the stock room.",
        },
        {
          slug: "pharmaceutical",
          sentence:
            "Small pharmaceutical formulators and contract packers need an inspection-ready record for a handful of storage areas rather than a large system.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Third-party warehouses shared by several customers can give each customer a record of how its own stock was held.",
        },
        {
          slug: "chemical",
          sentence:
            "Chemical traders and blenders keep drums and containers in sheds where summer heat builds quickly, so a high-temperature alert is as useful as a low one.",
        },
      ],
      services:
        "In Rabale we supply the loggers, set them up with your Wi-Fi or GSM, and agree who receives each alert. A multi-channel logger such as Virat watches a large shed from one point, and a hooter with door sensor covers the loading door. Calibration of loggers you own, temperature mapping of a store and validation support are delivered by VEGA Calibrations, our parent company.",
      visits:
        "A visit to Rabale is arranged through a call, WhatsApp or the enquiry form with the plot or building name and what you keep. We will propose a day, often alongside Turbhe and Mahape, and confirm with you before travelling. At the visit we check Wi-Fi strength at the store, mark probe positions and set up the first alert recipients with you.",
      approach:
        "Because Rabale firms are mostly independent and compact, we suggest starting with one store and one alert recipient, then widening only if the log shows a real problem. A month of readings through a normal working pattern, a weekend and a monsoon spell tells you more than a long specification would. Calibration and any mapping study can follow once you know which rooms matter most.",
      nearby: ["turbhe", "mahape"],
      indexable: true,
    },
  },
  {
    slug: "mahape",
    name: "Mahape",
    citySlug: "navi-mumbai",
    areaType: "midc-estate",
    nearbyIndustries: ["data-centers", "electronics", "pharmaceutical", "laboratories"],
    confirmedService: true,
    hero: ["veer", "dock"],
    page: {
      metaTitle: "Data Loggers in Mahape, Navi Mumbai | Prithvi",
      metaDescription:
        "Temperature and humidity data loggers for Mahape's business parks, data-centre and IT campuses and MIDC units. Visits arranged. Get Solution.",
      intro:
        "Mahape is where Navi Mumbai's industrial estate meets its technology district. Factory units and chemical sheds sit within sight of business parks, IT campuses and the data-centre buildings that cluster toward Airoli. Two kinds of storage coexist here: heavy-duty industrial rooms, and the climate-controlled halls and server rooms of technology firms that expect cooling to simply work and want to know at once when it does not.",
      places: [
        {
          name: "Millennium Business Park",
          note: "A large office and campus park housing technology and service firms. Server rooms, UPS rooms and records stores here are small and numerous, which suits a dashboard that lists every room with its own limit.",
        },
        {
          name: "Mahape MIDC units",
          note: "Pharmaceutical, electronics and engineering units occupy the estate. Production blocks are monitored for temperature and humidity, and loggers are mounted away from doors and machinery for steadier readings.",
        },
        {
          name: "Mahape–Airoli data-centre belt",
          note: "Data-centre and IT campuses along the belt run cold aisles and plant rooms where a few degrees of drift matters. Multi-channel loggers place several probes along an aisle from one device.",
        },
      ],
      industries: [
        {
          slug: "data-centers",
          sentence:
            "Data-centre and colocation tenants track inlet temperature and humidity along their aisles and want the same record presented to customers and to their own engineers.",
        },
        {
          slug: "electronics",
          sentence:
            "Electronics manufacturers keep controlled stores for boards and sensitive parts, and an alert chain with escalation avoids a night-time failure going unseen.",
        },
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical units in the estate hold finished products in stability and warehouse areas whose records are reviewed in every audit.",
        },
        {
          slug: "laboratories",
          sentence:
            "Analytical and quality control laboratories in the estate keep reference materials in fridges and freezers that can be monitored one by one.",
        },
      ],
      services:
        "For Mahape premises we supply WiFi loggers, multi-channel units for aisles and large stores, and Pro versions that read humidity as well as temperature. VEGA Calibrations, our parent company, can calibrate the loggers, map the temperature in a larger storage area and support validation of the system. The dashboard can store calibration records against each device and room, ready for review.",
      visits:
        "Business parks and data-centre campuses often need access arranged in advance, so we ask you to send the building, the contact who will meet us and the rooms of interest through the enquiry form or WhatsApp. We then agree a day and keep to any rules for visitors. For MIDC units the process is simpler: tell us the plot and we will arrange a walk-through with your stores or quality team.",
      approach:
        "For premises in Mahape we tend to begin with a short walk through the rooms that carry the highest consequence, such as the cold aisle or a stability store, and note where Wi-Fi or mobile signal is reliable. Loggers are placed with that survey in mind, and the dashboard is set up with hierarchy by building and room so an engineer, a quality manager and a facilities head each see their own view.",
      nearby: ["rabale", "turbhe"],
      indexable: true,
    },
  },
  {
    slug: "taloja",
    name: "Taloja",
    citySlug: "navi-mumbai",
    areaType: "midc-estate",
    nearbyIndustries: ["chemical", "pharmaceutical", "logistics-warehousing", "electronics"],
    confirmedService: true,
    hero: ["setu", "dock"],
    page: {
      metaTitle: "Data Loggers in Taloja, Navi Mumbai | Prithvi",
      metaDescription:
        "Temperature data loggers for Taloja MIDC's chemical, pharma and engineering units and warehouses. Site visits arranged. Get Solution.",
      intro:
        "Taloja lies beyond Kharghar on the road toward Panvel, and it is a large industrial estate with the scale and the distances to match. Chemical, pharmaceutical, engineering and plastics units sit on wide plots, with long walks between production blocks, tank farms and warehouses. Monitoring at that scale is a question of reaching far-apart rooms without trailing cable, and of keeping a record when the people responsible are not on site.",
      places: [
        {
          name: "Taloja MIDC chemical and pharmaceutical units",
          note: "Large plots carry production blocks, storage tanks and warehouses. Wireless loggers fit better than cabled systems across the distances, and each building can report to one plant-wide dashboard.",
        },
        {
          name: "Engineering and plastics plants",
          note: "Heat from machinery shows up in the rooms next door. A logger with an external probe near the product store, and a second one at the door, separates the room's own temperature from the corridor's.",
        },
        {
          name: "Warehouse and logistics parks",
          note: "Parks that serve the estate and the port-linked roads nearby hold bonded and ambient stock for many customers, each wanting evidence of how its goods were kept.",
        },
      ],
      industries: [
        {
          slug: "chemical",
          sentence:
            "Chemical manufacturers keep reactants, solvents and finished product in rooms with stated limits, and a log shows the room's behaviour during a heatwave or a power cut.",
        },
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical manufacturers in the estate store active ingredients and packed goods across several buildings, and a single dashboard shows them together.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Warehouse operators serving the estate hold cargo for several customers at once and use logs to settle questions about how long a shipment sat in heat.",
        },
        {
          slug: "electronics",
          sentence:
            "Electronic and electrical manufacturers keep components in dry stores, where humidity readings flag a leaking roof or a failed dehumidifier.",
        },
      ],
      services:
        "We supply WiFi loggers where a plant has network coverage and GSM versions for far corners without it. Veer and Virat read many points from one device, external probes reach into chambers, and hooters with door sensors suit warehouse docks. Our parent company, VEGA Calibrations, offers calibration, temperature mapping of large warehouse areas and validation support for the same premises.",
      visits:
        "Taloja is a longer drive from the other Navi Mumbai estates, so we plan a full walk-through on one visit and note what to prepare in advance. Use the enquiry form or WhatsApp to give the plot or park, the buildings involved and the person who will meet us. Many plants require a gate pass or safety briefing, and it helps to mention that when you book.",
      approach:
        "Because Taloja plots are large, we begin by deciding which buildings need monitoring first and how a signal will reach them. A pilot of one logger per critical store, with GSM versions at the far edge of the plant, shows what coverage looks like in practice. The results then guide the rollout, so that the system grows with the plant's priorities instead of being installed all at once.",
      nearby: ["rabale", "mahape"],
      indexable: true,
    },
  },
  // ------------------------------------------------------------------ Thane & Bhiwandi (batch 1)
  {
    slug: "wagle-estate",
    name: "Wagle Estate",
    citySlug: "thane-bhiwandi",
    areaType: "industrial-estate",
    nearbyIndustries: ["pharmaceutical", "electronics", "laboratories", "logistics-warehousing"],
    confirmedService: true,
    hero: ["veer-pro", "virat"],
    page: {
      metaTitle: "Data Loggers in Wagle Estate, Thane | Prithvi",
      metaDescription:
        "Temperature and humidity data loggers for Wagle Estate's pharma, electronics and engineering units in Thane. Visits arranged. Get Solution.",
      intro:
        "Wagle Estate is one of Thane's long-established industrial districts, set on the western side of the city near the highway. Pharmaceutical, electronics and engineering units sit beside offices and service businesses, many in multi-storey buildings that were built for industry long before wireless monitoring existed. Floors, lifts and stairwells decide where a signal reaches, so the first conversation here is usually about layout.",
      places: [
        {
          name: "Pharmaceutical and formulation units",
          note: "Several floors of a building may each hold a store, a quality room and a packing area. A logger per floor on one account gives a quality head a single view of the whole building.",
        },
        {
          name: "Electronics and engineering units",
          note: "Assembly, testing and component stores are often split across floors, and humidity matters more than temperature in the component store during the monsoon.",
        },
        {
          name: "Office and service buildings within the estate",
          note: "Software, design and engineering offices run small server rooms and laboratories in rented bays, where alerts to one named person are more useful than a general inbox.",
        },
      ],
      industries: [
        {
          slug: "pharmaceutical",
          sentence:
            "Formulation units keep raw materials, in-process goods and finished packs on separate floors, and each store can carry its own logger and limits.",
        },
        {
          slug: "electronics",
          sentence:
            "Electronic assemblers store components in cabinets and rooms whose humidity needs to be watched through the damp months.",
        },
        {
          slug: "laboratories",
          sentence:
            "Test and calibration laboratories in the estate keep reference items and samples under set conditions, and their own equipment should be checked too.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Small warehouses and stockists inside the estate hold goods for the surrounding units and use logs to show customers the conditions on the shelf.",
        },
      ],
      services:
        "For multi-floor buildings in Wagle Estate we use WiFi loggers with a router or access point on the floors that need one, and GSM versions where a store sits in the middle of a building. VEGA Calibrations, our parent company, provides calibration of loggers and other instruments, temperature mapping of larger rooms and validation support, so the quality team deals with one group.",
      visits:
        "Wagle Estate is a short distance from the Mulund border, so we often pair it with eastern-suburb visits. Send the road or building name and the floors involved through the enquiry form or WhatsApp, and we agree a day. Walk-throughs here go floor by floor, and it is useful if a person from stores and a person from quality can join so each room gets an owner for its alerts.",
      approach:
        "In a multi-storey Wagle Estate building the first decision is how a signal will travel between floors. We begin with a logger on the floor that holds the most important store, check how well it reports, and then add a repeater or a GSM version where a stairwell or lift shaft gets in the way. Once the pattern is clear, the other floors follow without further surveys.",
      nearby: ["mulund", "dombivli-midc"],
      indexable: true,
    },
  },
  {
    slug: "dombivli-midc",
    name: "Dombivli MIDC",
    citySlug: "thane-bhiwandi",
    areaType: "midc-estate",
    nearbyIndustries: ["chemical", "pharmaceutical", "food-beverage", "logistics-warehousing"],
    confirmedService: true,
    hero: ["rajmudra", "hooter"],
    page: {
      metaTitle: "Data Loggers in Dombivli MIDC, Thane | Prithvi",
      metaDescription:
        "Temperature data loggers for Dombivli MIDC's chemical, pharma and engineering units. Site visits arranged by appointment. Get Solution.",
      intro:
        "Dombivli MIDC lies on the Kalyan side of the Thane district, split into an earlier and a later phase, and it is known mainly for chemical and process industry alongside pharmaceutical intermediates, engineering and food units. The estate is close to dense housing, which raises the bar for anyone who stores hazardous or temperature-sensitive material: a record that is kept automatically is worth more than one that depends on a person remembering to write it down.",
      places: [
        {
          name: "Phase I and Phase II estates",
          note: "Two phases with plots of mixed sizes, many holding small-batch chemical and process units. Each phase can be treated as one site with several buildings, each reporting to the same dashboard.",
        },
        {
          name: "Pharmaceutical intermediate units",
          note: "Intermediates and finished compounds are stored in rooms with printed limits, where a logger with an external probe can sit outside the room while the sensor sits inside.",
        },
        {
          name: "Food and agro-processing units",
          note: "Packaged food and ingredient firms in the estate keep chillers and dry stores, and a combination of temperature and humidity logging suits both.",
        },
      ],
      industries: [
        {
          slug: "chemical",
          sentence:
            "Process units store solvents and intermediates whose labels give a storage range, and a continuous record shows that the range held through hot afternoons and power failures.",
        },
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical intermediate makers need storage evidence for customers who audit them, and a dashboard export saves hand-copying readings into registers.",
        },
        {
          slug: "food-beverage",
          sentence:
            "Food and spice units keep ingredient stores that warm quickly in the afternoon, and humidity readings show when packaging rooms get damp.",
        },
        {
          slug: "logistics-warehousing",
          sentence:
            "Warehouse and transport operators around the estate hold sealed drums and packs for several firms and keep logs to settle disputes about storage conditions.",
        },
      ],
      services:
        "We supply loggers for individual rooms and multi-channel units for larger stores, with external probes for chambers and walk-in coolers. Hooters with door sensors suit chilled stores, and the charging dock keeps spare batteries ready. Calibration, temperature mapping and validation support come through VEGA Calibrations, our parent company, so a plant can plan the instruments and their calibration together.",
      visits:
        "Visits to Dombivli MIDC are arranged by appointment: send the phase, plot and what you store through the enquiry form, WhatsApp or a call. We agree a day and confirm any safety or entry requirement with you beforehand. A first visit usually covers the storage rooms, the available Wi-Fi or mobile signal and the people who should receive night-time alerts.",
      approach:
        "At a Dombivli MIDC unit we suggest starting with the storage that carries a printed temperature limit, since that is where evidence is most needed. A logger there, with an alert to the shift in-charge and to a manager, covers the main risk. After a few weeks the readings show the pattern of heat through the afternoon, and that decides which other rooms, and how many probes, are worth adding.",
      nearby: ["wagle-estate", "bhiwandi"],
      indexable: true,
    },
  },
  {
    slug: "bhiwandi",
    name: "Bhiwandi",
    citySlug: "thane-bhiwandi",
    areaType: "warehousing-hub",
    nearbyIndustries: ["logistics-warehousing", "textile", "food-beverage", "pharmaceutical"],
    confirmedService: true,
    hero: ["vayu-pro", "hooter"],
    page: {
      metaTitle: "Data Loggers in Bhiwandi, Thane | Prithvi",
      metaDescription:
        "WiFi and GSM temperature data loggers for Bhiwandi's warehouse parks, 3PL operators and textile units. Site visits arranged. Get Solution.",
      intro:
        "Bhiwandi is Mumbai's warehouse town. Large godown parks line the roads toward Nashik and Wada, third-party logistics operators run shared sheds for many customers, and powerloom textile units fill the older parts of the town. Sheds here are big, tall and hot in the pre-monsoon weeks, with doors that open all day. Temperature-sensitive goods share space with ambient cargo, so knowing where each pallet sat and for how long is a daily question.",
      places: [
        {
          name: "Warehouse parks around Kalher, Kon and Anjur Phata",
          note: "Multi-tenant parks hold fast-moving consumer goods, e-commerce stock and pharmaceutical distribution under one roof. Each tenant can place its own loggers and keep its own alert recipients.",
        },
        {
          name: "Mumbai–Nashik highway belt",
          note: "Sheds along the highway work as the first or last stop for long-distance loads. Loggers at the dock door and in the controlled bay show how long a trailer stood in the sun.",
        },
        {
          name: "Powerloom and textile units",
          note: "Weaving and processing units in the older town need humidity records, because yarn and cloth behave differently in damp and dry air.",
        },
      ],
      industries: [
        {
          slug: "logistics-warehousing",
          sentence:
            "Third-party warehouse operators serve many customers from one shed, and per-customer records of conditions turn a complaint into a quick lookup.",
        },
        {
          slug: "textile",
          sentence:
            "Textile units track humidity in spinning, weaving and storage areas, where moisture content changes how yarn runs and how finished cloth keeps.",
        },
        {
          slug: "food-beverage",
          sentence:
            "Packaged food and beverage distributors store pallets in tall sheds where upper racks run warmer than the floor, which is why several probes are better than one.",
        },
        {
          slug: "pharmaceutical",
          sentence:
            "Pharmaceutical distribution bays inside shared warehouses need a separate controlled zone with its own limits and a dated record.",
        },
      ],
      services:
        "For Bhiwandi sheds we supply multi-channel loggers such as Veer and Virat that place probes at different heights and corners, GSM versions where a large shed has no Wi-Fi, and hooters with door sensors for the dock. VEGA Calibrations, our parent company, offers temperature mapping of large warehouses, which shows where hot and cold spots sit before loggers are placed, along with calibration and validation support.",
      visits:
        "Bhiwandi is on our regular route for the Thane district. To arrange a visit, tell us through the enquiry form or WhatsApp the park or road, the size of the shed and whether you operate it or rent bays in it. We then agree a day with the operator, because access to a shared warehouse is usually controlled by whoever manages the park.",
      approach:
        "The first logger in a Bhiwandi shed belongs where the stock is most valuable and the roof is most exposed, not simply near the office. A second probe at a different height, and one at the dock door, quickly show how much the shed's temperature varies. A mapping study can follow if the variation is large, and the loggers are then moved to the positions it identifies.",
      nearby: ["dombivli-midc", "wagle-estate"],
      indexable: true,
    },
  },
  // ------------------------------------------------------------------ Vasai-Palghar (data entries)
  { slug: "vasai", name: "Vasai", citySlug: "vasai-palghar", areaType: "mixed-use", nearbyIndustries: ["logistics-warehousing", "food-beverage", "pharmaceutical"], confirmedService: true, hero: ["vayu", "hooter"] },
  { slug: "tarapur", name: "Tarapur", citySlug: "vasai-palghar", areaType: "midc-estate", nearbyIndustries: ["chemical", "pharmaceutical", "textile"], confirmedService: true, hero: ["virat", "dock"] },
  { slug: "boisar", name: "Boisar", citySlug: "vasai-palghar", areaType: "midc-estate", nearbyIndustries: ["chemical", "pharmaceutical", "logistics-warehousing"], confirmedService: true, hero: ["veer-pro", "vayu"] },
  // ------------------------------------------------------------------ Pune (data entries)
  { slug: "pimpri-chinchwad", name: "Pimpri-Chinchwad", citySlug: "pune", areaType: "industrial-estate", nearbyIndustries: ["electronics", "pharmaceutical", "logistics-warehousing"], confirmedService: true, hero: ["virat-pro", "dock"] },
  { slug: "chakan", name: "Chakan", citySlug: "pune", areaType: "midc-estate", nearbyIndustries: ["electronics", "logistics-warehousing", "food-beverage"], confirmedService: true, hero: ["setu", "hooter"] },
  { slug: "ranjangaon", name: "Ranjangaon", citySlug: "pune", areaType: "midc-estate", nearbyIndustries: ["electronics", "food-beverage", "pharmaceutical"], confirmedService: true, hero: ["veer-pro", "hooter"] },
  { slug: "hinjewadi", name: "Hinjewadi", citySlug: "pune", areaType: "business-district", nearbyIndustries: ["data-centers", "electronics", "laboratories"], confirmedService: true, hero: ["vayu", "dock"] },
  { slug: "talegaon", name: "Talegaon", citySlug: "pune", areaType: "midc-estate", nearbyIndustries: ["electronics", "food-beverage", "pharmaceutical"], confirmedService: true, hero: ["vayu-pro", "dock"] },
  // ------------------------------------------------------------------ Ahmedabad (data entries)
  { slug: "naroda", name: "Naroda", citySlug: "ahmedabad", areaType: "industrial-estate", nearbyIndustries: ["pharmaceutical", "chemical", "food-beverage"], confirmedService: true, hero: ["nakshatra", "dhruva"] },
  { slug: "vatva", name: "Vatva", citySlug: "ahmedabad", areaType: "industrial-estate", nearbyIndustries: ["chemical", "pharmaceutical", "textile"], confirmedService: true, hero: ["veer-pro", "dock"] },
  { slug: "changodar", name: "Changodar", citySlug: "ahmedabad", areaType: "industrial-estate", nearbyIndustries: ["pharmaceutical", "chemical", "logistics-warehousing"], confirmedService: true, hero: ["virat-pro", "hooter"] },
  { slug: "sanand", name: "Sanand", citySlug: "ahmedabad", areaType: "industrial-estate", nearbyIndustries: ["electronics", "pharmaceutical", "food-beverage"], confirmedService: true, hero: ["dhruva", "hooter"] },
  // ------------------------------------------------------------------ South Gujarat (data entries)
  { slug: "vapi", name: "Vapi", citySlug: "south-gujarat", areaType: "industrial-estate", nearbyIndustries: ["chemical", "pharmaceutical", "textile"], confirmedService: true, hero: ["hooter", "dock"] },
  { slug: "ankleshwar", name: "Ankleshwar", citySlug: "south-gujarat", areaType: "industrial-estate", nearbyIndustries: ["chemical", "pharmaceutical", "laboratories"], confirmedService: true, hero: ["dhruva", "vayu-pro"] },
  { slug: "dahej", name: "Dahej", citySlug: "south-gujarat", areaType: "industrial-estate", nearbyIndustries: ["chemical", "pharmaceutical", "logistics-warehousing"], confirmedService: true, hero: ["setu", "virat"] },
  { slug: "sachin-surat", name: "Sachin, Surat", citySlug: "south-gujarat", areaType: "industrial-estate", nearbyIndustries: ["textile", "chemical", "pharmaceutical"], confirmedService: true, hero: ["rajmudra", "virat-pro"] },
  // ------------------------------------------------------------------ Delhi NCR (data entries)
  { slug: "okhla", name: "Okhla", citySlug: "delhi-ncr", areaType: "industrial-estate", nearbyIndustries: ["pharmaceutical", "food-beverage", "laboratories"], confirmedService: true, hero: ["virat-pro", "vayu-pro"] },
  { slug: "bawana", name: "Bawana", citySlug: "delhi-ncr", areaType: "industrial-estate", nearbyIndustries: ["food-beverage", "logistics-warehousing", "chemical"], confirmedService: true, hero: ["setu", "rajmudra"] },
  { slug: "narela", name: "Narela", citySlug: "delhi-ncr", areaType: "industrial-estate", nearbyIndustries: ["food-beverage", "logistics-warehousing", "pharmaceutical"], confirmedService: true, hero: ["virat", "vayu"] },
  { slug: "noida", name: "Noida", citySlug: "delhi-ncr", areaType: "business-district", nearbyIndustries: ["electronics", "data-centers", "logistics-warehousing"], confirmedService: true, hero: ["virat", "vayu-pro"] },
  { slug: "greater-noida", name: "Greater Noida", citySlug: "delhi-ncr", areaType: "industrial-estate", nearbyIndustries: ["electronics", "logistics-warehousing", "pharmaceutical"], confirmedService: true, hero: ["rajmudra", "virat"] },
  { slug: "sahibabad", name: "Sahibabad", citySlug: "delhi-ncr", areaType: "industrial-estate", nearbyIndustries: ["food-beverage", "electronics", "logistics-warehousing"], confirmedService: true, hero: ["veer", "virat-pro"] },
  { slug: "manesar", name: "Manesar", citySlug: "delhi-ncr", areaType: "industrial-estate", nearbyIndustries: ["electronics", "logistics-warehousing", "pharmaceutical"], confirmedService: true, hero: ["dhruva", "vayu"] },
  // ------------------------------------------------------------------ Hyderabad (data entries)
  { slug: "jeedimetla", name: "Jeedimetla", citySlug: "hyderabad", areaType: "industrial-estate", nearbyIndustries: ["pharmaceutical", "chemical", "laboratories"], confirmedService: true, hero: ["veer", "vayu"] },
  { slug: "patancheru", name: "Patancheru", citySlug: "hyderabad", areaType: "industrial-estate", nearbyIndustries: ["pharmaceutical", "chemical", "laboratories"], confirmedService: true, hero: ["rajmudra", "veer-pro"] },
  { slug: "genome-valley", name: "Genome Valley", citySlug: "hyderabad", areaType: "business-district", nearbyIndustries: ["laboratories", "pharmaceutical", "vaccine-cold-chain"], confirmedService: true, hero: ["rajmudra", "vayu"] },
  // ------------------------------------------------------------------ Bengaluru (data entries)
  { slug: "peenya", name: "Peenya", citySlug: "bengaluru", areaType: "industrial-estate", nearbyIndustries: ["electronics", "pharmaceutical", "logistics-warehousing"], confirmedService: true, hero: ["dhruva", "veer-pro"] },
  { slug: "electronic-city", name: "Electronic City", citySlug: "bengaluru", areaType: "business-district", nearbyIndustries: ["electronics", "data-centers", "laboratories"], confirmedService: true, hero: ["setu", "vayu"] },
  { slug: "whitefield", name: "Whitefield", citySlug: "bengaluru", areaType: "business-district", nearbyIndustries: ["data-centers", "laboratories", "hospitals-blood-banks"], confirmedService: true, hero: ["setu", "veer"] },
  // ------------------------------------------------------------------ Chennai (data entries)
  { slug: "ambattur", name: "Ambattur", citySlug: "chennai", areaType: "industrial-estate", nearbyIndustries: ["electronics", "pharmaceutical", "logistics-warehousing"], confirmedService: true, hero: ["dhruva", "virat-pro"] },
  { slug: "sriperumbudur", name: "Sriperumbudur", citySlug: "chennai", areaType: "industrial-estate", nearbyIndustries: ["electronics", "logistics-warehousing", "pharmaceutical"], confirmedService: true, hero: ["virat-pro", "vayu"] },
  { slug: "oragadam", name: "Oragadam", citySlug: "chennai", areaType: "industrial-estate", nearbyIndustries: ["electronics", "logistics-warehousing", "food-beverage"], confirmedService: true, hero: ["nakshatra", "veer"] },
];

// ---------------------------------------------------------------------------
// Quality rules (shared by the page, the sitemap and scripts/check-data.mjs)
// ---------------------------------------------------------------------------

export const AREA_MIN_WORDS = 400;

/** Wording the area copy must never contain. */
export const AREA_BANNED: [RegExp, string][] = [
  [/\bno\.?\s?1\b/i, '"No.1"'],
  [/\bbest\b(?!\s+for\b)/i, '"best"'],
  [/\bleading\b/i, '"leading"'],
  [/guarantee/i, '"guarantee"'],
  [/within\s+(\d+|a few|\w+)\s+(hours?|days?|minutes?|weeks?)/i, '"within X hours/days"'],
  [/\b\d[\d,]*\+?\s+(customers|clients|companies|businesses|units|plants)\b/i, "a count of customers or units"],
  [/get\s+a\s+quote/i, 'the old quote CTA'],
  [/₹|\bMRP\b|\bGST\b|\bprice[sd]?\b/i, "a price"],
  [/trinetra/i, "Trinetra"],
  [/accredit|\bNABL\b|ISO\s?(\/IEC )?\d{4,5}/i, "an accreditation claim"],
];

/** Every piece of copy that is unique to the area page. */
export function areaTexts(page: AreaPageContent): string[] {
  return [
    page.intro,
    ...page.places.map((p) => p.note),
    ...page.industries.map((i) => i.sentence),
    page.services,
    page.visits,
    page.approach,
  ];
}

export const countWords = (texts: string[]) => texts.join(" ").split(/\s+/).filter(Boolean).length;

const sentencesOf = (text: string) =>
  text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length >= 25);

/**
 * Everything that stops an area page being indexable. `otherTexts` is every
 * other sentence on the site's location pages (cities, hubs), so a sentence
 * is never reused from the city page; sentences are also compared across areas.
 */
export function areaIssues(area: AreaDef, otherTexts: string[], peers: AreaDef[] = areas): string[] {
  const page = area.page;
  if (!page) return ["no page content"];
  const issues: string[] = [];
  if (!area.confirmedService) issues.push("service is not confirmed for this area");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(area.slug)) issues.push("slug must be lowercase-hyphen");

  const texts = areaTexts(page);
  const words = countWords(texts);
  if (words < AREA_MIN_WORDS) issues.push(`only ${words} unique words (min ${AREA_MIN_WORDS})`);
  if (page.places.length < 3) issues.push("needs at least 3 places or estates");
  if (page.industries.length < 3) issues.push("needs at least 3 industries");
  if (page.metaTitle.length > 60) issues.push(`metaTitle is ${page.metaTitle.length} chars`);
  if (page.metaDescription.length > 155) issues.push(`metaDescription is ${page.metaDescription.length} chars`);
  if (!/Get Solution/.test(page.metaDescription)) issues.push('metaDescription must say "Get Solution"');
  if (!page.metaTitle.includes(area.name.split(",")[0])) issues.push("metaTitle must name the area");

  const copy = [...texts, page.metaTitle, page.metaDescription].join(" ");
  for (const [re, label] of AREA_BANNED) if (re.test(copy)) issues.push(`uses banned wording ${label}`);

  const theirs = new Set(otherTexts.flatMap(sentencesOf));
  for (const peer of peers) {
    if (peer.slug === area.slug || peer.citySlug !== area.citySlug && !peer.page || !peer.page) continue;
    for (const s of areaTexts(peer.page).flatMap(sentencesOf)) theirs.add(s);
  }
  const reused = texts.flatMap(sentencesOf).filter((s) => theirs.has(s));
  if (reused.length) issues.push(`reuses ${reused.length} sentence(s), e.g. "${reused[0].slice(0, 70)}"`);
  return issues;
}

export function getArea(citySlug: string, areaSlug: string): AreaDef | undefined {
  return areas.find((a) => a.citySlug === citySlug && a.slug === areaSlug);
}

export function getAreasForCity(citySlug: string): AreaDef[] {
  return areas.filter((a) => a.citySlug === citySlug);
}

/** Areas with written pages for a city. */
export function getWrittenAreasForCity(citySlug: string): AreaDef[] {
  return getAreasForCity(citySlug).filter((a) => a.page);
}
