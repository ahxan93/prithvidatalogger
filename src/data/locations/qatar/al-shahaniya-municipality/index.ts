// Al Shahaniya Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import alShahaniyaCity from "./al-shahaniya.ts";
import dukhanCity from "./dukhan.ts";

const alShahaniyaMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    alShahaniyaCity,
    dukhanCity,
  ],
};

export default alShahaniyaMunicipalityState;
