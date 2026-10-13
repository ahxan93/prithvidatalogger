import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import {
  allFlatSlugs,
  findLocation,
  GSM_NETWORK_NOTE,
  isCityPage,
  locationHref,
  needsGsmNetworkNote,
  pathForFlatSlug,
  type ResolvedLocation,
} from "@/data/locations";
import { locationContent } from "@/data/location-content";
import { quoteHref } from "@/data/navigation";
import { getProductBySlug, type ProductSeries } from "@/data/products";
import AreaPage from "@/components/locations/AreaPage";
import CityPage from "@/components/locations/CityPage";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getCityHeroDevices } from "@/data/page-heroes";
import { findAreaByPath, isAreaIndexable, writtenAreas } from "@/lib/areas";
import { locationCrumbs } from "@/lib/location-crumbs";
import ProductCard from "@/components/products/ProductCard";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon, CheckCircleIcon, HeadsetIcon, MapPinIcon } from "@/components/ui/icons";
import { locationServiceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// One static page per node in the location tree (country, state and city) and
// per written area, served at the flat URL /data-logger-{slug}. next.config.ts
// rewrites /data-logger-:slug to this route, so the dynamic segment here is the
// bare slug. Unknown slugs fall through to notFound() and render the 404 page.
// Every valid path is prerendered at build time, so navigations may wait for the
// (static) page instead of showing a loading shell.
export const instant = false;

export function generateStaticParams() {
  // Areas without a written page get no route (their path is not in the tree walk below).
  return allFlatSlugs()
    .filter((slug) => {
      const path = pathForFlatSlug(slug);
      return path && (findLocation(path) || findAreaByPath(path));
    })
    .map((slug) => ({ slug }));
}

/** Page copy that is derived from the node: H1 pattern from brief §7.9. */
function describe(location: ResolvedLocation) {
  const key = location.path.join("/");
  const content = locationContent[key];
  const place = content?.inName ?? location.node.name;
  return { key, content, place, title: `Temperature Data Loggers in ${place}` };
}

export async function generateMetadata({
  params,
}: PageProps<"/data-logger/[slug]">): Promise<Metadata> {
  const { slug: flat } = await params;
  const slug = pathForFlatSlug(flat) ?? [];
  const location = findLocation(slug);
  if (!location) {
    // Area pages (Country > State > City > Area) carry their own title and description.
    const found = findAreaByPath(slug);
    if (!found?.area.page) return {};
    return buildMetadata({
      title: found.area.page.metaTitle,
      description: found.area.page.metaDescription,
      path: locationHref(slug),
      absoluteTitle: true,
      image: `/og/locations/${flat}`,
      // Indexable only if the author said so AND every area check passes.
      noIndex: !isAreaIndexable(found.area),
    });
  }
  const { node } = location;

  // City pages built to the playbook template carry their own title and
  // description, and get a generated OG image (src/app/og/locations).
  if (isCityPage(node)) {
    return buildMetadata({
      title: node.metaTitle,
      description: node.metaDescription,
      path: locationHref(location.path),
      absoluteTitle: true,
      image: `/og/locations/${flat}`,
      noIndex: !node.indexable,
    });
  }

  const { content, title } = describe(location);

  return buildMetadata({
    title,
    description: content?.metaDescription ?? node.intro.slice(0, 150),
    path: locationHref(location.path),
    // Thin or unreviewed nodes stay out of the index (and the sitemap).
    noIndex: !node.indexable,
  });
}

/** Matches a location's free-text industry line to one of our industry pages, if any. */
function industryLink(label: string): string | undefined {
  const text = label.toLowerCase();
  const rules: [RegExp, string][] = [
    [/vaccine/, "vaccine-cold-chain"],
    [/chemical|dye|solvent/, "chemical"],
    [/electronic|automotive|engineering/, "electronics"],
    [/textile|mill|garment/, "textile"],
    [/pharma|medicine|medical store|stockist/, "pharmaceutical"],
    [/hospital|clinic|blood|healthcare/, "hospitals-blood-banks"],
    [/food|restaurant|kitchen|hotel|catering|hospitality|seafood|fisher|dairy|co-operative/, "food-beverage"],
    [/warehous|logistic|distribution|transport|fleet|port/, "logistics-warehousing"],
    [/server|data centre/, "data-centers"],
    [/laborator|diagnostic/, "laboratories"],
  ];
  const slug = rules.find(([pattern]) => pattern.test(text))?.[1];
  return slug && industries.some((industry) => industry.slug === slug) ? `/industries/${slug}` : undefined;
}

export default async function LocationPage({ params }: PageProps<"/data-logger/[slug]">) {
  const { slug: flat } = await params;
  const slug = pathForFlatSlug(flat) ?? [];
  const location = findLocation(slug);
  if (!location) {
    const found = findAreaByPath(slug);
    if (found) return <AreaPage area={found.area} cityPath={found.cityPath} />;
    notFound();
  }

  const { node, trail, path } = location;
  if (isCityPage(node)) return <CityPage city={{ ...location, node }} />;

  const { content, place, title } = describe(location);
  const href = locationHref(path);
  const crumbs = locationCrumbs(path, trail.map((n) => n.name), node.type);
  const isMumbai = path.join("/") === "india/maharashtra/mumbai";
  const outsideIndia = needsGsmNetworkNote(path);
  const recommended = (content?.recommended ?? [])
    .map((seriesSlug) => getProductBySlug(seriesSlug))
    .filter((series): series is ProductSeries => Boolean(series));
  const children = (node.children ?? []).filter((child) => child.indexable);
  const parent = trail.length > 1 ? trail[trail.length - 2] : undefined;

  // Every built page this hub points at, with its short unique line: the states
  // of a country, or the cities of a state / GCC country, and (state hubs) the
  // area pages under each city. Only live pages are linked.
  const hubEntries = (node.listing ?? []).flatMap((entry) => {
    const target = pathForFlatSlug(entry.slug);
    const found = target ? findLocation(target) : undefined;
    if (!target || !found || !found.node.indexable) return [];
    const cities =
      found.node.type === "state"
        ? (found.node.children ?? [])
            .filter((c) => c.indexable)
            .map((c) => ({ name: c.name, href: locationHref([...target, c.slug]) }))
        : [];
    const areaItems = (node.areaListing ?? []).flatMap((a) => {
      const areaPath = pathForFlatSlug(a.slug);
      if (!areaPath || areaPath.slice(0, -1).join("/") !== target.join("/")) return [];
      const area = findAreaByPath(areaPath);
      return area && isAreaIndexable(area.area)
        ? [{ name: area.area.name, href: locationHref(areaPath), text: a.text }]
        : [];
    });
    return [{ name: found.node.name, href: locationHref(target), text: entry.text, cities, areas: areaItems }];
  });

  return (
    <>
      <JsonLd data={locationServiceSchema({ name: node.name, type: node.type, path: href, hasOffice: isMumbai })} />

      <PageHero
        crumbs={crumbs.items}
        schemaCrumbs={crumbs.schemaItems}
        eyebrow={node.type === "country" ? "Country" : node.type === "state" ? "State" : "City"}
        title={title}
        intro={node.intro}
        visual={
          node.type === "city" ? (
            <LiveDeviceVisual
              devices={getCityHeroDevices(node.slug, path[0] === "india" ? "india" : "gcc")}
              badge={`${node.name} · ${trail[trail.length - 2]?.name ?? ""}`}
              altPrefix={`${node.name} monitoring`}
            />
          ) : undefined
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={quoteHref} size="lg">
            Get Solution
            <ArrowRightIcon className="size-5" />
          </Button>
          <Button href="#recommended" variant="outline" size="lg">
            Recommended loggers
          </Button>
        </div>
      </PageHero>

      {/* Industries we serve there + cities/areas */}
      <Section aria-labelledby="local-industries-title">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionHeading
              id="local-industries-title"
              eyebrow="Industries"
              title={`Industries We Serve in ${place}`}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {node.localIndustries.map((industry) => {
                const link = industryLink(industry);
                return (
                  <li
                    key={industry}
                    className="relative flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft transition hover:border-brand-200"
                  >
                    <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
                    {link ? (
                      <Link href={link} className="leading-relaxed text-ink after:absolute after:inset-0 after:rounded-xl hover:text-brand-700">
                        {industry}
                      </Link>
                    ) : (
                      <span className="leading-relaxed text-ink">{industry}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="self-start rounded-2xl border border-slate-200/80 bg-surface p-7">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
              <MapPinIcon className="size-5" />
            </span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
              {node.type === "city" ? "Areas we supply" : "Cities we supply"}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {node.citiesServed.map((place) => {
                // A city's areas link to their own pages once those are written.
                const areaLink = writtenAreas().find(
                  (w) => w.area.citySlug === node.slug && w.area.name === place,
                );
                const childPage = (node.children ?? []).find((c) => c.indexable && c.name === place);
                return (
                  <li key={place}>
                    {areaLink || childPage ? (
                      <Link
                        href={areaLink ? locationHref(areaLink.path) : locationHref([...path, (childPage as { slug: string }).slug])}
                        className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-600 hover:text-white"
                      >
                        {place}
                      </Link>
                    ) : (
                      <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-inset ring-slate-200">
                        {place}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* Every built page under this hub, each with its own short description */}
      {hubEntries.length > 0 && (
        <Section tone="surface" aria-labelledby="hub-pages-title" data-hub-section="pages">
          <SectionHeading
            id="hub-pages-title"
            eyebrow="Locations"
            title={node.type === "country" && path.length === 1 && node.slug === "india" ? "States and Cities We Supply" : `Cities and Areas in ${place}`}
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {hubEntries.map((entry) => (
              <li key={entry.href} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
                <h3 className="font-heading text-xl font-semibold text-ink">
                  <Link href={entry.href} className="hover:text-brand-700 hover:underline">
                    {entry.name}
                  </Link>
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{entry.text}</p>
                {entry.cities.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.cities.map((city) => (
                      <li key={city.href}>
                        <Link
                          href={city.href}
                          className="inline-flex rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-600 hover:text-white"
                        >
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {entry.areas.length > 0 && (
                  <ul className="mt-4 space-y-3 border-t border-slate-200/80 pt-4">
                    {entry.areas.map((area) => (
                      <li key={area.href} className="text-sm leading-relaxed text-muted">
                        <Link href={area.href} className="font-semibold text-brand-700 hover:underline">
                          {area.name}
                        </Link>
                        <span className="text-ink">: </span>
                        {area.text}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Recommended products */}
      {recommended.length > 0 && (
        <Section tone="surface" id="recommended" aria-labelledby="recommended-title">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="recommended-title"
              eyebrow="Recommended products"
              title={`Recommended Data Loggers in ${place}`}
              subtitle="A starting point for the industries above. Our team will help you choose."
            />
            <Button href="/products" variant="outline" className="shrink-0 self-start lg:self-auto">
              Compare all series
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((series) => (
              <li key={series.slug}>
                <ProductCard series={series} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* How supply & support work */}
      <Section aria-labelledby="support-title">
        <div className="mx-auto max-w-4xl rounded-2xl border border-brand-100 bg-brand-50 p-7 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
              <HeadsetIcon className="size-6" />
            </span>
            <div>
              <h2 id="support-title" className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                How Supply and Support Work
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink text-pretty">{node.supportNote}</p>
              {outsideIndia && (
                <p className="mt-4 rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-ink">
                  {GSM_NETWORK_NOTE}
                </p>
              )}
              <p className="mt-5 text-sm text-muted">
                Calibration, temperature mapping and validation are delivered by VEGA Calibrations.{" "}
                <Link href="/services" className="font-semibold text-brand-600 underline underline-offset-4">
                  See our services
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Local FAQ */}
      <Section tone="surface" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="faq-title" eyebrow="FAQ" title={`Questions from ${place}`} />
          <Faq items={node.faqs} />
        </div>
      </Section>

      {/* Child locations (and the way back up) */}
      {(children.length > 0 || parent) && (
        <Section aria-labelledby="nearby-title">
          <SectionHeading
            id="nearby-title"
            eyebrow="Locations"
            title={children.length > 0 ? `Locations in ${place}` : "More Locations"}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {children.map((child) => (
              <li key={child.slug}>
                <Link
                  href={locationHref([...path, child.slug])}
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 font-heading font-semibold text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700 hover:shadow-soft-lg"
                >
                  {child.name}
                  <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
            {parent && (
              <li>
                <Link
                  href={locationHref(path.slice(0, -1))}
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 font-heading font-semibold text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700 hover:shadow-soft-lg"
                >
                  {parent.name}
                  <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/locations"
                className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 font-heading font-semibold text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700 hover:shadow-soft-lg"
              >
                All locations
                <ArrowRightIcon className="size-4 shrink-0 text-brand-600 transition-transform motion-safe:group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </Section>
      )}

      <CtaBand
        id="location-cta"
        title={`Get Your Solution in ${place}`}
        text="Tell us your sites and what you need to monitor. We'll recommend the right loggers and send you a clear, itemised quote."
      />
    </>
  );
}
