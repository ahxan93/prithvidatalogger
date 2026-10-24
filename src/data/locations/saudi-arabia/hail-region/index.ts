// Hail Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import hailCity from "./hail.ts";

const hailRegionState: LegacyLocationNode = {
  ...state,
  children: [
    hailCity,
  ],
};

export default hailRegionState;
