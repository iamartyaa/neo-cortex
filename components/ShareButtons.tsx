"use client";

import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import { NeoButton } from "./ui/NeoButton";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = typeof window !== "undefined" 
    ? url || window.location.href 
    : url || "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      <NeoButton
        variant="outline"
        size="icon"
        onClick={shareOnTwitter}
        className="w-9 h-9 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </NeoButton>
      <NeoButton
        variant="outline"
        size="icon"
        onClick={shareOnLinkedIn}
        className="w-9 h-9 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </NeoButton>
      <NeoButton
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        className={`w-9 h-9 transition-all ${copied ? "bg-secondary text-secondary-foreground border-secondary" : ""}`}
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </NeoButton>
    </div>
  );
}

