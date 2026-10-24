// /data-logger-jubail | City | parent: Eastern Province
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "jubail",
  name: "Jubail",
  type: "city",
  intro:
    "A logger in Jubail mostly serves chemical sites, as well as logistics and warehousing sites. Jubail is the site of a very large industrial city of the Gulf, built on the shore north of Dammam under the Royal Commission for Jubail and Yanbu, and a temperature data logger here serves a district of petrochemical, fertiliser, steel and plastics plants beside an older coastal town. A commercial port and an industrial port handle cargo, large desalination and power plants supply the plants, and contractor camps, clinics and canteens house and feed a very large workforce. Chemical stores, spare-parts warehouses and laboratories fill the plant zones. The air is hot and humid, with salt from the sea. Loggers for Jubail are shipped from India and registered to a dashboard where plant managers, warehouse supervisors and quality staff each receive only the alerts they own.",
  climateAngle:
    "Heat and humidity combine on the shore, salt in the air attacks metal and packaging, and dust blows in from the desert, so a chemical store or a warehouse may be cooled and damp at the same time.",
  areas: [
    {
      name: "Plant zones of the industrial city",
      note: "Chemical, fertiliser, steel and plastics plants keep drums, bags, resins and spares in stores and tank farms spread over wide estates, with rooms far from any office.",
    },
    {
      name: "Commercial and industrial ports",
      note: "Port warehouses and yards hold imported equipment and packed products for a vessel or a truck, in salty, humid air.",
    },
    {
      name: "Contractor camps, canteens and clinics",
      note: "Camp kitchens feed large workforces from walk-in coolers and freezers, and clinics hold vaccines and medicines in refrigerators that cannot be allowed to warm.",
    },
    {
      name: "Jubail town and its markets",
      note: "The older coastal town has hospitals, supermarkets, hotels and fishing landings that keep their own cold rooms, chillers and ice stores.",
    },
  ],
  industries: [
    {
      slug: "chemical",
      sentence:
        "Chemical and petrochemical stores hold drums, bags and laboratory reagents with printed storage limits, and an alert from a hot store room lets the storekeeper act before material is wasted.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Contractors and suppliers keep spares and consumables in large warehouses, and a reading for each bay lets an operator show a client how its goods were held.",
    },
    {
      slug: "food-beverage",
      sentence:
        "Camp caterers and supermarkets cook and stock for large populations from cold rooms and freezers, and a record from each room shows when one began to fail during a power interruption.",
    },
    {
      slug: "laboratories",
      sentence:
        "Plant, quality and testing laboratories keep samples and reagents in fridges and cabinets with their own limits, and an exported log supports an audit.",
    },
  ],
  recommendedSeries: [
    {
      slug: "virat",
      reason:
        "Sixteen channels cover a long spares warehouse or a chemical store across racks and bays, so one report shows which corner runs hot or damp.",
    },
    {
      slug: "rajmudra",
      reason:
        "Two channels compare the door end and the back wall of a drum store, which shows whether the air at the far shelves matches the door.",
    },
    {
      slug: "veer",
      reason:
        "Ten channels spread through a camp kitchen block or a canteen store show which rooms run warmest, in a single report.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Jubail, can plant owners and their contractors each see only their own rooms?",
      answer:
        "Yes. Each room is its own point on the dashboard, and access can be limited so a contractor sees only its rooms while a plant manager sees the whole list.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "How does salty air affect the choice of position for a logger at Jubail?",
      answer:
        "We mount the body indoors, clear of spray and wet walls, let only the probe lead enter the cold room, and suggest wiping the probe when the room is cleaned.",
    },
    {
      question: "How does a plant store at Jubail start monitoring with loggers from India?",
      answer:
        "The loggers arrive from India and are registered to your dashboard, then a call or video session sets the rooms, limits and alert recipients. Your own staff fit them following our guidance.",
    },
    {
      question: "Is calibration available for plant laboratories at Jubail?",
      answer:
        "Yes. VEGA Calibrations, our parent company, calibrates loggers and probes, and we confirm how it could be arranged once we know the model and the range you work to.",
    },
  ],
  nearby: [
    { slug: "ras-al-khair", name: "Ras Al Khair" },
    { slug: "dammam", name: "Dammam" },
  ],
  metaTitle: "Temperature Data Loggers in Jubail | Prithvi",
  metaDescription:
    "Jubail: WiFi temperature data loggers for plant stores, port warehouses, camp canteens and laboratories, set up remotely. Get Solution to begin in Jubail.",
  indexable: true,
};

export default city;
