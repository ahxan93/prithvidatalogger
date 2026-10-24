// Assam (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import guwahatiCity from "./guwahati.ts";
import dibrugarhCity from "./dibrugarh.ts";
import silcharCity from "./silchar.ts";
import tezpurCity from "./tezpur.ts";

const assamState: LegacyLocationNode = {
  ...state,
  children: [
    guwahatiCity,
    dibrugarhCity,
    silcharCity,
    tezpurCity,
  ],
};

export default assamState;
