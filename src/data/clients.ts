export type ClientIndustry =
  | "pharma"
  | "logistics"
  | "food-hospitality"
  | "healthcare"
  | "industrial";

export type Client = {
  name: string;
  slug: string;
  /** 400×200 PNG, logo centred on white. */
  logo: string;
  industry: ClientIndustry;
};

// Logo paths are written out in full so `npm run check:images` can verify them.
export const clients: Client[] = [
  { name: "Garware Hi-Tech Films", slug: "garware-hi-tech-films", logo: "/images/clients/garware-hi-tech-films.png", industry: "industrial" },
  { name: "Algor", slug: "algor", logo: "/images/clients/algor.png", industry: "logistics" },
  { name: "American Remedies", slug: "american-remedies", logo: "/images/clients/american-remedies.png", industry: "pharma" },
  { name: "TrueMed Pharma", slug: "truemed-pharma", logo: "/images/clients/truemed-pharma.png", industry: "pharma" },
  { name: "Balmer Lawrie & Co. Ltd", slug: "balmer-lawrie", logo: "/images/clients/balmer-lawrie.png", industry: "logistics" },
  { name: "Bastian Hospitality", slug: "bastian-hospitality", logo: "/images/clients/bastian-hospitality.png", industry: "food-hospitality" },
  { name: "CBX India", slug: "cbx-india", logo: "/images/clients/cbx-india.png", industry: "logistics" },
  { name: "Cryo Therm India", slug: "cryo-therm-india", logo: "/images/clients/cryo-therm-india.png", industry: "logistics" },
  { name: "Flag's", slug: "flags", logo: "/images/clients/flags.png", industry: "food-hospitality" },
  { name: "K-Indev Logistics", slug: "k-indev-logistics", logo: "/images/clients/k-indev-logistics.png", industry: "logistics" },
  { name: "DP World", slug: "dp-world", logo: "/images/clients/dp-world.png", industry: "logistics" },
  { name: "Jeena Criticare Logistics", slug: "jeena-criticare-logistics", logo: "/images/clients/jeena-criticare-logistics.png", industry: "logistics" },
  { name: "Jumbo King", slug: "jumbo-king", logo: "/images/clients/jumbo-king.png", industry: "food-hospitality" },
  { name: "Lemon Tree Hotels", slug: "lemon-tree-hotels", logo: "/images/clients/lemon-tree-hotels.png", industry: "food-hospitality" },
  { name: "Lenix Engineering", slug: "lenix-engineering", logo: "/images/clients/lenix-engineering.png", industry: "industrial" },
  { name: "Nippon Express", slug: "nippon-express", logo: "/images/clients/nippon-express.png", industry: "logistics" },
  { name: "CryoPDP", slug: "cryopdp", logo: "/images/clients/cryopdp.png", industry: "pharma" },
  { name: "PharmaQuelle", slug: "pharmaquelle", logo: "/images/clients/pharmaquelle.png", industry: "pharma" },
  { name: "Prudent Logistics", slug: "prudent-logistics", logo: "/images/clients/prudent-logistics.png", industry: "logistics" },
  { name: "Quick India Logistics", slug: "quick-india-logistics", logo: "/images/clients/quick-india-logistics.png", industry: "logistics" },
  { name: "Reema Transport", slug: "reema-transport", logo: "/images/clients/reema-transport.png", industry: "logistics" },
  { name: "Reenav Logistics", slug: "reenav-logistics", logo: "/images/clients/reenav-logistics.png", industry: "logistics" },
  { name: "Royal Canin", slug: "royal-canin", logo: "/images/clients/royal-canin.png", industry: "food-hospitality" },
  { name: "SD Cargo", slug: "sd-cargo", logo: "/images/clients/sd-cargo.png", industry: "logistics" },
  { name: "Shah TC", slug: "shah-tc", logo: "/images/clients/shah-tc.png", industry: "pharma" },
  { name: "SSK Smart Move Logistics", slug: "ssk-smart-move-logistics", logo: "/images/clients/ssk-smart-move-logistics.png", industry: "logistics" },
  { name: "Supreme Kitchen", slug: "supreme-kitchen", logo: "/images/clients/supreme-kitchen.png", industry: "food-hospitality" },
  { name: "Swift Cold Chain Group", slug: "swift-cold-chain", logo: "/images/clients/swift-cold-chain.png", industry: "logistics" },
  { name: "Sysmex India", slug: "sysmex-india", logo: "/images/clients/sysmex-india.png", industry: "healthcare" },
  { name: "TempCon", slug: "tempcon", logo: "/images/clients/tempcon.png", industry: "logistics" },
  { name: "Terumo Penpol", slug: "terumo-penpol", logo: "/images/clients/terumo-penpol.png", industry: "healthcare" },
  { name: "Theobroma", slug: "theobroma", logo: "/images/clients/theobroma.png", industry: "food-hospitality" },
  { name: "Trident Logistics", slug: "trident-logistics", logo: "/images/clients/trident-logistics.png", industry: "logistics" },
  { name: "Vann Care Pharma", slug: "vann-care-pharma", logo: "/images/clients/vann-care-pharma.png", industry: "pharma" },
  { name: "Yourway", slug: "yourway", logo: "/images/clients/yourway.png", industry: "pharma" },
  { name: "Yusen Logistics", slug: "yusen-logistics", logo: "/images/clients/yusen-logistics.png", industry: "logistics" },
  { name: "Zenica Pharma", slug: "zenica-pharma", logo: "/images/clients/zenica-pharma.png", industry: "pharma" },
  { name: "Zenzi Pharmaceutical Industries", slug: "zenzi-pharmaceutical-industries", logo: "/images/clients/zenzi-pharmaceutical-industries.png", industry: "pharma" },
];

/** Alt text for a client logo, e.g. "DP World logo". */
export function clientLogoAlt(client: Client): string {
  return `${client.name} logo`;
}
