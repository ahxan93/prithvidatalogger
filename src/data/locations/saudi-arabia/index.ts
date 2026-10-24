// Saudi Arabia: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import riyadhRegionState from "./riyadh-region/index.ts";
import makkahRegionState from "./makkah-region/index.ts";
import easternProvinceState from "./eastern-province/index.ts";
import madinahRegionState from "./madinah-region/index.ts";
import asirRegionState from "./asir-region/index.ts";
import qassimRegionState from "./qassim-region/index.ts";
import jazanRegionState from "./jazan-region/index.ts";
import tabukRegionState from "./tabuk-region/index.ts";
import hailRegionState from "./hail-region/index.ts";
import najranRegionState from "./najran-region/index.ts";
import alBahaRegionState from "./al-baha-region/index.ts";
import alJawfRegionState from "./al-jawf-region/index.ts";
import northernBordersRegionState from "./northern-borders-region/index.ts";

const saudiArabiaCountry: LegacyLocationNode = {
  ...country,
  children: [
    riyadhRegionState,
    makkahRegionState,
    easternProvinceState,
    madinahRegionState,
    asirRegionState,
    qassimRegionState,
    jazanRegionState,
    tabukRegionState,
    hailRegionState,
    najranRegionState,
    alBahaRegionState,
    alJawfRegionState,
    northernBordersRegionState,
  ],
};

export default saudiArabiaCountry;
