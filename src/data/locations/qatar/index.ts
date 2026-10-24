// Qatar: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import dohaMunicipalityState from "./doha-municipality/index.ts";
import alRayyanMunicipalityState from "./al-rayyan-municipality/index.ts";
import alWakrahMunicipalityState from "./al-wakrah-municipality/index.ts";
import alKhorAndAlThakhiraMunicipalityState from "./al-khor-and-al-thakhira-municipality/index.ts";
import alDaayenMunicipalityState from "./al-daayen-municipality/index.ts";
import ummSalalMunicipalityState from "./umm-salal-municipality/index.ts";
import alShamalMunicipalityState from "./al-shamal-municipality/index.ts";
import alShahaniyaMunicipalityState from "./al-shahaniya-municipality/index.ts";

const qatarCountry: LegacyLocationNode = {
  ...country,
  children: [
    dohaMunicipalityState,
    alRayyanMunicipalityState,
    alWakrahMunicipalityState,
    alKhorAndAlThakhiraMunicipalityState,
    alDaayenMunicipalityState,
    ummSalalMunicipalityState,
    alShamalMunicipalityState,
    alShahaniyaMunicipalityState,
  ],
};

export default qatarCountry;
