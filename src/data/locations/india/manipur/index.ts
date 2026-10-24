// Manipur (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import imphalCity from "./imphal.ts";

const manipurState: LegacyLocationNode = {
  ...state,
  children: [
    imphalCity,
  ],
};

export default manipurState;
