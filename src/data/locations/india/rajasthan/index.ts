// Rajasthan (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import jaipurCity from "./jaipur.ts";
import jodhpurCity from "./jodhpur.ts";
import udaipurCity from "./udaipur.ts";
import kotaCity from "./kota.ts";
import ajmerCity from "./ajmer.ts";
import bhilwaraCity from "./bhilwara.ts";
import bhiwadiCity from "./bhiwadi.ts";
import neemranaCity from "./neemrana.ts";

const rajasthanState: LegacyLocationNode = {
  ...state,
  children: [
    jaipurCity,
    jodhpurCity,
    udaipurCity,
    kotaCity,
    ajmerCity,
    bhilwaraCity,
    bhiwadiCity,
    neemranaCity,
  ],
};

export default rajasthanState;
