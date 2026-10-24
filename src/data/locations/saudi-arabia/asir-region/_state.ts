// /data-logger-asir-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "asir-region",
  name: "Asir Region",
  type: "state",
  intro:
    "A logger in Asir Region mostly serves hospitals and medicine distribution, as well as fruit, vegetable and food depots. The Asir Region occupies the mountains of the south-west, where the land rises steeply from the Red Sea plain to cool, green highlands. Abha, the regional capital, and Khamis Mushait, the larger trading town beside it, hold hospitals, markets, hotels and distribution depots, and farms on the terraces grow fruit and vegetables for the kingdom. Summers are mild in the highlands, the rainy season brings mist and cloud, and winter nights are cold, so the region has an unusual mix of cool storage and damp. Mountain roads lengthen every delivery of medicines and chilled food. Open a town below to see its hotel, hospital and depot rooms and the loggers we would start with.",
  localIndustries: [
    "Hospitals and medicine distribution",
    "Fruit, vegetable and food depots",
    "Hospitality and tourism kitchens",
    "Retail distribution",
  ],
  citiesServed: ["Abha", "Khamis Mushait", "Bisha"],
  supportNote:
    "Set-up, alert rules and user access for Asir Region sites are arranged remotely by call or video. Write to us with the town and a note of what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Asir Region?",
      answer:
        "Abha, Khamis Mushait and Bisha each have a city page. Towns such as Sabya and the villages of the highlands can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Does a cool, misty climate mean a store does not need monitoring?",
      answer:
        "Cool air still carries damp, and cartons, flour and fabrics take on moisture in cloud and rain, while a refrigerator can fail unnoticed, so humidity and temperature records both matter.",
    },
    {
      question: "How are mountain deliveries of chilled food tracked?",
      answer:
        "A logger placed in the load records the journey, and the report shows how long goods stood in a vehicle on the climb, which helps a supplier answer a buyer's questions.",
    },
  ],
  listing: [
    { slug: "abha", text: "The mountain capital of cool, misty air, with hotel kitchens, a central hospital, a university and terraced fruit gardens." },
    { slug: "khamis-mushait", text: "The commercial hub of the south-west, with wholesale depots, poultry and dairy, hospitals, campuses and an industrial area." },
    { slug: "bisha", text: "A valley town of date farms behind a large dam, with a university campus, clinics and a road junction." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
