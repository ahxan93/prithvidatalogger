import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { founder } from "@/data/company";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import SummaryBox from "@/components/blog/SummaryBox";
import CtaBand from "@/components/sections/CtaBand";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import PageHero from "@/components/sections/PageHero";
import { getBlogCoverDevice } from "@/data/page-heroes";
import JsonLd from "@/components/seo/JsonLd";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon } from "@/components/ui/icons";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// Cache Components requires at least one param at build time. Until a real
// post exists, a placeholder slug is generated and resolves to the 404 page.
const PLACEHOLDER_SLUG = "__placeholder__";

// Every valid path is prerendered at build time, so navigations may wait for the
// (static) page instead of showing a loading shell.
export const instant = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  // Covers the __placeholder__ slug too: never indexable (it is also not in sitemap.xml).
  if (!post) return { robots: { index: false, follow: false } };

  return buildMetadata({
    // seoTitle is only set when the full title (used for the H1) would run
    // over 60 characters even without the usual " | Prithvi Data Loggers" suffix.
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    // The cover photo (see getBlogCoverDevice) rendered with the title.
    image: `/og/blog/${post.slug}`,
    // Drafts stay reachable by direct link for review, but never indexed.
    noIndex: post.draft,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const mod = (await import(`@/content/blog/${slug}.mdx`)) as { default: ComponentType };
  const Content = mod.default;
  const related = await getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.reviewedDate ?? post.date,
            author: post.author,
            image: `/og/blog/${post.slug}`,
          }),
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        eyebrow="Blog"
        title={post.title}
        intro={post.description}
        visual={
          <LiveDeviceVisual devices={[getBlogCoverDevice(post.slug)]} altPrefix={`Cover image for ${post.title}`} />
        }
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <UserIcon className="size-4 text-cyan-400" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-cyan-400" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-2">
            <ClockIcon className="size-4 text-cyan-400" />
            {post.readingMinutes} min read
          </span>
        </div>
      </PageHero>

      <Section aria-labelledby="article-title">
        <h2 id="article-title" className="sr-only">
          Article
        </h2>
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
            <ArrowLeftIcon className="size-4" />
            All articles
          </Link>

          <div className="mt-8">
            <SummaryBox points={post.summary} />
          </div>

          <div className="mt-2">
            <Content />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 pt-8">
            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink ring-1 ring-inset ring-slate-200">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {/* "Reviewed by" appears only once published, and only when a genuinely different person reviewed it. */}
            {!post.draft && post.reviewedBy && post.reviewedDate && post.reviewedBy !== post.author && (
              <p className="text-sm text-muted">
                Reviewed by{" "}
                <Link href="/about#founder" className="font-medium text-brand-600 hover:underline">
                  {post.reviewedBy}
                </Link>
                , {founder.title} · {formatDate(post.reviewedDate)}
              </p>
            )}
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="surface" aria-labelledby="related-title">
          <SectionHeading id="related-title" eyebrow="Related" title="More to Read" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedPost) => (
              <li key={relatedPost.slug}>
                <PostCard post={relatedPost} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        id="blog-cta"
        title="Ready to Start Monitoring?"
        text="Tell us what you need to track and we'll recommend the right data logger and send a quote."
      />
    </>
  );
}
