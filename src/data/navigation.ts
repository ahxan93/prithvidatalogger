import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { services } from "@/data/services";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const headerNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "Founder", href: "/about#founder" },
      { label: "Global Presence", href: "/global-presence" },
    ],
  },
  { label: "Brands", href: "/brands" },
  {
    label: "Products",
    href: "/products",
    children: products.map((product) => ({
      label: product.name,
      href: `/products/${product.slug}`,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((industry) => ({
      label: industry.name,
      href: `/industries/${industry.slug}`,
    })),
  },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.shortName,
      href: service.href,
    })),
  },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerCompanyNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** Target for every "Get a Quote" CTA: the enquiry form on /contact. */
export const quoteHref = "/contact#enquiry";
