// Assembles every area from its own file. The order below is the order of the sitemap and hub lists.
// A new area file must be imported and added to the list here (next to its city's other areas).

import type { AreaDef } from "./_types.ts";
import andheriArea from "./mumbai/andheri.ts";
import maladArea from "./mumbai/malad.ts";
import goregaonArea from "./mumbai/goregaon.ts";
import vikhroliArea from "./mumbai/vikhroli.ts";
import mulundArea from "./mumbai/mulund.ts";
import powaiArea from "./mumbai/powai.ts";
import ghatkoparArea from "./mumbai/ghatkopar.ts";
import chemburArea from "./mumbai/chembur.ts";
import kurlaArea from "./mumbai/kurla.ts";
import bandraKurlaArea from "./mumbai/bandra-kurla.ts";
import borivaliArea from "./mumbai/borivali.ts";
import kandivaliArea from "./mumbai/kandivali.ts";
import dahisarArea from "./mumbai/dahisar.ts";
import dadarParelArea from "./mumbai/dadar-parel.ts";
import kalamboliArea from "./panvel/kalamboli.ts";
import khargharArea from "./panvel/kharghar.ts";
import rasayaniPatalgangaArea from "./panvel/rasayani-patalganga.ts";
import khopoliArea from "./panvel/khopoli.ts";
import uranJnptArea from "./panvel/uran-jnpt.ts";
import ulweArea from "./panvel/ulwe.ts";
import rohaPenArea from "./panvel/roha-pen.ts";
import vashiArea from "./navi-mumbai/vashi.ts";
import airoliArea from "./navi-mumbai/airoli.ts";
import koparkhairaneArea from "./navi-mumbai/koparkhairane.ts";
import pawaneArea from "./navi-mumbai/pawane.ts";
import ghansoliArea from "./navi-mumbai/ghansoli.ts";
import nerulArea from "./navi-mumbai/nerul.ts";
import belapurArea from "./navi-mumbai/belapur.ts";
import thaneWestArea from "./thane-bhiwandi/thane-west.ts";
import ghodbunderRoadArea from "./thane-bhiwandi/ghodbunder-road.ts";
import kalyanArea from "./thane-bhiwandi/kalyan.ts";
import ulhasnagarArea from "./thane-bhiwandi/ulhasnagar.ts";
import ambernathArea from "./thane-bhiwandi/ambernath.ts";
import badlapurArea from "./thane-bhiwandi/badlapur.ts";
import anjurphataPurnaArea from "./thane-bhiwandi/anjurphata-purna.ts";
import mumbraDivaArea from "./thane-bhiwandi/mumbra-diva.ts";
import walivArea from "./vasai-palghar/waliv.ts";
import virarArea from "./vasai-palghar/virar.ts";
import nalasoparaArea from "./vasai-palghar/nalasopara.ts";
import sativaliArea from "./vasai-palghar/sativali.ts";
import palgharArea from "./vasai-palghar/palghar.ts";
import dahanuArea from "./vasai-palghar/dahanu.ts";
import worliArea from "./mumbai/worli.ts";
import wadalaSewriArea from "./mumbai/wadala-sewri.ts";
import bycullaArea from "./mumbai/byculla.ts";
import santacruzVileParleArea from "./mumbai/santacruz-vile-parle.ts";
import turbheArea from "./navi-mumbai/turbhe.ts";
import rabaleArea from "./navi-mumbai/rabale.ts";
import mahapeArea from "./navi-mumbai/mahape.ts";
import talojaArea from "./navi-mumbai/taloja.ts";
import wagleEstateArea from "./thane-bhiwandi/wagle-estate.ts";
import dombivliMidcArea from "./thane-bhiwandi/dombivli-midc.ts";
import bhiwandiArea from "./thane-bhiwandi/bhiwandi.ts";
import vasaiArea from "./vasai-palghar/vasai.ts";
import tarapurArea from "./vasai-palghar/tarapur.ts";
import boisarArea from "./vasai-palghar/boisar.ts";
import pimpriChinchwadArea from "./pune/pimpri-chinchwad.ts";
import chakanArea from "./pune/chakan.ts";
import ranjangaonArea from "./pune/ranjangaon.ts";
import hinjewadiArea from "./pune/hinjewadi.ts";
import talegaonArea from "./pune/talegaon.ts";
import narodaArea from "./ahmedabad/naroda.ts";
import vatvaArea from "./ahmedabad/vatva.ts";
import changodarArea from "./ahmedabad/changodar.ts";
import sanandArea from "./ahmedabad/sanand.ts";
import vapiGidcArea from "./vapi/vapi-gidc.ts";
import ankleshwarGidcArea from "./ankleshwar/ankleshwar-gidc.ts";
import dahejArea from "./ankleshwar/dahej.ts";
import sachinArea from "./surat/sachin.ts";
import okhlaArea from "./delhi/okhla.ts";
import bawanaArea from "./delhi/bawana.ts";
import narelaArea from "./delhi/narela.ts";
import mayapuriArea from "./delhi/mayapuri.ts";
import wazirpurArea from "./delhi/wazirpur.ts";
import mundkaArea from "./delhi/mundka.ts";
import noidaArea from "./noida/noida.ts";
import greaterNoidaArea from "./noida/greater-noida.ts";
import sahibabadArea from "./noida/sahibabad.ts";
import manesarArea from "./manesar/manesar.ts";
import jeedimetlaArea from "./hyderabad/jeedimetla.ts";
import patancheruArea from "./hyderabad/patancheru.ts";
import genomeValleyArea from "./hyderabad/genome-valley.ts";
import peenyaArea from "./bengaluru/peenya.ts";
import electronicCityArea from "./bengaluru/electronic-city.ts";
import whitefieldArea from "./bengaluru/whitefield.ts";
import ambatturArea from "./chennai/ambattur.ts";
import sriperumbudurArea from "./chennai/sriperumbudur.ts";
import oragadamArea from "./chennai/oragadam.ts";
import panjimArea from "./goa/panjim.ts";
import vernaArea from "./goa/verna.ts";
import pondaArea from "./goa/ponda.ts";
import margaoArea from "./goa/margao.ts";
import riyadhDryPortArea from "./riyadh/riyadh-dry-port.ts";
import riyadh1stIndustrialCityArea from "./riyadh/riyadh-1st-industrial-city.ts";
import jeddahIslamicPortArea from "./jeddah/jeddah-islamic-port.ts";
import jeddah1stIndustrialCityArea from "./jeddah/jeddah-1st-industrial-city.ts";
import kingAbdulazizPortDammamArea from "./dammam/king-abdulaziz-port-dammam.ts";
import dammam1stIndustrialCityArea from "./dammam/dammam-1st-industrial-city.ts";
import jubailIndustrialCity1Area from "./jubail/jubail-industrial-city-1.ts";
import jubailIndustrialCity2Area from "./jubail/jubail-industrial-city-2.ts";
import yanbuIndustrialCityArea from "./yanbu/yanbu-industrial-city.ts";
import jazanEconomicCityArea from "./jazan/jazan-economic-city.ts";
import portOfAdenArea from "./aden/port-of-aden.ts";
import adenFreeZoneArea from "./aden/aden-free-zone.ts";
import sheikhOthmanIndustrialAreaArea from "./aden/sheikh-othman-industrial-area.ts";
import littleAdenArea from "./aden/little-aden.ts";
import portOfMukallaArea from "./mukalla/port-of-mukalla.ts";
import sanaaIndustrialAreaArea from "./sanaa/sanaa-industrial-area.ts";
import sanaaInternationalAirportArea from "./sanaa/sanaa-international-airport.ts";
import portOfHodeidahArea from "./hodeidah/port-of-hodeidah.ts";
import portOfSalifArea from "./hodeidah/port-of-salif.ts";
import portOfMochaArea from "./mocha/port-of-mocha.ts";
import mussafahArea from "./abu-dhabi/mussafah.ts";
import icadArea from "./abu-dhabi/icad.ts";
import kizadArea from "./abu-dhabi/kizad.ts";
import khalifaPortArea from "./abu-dhabi/khalifa-port.ts";
import ghantootArea from "./abu-dhabi/ghantoot.ts";
import alAinIndustrialAreaArea from "./al-ain/al-ain-industrial-area.ts";
import ruwaisIndustrialComplexArea from "./ruwais/ruwais-industrial-complex.ts";
import jebelAliArea from "./dubai/jebel-ali.ts";
import dubaiInvestmentsParkArea from "./dubai/dubai-investments-park.ts";
import alQuozIndustrialAreaArea from "./dubai/al-quoz-industrial-area.ts";
import rasAlKhorIndustrialAreaArea from "./dubai/ras-al-khor-industrial-area.ts";
import alQusaisIndustrialAreaArea from "./dubai/al-qusais-industrial-area.ts";
import alAweerArea from "./dubai/al-aweer.ts";
import dubaiSiliconOasisArea from "./dubai/dubai-silicon-oasis.ts";
import dubaiIndustrialCityArea from "./dubai/dubai-industrial-city.ts";
import dubaiSouthArea from "./dubai/dubai-south.ts";
import dubaiLogisticsCityArea from "./dubai/dubai-logistics-city.ts";
import dubaiAirportFreezoneArea from "./dubai/dubai-airport-freezone.ts";
import dubaiHealthcareCityArea from "./dubai/dubai-healthcare-city.ts";
import sajaaIndustrialAreaArea from "./sharjah/sajaa-industrial-area.ts";
import saifZoneArea from "./sharjah/saif-zone.ts";
import hamriyahFreeZoneArea from "./sharjah/hamriyah-free-zone.ts";
import muwailehArea from "./sharjah/muwaileh.ts";
import alJurfIndustrialAreaArea from "./ajman/al-jurf-industrial-area.ts";
import ajmanFreeZoneArea from "./ajman/ajman-free-zone.ts";
import uaqFreeTradeZoneArea from "./umm-al-quwain/uaq-free-trade-zone.ts";
import rakezArea from "./ras-al-khaimah/rakez.ts";
import alGhailIndustrialAreaArea from "./ras-al-khaimah/al-ghail-industrial-area.ts";
import alJazirahAlHamraArea from "./ras-al-khaimah/al-jazirah-al-hamra.ts";
import fujairahFreeZoneArea from "./fujairah/fujairah-free-zone.ts";
import portOfFujairahArea from "./fujairah/port-of-fujairah.ts";
import westBayArea from "./doha/west-bay.ts";
import alSaddArea from "./doha/al-sadd.ts";
import msheirebArea from "./doha/msheireb.ts";
import thePearlQatarArea from "./doha/the-pearl-qatar.ts";
import hamadInternationalAirportArea from "./doha/hamad-international-airport.ts";
import rasBufontasFreeZoneArea from "./doha/ras-bufontas-free-zone.ts";
import alGharafaArea from "./al-rayyan/al-gharafa.ts";
import birkatAlAwamerArea from "./al-rayyan/birkat-al-awamer.ts";
import alSailiyaArea from "./al-rayyan/al-sailiya.ts";
import mesaieedIndustrialCityArea from "./mesaieed/mesaieed-industrial-city.ts";
import rasLaffanIndustrialCityArea from "./ras-laffan/ras-laffan-industrial-city.ts";
import dukhanIndustrialAreaArea from "./dukhan/dukhan-industrial-area.ts";
import alKhuwairArea from "./muscat/al-khuwair.ts";
import alGhubraArea from "./muscat/al-ghubra.ts";
import ghalaIndustrialAreaArea from "./muscat/ghala-industrial-area.ts";
import sultanQaboosPortMuttrahArea from "./muttrah/sultan-qaboos-port-muttrah.ts";
import muscatInternationalAirportArea from "./seeb/muscat-international-airport.ts";
import soharIndustrialEstateArea from "./sohar/sohar-industrial-estate.ts";
import soharPortAndFreezoneArea from "./sohar/sohar-port-and-freezone.ts";
import barkaIndustrialAreaArea from "./barka/barka-industrial-area.ts";
import nizwaIndustrialEstateArea from "./nizwa/nizwa-industrial-estate.ts";
import ibriIndustrialAreaArea from "./ibri/ibri-industrial-area.ts";
import buraimiIndustrialAreaArea from "./buraimi/buraimi-industrial-area.ts";
import salalahFreeZoneArea from "./salalah/salalah-free-zone.ts";
import raysutIndustrialEstateArea from "./salalah/raysut-industrial-estate.ts";
import portOfSalalahArea from "./salalah/port-of-salalah.ts";
import duqmSpecialEconomicZoneArea from "./duqm/duqm-special-economic-zone.ts";
import portOfDuqmArea from "./duqm/port-of-duqm.ts";
import surIndustrialEstateArea from "./sur/sur-industrial-estate.ts";
import shuwaikhIndustrialAreaArea from "./kuwait-city/shuwaikh-industrial-area.ts";
import shuwaikhPortArea from "./kuwait-city/shuwaikh-port.ts";
import ardiyaIndustrialAreaArea from "./farwaniya/ardiya-industrial-area.ts";
import alRaiIndustrialAreaArea from "./farwaniya/al-rai-industrial-area.ts";
import kuwaitInternationalAirportArea from "./farwaniya/kuwait-international-airport.ts";
import jleebAlShuyoukhWarehousesArea from "./jleeb-al-shuyoukh/jleeb-al-shuyoukh-warehouses.ts";
import shuaibaIndustrialAreaArea from "./ahmadi/shuaiba-industrial-area.ts";
import shuaibaPortArea from "./ahmadi/shuaiba-port.ts";
import minaAlAhmadiArea from "./ahmadi/mina-al-ahmadi.ts";
import sulaibiyaIndustrialAreaArea from "./sulaibiya/sulaibiya-industrial-area.ts";
import amgharaIndustrialAreaArea from "./jahra/amghara-industrial-area.ts";
import bahrainFinancialHarbourArea from "./manama/bahrain-financial-harbour.ts";
import seefDistrictArea from "./manama/seef-district.ts";
import minaSalmanPortArea from "./manama/mina-salman-port.ts";
import bahrainInternationalAirportArea from "./muharraq/bahrain-international-airport.ts";
import khalifaBinSalmanPortArea from "./hidd/khalifa-bin-salman-port.ts";
import bahrainLogisticsZoneArea from "./hidd/bahrain-logistics-zone.ts";
import hamadTownIndustrialAreaArea from "./hamad-town/hamad-town-industrial-area.ts";

