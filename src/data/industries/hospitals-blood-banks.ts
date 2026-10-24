// /industries/hospitals-blood-banks | Industry
import type { Industry } from "../industries.ts";
import type { IndustryContent } from "../industry-content.ts";

export const industry: Industry = {
  slug: "hospitals-blood-banks",
  name: "Hospitals & Blood Banks",
  summary: "Round-the-clock monitoring for blood, medicines and lab samples.",
  applications: ["Blood banks", "Pharmacies", "Medicine stores", "Laboratories"],
  recommended: ["setu", "nakshatra", "external-hooter-with-door-sensor"],
  whyItMatters:
    "Blood products, medicines and samples are stored around the clock, including nights and weekends when fewer staff are on duty. Automatic alerts and an on-site hooter make sure a failing refrigerator or an open door is noticed before stock is lost.",
  image: "/images/industries/hospitals-blood-banks.jpg",
};

export const content: IndustryContent = {
  metaTitle: "Temperature & Humidity Data Logger for Hospitals",
  h1: "Temperature and Humidity Data Logger for Hospitals & Blood Banks",
  lead: "A temperature and humidity data logger for hospitals records fridges, pharmacies and labs continuously, so no department relies on manual rounds.",
  helpsHeading: "Temperature and Humidity Records Across Departments",
  metaDescription:
    "Temperature and humidity data logger for hospitals and blood banks: live alerts, on-site hooter alarms and door-open monitoring. Get a solution.",
  challenges: [
    "Blood, medicines and samples are stored around the clock, including when fewer staff are on duty.",
    "Refrigerators and stores are spread across departments and are hard to check by hand.",
    "A door left open can go unnoticed until stock is affected.",
  ],
  helps: [
    {
      title: "An alarm staff can hear",
      text: "The external hooter gives an audible alarm on any excursion and supports up to 4 door sensors.",
    },
    {
      title: "Every department on one screen",
      text: "Devices are organised by organisation, site, room and device, with role-based access for each team.",
    },
    {
      title: "Escalation if nobody responds",
      text: "An unacknowledged alert moves up from Level 1 to Level 2 and Level 3.",
    },
  ],
  compliance:
    "Complete digital records with an audit trail support internal quality audits. We do not claim conformity with any specific hospital standard.",
  faqs: [
    {
      question: "Which loggers suit blood bank refrigerators?",
      answer:
        "Setu records temperature for an individual unit. Nakshatra adds humidity for rooms and stores where both matter.",
    },
    {
      question: "Can staff be warned on site, not only by phone?",
      answer:
        "Yes. The external hooter sounds an alarm in the room when a limit is crossed or a door stays open beyond the set time.",
    },
    {
      question: "Can the pharmacy, lab and blood bank be viewed together?",
      answer:
        "Yes. All devices sit in one location hierarchy, and each user sees what their role allows.",
    },
    {
      question: "Which data logger with alarm suits a hospital pharmacy?",
      answer:
        "The external hooter gives an audible alarm on any excursion and supports up to 4 door sensors. Choose Nakshatra where humidity matters as well as temperature, and our team will confirm the hooter works with your model when we prepare your quote.",
      link: { href: "/products/accessories", text: "See the data logger with alarm accessories" },
    },
  ],
};
