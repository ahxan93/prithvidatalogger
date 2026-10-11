import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustryBySlug, industries } from "@/data/industries";
import { industryContent } from "@/data/industry-content";
import { quoteHref } from "@/data/navigation";
import { getProductBySlug, getVariantBySlug, type ProductSeries } from "@/data/products";
import { services } from "@/data/services";
import ProductCard from "@/components/products/ProductCard";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { AlertCircleIcon, ArrowRightIcon, CheckCircleIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { isPlaceholderImage } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

// Every valid path is prerendered at build time, so navigations may wait for the
// (static) page instead of showing a loading shell.
export const instant = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

/** H1 pattern from brief §7.5. */
const pageTitle = (name: string) => `${name} Temperature Monitoring`;

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const content = industry && industryContent[industry.slug];
  if (!industry || !content) return {};

  return buildMetadata({
    title: pageTitle(industry.name),
    description: content.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

/**
 * Turns the industry's product references (series, variant or accessory slugs)
 * into one card per series, noting the specific variants recommended.
 */
function resolveRecommended(refs: string[]): { series: ProductSeries; variants: string[] }[] {
  const bySeries = new Map<string, { series: ProductSeries; variants: string[] }>();
  for (const ref of refs) {
    const series = getProductBySlug(ref);
    const match = series ? { series, variant: undefined } : getVariantBySlug(ref);
    if (!match) continue;
    const entry = bySeries.get(match.series.slug) ?? { series: match.series, variants: [] };
    // A variant whose slug equals its series slug (e.g. "setu") is the series itself.
    if (match.variant && !series) entry.variants.push(match.variant.name);
    bySeries.set(match.series.slug, entry);
  }
  return [...bySeries.values()];
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const content = industry && industryContent[industry.slug];
  if (!industry || !content) notFound();

  const recommended = resolveRecommended(industry.recommended);
  const hasPhoto = !isPlaceholderImage(industry.image);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
        eyebrow="Industries"
        title={pageTitle(industry.name)}
        intro={industry.whyItMatters}
      >
        <div data-avoid-floating className="flex flex-col gap-3 sm:flex-row">
          <Button href={quoteHref} size="lg">
            Get a Quote
            <ArrowRightIcon className="size-5" />
          </Button>
          <Button href="#recommended" variant="outline" size="lg">
            Recommended loggers
          </Button>
        </div>
      </PageHero>

      {/* Challenges */}
      <Section aria-labelledby="challenges-title">
        <div className={hasPhoto ? "grid items-center gap-12 lg:grid-cols-2" : undefined}>
          <div>
            <SectionHeading
              id="challenges-title"
              eyebrow="Challenges"
              title={`${industry.name} Monitoring Challenges`}
            />
            <ul className={hasPhoto ? "mt-8 space-y-4" : "mt-10 grid gap-5 md:grid-cols-3"}>
              {content.challenges.map((challenge) => (
                <li key={challenge} className="flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
                  <AlertCircleIcon className="mt-0.5 size-5 shrink-0 text-violet-600" />
                  <span className="leading-relaxed text-ink">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          {hasPhoto && (
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-soft-lg">
              <Image
                src={industry.image}
                alt={`${industry.name} temperature monitoring`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Section>

      {/* How Prithvi helps */}
      <Section tone="surface" aria-labelledby="helps-title">
        <SectionHeading
          id="helps-title"
          eyebrow="How Prithvi helps"
          title="Continuous Records, Instant Alerts"
          subtitle={industry.summary}
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {content.helps.map((help) => (
            <li key={help.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-xl text-white">
                <CheckCircleIcon className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{help.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{help.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Applications */}
      <Section aria-labelledby="applications-title">
        <SectionHeading
          id="applications-title"
          eyebrow="Applications"
          title={`${industry.name}: Typical Applications`}
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {industry.applications.map((application) => (
            <li
              key={application}
              className="rounded-full border border-brand-100 bg-brand-50 px-5 py-2.5 text-sm font-medium text-brand-700"
            >
              {application}
            </li>
          ))}
        </ul>
      </Section>

      {/* Recommended products */}
      <Section tone="surface" id="recommended" aria-labelledby="recommended-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="recommended-title"
            eyebrow="Recommended products"
            title={`Data Loggers for ${industry.name}`}
            subtitle="Our usual starting point for this industry. The right mix depends on your site."
          />
          <Button href="/products" variant="outline" className="shrink-0 self-start lg:self-auto">
            Compare all series
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map(({ series, variants }) => (
            <li key={series.slug}>
              <ProductCard
                series={series}
                note={variants.length > 0 ? `Recommended here: ${variants.join(", ")}` : undefined}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Compliance notes (general wording only) */}
      <Section aria-labelledby="compliance-title">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 rounded-2xl border border-brand-100 bg-brand-50 p-7 sm:flex-row sm:p-9">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
            <ShieldCheckIcon className="size-6" />
          </span>
          <div>
            <h2 id="compliance-title" className="font-heading text-2xl font-bold text-ink">
              Compliance Notes
            </h2>
            <p className="mt-3 leading-relaxed text-ink">{content.compliance}</p>
          </div>
        </div>
      </Section>

      {/* Related services */}
      <Section tone="surface" aria-labelledby="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="Related services"
          title="Calibration, Mapping and Validation"
          subtitle="Delivered by our parent company, VEGA Calibrations."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition hover:border-brand-200 hover:shadow-soft-lg">
              <h3 className="font-heading text-lg font-semibold text-ink">
                <Link href={service.href} className="after:absolute after:inset-0 after:rounded-2xl">
                  {service.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title={`${industry.name}: Common Questions`}
            />
            <p className="mt-6 text-sm text-muted">
              Different industry?{" "}
              <Link href="/industries" className="font-semibold text-brand-600 underline underline-offset-4">
                See all industries
              </Link>
              .
            </p>
          </div>
          <Faq items={content.faqs} />
        </div>
      </Section>

      <CtaBand
        id="industry-cta"
        title={`Plan Your ${industry.name} Monitoring`}
        text="Tell us what you store and where. We'll recommend the right loggers and send a quote showing the MRP plus 18% GST."
      />
    </>
  );
}
