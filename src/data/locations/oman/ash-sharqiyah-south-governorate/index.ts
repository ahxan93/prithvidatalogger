// Ash Sharqiyah South Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import surCity from "./sur.ts";

const ashSharqiyahSouthGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    surCity,
  ],
};

export default ashSharqiyahSouthGovernorateState;
