import { getPosts, getAllTags } from "@/lib/mdx";
import { BlogFilter } from "@/components/BlogFilter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedText, AnimatedLine } from "@/components/animations";

import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neocortex.dev";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore articles on AI, machine learning, software engineering, and the future of technology. In-depth tutorials, insights, and thought pieces.",
  openGraph: {
    title: "NEO.CORTEX Blog - AI & Tech Articles",
    description: "Explore articles on AI, machine learning, software engineering, and the future of technology.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEO.CORTEX Blog - AI & Tech Articles",
    description: "Explore articles on AI, machine learning, software engineering, and the future of technology.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  const posts = getPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-4">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-bold uppercase rounded-full border-2 border-border shadow-neo">
              📚 All Articles
            </div>
            <AnimatedText
              text="The Blog"
              as="h1"
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              splitBy="letter"
              animation="fadeUp"
              staggerDelay={50}
            />
            <AnimatedLine 
              variant="underline" 
              width={120} 
              height={8} 
              strokeWidth={4}
              strokeColor="var(--primary)"
              delay={500}
              className="mx-auto"
            />
            <AnimatedText
              text="Thoughts, tutorials, and rants about the future of technology."
              as="p"
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              splitBy="word"
              animation="fadeUp"
              delay={300}
              staggerDelay={40}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <BlogFilter posts={posts} allTags={tags} />
        </ScrollReveal>
      </div>
    </div>
  );
}
