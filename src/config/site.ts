export const siteConfig = {
  name: "Prithvi Data Loggers",
  url: "https://prithvidataloggers.com",
  description:
    "IoT temperature & humidity data loggers (WiFi / GSM / LoRa) for pharma, cold chain, hospitals, food, warehousing and labs.",
  email: "support@prithvidataloggers.com",
  phone: {
    display: "+91 98702 92760",
    tel: "+919870292760",
  },
  whatsapp: "https://wa.me/919870292760",
  address: {
    full: "A-202-A, Second Floor, Jaswanti Allied Business Centre, Kachpada, Ramchandra Lane Extn., Malad West, Mumbai – 400064, Maharashtra, India",
    street:
      "A-202-A, Second Floor, Jaswanti Allied Business Centre, Kachpada, Ramchandra Lane Extn., Malad West",
    city: "Mumbai",
    postalCode: "400064",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
  },
  parentCompany: {
    name: "VEGA Calibrations",
    url: "https://www.vegacalibrations.com",
    accreditation: "NABL accredited (ISO/IEC 17025:2017) calibration laboratory",
    certification: "ISO 9001:2015 certified",
    /** ISO date. Established 2 August 2016. */
    established: "2016-08-02",
  },
  /**
   * Statistics ("500+ facilities", "99.9% uptime", etc.) are NOT confirmed by
   * the owner (brief §1). Keep false until real numbers are approved.
   */
  showStats: false,
  /**
   * No prices anywhere on the site (owner decision). Every price-display spot
   * instead shows a "Get Solution" CTA. MRP data in src/data/products.ts is
   * kept untouched and simply never rendered while this is false.
   */
  showPrices: false,
  countriesServed: [
    "India",
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Oman",
    "Kuwait",
    "Bahrain",
    "Yemen",
  ],
  logo: "/images/logo/prithvi-data-loggers-logo.png",
  ogImage: "/images/og/og-default.png",
  locale: "en_IN",
} as const;

export type SiteConfig = typeof siteConfig;
