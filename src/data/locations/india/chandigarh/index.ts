// Chandigarh (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./chandigarh-state.ts";
import chandigarhCity from "./chandigarh-city.ts";

const chandigarhState: LegacyLocationNode = {
  ...state,
  children: [
    chandigarhCity,
  ],
};

export default chandigarhState;
