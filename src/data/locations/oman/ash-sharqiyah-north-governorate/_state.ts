// /data-logger-ash-sharqiyah-north-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ash-sharqiyah-north-governorate",
  name: "Ash Sharqiyah North Governorate",
  type: "state",
  intro:
    "A logger in Ash Sharqiyah North Governorate mostly serves dates and farm produce, as well as market and shop trade. Ash Sharqiyah North Governorate lies on the inland east of Oman, where old oasis towns of date palms and mud-brick houses stand between the Hajar mountains and the first great dunes of the sands. Ibra is its well-known market town, with an old quarter, a weekly market and groves watered by irrigation channels, while Bidiyah sits at the edge of the dunes among palms, farms and desert tracks. Summer days are fierce and dry, winter nights are cold, and dust and sandstorms blow through in some seasons. Dates, farm produce, sweets and medicines wait in sheds and stock rooms in such swings. The pages below describe the two towns and the rooms where a temperature record would help.",
  localIndustries: [
    "Dates and farm produce",
    "Market and shop trade",
    "Workshops and warehouse storage",
    "Clinics, pharmacies and care centres",
  ],
  citiesServed: ["Ibra","Bidiyah"],
  supportNote:
    "Enquiries from Ash Sharqiyah North Governorate are handled through the enquiry form, Call or WhatsApp. Say the town, the rooms and how they are cooled, and our reply covers what looks workable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ash Sharqiyah North Governorate?",
      answer:
        "Ibra and Bidiyah each have a city page. A town elsewhere in the inland east can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do oasis sheds near irrigation channels need humidity records?",
      answer:
        "Water running between the palms keeps the air damp around the groves, so a humidity log beside the temperature shows when a store took on moisture on a dry-looking day.",
    },
    {
      question: "Does drifting sand affect a logger?",
      answer:
        "Fine sand settles on anything left open, so a logger sits on a shaded inner wall clear of vents and doors, with a battery that keeps the record running through a power cut.",
    },
  ],
  listing: [
    { slug: "ibra", text: "An oasis market town below the mountains, with an old quarter, a weekly market, date groves and irrigation channels, in hot days and cold nights." },
    { slug: "bidiyah", text: "A desert-edge oasis town beside the dunes, with date palms, farms, shops and a clinic, in fierce heat and blowing sand." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
