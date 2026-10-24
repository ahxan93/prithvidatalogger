// Delhi (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./delhi-state.ts";
import delhiCity from "./delhi-city.ts";

const delhiState: LegacyLocationNode = {
  ...state,
  children: [
    delhiCity,
  ],
};

export default delhiState;
