// Kerala (India): assembles the state hub and its cities. A new city file must be imported and listed here.
import type { LegacyLocationNode } from "../../_types.ts";
import state from "./_state.ts";
import kochiCity from "./kochi.ts";
import thiruvananthapuramCity from "./thiruvananthapuram.ts";
import kozhikodeCity from "./kozhikode.ts";
import thrissurCity from "./thrissur.ts";
import kollamCity from "./kollam.ts";

const keralaState: LegacyLocationNode = {
  ...state,
  children: [
    kochiCity,
    thiruvananthapuramCity,
    kozhikodeCity,
    thrissurCity,
    kollamCity,
  ],
};

export default keralaState;
