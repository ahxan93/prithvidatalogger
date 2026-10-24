// Karnataka (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import bengaluruCity from "./bengaluru.ts";
import mysuruCity from "./mysuru.ts";
import hubballiDharwadCity from "./hubballi-dharwad.ts";
import mangaluruCity from "./mangaluru.ts";
import belagaviCity from "./belagavi.ts";
import tumakuruCity from "./tumakuru.ts";

const karnatakaState: LegacyLocationNode = {
  ...state,
  children: [
    bengaluruCity,
    mysuruCity,
    hubballiDharwadCity,
    mangaluruCity,
    belagaviCity,
    tumakuruCity,
  ],
};

export default karnatakaState;
