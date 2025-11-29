"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";
import { animate, stagger } from "animejs";

interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  from?: "first" | "last" | "center" | "random";
  animation?: "fadeUp" | "scaleUp" | "slideIn" | "flipIn";
  columns?: number;
  useGrid?: boolean;
}

export function StaggerGrid({
  children,
  className = "",
  staggerDelay = 100,
  duration = 600,
  from = "first",
  animation = "fadeUp",
  columns = 3,
  useGrid = true,
}: StaggerGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
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

    const items = containerRef.current.querySelectorAll(".stagger-item");
    const childCount = Children.count(children);
    const rows = Math.ceil(childCount / columns);

    const animations: Record<string, object> = {
      fadeUp: {
        opacity: [0, 1],
        translateY: [40, 0],
        ease: "outExpo",
      },
      scaleUp: {
        opacity: [0, 1],
        scale: [0.8, 1],
        ease: "outExpo",
      },
      slideIn: {
        opacity: [0, 1],
        translateX: [-30, 0],
        ease: "outExpo",
      },
      flipIn: {
        opacity: [0, 1],
        rotateY: [90, 0],
        ease: "outExpo",
      },
    };

    const staggerConfig = useGrid
      ? stagger(staggerDelay, {
          grid: [columns, rows],
          from: from === "random" ? "random" : from,
        })
      : stagger(staggerDelay, { from });

    animate(items, {
      ...animations[animation],
      duration,
      delay: staggerConfig,
    });
  }, [isVisible, children, staggerDelay, duration, from, animation, columns, useGrid]);

  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        return (
          <div
            key={index}
            className="stagger-item"
            style={{ opacity: 0 }}
          >
            {child}
          </div>
        );
      }
      return child;
    });
  };

  return (
    <div ref={containerRef} className={className}>
      {renderChildren()}
    </div>
  );
}

