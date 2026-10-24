// Al Wakrah Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import alWakrahCity from "./al-wakrah.ts";
import mesaieedCity from "./mesaieed.ts";
import alWukairCity from "./al-wukair.ts";

const alWakrahMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    alWakrahCity,
    mesaieedCity,
    alWukairCity,
  ],
};

export default alWakrahMunicipalityState;
