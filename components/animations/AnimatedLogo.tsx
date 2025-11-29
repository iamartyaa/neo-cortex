"use client";

import { useRef, useCallback } from "react";
import { animate, stagger } from "animejs";
import Link from "next/link";

interface AnimatedLogoProps {
  className?: string;
}

export function AnimatedLogo({ className = "" }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (isAnimating.current || !containerRef.current) return;
    isAnimating.current = true;

    const letters = containerRef.current.querySelectorAll(".logo-letter");
    const dot = containerRef.current.querySelector(".logo-dot");

    // Animate letters with wave effect
    animate(letters, {
      translateY: [
        { to: -4, duration: 150, ease: "outQuad" },
        { to: 0, duration: 300, ease: "outElastic(1, .5)" },
      ],
      delay: stagger(30),
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Pulse the dot
    animate(dot, {
      scale: [1, 1.5, 1],
      duration: 400,
      ease: "outElastic(1, .6)",
    });
  }, []);

  return (
    <Link href="/" className={`flex items-center space-x-2 group flex-shrink-0 ${className}`}>
      <span 
        ref={containerRef}
        className="font-black text-xl sm:text-2xl tracking-tighter group-hover:text-primary transition-colors font-mono flex"
        onMouseEnter={handleMouseEnter}
      >
        {"NEO".split("").map((letter, i) => (
          <span key={`neo-${i}`} className="logo-letter inline-block">
            {letter}
          </span>
        ))}
        <span className="logo-dot text-primary inline-block">.</span>
        {"CORTEX".split("").map((letter, i) => (
          <span key={`cortex-${i}`} className="logo-letter inline-block">
            {letter}
          </span>
        ))}
      </span>
    </Link>
  );
}

