// /data-logger-qatar | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "qatar",
  name: "Qatar",
  type: "country",
  intro:
    "A logger in Qatar mostly serves food importers, hospitals and hotel kitchens. Qatar is a peninsula in the Arabian Gulf where nearly everything that arrives has to stay in range until it reaches a shelf, a pharmacy or a hospital ward. Warehouses, cold stores, hotel kitchens and clinics around Doha and the towns near it run cooling plant against long, hot, humid summers, and dust and haze add to the strain. WiFi temperature and humidity loggers with alerts to phones and email suit these rooms, with remote set-up support for your team. The pages below follow the municipalities one by one, starting with Doha, and the enquiry form is the quickest way to describe your site.",
  localIndustries: [
    "Food import and cold storage",
    "Hospitals and clinics",
    "Hotels and catering",
    "Pharmaceutical distribution",
  ],
  citiesServed: ["Doha", "Al Rayyan", "Al Wakrah", "Lusail"],
  supportNote:
    "Enquiries from Qatar are handled through the enquiry form, Call or WhatsApp. Describe the site, the stock and the cooling, and our reply covers what seems suitable for Qatar and how remote set-up support would run.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Qatar?",
      answer:
        "Doha, Al Rayyan, Al Wakrah, Al Khor and Al Thakhira, Al Daayen, Umm Salal, Al Shamal and Al Shahaniya municipalities have their own pages, each with cities and districts beneath them. For another place, send the site and what you store through the enquiry form, Call or WhatsApp, and we reply with what looks suitable.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How is monitoring set up for a Qatar site?",
      answer:
        "Loggers are registered to your dashboard, and we set up alert rules and user access with your team by phone, WhatsApp or a video call.",
    },
    {
      question: "Can a hotel or hospital group watch several sites together?",
      answer:
        "Each site appears on the dashboard with its own alert recipients, and a group manager can open every site in one list and compare rooms side by side.",
    },
  ],
  listing: [
    { slug: "doha-municipality", text: "The capital's municipality, with a bay-side city of towers, markets, hospitals and hotels, and its central business and island districts, in hot, humid summers." },
    { slug: "al-rayyan-municipality", text: "The municipality west of the capital, with a spreading city of villas, malls, schools and clinics, and its Al Gharafa, Birkat Al Awamer and Al Sailiya districts, in hot, dusty summers." },
    { slug: "al-wakrah-municipality", text: "The municipality south of the capital, with a coastal fishing town, an industrial port town beside the dunes and a growing inland suburb, in hot, humid summers." },
    { slug: "al-khor-and-al-thakhira-municipality", text: "The municipality on the north-east coast, with a creek-side fishing town, mangrove shallows and a headland industrial city, in hot, humid summers and salt air." },
    { slug: "al-daayen-municipality", text: "The municipality along the coast north of the capital, with a planned waterfront city of towers and marinas and a northern suburb of villas, schools and farms, in hot, humid summers." },
    { slug: "umm-salal-municipality", text: "The municipality north of the capital, with a historic fort town, farms, villas and open land, in hot, dry summers and blowing dust." },
    { slug: "al-shamal-municipality", text: "The municipality on the northern tip of the peninsula, with a planned coastal city, fishing harbours, farms and beaches, in hot, humid summers." },
    { slug: "al-shahaniya-municipality", text: "The municipality of the central and western desert, with a farming and camel-keeping town and a west-coast town beside the dunes, in hot, dry summers and blowing dust." },
  ],
  indexable: true,
};

export default country;
