// /data-logger-saudi-arabia | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "saudi-arabia",
  name: "Saudi Arabia",
  type: "country",
  intro:
    "A logger in Saudi Arabia has to keep medicines and food in range across long distances and desert heat. Saudi Arabia's storage chain stretches across long distances: medicines and food arrive by sea at Jeddah and Dammam, travel inland by road to Riyadh and beyond, and wait in warehouses where desert heat works against every cooling plant. Prithvi supplies WiFi temperature and humidity loggers from India to pharmacies, hospitals, food importers and logistics yards across the kingdom, with alerts to phones and email and set-up carried out remotely with your team. The pages below describe the three cities we have written for, each with the industries and climate that make it distinct, so you can open the one closest to your site.",
  localIndustries: [
    "Pharmaceutical warehousing and distribution",
    "Hospitals and medical supply",
    "Food and dairy cold chain",
    "Long-haul reefer transport",
    "Retail distribution centres",
  ],
  citiesServed: ["Riyadh", "Jeddah", "Dammam", "Al Khobar"],
  supportNote:
    "Share your sites and requirements by WhatsApp or the enquiry form. We recommend models, send a quote, handle the enquiry remotely from India and then set up the loggers, alerts and user access with your team over a video call.",
  faqs: [
    {
      question: "Can one temperature data logger setup show warehouses in Riyadh, Jeddah and Dammam on one screen?",
      answer:
        "Yes. Each warehouse is a site on the dashboard, with alerts going to the person responsible there, and a head of operations can open every site in a single list.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How is a Saudi site set up when the loggers come from India?",
      answer:
        "Loggers are sent from India and registered to your dashboard, and you agree rooms, limits and alert contacts with us on a call or a video session.",
    },
    {
      question: "How do we confirm GSM options for vehicles?",
      answer:
        "GSM versions exist, but compatibility differs by country, so we confirm what suits your vehicles and carriers before any order is placed.",
    },
  ],
  listing: [
    { slug: "riyadh-region", text: "The central plateau around the capital, with pharmaceutical, hospital and food warehouses, farm oases and industrial cities under extreme dry heat." },
    { slug: "makkah-region", text: "The Red Sea coast and the mountains behind it, with port warehouses, hotel and hospital stores, fruit and industry in heat and humidity." },
    { slug: "eastern-province", text: "The Gulf coast and the desert behind it, with ports, industrial cities, date oases, hospitals and food depots in heat and humidity." },
    { slug: "madinah-region", text: "The western plateau and its Red Sea port, with hotel, hospital and date-pack stores inland and refineries and fishing on the coast." },
    { slug: "qassim-region", text: "The central farming plain of date groves, wheat and camel markets, with packing houses, farm cold rooms and a university." },
    { slug: "asir-region", text: "The south-western mountains, with cool misty highland cities, wholesale depots, hospitals and valley date farms." },
    { slug: "jazan-region", text: "The hot, wet Red Sea plain of the far south-west, with fish and fruit cold chains, a port and a planned industrial city." },
    { slug: "najran-region", text: "A fertile southern valley of date and fruit farms, markets, a university and hospitals." },
    { slug: "al-baha-region", text: "A small highland region of terraced fruit and honey, hotels and clinics in cool, damp air." },
    { slug: "tabuk-region", text: "The north-west, with irrigated farms, food depots and hospitals in hot summers and frosty winters." },
    { slug: "hail-region", text: "The northern plateau of wheat, dates and dairies, with a university and hospitals." },
    { slug: "al-jawf-region", text: "A far-northern oasis region of olive groves, date packers and clinics." },
    { slug: "northern-borders-region", text: "The far-north plateau, with food and medicine depots, clinics and farm stores far from the ports." },
  ],
  indexable: true,
  seo: {
    primaryKeyword: "temperature data logger Saudi Arabia",
    supporting: ["Riyadh", "Jeddah", "Dammam"],
  },
};

export default country;
