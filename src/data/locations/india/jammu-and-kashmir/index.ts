// Jammu and Kashmir (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import jammuCity from "./jammu.ts";
import srinagarCity from "./srinagar.ts";
import sambaCity from "./samba.ts";
import kathuaCity from "./kathua.ts";

const jammuAndKashmirState: LegacyLocationNode = {
  ...state,
  children: [
    jammuCity,
    srinagarCity,
    sambaCity,
    kathuaCity,
  ],
};

export default jammuAndKashmirState;
