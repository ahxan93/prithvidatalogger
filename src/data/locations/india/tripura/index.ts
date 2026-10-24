// Tripura (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import agartalaCity from "./agartala.ts";

const tripuraState: LegacyLocationNode = {
  ...state,
  children: [
    agartalaCity,
  ],
};

export default tripuraState;
