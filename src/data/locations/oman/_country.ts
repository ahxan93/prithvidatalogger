// /data-logger-oman | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "oman",
  name: "Oman",
  type: "country",
  intro:
    "A logger in Oman mostly serves seafood stores, pharmacies and port warehouses. Oman stretches along a long coastline and across a vast interior, with ports on the Gulf of Oman and the Arabian Sea, a capital region around Muscat, and towns joined by long roads where goods can spend hours in vehicles. Pharmacies, hospitals, food importers and distributors keep rooms that must hold their range through a hot, humid coast and a drier, hotter interior, while mountain towns add swings between cold nights and warm days. Temperature and humidity loggers that send alerts to phones and email fit these rooms, and remote help is available for your team. The pages below follow the governorates, beginning with Muscat, and the enquiry form is the quickest way to describe your site.",
  localIndustries: [
    "Fisheries and seafood cold storage",
    "Food distribution",
    "Hospitals and pharmacies",
    "Port and logistics warehousing",
  ],
  citiesServed: ["Muscat", "Sohar", "Salalah", "Nizwa"],
  supportNote:
    "Enquiries from Oman are handled through the enquiry form, Call or WhatsApp. Describe the site, the stock and the cooling, and our reply covers what seems suitable for Oman and how remote set-up support would run.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Oman?",
      answer:
        "Muscat, Al Batinah North, Al Batinah South, Ad Dakhiliyah, Ad Dhahirah, Al Buraimi, Dhofar, Al Wusta, Ash Sharqiyah South, Ash Sharqiyah North and Musandam governorates have their own pages, with their cities and districts beneath. If your site is somewhere else, write to us through the enquiry form, Call or WhatsApp with what you store, and we answer with what looks suitable.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How are loggers set up for a site far from a main city?",
      answer:
        "Loggers are registered to your dashboard, and we set up rooms, limits and alert contacts with your team remotely, so no one needs to travel to start recording.",
    },
    {
      question: "Can a vehicle be monitored on a long road trip?",
      answer:
        "A logger in the load records the whole journey, and the report can be exported by trip, so the heat a load met on a long road is on record when it arrives.",
    },
  ],
  listing: [
    { slug: "muscat-governorate", text: "The capital region on the Gulf of Oman, with a harbour city, an old market town, hospitals, shopping streets and industrial districts between the sea and bare mountains." },
    { slug: "al-batinah-north-governorate", text: "The northern stretch of the Batinah coast, with a historic port city, an industrial estate, farming towns of date palms and fishing harbours between the sea and the mountains." },
    { slug: "al-batinah-south-governorate", text: "The southern stretch of the Batinah, with a coastal market town and an industrial area, and foothill oasis towns of date palms and old irrigation channels below the mountains." },
    { slug: "ad-dakhiliyah-governorate", text: "The interior below the high mountains, with old oasis towns, date groves, irrigation channels, old lanes, markets and an industrial estate, in hot days and cold winter nights." },
    { slug: "ad-dhahirah-governorate", text: "The dry plain on the western side of the mountains, with an oasis town at the edge of the desert, date farms, markets and an industrial area, in fierce summer heat." },
    { slug: "al-buraimi-governorate", text: "The inland oasis governorate in the north-west, with a trading city of shops and date gardens and an industrial area, in hot, dry summers." },
    { slug: "dhofar-governorate", text: "The far south on the Arabian Sea, with a coastal city of coconut and banana groves, a monsoon season of mist and drizzle, a port, a free zone and an industrial estate." },
    { slug: "al-wusta-governorate", text: "The central desert and coast, with a young port and economic-zone town on the Arabian Sea among gravel plains, in dry heat and sea wind." },
    { slug: "ash-sharqiyah-south-governorate", text: "The south-eastern coast, with an old dhow-building port city, a fishing harbour and an industrial estate, in hot, humid sea air." },
    { slug: "ash-sharqiyah-north-governorate", text: "The inland east, with oasis towns of date palms, old markets and irrigation channels at the edge of the great dunes, in dry heat and cold winter nights." },
    { slug: "musandam-governorate", text: "The rocky northern peninsula, with a port town among steep inlets and bare cliffs, fishing boats and dhows, in hot, humid weather." },
  ],
  indexable: true,
};

export default country;
