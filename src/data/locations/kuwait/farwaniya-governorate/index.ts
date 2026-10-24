// Farwaniya Governorate (Kuwait): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import farwaniyaCity from "./farwaniya.ts";
import khaitanCity from "./khaitan.ts";
import jleebAlShuyoukhCity from "./jleeb-al-shuyoukh.ts";

const farwaniyaGovernorateState: LegacyLocationNode = {
  ...state,
  children: [
    farwaniyaCity,
    khaitanCity,
    jleebAlShuyoukhCity,
  ],
};

export default farwaniyaGovernorateState;
