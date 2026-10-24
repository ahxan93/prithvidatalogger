// Uttar Pradesh (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import noidaCity from "./noida.ts";
import lucknowCity from "./lucknow.ts";
import ghaziabadCity from "./ghaziabad.ts";
import kanpurCity from "./kanpur.ts";
import agraCity from "./agra.ts";
import varanasiCity from "./varanasi.ts";
import meerutCity from "./meerut.ts";
import prayagrajCity from "./prayagraj.ts";
import bareillyCity from "./bareilly.ts";
import moradabadCity from "./moradabad.ts";

const uttarPradeshState: LegacyLocationNode = {
  ...state,
  children: [
    noidaCity,
    lucknowCity,
    ghaziabadCity,
    kanpurCity,
    agraCity,
    varanasiCity,
    meerutCity,
    prayagrajCity,
    bareillyCity,
    moradabadCity,
  ],
};

export default uttarPradeshState;
