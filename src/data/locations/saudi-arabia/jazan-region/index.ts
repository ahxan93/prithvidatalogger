// Jazan Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import jazanCity from "./jazan.ts";

const jazanRegionState: LegacyLocationNode = {
  ...state,
  children: [
    jazanCity,
  ],
};

export default jazanRegionState;
