// /data-logger-uttar-pradesh | State hub | parent: India
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "uttar-pradesh",
  name: "Uttar Pradesh",
  type: "state",
  intro:
    "A logger in Uttar Pradesh is most often placed in electronics plants, server rooms and warehouses. Uttar Pradesh is a large state, and the part we serve first lies at either end of its range: the planned townships of Noida and Greater Noida on the eastern edge of the capital region, and the state capital, Lucknow, on the central plain. The first holds electronics assemblers, data centre operators and distribution warehouses in sector blocks; the second holds hospitals, medicine stockists and cold stores that supply districts a long drive away. Summers are fierce, the monsoon heavy and winter nights are cold enough to chill unheated stores. The pages listed below describe what that means for each place and for the industrial areas around it.",
  localIndustries: [
    "Electronics manufacturing",
    "Data centres and server rooms",
    "Warehousing and distribution",
  ],
  citiesServed: ["Noida", "Lucknow"],
  supportNote:
    "Supply, installation support and site visits for Uttar Pradesh sites are arranged from our Mumbai office. Write to us with the sector and what you store.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Uttar Pradesh?",
      answer:
        "Noida, Lucknow and eight more cities have full pages, and Greater Noida and Sahibabad have area pages under Noida. More of the state will follow with pages of its own.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Do you cover places in the state that are not listed?",
      answer:
        "Send the town, the stores and a contact through the enquiry form, WhatsApp or a call, and we confirm what we can supply and how a visit would be arranged.",
    },
    {
      question: "Can monitoring cover both the Noida area and Lucknow from one login?",
      answer:
        "Yes. Each site appears on the dashboard with its own alert recipients, and a regional manager can open every site in a single list and export reports for any room.",
    },
  ],
  listing: [
    { slug: "noida", text: "A planned township of electronics makers, data centres and distribution warehouses laid out in numbered sectors." },
    { slug: "lucknow", text: "The state capital, with hospitals, medicine stockists and cold stores that supply towns across a wide region." },
    { slug: "ghaziabad", text: "The eastern gateway to Delhi, with Loni, Meerut Road and Kavi Nagar units, highway warehouses and hospitals on the Delhi side." },
    { slug: "kanpur", text: "An old Ganga industrial city of Jajmau tanneries, Panki chemical and engineering estates and wholesale markets on the Delhi–Kolkata line." },
    { slug: "agra", text: "A Taj Mahal tourist city with hotel kitchens, potato cold stores, a footwear trade and the foundry and Sikandra estates." },
    { slug: "varanasi", text: "A river pilgrimage city of silk weavers, a teaching hospital and the Ramnagar and Chandpur estates, in damp, flood-prone air." },
    { slug: "meerut", text: "A doab trading city and sports-goods centre, with the Partapur and Modipuram estates, jaggery yards and a fast road link to Delhi." },
    { slug: "prayagraj", text: "Also known as Allahabad, a confluence city of fair-time camps, courts, publishers and the Naini estate, in fierce heat and winter fog." },
    { slug: "bareilly", text: "A Rohilkhand market city of furniture, zari embroidery and kite string, with the Bhojipura estate and a veterinary research campus." },
    { slug: "moradabad", text: "The brass city on the Ramganga, where polishing, plating and export packing along Kanth Road meet damp air that tarnishes metal." },
  ],
  areaListing: [
    { slug: "greater-noida", text: "A newer township south-east of Noida with large plots and planned industrial and logistics zones spread far apart." },
    { slug: "sahibabad", text: "An older estate across the eastern boundary of Delhi, where engineering, food, electrical and transport units use every plot to the limit." },
  ],
  indexable: true,
};

export default state;
