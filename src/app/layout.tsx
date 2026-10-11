import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import JsonLd from "@/components/seo/JsonLd";
import { LogoFilterDefs } from "@/components/ui/Logo";
import { siteSchema } from "@/lib/schema";

// Both are variable fonts, so one file covers every weight used
// (Sora 600/700 for headings, Inter 400/500/600 for body).
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: "#00259b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteSchema()} />
        <LogoFilterDefs />
        <Header />
        <main id="main" tabIndex={-1} className="site-main flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
