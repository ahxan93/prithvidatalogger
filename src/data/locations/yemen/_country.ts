// /data-logger-yemen | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "yemen",
  name: "Yemen",
  type: "country",
  intro:
    "Any logger in Yemen is arranged case by case, starting with what you store. Yemen is served case by case. Healthcare providers and distributors there store medicines, vaccines and food in conditions where power and connectivity are not always dependable, so the first question is always what is practical for a particular site rather than what a catalogue offers. Prithvi loggers record on their batteries through outages and keep storing readings when a network is absent, which is why they can suit such sites. Every enquiry is reviewed individually: we ask about the location, the rooms and the route for dispatch, and we confirm what is possible before anything is recommended. No city pages are written for Yemen, and this page covers the country as a whole.",
  localIndustries: [
    "Healthcare and medical stores",
    "Vaccine and medicine storage",
    "Food storage and distribution",
  ],
  citiesServed: ["Sana'a", "Aden"],
  supportNote:
    "Supply to Yemen is arranged case by case. Contact us with your location and requirements, and we will confirm what is possible before quoting.",
  faqs: [
    {
      question: "Can you arrange a temperature data logger in Yemen?",
      answer:
        "Supply to Yemen is arranged case by case. Send the location, what you store and how it would reach you, and we confirm what is possible before we recommend anything.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "What happens to the record when the power or network is down?",
      answer:
        "The logger keeps recording on its battery and stores the readings, so a record exists even if no alert could be sent at the time, and it is available when the site is next connected.",
    },
    {
      question: "How should we start an enquiry?",
      answer:
        "Use WhatsApp or the enquiry form, describe the rooms and the situation on site and mention any constraints on access. Our team replies to discuss what is practical.",
    },
  ],
  listing: [
    { slug: "aden-governorate", text: "Aden, a port city on the Gulf of Aden, with its harbour, free-zone, industrial and peninsula areas, reviewed case by case." },
    { slug: "hadramaut-governorate", text: "Mukalla's harbour, Seiyun's palm groves and Shibam's mud-brick towers, in a hot coast and a dry, flood-prone valley, reviewed case by case." },
    { slug: "abyan-governorate", text: "Zinjibar's delta fields and fishing beaches on the Gulf of Aden coast, reviewed case by case." },
    { slug: "amanat-al-asimah", text: "Sana'a's highland plateau, Old City markets, industrial area and airport, in a mild, dry climate with cold nights, reviewed case by case." },
    { slug: "taiz-governorate", text: "Taiz's hill-city markets and hospitals and Mocha's coffee port on the Red Sea, in a cool highland and a hot coast, reviewed case by case." },
    { slug: "al-hudaydah-governorate", text: "Hodeidah's Red Sea port, Zabid's old town and Bajil's produce markets on the hot Tihama plain, reviewed case by case." },
    { slug: "ibb-governorate", text: "Ibb's terraced farms, markets and clinics in the wet, green southern highlands, reviewed case by case." },
    { slug: "dhamar-governorate", text: "Dhamar's university, farm markets and clinics on the cool central plateau, reviewed case by case." },
    { slug: "marib-governorate", text: "Marib's dam-fed farms, markets and clinics at the edge of the eastern desert, reviewed case by case." },
    { slug: "lahij-governorate", text: "Lahij's delta farms, produce markets and clinics north of Aden, reviewed case by case." },
    { slug: "sadah-governorate", text: "Sa'dah's walled old town, terrace fruit farms and mountain markets, reviewed case by case." },
  ],
  indexable: true,
};

export default country;
