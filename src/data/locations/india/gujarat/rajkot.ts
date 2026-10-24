// /data-logger-rajkot | City | parent: Gujarat
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "rajkot",
  name: "Rajkot",
  type: "city",
  intro:
    "Rajkot is the commercial heart of Saurashtra and a city that makes machines. The estates at Aji and Metoda and the Shapar-Veraval belt turn out diesel engines, pumps, bearings, castings and auto components, workshops in the older lanes supply them, and the city is known for gold and silver jewellery. Oil mills, groundnut traders and the produce yards of the peninsula, including the one at Gondal, tie it to the surrounding farms. A temperature data logger in Rajkot therefore watches rooms of unlike kinds: a paint store beside a casting shop, a medicine distributor's cold room, an edible oil store, a jeweller's strongroom. The climate is semi-arid, summers are fierce and the monsoon is erratic, so a shed that behaves well one year can swing sharply the next.",
  climateAngle:
    "Summers are fierce and dry, rain is erratic from year to year, and metal-roofed sheds on open plots heat quickly, so the swing between a cool morning and a scorching afternoon is the main thing a record has to capture.",
  areas: [
    {
      name: "Aji",
      note: "An established estate on the edge of the city where engineering, foundry and auto-parts makers keep raw material and finished parts in sheds along the main lanes.",
    },
    {
      name: "Metoda",
      note: "A large estate further out, with newer engineering, auto-parts and food plants on bigger plots, so rooms stand farther apart than in the older estates.",
    },
    {
      name: "Shapar-Veraval",
      note: "A belt of small workshops and mid-sized units on the highway side that make parts for the larger plants and hold stock in modest sheds.",
    },
    {
      name: "Bedi market yard",
      note: "The produce yard where groundnut, cotton and grain arrive by the lorry load from farms across the peninsula before they are graded and moved on.",
    },
    {
      name: "Soni Bazaar",
      note: "The old jewellers' market, where small shops, workshops and strongrooms hold precious metal and stones in narrow buildings that trap the afternoon heat.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Oil mills, groundnut processors and snack makers hold seed, oil and packed goods that go off in heat, and a log from each store shows how it behaved through a scorching spell.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Warehouses for engine parts, castings and coatings serve buyers across the country, and a reading at several heights shows how much hotter the top racks run than the floor.",
    },
    {
      slug: "pharmaceutical",
      sentence:
        "Distributors supply chemists and clinics across Saurashtra from stores that must hold their range through the hottest weeks, and a dated record answers a customer's query.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "Hospitals and clinics draw patients from a wide rural area and keep blood banks and vaccine fridges that need an alarm if power fails during a heatwave.",
    },
  ],
  recommendedSeries: [
    {
      slug: "rajmudra",
      reason:
        "Two external probes, one near the floor and one under the roof, show how a casting store or an oil store varies from bottom to top.",
    },
    {
      slug: "nakshatra",
      reason:
        "Reads humidity along with temperature, which shows when the first showers of the season start to affect packed goods and paper stock.",
    },
    {
      slug: "veer",
      reason:
        "Ten channels watch a large parts warehouse across bays and heights, so one report shows where afternoon heat gathers.",
    },
  ],
  faqs: [
    {
      question: "Do you visit Aji, Metoda and Shapar-Veraval to fit a temperature data logger?",
      answer:
        "Yes. The three lie in different directions from the city, so we group visits by direction. Share the estate and the type of room, and we propose a day with your team.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a small workshop afford to watch a single store?",
      answer:
        "A single WiFi logger on one store, with alerts to the owner's phone, is a sensible start, and more points can be added later as the workshop grows.",
    },
    {
      question: "What helps in a metal shed that gets very hot?",
      answer:
        "Probes at floor height and just below the roof show how far the heat climbs, and limits can be set for each position. Tell us the height of the shed and what it holds.",
    },
    {
      question: "Is calibration available for a plant in Rajkot?",
      answer:
        "Calibration of loggers and probes comes from VEGA Calibrations, our parent company, and can be planned with the supply. Send the model and your working range, and we explain the arrangement.",
    },
  ],
  nearby: [
    { slug: "morbi", name: "Morbi" },
    { slug: "jamnagar", name: "Jamnagar" },
    { slug: "ahmedabad", name: "Ahmedabad" },
  ],
  metaTitle: "Temperature Data Loggers in Rajkot | Prithvi",
  metaDescription:
    "Rajkot: temperature data loggers for engineering estates at Aji and Metoda, oil mills, distributors and hospitals. Get Solution for Rajkot.",
  indexable: true,
};

export default city;
