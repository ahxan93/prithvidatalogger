// United Arab Emirates: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import dubaiEmirateState from "./dubai-emirate/index.ts";
import abuDhabiEmirateState from "./abu-dhabi-emirate/index.ts";
import sharjahEmirateState from "./sharjah-emirate/index.ts";
import ajmanEmirateState from "./ajman-emirate/index.ts";
import ummAlQuwainEmirateState from "./umm-al-quwain-emirate/index.ts";
import rasAlKhaimahEmirateState from "./ras-al-khaimah-emirate/index.ts";
import fujairahEmirateState from "./fujairah-emirate/index.ts";

const uaeCountry: LegacyLocationNode = {
  ...country,
  children: [
    dubaiEmirateState,
    abuDhabiEmirateState,
    sharjahEmirateState,
    ajmanEmirateState,
    ummAlQuwainEmirateState,
    rasAlKhaimahEmirateState,
    fujairahEmirateState,
  ],
};

export default uaeCountry;
