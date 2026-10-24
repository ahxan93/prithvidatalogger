// Gujarat (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ahmedabadCity from "./ahmedabad.ts";
import vapiCity from "./vapi.ts";
import ankleshwarCity from "./ankleshwar.ts";
import suratCity from "./surat.ts";
import vadodaraCity from "./vadodara.ts";
import rajkotCity from "./rajkot.ts";
import bharuchCity from "./bharuch.ts";
import gandhinagarCity from "./gandhinagar.ts";
import halolPanchmahalCity from "./halol-panchmahal.ts";
import morbiCity from "./morbi.ts";
import jamnagarCity from "./jamnagar.ts";
import mundraCity from "./mundra.ts";
import kandlaCity from "./kandla.ts";

const gujaratState: LegacyLocationNode = {
  ...state,
  children: [
    ahmedabadCity,
    vapiCity,
    ankleshwarCity,
    suratCity,
    vadodaraCity,
    rajkotCity,
    bharuchCity,
    gandhinagarCity,
    halolPanchmahalCity,
    morbiCity,
    jamnagarCity,
    mundraCity,
    kandlaCity,
  ],
};

export default gujaratState;
