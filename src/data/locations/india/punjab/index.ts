// Punjab (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import mohaliCity from "./mohali.ts";
import ludhianaCity from "./ludhiana.ts";
import amritsarCity from "./amritsar.ts";
import jalandharCity from "./jalandhar.ts";
import patialaCity from "./patiala.ts";
import bathindaCity from "./bathinda.ts";
import rajpuraCity from "./rajpura.ts";

const punjabState: LegacyLocationNode = {
  ...state,
  children: [
    mohaliCity,
    ludhianaCity,
    amritsarCity,
    jalandharCity,
    patialaCity,
    bathindaCity,
    rajpuraCity,
  ],
};

export default punjabState;
