// Al Daayen Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import lusailCity from "./lusail.ts";
import alDaayenCity from "./al-daayen.ts";

const alDaayenMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    lusailCity,
    alDaayenCity,
  ],
};

export default alDaayenMunicipalityState;
