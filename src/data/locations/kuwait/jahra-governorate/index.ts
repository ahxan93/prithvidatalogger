// Jahra Governorate (Kuwait): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import jahraCity from "./jahra.ts";
import sulaibiyaCity from "./sulaibiya.ts";

const jahraGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    jahraCity,
    sulaibiyaCity,
  ],
};

export default jahraGovernorateState;
