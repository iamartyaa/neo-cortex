"use client";

import { useState, useEffect } from "react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoInput } from "@/components/ui/NeoInput";
import { NeoCard } from "@/components/ui/NeoCard";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { 
  Copy, 
  Check, 
  FileText, 
  Eye, 
  Download, 
  GitPullRequest, 
  GitFork,
  GitBranch,
  CheckCircle2,
  ExternalLink,
  Code2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  Lightbulb,
  AlertCircle,
  Circle,
  Monitor
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

// Helper to extract YouTube video ID
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Code Block with Mac-style window
const CodeBlockPreview = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace(/language-/, "") || "text";
  const code = typeof children === "string" ? children : String(children);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg border-2 border-border overflow-hidden shadow-neo bg-[#1e1e1e]">
      {/* Mac-style title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <Circle className="w-3 h-3 fill-red-500 text-red-500" />
            <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <Circle className="w-3 h-3 fill-green-500 text-green-500" />
          </div>
          <span className="text-xs text-gray-400 font-mono ml-2">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#404040]"
          suppressHydrationWarning
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  );
};

// Preview components for client-side rendering
const previewComponents = {
  // Headings
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-black mt-8 mb-4 tracking-tight">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 pb-2 border-b-2 border-border flex items-center gap-2">
      <span className="text-primary">#</span>
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-bold mt-5 mb-2 flex items-center gap-2">
      <span className="text-secondary">##</span>
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
  ),

  // Paragraphs
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-3 leading-relaxed text-foreground/90">{children}</p>
  ),

  // Lists - Unordered
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-2 space-y-2">{children}</ul>
  ),

  // Lists - Ordered
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-2 space-y-2 list-none counter-reset-item">{children}</ol>
  ),

  // List items
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary">
      {children}
    </li>
  ),

  // Links
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a 
      href={href} 
      className="text-primary font-medium underline decoration-2 decoration-primary/30 underline-offset-2 hover:decoration-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // Strong/Bold
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),

  // Emphasis/Italic
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),

  // Inline code
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    // If it has a className, it's likely a code block (handled by pre)
    if (className) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-sm text-primary">
        {children}
      </code>
    );
  },

  // Code blocks (pre wraps code)
  pre: ({ children }: { children: React.ReactElement }) => {
    const codeProps = children?.props as { className?: string; children?: React.ReactNode } || {};
    return (
      <CodeBlockPreview className={codeProps.className}>
        {codeProps.children}
      </CodeBlockPreview>
    );
  },

  // Blockquote
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-6 border-l-4 border-primary bg-muted/50 p-4 pl-6 rounded-r-lg italic text-lg">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-t-2 border-border" />
  ),

  // Tables
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-lg border-2 border-border shadow-neo">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-primary/10 border-b-2 border-border">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-xs">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-3">{children}</td>
  ),

  // Images
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-6">
      <div className="rounded-lg border-2 border-border shadow-neo overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} className="w-full h-auto" />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          📷 {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Callout component for preview
  Callout: ({ type = "info", children }: { type?: string; children: React.ReactNode }) => {
    const styles: Record<string, { bg: string; border: string; icon: React.ReactNode }> = {
      info: { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-500", icon: <Info className="h-5 w-5 text-blue-500" /> },
      warning: { bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-500", icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
      tip: { bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-500", icon: <Lightbulb className="h-5 w-5 text-green-500" /> },
      danger: { bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-500", icon: <AlertCircle className="h-5 w-5 text-red-500" /> },
    };
    const style = styles[type] || styles.info;
    return (
      <div className={`my-4 p-4 rounded-lg border-l-4 ${style.bg} ${style.border}`}>
        <div className="flex gap-3">
          {style.icon}
          <div>{children}</div>
        </div>
      </div>
    );
  },

  // Quote component for preview
  Quote: ({ children, author, source }: { children: React.ReactNode; author?: string; source?: string }) => (
    <figure className="my-6 border-l-4 border-primary bg-muted/50 p-4 pl-6 rounded-r-lg">
      <blockquote className="italic text-lg">{children}</blockquote>
      {(author || source) && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {author && <span className="font-semibold">— {author}</span>}
          {source && <span className="ml-1">({source})</span>}
        </figcaption>
      )}
    </figure>
  ),

  // Video component with YouTube embed
  Video: ({ src, caption }: { src: string; caption?: string }) => {
    const youtubeId = getYouTubeId(src);
    
    if (youtubeId) {
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg border-2 border-border shadow-neo overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={caption || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
              📹 {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    // Fallback for non-YouTube videos
    return (
      <figure className="my-6">
        <div className="relative aspect-video rounded-lg border-2 border-border shadow-neo overflow-hidden bg-black">
          <video src={src} controls className="w-full h-full">
            Your browser does not support the video tag.
          </video>
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
            📹 {caption}
          </figcaption>
        )}
      </figure>
    );
  },

  // ImageWithCaption for preview
  ImageWithCaption: ({ src, alt, caption }: { src: string; alt?: string; caption?: string }) => (
    <figure className="my-6">
      <div className="rounded-lg border-2 border-border shadow-neo overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} className="w-full h-auto" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          📷 {caption}
        </figcaption>
      )}
    </figure>
  ),

  // Steps component for preview
  Steps: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 space-y-4">{children}</div>
  ),
  Step: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">•</div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  ),

  // Divider for preview
  Divider: () => <hr className="my-8 border-t-2 border-border" />,
};

export default function ContributePage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorGithub, setAuthorGithub] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const generateDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const generateMDX = () => {
    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    return `---
title: "${title}"
date: "${generateDate()}"
excerpt: "${excerpt}"
tags: [${tagArray.map((t) => `"${t}"`).join(", ")}]
author: "${authorName || "Anonymous"}"
authorGithub: "${authorGithub}"
---

${content}
`;
  };

  // Compile MDX for preview
  useEffect(() => {
    const compileMdx = async () => {
      if (!content.trim()) {
        setMdxSource(null);
        setPreviewError(null);
        return;
      }

      try {
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        });
        setMdxSource(mdxSource);
        setPreviewError(null);
      } catch (error: any) {
        setPreviewError(error.message || "Error parsing MDX");
        setMdxSource(null);
      }
    };

    const debounce = setTimeout(compileMdx, 500);
    return () => clearTimeout(debounce);
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMDX());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generateMDX()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generateSlug(title) || "new-post"}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 text-sm font-bold uppercase rounded-full border-2 border-border shadow-neo">
              <GitPullRequest className="h-4 w-4" />
              Open Source Contributions
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              CONTRIBUTE<span className="text-primary">_</span>YOUR<span className="text-primary">_</span>POST
            </h1>
            {/* Desktop description */}
            <p className="hidden lg:block text-muted-foreground max-w-2xl mx-auto text-lg">
              Share your knowledge with the community! Write your article below, preview it in real-time, 
              then submit it via a GitHub Pull Request.
            </p>
            {/* Mobile description */}
            <p className="block lg:hidden text-muted-foreground max-w-2xl mx-auto text-lg">
              Share your knowledge with the community! Follow the contribution guide below 
              to submit your article via GitHub Pull Request.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile Notice - Editor only available on desktop */}
        <div className="block lg:hidden">
          <ScrollReveal delay={100}>
            <NeoCard className="p-6 border-primary bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary text-primary-foreground">
                  <Monitor className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Interactive Editor Available on Desktop</h3>
                  <p className="text-muted-foreground text-sm">
                    Our live MDX editor with real-time preview works best on larger screens. 
                    Visit this page on a desktop or tablet to write and preview your article directly in the browser.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    On mobile, you can still review the contribution guidelines and MDX formatting guide below!
                  </p>
                </div>
              </div>
            </NeoCard>
          </ScrollReveal>
        </div>

        {/* Main Grid - Editor and Preview (desktop only) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {/* Editor */}
          <ScrollReveal delay={100}>
            <NeoCard className="p-6 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                POST_METADATA
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 font-mono">title:</label>
                  <NeoInput
                    placeholder="My Awesome Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-mono">excerpt:</label>
                  <NeoInput
                    placeholder="A brief description of your post (1-2 sentences)"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 font-mono">author:</label>
                    <NeoInput
                      placeholder="Your Name"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 font-mono">github:</label>
                    <NeoInput
                      placeholder="yourusername"
                      value={authorGithub}
                      onChange={(e) => setAuthorGithub(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-mono">
                    tags: <span className="text-muted-foreground font-normal">(comma separated)</span>
                  </label>
                  <NeoInput
                    placeholder="ai, webdev, tutorial"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  {tags && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {tags.split(",").map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          #{tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-mono">content:</label>
                  <textarea
                    className="flex min-h-[400px] w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono transition-all focus:shadow-neo focus:translate-x-[-2px] focus:translate-y-[-2px]"
                    placeholder={`## Introduction

Write your content here using **Markdown** syntax...

### Code Example

\`\`\`javascript
console.log('Hello, NEO.CORTEX!');
\`\`\`

### Key Points

- First important point
- Second important point
- Third important point

> "A great quote to inspire readers"

Check out [this link](https://example.com) for more info.`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t-2 border-border">
                <NeoButton onClick={handleCopy} className="flex-1">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" /> Copy MDX
                    </>
                  )}
                </NeoButton>
                <NeoButton onClick={handleDownload} variant="secondary" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download .mdx
                </NeoButton>
              </div>
            </NeoCard>
          </ScrollReveal>

          {/* Preview */}
          <ScrollReveal delay={200}>
            <NeoCard className="p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  LIVE_PREVIEW
                </h2>
                <NeoButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  {showPreview ? "Show Raw" : "Show Preview"}
                </NeoButton>
              </div>

              {showPreview ? (
                <div className="min-h-[500px] overflow-y-auto">
                  {/* Post Header Preview */}
                  <div className="mb-6 pb-6 border-b-2 border-border">
                    {tags && (
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {tags.split(",").map((tag, i) => (
                          <Badge key={i} variant="secondary">
                            #{tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h1 className="text-2xl font-black mb-2">
                      {title || "Your Post Title"}
                    </h1>
                    <p className="text-muted-foreground italic mb-3">
                      {excerpt || "Your excerpt will appear here..."}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-mono">{generateDate()}</span>
                      {authorName && <span>by {authorName}</span>}
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {previewError ? (
                      <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-lg text-destructive">
                        <strong>Preview Error:</strong> {previewError}
                      </div>
                    ) : mdxSource ? (
                      <MDXRemote {...mdxSource} components={previewComponents} />
                    ) : (
                      <p className="text-muted-foreground italic">
                        Start writing to see your preview...
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono border-2 border-border min-h-[500px]">
                  <code>{generateMDX()}</code>
                </pre>
              )}
            </NeoCard>
          </ScrollReveal>
        </div>

        {/* Contribution Instructions */}
        <ScrollReveal delay={300}>
          <NeoCard className="p-6 border-primary">
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between text-left"
              suppressHydrationWarning
            >
              <h3 className="font-bold text-xl flex items-center gap-3">
                <GitPullRequest className="h-6 w-6 text-primary" />
                HOW_TO_CONTRIBUTE.md
              </h3>
              {showInstructions ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {showInstructions && (
              <div className="mt-6 space-y-6">
                <p className="text-muted-foreground">
                  NEO.CORTEX is open source! We welcome contributions from the community. 
                  Follow these steps to submit your article:
                </p>

                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-border shadow-neo">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <GitFork className="h-4 w-4 text-primary" />
                      Fork the Repository
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Go to our GitHub repository and click the &quot;Fork&quot; button to create your own copy.
                    </p>
                    <a 
                      href="https://github.com/iamartyaa/neo-cortex" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-mono"
                    >
                      github.com/iamartyaa/neo-cortex
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-border shadow-neo">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <GitBranch className="h-4 w-4 text-primary" />
                      Create a New Branch
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Clone your fork and create a new branch for your article:
                    </p>
                    <pre className="bg-muted p-3 rounded-lg text-sm font-mono border-2 border-border overflow-x-auto">
                      <code>{`git clone https://github.com/YOUR_USERNAME/neo-cortex.git
cd neo-cortex
git checkout -b post/your-article-title`}</code>
                    </pre>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-border shadow-neo">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Add Your MDX File
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Download or copy your MDX file from above and save it to:
                    </p>
                    <pre className="bg-muted p-3 rounded-lg text-sm font-mono border-2 border-border overflow-x-auto">
                      <code>content/posts/{generateSlug(title) || "your-post-slug"}.mdx</code>
                    </pre>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-border shadow-neo">
                    4
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <GitPullRequest className="h-4 w-4 text-primary" />
                      Submit a Pull Request
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Commit your changes and push to your fork, then open a PR:
                    </p>
                    <pre className="bg-muted p-3 rounded-lg text-sm font-mono border-2 border-border overflow-x-auto">
                      <code>{`git add content/posts/${generateSlug(title) || "your-post-slug"}.mdx
git commit -m "Add post: ${title || "Your Post Title"}"
git push origin post/your-article-title`}</code>
                    </pre>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold border-2 border-border shadow-neo">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      Get Published!
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Once your PR is reviewed and merged, your article will automatically appear on 
                      NEO.CORTEX! You&apos;ll be credited as the author with a link to your GitHub profile.
                    </p>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="mt-8 p-4 bg-warning/10 border-2 border-warning rounded-lg">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    📋 Contribution Guidelines
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Articles should be about AI, software engineering, or related tech topics</li>
                    <li>• Original content only - no plagiarism</li>
                    <li>• Minimum 500 words for quality content</li>
                    <li>• Include code examples where relevant</li>
                    <li>• Use proper grammar and formatting</li>
                    <li>• Be respectful and inclusive in your writing</li>
                  </ul>
                </div>
              </div>
            )}
          </NeoCard>
        </ScrollReveal>

        {/* MDX Formatting Guide */}
        <ScrollReveal delay={400}>
          <NeoCard className="p-6">
            <h3 className="font-bold text-xl flex items-center gap-3 mb-6">
              <Code2 className="h-6 w-6 text-primary" />
              MDX_FORMATTING_GUIDE.md
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Formatting */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Basic Formatting</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">**bold text**</code>
                    <div className="mt-1 text-muted-foreground">→ <strong>bold text</strong></div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">*italic text*</code>
                    <div className="mt-1 text-muted-foreground">→ <em>italic text</em></div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">~~strikethrough~~</code>
                    <div className="mt-1 text-muted-foreground">→ <del>strikethrough</del></div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">`inline code`</code>
                    <div className="mt-1 text-muted-foreground">→ <code className="bg-background px-1 rounded">inline code</code></div>
                  </div>
                </div>
              </div>

              {/* Headings */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Headings</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs"># Heading 1</code>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">## Heading 2</code>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">### Heading 3</code>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">#### Heading 4</code>
                  </div>
                </div>
              </div>

              {/* Lists */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Lists</h4>
                <div className="p-3 bg-muted rounded-lg border-2 border-border text-sm overflow-x-auto">
                  <pre className="font-mono text-xs whitespace-pre">{`- Unordered item 1
- Unordered item 2
  - Nested item

1. Ordered item 1
2. Ordered item 2`}</pre>
                </div>
              </div>

              {/* Links & Images */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Links & Images</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">[Link Text](https://url.com)</code>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border">
                    <code className="font-mono text-xs">![Alt Text](/path/to/image.jpg)</code>
                  </div>
                </div>
              </div>

              {/* Code Blocks */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Code Blocks</h4>
                <div className="p-3 bg-muted rounded-lg border-2 border-border text-sm overflow-x-auto">
                  <pre className="font-mono text-xs whitespace-pre">{`\`\`\`javascript
const greeting = "Hello!";
console.log(greeting);
\`\`\``}</pre>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported: javascript, typescript, python, rust, go, bash, json, css, html, and more!
                </p>
              </div>

              {/* Quotes */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Blockquotes</h4>
                <div className="p-3 bg-muted rounded-lg border-2 border-border text-sm overflow-x-auto">
                  <pre className="font-mono text-xs whitespace-pre">{`> This is a blockquote.
> It can span multiple lines.`}</pre>
                </div>
              </div>

              {/* Tables */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Tables</h4>
                <div className="p-3 bg-muted rounded-lg border-2 border-border text-sm overflow-x-auto">
                  <pre className="font-mono text-xs whitespace-pre">{`| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`}</pre>
                </div>
              </div>

              {/* Special Components */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Special Components</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg border-2 border-border overflow-x-auto">
                    <pre className="font-mono text-xs whitespace-pre">{`<Callout type="info">
  Important information here!
</Callout>`}</pre>
                    <p className="text-xs text-muted-foreground mt-2">Types: info, warning, tip, danger</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border-2 border-border overflow-x-auto">
                    <pre className="font-mono text-xs whitespace-pre">{`<Video 
  src="https://youtube.com/..." 
  caption="Video title" 
/>`}</pre>
                  </div>
                </div>
              </div>

              {/* Emojis */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Emojis & Symbols</h4>
                <div className="p-3 bg-muted rounded-lg border-2 border-border text-sm">
                  <p className="text-muted-foreground mb-2">Just type emojis directly:</p>
                  <code className="font-mono text-xs">🚀 ⚡ 🔥 💡 ✨ 🎯 📚 🛠️ 🎨</code>
                </div>
              </div>

              {/* Horizontal Rule */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Dividers</h4>
                <div className="p-3 bg-muted rounded-lg border-2 border-border text-sm">
                  <code className="font-mono text-xs">---</code>
                  <p className="text-xs text-muted-foreground mt-2">Creates a horizontal divider</p>
                </div>
              </div>
            </div>
          </NeoCard>
        </ScrollReveal>
      </div>
    </div>
  );
}

