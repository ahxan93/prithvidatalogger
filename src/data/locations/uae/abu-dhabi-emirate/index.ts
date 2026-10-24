// Abu Dhabi Emirate (United Arab Emirates): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import abuDhabiCity from "./abu-dhabi.ts";
import alAinCity from "./al-ain.ts";
import ruwaisCity from "./ruwais.ts";
import madinatZayedCity from "./madinat-zayed.ts";
import liwaCity from "./liwa.ts";

const abuDhabiEmirateState: LegacyLocationNode = {
  ...state,
  children: [
    abuDhabiCity,
    alAinCity,
    ruwaisCity,
    madinatZayedCity,
    liwaCity,
  ],
};

export default abuDhabiEmirateState;
