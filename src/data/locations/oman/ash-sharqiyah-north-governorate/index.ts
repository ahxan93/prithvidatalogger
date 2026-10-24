// Ash Sharqiyah North Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ibraCity from "./ibra.ts";
import bidiyahCity from "./bidiyah.ts";

const ashSharqiyahNorthGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    ibraCity,
    bidiyahCity,
  ],
};

export default ashSharqiyahNorthGovernorateState;
