// /data-logger-al-hudaydah-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-hudaydah-governorate",
  name: "Al Hudaydah Governorate",
  type: "state",
  intro:
    "Al Hudaydah Governorate occupies the Tihama, the flat and very warm coastal plain of western Yemen beside the Red Sea. Wadis that run down from the mountains water fields of sorghum, fruit and vegetables, and fishing boats work the shore. The port city of Hodeidah is the main town, with Zabid, a historic town of old mosques and learning, and Bajil, a market town on the road inland. A salt-producing coast to the north is served by the port at Salif. Heat and humidity stay high through most of the year, with salt in the air and little cooling at night. Food, medicines and bulk goods need careful storage. The pages below describe these towns and ports and the rooms where a temperature record would help.",
  localIndustries: [
    "Fishing and ice stores",
    "Tihama farm produce and markets",
    "Port and bulk-goods storage",
    "Medicine and vaccine storage",
  ],
  citiesServed: ["Hodeidah","Zabid","Bajil"],
  supportNote:
    "Requests from Al Hudaydah Governorate are weighed case by case. Tell us which town you mean, what is stored and how the room is cooled, and we answer with what looks workable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Hudaydah Governorate?",
      answer:
        "Hodeidah, Zabid and Bajil each have a city page, and the Port of Hodeidah and the Port of Salif have area pages under Hodeidah. Further places can be put to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why is humidity as much a worry as heat on the Tihama?",
      answer:
        "Sea air stays damp day and night, so cartons soften and condensation forms on anything cool, and a humidity log beside the temperature shows when a store has taken on moisture.",
    },
    {
      question: "Can one logger watch more than one room?",
      answer:
        "A single logger watches a single point, but multi-channel units read several probes at once, so a cold room and its anteroom can share one report.",
    },
  ],
  listing: [
    { slug: "hodeidah", text: "A Red Sea port city on the Tihama plain with fish landings, markets and storage in very warm, humid air." },
    { slug: "zabid", text: "A historic Tihama town of old mosques and learning, with date palms, markets and a World Heritage setting." },
    { slug: "bajil", text: "A market town on the road between the coast and the mountains, trading farm produce in a hot lowland." },
  ],
  areaListing: [
    { slug: "port-of-hodeidah", text: "The harbour of Hodeidah, where food, medicines and general cargo wait on the quay in hot, damp sea air." },
    { slug: "port-of-salif", text: "The port at Salif on the Red Sea coast north of Hodeidah, set beside salt works on a hot, flat shore." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
