// Muscat Governorate (Oman): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import muscatCity from "./muscat.ts";
import muttrahCity from "./muttrah.ts";
import seebCity from "./seeb.ts";
import bawsharCity from "./bawshar.ts";
import quriyatCity from "./quriyat.ts";

const muscatGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    muscatCity,
    muttrahCity,
    seebCity,
    bawsharCity,
    quriyatCity,
  ],
};

export default muscatGovernorateState;
