// Al Rayyan Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import alRayyanCity from "./al-rayyan.ts";

const alRayyanMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    alRayyanCity,
  ],
};

export default alRayyanMunicipalityState;
