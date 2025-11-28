"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const getLanguage = () => {
    if (!className) return "code";
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : "code";
  };

  const handleCopy = async () => {
    const code = extractTextFromChildren(children);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border-2 border-border bg-[#1a1a2e] shadow-neo">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-border bg-[#16162a] px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27ca40]" />
          </div>
          <span className="text-xs font-mono font-bold uppercase text-gray-400">
            {title || getLanguage()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code className={className}>{children}</code>
        </pre>
      </div>
    </div>
  );
}

// Helper to extract text from React children
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return extractTextFromChildren((children as any).props.children);
  }
  return "";
}

