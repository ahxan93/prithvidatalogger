// /data-logger-northern-governorate | State hub | parent: Bahrain
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "northern-governorate",
  name: "Northern Governorate",
  type: "state",
  intro:
    "A logger in Northern Governorate mostly serves food shops and market traders, as well as clinics and pharmacies. The Northern Governorate covers much of the north and west of Bahrain's main island, from a planned inland town of numbered roundabouts and wide streets to a coastal strip of date-palm gardens, farm plots and seaside villages. Inland, the ground is flat and dry and the summer heat is fierce, while along the shore the air is humid and carries salt. Shops, market stalls, school canteens, clinics, farm stores and workshops all keep goods in rooms that were never meant for such heat. Winters are mild, though dust arrives from the open land when the wind rises. The pages below cover Hamad Town and its industrial area, Budaiya and Saar.",
  localIndustries: [
    "Food shops and market traders",
    "Clinics and pharmacies",
    "Workshops and light industry",
    "Farm produce and nurseries",
  ],
  citiesServed: ["Hamad Town","Budaiya","Saar"],
  supportNote:
    "Enquiries from the Northern Governorate are handled through the enquiry form, Call or WhatsApp. Name the town, the rooms and the goods, and our reply sets out what seems suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Northern Governorate?",
      answer:
        "Hamad Town, Budaiya and Saar have city pages, and the Hamad Town Industrial Area sits under Hamad Town. A town not listed here can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does an inland town need a different approach from the coast?",
      answer:
        "Inland air is drier and hotter in the afternoon, so cooling plant works hard, while the coast brings humid, salty air that clogs coils, and the right records differ between them.",
    },
    {
      question: "Can one login cover sites in several towns?",
      answer:
        "Yes. Every logger reports to one dashboard, alerts can go to different people, and one report can cover shops, stores and sheds in different places.",
    },
  ],
  listing: [
    { slug: "hamad-town", text: "The planned inland town of numbered roundabouts, large housing districts, markets, workshops and an industrial area, in dry and fierce summer heat." },
    { slug: "budaiya", text: "A town on the northern shore with date-palm gardens, farm plots, a long coastal road and small fishing craft, in humid and salty air." },
    { slug: "saar", text: "A coastal housing town west of the capital, with residential compounds, school canteens, shop rows and clinics along its main roads." },
  ],
  areaListing: [
    { slug: "hamad-town-industrial-area", text: "The workshop and storage district of Hamad Town, covered only through the goods and rooms a logger user may look after." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
