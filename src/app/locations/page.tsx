import Link from "next/link";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import { getAllLocations, isCityPage, locationHref } from "@/data/locations";
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
    "Where Prithvi supplies temperature data loggers: Indian states, cities and industrial areas, plus Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, Yemen.",
  path: "/locations",
});

const chip =
  "inline-flex min-h-11 items-center rounded-full bg-surface px-3.5 text-sm font-medium text-ink ring-1 ring-inset ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-700";

export default function LocationsPage() {
  const all = getAllLocations();
  const live = all.filter((l) => l.node.indexable);
  const india = live.find((l) => l.path.join("/") === "india");
  // A state hub with too few built pages is noindex, so it is not linked itself, but its cities still are.
  const states = all.filter(
    (l) =>
      l.path.length === 2 &&
      l.path[0] === "india" &&
      l.node.type === "state" &&
      (l.node.children ?? []).some((c) => c.indexable),
  );
  const gcc = live.filter((l) => l.path.length === 1 && l.path[0] !== "india");

  /** Indexable areas under a city, with their URLs. */
  const areasOf = (citySlug: string) =>
    writtenAreas().filter(({ area }) => area.citySlug === citySlug && isAreaIndexable(area));

  return (
    <>
      <PageHero
        visual={<LiveDeviceVisual devices={getPageHeroDevices("locations")} />}
        crumbs={[{ name: "Locations", href: "/locations" }]}
        eyebrow="Locations"
        title="Where Prithvi Data Loggers Supply & Support"
        intro="Prithvi supplies data loggers across India and to seven countries in the Gulf region. Choose your location for local industries, the cities we supply and how support works."
      >
        <Button href="/global-presence" variant="outline" size="lg">
          See the map
          <ArrowRightIcon className="size-5" />
        </Button>
      </PageHero>

      {india && (
        <Section aria-labelledby="locations-india-title">
          <SectionHeading
            id="locations-india-title"
            eyebrow="India"
            title="India: States, Cities and Industrial Areas"
            subtitle="Open a state for its cities and areas, or go straight to a city or an area."
          />
          <p className="mt-6">
            <Link href={locationHref(india.path)} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-600 hover:underline">
              About our supply across India
              <ArrowRightIcon className="size-4" />
            </Link>
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((state) => {
              const cities = (state.node.children ?? []).filter((c) => c.indexable);
              return (
                <li key={state.path.join("/")}>
                  <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg">
                    <h3 className="font-heading text-xl font-semibold text-ink">
                      {state.node.indexable ? (
                        <Link href={locationHref(state.path)} className="hover:text-brand-600">
                          {state.node.name}
                        </Link>
                      ) : (
                        state.node.name
                      )}
                    </h3>
                    <ul className="mt-4 space-y-4">
                      {cities.map((city) => {
                        const cityAreas = areasOf(city.slug);
                        return (
                          <li key={city.slug}>
                            <Link href={locationHref([...state.path, city.slug])} className="font-semibold text-brand-700 hover:underline">
                              {city.name}
                            </Link>
                            {cityAreas.length > 0 && (
                              <ul className="mt-2 flex flex-wrap gap-2">
                                {cityAreas.map(({ area, path }) => (
                                  <li key={area.slug}>
                                    <Link href={locationHref(path)} className={chip}>
                                      {area.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <Section tone="surface" aria-labelledby="locations-gcc-title">
        <SectionHeading
          id="locations-gcc-title"
          eyebrow="Gulf region"
          title="Saudi Arabia, the UAE and the Wider GCC"
          subtitle="Supplied from India, with set-up and support carried out remotely."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gcc.map((country) => {
            // Cities sit directly under a country, or under a region hub (Saudi Arabia).
            const cities = (country.node.children ?? []).flatMap((c) =>
              c.type === "state"
                ? (c.children ?? []).filter((x) => x.indexable).map((x) => ({ node: x, path: [...country.path, c.slug, x.slug] }))
                : c.indexable
                  ? [{ node: c, path: [...country.path, c.slug] }]
                  : [],
            );
            return (
              <li key={country.path.join("/")}>
                <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <MapPinIcon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                    <Link href={locationHref(country.path)} className="hover:text-brand-600">
                      {country.node.name}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {isCityPage(country.node) ? country.node.name : country.node.citiesServed.slice(0, 4).join(" · ")}
                  </p>
                  {cities.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cities.flatMap((city) => [
                        <li key={city.node.slug}>
                          <Link href={locationHref(city.path)} className={chip}>
                            {city.node.name}
                          </Link>
                        </li>,
                        ...areasOf(city.node.slug).map(({ area, path }) => (
                          <li key={`${city.node.slug}/${area.slug}`}>
                            <Link href={locationHref(path)} className={chip}>
                              {area.name}
                            </Link>
                          </li>
                        )),
                      ])}
                    </ul>
                  )}
                  <Link
                    href={locationHref(country.path)}
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                  >
                    View {country.node.name}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBand
        id="locations-cta"
        title="Don't See Your Location?"
        text="Tell us where you are and what you need to monitor, and we'll confirm what we can supply."
      />
    </>
  );
}
