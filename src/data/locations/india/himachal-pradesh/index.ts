// Himachal Pradesh (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import baddiCity from "./baddi.ts";
import solanCity from "./solan.ts";
import parwanooCity from "./parwanoo.ts";
import paontaSahibCity from "./paonta-sahib.ts";
import unaCity from "./una.ts";
import shimlaCity from "./shimla.ts";

const himachalPradeshState: LegacyLocationNode = {
  ...state,
  children: [
    baddiCity,
    solanCity,
    parwanooCity,
    paontaSahibCity,
    unaCity,
    shimlaCity,
  ],
};

export default himachalPradeshState;
