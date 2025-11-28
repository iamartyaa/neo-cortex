import Link from "next/link";
import { Post } from "@/lib/mdx";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostNavigationProps {
  currentSlug: string;
  allPosts: Post[];
}

export function PostNavigation({ currentSlug, allPosts }: PostNavigationProps) {
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);
  
  // Posts are sorted newest first, so "next" is actually older (higher index)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (!prevPost && !nextPost) return null;

  return (
    <div className="mt-12 pt-8 border-t-4 border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous (Newer) Post */}
        <div>
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="block group">
              <div className="p-6 rounded-lg border-2 border-border bg-card shadow-neo hover-lift transition-all h-full">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                  <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                  PREV_POST
                </div>
                <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.meta.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="p-6 rounded-lg border-2 border-dashed border-border/50 bg-muted/30 h-full flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-mono">
                {/* START_OF_LOG */}
                {"// START_OF_LOG"}
              </span>
            </div>
          )}
        </div>

        {/* Next (Older) Post */}
        <div>
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="block group">
              <div className="p-6 rounded-lg border-2 border-border bg-card shadow-neo hover-lift transition-all h-full text-right">
                <div className="flex items-center justify-end gap-2 text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                  NEXT_POST
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.meta.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="p-6 rounded-lg border-2 border-dashed border-border/50 bg-muted/30 h-full flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-mono">
                {/* END_OF_LOG */}
                {"// END_OF_LOG"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
