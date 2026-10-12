import { getPublishedPosts } from "@/lib/blog";
import LiveDeviceVisual from "@/components/sections/LiveDeviceVisual";
import { getPageHeroDevices } from "@/data/page-heroes";
import PostCard from "@/components/blog/PostCard";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import { BookOpenIcon } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Articles on temperature and humidity data loggers, cold chain monitoring, calibration and compliance from the Prithvi Data Loggers team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        visual={<LiveDeviceVisual devices={getPageHeroDevices("blog")} />}
        crumbs={[{ name: "Blog", href: "/blog" }]}
        eyebrow="Blog"
        title="Guides on Data Loggers & Cold Chain Monitoring"
        intro="Practical articles on choosing, installing and maintaining temperature and humidity data loggers, written by our team."
      />

      <Section aria-labelledby="posts-title">
        <h2 id="posts-title" className="sr-only">
          Articles
        </h2>
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} as="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-surface px-8 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft">
              <BookOpenIcon className="size-7" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-semibold text-ink">Articles coming soon</h3>
            <p className="mt-2 leading-relaxed text-muted">
              We are writing guides on data loggers, cold chain monitoring and compliance. Check back soon, or get in
              touch if you have a question in the meantime.
            </p>
          </div>
        )}
      </Section>

      <CtaBand
        id="blog-cta"
        title="Have a Question About Monitoring?"
        text="Tell us what you need to track and we'll recommend the right data logger and send a quote."
      />
    </>
  );
}
