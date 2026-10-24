// Al Asimah Governorate (Kuwait): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import kuwaitCityCity from "./kuwait-city.ts";

const alAsimahGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    kuwaitCityCity,
  ],
};

export default alAsimahGovernorateState;
