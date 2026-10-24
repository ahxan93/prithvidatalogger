// /data-logger-dibrugarh | City | parent: Assam
import type { CityLocationNode } from "../../_types.ts";

const city: CityLocationNode = {
  slug: "dibrugarh",
  name: "Dibrugarh",
  type: "city",
  intro:
    "A logger in Dibrugarh is most often placed at food and beverage and hospital and blood bank sites around Tea estates and garden factories and Warehouses near the river and the station. Dibrugarh is the tea city of upper Assam, on the south bank of the Brahmaputra, and a temperature data logger here serves a district of gardens, oilfields and a university town. Tea estates around the city pluck, wither, roll and dry leaf in factories, and chests and sacks of made tea wait in warehouses before they go to the auctions and the packers. Oil and gas fields lie in the districts to the east, so engineering suppliers and stores serve the industry. A medical college and hospital, a university and a rail-and-road bridge across the river make Dibrugarh the centre of the region. Prithvi supplies WiFi loggers for factories and wards with a network and GSM loggers for lorries and garden stores.",
  climateAngle:
    "Rain is very heavy for months, the air is humid in every season and the river floods the low ground, so made tea takes up moisture and metal rusts in stores that never fully dry.",
  areas: [
    {
      name: "Tea estates and garden factories",
      note: "Factories around the city process the green leaf and store made tea in chests and sacks, in damp air that robs the leaf of aroma if a store is not watched.",
    },
    {
      name: "Warehouses near the river and the station",
      note: "Godowns hold made tea, packed goods and supplies bound for the packers and for the hills, with rail and road links that carry stock to Guwahati and beyond.",
    },
    {
      name: "Medical college and the university",
      note: "A large teaching hospital and a university with laboratories hold blood units, vaccines and samples in refrigerators and freezers serving the upper valley.",
    },
    {
      name: "Oil and gas supply stores",
      note: "Engineering and equipment suppliers around the city hold spares, instruments and electrical gear that corrode in the humid air.",
    },
  ],
  industries: [
    {
      slug: "food-beverage",
      sentence:
        "Tea factories, packers and brokers hold made tea that loses aroma in damp air, and a record of humidity and temperature in the store shows the day moisture began to reach the chests.",
    },
    {
      slug: "hospitals-blood-banks",
      sentence:
        "A teaching hospital and clinics serve patients from the whole upper valley, and an alert on a phone means a failing blood or vaccine refrigerator is found in the night.",
    },
    {
      slug: "electronics",
      sentence:
        "Suppliers of electrical and control gear for the oilfields store relays, cables and instruments that rust in damp air, and a humidity trend marks the day a store needs a dehumidifier.",
    },
    {
      slug: "logistics-warehousing",
      sentence:
        "Rail and road carry tea and supplies to and from the valley, and a logger in a consignment records how long it stood in a siding or on a flooded road.",
    },
  ],
  recommendedSeries: [
    {
      slug: "nakshatra",
      reason:
        "Humidity and temperature at one point suit a tea warehouse or an equipment store, where heavy air is the main danger to the stock.",
    },
    {
      slug: "virat",
      reason:
        "Sixteen channels spread along a long tea warehouse give one report for every bay and stack, showing which corner holds the damp.",
    },
    {
      slug: "vayu",
      reason:
        "A GSM logger rides in a lorry carrying tea and reports from garden stores that have no router.",
    },
  ],
  faqs: [
    {
      question: "With a temperature data logger in Dibrugarh, how can a logger protect made tea in a Dibrugarh warehouse?",
      answer:
        "It records humidity and temperature at several points, and an alert tells the store manager when the air has become heavy, so chests can be moved, aired or covered before the tea is affected.", link: { href: "/", text: "See how a Prithvi temperature data logger works" },
    },
    {
      question: "Can a tea broker show a buyer how a lot was stored?",
      answer:
        "A report for the dates a lot stood in the store can be exported as PDF, Excel or CSV and sent to the buyer or the auction house.",
    },
    {
      question: "What if floods cut the road and the power to a garden?",
      answer:
        "Loggers record on their batteries and send an alert for a lost supply, then pass on the stored readings once the network returns, so a flooded store leaves a clear trace.",
    },
    {
      question: "Can calibration for a Dibrugarh laboratory be arranged?",
      answer:
        "VEGA Calibrations, our parent company, handles calibration of loggers and probes, and the work can be booked with the supply.",
    },
  ],
  nearby: [
    { slug: "tezpur", name: "Tezpur" },
    { slug: "guwahati", name: "Guwahati" },
  ],
  metaTitle: "Temperature Data Loggers in Dibrugarh | Prithvi",
  metaDescription:
    "Dibrugarh, Assam: temperature and humidity data loggers for tea factories and warehouses, oilfield suppliers and hospitals. Get Solution: Dibrugarh.",
  indexable: true,
};

export default city;
