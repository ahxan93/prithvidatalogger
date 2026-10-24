// Makkah Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import jeddahCity from "./jeddah.ts";
import makkahCity from "./makkah.ts";
import taifCity from "./taif.ts";
import rabighCity from "./rabigh.ts";
import kingAbdullahEconomicCityCity from "./king-abdullah-economic-city.ts";

const makkahRegionState: LegacyLocationNode = {
  ...state,
  children: [
    jeddahCity,
    makkahCity,
    taifCity,
    rabighCity,
    kingAbdullahEconomicCityCity,
  ],
};

export default makkahRegionState;
