// /data-logger-mubarak-al-kabeer-governorate | State hub | parent: Kuwait
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "mubarak-al-kabeer-governorate",
  name: "Mubarak Al-Kabeer Governorate",
  type: "state",
  intro:
    "A logger in Mubarak Al-Kabeer Governorate mostly serves neighbourhood shops and food retail, as well as bakeries, kitchens and catering. Mubarak Al-Kabeer Governorate lies along the Gulf coast south-east of the capital, a belt of quiet residential suburbs where villas, low apartment blocks, schools, mosques, clinics and neighbourhood shops line planned streets, with a strip of beach and sea road to the east. Sabah Al Salem stretches along the shore with its wide avenues and community centres, while Mubarak Al-Kabeer itself is a settled residential area of shops, bakeries, clinics and small workshops. Summers are blazing and dry, the air by the sea turns humid, winters are mild, and dust storms blow in from the desert. Food, medicines and household goods wait in shops, kitchens and clinics in such heat. The pages below cover the two suburbs and the rooms where a temperature record would help.",
  localIndustries: [
    "Neighbourhood shops and food retail",
    "Bakeries, kitchens and catering",
    "Clinics, pharmacies and care centres",
    "Small workshops and stockrooms",
  ],
  citiesServed: ["Sabah Al Salem","Mubarak Al-Kabeer"],
  supportNote:
    "Enquiries from Mubarak Al-Kabeer Governorate are handled through the enquiry form, Call or WhatsApp. Say which suburb, which rooms and how they are cooled, and we reply with what seems suitable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Mubarak Al-Kabeer Governorate?",
      answer:
        "Sabah Al Salem and Mubarak Al-Kabeer each have a city page. Another suburb can be raised through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do quiet residential streets still want phone alerts?",
      answer:
        "Shops in a quiet suburb may be shut for hours at midday or overnight, so a cooler can fail and warm for a long time before anyone notices, and a phone alert gives time to move stock.",
    },
    {
      question: "Can a small chain of shops share one dashboard?",
      answer:
        "Yes. Each shop is a separate point on one dashboard with its own alert contacts, and an owner with several outlets sees them all together in one exported report.",
    },
  ],
  listing: [
    { slug: "sabah-al-salem", text: "A coastal suburb of villas, apartment blocks, wide avenues, community shops and clinics along the Gulf shore, in blazing summers and humid sea air." },
    { slug: "mubarak-al-kabeer", text: "A settled residential area of shops, bakeries, clinics and small workshops on planned streets, in blazing dry heat and dust." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
