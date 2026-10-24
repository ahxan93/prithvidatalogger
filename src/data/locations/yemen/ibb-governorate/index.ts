// Ibb Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ibbCity from "./ibb.ts";

const ibbGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    ibbCity,
  ],
};

export default ibbGovernorateState;
