// Hadramaut Governorate (Yemen): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import mukallaCity from "./mukalla.ts";
import seiyunCity from "./seiyun.ts";
import shibamCity from "./shibam.ts";

const hadramautGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    mukallaCity,
    seiyunCity,
    shibamCity,
  ],
};

export default hadramautGovernorateState;
