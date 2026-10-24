// Uttarakhand (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import haridwarCity from "./haridwar.ts";
import dehradunCity from "./dehradun.ts";
import roorkeeCity from "./roorkee.ts";
import rudrapurPantnagarCity from "./rudrapur-pantnagar.ts";
import kashipurCity from "./kashipur.ts";
import kotdwarCity from "./kotdwar.ts";

const uttarakhandState: LegacyLocationNode = {
  ...state,
  children: [
    haridwarCity,
    dehradunCity,
    roorkeeCity,
    rudrapurPantnagarCity,
    kashipurCity,
    kotdwarCity,
  ],
};

export default uttarakhandState;
