import { getPosts, getAllTags } from "@/lib/mdx";
import { BlogFilter } from "@/components/BlogFilter";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Blog | Neo-Brutalist Blog",
  description: "Browse all our latest posts on tech, AI, and design.",
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
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              The Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and rants about the future of technology.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <BlogFilter posts={posts} allTags={tags} />
        </ScrollReveal>
      </div>
    </div>
  );
}
