// Tamil Nadu (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import chennaiCity from "./chennai.ts";
import coimbatoreCity from "./coimbatore.ts";
import hosurCity from "./hosur.ts";
import maduraiCity from "./madurai.ts";
import tiruchirappalliCity from "./tiruchirappalli.ts";
import salemCity from "./salem.ts";
import tiruppurCity from "./tiruppur.ts";
import erodeCity from "./erode.ts";
import velloreCity from "./vellore.ts";
import tuticorinCity from "./tuticorin.ts";

const tamilNaduState: LegacyLocationNode = {
  ...state,
  children: [
    chennaiCity,
    coimbatoreCity,
    hosurCity,
    maduraiCity,
    tiruchirappalliCity,
    salemCity,
    tiruppurCity,
    erodeCity,
    velloreCity,
    tuticorinCity,
  ],
};

export default tamilNaduState;
