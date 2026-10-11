import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatFromPrice, getLoggerSeries, getProductBySlug, type ProductSeries } from "@/data/products";
import { productContent } from "@/data/product-content";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Prithvi Product Families",
  description:
    "Meet the Prithvi data logger families: Setu, Nakshatra, Rajmudra, Dhruva, Veer, Virat and Vayu. What each name means and what each series is best for.",
  path: "/brands",
});

// Accent per card, cycling through the three brand accents.
const accents = [
  { bar: "bg-brand-600", text: "text-brand-600", glow: "glow-brand" },
  { bar: "bg-violet-500", text: "text-violet-600", glow: "glow-violet" },
  { bar: "bg-cyan-400", text: "text-cyan-700", glow: "glow-cyan" },
];

function familyLabel(series: ProductSeries) {
  if (series.category === "accessories") return "Add-ons · Alarms & charging";
  const channels = series.channels === 1 ? "Single channel" : `${series.channels} channels`;
  return `${channels} · ${series.connectivity.includes("gsm") ? "GSM" : "Wi-Fi"}`;
}

export default function BrandsPage() {
  const accessories = getProductBySlug("accessories");
  const families = [...getLoggerSeries(), ...(accessories ? [accessories] : [])];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Brands", href: "/brands" }]}
        eyebrow="Our brands"
        title="Prithvi Product Families"
        intro="Each Prithvi series carries a name from Indian heritage that says what it stands for. Seven families cover everything from a single fridge to a sixteen-point warehouse, and sites beyond the reach of Wi-Fi."
      />

      <Section aria-labelledby="families-title">
        <SectionHeading
          id="families-title"
          eyebrow="Families & accessories"
          title="A Name with a Meaning, a Logger with a Purpose"
          subtitle="Read the story behind each name, see what the series is best for, and open its page for variants and prices."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {families.map((series, i) => {
            const accent = accents[i % accents.length];
            const content = productContent[series.slug];
            return (
              <li key={series.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300 sm:p-9">
                  <div aria-hidden="true" className={`${accent.glow} pointer-events-none absolute -top-32 -right-32 size-72 opacity-15 transition-opacity duration-500 group-hover:opacity-30`} />
                  <div aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${accent.bar}`} />
                  <p className={`relative text-xs font-semibold uppercase tracking-[0.14em] ${accent.text}`}>
                    {familyLabel(series)}
                  </p>
                  <h3 className="relative mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    <Link
                      href={`/products/${series.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {series.name}
                    </Link>
                  </h3>
                  <p className="relative mt-1 text-sm font-medium text-muted">{content.measures}</p>
                  <p className="relative mt-5 flex-1 text-lg leading-relaxed text-ink text-pretty">
                    {series.nameMeaning ?? series.summary}
                  </p>
                  <dl className="relative mt-6 border-t border-slate-100 pt-5 text-sm">
                    <dt className="font-semibold text-ink">Best for</dt>
                    <dd className="mt-1 leading-relaxed text-muted">{series.bestFor}</dd>
                  </dl>
                  <p className="relative mt-6 flex items-center justify-between text-sm font-semibold text-brand-700">
                    {formatFromPrice(series)}
                    <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-brand-600">
                      Explore {series.name}
                      <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                    </span>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-100 bg-brand-50 px-6 py-5 text-center leading-relaxed text-ink">
          All products are designed by {siteConfig.name},{" "}
          <a
            href={siteConfig.parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-600 underline underline-offset-4"
          >
            a {siteConfig.parentCompany.name} company
          </a>
          . Looking for alarms or spare-battery charging? See our{" "}
          <Link href="/products/accessories" className="font-semibold text-brand-600 underline underline-offset-4">
            accessories
          </Link>
          , or{" "}
          <Link href="/products" className="font-semibold text-brand-600 underline underline-offset-4">
            compare all series
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        id="brands-cta"
        title="Not Sure Which Family Fits?"
        text="Tell us what you need to monitor and our team will point you to the right series."
      />
    </>
  );
}
