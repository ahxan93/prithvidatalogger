// Ras Al Khaimah Emirate (United Arab Emirates): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import rasAlKhaimahCity from "./ras-al-khaimah.ts";

const rasAlKhaimahEmirateState: LegacyLocationNode = {
  ...state,
  children: [
    rasAlKhaimahCity,
  ],
};

export default rasAlKhaimahEmirateState;
