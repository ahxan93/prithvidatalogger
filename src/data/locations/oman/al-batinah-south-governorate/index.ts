// Al Batinah South Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import barkaCity from "./barka.ts";
import rustaqCity from "./rustaq.ts";
import nakhalCity from "./nakhal.ts";

const alBatinahSouthGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    barkaCity,
    rustaqCity,
    nakhalCity,
  ],
};

export default alBatinahSouthGovernorateState;
