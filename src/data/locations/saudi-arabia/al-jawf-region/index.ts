// Al Jawf Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import sakakaCity from "./sakaka.ts";

const alJawfRegionState: LegacyLocationNode = {
  ...state,
  children: [
    sakakaCity,
  ],
};

export default alJawfRegionState;
