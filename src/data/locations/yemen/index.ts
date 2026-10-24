// Yemen: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import adenGovernorateState from "./aden-governorate/index.ts";
import hadramautGovernorateState from "./hadramaut-governorate/index.ts";
import abyanGovernorateState from "./abyan-governorate/index.ts";
import amanatAlAsimahState from "./amanat-al-asimah/index.ts";
import taizGovernorateState from "./taiz-governorate/index.ts";
import alHudaydahGovernorateState from "./al-hudaydah-governorate/index.ts";
import ibbGovernorateState from "./ibb-governorate/index.ts";
import dhamarGovernorateState from "./dhamar-governorate/index.ts";
import maribGovernorateState from "./marib-governorate/index.ts";
import lahijGovernorateState from "./lahij-governorate/index.ts";
import sadahGovernorateState from "./sadah-governorate/index.ts";

const yemenCountry: LegacyLocationNode = {
  ...country,
  children: [
    adenGovernorateState,
    hadramautGovernorateState,
    abyanGovernorateState,
    amanatAlAsimahState,
    taizGovernorateState,
    alHudaydahGovernorateState,
    ibbGovernorateState,
    dhamarGovernorateState,
    maribGovernorateState,
    lahijGovernorateState,
    sadahGovernorateState,
  ],
};

export default yemenCountry;
