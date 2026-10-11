"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { getProductBySlug } from "@/data/products";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

type FloatingContactProps = {
  /** Product named in the WhatsApp message. Defaults to the series of the current /products/<slug> page. */
  product?: string;
};

/** Elements that must never be covered (e.g. form submit buttons) carry this attribute. */
const AVOID_SELECTOR = "[data-avoid-floating]";

function productFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/products\/([^/]+)/);
  const series = match ? getProductBySlug(match[1]) : undefined;
  if (!series) return undefined;
  return series.category === "accessories" ? undefined : `${series.name} series`;
}

export default function FloatingContact({ product }: FloatingContactProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const productName = product ?? productFromPath(pathname);

  // Hide while any protected element is on screen, so the buttons never cover it.
  useEffect(() => {
    const targets = document.querySelectorAll(AVOID_SELECTOR);
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      setHidden(false);
    };
  }, [pathname]);

  const buttonBase =
    "group relative flex size-12 items-center justify-center rounded-full sm:size-14 shadow-soft-lg transition-transform duration-200 motion-safe:hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2";
  const tooltip =
    "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2.5 transition-[opacity,transform] sm:gap-3 duration-300 sm:right-6 sm:bottom-6",
        hidden && "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={hidden || undefined}
      inert={hidden}
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
