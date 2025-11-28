import { Quote as QuoteIcon } from "lucide-react";

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
}

export function Quote({ children, author, source }: QuoteProps) {
  return (
    <figure className="my-8 relative">
      <div className="absolute -left-4 -top-4 text-primary opacity-20">
        <QuoteIcon className="h-16 w-16 rotate-180" fill="currentColor" />
      </div>
      <blockquote className="relative border-l-4 border-primary bg-muted/50 p-6 pl-8 rounded-r-lg shadow-neo border-2 border-border italic text-lg leading-relaxed">
        {children}
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-4 text-right text-sm text-muted-foreground">
          {author && <span className="font-semibold">— {author}</span>}
          {source && <span className="ml-2 opacity-75">({source})</span>}
        </figcaption>
      )}
    </figure>
  );
}