export const areas: AreaDef[] = [
  // Mumbai (batch 1)
  andheriArea,
  maladArea,
  goregaonArea,
  vikhroliArea,
  mulundArea,
  powaiArea,
  // Mumbai (batch 2: eastern and harbour suburbs)
  ghatkoparArea,
  chemburArea,
  kurlaArea,
  bandraKurlaArea,
  // Mumbai (batch 3: western suburbs and central Mumbai)
  borivaliArea,
  kandivaliArea,
  dahisarArea,
  dadarParelArea,
  // Panvel region (batch A: Kalamboli, Kharghar, Rasayani-Patalganga, Khopoli)
  kalamboliArea,
  khargharArea,
  rasayaniPatalgangaArea,
  khopoliArea,
  // Panvel region (batch B: Uran-JNPT, Ulwe, Roha-Pen)
  uranJnptArea,
  ulweArea,
  rohaPenArea,
  // Navi Mumbai (batch C: Vashi, Airoli, Koparkhairane, Pawane)
  vashiArea,
  airoliArea,
  koparkhairaneArea,
  pawaneArea,
  // Navi Mumbai (batch D: Ghansoli, Nerul, Belapur)
  ghansoliArea,
  nerulArea,
  belapurArea,
  // Thane and Bhiwandi (batch E: Thane West, Ghodbunder Road, Kalyan)
  thaneWestArea,
  ghodbunderRoadArea,
  kalyanArea,
  // Thane and Bhiwandi (batch F: Ulhasnagar, Ambernath, Badlapur, Anjurphata-Purna)
  ulhasnagarArea,
  ambernathArea,
  badlapurArea,
  anjurphataPurnaArea,
  // Thane and Bhiwandi (batch G: Mumbra-Diva)
  mumbraDivaArea,
  // Vasai-Palghar (batch H: Waliv, Virar, Nalasopara, Sativali)
  walivArea,
  virarArea,
  nalasoparaArea,
  sativaliArea,
  // Vasai-Palghar (batch I: Palghar, Dahanu)
  palgharArea,
  dahanuArea,
  // Mumbai (batch 4: Worli, Wadala-Sewri, Byculla, Santacruz-Vile Parle)
  worliArea,
  wadalaSewriArea,
  bycullaArea,
  santacruzVileParleArea,
  // Navi Mumbai (batch 1)
  turbheArea,
  rabaleArea,
  mahapeArea,
  talojaArea,
  // Thane & Bhiwandi (batch 1)
  wagleEstateArea,
  dombivliMidcArea,
  bhiwandiArea,
  // Vasai-Palghar (data entries)
  vasaiArea,
  tarapurArea,
  boisarArea,
  // Pune (data entries)
  pimpriChinchwadArea,
  chakanArea,
  ranjangaonArea,
  hinjewadiArea,
  talegaonArea,
  // Ahmedabad (data entries)
  narodaArea,
  vatvaArea,
  changodarArea,
  sanandArea,
  // South Gujarat (data entries)
  vapiGidcArea,
  ankleshwarGidcArea,
  dahejArea,
  sachinArea,
  // Delhi NCR (data entries)
  okhlaArea,
  bawanaArea,
  narelaArea,
  mayapuriArea,
  wazirpurArea,
  mundkaArea,
  noidaArea,
  greaterNoidaArea,
  sahibabadArea,
  manesarArea,
  // Hyderabad (data entries)
  jeedimetlaArea,
  patancheruArea,
  genomeValleyArea,
  // Bengaluru (data entries)
  peenyaArea,
  electronicCityArea,
  whitefieldArea,
  // Chennai (data entries)
  ambatturArea,
  sriperumbudurArea,
  oragadamArea,
  // Goa (batch 1: parent is the Goa city page)
  panjimArea,
  vernaArea,
  pondaArea,
  margaoArea,
  // Saudi Arabia (batch 1: Riyadh)
  riyadhDryPortArea,
  riyadh1stIndustrialCityArea,
  // Saudi Arabia (batch 2: Jeddah)
  jeddahIslamicPortArea,
  jeddah1stIndustrialCityArea,
  // Saudi Arabia (batch 3: Eastern Province)
  kingAbdulazizPortDammamArea,
  dammam1stIndustrialCityArea,
  jubailIndustrialCity1Area,
  jubailIndustrialCity2Area,
  // Saudi Arabia (batch 4: Yanbu)
  yanbuIndustrialCityArea,
  // Saudi Arabia (batch 5: Jazan)
  jazanEconomicCityArea,
  // Yemen (batch 1: Aden)
  portOfAdenArea,
  adenFreeZoneArea,
  sheikhOthmanIndustrialAreaArea,
  littleAdenArea,
  // Yemen (batch 2: Mukalla)
  portOfMukallaArea,
  // Yemen (batch 3: Sana'a)
  sanaaIndustrialAreaArea,
  sanaaInternationalAirportArea,
  // Yemen (batch 4: Taiz, Hodeidah)
  portOfHodeidahArea,
  portOfSalifArea,
  portOfMochaArea,
  // UAE (batch 1: Abu Dhabi)
  mussafahArea,
  icadArea,
  kizadArea,
  khalifaPortArea,
  ghantootArea,
  // UAE (batch 2: Al Ain, Ruwais)
  alAinIndustrialAreaArea,
  ruwaisIndustrialComplexArea,
  // UAE (batch 3: Dubai)
  jebelAliArea,
  dubaiInvestmentsParkArea,
  alQuozIndustrialAreaArea,
  rasAlKhorIndustrialAreaArea,
  alQusaisIndustrialAreaArea,
  alAweerArea,
  // UAE (batch 4: Dubai)
  dubaiSiliconOasisArea,
  dubaiIndustrialCityArea,
  dubaiSouthArea,
  dubaiLogisticsCityArea,
  dubaiAirportFreezoneArea,
  dubaiHealthcareCityArea,
  // UAE (batch 5: Sharjah)
  sajaaIndustrialAreaArea,
  saifZoneArea,
  hamriyahFreeZoneArea,
  muwailehArea,
  // UAE (batch 6: Ajman, Umm Al Quwain, Ras Al Khaimah)
  alJurfIndustrialAreaArea,
  ajmanFreeZoneArea,
  uaqFreeTradeZoneArea,
  rakezArea,
  alGhailIndustrialAreaArea,
  alJazirahAlHamraArea,
  // UAE (batch 7: Fujairah)
  fujairahFreeZoneArea,
  portOfFujairahArea,
  // Qatar (batch 1: Doha)
  westBayArea,
  alSaddArea,
  msheirebArea,
  thePearlQatarArea,
  // Qatar (batch 2: Doha airport area, Al Rayyan)
  hamadInternationalAirportArea,
  rasBufontasFreeZoneArea,
  alGharafaArea,
  birkatAlAwamerArea,
  alSailiyaArea,
  // Qatar (batch 3: Al Wakrah, Mesaieed)
  mesaieedIndustrialCityArea,
  // Qatar (batch 4: Al Khor, Ras Laffan)
  rasLaffanIndustrialCityArea,
  // Qatar (batch 6: Dukhan)
  dukhanIndustrialAreaArea,
  // Oman (batch 1: Muscat)
  alKhuwairArea,
  alGhubraArea,
  ghalaIndustrialAreaArea,
  sultanQaboosPortMuttrahArea,
  // Oman (batch 2: Seeb)
  muscatInternationalAirportArea,
  // Oman (batch 3: Sohar)
  soharIndustrialEstateArea,
  soharPortAndFreezoneArea,
  // Oman (batch 4: Barka)
  barkaIndustrialAreaArea,
  // Oman (batch 5: Nizwa, Ibri, Buraimi)
  nizwaIndustrialEstateArea,
  ibriIndustrialAreaArea,
  buraimiIndustrialAreaArea,
  // Oman (batch 6: Salalah, Duqm)
  salalahFreeZoneArea,
  raysutIndustrialEstateArea,
  portOfSalalahArea,
  duqmSpecialEconomicZoneArea,
  portOfDuqmArea,
  // Oman (batch 7: Sur)
  surIndustrialEstateArea,
  // Kuwait (batch 1: Kuwait City)
  shuwaikhIndustrialAreaArea,
  shuwaikhPortArea,
  // Kuwait (batch 3: Farwaniya)
  ardiyaIndustrialAreaArea,
  alRaiIndustrialAreaArea,
  kuwaitInternationalAirportArea,
  jleebAlShuyoukhWarehousesArea,
  // Kuwait (batch 5: Ahmadi areas)
  shuaibaIndustrialAreaArea,
  shuaibaPortArea,
  minaAlAhmadiArea,
  // Kuwait (batch 6: Jahra)
  sulaibiyaIndustrialAreaArea,
  amgharaIndustrialAreaArea,
  // Bahrain (batch 1: Manama)
  bahrainFinancialHarbourArea,
  seefDistrictArea,
  minaSalmanPortArea,
  // Bahrain (batch 3: Muharraq Governorate)
  bahrainInternationalAirportArea,
  khalifaBinSalmanPortArea,
  bahrainLogisticsZoneArea,
  // Bahrain (batch 5: Northern Governorate)
  hamadTownIndustrialAreaArea,
];
