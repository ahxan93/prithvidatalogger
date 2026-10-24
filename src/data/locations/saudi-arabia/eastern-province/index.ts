// Eastern Province (Saudi Arabia): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import dammamCity from "./dammam.ts";
import alKhobarCity from "./al-khobar.ts";
import jubailCity from "./jubail.ts";
import alAhsaCity from "./al-ahsa.ts";
import dhahranCity from "./dhahran.ts";
import qatifCity from "./qatif.ts";
import rasAlKhairCity from "./ras-al-khair.ts";

const easternProvinceState: LegacyLocationNode = {
  ...state,
  children: [
    dammamCity,
    alKhobarCity,
    jubailCity,
    alAhsaCity,
    dhahranCity,
    qatifCity,
    rasAlKhairCity,
  ],
};

export default easternProvinceState;
