import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; href: string };

type BreadcrumbsProps = {
  /** Trail after "Home"; the last item is the current page. */
  items: Crumb[];
  /**
   * Full hierarchy (after "Home") for the BreadcrumbList JSON-LD, when the
   * visible row is shorter than the real hierarchy. Defaults to `items`.
   */
  schemaItems?: Crumb[];
  className?: string;
};

// Every item is a plain inline row: no padding of its own, one identical gap
// either side of each separator, small muted text, current page semibold.
export default function Breadcrumbs({ items, schemaItems, className }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  const schemaTrail: Crumb[] = [{ name: "Home", href: "/" }, ...(schemaItems ?? items)];

  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs sm:text-sm", className)}>
      <JsonLd data={breadcrumbSchema(schemaTrail.map((c) => ({ name: c.name, path: c.href })))} />
      <ol className="flex flex-wrap items-center gap-y-1 text-muted group-data-[tone=dark]/section:text-slate-300">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="inline-flex min-h-6 items-center">
              {isLast ? (
                <span aria-current="page" className="font-semibold text-ink group-data-[tone=dark]/section:text-white">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="hover:text-brand-600 hover:underline group-data-[tone=dark]/section:hover:text-white"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-slate-400">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
