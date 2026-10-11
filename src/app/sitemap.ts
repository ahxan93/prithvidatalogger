import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { getAllLocations, locationHref } from "@/data/locations";
import { getPublishedPosts } from "@/lib/blog";

const staticPaths = [
  "/",
  "/about",
  "/brands",
  "/products",
  "/industries",
  "/services",
  "/global-presence",
  "/locations",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Draft posts are noindex and stay out of the sitemap (brief §7.10).
  const publishedPosts = await getPublishedPosts();

  const paths = [
    ...staticPaths,
    ...products.map((product) => `/products/${product.slug}`),
    ...industries.map((industry) => `/industries/${industry.slug}`),
    ...services.map((service) => service.href),
    // Non-indexable locations are noindex and stay out of the sitemap.
    ...getAllLocations()
      .filter((location) => location.node.indexable)
      .map((location) => locationHref(location.path)),
    ...publishedPosts.map((post) => `/blog/${post.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
