// Amanat Al Asimah (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import sanaaCity from "./sanaa.ts";

const amanatAlAsimahState: LegacyLocationNode = {
  ...state,
  children: [
    sanaaCity,
  ],
};

export default amanatAlAsimahState;
