// /data-logger-tamil-nadu | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "tamil-nadu",
  name: "Tamil Nadu",
  type: "state",
  intro:
    "A logger in Tamil Nadu must handle coastal humidity. Tamil Nadu's storage lies in several different parts of the state. The coast around Chennai holds electronics, automotive and pharmaceutical plants and the warehouses that serve the ports, all in salty, humid air. Coimbatore, Tiruppur, Erode and Salem in the west hold mills, knitwear exporters, turmeric stores, steel and starch works where humidity swings decide how stock behaves. Vellore is a hospital and leather town in the north-east, and Tuticorin is a port with seafood, salt and chemicals. Tiruchirappalli and Madurai in the centre and south combine heavy fabrication, hospitals and flower and vegetable markets under long, dry heat. In the north-west, Hosur is a vehicle, component and electronics cluster beside the Bengaluru border, with cut-flower growers who need cold rooms of their own. The pages below describe each city and the three area pages written for Chennai.",
  localIndustries: [
    "Electronics and automotive manufacturing",
    "Pharmaceutical manufacturing",
    "Port logistics and distribution",
    "Vehicle components and cut-flower exports",
    "Knitwear, steel and starch works",
  ],
  citiesServed: ["Chennai", "Coimbatore", "Hosur", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Tuticorin"],
  supportNote:
    "Supply, installation support and site visits for Tamil Nadu sites are arranged from our Mumbai office. Send us the estate and the stores that need watching.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Tamil Nadu?",
      answer:
        "Chennai, Coimbatore, Hosur, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Vellore and Tuticorin have city pages, and Ambattur, Sriperumbudur and Oragadam have area pages under Chennai. More of the state may follow.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does humidity matter more in the west than the coast?",
      answer:
        "On the coast heat and humidity are both high all year, so both are watched together. In Coimbatore temperatures stay moderate and moisture in yarn and fabric swings with the air, so humidity decides how stock behaves.",
    },
    {
      question: "Can an exporter share a record with an overseas buyer?",
      answer:
        "Reports for a room or a lot can be exported as PDF, Excel or CSV for any period, so a buyer receives the same dated record the plant sees.",
    },
  ],
  listing: [
    { slug: "chennai", text: "A port city whose estates fan inland, with electronics, automotive, pharmaceutical and food plants and warehouses that stage goods for the sea." },
    { slug: "coimbatore", text: "A city of spinning mills, pump and motor makers, foundries and hospitals in which humidity swings matter as much as temperature." },
    { slug: "hosur", text: "A border town of vehicle plants, foundries, electronics units and flower cold rooms in the SIPCOT complexes, a short drive from Bengaluru." },
    { slug: "madurai", text: "A temple and market city of flower and vegetable markets, Kappalur and Tirumangalam estates, garment workshops and large hospitals in the dry south." },
    { slug: "tiruchirappalli", text: "A central crossroads of boiler and power-equipment plants, fabrication estates, railway workshops, wholesale markets and hospitals on the Cauvery." },
    { slug: "salem", text: "A hill-ringed city of stainless steel, sago and starch mills, handloom and power-loom cloth, mango trade and a large government hospital." },
    { slug: "tiruppur", text: "The knitwear cluster of western Tamil Nadu, with garment units along Avinashi Road, dyeing houses and export packing sheds." },
    { slug: "erode", text: "A turmeric and cloth market on the Cauvery, with the Brough Road textile trade, the Perundurai estate and carpet weavers of Bhavani." },
    { slug: "vellore", text: "A hospital town around a famous medical college and a large university, with the leather and footwear belt of Ranipet and Ambur close by." },
    { slug: "tuticorin", text: "The south-east port city of containers, salt pans, seafood cold stores, chemical stores and a SIPCOT complex in hot, salty air." },
  ],
  areaListing: [
    { slug: "ambattur", text: "A north-western estate of engineering shops, electronics assemblers and small suppliers on compact plots in humid coastal air." },
    { slug: "sriperumbudur", text: "A south-western manufacturing hub of electronics and automotive plants on large plots inside planned industrial parks." },
    { slug: "oragadam", text: "An industrial park on the south-western corridor with automotive, electronics and distribution units that move goods toward the ports." },
  ],
  indexable: true,
};

export default state;
