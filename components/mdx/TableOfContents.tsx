"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Parse headings from markdown content - memoized to avoid re-computation
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches: TOCItem[] = [];
    const idCounts: Record<string, number> = {};
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Handle duplicate IDs by appending a counter
      if (idCounts[id] !== undefined) {
        idCounts[id]++;
        id = `${id}-${idCounts[id]}`;
      } else {
        idCounts[id] = 0;
      }

      matches.push({ id, text, level });
    }

    return matches;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-lg border-2 border-border bg-card shadow-neo flex flex-col max-h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-2 p-4 pb-3 border-b-2 border-border shrink-0">
        <List className="h-4 w-4 text-primary" />
        <span className="font-bold text-sm uppercase tracking-wide">
          On This Page
        </span>
      </div>
      <div className="overflow-y-auto overscroll-contain p-4 pt-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/50">
        <ul className="space-y-1 text-sm">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 px-2 rounded transition-all hover:bg-muted",
                  activeId === heading.id
                    ? "text-primary font-semibold bg-primary/10 border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
