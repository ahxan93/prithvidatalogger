// /data-logger-riyadh-region | State hub | parent: Saudi Arabia
import type { LegacyLocationNode } from "../../_types.ts";

const state: LegacyLocationNode = {
  slug: "riyadh-region",
  name: "Riyadh Region",
  type: "state",
  intro:
    "A logger in Riyadh Region mostly serves pharmaceutical and medical warehousing, as well as food, dairy and farm produce. The Riyadh Region fills the centre of the kingdom, a high desert plateau where the capital is surrounded by farm oases such as Al Kharj, the historic town of Diriyah, the university town of Al Majmaah and smaller trading towns along the highways. Almost everything stored here has travelled far, whether by road from the ports or by the rail line that links Riyadh's dry port to the Gulf coast, so warehouses for medicines, food and general cargo are the region's main storage rooms. Summers are extremely hot and dusty, winter nights are cool, and rain is rare but sudden. Industrial cities around the capital add plants with halls of their own. The page for each place names the rooms we would watch first.",
  localIndustries: [
    "Pharmaceutical and medical warehousing",
    "Food, dairy and farm produce",
    "Industrial-city plants and dry-port cargo",
    "Hospitals and retail distribution",
  ],
  citiesServed: ["Riyadh", "Al Kharj", "Diriyah", "Al Majmaah"],
  supportNote:
    "Set-up, alert rules and user access for Riyadh Region sites are arranged remotely by call or video. Tell us the town and what the rooms hold.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Riyadh Region?",
      answer:
        "Riyadh, Al Kharj, Diriyah and Al Majmaah each have a city page, and Riyadh also has pages for its dry port and its 1st Industrial City. Pages for other towns are added as they are written, and a site anywhere in the region can be raised through the enquiry form.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Why does desert dust matter for a logger in a warehouse?",
      answer:
        "Fine dust settles on vents and probe tips, so we place the logger body away from the dustiest doors, keep probes sealed and suggest wiping them at routine cleaning, which keeps the readings true.",
    },
    {
      question: "Can sites in several Riyadh Region towns share one dashboard?",
      answer:
        "Yes. Each site is a point on the same account with its own alert contacts, so a head of operations sees a distribution centre in the capital and a farm store in an oasis together in one list.",
    },
  ],
  listing: [
    { slug: "riyadh", text: "The inland capital, where long road and rail journeys end in pharmaceutical, hospital and food warehouses under extreme dry heat." },
    { slug: "al-kharj", text: "A farm city on the plain south-east of the capital, with dairy, poultry and produce chilled close to where it is grown." },
    { slug: "diriyah", text: "A historic oasis town on the capital's north-western edge, with visitor kitchens, heritage archive stores and palm farms in the wadi." },
    { slug: "al-majmaah", text: "The oasis town of the Sudair region, with date stores, farms, a university campus and a newer industrial area." },
  ],
  areaListing: [
    { slug: "riyadh-dry-port", text: "The rail-linked container terminal where imported cargo is cleared and handed from train to truck in the desert sun." },
    { slug: "riyadh-1st-industrial-city", text: "An early industrial estate on the capital's edge, with food, plastics and packaging plants and warehouses under hot metal roofs." },
  ],
  // Noindex while it has fewer than two built child pages; promoted automatically (see below).
  indexable: false,
};

export default state;
