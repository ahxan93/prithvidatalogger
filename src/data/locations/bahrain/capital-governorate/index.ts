// Capital Governorate (Bahrain): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import manamaCity from "./manama.ts";
import juffairCity from "./juffair.ts";
import adliyaCity from "./adliya.ts";

const capitalGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    manamaCity,
    juffairCity,
    adliyaCity,
  ],
};

export default capitalGovernorateState;
