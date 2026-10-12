import { getImageProps } from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatFromPrice, products } from "@/data/products";
import Button from "@/components/ui/Button";
import GetSolutionButton from "@/components/products/GetSolutionButton";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import ImageFallback from "@/components/ui/ImageFallback";
import { getVariantImage, isPlaceholderImage } from "@/lib/images";

export default async function ProductMarquee() {
  const cards = await Promise.all(
    products.map(async (series) => {
      const image = await getVariantImage(series, series.variants[0]);
      const realImage = image && !(await isPlaceholderImage(image.src)) ? image : undefined;
      return { series, realImage };
    }),
  );

  return (
    <Section tone="surface" contained={false} aria-labelledby="range-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="range-title"
          eyebrow="Products"
          title="Explore the Prithvi Range"
          subtitle="From single-point WiFi loggers to 16-channel systems and GSM models for sites without Wi-Fi."
          align="center"
        />
      </div>

      {/* Below 768px this is a swipeable scroll-snap row; from 768px up, a marquee. */}
      <Marquee label="Prithvi product series" duration={55} fade="surface" mobile="snap" className="mt-12">
        {cards.map(({ series, realImage }) => {
          return (
            <li key={series.slug} className="w-72 shrink-0 snap-start sm:w-80">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {!realImage ? (
                    <ImageFallback tone="light" label={series.name} channels={series.channels} />
                  ) : (
                    // Server-rendered <img> from getImageProps (next/image): same optimised,
                    // lazy-loaded markup, but nothing to hydrate (the row is rendered twice).
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...getImageProps({ src: realImage.src, alt: series.headline, fill: true, sizes: "320px", loading: "lazy" }).props}
                      alt={series.headline}
                      decoding="async"
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                  )}
                  {series.channels && series.channels > 1 && (
                    <span className="absolute top-3 left-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-xs font-semibold text-white">
                      {series.channels} channels
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-xl font-semibold text-ink">
                    <Link
                      href={`/products/${series.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    >
                      {series.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{series.summary}</p>
                  {siteConfig.showPrices ? (
                    <p className="mt-4 flex items-center justify-between text-sm font-semibold text-brand-700">
                      {formatFromPrice(series)}
                      <ArrowRightIcon className="size-4 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
                    </p>
                  ) : (
                    <GetSolutionButton
                      href={`/products/${series.slug}#enquiry`}
                      productName={series.name}
                      size="sm"
                      block
                      className="mt-4"
                    />
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </Marquee>

      <div className="mt-10 flex justify-center px-4">
        <Button href="/products" variant="outline">
          View all products
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </Section>
  );
}
