import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatFromPrice, type ProductSeries } from "@/data/products";
import { productContent } from "@/data/product-content";
import GetSolutionButton from "@/components/products/GetSolutionButton";
import ImageFallback from "@/components/ui/ImageFallback";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getVariantImage, isPlaceholderImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  series: ProductSeries;
  /** Heading level for the name (h2 in a top-level grid, h3 inside a titled section). */
  as?: "h2" | "h3";
  /** Optional line under the name, e.g. "Recommended here: Setu X". */
  note?: string;
  className?: string;
};

// Series card: image, channels, what it measures, key range, price, link.
// Server component: the image (or its placeholder fallback) is resolved at build time.
export default function ProductCard({ series, as: Heading = "h3", note, className }: ProductCardProps) {
  const content = productContent[series.slug];
  const image = getVariantImage(series, series.variants[0]);
  const showImage = image && !isPlaceholderImage(image.src);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {showImage ? (
          <Image
            src={image.src}
            alt={series.headline}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <ImageFallback tone="light" label={series.name} channels={series.channels} />
        )}
        {series.channels && (
          <span className="absolute top-3 left-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-xs font-semibold text-white">
            {series.channels === 1 ? "1 channel" : `${series.channels} channels`}
          </span>
        )}
        {series.connectivity.includes("gsm") && (
          <span className="absolute top-3 right-3 rounded-full bg-violet-500 px-2.5 py-1 text-xs font-semibold text-white">
            GSM
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="font-heading text-xl font-semibold text-ink">
          <Link
            href={`/products/${series.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {series.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm font-medium text-brand-600">{content.measures}</p>
        {note && (
          <p className="mt-3 inline-flex w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
            {note}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{series.summary}</p>
        <dl className="mt-4 border-t border-slate-100 pt-4 text-sm">
          <dt className="sr-only">Range</dt>
          <dd className="text-ink">{content.rangeSummary}</dd>
        </dl>
        {siteConfig.showPrices ? (
          <p className="mt-4 flex items-center justify-between text-sm font-semibold text-brand-700">
            {formatFromPrice(series)}
            <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-brand-600">
              View details
              <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
            </span>
          </p>
        ) : (
          <GetSolutionButton href={`/products/${series.slug}#enquiry`} size="sm" className="mt-4" />
        )}
      </div>
    </article>
  );
}
