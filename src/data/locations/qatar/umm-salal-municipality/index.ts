// Umm Salal Municipality (Qatar): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ummSalalCity from "./umm-salal.ts";

const ummSalalMunicipalityState: LegacyLocationNode = {
  ...state,
  children: [
    ummSalalCity,
  ],
};

export default ummSalalMunicipalityState;
