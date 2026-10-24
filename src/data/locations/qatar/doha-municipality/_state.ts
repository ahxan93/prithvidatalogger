// /data-logger-doha-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "doha-municipality",
  name: "Doha Municipality",
  type: "state",
  intro:
    "A logger in Doha Municipality mostly serves hotel, restaurant and catering kitchens, as well as hospitals, clinics and pharmacies. Doha Municipality takes in the capital city of Qatar, built around a curved bay on the east coast of the peninsula. A palm-lined Corniche follows the water, towers of glass stand beside traditional dhows, and low-rise lanes of an old market still sell spices, textiles and food. Business, shopping and residential districts spread inland and along the shore, from the towers of West Bay to the busy streets of Al Sadd, the redeveloped quarter of Msheireb and an artificial island of marinas and apartments. Summers are long, very hot and humid, winters mild, and dust and haze come in some seasons. Food, medicines and electronics wait in kitchens, clinics and stores in such heat. The pages below cover the city and four of its districts.",
  localIndustries: [
    "Hotel, restaurant and catering kitchens",
    "Hospitals, clinics and pharmacies",
    "Food import and retail",
    "Office and server rooms",
  ],
  citiesServed: ["Doha"],
  supportNote:
    "Enquiries from Doha Municipality are handled through the enquiry form, Call or WhatsApp. Name the district, the rooms to be watched and how they are cooled, and we answer with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Doha Municipality?",
      answer:
        "Doha has a city page, and West Bay, Al Sadd, Msheireb, The Pearl-Qatar, Hamad International Airport and Ras Bufontas Free Zone have area pages under it. Another district of the capital can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does a very hot city still need humidity records?",
      answer:
        "The coast is damp as well as hot, so condensation forms whenever a cold room opens to outside air, and a humidity trend beside the temperature shows moisture that a thermometer alone would miss.",
    },
    {
      question: "Can one login watch rooms in several districts?",
      answer:
        "Yes. Each room is a separate point on one dashboard, alerts go to whoever looks after that room, and a manager sees every district together in one exported report.",
    },
  ],
  listing: [
    { slug: "doha", text: "A bay-side capital of towers, markets, hospitals, hotels and warehouses, with very hot, humid summers and sea air that carries dust and salt." },
  ],
  areaListing: [
    { slug: "west-bay", text: "A district of glass towers, hotels, offices and restaurants along the northern curve of the bay." },
    { slug: "al-sadd", text: "A busy central district of shops, clinics, restaurants and apartment blocks." },
    { slug: "msheireb", text: "A redeveloped downtown quarter with shaded streets, low-rise buildings, shops, offices and hotels." },
    { slug: "the-pearl-qatar", text: "An artificial island of marinas, residential towers, shops and restaurants off the northern coast." },
    { slug: "hamad-international-airport", text: "The airport on the south-eastern side of the city, where medicines, food and parcels wait between aircraft and onward vehicles." },
    { slug: "ras-bufontas-free-zone", text: "A free zone beside the airport, with warehouse units and offices for trading and light-industrial firms." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
