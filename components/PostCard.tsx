import Link from "next/link";
import { Clock } from "lucide-react";
import { Post } from "@/lib/mdx";
import { NeoCard } from "./ui/NeoCard";
import { Badge } from "./ui/Badge";
import { NeoButton } from "./ui/NeoButton";

export function PostCard({ post }: { post: Post }) {
  return (
    <NeoCard className="flex flex-col h-full overflow-hidden hover-lift group">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.meta.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {post.meta.title}
        </h3>
        <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
          {post.meta.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-border">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono">{post.meta.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.meta.readingTime} min
            </span>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <NeoButton variant="outline" className="text-xs h-8 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              Read →
            </NeoButton>
          </Link>
        </div>
      </div>
    </NeoCard>
  );
}
