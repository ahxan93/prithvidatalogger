// /data-logger-kanpur | City | parent: Uttar Pradesh
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "kanpur",
  name: "Kanpur",
  type: "city",
  intro:
    "Kanpur is the old industrial city on the Ganga, long known for leather and textiles, and it is still the largest commercial centre of central Uttar Pradesh. Tanneries and leather works cluster at Jajmau on the river bank, chemical and engineering units fill the Panki and Dada Nagar estates, and the wholesale markets at Naya Ganj and Collectorganj move grain, cloth and general goods across the region. A temperature data logger in Kanpur might sit in a tannery chemical store, a medicine wholesaler's room or a hospital fridge. The city is on the main railway and highway between Delhi and Kolkata, so goods pass through it all year. Summers are fierce, winter fog is thick and the monsoon is damp, and old buildings hold heat well after dark.",
  climateAngle:
    "Summers are fierce and dry, winters bring thick fog and cold nights, and the monsoon fills old buildings with damp, so a store can run hot in May and clammy in August without anyone noticing between rounds.",
  areas: [
    {
      name: "Jajmau",
      note: "The leather district on the Ganga bank, where tanneries and finishing units keep hides, chemicals and finished leather in sheds that smell of process and run hot and humid.",
    },
    {
      name: "Panki",
      note: "A large industrial area on the western side with chemical, engineering and power-related units, spread over wide roads where stores stand far from the control room.",
    },
    {
      name: "Dada Nagar",
      note: "An older industrial area with engineering, small manufacturing and workshop units on compact plots, with stock stored on upper floors in summer heat.",
    },
    {
      name: "Naya Ganj and Collectorganj",
      note: "The old wholesale markets near the centre, where grain, cloth, spices and general goods are held in godowns and shops in crowded lanes.",
    },
    {
      name: "Medical colleges and hospital district",
      note: "The older hospitals and a government medical college serve patients from several districts, with blood banks, pharmacies and vaccine rooms in large buildings.",
    },
  ],
  industries: [
    {
      slug: "chemical",
      sentence:
        "Tanning and finishing use many chemicals, and stores with stated limits benefit from a record that shows how a room behaved on the hottest afternoon of the year.",
    },
    {
      slug: "textile",
      sentence:
        "Cloth and garment godowns hold fabric that takes up damp in the monsoon, and a humidity reading shows when stock should be moved or a dehumidifier run.",
    },
    {
      slug: "pharmaceutical",
      sentence:
        "Medicine wholesalers supply hospitals and chemists across a wide region from shop-floor stores, where a failed air conditioner can spoil a shelf of stock overnight.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Large hospitals serve patients from many districts and keep blood banks and vaccine stores whose alarms must reach duty staff through frequent power cuts.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Reads humidity as well as temperature, the pair that matters for leather, cloth and paper stock in the damp weeks of the monsoon.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two external probes show the warm and cool ends of a long godown, so a wholesaler can see where stock sits in the worst heat.",
    },
    {
      slug: "setu",
      reason:
        "A single-point logger fits a pharmacy fridge or a vaccine cabinet and is simple for ward staff to read and to move.",
    },
  ],
  faqs: [
    {
      question: "Can a tannery chemical store be monitored safely?",
      answer:
        "Yes, with the logger fixed outside the splash and fume zone and an external probe on a cable inside the room. Tell us what is stored and how the room is ventilated, and we suggest positions.",
    },
    {
      question: "Do you visit Jajmau, Panki and Dada Nagar to fit a temperature data logger?",
      answer:
        "We plan visits by direction from the centre, so nearby estates are covered on the same day. Share the estate, the room type and a contact, and we agree a date.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How do wholesale godowns in the old markets use a logger?",
      answer:
        "A logger on a high shelf and one near the floor show how heat and damp differ in a stacked room, and alerts reach the owner's phone when the shop is closed.",
    },
    {
      question: "Is calibration available for Kanpur plants and hospitals?",
      answer:
        "VEGA Calibrations, our parent company, delivers calibration of loggers and probes and supports temperature mapping and validation. Send the model and range, and we explain how it is arranged.",
    },
  ],
  nearby: [
    { slug: "lucknow", name: "Lucknow" },
    { slug: "prayagraj", name: "Prayagraj" },
    { slug: "agra", name: "Agra" },
  ],
  metaTitle: "Temperature Data Loggers in Kanpur | Prithvi",
  metaDescription:
    "Kanpur: temperature data loggers for Jajmau tanneries, Panki and Dada Nagar units, wholesale godowns and hospitals. Get Solution to start in Kanpur.",
  indexable: true,
};

export default city;
