// /data-logger-uae | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "uae",
  name: "United Arab Emirates",
  type: "country",
  intro:
    "A logger in the UAE mostly serves free-zone warehouses, food importers and hotel kitchens. The United Arab Emirates runs on trade: containers arrive at its ports and free zones, wait in bonded and chilled warehouses and leave again for markets across the region, while hotels, hospitals and food importers keep cold rooms under heavy summer load. Prithvi supplies WiFi temperature and humidity loggers from India to these businesses, with alerts to phones and email and set-up done remotely with your team, so an owner, a chef or a quality manager can read a room's record from anywhere. The page below describes the Dubai city page we have written, and other emirates are served on enquiry.",
  localIndustries: [
    "Free-zone and port warehousing",
    "Food import and distribution",
    "Pharmaceutical and healthcare distribution",
    "Hospitality and catering",
    "Reefer transport",
  ],
  citiesServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  supportNote:
    "Enquiries from the UAE are handled through the enquiry form, Call or WhatsApp. Tell us the site, what you store and how it is cooled, and we reply with what looks suitable and how remote set-up support would work.",
  faqs: [
    {
      question: "Can I get a temperature data logger in emirates other than Dubai?",
      answer:
        "Every emirate from Abu Dhabi to Fujairah has its own emirate page with city and area pages beneath. For another emirate, send the site and what you store through the enquiry form, Call or WhatsApp, and we reply with what looks suitable.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a hotel group see every property on one dashboard?",
      answer:
        "Each property is a site, each kitchen's alerts go to its own engineer and a group manager sees every site together, with reports that can be exported for any period.",
    },
    {
      question: "How do GSM options work for transport vehicles?",
      answer:
        "GSM versions are available, but network compatibility must be confirmed for your carriers and vehicles before an order, and we do that during the enquiry.",
    },
  ],
  listing: [
    { slug: "dubai-emirate", text: "Dubai's creek city and its Jebel Ali, Dubai Investments Park, Al Quoz, Ras Al Khor, Al Qusais and Al Aweer districts, in hot, humid Gulf summers." },
    { slug: "sharjah-emirate", text: "Sharjah's creek city, Khor Fakkan and Kalba on the east coast, and the Sajaa, SAIF Zone, Hamriyah and Muwaileh districts, in hot, humid weather." },
    { slug: "ajman-emirate", text: "Ajman's creek city, the Al Jurf Industrial Area and the Ajman Free Zone, in hot, humid Gulf summers." },
    { slug: "umm-al-quwain-emirate", text: "Umm Al Quwain's mangrove-lagoon town and its free-trade zone beside the Gulf, in humid summer heat." },
    { slug: "ras-al-khaimah-emirate", text: "Ras Al Khaimah's creek city, RAKEZ, the Al Ghail Industrial Area and Al Jazirah Al Hamra, below the Hajar mountains." },
    { slug: "fujairah-emirate", text: "Fujairah's Gulf of Oman city, Dibba Al Fujairah, the Fujairah Free Zone and the Port of Fujairah, below the Hajar mountains." },
    { slug: "abu-dhabi-emirate", text: "Abu Dhabi's island city, Mussafah, ICAD, KIZAD, Khalifa Port and Ghantoot, in very hot, humid Gulf heat." },
  ],
  indexable: true,
  seo: {
    primaryKeyword: "temperature data logger UAE",
    supporting: ["Dubai cold chain monitoring", "Abu Dhabi cold chain monitoring"],
  },
};

export default country;
