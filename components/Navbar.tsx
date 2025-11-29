import Link from "next/link";
import { GitPullRequest } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NeoButton } from "./ui/NeoButton";
import { CommandPalette } from "./CommandPalette";
import { getPosts, getAllTags } from "@/lib/mdx";
import { AnimatedLogo } from "./animations/AnimatedLogo";

export function Navbar() {
  const posts = getPosts();
  const tags = getAllTags();

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 gap-4">
        {/* Animated Logo */}
        <AnimatedLogo />
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-shrink-0">
          <Link href="/blog">
            <NeoButton variant="ghost" className="font-bold font-mono text-xs uppercase tracking-wider">
              /blog
            </NeoButton>
          </Link>
          <Link href="/contribute">
            <NeoButton variant="ghost" className="font-bold font-mono text-xs uppercase tracking-wider">
              <GitPullRequest className="h-3.5 w-3.5 mr-2" />
              /contribute
            </NeoButton>
          </Link>
        </nav>
        
        {/* Search - Expands to fill available space */}
        <div className="hidden md:flex flex-1 justify-end">
          <CommandPalette posts={posts} tags={tags} />
        </div>
        
        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
          <Link href="/contribute" className="md:hidden">
            <NeoButton size="icon" variant="ghost" className="w-10 h-10">
              <GitPullRequest className="h-5 w-5" />
            </NeoButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
