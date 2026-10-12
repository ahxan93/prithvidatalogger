import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getIndustryBySlug } from "@/data/industries";
import { findCityBySlug, locationHref, type ResolvedCity } from "@/data/locations";
import { getProductBySlug, type ProductSeries } from "@/data/products";
import { services } from "@/data/services";
import EnquiryForm from "@/components/forms/EnquiryForm";
import ProductCard from "@/components/products/ProductCard";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  HeadsetIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getCityHeroDevices } from "@/data/page-heroes";
import { getWrittenAreasForCity } from "@/data/areas";
import { areaHref } from "@/lib/areas";
import { telHref, whatsappCityHref } from "@/lib/contact";
import { cityServiceSchema, localBusinessSchema } from "@/lib/schema";

// The city page template from docs/LOCATION-PAGES-PLAYBOOK.md section 3: exactly
// twelve sections, in this order. Each carries data-city-section so
// `npm run check:data` can confirm all twelve are present in the built HTML.
// Sections 8 and 9 are shared blocks; the rest is unique to the city.

const HOW_WE_WORK = [
  { title: "Share your requirement", text: "Tell us what you store, where, and how many points need watching." },
  { title: "Site understanding", text: "We look at the layout and conditions, by call or on a site visit, and recommend the right loggers." },
  { title: "Supply and installation", text: "Loggers are supplied and installed, then connected to your dashboard and alert recipients." },
  { title: "Ongoing support", text: "We stay available for alert rules, user access and calibration planning as your sites change." },
];

const WHY_PRITHVI = [
  "Calibration, mapping and validation from our parent lab, VEGA Calibrations",
  "Live alerts by email, SMS, app and dashboard when a limit is crossed",
  "Audit-ready records and reports in PDF, Excel and CSV",
  "Remote setup support for Wi-Fi, alert rules and user access",
];

const cardLink =
  "group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 font-heading font-semibold text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700 hover:shadow-soft-lg";

