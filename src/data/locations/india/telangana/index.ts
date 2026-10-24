// Telangana (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import hyderabadCity from "./hyderabad.ts";
import warangalCity from "./warangal.ts";
import karimnagarCity from "./karimnagar.ts";
import nizamabadCity from "./nizamabad.ts";

const telanganaState: LegacyLocationNode = {
  ...state,
  children: [
    hyderabadCity,
    warangalCity,
    karimnagarCity,
    nizamabadCity,
  ],
};

export default telanganaState;
