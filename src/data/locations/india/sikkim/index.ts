// Sikkim (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import gangtokCity from "./gangtok.ts";
import rangpoCity from "./rangpo.ts";

const sikkimState: LegacyLocationNode = {
  ...state,
  children: [
    gangtokCity,
    rangpoCity,
  ],
};

export default sikkimState;
