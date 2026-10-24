// /data-logger-farwaniya-governorate | State hub | parent: Kuwait
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "farwaniya-governorate",
  name: "Farwaniya Governorate",
  type: "state",
  intro:
    "A logger in Farwaniya Governorate mostly serves wholesale markets and warehousing, as well as shops, supermarkets and food retail. Farwaniya Governorate lies inland of the capital, a flat and crowded belt of apartment districts, wholesale markets, workshops, warehouses and wide ring roads where much of Kuwait's everyday trade happens. Farwaniya itself is a busy centre with a large hospital and a dense grid of shops, Khaitan and Jleeb Al-Shuyoukh are packed residential and commercial neighbourhoods with markets and stores, and industrial areas and the country's airport lie among the districts to the north. Summers are blazing and dry, winters mild, and dust storms blow in from the desert. Food, medicines, electronics and building materials wait in shops, stockrooms and warehouses in such heat. The pages below cover the three towns and four industrial and transport areas.",
  localIndustries: [
    "Wholesale markets and warehousing",
    "Shops, supermarkets and food retail",
    "Clinics, hospitals and pharmacies",
    "Workshops and light industry",
  ],
  citiesServed: ["Farwaniya","Khaitan","Jleeb Al-Shuyoukh"],
  supportNote:
    "Enquiries from Farwaniya Governorate are handled through the enquiry form, Call or WhatsApp. Name the neighbourhood, the rooms and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Farwaniya Governorate?",
      answer:
        "Farwaniya, Khaitan and Jleeb Al-Shuyoukh each have a city page. Ardiya Industrial Area, Al Rai Industrial Area and Kuwait International Airport have area pages under Farwaniya, and the Jleeb Al-Shuyoukh Warehouses have one under Jleeb Al-Shuyoukh. Another neighbourhood can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do wholesale warehouses suit multi-point loggers?",
      answer:
        "A big warehouse is warmest under the roof and coolest at the floor and near the doors, so probes at several heights and positions show where stock really sits in the heat.",
    },
    {
      question: "Can one login watch shops, warehouses and clinics together?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can see every site together in one exported report.",
    },
  ],
  listing: [
    { slug: "farwaniya", text: "A busy inland centre of dense shopping grids, apartment blocks and a large hospital, in blazing dry summers and blowing dust." },
    { slug: "khaitan", text: "A packed residential and commercial neighbourhood of apartment blocks, markets and small shops beside the airport side of the governorate." },
    { slug: "jleeb-al-shuyoukh", text: "A crowded neighbourhood of apartment blocks, wholesale markets and warehouses on the southern side of the governorate." },
  ],
  areaListing: [
    { slug: "ardiya-industrial-area", text: "An industrial area with workshops, warehouses, light factories and yards on flat ground inland of the capital." },
    { slug: "al-rai-industrial-area", text: "An industrial and trading area of workshops, wholesalers and warehouses on the northern side of the governorate." },
    { slug: "kuwait-international-airport", text: "The country's airport, where medicines, food and parcels wait between aircraft and onward vehicles." },
    { slug: "jleeb-al-shuyoukh-warehouses", text: "The warehouse district of Jleeb Al-Shuyoukh, with wholesale stores, stockrooms and trucks on crowded streets." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
