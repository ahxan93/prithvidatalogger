import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; href: string };

type BreadcrumbsProps = {
  /** Trail after "Home"; the last item is the current page. */
  items: Crumb[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <JsonLd data={breadcrumbSchema(trail.map((c) => ({ name: c.name, path: c.href })))} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted group-data-[tone=dark]/section:text-slate-300">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink group-data-[tone=dark]/section:text-white">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-brand-600 hover:underline group-data-[tone=dark]/section:hover:text-white"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-slate-400">
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
