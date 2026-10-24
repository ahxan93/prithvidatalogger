// Mubarak Al-Kabeer Governorate (Kuwait): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import sabahAlSalemCity from "./sabah-al-salem.ts";
import mubarakAlKabeerCity from "./mubarak-al-kabeer.ts";

const mubarakAlKabeerGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    sabahAlSalemCity,
    mubarakAlKabeerCity,
  ],
};

export default mubarakAlKabeerGovernorateState;
