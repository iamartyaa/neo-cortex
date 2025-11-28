"use client";

import { useState } from "react";
import { Post } from "@/lib/mdx";
import { NeoInput } from "./ui/NeoInput";
import { Badge } from "./ui/Badge";
import { PostCard } from "./PostCard";

interface BlogFilterProps {
  posts: Post[];
  allTags: string[];
}

export function BlogFilter({ posts, allTags }: BlogFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.meta.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTag = selectedTag
      ? post.meta.tags?.includes(selectedTag)
      : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 border-2 border-border bg-card shadow-neo rounded-lg">
        <div className="w-full md:w-1/3">
          <NeoInput
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <Badge
            className="cursor-pointer hover:opacity-80"
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              className="cursor-pointer hover:opacity-80"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-lg bg-muted/50">
          <p className="text-muted-foreground text-lg">
            No posts found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

