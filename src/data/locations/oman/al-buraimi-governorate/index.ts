// Al Buraimi Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import buraimiCity from "./buraimi.ts";

const alBuraimiGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    buraimiCity,
  ],
};

export default alBuraimiGovernorateState;
