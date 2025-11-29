"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  splitBy?: "letter" | "word";
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "scaleUp" | "glitch";
  onComplete?: () => void;
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 30,
  as: Component = "span",
  splitBy = "letter",
  animation = "fadeUp",
  onComplete,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
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

    const chars = containerRef.current.querySelectorAll(".char");
    
    const animations: Record<string, object> = {
      fadeUp: {
        opacity: [0, 1],
        translateY: [20, 0],
        ease: "outExpo",
      },
      fadeIn: {
        opacity: [0, 1],
        ease: "outQuad",
      },
      slideUp: {
        opacity: [0, 1],
        translateY: ["100%", "0%"],
        ease: "outExpo",
      },
      scaleUp: {
        opacity: [0, 1],
        scale: [0.5, 1],
        ease: "outElastic(1, .6)",
      },
      glitch: {
        opacity: [0, 1],
        translateX: [() => Math.random() * 20 - 10, 0],
        translateY: [() => Math.random() * 10 - 5, 0],
        ease: "outExpo",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animationParams: any = {
      ...animations[animation],
      duration: 600,
      delay: stagger(staggerDelay, { start: delay }),
    };
    
    if (onComplete) {
      animationParams.onComplete = onComplete;
    }
    
    animate(chars, animationParams);
  }, [isVisible, delay, staggerDelay, animation, onComplete]);

  const splitText = () => {
    if (splitBy === "word") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="char inline-block"
            style={{ opacity: 0 }}
          >
            {word}
          </span>
          {i < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ));
    }

    return text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span
          className="char inline-block"
          style={{ opacity: 0, whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <Component ref={containerRef as any} className={className}>
      {splitText()}
    </Component>
  );
}

