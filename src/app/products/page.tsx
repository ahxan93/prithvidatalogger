import Link from "next/link";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import { siteConfig } from "@/config/site";
import {
  connectivityOptions,
  formatFromPrice,
  getLoggerSeries,
  getProductBySlug,
  type ProductFilter,
} from "@/data/products";
import { productContent } from "@/data/product-content";
import { GSM_NETWORK_NOTE } from "@/data/locations";
import { quoteHref } from "@/data/navigation";
import GetSolutionButton from "@/components/products/GetSolutionButton";
import ProductCard from "@/components/products/ProductCard";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ActivityIcon, ArrowRightIcon, BellRingIcon, RefreshCwIcon, WifiIcon } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Temperature & Humidity Data Loggers",
  description:
    "Compare Prithvi temperature data loggers: WiFi and GSM, 1 to 16 channels, temperature and humidity. Find the right model and get a solution.",
  path: "/products",
});

const filterChips: { value: "all" | ProductFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "temperature", label: "Temperature" },
  { value: "temp-rh", label: "Temp + RH" },
  { value: "multi-channel", label: "Multi-channel" },
  { value: "gsm", label: "GSM" },
];

const connectivityIcons = { wifi: WifiIcon, gsm: ActivityIcon, lora: RefreshCwIcon };

export default function ProductsPage() {
  const loggers = getLoggerSeries();
  const accessories = getProductBySlug("accessories");

  return (
    <>
      <PageHero
        visual={<LiveDeviceVisual devices={getPageHeroDevices("products")} />}
        crumbs={[{ name: "Products", href: "/products" }]}
        eyebrow="Products"
        title="Temperature & Humidity Data Loggers"
        intro="Prithvi temperature data loggers record continuously, sync over Wi-Fi or GSM and alert your team the moment a limit is crossed. Choose a single-point logger for one fridge or a multi-channel data logger for a whole warehouse. Share your requirement and we'll send a clear, itemised quote."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={quoteHref} size="lg">
            Get Solution
            <ArrowRightIcon className="size-5" />
          </Button>
          <Button href="#compare" variant="outline" size="lg">
            Compare all series
          </Button>
        </div>
      </PageHero>

      {/* Series grid with CSS-only filter chips */}
      <Section aria-labelledby="series-title">
        <div className="product-filter">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="series-title"
              title="Choose Your Data Logger Series"
              subtitle="Seven series, from one channel to sixteen. Filter by what you need to measure."
            />
            <fieldset className="shrink-0">
              <legend className="sr-only">Filter products</legend>
              <div className="flex flex-wrap gap-2">
                {filterChips.map((chip) => (
                  <label
                    key={chip.value}
                    className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-600 has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500"
                  >
                    <input
                      type="radio"
                      name="product-filter"
                      value={chip.value}
                      defaultChecked={chip.value === "all"}
                      className="sr-only"
                    />
                    {chip.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loggers.map((series) => (
              <li key={series.slug} data-filters={series.filters.join(" ")}>
                <ProductCard series={series} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Comparison table */}
      <Section tone="surface" id="compare" aria-labelledby="compare-title">
        <SectionHeading
          id="compare-title"
          eyebrow="Compare"
          title="All Series at a Glance"
          subtitle="Channels, what each series measures, range and connectivity."
        />
        {/* Scrolls inside its own box on small screens, so the page never scrolls sideways. */}
        <p className="mt-8 text-sm text-muted lg:hidden">Swipe sideways to see every column.</p>
        <div
          className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft lg:mt-10"
          tabIndex={0}
          role="region"
          aria-labelledby="compare-title"
        >
          <table className="w-full min-w-[62rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-brand-50 text-ink">
                {[
                  "Series",
                  "Channels",
                  "Measures",
                  "Range",
                  "Connectivity",
                  ...(siteConfig.showPrices ? ["Starting price"] : []),
                ].map((h) => (
                  <th key={h} scope="col" className="px-5 py-4 font-heading text-sm font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loggers.map((series) => {
                const content = productContent[series.slug];
                return (
                  <tr key={series.slug} className="align-top transition-colors hover:bg-brand-50/40">
                    <th scope="row" className="px-5 py-4 font-heading text-base font-semibold">
                      <Link href={`/products/${series.slug}`} className="inline-flex min-h-11 min-w-11 items-center text-brand-600 hover:underline">
                        {series.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-ink">{series.channels}</td>
                    <td className="px-5 py-4 text-muted">{content.measures}</td>
                    <td className="px-5 py-4 text-muted">{content.rangeSummary}</td>
                    <td className="px-5 py-4 text-muted">{series.connectivity.includes("gsm") ? "GSM (SIM)" : "Wi-Fi"}</td>
                    {siteConfig.showPrices && (
                      <td className="px-5 py-4 font-semibold whitespace-nowrap text-ink">{formatFromPrice(series)}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          GSM and LoRa versions of the Wi-Fi models are available on request.
        </p>
      </Section>

      {/* Connectivity explainer */}
      <Section aria-labelledby="connectivity-title">
        <SectionHeading
          id="connectivity-title"
          eyebrow="Connectivity"
          title="Wi-Fi, GSM or LoRa: Which Do You Need?"
          subtitle="The right choice depends on where your loggers will be installed."
          align="center"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {connectivityOptions.map((option) => {
            const Icon = connectivityIcons[option.key];
            return (
              <li key={option.key} className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft">
                <span className="bg-brand-gradient flex size-12 items-center justify-center rounded-xl text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink">{option.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{option.description}</p>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl rounded-xl border border-brand-100 bg-brand-50 px-5 py-4 text-center text-sm text-ink">
          {GSM_NETWORK_NOTE}
        </p>
      </Section>

      {/* Accessories */}
      {accessories && (
        <Section tone="surface" aria-labelledby="accessories-title">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="accessories-title"
              eyebrow="Accessories"
              title="Add Alarms and Spare-Battery Charging"
              subtitle={accessories.summary}
            />
            <Button href="/products/accessories" variant="outline" className="shrink-0 self-start lg:self-auto">
              View accessories
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {accessories.variants.map((accessory, i) => (
              <li key={accessory.slug} className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft">
                <span className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                  {i === 0 ? <BellRingIcon className="size-5" /> : <RefreshCwIcon className="size-5" />}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{accessory.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{accessory.description}</p>
                {siteConfig.showPrices ? (
                  <p className="mt-4 text-sm font-semibold text-brand-700">Price on request</p>
                ) : (
                  <GetSolutionButton
                    href="/products/accessories#enquiry"
                    productName={accessory.name}
                    size="sm"
                    className="mt-4"
                  />
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Related pages */}
      <Section aria-labelledby="help-title">
        <SectionHeading
          id="help-title"
          title="Not Sure Which Logger Fits?"
          subtitle="Start from your industry, or ask about calibration and mapping for the loggers you choose."
          align="center"
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            { href: "/industries", title: "Browse by industry", text: "See what pharma, cold chain, food and other sectors use." },
            { href: "/services/calibration", title: "Calibration", text: "Calibration through our parent lab, VEGA Calibrations." },
            { href: "/services/temperature-mapping", title: "Temperature mapping", text: "Find the right sensor positions before you install." },
          ].map((item) => (
            <li key={item.href} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition hover:border-brand-200 hover:shadow-soft-lg">
              <h3 className="font-heading text-lg font-semibold text-ink">
                <Link href={item.href} className="after:absolute after:inset-0 after:rounded-2xl">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Tell Us What You Need to Monitor"
        text="Share your rooms, freezers or vehicles and we'll recommend the right series and send you a clear, itemised quote."
      />
    </>
  );
}
