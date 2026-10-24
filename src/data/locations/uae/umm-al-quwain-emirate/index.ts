// Umm Al Quwain Emirate (United Arab Emirates): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import ummAlQuwainCity from "./umm-al-quwain.ts";

const ummAlQuwainEmirateState: LegacyLocationNode = {
  ...state,
  children: [
    ummAlQuwainCity,
  ],
};

export default ummAlQuwainEmirateState;
