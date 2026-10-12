import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import ImageFallback from "@/components/ui/ImageFallback";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { isPlaceholderImage } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Temperature and humidity monitoring for pharma, cold chain, hospitals, food, logistics, labs, data centres, chemical, electronics and textile.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const cards = await Promise.all(
    industries.map(async (industry) => ({ industry, isPlaceholder: await isPlaceholderImage(industry.image) })),
  );

  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }]}
        eyebrow="Industries"
        title="Temperature Monitoring for the Industries We Serve"
        intro="Every industry stores something that depends on its environment. See where Prithvi data loggers are used, what they monitor there and which series we recommend."
      />

      <Section aria-labelledby="industries-grid-title">
        <SectionHeading
          id="industries-grid-title"
          title="Ten Industries, One Monitoring Approach"
          subtitle="Choose your industry for typical applications, recommended loggers and related services."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ industry, isPlaceholder }, i) => (
            <li key={industry.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300">
                {/* 3:2 matches the source photos exactly, so nothing is cropped. */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  {isPlaceholder ? (
                    <ImageFallback seed={i} />
                  ) : (
                    <Image
                      src={industry.image}
                      alt={`${industry.name} temperature monitoring`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-semibold text-ink">
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                    >
                      {industry.name}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{industry.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {industry.applications.slice(0, 3).map((application) => (
                      <li key={application} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink ring-1 ring-inset ring-slate-200">
                        {application}
                      </li>
                    ))}
                  </ul>
                  <p aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    View industry
                    <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" aria-labelledby="industry-services-title">
        <SectionHeading
          id="industry-services-title"
          eyebrow="Services"
          title="Calibration, Mapping and Validation for Every Site"
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
        <p className="mt-8 text-sm text-muted">
          Looking for a specific logger?{" "}
          <Link href="/products" className="font-semibold text-brand-600 underline underline-offset-4">
            Compare all series
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        id="industries-cta"
        title="Tell Us About Your Facility"
        text="Share what you store and where, and we'll recommend the right loggers and send a quote."
      />
    </>
  );
}
