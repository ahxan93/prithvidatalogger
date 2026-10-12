"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { NavItem } from "@/data/navigation";
import Button from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type HeaderNavProps = {
  items: NavItem[];
  quoteHref: string;
  contact: { telHref: string; phoneDisplay: string; whatsappHref: string };
  logo: ReactNode;
  logoWhite: ReactNode;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Exact match for leaf links; prefix match for section parents. Hash links never match. */
function isActive(pathname: string, href: string, section = false) {
  if (href.includes("#")) return false;
  if (pathname === href) return true;
  return section && href !== "/" && pathname.startsWith(`${href}/`);
}

function isSectionActive(pathname: string, item: NavItem) {
  return (
    isActive(pathname, item.href, true) ||
    (item.children ?? []).some((child) => isActive(pathname, child.href, true))
  );
}

/** Move focus between the links of a menu with ArrowUp/ArrowDown/Home/End. */
function focusSibling(container: HTMLElement, key: string) {
  const links = Array.from(container.querySelectorAll<HTMLElement>("a[href]"));
  if (links.length === 0) return;
  const index = links.indexOf(document.activeElement as HTMLElement);
  const next =
    key === "Home"
      ? 0
      : key === "End"
        ? links.length - 1
        : key === "ArrowDown"
          ? (index + 1) % links.length
          : (index - 1 + links.length) % links.length;
  links[next]?.focus();
}

// ---------------------------------------------------------------------------
// Desktop dropdown (disclosure pattern: button + aria-expanded + aria-controls)
// ---------------------------------------------------------------------------

function DesktopDropdown({
  item,
  pathname,
  open,
  onOpenChange,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const children = item.children ?? [];
  const wide = children.length > 8;
  const active = isSectionActive(pathname, item);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => onOpenChange(false), 150);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpenChange(true);
      // Wait for the panel to become visible before focusing into it.
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus());
    }
  };

  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key) && panelRef.current) {
      e.preventDefault();
      focusSibling(panelRef.current, e.key);
    }
  };

  return (
    <li
      className="relative"
      // Hover opens for mouse only; touch taps go through onClick.
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          cancelClose();
          onOpenChange(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onOpenChange(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          onOpenChange(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={active}
        onClick={() => onOpenChange(!open)}
        onKeyDown={onButtonKeyDown}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-(--nav-hover-bg) data-[active=true]:text-(--nav-active)"
      >
        {item.label}
        <ChevronDownIcon
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* pt-3 keeps the hover area continuous between button and panel. */}
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        onKeyDown={onPanelKeyDown}
        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
      >
        <div
          className={cn(
            "rounded-xl border border-slate-200 bg-white p-2 text-ink shadow-soft-lg",
            wide ? "w-[34rem]" : "w-64",
          )}
        >
          <ul className={cn("grid gap-0.5", wide && "grid-cols-2")}>
            {children.map((child) => {
              const current = isActive(pathname, child.href);
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50",
                      current && "bg-brand-50 font-semibold text-brand-700",
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 border-t border-slate-100 pt-1">
            <Link
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50"
            >
              View all {item.label.toLowerCase()} →
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Mobile slide-in menu
// ---------------------------------------------------------------------------

function MobileMenu({
  items,
  pathname,
  open,
  onClose,
  logoWhite,
  quoteHref,
  contact,
}: {
  items: NavItem[];
  pathname: string;
  open: boolean;
  onClose: () => void;
  logoWhite: ReactNode;
  quoteHref: string;
  contact: HeaderNavProps["contact"];
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();

  // Lock page scroll and move focus into the dialog while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    // Keep Tab focus inside the dialog.
    if (e.key === "Tab" && panelRef.current) {
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  return (
    <div className={cn("fixed inset-0 z-[60] xl:hidden", !open && "pointer-events-none")}>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-navy-950/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        data-tone="dark"
        onKeyDown={onKeyDown}
        className={cn(
          "group/section absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-navy-950 text-white shadow-soft-lg duration-300 ease-out",
          // Visibility animates only on close: on open the panel must be visible
          // immediately so focus can move into it.
          open
            ? "visible translate-x-0 transition-transform"
            : "invisible translate-x-full transition-[transform,visibility]",
        )}
      >
        <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
          <Link href="/" onClick={onClose} aria-label="Prithvi Data Loggers home" className="flex min-h-11 items-center">
            {logoWhite}
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 rounded-lg p-2.5 hover:bg-white/10"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {items.map((item) => {
              const sectionActive = isSectionActive(pathname, item);
              const current = isActive(pathname, item.href);
              const linkClass = cn(
                "block flex-1 rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10",
                sectionActive && "text-cyan-400",
              );

              if (!item.children?.length) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={current ? "page" : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const subId = `${baseId}-${item.href.replace(/\W/g, "")}`;
              const isOpen = expanded === item.href;
              return (
                <li key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={current ? "page" : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={subId}
                      aria-label={`${item.label} submenu`}
                      onClick={() => setExpanded(isOpen ? null : item.href)}
                      className="rounded-lg p-3 hover:bg-white/10"
                    >
                      <ChevronDownIcon
                        className={cn("size-5 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>
                  </div>
                  <ul id={subId} hidden={!isOpen} className="mb-2 ml-3 border-l border-white/15 pl-3">
                    {item.children.map((child) => {
                      const childCurrent = isActive(pathname, child.href);
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            aria-current={childCurrent ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white",
                              childCurrent && "font-semibold text-cyan-400",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-white/10 p-4 sm:p-6">
          <Button href={quoteHref} onClick={onClose} block>
            Get Solution
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button href={contact.telHref} variant="outline" aria-label={`Call ${contact.phoneDisplay}`}>
              <PhoneIcon className="size-4" />
              Call
            </Button>
            <Button href={contact.whatsappHref} variant="whatsapp" aria-label="Chat on WhatsApp">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export default function HeaderNav({ items, quoteHref, contact, logo, logoWhite }: HeaderNavProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-soft"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-(--header-h) max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Prithvi Data Loggers home" className="flex min-h-11 shrink-0 items-center">
          {logo}
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {items.map((item) =>
              item.children?.length ? (
                <DesktopDropdown
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  open={openDropdown === item.href}
                  onOpenChange={(open) =>
                    setOpenDropdown((current) =>
                      open ? item.href : current === item.href ? null : current,
                    )
                  }
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    data-active={isSectionActive(pathname, item)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-(--nav-hover-bg) data-[active=true]:text-(--nav-active)"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={quoteHref} className="px-4">
            Get Solution
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? "mobile-menu" : undefined}
            onClick={() => setMobileOpen(true)}
            className="-mr-2 rounded-lg p-2.5 hover:bg-(--nav-hover-bg) xl:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>
    </header>

    {/* Outside <header>: its backdrop-filter would make `fixed` children
        position relative to the header instead of the viewport. */}
    {/* Rendered only while open, so the page has one header logo and one set of
        nav links in the DOM instead of a hidden mobile copy. */}
    {mobileOpen && (
      <MobileMenu
        items={items}
        pathname={pathname}
        open={mobileOpen}
        onClose={closeMobile}
        logoWhite={logoWhite}
        quoteHref={quoteHref}
        contact={contact}
      />
    )}
    </>
  );
}
