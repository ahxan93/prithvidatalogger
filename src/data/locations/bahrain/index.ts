// Bahrain: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import capitalGovernorateState from "./capital-governorate/index.ts";
import muharraqGovernorateState from "./muharraq-governorate/index.ts";
import northernGovernorateState from "./northern-governorate/index.ts";
import southernGovernorateState from "./southern-governorate/index.ts";

const bahrainCountry: LegacyLocationNode = {
  ...country,
  children: [
    capitalGovernorateState,
    muharraqGovernorateState,
    northernGovernorateState,
    southernGovernorateState,
  ],
};

export default bahrainCountry;
