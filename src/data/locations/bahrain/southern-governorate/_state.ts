// /data-logger-southern-governorate | State hub | parent: Bahrain
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "southern-governorate",
  name: "Southern Governorate",
  type: "state",
  intro:
    "A logger in Southern Governorate mostly serves food shops and market traders, as well as clinics and pharmacies. The Southern Governorate covers the broad southern part of Bahrain's main island, from large residential towns of schools, malls, clinics and bakeries to a planned market town of numbered blocks and a western shore of farms and seaside resorts. Much of the land is flat, open and dry, so afternoon heat is fierce, while the western coast adds humidity and salt. Supermarkets, canteens, pharmacies, hotel kitchens and market stalls keep goods in rooms that rely on air-conditioning for most of the year. Winters are mild, and dust blows in on windy days. The pages below cover Riffa, Isa Town and Zallaq.",
  localIndustries: [
    "Food shops and market traders",
    "Clinics and pharmacies",
    "Hotel and resort kitchens",
    "Farm produce and fishing",
  ],
  citiesServed: ["Riffa","Isa Town","Zallaq"],
  supportNote:
    "Enquiries from the Southern Governorate are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and which goods, and our reply describes what appears suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Southern Governorate?",
      answer:
        "Riffa, Isa Town and Zallaq have city pages. Another town can be raised through the enquiry form, and we say what looks practical.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does the southern heat call for more than a thermometer?",
      answer:
        "Afternoon heat is strong and evenings stay warm, so cooling plant runs for long spells, and a stored trend shows a unit slowly losing ground before any stock is harmed.",
    },
    {
      question: "Can a logger cover a hotel kitchen as well as a shop?",
      answer:
        "Yes. Every logger reports to one dashboard, each alert can reach a different person, and a single report can cover kitchens, shops and stores in different places.",
    },
  ],
  listing: [
    { slug: "riffa", text: "A large residential town in two halves, with schools, malls, clinics, bakeries and workshops on open, dry ground." },
    { slug: "isa-town", text: "A planned inland market town of numbered blocks, a busy central market, housing, sports grounds and schools." },
    { slug: "zallaq", text: "A town on the western coast with farms, fishing craft, seaside hotel kitchens and shops in humid, salty air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
