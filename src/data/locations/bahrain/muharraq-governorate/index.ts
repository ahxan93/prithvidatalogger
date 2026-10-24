// Muharraq Governorate (Bahrain): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import muharraqCity from "./muharraq.ts";
import hiddCity from "./hidd.ts";
import aradCity from "./arad.ts";
import busaiteenCity from "./busaiteen.ts";
import amwajIslandsCity from "./amwaj-islands.ts";

const muharraqGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    muharraqCity,
    hiddCity,
    aradCity,
    busaiteenCity,
    amwajIslandsCity,
  ],
};

export default muharraqGovernorateState;
