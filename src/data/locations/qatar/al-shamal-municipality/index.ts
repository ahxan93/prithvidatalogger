// Al Shamal Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import alShamalCity from "./al-shamal.ts";

const alShamalMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    alShamalCity,
  ],
};

export default alShamalMunicipalityState;
