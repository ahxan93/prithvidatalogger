// Madhya Pradesh (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import indoreCity from "./indore.ts";
import bhopalCity from "./bhopal.ts";
import jabalpurCity from "./jabalpur.ts";
import gwaliorCity from "./gwalior.ts";
import pithampurCity from "./pithampur.ts";
import ujjainCity from "./ujjain.ts";
import dewasCity from "./dewas.ts";

const madhyaPradeshState: LegacyLocationNode = {
  ...state,
  children: [
    indoreCity,
    bhopalCity,
    jabalpurCity,
    gwaliorCity,
    pithampurCity,
    ujjainCity,
    dewasCity,
  ],
};

export default madhyaPradeshState;
