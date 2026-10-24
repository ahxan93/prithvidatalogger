// Riyadh Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import riyadhCity from "./riyadh.ts";
import alKharjCity from "./al-kharj.ts";
import diriyahCity from "./diriyah.ts";
import alMajmaahCity from "./al-majmaah.ts";

const riyadhRegionState: LegacyLocationNode = {
  ...state,
  children: [
    riyadhCity,
    alKharjCity,
    diriyahCity,
    alMajmaahCity,
  ],
};

export default riyadhRegionState;
