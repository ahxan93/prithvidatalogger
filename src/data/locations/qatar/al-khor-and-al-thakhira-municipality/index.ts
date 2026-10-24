// Al Khor and Al Thakhira Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import alKhorCity from "./al-khor.ts";
import rasLaffanCity from "./ras-laffan.ts";

const alKhorAndAlThakhiraMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    alKhorCity,
    rasLaffanCity,
  ],
};

export default alKhorAndAlThakhiraMunicipalityState;
