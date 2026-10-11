import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from "react";

// Required by @next/mdx for the App Router (see next.config.ts). Maps the plain
// HTML elements markdown produces onto the site's typography, so every blog
// post (src/content/blog/*.mdx) reads like the rest of the site without any
// per-post styling. Blog post width is set by the prose wrapper in
// src/app/blog/[slug]/page.tsx (max-w-3xl); these components only set type.

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function MdxLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const className = "font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700";
  if (isInternal(href)) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={className} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-4 font-heading text-2xl font-bold text-ink sm:text-3xl" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 font-heading text-xl font-semibold text-ink sm:text-2xl" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 text-lg leading-relaxed text-muted text-pretty first:mt-0" {...props}>
      {children}
    </p>
  ),
  a: MdxLink,
  ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 ml-5 list-disc space-y-2 text-lg leading-relaxed text-muted marker:text-brand-400" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 ml-5 list-decimal space-y-2 text-lg leading-relaxed text-muted marker:font-semibold marker:text-brand-600" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1.5" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 rounded-r-xl border-l-4 border-brand-600 bg-brand-50 py-4 pr-5 pl-6 text-lg leading-relaxed text-ink italic [&>p]:mt-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => <hr className="my-10 border-slate-200" {...props} />,
  code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-brand-700" {...props}>
      {children}
    </code>
  ),
  // GitHub-Flavored Markdown tables (remark-gfm), e.g. a Wi-Fi/GSM/LoRa comparison.
  table: ({ children, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-soft">
      <table className="w-full min-w-[32rem] border-collapse text-left text-base" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-slate-200 bg-brand-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th scope="col" className="px-4 py-3 font-heading text-sm font-semibold text-ink" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-t border-slate-100 px-4 py-3 text-muted" {...props}>
      {children}
    </td>
  ),
  // Markdown `![alt](src)` carries no intrinsic size, so this fills a fixed-ratio
  // box instead of passing width/height through to next/image.
  img: ({ src, alt = "" }: ImgHTMLAttributes<HTMLImageElement>) =>
    typeof src === "string" && (
      <span className="relative mt-6 block aspect-video overflow-hidden rounded-2xl shadow-soft">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
      </span>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
