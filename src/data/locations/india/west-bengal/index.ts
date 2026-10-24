// West Bengal (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import kolkataCity from "./kolkata.ts";
import howrahCity from "./howrah.ts";
import siliguriCity from "./siliguri.ts";
import durgapurCity from "./durgapur.ts";
import asansolCity from "./asansol.ts";
import kharagpurCity from "./kharagpur.ts";
import haldiaCity from "./haldia.ts";

const westBengalState: LegacyLocationNode = {
  ...state,
  children: [
    kolkataCity,
    howrahCity,
    siliguriCity,
    durgapurCity,
    asansolCity,
    kharagpurCity,
    haldiaCity,
  ],
};

export default westBengalState;
