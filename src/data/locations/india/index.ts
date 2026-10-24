// India: assembles the country hub and its states / regions. A new state file must be imported and listed here.
import type { LegacyLocationNode } from "../_types.ts";
import country from "./_country.ts";
import maharashtraState from "./maharashtra/index.ts";
import gujaratState from "./gujarat/index.ts";
import delhiState from "./delhi/index.ts";
import uttarPradeshState from "./uttar-pradesh/index.ts";
import haryanaState from "./haryana/index.ts";
import telanganaState from "./telangana/index.ts";
import karnatakaState from "./karnataka/index.ts";
import tamilNaduState from "./tamil-nadu/index.ts";
import chandigarhState from "./chandigarh/index.ts";
import punjabState from "./punjab/index.ts";
import himachalPradeshState from "./himachal-pradesh/index.ts";
import keralaState from "./kerala/index.ts";
import goaState from "./goa/index.ts";
import rajasthanState from "./rajasthan/index.ts";
import madhyaPradeshState from "./madhya-pradesh/index.ts";
import westBengalState from "./west-bengal/index.ts";
import andhraPradeshState from "./andhra-pradesh/index.ts";
import uttarakhandState from "./uttarakhand/index.ts";
import dadraAndNagarHaveliAndDamanAndDiuState from "./dadra-and-nagar-haveli-and-daman-and-diu/index.ts";
import odishaState from "./odisha/index.ts";
import jharkhandState from "./jharkhand/index.ts";
import chhattisgarhState from "./chhattisgarh/index.ts";
import biharState from "./bihar/index.ts";
import assamState from "./assam/index.ts";
import manipurState from "./manipur/index.ts";
import meghalayaState from "./meghalaya/index.ts";
import tripuraState from "./tripura/index.ts";
import sikkimState from "./sikkim/index.ts";
import jammuAndKashmirState from "./jammu-and-kashmir/index.ts";
import puducherryState from "./puducherry/index.ts";

const indiaCountry: LegacyLocationNode = {
  ...country,
  children: [
    maharashtraState,
    gujaratState,
    delhiState,
    uttarPradeshState,
    haryanaState,
    telanganaState,
    karnatakaState,
    tamilNaduState,
    chandigarhState,
    punjabState,
    himachalPradeshState,
    keralaState,
    goaState,
    rajasthanState,
    madhyaPradeshState,
    westBengalState,
    andhraPradeshState,
    uttarakhandState,
    dadraAndNagarHaveliAndDamanAndDiuState,
    odishaState,
    jharkhandState,
    chhattisgarhState,
    biharState,
    assamState,
    manipurState,
    meghalayaState,
    tripuraState,
    sikkimState,
    jammuAndKashmirState,
    puducherryState,
  ],
};

export default indiaCountry;
