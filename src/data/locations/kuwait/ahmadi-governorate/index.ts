// Ahmadi Governorate (Kuwait): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ahmadiCity from "./ahmadi.ts";
import fahaheelCity from "./fahaheel.ts";
import wafraCity from "./wafra.ts";
import khiranCity from "./khiran.ts";

const ahmadiGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    ahmadiCity,
    fahaheelCity,
    wafraCity,
    khiranCity,
  ],
};

export default ahmadiGovernorateState;
