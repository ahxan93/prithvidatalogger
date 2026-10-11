import { siteConfig } from "@/config/site";

// Contact links built from src/config/site.ts – never hard-code numbers elsewhere.

export const telHref = `tel:${siteConfig.phone.tel}`;
export const mailtoHref = `mailto:${siteConfig.email}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Prithvi team, I'm interested in your data loggers. Please share details.";

/** wa.me link with a URL-encoded pre-filled message; names the product when given. */
export function whatsappHref(product?: string): string {
  const message = product
    ? `Hi Prithvi team, I'm interested in the ${product} data logger. Please share details.`
    : DEFAULT_WHATSAPP_MESSAGE;
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Google Maps search URL for the office address. */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`;
