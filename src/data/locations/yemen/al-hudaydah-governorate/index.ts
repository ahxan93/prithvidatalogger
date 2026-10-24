// Al Hudaydah Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import hodeidahCity from "./hodeidah.ts";
import zabidCity from "./zabid.ts";
import bajilCity from "./bajil.ts";

const alHudaydahGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    hodeidahCity,
    zabidCity,
    bajilCity,
  ],
};

export default alHudaydahGovernorateState;
