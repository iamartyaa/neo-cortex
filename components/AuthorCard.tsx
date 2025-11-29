import Image from "next/image";
import { NeoCard } from "./ui/NeoCard";
import { Github, Globe } from "lucide-react";
import { XIcon } from "./ui/XIcon";

interface AuthorCardProps {
  name?: string;
  bio?: string;
  avatar?: string;
  x?: string;
  github?: string;
  website?: string;
}

export function AuthorCard({
  name = "NEO.CORTEX",
  bio = "Decoding the singularity with raw code and bold design. Writing about AI, software engineering, and the future of technology.",
  avatar,
  x,
  github,
  website,
}: AuthorCardProps) {
  return (
    <NeoCard className="p-6 md:p-8 bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <div className="relative h-24 w-24">
              <Image
                src={avatar}
                alt={name}
                fill
                className="rounded-full border-4 border-border shadow-neo object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-border shadow-neo flex items-center justify-center">
              <span className="text-4xl font-black text-primary-foreground">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
            <h3 className="text-xl font-black uppercase tracking-tight">
              {name}
            </h3>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <span className="text-xs font-mono text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
              AUTHOR
            </span>
          </div>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            {x && (
              <a
                href={`https://x.com/${x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border-2 border-border bg-card shadow-neo hover:bg-foreground hover:text-background hover:border-foreground transition-all hover:-translate-y-1"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="h-4 w-4" />
              </a>
            )}
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border-2 border-border bg-card shadow-neo hover:bg-foreground hover:text-background transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border-2 border-border bg-card shadow-neo hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-1"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </NeoCard>
  );
}

