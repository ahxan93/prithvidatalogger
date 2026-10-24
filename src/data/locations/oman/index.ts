// Oman: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import muscatGovernorateState from "./muscat-governorate/index.ts";
import alBatinahNorthGovernorateState from "./al-batinah-north-governorate/index.ts";
import alBatinahSouthGovernorateState from "./al-batinah-south-governorate/index.ts";
import adDakhiliyahGovernorateState from "./ad-dakhiliyah-governorate/index.ts";
import adDhahirahGovernorateState from "./ad-dhahirah-governorate/index.ts";
import alBuraimiGovernorateState from "./al-buraimi-governorate/index.ts";
import dhofarGovernorateState from "./dhofar-governorate/index.ts";
import alWustaGovernorateState from "./al-wusta-governorate/index.ts";
import ashSharqiyahSouthGovernorateState from "./ash-sharqiyah-south-governorate/index.ts";
import ashSharqiyahNorthGovernorateState from "./ash-sharqiyah-north-governorate/index.ts";
import musandamGovernorateState from "./musandam-governorate/index.ts";

const omanCountry: LegacyLocationNode = {
  ...country,
  children: [
    muscatGovernorateState,
    alBatinahNorthGovernorateState,
    alBatinahSouthGovernorateState,
    adDakhiliyahGovernorateState,
    adDhahirahGovernorateState,
    alBuraimiGovernorateState,
    dhofarGovernorateState,
    alWustaGovernorateState,
    ashSharqiyahSouthGovernorateState,
    ashSharqiyahNorthGovernorateState,
    musandamGovernorateState,
  ],
};

export default omanCountry;
