import Link from "next/link";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import { getAllLocations, locationHref, locations } from "@/data/locations";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { isAreaIndexable, writtenAreas } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Locations We Serve",
  description:
    "Where Prithvi supplies temperature data loggers: India (Maharashtra, Mumbai), Saudi Arabia, the UAE (Dubai), Qatar, Oman, Kuwait, Bahrain and Yemen.",
  path: "/locations",
});

export default function LocationsPage() {
  // Only indexable nodes are listed (the rest are noindex and unlinked).
  const indexable = new Set(
    getAllLocations()
      .filter((location) => location.node.indexable)
      .map((location) => locationHref(location.path)),
  );

  // Every indexable area page, grouped under its city (the hub lists everything).
  const areaGroups = getAllLocations()
    .filter((location) => location.node.type === "city" && location.node.indexable)
    .map((city) => ({
      city,
      areas: writtenAreas().filter(
        ({ area, path }) => area.citySlug === city.node.slug && isAreaIndexable(area) && path.length > 0,
      ),
    }))
    .filter((group) => group.areas.length > 0);

  return (
    <>
      <PageHero
        visual={<LiveDeviceVisual devices={getPageHeroDevices("locations")} />}
        crumbs={[{ name: "Locations", href: "/locations" }]}
        eyebrow="Locations"
        title="Temperature Data Loggers Where You Are"
        intro="Prithvi supplies data loggers across India and to seven countries in the Gulf region. Choose your location for local industries, the cities we supply and how support works."
      >
        <Button href="/global-presence" variant="outline" size="lg">
          See the map
          <ArrowRightIcon className="size-5" />
        </Button>
      </PageHero>

      <Section aria-labelledby="locations-title">
        <SectionHeading
          id="locations-title"
          title="Countries, States and Cities"
          subtitle="Eight countries, with more detailed pages where we have local content to share."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations
            .filter((country) => indexable.has(locationHref([country.slug])))
            .map((country) => {
              const children = getAllLocations(country.children ?? [], [country]).filter((child) =>
                indexable.has(locationHref(child.path)),
              );
              return (
                <li key={country.slug}>
                  <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <MapPinIcon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                      <Link href={locationHref([country.slug])} className="hover:text-brand-600">
                        {country.name}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {country.citiesServed.slice(0, 4).join(" · ")}
                    </p>
                    {children.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {children.map((child) => (
                          <li key={child.path.join("/")}>
                            <Link
                              href={locationHref(child.path)}
                              className="inline-flex min-h-11 items-center rounded-full bg-surface px-3.5 text-sm font-medium text-ink ring-1 ring-inset ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            >
                              {child.node.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={locationHref([country.slug])}
                      className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                    >
                      View {country.name}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </article>
                </li>
              );
            })}
        </ul>
      </Section>

      {areaGroups.length > 0 && (
        <Section tone="surface" aria-labelledby="locations-areas-title">
          <SectionHeading
            id="locations-areas-title"
            title="Cities and Industrial Areas"
            subtitle="Every city and area page, grouped by city."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areaGroups.map(({ city, areas: cityAreas }) => (
              <li key={city.path.join("/")} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  <Link href={locationHref(city.path)} className="hover:text-brand-600">
                    {city.node.name}
                  </Link>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cityAreas.map(({ area, path }) => (
                    <li key={area.slug}>
                      <Link
                        href={locationHref(path)}
                        className="inline-flex min-h-11 items-center rounded-full bg-surface px-3.5 text-sm font-medium text-ink ring-1 ring-inset ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        id="locations-cta"
        title="Don't See Your Location?"
        text="Tell us where you are and what you need to monitor, and we'll confirm what we can supply."
      />
    </>
  );
}
