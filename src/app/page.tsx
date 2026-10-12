import Hero from "@/components/sections/home/Hero";
import WhatWeDo from "@/components/sections/home/WhatWeDo";
import ProductMarquee from "@/components/sections/home/ProductMarquee";
import Benefits from "@/components/sections/home/Benefits";
import IndustriesGrid from "@/components/sections/home/IndustriesGrid";
import ClientsMarquee from "@/components/sections/home/ClientsMarquee";
import WhyPrithvi from "@/components/sections/home/WhyPrithvi";
import HowBuyingWorks from "@/components/sections/home/HowBuyingWorks";
import HomeFaq from "@/components/sections/home/HomeFaq";
import FinalCta from "@/components/sections/home/FinalCta";
import { buildMetadata } from "@/lib/seo";

// Title and description fixed by docs/MASTER-BRIEF.md §7.1.
export const metadata = buildMetadata({
  title: "WiFi Temperature & Humidity Data Loggers | Prithvi",
  description:
    "Real-time WiFi & GSM temperature and humidity data loggers with instant alerts and audit-ready reports. India & GCC. Get a solution today.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <ProductMarquee />
      <Benefits />
      <IndustriesGrid />
      <ClientsMarquee />
      <WhyPrithvi />
      <HowBuyingWorks />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
