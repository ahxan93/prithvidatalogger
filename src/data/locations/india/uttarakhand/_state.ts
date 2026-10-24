// /data-logger-uttarakhand | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "uttarakhand",
  name: "Uttarakhand",
  type: "state",
  intro:
    "A logger in Uttarakhand serves plains and foothills. Uttarakhand is a state of two climates, the cool wet hills and the hot plains and foothills below them, and its storage sits mostly in the plains: the temple and factory city of Haridwar with its large industrial estate, the capital Dehradun in the Doon valley, Roorkee between the Ganga and Yamuna canals, the Terai factory belt of Rudrapur-Pantnagar and Kashipur, and the foothill gateway of Kotdwar. Pharmaceutical, food, electrical and automotive plants have grown on the estates, and hospitals, institutes and hotels add rooms that need steady air. Summers are hot, the monsoon is very heavy and winter nights are cold with fog, so a pharmaceutical store or a cold chain meets heat, damp and cold in a single year. The city pages that follow set out each estate, the stores worth watching first and the loggers that fit.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Food and agro processing",
    "Electrical and automotive plants",
    "Hospitals and pilgrim hospitality",
  ],
  citiesServed: ["Haridwar", "Dehradun", "Roorkee", "Rudrapur-Pantnagar", "Kashipur", "Kotdwar"],
  supportNote:
    "Supply, installation support and site visits for Uttarakhand sites are arranged from our Mumbai office. Tell us the town, the estate and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Uttarakhand?",
      answer:
        "Haridwar, Dehradun, Roorkee, Rudrapur-Pantnagar, Kashipur and Kotdwar each have a city page. A site in any other town of the state can be raised by writing to us through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a logger work in a hill town with a weak signal?",
      answer:
        "A GSM logger reports over the mobile network and keeps recording on its battery when the signal drops, then sends the stored readings once coverage returns.",
    },
    {
      question: "Why plan for a pharma cold chain through the foothills?",
      answer:
        "A lorry can leave a hot plain and climb from a hot plain into cold, damp air on a single road, so a logger in the load shows the whole range the goods met and not just the temperature at the depot.",
    },
  ],
  listing: [
    { slug: "haridwar", text: "The pilgrim city on the Ganga with a large factory estate of electrical, pharmaceutical and food plants and busy hotels." },
    { slug: "dehradun", text: "The capital of the Doon valley, with pharma and technology estates at Selaqui and Sahaspur, hospitals, institutes and hotels." },
    { slug: "roorkee", text: "An engineering and canal town between Haridwar and Saharanpur, with an engineering institute, a research institute and industrial areas." },
    { slug: "rudrapur-pantnagar", text: "The Terai factory belt, with the Pantnagar SIDCUL estate, Rudrapur mills and dairies and an agricultural university." },
    { slug: "kashipur", text: "A Terai town on the Moradabad road with SIDCUL and older estates, sugar and rice mills and a grain market." },
    { slug: "kotdwar", text: "The foothill gateway to Garhwal, where goods from the plains wait at the railway terminus for hill-bound lorries." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
