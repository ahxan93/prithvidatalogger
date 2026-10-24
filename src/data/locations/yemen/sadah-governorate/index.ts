// Sa'dah Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import sadahCity from "./sadah.ts";

const sadahGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    sadahCity,
  ],
};

export default sadahGovernorateState;
