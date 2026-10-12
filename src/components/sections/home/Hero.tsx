import { getProductBySlug } from "@/data/products";
import { hero } from "@/data/home";
import { quoteHref } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {
  ArrowRightIcon,
  FileCheckIcon,
  GlobeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import HeroVisual from "@/components/sections/home/HeroVisual";
import { getVariantImage } from "@/lib/images";
import { telHref, whatsappHref } from "@/lib/contact";

const trustIcons = [ShieldCheckIcon, FileCheckIcon, GlobeIcon];

export default async function Hero() {
  const nakshatra = getProductBySlug("nakshatra");
  const image = nakshatra ? await getVariantImage(nakshatra, nakshatra.variants[0]) : undefined;
  const [accentBefore, accentAfter] = hero.h1Accent.split("Real-Time");

  return (
    <section
      data-tone="dark"
      aria-labelledby="hero-title"
      className="group/section relative isolate overflow-hidden bg-navy-950 text-white"
    >
      {/* Backdrop: dot grid, drifting brand/cyan/violet glows, fade at the bottom */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-dot-grid absolute inset-0 opacity-80" />
        <div className="glow-brand absolute -top-72 right-[-28%] size-[64rem] opacity-55 will-change-transform motion-safe:animate-aurora" />
        <div
          className="glow-cyan absolute top-[18%] right-[-6%] size-[40rem] opacity-20 will-change-transform motion-safe:animate-aurora"
          style={{ animationDelay: "-7s" }}
        />
        <div className="glow-violet absolute -bottom-80 -left-56 size-[48rem] opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      {/* .site-main already reserves header-height padding above this section;
          this adds breathing room beyond that, under the fixed header. */}
      <Container className="grid items-center gap-16 pt-10 pb-36 sm:pt-14 sm:pb-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-18 lg:pb-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-200 sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-live-green opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-live-green" />
            </span>
            Live readings · Instant alerts · Audit-ready records
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-heading text-[2.4rem] leading-[1.06] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
          >
            {hero.h1Lead}{" "}
            <span className="text-brand-gradient">
              {/* Keep "Real-Time" on one line instead of breaking at the hyphen. */}
              {accentBefore}
              <span className="whitespace-nowrap">Real-Time</span>
              {accentAfter}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 text-pretty sm:text-xl">{hero.sub}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={quoteHref} size="lg" className="shadow-glow">
              Get a Quote
              <ArrowRightIcon className="size-5" />
            </Button>
            <Button href={whatsappHref()} variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </Button>
            <Button href={telHref} variant="outline" size="lg" aria-label={`Call ${siteConfig.phone.display}`}>
              <PhoneIcon className="size-5" />
              Call
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300" aria-label="Why teams trust Prithvi">
            {hero.trust.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={item} className="flex items-center gap-2">
                  <Icon className="size-4 text-cyan-400" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        {image && <HeroVisual imageSrc={image.src} imageAlt={hero.imageAlt} chips={hero.chips} />}
      </Container>
    </section>
  );
}
