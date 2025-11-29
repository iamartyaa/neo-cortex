"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Github, Heart, Sparkles, Zap, Brain } from "lucide-react";

export function Footer() {
  const brainRef = useRef<HTMLSpanElement>(null);
  const sparkleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Continuous brain pulse animation
    if (brainRef.current) {
      animate(brainRef.current, {
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        ease: "inOutQuad",
        duration: 2000,
        loop: true,
      });
    }

    // Sparkle animations with stagger
    const sparkles = sparkleRefs.current.filter(Boolean);
    if (sparkles.length > 0) {
      animate(sparkles, {
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
        translateY: [0, -3, 0],
        ease: "inOutSine",
        duration: 1500,
        delay: stagger(200),
        loop: true,
      });
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t-4 border-border bg-card overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-pulse" />
      
      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-black uppercase tracking-tighter">
                NEO<span className="text-primary group-hover:text-secondary transition-colors">.</span>CORTEX
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              Decoding the singularity with bold design and raw code. Where AI meets aesthetics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              QUICK_LINKS
            </h3>
            <nav className="flex flex-wrap justify-center gap-4 font-mono text-sm font-bold">
              <Link 
                href="/blog" 
                className="hover:text-primary hover:underline decoration-4 underline-offset-4 transition-all"
              >
                /blog
              </Link>
              <Link 
                href="/contribute" 
                className="hover:text-primary hover:underline decoration-4 underline-offset-4 transition-all"
              >
                /contribute
              </Link>
              <a 
                href="https://github.com/iamartyaa/neo-cortex" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline decoration-4 underline-offset-4 transition-all inline-flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                /github
              </a>
            </nav>
          </div>

          {/* Status Section */}
          <div className="text-center md:text-right space-y-4">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-mono font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              SYSTEM_ONLINE
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              © {currentYear} NEO.CORTEX
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Made With Section - Animated */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <span
              ref={(el) => { sparkleRefs.current[0] = el; }}
              className="text-warning"
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Crafted with</span>
            <span
              ref={brainRef}
              className="inline-flex items-center justify-center text-primary"
            >
              <Brain className="h-5 w-5" />
            </span>
            <span>&</span>
            <span className="text-danger">
              <Heart className="h-4 w-4 fill-current animate-pulse" />
            </span>
            <span>by</span>
            <a 
              href="https://github.com/iamartyaa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-foreground hover:text-primary transition-colors underline decoration-2 underline-offset-2 decoration-primary/50 hover:decoration-primary"
            >
              @iamartyaa
            </a>
            <span
              ref={(el) => { sparkleRefs.current[1] = el; }}
              className="text-warning"
            >
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs font-mono text-muted-foreground/60 tracking-wider uppercase">
            <span
              ref={(el) => { sparkleRefs.current[2] = el; }}
              className="inline-block"
            >
              <Zap className="h-3 w-3 inline text-warning" />
            </span>
            {" "}Powered by curiosity, caffeine & late night commits{" "}
            <span
              ref={(el) => { sparkleRefs.current[3] = el; }}
              className="inline-block"
            >
              <Zap className="h-3 w-3 inline text-warning" />
            </span>
          </p>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
    </footer>
  );
}

