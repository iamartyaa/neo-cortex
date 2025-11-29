"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: "outExpo",
    });
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

