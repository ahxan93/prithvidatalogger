// Kuwait: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import alAsimahGovernorateState from "./al-asimah-governorate/index.ts";
import hawalliGovernorateState from "./hawalli-governorate/index.ts";
import farwaniyaGovernorateState from "./farwaniya-governorate/index.ts";
import ahmadiGovernorateState from "./ahmadi-governorate/index.ts";
import jahraGovernorateState from "./jahra-governorate/index.ts";
import mubarakAlKabeerGovernorateState from "./mubarak-al-kabeer-governorate/index.ts";

const kuwaitCountry: LegacyLocationNode = {
  ...country,
  children: [
    alAsimahGovernorateState,
    hawalliGovernorateState,
    farwaniyaGovernorateState,
    ahmadiGovernorateState,
    jahraGovernorateState,
    mubarakAlKabeerGovernorateState,
  ],
};

export default kuwaitCountry;
