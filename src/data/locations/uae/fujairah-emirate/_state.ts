// /data-logger-fujairah-emirate | State hub | parent: United Arab Emirates
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "fujairah-emirate",
  name: "Fujairah Emirate",
  type: "state",
  intro:
    "A logger in Fujairah Emirate mostly serves fish, farm produce and food stores, as well as port-side and free-zone warehousing. Fujairah Emirate stretches along the Gulf of Oman side of the Emirates, a narrow green-and-grey strip where the Hajar mountains drop almost to the water. Fujairah city, its main town, lies on a flat shore of beaches, farms and a deep-water harbour, while Dibba Al Fujairah sits in a bay at the northern end of the coast, beneath steep peaks. Fishing boats, date and vegetable farms, dive centres, hotels and small workshops share the narrow plain. Summers are hot and very humid, winters mild, and sudden showers run off the mountains. Food, fish, medicines and port-side cargo all need steady storage. The pages below cover the two towns and two port-side districts.",
  localIndustries: [
    "Fish, farm produce and food stores",
    "Port-side and free-zone warehousing",
    "Hotels, dive centres and visitor kitchens",
    "Clinics, hospitals and pharmacies",
  ],
  citiesServed: ["Fujairah","Dibba Al Fujairah"],
  supportNote:
    "Enquiries from Fujairah Emirate are handled through the enquiry form, Call or WhatsApp. Say which town, which rooms and how they are cooled, and we answer with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Fujairah Emirate?",
      answer:
        "Fujairah and Dibba Al Fujairah each have a city page, and the Fujairah Free Zone and the Port of Fujairah have area pages under Fujairah. A place not listed here can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does mountain rain affect a store on the coastal strip?",
      answer:
        "Showers on the Hajar slopes run down to the narrow plain in minutes and can reach low rooms and cut the power, so a logger mounted above the likely water line with a battery inside keeps the record of what happened.",
    },
    {
      question: "Is one dashboard enough for sites in both towns?",
      answer:
        "Yes. Each site is a separate point on one dashboard, alerts go to whoever is responsible for each room, and a manager can see both towns together in one exported report.",
    },
  ],
  listing: [
    { slug: "fujairah", text: "A Gulf of Oman coastal city of beaches, farms, a fort and a deep-water harbour, with fish markets, hotels and hot, humid summers." },
    { slug: "dibba", text: "A bay town at the northern end of the emirate's coast beneath steep peaks, with fishing boats, dive centres, date farms and clinics." },
  ],
  areaListing: [
    { slug: "fujairah-free-zone", text: "A free zone beside the city's harbour, with warehouse units and offices for trading and light-industrial firms." },
    { slug: "port-of-fujairah", text: "The deep-water harbour of Fujairah, where cargo, food and supplies wait on quays and in sheds in warm, salty air." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
