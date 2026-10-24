// Jharkhand (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ranchiCity from "./ranchi.ts";
import jamshedpurCity from "./jamshedpur.ts";
import dhanbadCity from "./dhanbad.ts";
import bokaroCity from "./bokaro.ts";

const jharkhandState: LegacyLocationNode = {
  ...state,
  children: [
    ranchiCity,
    jamshedpurCity,
    dhanbadCity,
    bokaroCity,
  ],
};

export default jharkhandState;
