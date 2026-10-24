// /data-logger-al-shamal-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-shamal-municipality",
  name: "Al Shamal Municipality",
  type: "state",
  intro:
    "A logger in Al Shamal Municipality mostly serves fish landing and ice stores, as well as farm produce and fodder. Al Shamal Municipality occupies the northern tip of the Qatari peninsula, a flat limestone coast where fishing harbours, farms, beaches and small settlements look out over shallow, clear water. Al Shamal itself is a planned coastal city built around a broad central avenue, with housing, schools, shops and a hospital, while old forts and archaeological remains stand a short drive along the shore. Fishing boats go out from several small harbours, and irrigated farms grow vegetables and fodder inland. Summers are long, very hot and humid on the coast, winters mild and breezy, and dust blows in from the desert. Fish, food and medicines wait in cold boxes and clinics in such heat. The page below describes the city and the rooms where a temperature record would help.",
  localIndustries: [
    "Fish landing and ice stores",
    "Farm produce and fodder",
    "Clinics, pharmacies and care centres",
    "Supermarkets and neighbourhood shops",
  ],
  citiesServed: ["Al Shamal"],
  supportNote:
    "Enquiries from Al Shamal Municipality are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and how they are cooled, and our reply covers what seems suitable here.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Shamal Municipality?",
      answer:
        "Al Shamal has a city page. Another place in the municipality can be raised through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a far-north fishing coast want phone alerts?",
      answer:
        "The nearest large supplier is a long drive away, so a warning that an ice room is drifting lets staff move stock or fix the unit while it can still be saved, instead of finding the loss in the morning.",
    },
    {
      question: "Can a harbour ice store use a battery logger?",
      answer:
        "Yes. A probe logger runs on its own battery and keeps its readings in memory, so a store with unreliable power still has a record, though a WiFi unit needs a router with power.",
    },
  ],
  listing: [
    { slug: "al-shamal", text: "A planned coastal city at the northern tip of the peninsula, with fishing harbours, farms, beaches and a hospital, in hot, humid summers." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
