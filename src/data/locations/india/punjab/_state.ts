// /data-logger-punjab | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "punjab",
  name: "Punjab",
  type: "state",
  intro:
    "A logger in Punjab is often asked for by pharma plants, electronics makers and hospitals. Punjab is known for its fields, and the grain, dairy and food firms that handle the harvest keep storage of their own, but its cities each add a different trade: Ludhiana's knitwear, hand tools and auto parts, Amritsar's hotels, kitchens and border road, Jalandhar's sports goods and leather, Patiala's hospitals, laboratories and rice mills, Bathinda's grain, cotton and refinery belt, Rajpura's junction yards, and Mohali beside Chandigarh, where pharmaceutical units, electronics makers and research institutes stand on regular plots. Summers are hot and dry, winter nights are cold and foggy, and the monsoon arrives heavily at the foothills. The pages below take each city in turn, with its estates, its rooms and the loggers that suit them.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Electronics and technology parks",
    "Hospitals and research institutes",
  ],
  citiesServed: ["Mohali", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Rajpura"],
  supportNote:
    "Supply, installation support and site visits for Punjab sites are arranged from our Mumbai office. Tell us the town, the unit and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Punjab?",
      answer:
        "Mohali, Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda and Rajpura each have a city page, and the neighbouring Chandigarh and Panchkula pages cover the rest of the tricity. Enquiries from other Punjab towns are welcome.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does Punjab start with Mohali?",
      answer:
        "Its industrial phases, research institutes and hospitals concentrate the kinds of storage that benefit most from continuous records, and they lie in one compact town that is easy to describe in depth.",
    },
    {
      question: "Can a firm with units in Mohali and across the border in Chandigarh use one dashboard?",
      answer:
        "Each unit is a site with its own alert contacts, whichever state it stands in, and a quality head can open every site in one list and export a report for any room.",
    },
  ],
  listing: [
    { slug: "mohali", text: "A planned town beside Chandigarh whose industrial phases, technology parks, pharmaceutical units, institutes and hospitals keep rooms to written limits." },
    { slug: "ludhiana", text: "The hosiery, hand-tool and auto-part city, with Focal Point estates, dye works, cloth markets, dairies and hospitals in dry heat and winter fog." },
    { slug: "amritsar", text: "The pilgrimage city with hotel and temple kitchens, sweet and dry-fruit trades, Attari road godowns, hospitals and woollen bazaars." },
    { slug: "jalandhar", text: "The Doaba centre of sports goods, leather, hand tools and surgical instruments, with Focal Point units and a cantonment." },
    { slug: "patiala", text: "The old royal city of a medical college, university laboratories, rice mills and bazaars, on the road to Chandigarh and Haryana." },
    { slug: "bathinda", text: "A Malwa junction town of grain and cotton yards, mills, a refinery and fertiliser belt, a cantonment and a medical institute." },
    { slug: "rajpura", text: "A junction town between Patiala, Chandigarh and Ambala, with goods yards, rice mills, food and packaging firms and warehouses." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
