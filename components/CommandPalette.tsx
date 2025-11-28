"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, Home, GitPullRequest, Hash, X } from "lucide-react";
import { Post } from "@/lib/mdx";

interface CommandPaletteProps {
  posts: Post[];
  tags: string[];
}

export function CommandPalette({ posts, tags }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle with ⌘K or Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Trigger Button - Expands to fill available space */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex flex-1 items-center gap-2 px-4 py-1.5 text-sm text-muted-foreground bg-muted border-2 border-border rounded-lg hover:bg-card hover:text-foreground transition-all shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        <Search className="h-4 w-4 flex-shrink-0" />
        <span className="font-mono text-xs flex-1 text-left">Search posts...</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded flex-shrink-0">
          ⌘K
        </kbd>
      </button>

      {/* Command Dialog */}
      {open && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl p-4">
            <Command className="bg-card border-4 border-border rounded-xl shadow-neo-xl overflow-hidden">
              <div className="flex items-center border-b-4 border-border px-4">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Command.Input
                  placeholder="Search posts, tags, or navigate..."
                  className="flex-1 h-14 px-4 bg-transparent text-lg outline-none placeholder:text-muted-foreground font-mono"
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-12 text-center text-muted-foreground font-mono">
                  NO_RESULTS_FOUND
                </Command.Empty>

                {/* Navigation */}
                <Command.Group heading="NAVIGATION" className="px-2 py-1">
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/"))}
                    icon={<Home className="h-4 w-4" />}
                    label="Home"
                    shortcut="H"
                  />
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/blog"))}
                    icon={<FileText className="h-4 w-4" />}
                    label="Blog"
                    shortcut="B"
                  />
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/contribute"))}
                    icon={<GitPullRequest className="h-4 w-4" />}
                    label="Contribute"
                    shortcut="C"
                  />
                </Command.Group>

                {/* Posts */}
                <Command.Group heading="POSTS" className="px-2 py-1">
                  {posts.slice(0, 10).map((post) => (
                    <CommandItem
                      key={post.slug}
                      onSelect={() =>
                        runCommand(() => router.push(`/blog/${post.slug}`))
                      }
                      icon={<FileText className="h-4 w-4" />}
                      label={post.meta.title}
                      description={post.meta.excerpt?.slice(0, 60) + "..."}
                    />
                  ))}
                </Command.Group>

                {/* Tags */}
                <Command.Group heading="TAGS" className="px-2 py-1">
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() =>
                        runCommand(() => router.push(`/blog?tag=${tag}`))
                      }
                      icon={<Hash className="h-4 w-4" />}
                      label={`#${tag}`}
                    />
                  ))}
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t-2 border-border bg-muted/50 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">↵</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">Esc</kbd>
                    Close
                  </span>
                </div>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}

function CommandItem({
  onSelect,
  icon,
  label,
  description,
  shortcut,
}: {
  onSelect: () => void;
  icon: React.ReactNode;
  label: string;
  description?: string;
  shortcut?: string;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm hover:bg-primary/10 data-[selected=true]:bg-primary/20 data-[selected=true]:text-foreground transition-colors group"
    >
      <span className="text-muted-foreground group-data-[selected=true]:text-primary">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground truncate">
            {description}
          </div>
        )}
      </div>
      {shortcut && (
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-muted border border-border rounded opacity-50 group-data-[selected=true]:opacity-100">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  );
}
