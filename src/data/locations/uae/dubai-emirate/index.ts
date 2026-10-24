// Dubai Emirate (United Arab Emirates): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import dubaiCity from "./dubai.ts";

const dubaiEmirateState: LegacyLocationNode = {
  ...state,
  children: [
    dubaiCity,
  ],
};

export default dubaiEmirateState;
