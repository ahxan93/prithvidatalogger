// /data-logger-al-wakrah-municipality | State hub | parent: Qatar
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "al-wakrah-municipality",
  name: "Al Wakrah Municipality",
  type: "state",
  intro:
    "A logger in Al Wakrah Municipality mostly serves fish, food and market trade, as well as industrial and building-material storage. Al Wakrah Municipality lies to the south of the capital along the Gulf coast, a mix of old fishing waterfront, new suburbs and industrial shoreline. Al Wakrah itself is a coastal town with a restored market, a harbour for fishing boats and a long beach, Mesaieed is an industrial town beside a port with sand dunes rolling away behind it, and Al Wukair is a growing inland suburb on the road from the capital. Summers are long, very hot and humid on the shore, winters mild, and dust and haze come in some seasons. Food, fish, chemicals, building materials and medicines wait in shops, sheds and warehouses in such heat. The pages below cover the three towns and the industrial city at Mesaieed.",
  localIndustries: [
    "Fish, food and market trade",
    "Industrial and building-material storage",
    "Clinics, pharmacies and care centres",
    "Warehouses and workshops",
  ],
  citiesServed: ["Al Wakrah","Mesaieed","Al Wukair"],
  supportNote:
    "Enquiries from Al Wakrah Municipality are handled through the enquiry form, Call or WhatsApp. Tell us which town, which rooms and how they are cooled, and we reply with what looks suitable for the site.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Al Wakrah Municipality?",
      answer:
        "Al Wakrah, Mesaieed and Al Wukair each have a city page, and the Mesaieed Industrial City has an area page under Mesaieed. Another town in the municipality can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How is a fishing waterfront different from an industrial shoreline for logger set-up?",
      answer:
        "A fishing waterfront needs ice stores and cold boxes watched against heat and salt damp, while an industrial shoreline needs materials stores and laboratories watched against labelled limits, so probes, mounting and alert rules differ.",
    },
    {
      question: "Is one dashboard enough for sites in separate towns?",
      answer:
        "Yes. Each site is a separate point on one dashboard, alerts go to whoever looks after that room, and a manager sees every town together in one exported report.",
    },
  ],
  listing: [
    { slug: "al-wakrah", text: "A coastal town with a restored market, a fishing harbour and a long beach, in hot, humid summers and salt air." },
    { slug: "mesaieed", text: "An industrial coastal town beside a port, with dunes behind it, workshops, canteens and a hospital." },
    { slug: "al-wukair", text: "A growing inland suburb on the road from the capital, with homes, farms, shops and workshops in dry, dusty heat." },
  ],
  areaListing: [
    { slug: "mesaieed-industrial-city", text: "The planned industrial city at Mesaieed, with chemical, materials and parts stores, laboratories and workshops beside the shore." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
