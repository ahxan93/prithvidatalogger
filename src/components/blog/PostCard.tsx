import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import ImageFallback from "@/components/ui/ImageFallback";
import { CalendarIcon, ClockIcon } from "@/components/ui/icons";
import { isPlaceholderImage, resolvePublicImage } from "@/lib/images";

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
export default function PostCard({ post, as: Heading = "h3" }: PostCardProps) {
  const cover = resolvePublicImage(post.cover);
  const showCover = cover && !isPlaceholderImage(cover);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:border-brand-200 hover:shadow-soft-lg focus-within:border-brand-300">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {showCover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <ImageFallback tone="light" label={post.tags[0]} />
        )}
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
