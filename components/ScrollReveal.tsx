"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    // Check if already visible on mount
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      timeoutId = setTimeout(() => {
        element.classList.add("visible");
      }, delay);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timeoutId = setTimeout(() => {
                entry.target.classList.add("visible");
              }, delay);
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "50px 0px 50px 0px",
        }
      );

      observer.observe(element);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

