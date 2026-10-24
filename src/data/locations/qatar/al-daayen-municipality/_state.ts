// /data-logger-al-daayen-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-daayen-municipality",
  name: "Al Daayen Municipality",
  type: "state",
  intro:
    "A logger in Al Daayen Municipality mostly serves hotel, restaurant and catering kitchens, as well as supermarkets and shopping streets. Al Daayen Municipality stretches along the Gulf coast north of the capital, a flat shoreline where a planned waterfront city of towers, marinas and shopping boulevards has been laid out beside older suburbs of villas, schools and farms. Lusail is the waterfront city, with hotels, apartments, offices and restaurants arranged around canals and a marina, while Al Daayen itself is a quieter northern suburb with family homes, small shops and open land behind the coast. On the shore the long summers are very hot and humid and the winters mild, while dust and haze drift in at certain times of year. Food, medicines and household goods wait in kitchens, clinics and warehouses in such heat. The pages below cover the two towns.",
  localIndustries: [
    "Hotel, restaurant and catering kitchens",
    "Supermarkets and shopping streets",
    "Clinics, pharmacies and care centres",
    "Warehouses and workshops",
  ],
  citiesServed: ["Lusail","Al Daayen"],
  supportNote:
    "Enquiries from Al Daayen Municipality are handled through the enquiry form, Call or WhatsApp. Name the town, the rooms and how they are cooled, and our reply covers what seems suitable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Daayen Municipality?",
      answer:
        "Lusail and Al Daayen each have a city page. Another place on this stretch of coast can be raised through the enquiry form, and further pages follow only when they can be written from confident facts.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would a new waterfront city want a temperature record?",
      answer:
        "New towers and shopping streets are cooled by plant that works at its limit through the long summer, so a record of kitchens, clinics and stockrooms shows when a unit begins to struggle, before stock is lost.",
    },
    {
      question: "Can one login watch rooms across both towns?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can view both towns together in a single exported report.",
    },
  ],
  listing: [
    { slug: "lusail", text: "A planned waterfront city of towers, hotels, marinas and shopping boulevards on the coast north of the capital, in hot, humid summers and sea air." },
    { slug: "al-daayen", text: "A quieter northern suburb of villas, schools, small shops and farms, with open land behind the coast, in hot, dusty summers." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
