// /data-logger-india | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "india",
  name: "India",
  type: "country",
  intro:
    "A logger in India covers everything from hospital fridges to port warehouses, in very different climates. India is where Prithvi Data Loggers is based, and the country's storage map is as varied as its climate: pharmaceutical and chemical estates in Maharashtra and Gujarat, electronics and technology campuses in the south, food and cold-chain businesses in every state, and hospitals and medicine distributors everywhere. This page is the starting point for every Indian location we serve, grouped by state. Choose a state to see its cities and industrial areas, the industries we support there and the loggers we suggest, or go straight to a city. Whichever page you open, the same dashboard, alerts and calibration support are behind it, and our team in Mumbai arranges supply, set-up and site visits with you.",
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
      question: "Where can I find a temperature data logger in my own Indian city?",
      answer:
        "Open the state that holds your city, where each city and industrial area has its own page, or use the list on the locations page. If your city is not listed, send the location through the enquiry form and we confirm what we can supply.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Is the supply the same in every Indian state?",
      answer:
        "The loggers, the dashboard and the alert system are the same everywhere. What differs is the visit plan, which we arrange by region and group with other sites nearby so that one trip covers neighbouring places.",
    },
    {
      question: "Who calibrates the loggers used across India?",
      answer:
        "Calibration, temperature mapping and validation support come from VEGA Calibrations, our parent company, and can be planned together with the supply so that placement and certificates are settled in one go.",
    },
  ],
  listing: [
    { slug: "maharashtra", text: "Mumbai, Navi Mumbai, Thane and Bhiwandi, Panvel, Pune, Vasai-Palghar, Nashik, Chhatrapati Sambhajinagar, Nagpur, Kolhapur, Satara, Solapur and Ratnagiri-Lote, from a humid coast to hot inland plateaus." },
    { slug: "gujarat", text: "Ahmedabad, Vadodara, Rajkot, Gandhinagar, the Morbi ceramic cluster, the Kutch ports and the chemical belt from Vapi to Bharuch, where pharmaceutical, dye and engineering stores meet dry heat and a heavy southern monsoon." },
    { slug: "delhi-state", text: "A dense capital in which hospitals, medicine distributors and food businesses share space with the Okhla, Bawana and Narela industrial areas." },
    { slug: "uttar-pradesh", text: "Noida and Greater Noida's electronics and data campuses, Lucknow's hospitals and cold stores, and the trades of Ghaziabad, Kanpur, Agra, Varanasi, Meerut, Prayagraj, Bareilly and Moradabad." },
    { slug: "haryana", text: "Gurugram, Faridabad, the IMT Manesar plants and the Grand Trunk Road towns of Sonipat and Panipat, built around automotive, textiles, food and distribution." },
    { slug: "telangana", text: "Hyderabad's pharmaceutical estates, life-science campuses and server halls, with the market and mill towns of Warangal, Karimnagar and Nizamabad." },
    { slug: "karnataka", text: "Bengaluru's laboratories, technology parks, electronics makers and hospitals, together with the engineering belt of Peenya and the cities of Mysuru, Mangaluru, Belagavi, Hubballi-Dharwad and Tumakuru." },
    { slug: "tamil-nadu", text: "Chennai's port-linked estates and the mills and workshops of Coimbatore, Hosur's vehicle and electronics cluster, and the cities of Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Vellore and Tuticorin." },
    { slug: "chandigarh-state", text: "The planned city and union territory, with Mohali and Panchkula beside it, serving hospitals, medicine distributors and food depots." },
    { slug: "punjab", text: "Mohali's industrial phases, technology parks, pharmaceutical units, research institutes and hospitals beside Chandigarh, where storage is held to written limits." },
    { slug: "himachal-pradesh", text: "The foothill pharmaceutical cluster around Baddi, Barotiwala and Nalagarh, where plants work to written storage procedures, together with Solan, Parwanoo, Paonta Sahib, Una and Shimla." },
    { slug: "kerala", text: "Kochi's seafood export cold chain, port warehouses, spice trade and large hospitals, with Thiruvananthapuram, Kozhikode, Thrissur and Kollam, all in warm, wet air." },
    { slug: "goa-state", text: "Pharmaceutical plants at Verna and Kundaim and the hotel kitchens of the coast, tested by salt air and the monsoon." },
    { slug: "rajasthan", text: "Jaipur's dairies, medicine stockists and hospitals, with the Sitapura and VKI industrial areas in a dry desert climate." },
    { slug: "madhya-pradesh", text: "Indore's food processors, pharmaceutical makers and the Pithampur and Sanwer Road estates, with a hot summer and a heavy monsoon." },
    { slug: "west-bengal", text: "Kolkata's cold stores, pharmaceutical distributors, hospitals and port-side godowns, with Howrah, Kalyani and Dankuni around it." },
    { slug: "andhra-pradesh", text: "Visakhapatnam's port, steel, shipyard and pharma estates, Vijayawada's markets, Guntur's chilli cold stores and Tirupati's hotels and electronics, in a hot, humid, cyclone-prone coast." },
    { slug: "uttarakhand", text: "Haridwar's factory estate and pilgrim hotels, Dehradun's pharma and technology estates, hospitals and institutes, and Roorkee's engineering town, between hot plains and cold hills." },
    { slug: "dadra-and-nagar-haveli-and-daman-and-diu", text: "Silvassa's pharma, plastics and textile estates, Daman's packaging, bottling and harbour trades, and the island of Diu, in a humid coastal climate." },
    { slug: "odisha", text: "Bhubaneswar and Cuttack's hospitals, markets and estates, Rourkela's steel town and the Paradip port and Jharsuguda power country, in cyclone and monsoon weather." },
    { slug: "jharkhand", text: "Ranchi's engineering and hospitals, Jamshedpur's steel and vehicle belt, the Dhanbad coal field and Bokaro's steel township, in dusty heat and a heavy monsoon." },
    { slug: "chhattisgarh", text: "Raipur's rice mills and steel estates, Bhilai's steel township, Bilaspur's railway and coalfield offices and Korba's coal and power belt, in dust and a heavy monsoon." },
    { slug: "bihar", text: "Patna's hospitals and distributors, Hajipur's railway and banana trade and Muzaffarpur's litchi and fruit markets, in heat, humidity and flood weather." },
    { slug: "assam", text: "Guwahati's gateway trade and hospitals, Dibrugarh's tea and oil country, Silchar's Barak Valley trade and Tezpur's gardens, in very heavy rain and river floods." },
    { slug: "manipur", text: "Imphal's valley markets, handloom trade and hospitals, reached by long hill roads and exposed to heavy summer rain." },
    { slug: "meghalaya", text: "Shillong's hill hotels, medical institute and university, with the Byrnihat industrial belt below, in cool, extremely rainy air." },
    { slug: "tripura", text: "Agartala's border-side markets, rubber and agro trade, hospitals and university, in hot humid air and heavy monsoon rain." },
    { slug: "sikkim", text: "Gangtok's hotels, hospitals and markets and Rangpo's border gateway and pharmaceutical estates, in steep mountain country with landslide-prone roads." },
    { slug: "jammu-and-kashmir", text: "Jammu's pharma estates and gateway trade, Srinagar's fruit, saffron and handicraft stores, and the highway towns of Samba and Kathua, in a climate of hot plains and snowy winters." },
    { slug: "puducherry-state", text: "Puducherry's pharma and electronics estates, beach hotels and institutes, and the separate delta enclave of Karaikal, in humid, cyclone-prone coastal air." },
  ],
  indexable: true,
};

export default country;
