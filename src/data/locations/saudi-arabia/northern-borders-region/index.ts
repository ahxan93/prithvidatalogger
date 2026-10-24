// Northern Borders Region (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ararCity from "./arar.ts";

const northernBordersRegionState: LegacyLocationNode = {
  ...state,
  children: [
    ararCity,
  ],
};

export default northernBordersRegionState;
