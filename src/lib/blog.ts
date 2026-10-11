import fs from "node:fs";
import path from "node:path";

// Posts live as .mdx files in src/content/blog, one file per post. The slug is
// always the filename (no slug field in frontmatter) so publishing never means
// touching two places. See src/content/blog/*.mdx for the format.

export type BlogMeta = {
  /** Full headline (brief §7.10); shown as the H1 and in the Article schema. No length cap. */
  title: string;
  /**
   * <title> tag text when `title` itself would run over 60 characters even
   * without the " | Prithvi Data Loggers" suffix (CLAUDE.md's title-length
   * rule). Falls back to `title`. Keep ≤ 60 characters.
   */
  seoTitle?: string;
  /** Meta description; ≤ 155 characters (brief §5/CLAUDE.md). */
  description: string;
  /** ISO date, e.g. "2026-02-10". */
  date: string;
  author: string;
  /**
   * Shown as "Reviewed by {reviewedBy} on {reviewedDate}" only once published,
   * and only when reviewedBy is a different person from author. Omit both
   * fields until a second reviewer actually reviews the post.
   */
  reviewedBy?: string;
  reviewedDate?: string;
  /** Extension-less path under public/; resolved via resolvePublicImage (any format). */
  cover: string;
  tags: string[];
  /** 3–5 short bullets rendered in the "quick summary" box at the top of the post. */
  summary: string[];
  /** noindex, excluded from sitemap.xml and /blog while true. Flip to publish. */
  draft: boolean;
};

export type BlogPost = BlogMeta & {
  slug: string;
  /** Whole minutes, minimum 1, estimated from the MDX source word count. */
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const WORDS_PER_MINUTE = 200;

function listSlugs(): string[] {
  try {
    return fs
      .readdirSync(CONTENT_DIR)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""))
      .sort();
  } catch {
    return [];
  }
}

/** Reads the raw file so reading time doesn't require compiling the MDX body. */
function estimateReadingMinutes(slug: string): number {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
    const afterFrontmatter = raw.slice(raw.indexOf("\n};") + 3);
    const words = afterFrontmatter
      .replace(/[#>*_`[\]()-]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  } catch {
    return 1;
  }
}

/** Every post, draft included, newest first. Used by generateStaticParams. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = listSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/blog/${slug}.mdx`)) as { meta: BlogMeta };
      return { ...mod.meta, slug, readingMinutes: estimateReadingMinutes(slug) };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Published posts only, newest first. Used by /blog and sitemap.xml. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).filter((post) => !post.draft);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await getAllPosts()).find((post) => post.slug === slug);
}

/** Up to `count` other published posts sharing a tag; falls back to the newest. */
export async function getRelatedPosts(current: BlogPost, count = 3): Promise<BlogPost[]> {
  const others = (await getPublishedPosts()).filter((post) => post.slug !== current.slug);
  const sharedTags = (post: BlogPost) => post.tags.filter((tag) => current.tags.includes(tag)).length;
  return others.sort((a, b) => sharedTags(b) - sharedTags(a) || b.date.localeCompare(a.date)).slice(0, count);
}
