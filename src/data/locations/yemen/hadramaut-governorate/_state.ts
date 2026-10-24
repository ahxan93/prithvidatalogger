// /data-logger-hadramaut-governorate | State hub | parent: Yemen
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "hadramaut-governorate",
  name: "Hadramaut Governorate",
  type: "state",
  intro:
    "Hadramaut Governorate takes in a long Gulf of Aden coast in the east of Yemen and, behind it, the great Wadi Hadramaut, a green trench of date palms cut into dry plateau. Mukalla is the main coastal town, a fishing and trading harbour with whitewashed buildings, while Seiyun and Shibam lie inland among palm groves and tall mud-brick houses that are well known beyond Yemen. Trade between coast and valley has gone on for centuries, carrying dried fish, honey, dates and household goods. The coast is hot and humid, the interior hot, dry and subject to sudden floods, and nights in the valley can be cool. Medicines, food and heritage collections all need steady storage. The pages below describe the places and rooms where a temperature record would help.",
  localIndustries: [
    "Fishing and dried-fish trade",
    "Date, honey and farm produce",
    "Medicine and vaccine storage",
    "Heritage and guesthouse kitchens",
  ],
  citiesServed: ["Mukalla","Seiyun","Shibam"],
  supportNote:
    "Enquiries from Hadramaut Governorate are reviewed case by case. Send the town, what you store and the situation on site, and we confirm what is practical before recommending anything.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Hadramaut Governorate?",
      answer:
        "Mukalla, Seiyun and Shibam each have a city page, and the Port of Mukalla has an area page. A different place in Hadramaut can be put to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a hot, dry valley still call for humidity records?",
      answer:
        "Rare rain and flash floods bring sudden damp into mud-brick buildings, and food and paper stores swing between very dry and damp air, so a humidity reading beside the temperature shows when a room has drifted.",
    },
    {
      question: "What does a logger do when the power is off?",
      answer:
        "It keeps recording on its battery and stores the readings, so there is a record for the hours without power, available when the site is next connected.",
    },
  ],
  listing: [
    { slug: "mukalla", text: "A whitewashed harbour town on the Gulf of Aden, with fish landings, drying yards, honey and date markets, a university and clinics." },
    { slug: "seiyun", text: "A palm-grove city of Wadi Hadramaut, with date and honey trade, an old palace museum, clinics and a hot, dry, flood-prone climate." },
    { slug: "shibam", text: "A walled town of tall mud-brick towers in the wadi, a World Heritage site with guesthouses, archives and palm gardens." },
  ],
  areaListing: [
    { slug: "port-of-mukalla", text: "The harbour of Mukalla, where fish are landed, iced and dried and goods wait on the quay in warm, salty air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
