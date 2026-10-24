// Ad Dakhiliyah Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import nizwaCity from "./nizwa.ts";
import bahlaCity from "./bahla.ts";
import izkiCity from "./izki.ts";
import sumailCity from "./sumail.ts";

const adDakhiliyahGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    nizwaCity,
    bahlaCity,
    izkiCity,
    sumailCity,
  ],
};

export default adDakhiliyahGovernorateState;
