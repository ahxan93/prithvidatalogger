// /data-logger-kuwait | Country hub | parent: none (top level)
import type { LegacyLocationNode } from "../_types.ts";

const country: LegacyLocationNode = {
  slug: "kuwait",
  name: "Kuwait",
  type: "country",
  intro:
    "A logger in Kuwait mostly serves co-operative stores, pharmacies and hospitals. Kuwait is compact and dense: a single urban area around Kuwait City, a port, and industrial and logistics zones that serve the whole country. Food and medicine arrive from abroad, wait in warehouses and cold stores and move on to hospitals, pharmacies, supermarkets and kitchens, all through long, hot summers. Loggers that read temperature and humidity and send alerts to phones and email fit these rooms, and your team can be helped to set them up remotely. The pages below follow the governorates, beginning with Al Asimah and Kuwait City, and the enquiry form is the quickest way to describe your site and get a reply from the team.",
  localIndustries: [
    "Food retail and co-operative stores",
    "Pharmacies and medical stores",
    "Hospitals and laboratories",
    "Warehousing",
  ],
  citiesServed: ["Kuwait City", "Hawalli", "Farwaniya", "Ahmadi", "Jahra"],
  supportNote:
    "Enquiries from Kuwait are handled through the enquiry form, Call or WhatsApp. Tell us how many rooms and units you need to cover, and our reply covers what seems suitable and how remote set-up support would run.",
  faqs: [
    {
      question: "Where can I find a temperature data logger in Kuwait?",
      answer:
        "Al Asimah, Hawalli, Farwaniya, Ahmadi, Jahra and Mubarak Al-Kabeer governorates have their own pages, with Kuwait City, Hawalli, Salmiya, Farwaniya, Khaitan, Jleeb Al-Shuyoukh, Ahmadi, Fahaheel, Wafra, Khiran, Jahra, Sulaibiya, Sabah Al Salem and Mubarak Al-Kabeer and their districts beneath. If your site is somewhere else, write through the enquiry form, Call or WhatsApp with what you store and we answer with what looks workable.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "What alert limits suit a store in extreme summer heat?",
      answer:
        "A high limit with a short delay warns early when a cooling unit is struggling, and a low limit protects stock that could chill when a unit overshoots. We tune both with your team after a few weeks of readings.",
    },
    {
      question: "Can records be shared with a customer or inspector?",
      answer:
        "Reports for any room and any period can be exported as PDF, Excel or CSV, so a quality manager can hand over a dated log without retyping.",
    },
  ],
  listing: [
    { slug: "al-asimah-governorate", text: "The capital governorate on Kuwait Bay, with a harbour city of towers, markets and hospitals, a commercial port and an industrial area, in extreme summer heat." },
    { slug: "hawalli-governorate", text: "The dense commercial and residential governorate south-east of the capital, with busy shopping streets, apartment blocks, clinics and a long seafront, in blazing summer heat." },
    { slug: "farwaniya-governorate", text: "The crowded inland governorate beside the capital, with busy markets, dense apartment districts, industrial and warehouse areas and the airport, in blazing dry summers and blowing dust." },
    { slug: "ahmadi-governorate", text: "The long southern governorate along the Gulf coast, with a green planned town and a busy seafront commercial town, in blazing summers and humid shore air." },
    { slug: "jahra-governorate", text: "The wide western governorate beyond the bay, with a large town of farms, livestock yards and a hospital, a big industrial and warehouse district, and trading yards, in blazing dry heat." },
    { slug: "mubarak-al-kabeer-governorate", text: "The coastal residential governorate south-east of the capital, with quiet suburbs of villas, apartment blocks, schools and clinics along the Gulf shore, in blazing dry summers and humid shore air." },
  ],
  indexable: true,
};

export default country;
