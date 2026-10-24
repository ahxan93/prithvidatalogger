// Dhamar Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import dhamarCity from "./dhamar.ts";

const dhamarGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    dhamarCity,
  ],
};

export default dhamarGovernorateState;
