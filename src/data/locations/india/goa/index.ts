// Goa (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./goa-state.ts";
import goaCity from "./goa-city.ts";

const goaState: LegacyLocationNode = {
  ...state,
  children: [
    goaCity,
  ],
};

export default goaState;
