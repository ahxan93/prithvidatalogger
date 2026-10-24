// Meghalaya (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import shillongCity from "./shillong.ts";

const meghalayaState: LegacyLocationNode = {
  ...state,
  children: [
    shillongCity,
  ],
};

export default meghalayaState;
