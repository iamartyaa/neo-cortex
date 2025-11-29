"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Maximum time to wait before forcing content to be visible (prevents blank pages)
const FALLBACK_TIMEOUT = 2000;

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already visible (prevents re-animation)
    if (element.classList.contains("visible")) return;

    let animationTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let fallbackTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    const makeVisible = () => {
      if (!element.classList.contains("visible")) {
        element.classList.add("visible");
      }
      // Clear fallback if animation triggered normally
      if (fallbackTimeoutId) {
        clearTimeout(fallbackTimeoutId);
        fallbackTimeoutId = null;
      }
    };

    // Fallback: ensure content is visible within a reasonable time
    // This prevents blank pages if IntersectionObserver fails on mobile
    fallbackTimeoutId = setTimeout(() => {
      makeVisible();
    }, FALLBACK_TIMEOUT + delay);

    // Check if already in viewport on mount
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      animationTimeoutId = setTimeout(makeVisible, delay);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animationTimeoutId = setTimeout(makeVisible, delay);
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01, // Lower threshold for better mobile detection
          rootMargin: "100px 0px 100px 0px", // Larger margin for earlier trigger
        }
      );

      observer.observe(element);
    }

    return () => {
      if (animationTimeoutId) clearTimeout(animationTimeoutId);
      if (fallbackTimeoutId) clearTimeout(fallbackTimeoutId);
      observer?.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

