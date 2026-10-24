// Southern Governorate (Bahrain): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import riffaCity from "./riffa.ts";
import isaTownCity from "./isa-town.ts";
import zallaqCity from "./zallaq.ts";

const southernGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    riffaCity,
    isaTownCity,
    zallaqCity,
  ],
};

export default southernGovernorateState;
