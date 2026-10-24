// Hawalli Governorate (Kuwait): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import hawalliCity from "./hawalli.ts";
import salmiyaCity from "./salmiya.ts";

const hawalliGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    hawalliCity,
    salmiyaCity,
  ],
};

export default hawalliGovernorateState;
