// Ajman Emirate (United Arab Emirates): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ajmanCity from "./ajman.ts";

const ajmanEmirateState: LegacyLocationNode = {
  ...state,
  children: [
    ajmanCity,
  ],
};

export default ajmanEmirateState;
