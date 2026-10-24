// Puducherry (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./puducherry-state.ts";
import puducherryCity from "./puducherry-city.ts";
import karaikalCity from "./karaikal.ts";

const puducherryState: LegacyLocationNode = {
  ...state,
  children: [
    puducherryCity,
    karaikalCity,
  ],
};

export default puducherryState;
