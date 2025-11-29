import { getPostBySlug, getPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TableOfContents } from "@/components/mdx/TableOfContents";
import { mdxComponents } from "@/components/mdx";
import { RelatedPosts } from "@/components/RelatedPosts";
import { PostNavigation } from "@/components/PostNavigation";
import { AuthorCard } from "@/components/AuthorCard";

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neocortex.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const postUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    keywords: post.meta.tags,
    authors: [{ name: post.meta.author || "NEO.CORTEX" }],
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.meta.date,
      authors: [post.meta.author || "NEO.CORTEX"],
      tags: post.meta.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.excerpt,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getPosts();

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <header className="relative border-b-4 border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <Link href="/blog">
                <NeoButton variant="ghost" className="mb-6 group font-mono text-xs uppercase tracking-wider">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  BACK_TO_LOG
                </NeoButton>
              </Link>

              <div className="flex gap-2 flex-wrap mb-4">
                {post.meta.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm font-bold">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                {post.meta.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                {post.meta.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-2 shadow-neo">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm font-medium">
                    {post.meta.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-2 shadow-neo">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="font-mono text-sm font-medium">
                    {post.meta.readingTime} min read
                  </span>
                </div>
                <ShareButtons title={post.meta.title} />
              </div>
            </ScrollReveal>
          </div>
        </header>

        {/* Main Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
              {/* Article */}
              <article className="max-w-4xl">
                <ScrollReveal delay={100}>
                  <NeoCard className="p-8 md:p-12 bg-card overflow-hidden border-4">
                    <div className="prose-article">
                      <MDXRemote source={post.content} components={mdxComponents} />
                    </div>
                  </NeoCard>
                </ScrollReveal>

                {/* Bottom Share */}
                <ScrollReveal delay={200}>
                  <div className="mt-8 p-6 bg-muted/50 rounded-lg border-2 border-border shadow-neo">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="font-bold text-lg font-mono uppercase tracking-tight">
                        SHARE_THIS_POST()
                      </p>
                      <ShareButtons title={post.meta.title} />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Author Card */}
                <ScrollReveal delay={300}>
                  <div className="mt-8">
                    <AuthorCard 
                      name="NEO.CORTEX"
                      bio="Decoding the singularity with raw code and bold design. Writing about AI, software engineering, and the future of technology."
                      github="iamartyaa"
                      x="evilseyee"
                    />
                  </div>
                </ScrollReveal>

                {/* Post Navigation */}
                <ScrollReveal delay={400}>
                  <PostNavigation currentSlug={slug} allPosts={allPosts} />
                </ScrollReveal>

                {/* Related Posts */}
                <ScrollReveal delay={500}>
                  <RelatedPosts
                    currentSlug={slug}
                    currentTags={post.meta.tags || []}
                    allPosts={allPosts}
                  />
                </ScrollReveal>
              </article>

              {/* Sidebar with TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <ScrollReveal delay={150}>
                    <TableOfContents content={post.content} />
                  </ScrollReveal>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