export default async function CityPage({ city }: { city: ResolvedCity }) {
  const { node, path, trail } = city;
  const name = node.name;
  const href = locationHref(path);
  const country = trail[0];
  const state = trail[1];
  const stateHref = locationHref(path.slice(0, 2));
  const isMumbai = path.join("/") === "india/maharashtra/mumbai";

  const crumbs = [
    { name: "Locations", href: "/locations" },
    ...trail.map((item, i) => ({ name: item.name, href: locationHref(path.slice(0, i + 1)) })),
  ];

  const recommended = node.recommendedSeries
    .map((item) => ({ ...item, series: getProductBySlug(item.slug) }))
    .filter((item): item is typeof item & { series: ProductSeries } => Boolean(item.series));

  const areaPages = getWrittenAreasForCity(node.slug).flatMap((area) => {
    const areaLink = areaHref(area);
    return areaLink ? [{ area, href: areaLink }] : [];
  });

  const industryCards = node.industries
    .map((item) => ({ ...item, industry: getIndustryBySlug(item.slug) }))
    .filter((item) => Boolean(item.industry));

  return (
    <>
      {isMumbai && <JsonLd data={localBusinessSchema()} />}
      <JsonLd
        data={cityServiceSchema({
          name,
          path: href,
          state: state.name,
          country: country.name,
          hasOffice: isMumbai,
        })}
      />

      {/* 1 + 2. Breadcrumbs and hero */}
      <Section tone="dark" hero className="overflow-hidden pb-14 sm:pb-16 lg:pb-20" data-city-section="hero">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-72 -right-56 size-[52rem] opacity-45" />
        <div aria-hidden="true" className="glow-violet pointer-events-none absolute -bottom-80 -left-64 size-[40rem] opacity-20" />
        <div className="relative">
          <div data-city-section="breadcrumbs">
            <Breadcrumbs items={crumbs} className="mb-5" />
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400 sm:text-sm">
            {state.name}, {country.name}
          </p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Temperature Data Loggers in {name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 text-pretty">
            WiFi and GSM temperature &amp; humidity monitoring for {name}&apos;s pharma, cold chain and industrial sites.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#enquiry" size="lg" className="shadow-glow">
              Get Solution
              <ArrowRightIcon className="size-5" />
            </Button>
            <Button href={whatsappCityHref(name)} variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </Button>
            <Button href={telHref} variant="outline" size="lg" aria-label={`Call ${siteConfig.phone.display}`}>
              <PhoneIcon className="size-5" />
              Call
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200">
            {["Calibration by parent lab VEGA", `Site visits in ${name}`, "Supply across India & the GCC"].map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <CheckCircleIcon className="size-4 shrink-0 text-cyan-400" />
                {chip}
              </li>
            ))}
          </ul>
          </div>
          {/* A distinct pair of logger photos per city (see page-heroes.ts), with an illustrative reading. */}
          <LiveDeviceVisual
            devices={getCityHeroDevices(node.slug, path[0] === "india" ? "india" : "gcc")}
            badge={`${name} · ${state.name}`}
            altPrefix={`${name} monitoring`}
          />
          </div>
        </div>
      </Section>

      {/* 3. Intro (with the climate angle) */}
      <Section aria-labelledby="city-intro-title" data-city-section="intro">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <SectionHeading id="city-intro-title" eyebrow="About monitoring here" title={`Temperature Monitoring in ${name}`} />
            <p className="mt-6 text-lg leading-relaxed text-ink text-pretty">{node.intro}</p>
          </div>
          <div className="self-start rounded-2xl border border-brand-100 bg-brand-50 p-7">
            <h3 className="font-heading text-xl font-semibold text-ink">Local climate</h3>
            <p className="mt-3 leading-relaxed text-ink">{node.climateAngle}</p>
          </div>
        </div>
      </Section>

      {/* 4. Industrial areas */}
      <Section tone="surface" aria-labelledby="city-areas-title" data-city-section="areas">
        <SectionHeading id="city-areas-title" eyebrow="Areas" title={`Industrial Areas We Serve in ${name}`} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {node.areas.map((area) => (
            <li key={area.name} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MapPinIcon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{area.name}</h3>
              <p className="mt-2 leading-relaxed text-muted">{area.note}</p>
            </li>
          ))}
        </ul>
        {areaPages.length > 0 && (
          <div className="mt-8">
            <h3 className="font-heading text-lg font-semibold text-ink">Area pages in {name}</h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {areaPages.map(({ area, href: areaLink }) => (
                <li key={area.slug}>
                  <Link
                    href={areaLink}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 transition hover:bg-brand-600 hover:text-white"
                  >
                    Data loggers in {area.name}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* 5. Industries */}
      <Section aria-labelledby="city-industries-title" data-city-section="industries">
        <SectionHeading id="city-industries-title" eyebrow="Industries" title={`Industries We Support in ${name}`} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {industryCards.map(({ slug, sentence, industry }) => (
            <li
              key={slug}
              className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition hover:border-brand-200 hover:shadow-soft-lg"
            >
              <h3 className="font-heading text-lg font-semibold text-ink">
                <Link href={`/industries/${slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-brand-700">
                  {industry?.name}
                </Link>
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{sentence}</p>
              <span aria-hidden="true" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Industry guide
                <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Recommended data loggers */}
      <Section tone="surface" id="recommended" aria-labelledby="city-products-title" data-city-section="products">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="city-products-title"
            eyebrow="Recommended products"
            title={`Recommended Data Loggers for ${name}`}
            subtitle="A starting point for the sites above. Our team will help you choose."
          />
          <Button href="/products" variant="outline" className="shrink-0 self-start lg:self-auto">
            Compare all series
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map(({ series, reason }) => (
            <li key={series.slug} className="flex flex-col gap-3">
              <ProductCard series={series} as="h3" className="flex-1" />
              <p className="rounded-xl bg-white px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-inset ring-slate-200">
                <span className="font-semibold">{series.name} in {name}: </span>
                {reason}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Calibration, mapping and validation */}
      <Section aria-labelledby="city-services-title" data-city-section="services">
        <div className="mx-auto max-w-4xl rounded-2xl border border-brand-100 bg-brand-50 p-7 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
              <HeadsetIcon className="size-6" />
            </span>
            <div>
              <h2 id="city-services-title" className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Calibration, Mapping &amp; Validation in {name}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink text-pretty">
                These services are delivered by our parent lab, {siteConfig.parentCompany.name}.
                Ask us to plan them for your {name} site alongside your loggers.
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 transition hover:bg-brand-600 hover:text-white"
                    >
                      {service.name} in {name}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. How we work */}
      <Section tone="surface" aria-labelledby="city-process-title" data-city-section="process">
        <SectionHeading id="city-process-title" eyebrow="Process" title={`How We Work in ${name}`} />
        <ol className="mt-10 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_WE_WORK.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-brand-600 font-heading text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 9. Why Prithvi */}
      <Section aria-labelledby="city-why-title" data-city-section="why">
        <SectionHeading id="city-why-title" eyebrow="Why Prithvi" title="Why Teams Choose Prithvi" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {WHY_PRITHVI.map((point) => (
            <li key={point} className="flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <span className="leading-relaxed text-ink">{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 10. FAQs (FAQPage JSON-LD comes from <Faq>) */}
      <Section tone="surface" aria-labelledby="city-faq-title" data-city-section="faqs">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="city-faq-title" eyebrow="FAQ" title={`${name} FAQs`} />
          <Faq items={node.faqs} />
        </div>
      </Section>

      {/* 11. Nearby locations */}
      <Section aria-labelledby="city-nearby-title" data-city-section="nearby">
        <SectionHeading id="city-nearby-title" eyebrow="Locations" title="Nearby Locations We Serve" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {node.nearby.map((place) => {
            const page = findCityBySlug(place.slug);
            return (
              <li key={place.slug}>
                {page ? (
                  <Link href={locationHref(page.path)} className={cardLink}>
                    Data loggers in {place.name}
                    <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <span className="flex h-full items-center rounded-2xl border border-slate-200/80 bg-surface px-5 py-4 font-heading font-semibold text-ink">
                    {place.name}
                  </span>
                )}
              </li>
            );
          })}
          <li>
            <Link href={stateHref} className={cardLink}>
              All of {state.name}
              <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
          </li>
          <li>
            <Link href="/locations" className={cardLink}>
              All locations
              <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
          </li>
        </ul>
      </Section>

      {/* 12. Enquiry form with the city as a hidden field */}
      <Section tone="dark" id="enquiry" aria-labelledby="city-enquiry-title" className="overflow-hidden" data-city-section="enquiry">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-64 left-1/2 size-[56rem] -translate-x-1/2 opacity-40" />
        <div className="relative mx-auto max-w-2xl">
          <h2 id="city-enquiry-title" className="text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Get Solution for Your {name} Site
          </h2>
          <p className="mt-4 text-center text-lg leading-relaxed text-slate-300 text-pretty">
            Tell us what you need to monitor and where in {name}. We will recommend the right loggers.
          </p>
          <EnquiryForm variant="compact" city={name} className="mt-8 shadow-glow" />
        </div>
      </Section>
    </>
  );
}
