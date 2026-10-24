// Odisha (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import bhubaneswarCity from "./bhubaneswar.ts";
import cuttackCity from "./cuttack.ts";
import rourkelaCity from "./rourkela.ts";
import paradipCity from "./paradip.ts";
import jharsugudaCity from "./jharsuguda.ts";

const odishaState: LegacyLocationNode = {
  ...state,
  children: [
    bhubaneswarCity,
    cuttackCity,
    rourkelaCity,
    paradipCity,
    jharsugudaCity,
  ],
};

export default odishaState;
