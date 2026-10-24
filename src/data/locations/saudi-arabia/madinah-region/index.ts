// Madinah Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import madinahCity from "./madinah.ts";
import yanbuCity from "./yanbu.ts";

const madinahRegionState: LegacyLocationNode = {
  ...state,
  children: [
    madinahCity,
    yanbuCity,
  ],
};

export default madinahRegionState;
