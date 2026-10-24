// Haryana (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import manesarCity from "./manesar.ts";
import gurugramCity from "./gurugram.ts";
import faridabadCity from "./faridabad.ts";
import panipatCity from "./panipat.ts";
import sonipatCity from "./sonipat.ts";
import rohtakCity from "./rohtak.ts";
import hisarCity from "./hisar.ts";
import ambalaCity from "./ambala.ts";
import karnalCity from "./karnal.ts";
import panchkulaCity from "./panchkula.ts";

const haryanaState: LegacyLocationNode = {
  ...state,
  children: [
    manesarCity,
    gurugramCity,
    faridabadCity,
    panipatCity,
    sonipatCity,
    rohtakCity,
    hisarCity,
    ambalaCity,
    karnalCity,
    panchkulaCity,
  ],
};

export default haryanaState;
