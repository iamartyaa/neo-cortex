"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

interface HeroTitleProps {
  className?: string;
}

export function HeroTitle({ className = "" }: HeroTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    // Animate NEO letters
    animate(".neo-letter", {
      opacity: [0, 1],
      translateY: [50, 0],
      rotateX: [90, 0],
      duration: 800,
      delay: stagger(80, { start: 200 }),
      ease: "outExpo",
    });

    // Animate the dot
    animate(".hero-dot", {
      opacity: [0, 1],
      scale: [0, 1.2, 1],
      duration: 600,
      delay: 500,
      ease: "outElastic(1, .6)",
    });

    // Animate CORTEX letters
    animate(".cortex-letter", {
      opacity: [0, 1],
      translateY: [50, 0],
      rotateX: [90, 0],
      duration: 800,
      delay: stagger(80, { start: 600 }),
      ease: "outExpo",
    });

    // Animate the underline
    animate(".hero-underline", {
      scaleX: [0, 1],
      duration: 800,
      delay: 1200,
      ease: "outExpo",
    });
  }, [isVisible]);

  return (
    <div ref={containerRef} className={className}>
      <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-foreground leading-[0.9] perspective-1000">
        <span className="inline-block">
          {"NEO".split("").map((letter, i) => (
            <span
              key={`neo-${i}`}
              className="neo-letter inline-block"
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          className="hero-dot text-primary inline-block"
          style={{ opacity: 0 }}
        >
          .
        </span>
        <br className="md:hidden" />
        <span className="inline-block">
          {"CORTEX".split("").map((letter, i) => (
            <span
              key={`cortex-${i}`}
              className="cortex-letter inline-block"
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
            >
              {letter}
            </span>
          ))}
        </span>
      </h1>
      <div
        className="hero-underline h-2 w-32 bg-foreground mx-auto my-6 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

