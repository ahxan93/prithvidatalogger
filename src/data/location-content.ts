// Extra page data for the location pages (/data-logger-{slug}) (brief §7.9), keyed by the node's
// slug path ("india/maharashtra"). The unique copy (intro, industries,
// cities, support note, FAQs) lives on the node itself in locations.ts. Cities
// built to the playbook template carry their own meta title, description and
// recommended series on the node, so they have no entry here.
//
// Rules: no country-specific regulations, delivery times or statistics. GSM
// models are never recommended outside India (network compatibility is not
// confirmed; see GSM_NETWORK_NOTE). Validated by `npm run check:data`.

export type LocationContent = {
  /** Meta description; ≤ 155 characters, unique. */
  metaDescription: string;
  /** Series slugs shown as "Recommended products" (a reasoned starting point). */
  recommended: string[];
  /** How the place reads after "in", when the plain name is awkward ("the UAE"). */
  inName?: string;
};

export const locationContent: Record<string, LocationContent> = {
  india: {
    metaDescription:
      "Temperature data loggers across India: WiFi and GSM loggers by state, city and industrial area, with set-up support and calibration. Get Solution.",
    recommended: ["nakshatra", "veer", "vayu"],
  },
  "india/maharashtra": {
    metaDescription:
      "Temperature data loggers in Maharashtra: Mumbai, Pune, Nashik, Nagpur, Kolhapur, Solapur and more cities and areas. Get Solution.",
    recommended: ["nakshatra", "dhruva", "virat"],
  },
  "india/gujarat": {
    metaDescription:
      "Temperature data loggers across Gujarat: Ahmedabad, Vadodara, Rajkot, Gandhinagar, Surat and the Vapi to Bharuch chemical belt. Get Solution.",
    recommended: ["nakshatra", "dhruva", "veer"],
  },
  "india/delhi": {
    metaDescription:
      "Temperature data loggers across the Delhi region: hospitals, medicine distributors, food stores and the Okhla, Bawana and Narela estates. Get Solution.",
    recommended: ["dhruva", "setu", "vayu"],
    inName: "the Delhi Region",
  },
  "india/uttar-pradesh": {
    metaDescription:
      "Temperature data loggers in Uttar Pradesh: Noida, Lucknow, Kanpur, Agra, Varanasi, Meerut, Moradabad and more cities. Get Solution.",
    recommended: ["virat", "nakshatra", "dhruva"],
  },
  "india/haryana": {
    metaDescription:
      "Temperature data loggers in Haryana: Gurugram, Faridabad, Manesar, Panchkula, Karnal, Hisar and more cities and industrial areas. Get Solution.",
    recommended: ["veer", "rajmudra", "vayu"],
  },
  "india/telangana": {
    metaDescription:
      "Temperature data loggers in Telangana: Hyderabad's pharma estates and labs, plus Warangal, Karimnagar and Nizamabad's mills and godowns. Get Solution.",
    recommended: ["rajmudra", "veer", "nakshatra"],
  },
  "india/karnataka": {
    metaDescription:
      "Temperature data loggers in Karnataka: Bengaluru (Bangalore), Mysuru, Mangaluru, Belagavi, Hubballi-Dharwad and Tumakuru. Get Solution.",
    recommended: ["setu", "dhruva", "nakshatra"],
  },
  "india/tamil-nadu": {
    metaDescription:
      "Temperature data loggers in Tamil Nadu: Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Hosur and more cities. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/punjab": {
    metaDescription:
      "Temperature data loggers in Punjab: Mohali, Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda and Rajpura. Get Solution.",
    recommended: ["dhruva", "nakshatra", "vayu"],
  },
  "india/chandigarh": {
    metaDescription:
      "Temperature data loggers in the Chandigarh region: hospitals, medicine distributors and food depots across Mohali and Panchkula. Get Solution.",
    recommended: ["nakshatra", "dhruva", "vayu"],
    inName: "the Chandigarh Region",
  },
  "india/himachal-pradesh": {
    metaDescription:
      "Temperature data loggers in Himachal Pradesh: Baddi, Solan, Parwanoo, Paonta Sahib, Una and Shimla plants, stores and hospitals. Get Solution.",
    recommended: ["rajmudra", "virat", "setu"],
  },
  "india/kerala": {
    metaDescription:
      "Temperature data loggers in Kerala: Kochi, Thiruvananthapuram, Kozhikode, Thrissur and Kollam's cold chain, labs and hospitals. Get Solution.",
    recommended: ["dhruva", "vayu", "virat"],
  },
  "india/goa": {
    metaDescription:
      "Temperature data loggers in the State of Goa: pharmaceutical plants at Verna and Kundaim and coastal hotel kitchens. Get Solution.",
    recommended: ["rajmudra", "setu", "nakshatra"],
    inName: "the State of Goa",
  },
  "india/rajasthan": {
    metaDescription:
      "Temperature data loggers in Rajasthan: Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bhilwara, Bhiwadi and Neemrana. Get Solution.",
    recommended: ["veer", "rajmudra", "vayu"],
  },
  "india/madhya-pradesh": {
    metaDescription:
      "Temperature data loggers in Madhya Pradesh: Indore, Bhopal, Jabalpur, Gwalior, Pithampur, Ujjain and Dewas. Get Solution.",
    recommended: ["virat", "dhruva", "setu"],
  },
  "india/dadra-and-nagar-haveli-and-daman-and-diu": {
    metaDescription:
      "Temperature data loggers in Silvassa, Daman and Diu: pharma, plastics and packaging plants, harbour stores and hotel kitchens. Get Solution.",
    recommended: ["rajmudra", "nakshatra", "vayu"],
    inName: "Silvassa, Daman & Diu",
  },
  "india/puducherry": {
    metaDescription:
      "Temperature data loggers in Puducherry: the capital's pharma estates, hotels and hospitals and the delta enclave of Karaikal. Get Solution.",
    recommended: ["nakshatra","rajmudra","vayu"],
  },
  "india/jammu-and-kashmir": {
    metaDescription:
      "Temperature data loggers in Jammu and Kashmir: Jammu, Srinagar, Samba and Kathua's pharma estates, fruit cold stores and hospitals. Get Solution.",
    recommended: ["rajmudra","virat","vayu"],
  },
  "india/sikkim": {
    metaDescription:
      "Temperature data loggers in Sikkim: Gangtok's hotels and hospitals and Rangpo's pharma estates, in wet mountain country. Get Solution.",
    recommended: ["nakshatra","setu","vayu"],
  },
  "india/tripura": {
    metaDescription:
      "Temperature data loggers in Tripura: Agartala's markets, hospitals, university laboratories and border-trade godowns in hot, humid air. Get Solution.",
    recommended: ["nakshatra","virat","vayu"],
  },
  "india/meghalaya": {
    metaDescription:
      "Temperature data loggers in Meghalaya: Shillong's hotel kitchens, hospitals, laboratories and Byrnihat-side stores in cool, wet hill air. Get Solution.",
    recommended: ["nakshatra","setu","rajmudra"],
  },
  "india/manipur": {
    metaDescription:
      "Temperature data loggers in Manipur: Imphal's markets, medicine distributors, hospitals and handloom godowns in humid hill-road country. Get Solution.",
    recommended: ["nakshatra","setu","vayu"],
  },
  "india/assam": {
    metaDescription:
      "Temperature data loggers in Assam: Guwahati, Dibrugarh, Silchar and Tezpur's tea stores, medicine distributors and hospitals. Get Solution.",
    recommended: ["nakshatra","setu","vayu"],
  },
  "india/bihar": {
    metaDescription:
      "Temperature data loggers in Bihar: Patna, Hajipur, Muzaffarpur, Gaya and Bhagalpur. Get Solution.",
    recommended: ["setu", "nakshatra", "vayu"],
  },
  "india/chhattisgarh": {
    metaDescription:
      "Temperature data loggers in Chhattisgarh: Raipur, Bhilai, Bilaspur and Korba's rice godowns, steel stores, hospitals and coal-belt sheds. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/jharkhand": {
    metaDescription:
      "Temperature data loggers in Jharkhand: Ranchi, Jamshedpur, Dhanbad and Bokaro's steel-town stores, hospitals and coal-belt godowns. Get Solution.",
    recommended: ["virat", "rajmudra", "vayu"],
  },
  "india/odisha": {
    metaDescription:
      "Temperature data loggers in Odisha: Bhubaneswar, Cuttack, Rourkela, Paradip and Jharsuguda. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/uttarakhand": {
    metaDescription:
      "Temperature data loggers in Uttarakhand: Haridwar, Dehradun, Roorkee, Rudrapur-Pantnagar, Kashipur and Kotdwar. Get Solution.",
    recommended: ["virat", "rajmudra", "vayu"],
  },
  "india/andhra-pradesh": {
    metaDescription:
      "Temperature data loggers in Andhra Pradesh: Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore, Sri City and Kakinada. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/west-bengal": {
    metaDescription:
      "Temperature data loggers in West Bengal: Kolkata, Howrah, Siliguri, Durgapur, Asansol, Kharagpur and Haldia. Get Solution.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "saudi-arabia": {
    metaDescription:
      "Temperature data loggers in Saudi Arabia: WiFi loggers for Riyadh, Jeddah and Dammam warehouses, supplied from India and set up remotely. Get Solution.",
    recommended: ["nakshatra", "veer", "virat"],
  },
  "yemen/hadramaut-governorate": {
    metaDescription:
      "Data loggers for Hadramaut Governorate: Mukalla's fish stores, Seiyun and Shibam's date and heritage rooms, reviewed case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/abyan-governorate": {
    metaDescription:
      "Temperature data loggers for Abyan Governorate: Zinjibar's delta produce stores, fish landings and clinics, reviewed case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/amanat-al-asimah": {
    metaDescription:
      "Data loggers for Amanat Al Asimah: Sana'a's pharmacies, food stores, industrial area and airport, reviewed case by case for Yemen. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/taiz-governorate": {
    metaDescription:
      "Data loggers for Taiz Governorate: Taiz's hospitals and food stores and Mocha's coffee port storage, reviewed case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/al-hudaydah-governorate": {
    metaDescription:
      "Data loggers for Al Hudaydah Governorate: Hodeidah's port stores, Zabid and Bajil markets on the Tihama, reviewed case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/ibb-governorate": {
    metaDescription:
      "Temperature data loggers for Ibb Governorate: Ibb's terrace-farm produce, markets and clinics in a wet highland, case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/dhamar-governorate": {
    metaDescription:
      "Temperature data loggers for Dhamar Governorate: Dhamar's farm produce, clinics and university labs on a cold plateau, case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/marib-governorate": {
    metaDescription:
      "Temperature data loggers for Marib Governorate: Marib's desert-edge food stores, clinics and farm produce, case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/lahij-governorate": {
    metaDescription:
      "Temperature data loggers for Lahij Governorate: Lahij's delta produce stores, wholesale food rooms and clinics, case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/sadah-governorate": {
    metaDescription:
      "Temperature data loggers for Sa'dah Governorate: Sa'dah's walled-town markets, fruit stores and clinics, case by case for Yemen. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-rayyan-municipality": {
    metaDescription:
      "Data loggers for Al Rayyan Municipality: Al Rayyan city, Al Gharafa, Birkat Al Awamer and Al Sailiya shops, clinics and stores. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-wakrah-municipality": {
    metaDescription:
      "Data loggers for Al Wakrah Municipality: Al Wakrah, Mesaieed, Al Wukair and Mesaieed Industrial City stores, kitchens and clinics. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-khor-and-al-thakhira-municipality": {
    metaDescription:
      "Data loggers for Al Khor and Al Thakhira Municipality: Al Khor, Ras Laffan and Ras Laffan Industrial City stores, kitchens and clinics. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
    inName: "Al Khor and Al Thakhira",
  },
  "qatar/al-daayen-municipality": {
    metaDescription:
      "Data loggers for Al Daayen Municipality: Lusail's hotel kitchens, clinics and stockrooms and Al Daayen's shops, farms and stores. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/umm-salal-municipality": {
    metaDescription:
      "Data loggers for Umm Salal Municipality: Umm Salal's farm sheds, shops, clinics and workshops in hot, dry summers. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-shamal-municipality": {
    metaDescription:
      "Data loggers for Al Shamal Municipality: Al Shamal's harbour ice stores, farm sheds, supermarkets and clinics on the northern coast. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-shahaniya-municipality": {
    metaDescription:
      "Data loggers for Al Shahaniya Municipality: Al Shahaniya's farm sheds, Dukhan's town and the Dukhan Industrial Area storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/muscat-governorate": {
    metaDescription:
      "Data loggers for Muscat Governorate: Muscat, Muttrah, Al Khuwair, Al Ghubra, Ghala and the Muttrah port kitchens, clinics and stores. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-batinah-north-governorate": {
    metaDescription:
      "Data loggers for Al Batinah North Governorate: Sohar, Saham, Al Suwaiq, Sohar Industrial Estate and the port and freezone. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-batinah-south-governorate": {
    metaDescription:
      "Data loggers for Al Batinah South Governorate: Barka, Rustaq, Nakhal and Barka Industrial Area stores, farms and cold rooms. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ad-dakhiliyah-governorate": {
    metaDescription:
      "Data loggers for Ad Dakhiliyah Governorate: Nizwa, Bahla, Izki, Sumail and the Nizwa Industrial Estate date stores and warehouses. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ad-dhahirah-governorate": {
    metaDescription:
      "Data loggers for Ad Dhahirah Governorate: Ibri's date and farm stores, clinics and the Ibri Industrial Area in fierce dry heat. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-buraimi-governorate": {
    metaDescription:
      "Data loggers for Al Buraimi Governorate: Buraimi's markets, date gardens, clinics and the Buraimi Industrial Area stores. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/dhofar-governorate": {
    metaDescription:
      "Data loggers for Dhofar Governorate: Salalah, Salalah Free Zone, Raysut Industrial Estate and Port of Salalah stores and cold rooms. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-wusta-governorate": {
    metaDescription:
      "Data loggers for Al Wusta Governorate: Duqm, the Duqm Special Economic Zone and Port of Duqm stores and cold rooms. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ash-sharqiyah-south-governorate": {
    metaDescription:
      "Data loggers for Ash Sharqiyah South Governorate: Sur's harbour ice stores, market and the Sur Industrial Estate warehouses. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ash-sharqiyah-north-governorate": {
    metaDescription:
      "Data loggers for Ash Sharqiyah North Governorate: Ibra's market and date groves and Bidiyah's desert-edge farm stores. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/musandam-governorate": {
    metaDescription:
      "Data loggers for Musandam Governorate: Khasab's fish ice boxes, shops, hospital and clinics among steep inlets. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/doha-municipality": {
    metaDescription:
      "Data loggers for Doha Municipality: Doha city, West Bay, Al Sadd, Msheireb and The Pearl-Qatar kitchens, clinics and stores. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/dubai-emirate": {
    metaDescription:
      "Data loggers for Dubai Emirate: the city, Jebel Ali, Dubai Investments Park, Al Quoz, Ras Al Khor, Al Qusais and Al Aweer storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/sharjah-emirate": {
    metaDescription:
      "Data loggers for Sharjah Emirate: Sharjah, Khor Fakkan, Kalba, Sajaa, SAIF Zone, Hamriyah and Muwaileh storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/ajman-emirate": {
    metaDescription:
      "Data loggers for Ajman Emirate: Ajman city, the Al Jurf Industrial Area and the Ajman Free Zone warehouse and cold-room storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/umm-al-quwain-emirate": {
    metaDescription:
      "Data loggers for Umm Al Quwain Emirate: the town's fish ice stores, shops, clinics and the UAQ Free Trade Zone storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/ras-al-khaimah-emirate": {
    metaDescription:
      "Data loggers for Ras Al Khaimah Emirate: the city, RAKEZ, Al Ghail Industrial Area and Al Jazirah Al Hamra storage and cold rooms. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/fujairah-emirate": {
    metaDescription:
      "Data loggers for Fujairah Emirate: Fujairah, Dibba Al Fujairah, the Fujairah Free Zone and Port of Fujairah storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/abu-dhabi-emirate": {
    metaDescription:
      "Data loggers for Abu Dhabi Emirate: the city, Mussafah, ICAD, KIZAD, Khalifa Port and Ghantoot warehouse and cold-room storage. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/aden-governorate": {
    metaDescription:
      "Temperature data loggers for Aden Governorate: the port city's clinics, food stores and harbour-area warehouses, reviewed case by case. Get Solution.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "saudi-arabia/riyadh-region": {
    metaDescription:
      "Temperature data loggers in the Riyadh Region: the capital, oasis farms and industrial cities, with remote set-up from India. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/makkah-region": {
    metaDescription:
      "Temperature data loggers in the Makkah Region: Red Sea port logistics, hospitals, hotel kitchens and food stores, set up remotely. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/eastern-province": {
    metaDescription:
      "Temperature data loggers in the Eastern Province: Gulf-coast ports, industrial cities, food depots and hospitals, set up remotely. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/madinah-region": {
    metaDescription:
      "Temperature data loggers in the Madinah Region: hospitality, hospital and food stores inland and port plants at Yanbu, set up remotely. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/asir-region": {
    metaDescription:
      "Temperature data loggers in the Asir Region: Abha and Khamis Mushait hospitals, food depots and hotel kitchens in cool mountain air. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/qassim-region": {
    metaDescription:
      "Temperature data loggers in the Qassim Region: date stores, farm cold rooms, hospitals and food depots on the central plain. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/jazan-region": {
    metaDescription:
      "Temperature data loggers in the Jazan Region: fruit and coffee stores, fish depots, hospitals and port stores in hot, humid coastal air. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/tabuk-region": {
    metaDescription:
      "Temperature data loggers in the Tabuk Region: farm and food depots, hospitals and coastal port stores in hot summers and cold winters. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/hail-region": {
    metaDescription:
      "Temperature data loggers in the Hail Region: farm cold rooms, date and wheat stores, hospitals and food depots on the northern plateau. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/najran-region": {
    metaDescription:
      "Temperature data loggers in the Najran Region: date and fruit stores, hospitals, hotel kitchens and food depots in a hot southern valley. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/al-baha-region": {
    metaDescription:
      "Temperature data loggers in the Al Baha Region: highland produce, honey and food depots, hospitals and hotel kitchens in cool, misty air. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/al-jawf-region": {
    metaDescription:
      "Temperature data loggers in the Al Jawf Region: olive, date and farm stores, hospitals and food depots in hot summers and cold winters. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/northern-borders-region": {
    metaDescription:
      "Temperature data loggers in the Northern Borders Region: food and medicine depots, hospitals and farm stores on the northern plateau. Get Solution.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  uae: {
    metaDescription:
      "Temperature data loggers in the UAE: WiFi loggers for Dubai warehouses, food importers and hotel kitchens, set up remotely. Get Solution.",
    recommended: ["setu", "nakshatra", "veer"],
    inName: "the UAE",
  },
  qatar: {
    metaDescription:
      "Temperature data loggers in Qatar: WiFi loggers for Doha warehouses, cold stores, hotels and clinics, supplied from India. Get Solution.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  oman: {
    metaDescription:
      "Temperature data loggers in Oman: WiFi loggers for Muscat, Sohar and Salalah pharmacies, hospitals and food distributors. Get Solution.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  kuwait: {
    metaDescription:
      "Temperature data loggers in Kuwait: WiFi loggers for warehouses, cold stores, hospitals and kitchens, supplied from India. Get Solution.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  bahrain: {
    metaDescription:
      "Temperature data loggers in Bahrain: WiFi loggers for warehouses, cold stores, hospitals and hotels, supplied from India. Get Solution.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  yemen: {
    metaDescription:
      "Temperature data loggers for Yemen, arranged case by case: loggers that keep recording through power and network outages. Get Solution.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
};

/** Approximate map position (longitude, latitude) of each country's marker on the
 *  stylised presence map. Markers only: no borders are drawn. */
export const countryMarkers: Record<string, { lon: number; lat: number; label: string }> = {
  india: { lon: 72.9, lat: 19.1, label: "India" },
  "saudi-arabia": { lon: 46.7, lat: 24.7, label: "Saudi Arabia" },
  uae: { lon: 54.4, lat: 24.4, label: "UAE" },
  qatar: { lon: 51.5, lat: 25.3, label: "Qatar" },
  oman: { lon: 58.4, lat: 23.6, label: "Oman" },
  kuwait: { lon: 48.0, lat: 29.4, label: "Kuwait" },
  bahrain: { lon: 50.6, lat: 26.2, label: "Bahrain" },
  yemen: { lon: 44.2, lat: 15.4, label: "Yemen" },
};
