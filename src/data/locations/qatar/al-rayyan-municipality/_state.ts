// /data-logger-al-rayyan-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-rayyan-municipality",
  name: "Al Rayyan Municipality",
  type: "state",
  intro:
    "A logger in Al Rayyan Municipality mostly serves supermarkets and shopping streets, as well as clinics, pharmacies and care centres. Al Rayyan Municipality lies to the west of the capital, where the built-up edge of Doha gives way to a wide plain of villas, schools, malls, farms and open desert. The city of Al Rayyan is a sprawling suburban centre of family neighbourhoods and shopping streets, with the districts of Al Gharafa, Birkat Al Awamer and Al Sailiya spread along the main roads out of town. Summers are long, very hot and dry-to-humid depending on the wind, winters mild, and dust blows in from the desert. Food, medicines and household goods wait in shops, clinics and warehouses in such heat. The pages below describe the city and three of its districts.",
  localIndustries: [
    "Supermarkets and shopping streets",
    "Clinics, pharmacies and care centres",
    "Warehouses and workshops",
    "Restaurants and bakeries",
  ],
  citiesServed: ["Al Rayyan"],
  supportNote:
    "Enquiries from Al Rayyan Municipality are handled through the enquiry form, Call or WhatsApp. Say which district, which rooms and how they are cooled, and our reply covers what seems suitable here.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Rayyan Municipality?",
      answer:
        "Al Rayyan has a city page, and Al Gharafa, Birkat Al Awamer and Al Sailiya have area pages under it. A district not named here can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a dusty suburb want a mounting position as well as a logger?",
      answer:
        "Fine dust settles on anything left open or near a vent, so a logger is fixed on a shaded inner wall away from the door, and its battery keeps the record going through a power cut.",
    },
    {
      question: "Can one login watch shops and warehouses in different districts?",
      answer:
        "Yes. Each shop or warehouse is a separate point on one dashboard, alerts go to whoever looks after it, and a manager sees every site together in one exported report.",
    },
  ],
  listing: [
    { slug: "al-rayyan", text: "A sprawling suburban city west of the capital, with villas, malls, schools, clinics and warehouses, in hot summers and blowing dust." },
  ],
  areaListing: [
    { slug: "al-gharafa", text: "A dense residential district with shops, restaurants, clinics and small workshops along its main roads." },
    { slug: "birkat-al-awamer", text: "A district on the south-western side of the city with villas, storage yards, workshops and open land." },
    { slug: "al-sailiya", text: "A district along the road out of the city, with shops, workshops, warehouses and stores in dry heat." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
