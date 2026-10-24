// Marib Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import maribCity from "./marib.ts";

const maribGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    maribCity,
  ],
};

export default maribGovernorateState;
