// /data-logger-riyadh-dry-port | Area | parent: Riyadh
import type { AreaDef } from "../_types.ts";

const area: AreaDef = { slug: "riyadh-dry-port", name: "Riyadh Dry Port", citySlug: "riyadh", areaType: "warehousing-hub", nearbyIndustries: ["logistics-warehousing","pharmaceutical","food-beverage"], confirmedService: true, hero: ["virat","rajmudra"], page: {
    "metaTitle": "Temperature Data Logger in Riyadh Dry Port, Riyadh | Prithvi",
    "metaDescription": "Riyadh Dry Port: WiFi temperature and humidity data loggers for the container yard, transit sheds and truck terminal. Get Solution: Riyadh Dry Port.",
    "intro": "Riyadh Dry Port is the inland container terminal of the capital, a rail-linked freight yard where containers that entered the kingdom through the Gulf coast are unloaded, cleared and handed on to trucks. Because Riyadh lies far from any sea port, the dry port works as a gateway for imported cargo: the railway carries boxes of food, medicines, consumer goods and industrial parts inland, and clearance can take place in the yard and not at the coast. A temperature data logger at the dry port follows goods through the waiting and handling that happen between train and truck, when cargo may stand in the sun or in a shed, which is where heat does its damage before the goods reach a warehouse.",
    "places": [
      {
        "name": "Container yard and rail sidings",
        "note": "Containers arrive by train and stand in stacks in the open yard until they are cleared, so goods inside can sit for hours or days in the full heat of the desert sun."
      },
      {
        "name": "Clearance and inspection area",
        "note": "Containers are opened, checked and resealed here, and the doors stay open while cargo is examined, which exposes chilled and sensitive goods to hot air."
      },
      {
        "name": "Transit sheds and warehouses",
        "note": "Cargo is transferred into sheds and warehouses beside the rail line before it is loaded for local delivery, in large halls where the temperature depends on the cooling plant."
      },
      {
        "name": "Truck terminal and gates",
        "note": "Trucks queue to collect cleared containers, so loaded vehicles may wait in the afternoon heat before they leave for warehouses in the city and beyond."
      }
    ],
    "industries": [
      {
        "slug": "logistics-warehousing",
        "sentence": "Operators who handle containers for many importers need to show each customer how its goods were held, and a logger placed in a consignment gives each shipper a record of its own."
      },
      {
        "slug": "pharmaceutical",
        "sentence": "Importers of medicines and healthcare products route cargo through the yard and sheds, and a dated record of temperature shows a distributor whether a pack stood too long in the heat."
      },
      {
        "slug": "food-beverage",
        "sentence": "Importers of food and drink bring chilled and ambient goods through the dry port, and a reading from the container and the shed shows the buyer how the product was kept before it reached a warehouse."
      }
    ],
    "services": "For Riyadh Dry Port we supply WiFi loggers for transit sheds and warehouse rooms that have a router, multi-point units for long sheds where one end is hotter than the other, and loggers that travel inside a consignment to record its journey from train to truck. Calibration of the loggers comes from VEGA Calibrations, our parent company, and can be discussed with the supply. WiFi loggers need a router, and we confirm what suits a vehicle or a yard before any order is placed.",
    "visits": "Set-up is carried out remotely, so there is no visit to arrange. Send the operator or shipper, the sheds and rooms to be watched and a contact through the enquiry form or WhatsApp, and we agree a call or a video session to register the loggers, set limits and name the people who receive alerts.",
    "approach": "We would begin with the transit shed that holds the most sensitive goods, hanging one logger at working height and one near the roof, then place a logger inside a few chosen consignments to compare the yard with the warehouse. The first weeks of data show which stage of the journey is the warmest and where a second logger is worth adding.",
    "faqs": [
      {
        "question": "Can a temperature data logger in Riyadh Dry Port show how long a container stood at the dry port before collection?",
        "answer": "A logger placed inside the consignment records temperature and humidity through the wait in the yard, the shed and the truck, and the report for those dates can be exported for the importer or the buyer.", link: { href: "/", text: "See how a Prithvi temperature data logger works" }
      },
      {
        "question": "Can several shippers sharing one shed each see only their own rooms?",
        "answer": "Yes. Each shipper's room or bay can be its own point on the dashboard with its own alert contacts, and access can be limited so each party sees only its own records."
      }
    ],
    "nearby": [
      "riyadh-1st-industrial-city"
    ],
    "indexable": true
  } };

export default area;
