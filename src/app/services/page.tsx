import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon, BadgeCheckIcon, CheckCircleIcon, MapIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calibration, Mapping & Validation Services",
  description:
    "NABL calibration, temperature mapping and IQ/OQ/PQ validation services, delivered by our parent company VEGA Calibrations. Get a solution.",
  path: "/services",
});

const icons = {
  calibration: BadgeCheckIcon,
  "temperature-mapping": MapIcon,
  validation: ShieldCheckIcon,
};

export default function ServicesPage() {
  const parent = siteConfig.parentCompany;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Calibration, Mapping & Validation Services"
        intro="Monitoring is only as good as the measurements behind it. Alongside our data loggers, we offer NABL calibration, temperature mapping and validation, all delivered by our parent company, VEGA Calibrations."
      />

      <Section aria-labelledby="services-list-title">
        <SectionHeading
          id="services-list-title"
          title="Three Services from One Lab"
          subtitle="Choose a service to see its scope, how it works and what you receive."
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.slug];
            return (
              <li key={service.slug}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300 sm:p-8">
                  <span className="bg-brand-gradient flex size-12 items-center justify-center rounded-xl text-white">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-semibold text-ink">
                    <Link href={service.href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                      {service.name}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {service.scope.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2.5 text-ink">
                        <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    View service
                    <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="dark" aria-labelledby="vega-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-cyan-400">Our parent company</p>
          <h2 id="vega-title" className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Delivered by {parent.name}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300 text-pretty">
            Every service on this page is delivered by {parent.name}: an {parent.accreditation}, {parent.certification}.
            Calibration certificates are traceable to national standards.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={parent.url} variant="outline" size="lg">
              Visit {parent.name}
              <ArrowRightIcon className="size-5" />
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="services-links-title">
        <SectionHeading
          id="services-links-title"
          title="Pair Services with the Right Loggers"
          subtitle="Mapping shows where sensors should go. Our loggers then monitor those points continuously."
          align="center"
        />
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/products">
            Browse data loggers
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button href="/industries" variant="outline">
            Browse by industry
          </Button>
        </div>
      </Section>

      <CtaBand
        id="services-cta"
        title="Need Calibration, Mapping or Validation?"
        text="Tell us what you need and where. We'll confirm the scope and send a quote."
      />
    </>
  );
}
