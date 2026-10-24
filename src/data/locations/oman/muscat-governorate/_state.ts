// /data-logger-muscat-governorate | State hub | parent: Oman
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "muscat-governorate",
  name: "Muscat Governorate",
  type: "state",
  intro:
    "A logger in Muscat Governorate mostly serves hospitals, clinics and pharmacies, as well as hotel, restaurant and catering kitchens. Muscat Governorate holds the capital region of Oman, a string of bays and districts squeezed between the Gulf of Oman and a wall of bare brown mountains. White low buildings climb the hillsides, wide highways link neighbourhoods of offices, hospitals, universities and shopping streets, and the old harbour town of Muttrah keeps a covered market, a fish market and a busy waterfront. Industrial districts and a commercial port lie behind the coast. Summers run long, very hot and humid on the shore, winters stay mild, and the odd storm sends flash floods down the dry valleys. Kitchens, clinics and warehouses here carry stock of every kind through that heat. The pages below cover the two cities and four of their districts.",
  localIndustries: [
    "Hospitals, clinics and pharmacies",
    "Hotel, restaurant and catering kitchens",
    "Port-side and industrial warehousing",
    "Markets, fish and food trade",
  ],
  citiesServed: ["Muscat","Muttrah","Seeb","Bawshar","Quriyat"],
  supportNote:
    "Enquiries from Muscat Governorate are handled through the enquiry form, Call or WhatsApp. Say which district, which rooms and how they are cooled, and our reply covers what seems suitable on site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Muscat Governorate?",
      answer:
        "Muscat, Muttrah, Seeb, Bawshar and Quriyat each have a city page. Al Khuwair, Al Ghubra and Ghala Industrial Area have area pages under Muscat, Sultan Qaboos Port Muttrah has one under Muttrah, and Muscat International Airport has one under Seeb. Another place can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does storm water matter when choosing a mounting spot?",
      answer:
        "Water running down dry valleys after a storm can reach low rooms and cut the power, so a logger body is fixed above the likely water line and its battery keeps the record running through the outage.",
    },
    {
      question: "Is one login enough to watch rooms across the capital region?",
      answer:
        "Yes. Every room is a separate point on one dashboard with its own alert contacts, and a manager can see all the districts together in a single exported report.",
    },
  ],
  listing: [
    { slug: "muscat", text: "A harbour capital between rocky hills and the sea, with hospitals, universities, offices, hotels and industrial districts, in long, hot, humid summers." },
    { slug: "muttrah", text: "An old harbour town with a corniche, a covered market, a fish market and a commercial port, in hot, damp sea air." },
    { slug: "seeb", text: "A coastal city north-west of the capital with a fishing harbour, beaches, farms behind the shore, growing suburbs and the airport." },
    { slug: "bawshar", text: "A sprawling suburb behind the coast with homes, malls, clinics and schools, and a belt of sand dunes at its edge, in hot, dry heat." },
    { slug: "quriyat", text: "A fishing town on the south-eastern coast beneath the mountains, with a harbour, date palms, a dam in the valley behind and damp sea air." },
  ],
  areaListing: [
    { slug: "al-khuwair", text: "A busy district of offices, hotels, restaurants, shops and clinics near the capital's main roads." },
    { slug: "al-ghubra", text: "A residential and commercial district with shops, clinics, schools and restaurants close to the coast." },
    { slug: "ghala-industrial-area", text: "An industrial area with workshops, warehouses, light factories and building-material yards." },
    { slug: "sultan-qaboos-port-muttrah", text: "The commercial port at Muttrah, where food, supplies and general goods wait on quays and in sheds in warm, damp air." },
    { slug: "muscat-international-airport", text: "The airport on the north-western side of the capital region, where medicines, food and parcels wait between aircraft and onward vehicles." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
