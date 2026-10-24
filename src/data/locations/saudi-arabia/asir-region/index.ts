// Asir Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import abhaCity from "./abha.ts";
import khamisMushaitCity from "./khamis-mushait.ts";
import bishaCity from "./bisha.ts";

const asirRegionState: LegacyLocationNode = {
  ...state,
  children: [
    abhaCity,
    khamisMushaitCity,
    bishaCity,
  ],
};

export default asirRegionState;
