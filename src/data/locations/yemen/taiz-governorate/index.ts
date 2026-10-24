// Taiz Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import taizCity from "./taiz.ts";
import mochaCity from "./mocha.ts";

const taizGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    taizCity,
    mochaCity,
  ],
};

export default taizGovernorateState;
