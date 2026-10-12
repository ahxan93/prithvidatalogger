import { headerNav, quoteHref } from "@/data/navigation";
import Logo from "@/components/ui/Logo";
import HeaderNav from "@/components/layout/HeaderNav";
import { telHref, whatsappHref } from "@/lib/contact";
import { siteConfig } from "@/config/site";

// Server wrapper: Logo reads public/ at build time. The main header always uses
// the normal (blue) logo; the white variant is only for the dark mobile menu panel.
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
