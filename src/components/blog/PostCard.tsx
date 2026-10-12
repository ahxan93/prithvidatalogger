import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { CalendarIcon, ClockIcon } from "@/components/ui/icons";
import { getBlogCoverDevice } from "@/data/page-heroes";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

type PostCardProps = {
  post: BlogPost;
  /** Heading level for the title (h2 in a top-level grid, h3 inside a titled section). */
  as?: "h2" | "h3";
};

// Article card for /blog and the related-posts grid. Server component: the
// cover image (or its placeholder fallback) is resolved at build time.
export default async function PostCard({ post, as: Heading = "h3" }: PostCardProps) {
  const device = getBlogCoverDevice(post.slug);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300">
      {/* The post's cover photo, never cropped: object-contain with padding on a soft background. */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-b from-surface to-white">
        <div className="absolute inset-3 sm:inset-4">
          <Image
            src={device.src}
            alt={`Cover image: ${device.alt}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="size-3.5" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="size-3.5" />
            {post.readingMinutes} min read
          </span>
        </div>
        <Heading className="mt-3 font-heading text-xl font-semibold text-ink">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <li key={tag} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink ring-1 ring-inset ring-slate-200">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
