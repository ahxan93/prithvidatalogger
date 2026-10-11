import { siteConfig } from "@/config/site";
import type { ProductSeries } from "@/data/products";
import { getVariantImage, isPlaceholderImage } from "@/lib/images";

// JSON-LD builders. No ratings or review markup anywhere (see CLAUDE.md).

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const LOCAL_BUSINESS_ID = `${siteConfig.url}/#localbusiness`;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  };
}

/**
 * Site-wide Organization + LocalBusiness graph. Rendered once in the root layout.
 * No ratings/reviews by design (see CLAUDE.md).
 */
export function siteSchema() {
  const areaServed = siteConfig.countriesServed.map((name) => ({ "@type": "Country", name }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logo),
        email: siteConfig.email,
        telephone: siteConfig.phone.tel,
        address: postalAddress(),
        areaServed,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone.tel,
          email: siteConfig.email,
          contactType: "sales",
          areaServed: siteConfig.countriesServed,
          availableLanguage: ["English", "Hindi"],
        },
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.parentCompany.name,
          url: siteConfig.parentCompany.url,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.logo),
        email: siteConfig.email,
        telephone: siteConfig.phone.tel,
        address: postalAddress(),
        areaServed,
        parentOrganization: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/**
 * ProductGroup with one Product per variant (brief §7.3).
 * Offers only where an MRP is public: INR, VAT (GST) not included, in stock.
 * "Price on request" variants carry no offer. No ratings or reviews by design.
 */
export function productSchema(product: ProductSeries, description: string) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const brand = { "@type": "Brand", name: siteConfig.name };

  return {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "@id": `${url}#productgroup`,
    name: product.category === "accessories" ? product.name : `${product.name} Series`,
    description,
    url,
    brand,
    productGroupID: product.slug,
    hasVariant: product.variants.map((variant) => {
      const image = getVariantImage(product, variant);
      // Placeholder artwork is never advertised to search engines.
      const realImage = image && !isPlaceholderImage(image.src) ? image.src : undefined;
      return {
        "@type": "Product",
        name: variant.name,
        sku: variant.slug,
        description: variant.description ?? `${variant.name}: ${variant.sensors}${variant.tempRange ? `, ${variant.tempRange}` : ""}.`,
        brand,
        ...(realImage && { image: absoluteUrl(realImage) }),
        ...(variant.mrp !== null && {
          offers: {
            "@type": "Offer",
            url,
            price: variant.mrp,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: variant.mrp,
              priceCurrency: "INR",
              valueAddedTaxIncluded: false,
            },
            seller: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          },
        }),
      };
    }),
  };
}

/** FAQPage JSON-LD. The same questions must be visible on the page. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Person JSON-LD for the founder (About page). Only the facts in the brief:
 * name, title and areas of expertise. `worksFor` points at the site-wide Organization.
 */
export function personSchema(person: {
  name: string;
  title: string;
  expertise: readonly string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.title,
    knowsAbout: [...person.expertise],
    worksFor: { "@id": ORGANIZATION_ID },
    ...(person.image && { image: absoluteUrl(person.image) }),
  };
}

/**
 * BlogPosting JSON-LD for a published post (brief §7.10). `datePublished` and
 * `dateModified` are ISO dates; `image` is omitted while it is still a
 * generated placeholder (never advertised to search engines).
 */
export function articleSchema(post: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(post.path),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(post.path) },
    ...(post.image && { image: absoluteUrl(post.image) }),
  };
}

const AREA_TYPE = { country: "Country", state: "State", city: "City" } as const;

/**
 * Service JSON-LD for a location page (brief §7.9): what we supply and where.
 * The provider is the site-wide Organization everywhere except Mumbai, where it
 * is the LocalBusiness (the one real office). No LocalBusiness is created for
 * places where we have no office.
 */
export function locationServiceSchema(location: {
  name: string;
  type: "country" | "state" | "city";
  path: string;
  hasOffice: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Temperature and humidity data loggers",
    url: absoluteUrl(location.path),
    provider: { "@id": location.hasOffice ? LOCAL_BUSINESS_ID : ORGANIZATION_ID },
    areaServed: { "@type": AREA_TYPE[location.type], name: location.name },
  };
}
