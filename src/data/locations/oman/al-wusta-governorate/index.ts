// Al Wusta Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import duqmCity from "./duqm.ts";

const alWustaGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    duqmCity,
  ],
};

export default alWustaGovernorateState;
