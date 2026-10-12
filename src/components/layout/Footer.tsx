import Link from "next/link";
import { cacheLife } from "next/cache";
import { siteConfig } from "@/config/site";
import { footerCompanyNav } from "@/data/navigation";
import { products } from "@/data/products";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { mailtoHref, mapsHref, telHref, whatsappHref } from "@/lib/contact";

// new Date() can't run in the static shell under Cache Components, so the year
// is cached and refreshed daily (rolls over within a day of 1 January).
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const headingClass = "font-heading text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm text-white";
const linkClass = "text-slate-300 transition-colors hover:text-white";
// Footer links are full 44px tap targets on phones and tablets, compact on desktop.
const tapClass = "flex min-h-11 items-center lg:inline lg:min-h-0";

export default function Footer() {
  return (
    <footer
      data-tone="dark"
      className="group/section bg-dot-grid relative bg-navy-950 text-slate-300"
      aria-label="Footer"
    >
      {/* Thin brand → cyan accent line */}
      <div aria-hidden="true" className="bg-brand-gradient h-1 w-full" />

      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-12">
          <div>
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-flex min-h-11 items-center">
              <Logo variant="white" className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              IoT temperature &amp; humidity data loggers with WiFi, GSM and LoRa connectivity.
              Built for pharma, cold chain, healthcare, food and warehousing.
            </p>
          </div>

          <nav aria-labelledby="footer-products">
            <h3 id="footer-products" className={headingClass}>
              Products
            </h3>
            <ul className="mt-3 text-sm lg:mt-4 lg:space-y-2.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className={`${linkClass} ${tapClass}`}>
                    {product.category === "accessories" ? product.name : `${product.name} Series`}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h3 id="footer-company" className={headingClass}>
              Company
            </h3>
            <ul className="mt-3 text-sm lg:mt-4 lg:space-y-2.5">
              {footerCompanyNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${linkClass} ${tapClass}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={headingClass}>Contact</h3>
            <ul className="mt-4 space-y-2 text-sm lg:space-y-4">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-cyan-400" />
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <address className="not-italic leading-relaxed">{siteConfig.address.full}</address>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-5 shrink-0 text-cyan-400" />
                <a href={telHref} className={`${linkClass} ${tapClass}`}>
                  {siteConfig.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-5 shrink-0 text-cyan-400" />
                <a href={mailtoHref} className={`${linkClass} ${tapClass} break-all`}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="size-5 shrink-0 text-whatsapp" />
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`${linkClass} ${tapClass}`}>
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className={headingClass}>Countries we serve</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {siteConfig.countriesServed.map((country) => (
              <li
                key={country}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Extra bottom padding on mobile keeps text clear of the floating buttons
          (fixed at the viewport's bottom-right, plus a safe-area inset on notched phones). */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 pt-4 pb-28 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={siteConfig.parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-slate-300 underline-offset-4 hover:text-white hover:underline"
          >
            A {siteConfig.parentCompany.name} company
          </a>
        </Container>
      </div>
    </footer>
  );
}
