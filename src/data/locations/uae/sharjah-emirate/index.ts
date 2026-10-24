// Sharjah Emirate (United Arab Emirates): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import sharjahCity from "./sharjah.ts";
import khorFakkanCity from "./khor-fakkan.ts";
import kalbaCity from "./kalba.ts";

const sharjahEmirateState: LegacyLocationNode = {
  ...state,
  children: [
    sharjahCity,
    khorFakkanCity,
    kalbaCity,
  ],
};

export default sharjahEmirateState;
