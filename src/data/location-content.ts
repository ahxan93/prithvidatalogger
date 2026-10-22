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
      "India: WiFi and GSM temperature data loggers by state, city and industrial area, with set-up and calibration support. Get Solution to begin in India.",
    recommended: ["nakshatra", "veer", "vayu"],
  },
  "india/maharashtra": {
    metaDescription:
      "Maharashtra: temperature data loggers covering Mumbai, Pune, Nashik, Nagpur, Kolhapur and Solapur, plus smaller cities. Use Get Solution for Maharashtra.",
    recommended: ["nakshatra", "dhruva", "virat"],
  },
  "india/gujarat": {
    metaDescription:
      "Gujarat: temperature data loggers covering Ahmedabad, Vadodara, Rajkot, Gandhinagar, Surat and the Vapi to Bharuch chemical belt. Get Solution: Gujarat.",
    recommended: ["nakshatra", "dhruva", "veer"],
  },
  "india/delhi": {
    metaDescription:
      "Delhi region: temperature data loggers for hospitals, medicine distributors, food stores and the Okhla and Narela estates. Get Solution: Delhi Region.",
    recommended: ["dhruva", "setu", "vayu"],
    inName: "the Delhi Region",
  },
  "india/uttar-pradesh": {
    metaDescription:
      "Uttar Pradesh, India: temperature data loggers covering Noida, Lucknow, Kanpur, Agra, Varanasi, Meerut and Moradabad. Get Solution: Uttar Pradesh.",
    recommended: ["virat", "nakshatra", "dhruva"],
  },
  "india/haryana": {
    metaDescription:
      "Haryana: temperature data loggers covering Gurugram, Faridabad, Manesar, Panchkula, Karnal, Hisar and industrial areas. Get Solution to begin in Haryana.",
    recommended: ["veer", "rajmudra", "vayu"],
  },
  "india/telangana": {
    metaDescription:
      "Telangana, India: temperature data loggers for Hyderabad's pharma estates and labs, plus Warangal, Karimnagar and Nizamabad mills. Get Solution: Telangana.",
    recommended: ["rajmudra", "veer", "nakshatra"],
  },
  "india/karnataka": {
    metaDescription:
      "Karnataka, India: temperature data loggers covering Bengaluru, Mysuru, Mangaluru, Belagavi, Hubballi-Dharwad and Tumakuru. Get Solution to cover Karnataka.",
    recommended: ["setu", "dhruva", "nakshatra"],
  },
  "india/tamil-nadu": {
    metaDescription:
      "Tamil Nadu: temperature data loggers covering Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur and Hosur. Get Solution to cover Tamil Nadu.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/punjab": {
    metaDescription:
      "Punjab, India: temperature data loggers covering Mohali, Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda and Rajpura. Get Solution: Punjab.",
    recommended: ["dhruva", "nakshatra", "vayu"],
  },
  "india/chandigarh": {
    metaDescription:
      "Chandigarh region: temperature data loggers for hospitals, medicine distributors and food depots in Mohali and Panchkula. Get Solution: Chandigarh Region.",
    recommended: ["nakshatra", "dhruva", "vayu"],
    inName: "the Chandigarh Region",
  },
  "india/himachal-pradesh": {
    metaDescription:
      "Himachal Pradesh: temperature data loggers for Baddi, Solan, Parwanoo, Paonta Sahib, Una and Shimla plants and hospitals. Get Solution: Himachal Pradesh.",
    recommended: ["rajmudra", "virat", "setu"],
  },
  "india/kerala": {
    metaDescription:
      "Kerala, India: temperature data loggers for the cold chain, labs and hospitals of Kochi, Kozhikode, Thrissur and Kollam. Get Solution to begin in Kerala.",
    recommended: ["dhruva", "vayu", "virat"],
  },
  "india/goa": {
    metaDescription:
      "Goa, India: temperature data loggers for pharma plants at Verna and Kundaim and for coastal hotel kitchens. Get Solution: request a plan for State of Goa.",
    recommended: ["rajmudra", "setu", "nakshatra"],
    inName: "the State of Goa",
  },
  "india/rajasthan": {
    metaDescription:
      "Rajasthan: temperature data loggers covering Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bhilwara, Bhiwadi and Neemrana. Get Solution to begin in Rajasthan.",
    recommended: ["veer", "rajmudra", "vayu"],
  },
  "india/madhya-pradesh": {
    metaDescription:
      "Madhya Pradesh: temperature data loggers covering Indore, Bhopal, Jabalpur, Gwalior, Pithampur, Ujjain and Dewas. Get Solution to cover Madhya Pradesh.",
    recommended: ["virat", "dhruva", "setu"],
  },
  "india/dadra-and-nagar-haveli-and-daman-and-diu": {
    metaDescription:
      "Silvassa, Daman and Diu: temperature data loggers for pharma, plastics and packaging plants, harbour stores and hotel kitchens. Get Solution.",
    recommended: ["rajmudra", "nakshatra", "vayu"],
    inName: "Silvassa, Daman & Diu",
  },
  "india/puducherry": {
    metaDescription:
      "Puducherry, India: temperature data loggers for pharma estates, hotels and hospitals, plus the delta enclave of Karaikal. Get Solution for Puducherry.",
    recommended: ["nakshatra","rajmudra","vayu"],
  },
  "india/jammu-and-kashmir": {
    metaDescription:
      "Jammu and Kashmir: temperature data loggers for pharma estates, fruit cold stores and hospitals in Jammu and Srinagar. Get Solution: Jammu and Kashmir.",
    recommended: ["rajmudra","virat","vayu"],
  },
  "india/sikkim": {
    metaDescription:
      "Sikkim: temperature data loggers for Gangtok's hotels and hospitals and Rangpo's pharma estates in wet mountain country. Get Solution to begin in Sikkim.",
    recommended: ["nakshatra","setu","vayu"],
  },
  "india/tripura": {
    metaDescription:
      "Tripura: temperature data loggers for Agartala's markets, hospitals, university laboratories and border-trade godowns. Get Solution to begin in Tripura.",
    recommended: ["nakshatra","virat","vayu"],
  },
  "india/meghalaya": {
    metaDescription:
      "Meghalaya: temperature data loggers for Shillong's hotel kitchens, hospitals, laboratories and Byrnihat-side stores. Get Solution to begin in Meghalaya.",
    recommended: ["nakshatra","setu","rajmudra"],
  },
  "india/manipur": {
    metaDescription:
      "Manipur: temperature data loggers for Imphal's markets, medicine distributors, hospitals and handloom godowns. Get Solution: request a plan for Manipur.",
    recommended: ["nakshatra","setu","vayu"],
  },
  "india/assam": {
    metaDescription:
      "Assam, India: temperature data loggers for tea stores, medicine distributors and hospitals in Guwahati, Dibrugarh, Silchar and Tezpur. Get Solution: Assam.",
    recommended: ["nakshatra","setu","vayu"],
  },
  "india/bihar": {
    metaDescription:
      "Bihar, India: temperature data loggers covering Patna, Hajipur, Muzaffarpur, Gaya and Bhagalpur. Get Solution to cover Bihar.",
    recommended: ["setu", "nakshatra", "vayu"],
  },
  "india/chhattisgarh": {
    metaDescription:
      "Chhattisgarh: temperature data loggers for rice godowns, steel stores and hospitals in Raipur, Bhilai, Bilaspur and Korba. Get Solution: Chhattisgarh.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/jharkhand": {
    metaDescription:
      "Jharkhand: temperature data loggers for steel-town stores, hospitals and coal-belt godowns in Ranchi, Jamshedpur and Dhanbad. Get Solution: Jharkhand.",
    recommended: ["virat", "rajmudra", "vayu"],
  },
  "india/odisha": {
    metaDescription:
      "Odisha, India: temperature data loggers covering Bhubaneswar, Cuttack, Rourkela, Paradip and Jharsuguda. Get Solution: Odisha.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/uttarakhand": {
    metaDescription:
      "Uttarakhand: temperature data loggers covering Haridwar, Dehradun, Roorkee, Rudrapur-Pantnagar, Kashipur and Kotdwar. Get Solution to cover Uttarakhand.",
    recommended: ["virat", "rajmudra", "vayu"],
  },
  "india/andhra-pradesh": {
    metaDescription:
      "Andhra Pradesh: temperature data loggers for Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore, Sri City and Kakinada. Get Solution for Andhra Pradesh.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "india/west-bengal": {
    metaDescription:
      "West Bengal, India: temperature data loggers covering Kolkata, Howrah, Siliguri, Durgapur, Asansol, Kharagpur and Haldia. Use Get Solution for West Bengal.",
    recommended: ["nakshatra", "virat", "vayu"],
  },
  "saudi-arabia": {
    metaDescription:
      "Saudi Arabia: WiFi temperature data loggers for Riyadh, Jeddah and Dammam warehouses, supplied from India, set up remotely. Get Solution.",
    recommended: ["nakshatra", "veer", "virat"],
  },
  "yemen/hadramaut-governorate": {
    metaDescription:
      "Hadramaut Governorate: temperature data loggers for Mukalla fish stores and Seiyun and Shibam date rooms, reviewed case by case. Get Solution: Hadramaut.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/abyan-governorate": {
    metaDescription:
      "Abyan Governorate: temperature data loggers for Zinjibar's delta produce stores, fish landings and clinics, reviewed case by case. Get Solution for Abyan.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/amanat-al-asimah": {
    metaDescription:
      "Amanat Al Asimah: temperature data loggers for Sana'a pharmacies, food stores and industrial area, reviewed case by case. Get Solution: Amanat Al Asimah.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/taiz-governorate": {
    metaDescription:
      "Taiz Governorate: temperature data loggers for Taiz hospitals and food stores and Mocha port storage, reviewed case by case. Get Solution for Taiz.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/al-hudaydah-governorate": {
    metaDescription:
      "Al Hudaydah Governorate: temperature data loggers for Hodeidah port stores and Zabid and Bajil markets, reviewed case by case. Get Solution: Al Hudaydah.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/ibb-governorate": {
    metaDescription:
      "Ibb Governorate: temperature data loggers for terrace-farm produce, markets and clinics in a wet highland, reviewed case by case. Get Solution for Ibb.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/dhamar-governorate": {
    metaDescription:
      "Dhamar Governorate: temperature data loggers for farm produce, clinics and university labs, reviewed case by case. Get Solution for Dhamar Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/marib-governorate": {
    metaDescription:
      "Marib Governorate: temperature data loggers for desert-edge food stores, clinics and farm produce, reviewed case by case. Get Solution: Marib Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/lahij-governorate": {
    metaDescription:
      "Lahij Governorate: temperature data loggers for delta produce stores, wholesale food rooms and clinics, reviewed case by case. Get Solution for Lahij.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/sadah-governorate": {
    metaDescription:
      "Sa'dah Governorate: temperature data loggers for walled-town markets, fruit stores and clinics, reviewed case by case. Get Solution: Sa'dah Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-rayyan-municipality": {
    metaDescription:
      "Al Rayyan Municipality: temperature data loggers for Al Gharafa, Birkat Al Awamer and Al Sailiya shops, clinics, stores. Get Solution for Al Rayyan.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-wakrah-municipality": {
    metaDescription:
      "Al Wakrah Municipality: temperature data loggers for Mesaieed, Al Wukair and Mesaieed Industrial City stores and clinics. Get Solution for Al Wakrah.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-khor-and-al-thakhira-municipality": {
    metaDescription:
      "Al Khor and Al Thakhira: temperature data loggers for Al Khor, Ras Laffan and Ras Laffan Industrial City stores. Get Solution: Al Khor and Al Thakhira.",
    recommended: ["nakshatra", "setu", "rajmudra"],
    inName: "Al Khor and Al Thakhira",
  },
  "qatar/al-daayen-municipality": {
    metaDescription:
      "Al Daayen Municipality: temperature data loggers for Lusail's hotel kitchens and clinics and Al Daayen's shops and farms. Get Solution for Al Daayen.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/umm-salal-municipality": {
    metaDescription:
      "Umm Salal Municipality: temperature data loggers for farm sheds, shops, clinics and workshops in hot, dry summers. Get Solution for Umm Salal Municipality.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-shamal-municipality": {
    metaDescription:
      "Al Shamal Municipality: temperature data loggers for harbour ice stores, farm sheds, supermarkets and clinics. Get Solution for Al Shamal Municipality.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/al-shahaniya-municipality": {
    metaDescription:
      "Al Shahaniya Municipality: temperature data loggers for farm sheds, Dukhan's town and Dukhan Industrial Area storage. Get Solution for Al Shahaniya.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/muscat-governorate": {
    metaDescription:
      "Muscat Governorate: temperature data loggers for Muttrah, Al Khuwair, Al Ghubra and Ghala kitchens, clinics and stores. Get Solution: Muscat Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-batinah-north-governorate": {
    metaDescription:
      "Al Batinah North Governorate: temperature data loggers for Sohar, Saham, Al Suwaiq and the Sohar estate and port. Get Solution for Al Batinah North.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-batinah-south-governorate": {
    metaDescription:
      "Al Batinah South Governorate: temperature data loggers for Barka, Rustaq, Nakhal and Barka Industrial Area stores. Get Solution for Al Batinah South.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ad-dakhiliyah-governorate": {
    metaDescription:
      "Ad Dakhiliyah Governorate: temperature data loggers for Nizwa, Bahla, Izki, Sumail and Nizwa Industrial Estate stores. Get Solution for Ad Dakhiliyah.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ad-dhahirah-governorate": {
    metaDescription:
      "Ad Dhahirah Governorate: temperature data loggers for Ibri's date and farm stores, clinics and the Ibri Industrial Area. Get Solution for Ad Dhahirah.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-buraimi-governorate": {
    metaDescription:
      "Al Buraimi Governorate: temperature data loggers for Buraimi's markets, date gardens, clinics and industrial area stores. Get Solution for Al Buraimi.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/dhofar-governorate": {
    metaDescription:
      "Dhofar Governorate: temperature data loggers for Salalah Free Zone, Raysut Industrial Estate and Port of Salalah stores. Get Solution: Dhofar Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/al-wusta-governorate": {
    metaDescription:
      "Al Wusta Governorate: temperature data loggers for Duqm, the Duqm Special Economic Zone and Port of Duqm stores. Get Solution for Al Wusta Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ash-sharqiyah-south-governorate": {
    metaDescription:
      "Ash Sharqiyah South Governorate: temperature data loggers for Sur's harbour ice stores and industrial estate. Get Solution for Ash Sharqiyah South.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/ash-sharqiyah-north-governorate": {
    metaDescription:
      "Ash Sharqiyah North Governorate, Oman: temperature data loggers for Ibra's market and Bidiyah's farm stores. Get Solution: Ash Sharqiyah North Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "oman/musandam-governorate": {
    metaDescription:
      "Musandam Governorate: temperature data loggers for Khasab's fish ice boxes, shops, hospital and clinics among steep inlets. Get Solution for Musandam.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "kuwait/al-asimah-governorate": {
    metaDescription:
      "Al Asimah Governorate: temperature data loggers for Shuwaikh Industrial Area and Shuwaikh Port kitchens and warehouses. Get Solution for Al Asimah.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "kuwait/hawalli-governorate": {
    metaDescription:
      "Hawalli Governorate: temperature data loggers for Hawalli's shops and traders' stores and Salmiya's seafront kitchens. Get Solution: Hawalli Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "kuwait/farwaniya-governorate": {
    metaDescription:
      "Farwaniya Governorate: temperature data loggers for Khaitan, Jleeb Al-Shuyoukh, industrial areas and the airport. Get Solution for Farwaniya Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "kuwait/ahmadi-governorate": {
    metaDescription:
      "Ahmadi Governorate: temperature data loggers for Ahmadi's hospital pharmacies and Fahaheel's seafront kitchens. Get Solution for Ahmadi Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "kuwait/jahra-governorate": {
    metaDescription:
      "Jahra Governorate: temperature data loggers for Sulaibiya, Sulaibiya and Amghara Industrial Areas, farms and warehouses. Get Solution: Jahra Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "kuwait/mubarak-al-kabeer-governorate": {
    metaDescription:
      "Mubarak Al-Kabeer Governorate: temperature data loggers for Sabah Al Salem's coastal shops and kitchens. Get Solution for Mubarak Al-Kabeer Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "bahrain/capital-governorate": {
    metaDescription:
      "Capital Governorate: temperature data loggers for the Financial Harbour, Seef District and Mina Salman Port. Get Solution to start in Capital Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "bahrain/muharraq-governorate": {
    metaDescription:
      "Muharraq Governorate: temperature data loggers for Muharraq, Hidd, Arad and Busaiteen shops, kitchens and sheds. Get Solution for Muharraq Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "bahrain/northern-governorate": {
    metaDescription:
      "Northern Governorate: temperature data loggers for Hamad Town, Budaiya and Saar shops, kitchens and workshops. Get Solution for Northern Governorate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "bahrain/southern-governorate": {
    metaDescription:
      "Southern Governorate: temperature data loggers for Riffa, Isa Town and Zallaq shops, kitchens, clinics and market stores. Get Solution for Southern.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "qatar/doha-municipality": {
    metaDescription:
      "Doha Municipality: temperature data loggers for West Bay, Al Sadd, Msheireb and The Pearl-Qatar kitchens, clinics and stores. Get Solution for Doha.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/dubai-emirate": {
    metaDescription:
      "Dubai Emirate: temperature data loggers for Jebel Ali, Dubai Investments Park, Al Quoz, Ras Al Khor, Al Qusais and Al Aweer storage. Get Solution: Dubai.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/sharjah-emirate": {
    metaDescription:
      "Sharjah Emirate: temperature data loggers for Khor Fakkan, Kalba, Sajaa, SAIF Zone, Hamriyah and Muwaileh storage. Get Solution for Sharjah Emirate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/ajman-emirate": {
    metaDescription:
      "Ajman Emirate: temperature data loggers for Ajman city, Al Jurf Industrial Area and Ajman Free Zone storage. Get Solution for Ajman Emirate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/umm-al-quwain-emirate": {
    metaDescription:
      "Umm Al Quwain Emirate: temperature data loggers for fish ice stores, shops, clinics and UAQ Free Trade Zone storage. Get Solution: Umm Al Quwain Emirate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/ras-al-khaimah-emirate": {
    metaDescription:
      "Ras Al Khaimah Emirate: temperature data loggers for RAKEZ, Al Ghail Industrial Area and Al Jazirah Al Hamra storage. Get Solution: Ras Al Khaimah Emirate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/fujairah-emirate": {
    metaDescription:
      "Fujairah Emirate, UAE: temperature data loggers for Dibba Al Fujairah, the Fujairah Free Zone and Port of Fujairah storage. Get Solution: Fujairah Emirate.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "uae/abu-dhabi-emirate": {
    metaDescription:
      "Abu Dhabi Emirate: temperature data loggers for Mussafah, ICAD, KIZAD, Khalifa Port and Ghantoot warehouse and cold-room storage. Get Solution: Abu Dhabi.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "yemen/aden-governorate": {
    metaDescription:
      "Aden Governorate: temperature data loggers for the port city's clinics, food stores and harbour warehouses, reviewed case by case. Get Solution for Aden.",
    recommended: ["nakshatra", "setu", "rajmudra"],
  },
  "saudi-arabia/riyadh-region": {
    metaDescription:
      "Riyadh Region: temperature data loggers for the capital, oasis farms and industrial cities, with remote set-up from India. Get Solution for Riyadh Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/makkah-region": {
    metaDescription:
      "Makkah Region: temperature data loggers for Red Sea port logistics, hospitals, hotel kitchens and food stores. Get Solution to begin in Makkah Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/eastern-province": {
    metaDescription:
      "Eastern Province: temperature data loggers for Gulf-coast ports, industrial cities, food depots and hospitals. Get Solution for Eastern Province.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/madinah-region": {
    metaDescription:
      "Madinah Region: temperature data loggers for hotel, hospital and food stores inland and port plants at Yanbu. Use Get Solution for Madinah Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/asir-region": {
    metaDescription:
      "Asir Region: temperature data loggers for Abha and Khamis Mushait hospitals, food depots and hotel kitchens in cool air. Get Solution for Asir Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/qassim-region": {
    metaDescription:
      "Qassim Region: temperature data loggers for date stores, farm cold rooms, hospitals and food depots on the central plain. Get Solution for Qassim Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/jazan-region": {
    metaDescription:
      "Jazan Region: temperature data loggers for fruit and coffee stores, fish depots, hospitals and port stores. Get Solution for Jazan Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/tabuk-region": {
    metaDescription:
      "Tabuk Region: temperature data loggers for farm and food depots, hospitals and coastal port stores. Get Solution and plan your Tabuk Region sites.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/hail-region": {
    metaDescription:
      "Hail Region: temperature data loggers for farm cold rooms, date and wheat stores, hospitals and food depots. Get Solution for Hail Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/najran-region": {
    metaDescription:
      "Najran Region: temperature data loggers for date and fruit stores, hospitals, hotel kitchens and food depots. Get Solution for Najran Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/al-baha-region": {
    metaDescription:
      "Al Baha Region: temperature data loggers for highland produce, honey and food depots, hospitals and hotel kitchens. Get Solution: Al Baha Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/al-jawf-region": {
    metaDescription:
      "Al Jawf Region, Saudi Arabia: temperature data loggers for olive, date and farm stores, hospitals and food depots. Get Solution for Al Jawf Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  "saudi-arabia/northern-borders-region": {
    metaDescription:
      "Northern Borders Region: temperature data loggers for food and medicine depots, hospitals and farm stores. Get Solution for Northern Borders Region.",
    recommended: ["nakshatra", "virat", "rajmudra"],
  },
  uae: {
    metaDescription:
      "UAE: WiFi temperature data loggers for Dubai warehouses, food importers and hotel kitchens, set up remotely. Get Solution: request a plan for UAE.",
    recommended: ["setu", "nakshatra", "veer"],
    inName: "the UAE",
  },
  qatar: {
    metaDescription:
      "Qatar: WiFi temperature data loggers for Doha warehouses, cold stores, hotels and clinics, supplied from India. Get Solution for Qatar.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  oman: {
    metaDescription:
      "Oman: WiFi temperature data loggers for Muscat, Sohar and Salalah pharmacies, hospitals and food distributors. Use Get Solution for Oman.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  kuwait: {
    metaDescription:
      "Kuwait: WiFi temperature data loggers for warehouses, cold stores, hospitals and kitchens, supplied from India. Get Solution for Kuwait.",
    recommended: ["setu", "nakshatra", "dhruva"],
  },
  bahrain: {
    metaDescription:
      "Bahrain: WiFi temperature data loggers for warehouses, cold stores, hospitals and hotels, supplied from India. Get Solution to start in Bahrain.",
    recommended: ["setu", "nakshatra", "veer"],
  },
  yemen: {
    metaDescription:
      "Yemen: temperature data loggers arranged case by case, built to keep recording through power and network outages. Get Solution to cover Yemen.",
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
