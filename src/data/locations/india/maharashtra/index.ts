// Maharashtra (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import mumbaiCity from "./mumbai.ts";
import naviMumbaiCity from "./navi-mumbai.ts";
import thaneBhiwandiCity from "./thane-bhiwandi.ts";
import panvelCity from "./panvel.ts";
import puneCity from "./pune.ts";
import vasaiPalgharCity from "./vasai-palghar.ts";
import nashikCity from "./nashik.ts";
import chhatrapatiSambhajinagarCity from "./chhatrapati-sambhajinagar.ts";
import nagpurCity from "./nagpur.ts";
import kolhapurCity from "./kolhapur.ts";
import sataraCity from "./satara.ts";
import solapurCity from "./solapur.ts";
import ratnagiriLoteCity from "./ratnagiri-lote.ts";

const maharashtraState: LegacyLocationNode = {
  ...state,
  children: [
    mumbaiCity,
    naviMumbaiCity,
    thaneBhiwandiCity,
    panvelCity,
    puneCity,
    vasaiPalgharCity,
    nashikCity,
    chhatrapatiSambhajinagarCity,
    nagpurCity,
    kolhapurCity,
    sataraCity,
    solapurCity,
    ratnagiriLoteCity,
  ],
};

export default maharashtraState;
