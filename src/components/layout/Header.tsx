import { headerNav, quoteHref } from "@/data/navigation";
import Logo from "@/components/ui/Logo";
import HeaderNav from "@/components/layout/HeaderNav";
import { telHref, whatsappHref } from "@/lib/contact";
import { siteConfig } from "@/config/site";

// Server wrapper: Logo reads public/ at build time, so both logo versions are
// rendered here and handed to the interactive client component.
export default function Header() {
  return (
    <HeaderNav
      items={headerNav}
      quoteHref={quoteHref}
      contact={{
        telHref,
        phoneDisplay: siteConfig.phone.display,
        whatsappHref: whatsappHref(),
      }}
      logo={<Logo preload className="h-8 w-auto sm:h-9 lg:h-10" />}
      logoWhite={<Logo variant="white" className="h-8 w-auto sm:h-9 lg:h-10" />}
    />
  );
}
