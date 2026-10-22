import type { Metadata } from "next";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section tone="dark" hero className="text-center">
      <p className="font-heading text-7xl font-bold text-brand-gradient sm:text-8xl">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-300 text-pretty">
        The page you are looking for may have moved or no longer exists. Try one of the links
        below, or get in touch and our team will help you find what you need.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button href="/products" variant="primary" size="lg">
          View Products
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Contact Us
        </Button>
        <Button href={whatsappHref()} variant="whatsapp" size="lg">
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </Button>
      </div>
      <LiveDeviceVisual className="mt-12 max-w-sm" devices={getPageHeroDevices("not-found")} plain />
    </Section>
  );
}
