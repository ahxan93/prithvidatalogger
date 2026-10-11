"use client";

import Image from "next/image";
import { useRef } from "react";
import { BadgeCheckIcon, CloseIcon } from "@/components/ui/icons";

type CertificateCardProps = {
  title: string;
  standard: string;
  description: string;
  /** Real certificate scan. When undefined, a designed panel is shown instead. */
  image?: { src: string; width: number; height: number };
};

// Certificate card. With a real scan it opens in a lightbox (native <dialog>:
// focus is trapped, Escape closes it). Without one it is a finished-looking panel.
export default function CertificateCard({ title, standard, description, image }: CertificateCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const panel = (
    <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden bg-navy-950 p-6 text-center text-white">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-24 -right-24 size-72 opacity-60" />
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0" />
      <span className="relative flex size-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-400 ring-1 ring-white/15">
        <BadgeCheckIcon className="size-7" />
      </span>
      <p className="relative mt-4 font-heading text-2xl font-bold">{standard}</p>
      <p className="relative mt-1 text-sm text-slate-300">VEGA Calibrations</p>
    </div>
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      {image ? (
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={`View the ${title} certificate`}
          className="group relative block aspect-[4/3] overflow-hidden bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500"
        >
          <Image
            src={image.src}
            alt={`${title} certificate (${standard}) of VEGA Calibrations`}
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
          <span className="absolute right-3 bottom-3 rounded-full bg-navy-950/85 px-3 py-1.5 text-xs font-semibold text-white">
            View certificate
          </span>
        </button>
      ) : (
        panel
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm font-medium text-brand-600">{standard}</p>
        <p className="mt-3 leading-relaxed text-muted">{description}</p>
      </div>

      {image && (
        <dialog
          ref={dialogRef}
          aria-label={`${title} certificate`}
          // Clicking the backdrop (the dialog element itself) closes it.
          onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
          className="m-auto max-h-[92vh] max-w-[min(92vw,56rem)] overflow-auto rounded-2xl bg-white p-0 shadow-soft-lg backdrop:bg-navy-950/80"
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close certificate"
              className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-navy-950/85 text-white hover:bg-navy-950"
            >
              <CloseIcon className="size-5" />
            </button>
            <Image
              src={image.src}
              alt={`${title} certificate (${standard}) of VEGA Calibrations`}
              width={image.width}
              height={image.height}
              sizes="(min-width: 960px) 896px, 92vw"
              className="h-auto w-full"
            />
          </div>
        </dialog>
      )}
    </article>
  );
}
