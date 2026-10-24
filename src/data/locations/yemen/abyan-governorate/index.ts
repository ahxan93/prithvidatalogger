// Abyan Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import zinjibarCity from "./zinjibar.ts";

const abyanGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    zinjibarCity,
  ],
};

export default abyanGovernorateState;
