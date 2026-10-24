// Al Batinah North Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import soharCity from "./sohar.ts";
import sahamCity from "./saham.ts";
import alSuwaiqCity from "./al-suwaiq.ts";

const alBatinahNorthGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    soharCity,
    sahamCity,
    alSuwaiqCity,
  ],
};

export default alBatinahNorthGovernorateState;
