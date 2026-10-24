// Dhofar Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import salalahCity from "./salalah.ts";

const dhofarGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    salalahCity,
  ],
};

export default dhofarGovernorateState;
