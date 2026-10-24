// /data-logger-hawalli-governorate | State hub | parent: Kuwait
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "hawalli-governorate",
  name: "Hawalli Governorate",
  type: "state",
  intro:
    "A logger in Hawalli Governorate mostly serves shops, supermarkets and food retail, as well as restaurants, cafes and catering kitchens. Hawalli Governorate is a densely built part of Kuwait's urban strip, a crowded mix of apartment blocks, shopping streets, clinics, restaurants and small offices stretching south-east of the capital along the Gulf coast. Hawalli itself is a busy commercial neighbourhood of narrow-fronted shops and traders' stores, while Salmiya runs along the seafront with malls, hotels, cafes, marinas and tall apartment towers. Summers are blazing and dry, the air by the water turns humid, winters are mild, and dust storms drift in from the desert. Food, medicines and household goods wait in shops, kitchens and small stockrooms in such heat. The pages below describe both towns and the rooms in each where a temperature record would help.",
  localIndustries: [
    "Shops, supermarkets and food retail",
    "Restaurants, cafes and catering kitchens",
    "Clinics, pharmacies and care centres",
    "Small traders' stockrooms",
  ],
  citiesServed: ["Hawalli","Salmiya"],
  supportNote:
    "Enquiries from Hawalli Governorate are handled through the enquiry form, Call or WhatsApp. Tell us the neighbourhood, the rooms and how they are cooled, and we come back with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Hawalli Governorate?",
      answer:
        "Hawalli and Salmiya each have a city page. Another neighbourhood can be raised through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do small shop stockrooms matter in a crowded district?",
      answer:
        "Space is tight, so goods are often stacked in back rooms and mezzanines with little cooling, and a logger there shows how warm stock got behind the sales floor.",
    },
    {
      question: "Can one login watch many small shops?",
      answer:
        "Yes. Each shop or kitchen is a separate point on one dashboard with its own alert contacts, and an owner with several outlets sees them all together in one exported report.",
    },
  ],
  listing: [
    { slug: "hawalli", text: "A crowded commercial neighbourhood of narrow shops, traders' stores, clinics, restaurants and apartment blocks, in blazing dry summers." },
    { slug: "salmiya", text: "A seafront town of malls, hotels, cafes, marinas and apartment towers along the Gulf, in blazing summers and humid shore air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
