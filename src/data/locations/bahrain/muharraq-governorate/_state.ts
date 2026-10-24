// /data-logger-muharraq-governorate | State hub | parent: Bahrain
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "muharraq-governorate",
  name: "Muharraq Governorate",
  type: "state",
  intro:
    "A logger in Muharraq Governorate mostly serves food shops and sweet makers, as well as clinics and pharmacies. The Muharraq Governorate covers Muharraq Island and the shore around it to the north-east of Manama, joined to the capital by causeways. Narrow lanes of old houses and sweet shops sit close to newer housing towns, a seaside district with a harbour and warehouse zone lies at the south-east tip, and the island's airport occupies flat ground in the middle. Summers are long, very hot and humid, winters are mild, and haze and salt blow across the low land from every side. Food, medicines and general freight sit in small shops, home kitchens and larger sheds in that air. The pages below cover the old city, Hidd and its harbour district, Arad, Busaiteen and the Amwaj Islands.",
  localIndustries: [
    "Food shops and sweet makers",
    "Clinics and pharmacies",
    "Warehousing and freight",
    "Fishing and seafood trade",
  ],
  citiesServed: ["Muharraq","Hidd","Arad","Busaiteen","Amwaj Islands"],
  supportNote:
    "Enquiries from the Muharraq Governorate are handled through the enquiry form, Call or WhatsApp. Give the town, the rooms and the goods involved, and our reply outlines what seems suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Muharraq Governorate?",
      answer:
        "Muharraq, Hidd, Arad, Busaiteen and the Amwaj Islands have city pages. The airport sits under Muharraq, and Khalifa Bin Salman Port and the Bahrain Logistics Zone sit under Hidd. Another town can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why do island sites need extra attention to humidity?",
      answer:
        "Moist sea air reaches every building on a low island, so dry goods soften and cold rooms sweat when doors open, and a humidity trend beside the temperature shows what a plain thermometer would miss.",
    },
    {
      question: "What happens to the record if the WiFi at a site drops?",
      answer:
        "The logger goes on recording on its battery and keeps the readings, so the gap in connection leaves no gap in the record once the site is online again.",
    },
  ],
  listing: [
    { slug: "muharraq", text: "The old island town of narrow lanes, sweet shops and bakeries, with dense housing and the airport on the flat ground to its north." },
    { slug: "hidd", text: "The seaside town at the south-east tip, with fishing boats, a harbour and a warehouse district nearby." },
    { slug: "arad", text: "A housing town on the south-western shore of the island, with bayside streets, neighbourhood shops and clinics." },
    { slug: "busaiteen", text: "A town on the northern coast of the island, with a long shore road, family kitchens, shops and boat yards." },
    { slug: "amwaj-islands", text: "A group of reclaimed islands off the north-east coast, with waterside cafes, apartment blocks, marinas and clinics in salty, humid air." },
  ],
  areaListing: [
    { slug: "bahrain-international-airport", text: "The island's airport on flat ground north of the old town, described only through the stores, halls and vehicles a logger user might look after." },
    { slug: "khalifa-bin-salman-port", text: "The harbour area at the south-east tip of the island, covered only through the goods a logger user may keep on quays and in sheds." },
    { slug: "bahrain-logistics-zone", text: "A warehouse zone beside the south-east harbour, covered only through the pallets, cold rooms and yards a logger user could look after." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
