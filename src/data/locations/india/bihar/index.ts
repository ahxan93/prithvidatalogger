// Bihar (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import patnaCity from "./patna.ts";
import hajipurCity from "./hajipur.ts";
import muzaffarpurCity from "./muzaffarpur.ts";
import gayaCity from "./gaya.ts";
import bhagalpurCity from "./bhagalpur.ts";

const biharState: LegacyLocationNode = {
  ...state,
  children: [
    patnaCity,
    hajipurCity,
    muzaffarpurCity,
    gayaCity,
    bhagalpurCity,
  ],
};

export default biharState;
