// Chhattisgarh (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import raipurCity from "./raipur.ts";
import bhilaiCity from "./bhilai.ts";
import bilaspurCity from "./bilaspur.ts";
import korbaCity from "./korba.ts";

const chhattisgarhState: LegacyLocationNode = {
  ...state,
  children: [
    raipurCity,
    bhilaiCity,
    bilaspurCity,
    korbaCity,
  ],
};

export default chhattisgarhState;
