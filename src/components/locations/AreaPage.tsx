import { isKeywordPage } from "@/data/keyword-pages";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { AreaDef, AreaPageContent } from "@/data/areas";
import { getIndustryBySlug } from "@/data/industries";
import { findLocation, GSM_NETWORK_NOTE, locationHref, needsGsmNetworkNote } from "@/data/locations";
import { devicesForKeys } from "@/data/page-heroes";
import { services } from "@/data/services";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Faq from "@/components/ui/Faq";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { areaCityMeta, writtenAreas } from "@/lib/areas";
import { telHref, whatsappCityHref } from "@/lib/contact";
import { locationCrumbs } from "@/lib/location-crumbs";
import { areaServiceSchema } from "@/lib/schema";

// Area page: Country > State > City > Area (src/data/areas.ts). Sections carry
// data-area-section so `npm run check:data` can confirm them in the built HTML.

const cardLink =
  "group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 font-heading font-semibold text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700 hover:shadow-soft-lg";
const arrow =
  "size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1";
const pill =
  "inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 transition hover:bg-brand-600 hover:text-white";

export default function AreaPage({ area, cityPath }: { area: AreaDef; cityPath: string[] }) {
  const page = area.page as AreaPageContent;
  const city = findLocation(cityPath);
  const meta = areaCityMeta(area);
  const cityName = city?.node.name ?? meta.name;
  const path = [...cityPath, area.slug];
  const keywordPass = isKeywordPage(path);
  const href = locationHref(path);
  const trail = city?.trail ?? [];
  const outsideIndia = needsGsmNetworkNote(cityPath);
  const parentPath = cityPath.slice(0, -1);
  const parentName = findLocation(parentPath)?.node.name ?? meta.stateName;

  const crumbs = locationCrumbs(path, [...trail.map((item) => item.name), area.name], "area");

  const nearby = page.nearby
    .map((slug) => writtenAreas().find((w) => w.area.slug === slug))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));
  const industryCards = page.industries
    .map((item) => ({ ...item, industry: getIndustryBySlug(item.slug) }))
    .filter((item) => item.industry);

  return (
    <>
      <JsonLd
        data={areaServiceSchema({
          area: area.name,
          city: cityName,
          state: meta.stateName,
          country: trail[0]?.name ?? "India",
          path: href,
        })}
      />

      <Section tone="dark" hero className="overflow-hidden pb-14 sm:pb-16 lg:pb-20" data-area-section="hero">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-72 -right-56 size-[52rem] opacity-45" />
        <div aria-hidden="true" className="glow-violet pointer-events-none absolute -bottom-80 -left-64 size-[40rem] opacity-20" />
        <div className="relative">
          <div data-area-section="breadcrumbs">
            <Breadcrumbs items={crumbs.items} schemaItems={crumbs.schemaItems} className="mb-5" />
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400 sm:text-sm">
                {cityName}, {meta.stateName}
              </p>
              <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Temperature Data Loggers in {area.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 text-pretty">
                {outsideIndia ? "WiFi" : "WiFi and GSM"} temperature &amp; humidity monitoring for the industries and estates of {area.name}, in {cityName}.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#enquiry" size="lg" className="shadow-glow">
                  Get Solution
                  <ArrowRightIcon className="size-5" />
                </Button>
                <Button href={whatsappCityHref(`${area.name}, ${cityName}`)} variant="whatsapp" size="lg">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </Button>
                <Button href={telHref} variant="outline" size="lg" aria-label={`Call ${siteConfig.phone.display}`}>
                  <PhoneIcon className="size-5" />
                  Call
                </Button>
              </div>
            </div>
            <LiveDeviceVisual
              devices={devicesForKeys(area.hero)}
              badge={`${area.name} · ${cityName}`}
              altPrefix={keywordPass ? `${area.name} temperature data logger` : `${area.name} monitoring`}
            />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="area-intro-title" data-area-section="overview">
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="area-intro-title" eyebrow="The area" title={keywordPass ? `Temperature Data Logger Monitoring in ${area.name}` : `Monitoring in ${area.name}`} />
          <p className="mt-6 text-lg leading-relaxed text-ink text-pretty">{page.intro}</p>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="area-places-title" data-area-section="places">
        <SectionHeading id="area-places-title" eyebrow="Estates and districts" title={`Where We Work in ${area.name}`} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {page.places.map((place) => (
            <li key={place.name} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MapPinIcon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{place.name}</h3>
              <p className="mt-2 leading-relaxed text-muted">{place.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="area-industries-title" data-area-section="industries">
        <SectionHeading id="area-industries-title" eyebrow="Industries" title={`Industries We Support in ${area.name}`} />
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
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" aria-labelledby="area-services-title" data-area-section="services">
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="area-services-title" eyebrow="Services" title={`Services We Offer in ${area.name}`} />
          <p className="mt-6 text-lg leading-relaxed text-ink text-pretty">{page.services}</p>
          {outsideIndia && (
            <p className="mt-6 rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-ink">{GSM_NETWORK_NOTE}</p>
          )}
          <ul className="mt-6 flex flex-wrap gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={service.href} className={pill}>
                  {service.name}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className={pill}>
                Data logger range
                <ArrowRightIcon className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      <Section aria-labelledby="area-visits-title" data-area-section="visits">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading id="area-visits-title" eyebrow="Visits" title="How Visits Are Arranged" />
            <p className="mt-6 leading-relaxed text-ink text-pretty">{page.visits}</p>
          </div>
          <div className="self-start rounded-2xl border border-brand-100 bg-brand-50 p-7">
            <h3 className="font-heading text-xl font-semibold text-ink">Where we would start</h3>
            <p className="mt-3 leading-relaxed text-ink">{page.approach}</p>
          </div>
        </div>
      </Section>

      {page.faqs && page.faqs.length > 0 && (
        <Section tone="surface" aria-labelledby="area-faq-title" data-area-section="faqs">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading id="area-faq-title" eyebrow="FAQ" title={`${area.name} FAQs`} />
            <Faq items={page.faqs} />
          </div>
        </Section>
      )}

      <Section tone="surface" aria-labelledby="area-nearby-title" data-area-section="nearby">
        <SectionHeading id="area-nearby-title" eyebrow="Nearby" title={`Around ${area.name}`} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <Link href={locationHref(cityPath)} className={cardLink}>
              All of {cityName}
              <ArrowRightIcon className={arrow} />
            </Link>
          </li>
          {nearby.map(({ area: other, path: otherPath }) => (
            <li key={other.slug}>
              <Link href={locationHref(otherPath)} className={cardLink}>
                Data loggers in {other.name}
                <ArrowRightIcon className={arrow} />
              </Link>
            </li>
          ))}
          <li>
            <Link href={locationHref(parentPath)} className={cardLink}>
              All of {parentName}
              <ArrowRightIcon className={arrow} />
            </Link>
          </li>
        </ul>
      </Section>

      <Section tone="dark" id="enquiry" aria-labelledby="area-enquiry-title" className="overflow-hidden" data-area-section="enquiry">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute -top-64 left-1/2 size-[56rem] -translate-x-1/2 opacity-40" />
        <div className="relative mx-auto max-w-2xl">
          <h2 id="area-enquiry-title" className="text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Get Solution for Your {area.name} Site
          </h2>
          <p className="mt-4 text-center text-lg leading-relaxed text-slate-300 text-pretty">
            Tell us what you need to monitor and where in {area.name}. We will recommend the right loggers.
          </p>
          <EnquiryForm variant="compact" city={`${area.name}, ${cityName}`} className="mt-8 shadow-glow" />
        </div>
      </Section>
    </>
  );
}
