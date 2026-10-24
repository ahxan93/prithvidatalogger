// /data-logger-al-baha-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-baha-region",
  name: "Al Baha Region",
  type: "state",
  intro:
    "A logger in Al Baha Region mostly serves honey, fruit and farm produce, as well as food depots and retail distribution. The Al Baha Region is a small mountainous strip in the south-west of the kingdom that drops from cool highlands to the Red Sea plain. Al Baha, the regional capital, has markets, hospitals, hotels and distribution depots, and the terraced farms of the highlands grow fruit, honey and other produce. Summers are mild in the mountains, mist and rain settle over the slopes in the wet season, and winter nights are cold, so storage rooms meet damp and cool air more than the extreme heat of the plains. Roads wind through steep terrain and lengthen every delivery of medicines and chilled food. The Al Baha page below covers the highland farms, hotels and clinics.",
  localIndustries: [
    "Honey, fruit and farm produce",
    "Food depots and retail distribution",
    "Hospitals and medicine supply",
    "Hospitality kitchens",
  ],
  citiesServed: ["Al Baha"],
  supportNote:
    "Set-up, alert rules and user access for Al Baha Region sites are arranged remotely by call or video. Give us the town and a short note on what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Baha Region?",
      answer:
        "Al Baha has a city page. A town in the region not yet written up can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why is humidity useful in a cool highland store?",
      answer:
        "Mist and rain keep the air damp, and cartons, grain and linen take on moisture in cool stores too, so a humidity trend shows when a room needs drying or better ventilation.",
    },
    {
      question: "Can a small clinic or shop use a single logger?",
      answer:
        "Yes. One logger with an alert to a phone is enough for a single medicine fridge or a chiller, and further points can be added to the same account later.",
    },
  ],
  listing: [
    { slug: "al-baha", text: "A cool, misty highland city of terraced fruit and sidr honey, resort kitchens, a university and a central hospital." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
