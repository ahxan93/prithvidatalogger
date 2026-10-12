import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getServiceBySlug, services, type ServiceSlug } from "@/data/services";
import { serviceContent } from "@/data/service-content";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  CheckCircleIcon,
  FileCheckIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

/** Metadata for a service page (title = the page's H1). */
export function serviceMetadata(slug: ServiceSlug) {
  const content = serviceContent[slug];
  return buildMetadata({
    title: content.h1,
    description: content.metaDescription,
    path: `/services/${slug}`,
  });
}

// One template for the three service pages (brief §7.6): H1, what it is, why it
// matters, scope, process, deliverables, "Delivered by VEGA" box, FAQ, enquiry form.
export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  const content = serviceContent[slug];
  const parent = siteConfig.parentCompany;
  const others = services.filter((other) => other.slug !== slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.shortName, href: service.href },
        ]}
        eyebrow="Services"
        title={content.h1}
        intro={content.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#enquiry" size="lg">
            Get a Quote
            <ArrowRightIcon className="size-5" />
          </Button>
          <Button href="#scope" variant="outline" size="lg">
            See the scope
          </Button>
        </div>
      </PageHero>

      {/* What it is + why it matters */}
      <Section aria-labelledby="what-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="what-title" eyebrow="What it is" title={`What Is ${service.name}?`} />
            <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">{content.whatItIs}</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">Why It Matters</h2>
            <ul className="mt-6 space-y-4">
              {content.whyItMatters.map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
                  <span className="leading-relaxed text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Scope (brief §4) */}
      <Section tone="surface" id="scope" aria-labelledby="scope-title">
        <SectionHeading
          id="scope-title"
          eyebrow="Scope"
          title={`${service.name}: What Is Covered`}
          subtitle={service.keyPoint}
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.scope.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          For the full scope, visit{" "}
          <a
            href={parent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-600 underline underline-offset-4"
          >
            {parent.name}
          </a>
          .
        </p>
      </Section>

      {/* Process */}
      <Section aria-labelledby="process-title">
        <SectionHeading id="process-title" eyebrow="Process" title="How It Works" align="center" />
        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="bg-brand-gradient absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 opacity-40 lg:block" />
          {content.process.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-white font-heading text-xl font-bold text-brand-600 shadow-soft ring-1 ring-slate-200">
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Deliverables + Delivered by VEGA */}
      <Section tone="surface" aria-labelledby="deliverables-title">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft sm:p-9">
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <FileCheckIcon className="size-6" />
            </span>
            <h2 id="deliverables-title" className="mt-5 font-heading text-2xl font-bold text-ink">
              What You Receive
            </h2>
            <ul className="mt-5 space-y-3">
              {content.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
                  <span className="leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-labelledby="vega-title"
            data-tone="dark"
            className="group/section bg-dot-grid relative overflow-hidden rounded-2xl bg-navy-950 p-7 text-white shadow-soft-lg sm:p-9"
          >
            <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-40 -right-40 size-96 opacity-50" />
            <div className="relative">
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-cyan-400 ring-1 ring-white/15">
                <BadgeCheckIcon className="size-6" />
              </span>
              <h2 id="vega-title" className="mt-5 font-heading text-2xl font-bold">
                Delivered by {parent.name}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-300">
                This service is delivered by {parent.name}, our parent company: an {parent.accreditation},{" "}
                {parent.certification}.
              </p>
              <div className="mt-6">
                <Button href={parent.url} variant="outline">
                  Visit {parent.name}
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQ" title={`${service.name}: Common Questions`} />
            <ul className="mt-4 text-sm">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={other.href} className="inline-flex min-h-11 items-center font-semibold text-brand-600 underline underline-offset-4">
                    {other.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="inline-flex min-h-11 items-center font-semibold text-brand-600 underline underline-offset-4">
                  Data loggers
                </Link>
              </li>
              <li>
                <Link href="/industries" className="inline-flex min-h-11 items-center font-semibold text-brand-600 underline underline-offset-4">
                  Industries we serve
                </Link>
              </li>
            </ul>
          </div>
          <Faq items={content.faqs} />
        </div>
      </Section>

      {/* Enquiry form with the service preselected */}
      <section
        id="enquiry"
        data-tone="dark"
        aria-labelledby="enquiry-title"
        className="group/section bg-dot-grid relative scroll-mt-[var(--header-h)] overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24"
      >
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-64 -right-64 size-[52rem] opacity-45" />
        <Container className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-6">
            <SectionHeading
              id="enquiry-title"
              eyebrow="Get a quote"
              title={`Request ${service.name}`}
              subtitle="Tell us what you need and where. Our team will confirm the scope with VEGA Calibrations and send a quote."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappHref()} variant="whatsapp" size="lg">
                <WhatsAppIcon className="size-5" />
                WhatsApp us
              </Button>
              <Button href={telHref} variant="outline" size="lg">
                <PhoneIcon className="size-5" />
                {siteConfig.phone.display}
              </Button>
            </div>
          </div>
          <EnquiryForm
            variant="compact"
            title="Request a quote"
            defaultProduct={service.enquiryOption}
            className="shadow-glow"
          />
        </Container>
      </section>
    </>
  );
}
