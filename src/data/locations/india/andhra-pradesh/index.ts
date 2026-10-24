// Andhra Pradesh (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import visakhapatnamCity from "./visakhapatnam.ts";
import vijayawadaCity from "./vijayawada.ts";
import gunturCity from "./guntur.ts";
import tirupatiCity from "./tirupati.ts";
import nelloreCity from "./nellore.ts";
import sriCityCity from "./sri-city.ts";
import kakinadaCity from "./kakinada.ts";

const andhraPradeshState: LegacyLocationNode = {
  ...state,
  children: [
    visakhapatnamCity,
    vijayawadaCity,
    gunturCity,
    tirupatiCity,
    nelloreCity,
    sriCityCity,
    kakinadaCity,
  ],
};

export default andhraPradeshState;
