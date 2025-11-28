import Link from "next/link";
import { Post } from "@/lib/mdx";
import { Badge } from "./ui/Badge";
import { NeoCard } from "./ui/NeoCard";
import { Clock, ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  currentSlug: string;
  currentTags: string[];
  allPosts: Post[];
}

export function RelatedPosts({ currentSlug, currentTags, allPosts }: RelatedPostsProps) {
  // Find related posts based on shared tags
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.meta.tags?.filter((tag) =>
        currentTags.includes(tag)
      ) || [];
      return { ...post, relevance: sharedTags.length };
    })
    .filter((post) => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    // If no related posts by tags, show latest posts
    const latestPosts = allPosts
      .filter((post) => post.slug !== currentSlug)
      .slice(0, 3);
    
    if (latestPosts.length === 0) return null;
    
    return (
      <RelatedPostsUI 
        posts={latestPosts} 
        title="MORE_POSTS.LOG" 
        subtitle="Continue exploring" 
      />
    );
  }

  return (
    <RelatedPostsUI 
      posts={relatedPosts} 
      title="RELATED_NODES.LOG" 
      subtitle="Similar neural pathways" 
    />
  );
}

function RelatedPostsUI({ 
  posts, 
  title, 
  subtitle 
}: { 
  posts: Post[]; 
  title: string; 
  subtitle: string;
}) {
  return (
    <div className="mt-16 pt-12 border-t-4 border-border">
      <div className="mb-8">
        <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">
          {subtitle}
        </span>
        <h3 className="text-3xl font-black uppercase tracking-tight mt-1">
          {title}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <NeoCard className="h-full p-5 hover-lift group cursor-pointer">
              <div className="flex gap-2 mb-3 flex-wrap">
                {post.meta.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.meta.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                <span className="font-mono">{post.meta.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.meta.readingTime} min
                </span>
                <ArrowRight className="h-3 w-3 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </NeoCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

