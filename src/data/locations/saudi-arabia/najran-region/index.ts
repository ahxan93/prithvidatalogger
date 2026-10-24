// Najran Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import najranCity from "./najran.ts";

const najranRegionState: LegacyLocationNode = {
  ...state,
  children: [
    najranCity,
  ],
};

export default najranRegionState;
