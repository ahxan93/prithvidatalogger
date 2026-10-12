"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getProductBySlug } from "@/data/products";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

type FloatingContactProps = {
  /** Product named in the WhatsApp message. Defaults to the series of the current /products/<slug> page. */
  product?: string;
};

function productFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/products\/([^/]+)/);
  const series = match ? getProductBySlug(match[1]) : undefined;
  if (!series) return undefined;
  return series.category === "accessories" ? undefined : `${series.name} series`;
}

// Always visible, every page, every section — never hides. z-40 sits above
// ordinary page content but below the mobile menu (z-[60]) and the native
// <dialog> lightbox (browser top layer, always above any z-index), so both
// still correctly cover these buttons when open. Pages reserve real bottom
// padding/margin near their own submit buttons and footers instead of
// hiding these on approach (see EnquiryForm.tsx, Footer.tsx).
export default function FloatingContact({ product }: FloatingContactProps) {
  const pathname = usePathname();
  const productName = product ?? productFromPath(pathname);

  const buttonBase =
    "group relative flex size-12 items-center justify-center rounded-full sm:size-14 shadow-soft-lg transition-transform duration-200 motion-safe:hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2";
  const tooltip =
    "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";

  return (
    <div
      className={cn(
        "fixed right-4 z-40 flex flex-col items-end gap-2.5 sm:right-6 sm:gap-3",
        // iOS safe-area inset stacked on top of the usual offset, so the
        // buttons clear the home-indicator area on notched phones.
        "bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]",
      )}
    >
      <a
        href={whatsappHref(productName)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={productName ? `Chat on WhatsApp about ${productName}` : "Chat on WhatsApp"}
        // WhatsApp green with a dark glyph: a white glyph would be only 1.98:1.
        className={cn(buttonBase, "bg-whatsapp text-navy-950 outline-whatsapp")}
      >
        {/* Pulse ring behind the button: transform + opacity only, so it stays on the GPU. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-whatsapp opacity-0 motion-safe:animate-soft-pulse"
        />
        <WhatsAppIcon className="size-6 sm:size-7" />
        <span aria-hidden="true" className={tooltip}>
          WhatsApp us
        </span>
      </a>
      <a
        href={telHref}
        aria-label={`Call ${siteConfig.phone.display}`}
        className={cn(buttonBase, "bg-brand-600 text-white outline-brand-500")}
      >
        <PhoneIcon className="size-5 sm:size-6" />
        <span aria-hidden="true" className={tooltip}>
          Call {siteConfig.phone.display}
        </span>
      </a>
    </div>
  );
}
