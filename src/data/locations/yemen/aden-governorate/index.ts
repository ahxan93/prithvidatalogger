// Aden Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import adenCity from "./aden.ts";

const adenGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    adenCity,
  ],
};

export default adenGovernorateState;
