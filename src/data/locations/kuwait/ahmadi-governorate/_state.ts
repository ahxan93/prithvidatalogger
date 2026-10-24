// /data-logger-ahmadi-governorate | State hub | parent: Kuwait
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "ahmadi-governorate",
  name: "Ahmadi Governorate",
  type: "state",
  intro:
    "A logger in Ahmadi Governorate mostly serves shops, supermarkets and food retail, as well as restaurants, cafes and catering kitchens. Ahmadi Governorate stretches along the Gulf coast to the south of the capital, a long ribbon of towns where a quiet planned town of tree-lined streets and villas sits not far from a busy seafront strip of shops, restaurants and apartment blocks. Ahmadi is the planned town, with gardens, a hospital and a central square, while Fahaheel is a lively commercial town with a long shore road, markets, cafes and heavy traffic. Summers are blazing and dry, the air by the water turns humid, winters are mild, and dust storms blow in from the desert. Groceries, medicines and household goods sit in shops, kitchens and clinics through that heat. The pages below cover the two towns and the rooms where a temperature record would help.",
  localIndustries: [
    "Shops, supermarkets and food retail",
    "Restaurants, cafes and catering kitchens",
    "Clinics, hospitals and pharmacies",
    "Workshops and small warehouses",
  ],
  citiesServed: ["Ahmadi","Fahaheel","Wafra","Khiran"],
  supportNote:
    "Enquiries from Ahmadi Governorate are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and how they are cooled, and we come back with what seems suitable at the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Ahmadi Governorate?",
      answer:
        "Ahmadi, Fahaheel, Wafra and Khiran each have a city page. Shuaiba Industrial Area, Shuaiba Port and Mina Al Ahmadi have area pages under Ahmadi. A town elsewhere along the southern coast can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why would a green planned town differ from a seafront strip for storage?",
      answer:
        "Gardens and shade keep a planned town a little cooler and damper, while a seafront strip is hotter, saltier and noisier with traffic, so mounting spots and humidity checks differ between the two.",
    },
    {
      question: "Can one login watch a hospital pharmacy and a row of shop coolers?",
      answer:
        "Yes. Each room is a separate point on one dashboard with its own alert contacts, and a manager can see all sites together in one exported report.",
    },
  ],
  listing: [
    { slug: "ahmadi", text: "A planned town of tree-lined streets, villas, gardens and a hospital, in blazing summers and slightly cooler shade." },
    { slug: "fahaheel", text: "A lively seafront commercial town of shops, restaurants, markets and apartment blocks, in blazing heat and humid shore air." },
    { slug: "wafra", text: "A farming district far to the south, with greenhouses, irrigated plots and animal farms spread across open desert, in blazing dry heat." },
    { slug: "khiran", text: "A beach-side district of holiday homes, chalets and marinas on the far southern coast, in humid shore air and blazing summers." },
  ],
  areaListing: [
    { slug: "shuaiba-industrial-area", text: "A large industrial area north of Ahmadi, with factories, workshops, warehouses and yards on flat coastal ground." },
    { slug: "shuaiba-port", text: "The commercial port at Shuaiba, where food, supplies and general goods wait on quays and in sheds in hot, hazy air." },
    { slug: "mina-al-ahmadi", text: "The port-side industrial area on the coast beside Ahmadi, with support stores, laboratories, workshops and canteens." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
