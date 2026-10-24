// /data-logger-gujarat | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "gujarat",
  name: "Gujarat",
  type: "state",
  intro:
    "A logger in Gujarat is most often asked for by pharmaceutical, chemical and dairy sites. Gujarat's industry runs along the corridor between Ahmedabad and the coast, from the estates around the state's largest city to the chemical belt of the south. Ahmedabad's older eastern districts and newer western estates hold pharmaceutical, chemical and engineering units, while Vapi, Ankleshwar and Surat to the south concentrate dyes, intermediates, bulk drugs and textile processing. The north is hot and dry, the south receives a heavier monsoon and a humid coast, and plants on both ends keep stores that need an unbroken record. This page lists every Gujarat city and area page we have written, each with a short description, so a plant head or a quality manager can go straight to the place that matches their site.",
  localIndustries: [
    "Pharmaceutical manufacturing",
    "Chemical and dye industry",
    "Food processing and dairy",
  ],
  citiesServed: ["Ahmedabad", "Vapi", "Ankleshwar", "Surat"],
  supportNote:
    "Supply, installation support and site visits for Gujarat estates are arranged from our Mumbai office. Write to us with the estate and what you store.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Gujarat?",
      answer:
        "Thirteen cities have full pages, and the estates of Ahmedabad, Vapi, Ankleshwar and Surat have area pages too. Open the one nearest your plant, or send the estate through the enquiry form if yours is not listed.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does the south of the state need different advice from the north?",
      answer:
        "The south is wetter and more humid, so damp matters as much as heat in its stores, while the north is drier and swings between hot afternoons and cooler nights. Limits and probe positions follow that difference.",
    },
    {
      question: "Can a group with plants in Ahmedabad and Vapi use one account?",
      answer:
        "Yes. Each plant is its own site with its own alert recipients, and a group quality head can open every site in one list and compare records side by side.",
    },
  ],
  listing: [
    { slug: "ahmedabad", text: "The state's largest city, with the older eastern estates of Naroda and Vatva and the newer western estates of Changodar and Sanand." },
    { slug: "vapi", text: "The first large industrial town on the Gujarat side of the border, dense with chemical, dye, pharmaceutical and paper units." },
    { slug: "ankleshwar", text: "A chemical district on the Narmada plain with its own large estate and the neighbouring estates of Panoli, Jhagadia and Dahej." },
    { slug: "surat", text: "A city of fabric and processing houses, with the Pandesara and Sachin estates and the heavy-industry belt at Hazira." },
    { slug: "vadodara", text: "Also called Baroda, a river city of pharmaceutical, equipment and chemical estates at Makarpura, Waghodia, Savli and Nandesari, beside a refinery belt." },
    { slug: "rajkot", text: "The machine-making heart of Saurashtra, with engine, pump and auto-parts estates at Aji and Metoda, oil mills and a jewellers' market." },
    { slug: "bharuch", text: "An old Narmada river port town between the chemical estates, with its own small units, hospitals and cotton stores near a flood-prone bank." },
    { slug: "gandhinagar", text: "The planned capital of numbered sectors, where GIFT City data halls, institute laboratories and government pharmacies outnumber factory stores." },
    { slug: "halol-panchmahal", text: "An eastern district of vehicle component and pharmaceutical plants at Halol and Kalol, a cooperative dairy at Godhra and a heritage hill shrine." },
    { slug: "morbi", text: "The ceramic tile and sanitaryware capital on the Machchhu river, where kilns, glaze stores and tall export warehouses share a scorching climate." },
    { slug: "jamnagar", text: "A gulf-coast city of brass-parts estates at Dared and a refinery belt, whose suppliers, port godowns and hospitals work in salty, dry heat." },
    { slug: "mundra", text: "A Kutch container port with a special economic zone, freight stations and cold rooms, where goods in transit wait in arid heat and salt wind." },
    { slug: "kandla", text: "Deendayal Port and its twin town of Gandhidham, with oil tank farms, bonded sheds, timber yards and the commercial markets of Kutch." },
  ],
  areaListing: [
    { slug: "naroda", text: "An older north-eastern estate where engineering, plastics and chemical units sit among neighbourhoods and a large produce market." },
    { slug: "vatva", text: "A crowded south-eastern chemical estate of dye, pigment and intermediate makers on repeatedly divided plots." },
    { slug: "changodar", text: "A western highway estate known mainly for pharmaceutical manufacturing, with logistics yards beside it." },
    { slug: "sanand", text: "A newer set of estates with wide roads and large plots for automotive, electronics, food and pharmaceutical plants." },
    { slug: "vapi-gidc", text: "The numbered phases of the Vapi estate, with chemical, dye, pharmaceutical intermediate, paper and plastics units on narrow plots." },
    { slug: "ankleshwar-gidc", text: "A large chemical estate of big plots, tank farms and plant laboratories on the Narmada plain." },
    { slug: "dahej", text: "A coastal industrial region around a port, with large chemical plants and port-side warehouses spread over long distances." },
    { slug: "sachin", text: "A southern Surat estate where textile processing, chemical and engineering units work in humid, monsoon-heavy air." },
  ],
  indexable: true,
};

export default state;
