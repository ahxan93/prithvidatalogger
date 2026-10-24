// Al Baha Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import alBahaCity from "./al-baha.ts";

const alBahaRegionState: LegacyLocationNode = {
  ...state,
  children: [
    alBahaCity,
  ],
};

export default alBahaRegionState;
