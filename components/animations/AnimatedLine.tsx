"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface AnimatedLineProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
  delay?: number;
  path?: string;
  variant?: "zigzag" | "wave" | "underline" | "circle" | "arrow" | "custom";
}

export function AnimatedLine({
  className = "",
  width = 200,
  height = 50,
  strokeWidth = 3,
  strokeColor = "currentColor",
  duration = 1500,
  delay = 0,
  path,
  variant = "underline",
}: AnimatedLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getPath = () => {
    if (path) return path;

    const w = typeof width === "number" ? width : 200;
    const h = typeof height === "number" ? height : 50;

    const paths: Record<string, string> = {
      underline: `M0,${h / 2} L${w},${h / 2}`,
      zigzag: `M0,${h} L${w * 0.25},0 L${w * 0.5},${h} L${w * 0.75},0 L${w},${h}`,
      wave: `M0,${h / 2} Q${w * 0.25},0 ${w * 0.5},${h / 2} Q${w * 0.75},${h} ${w},${h / 2}`,
      circle: `M${w / 2},${strokeWidth} A${w / 2 - strokeWidth},${h / 2 - strokeWidth} 0 1,1 ${w / 2 - 0.01},${strokeWidth}`,
      arrow: `M0,${h / 2} L${w - h / 2},${h / 2} M${w - h},0 L${w},${h / 2} L${w - h},${h}`,
    };

    return paths[variant] || paths.underline;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !pathRef.current) return;

    const pathElement = pathRef.current;
    const length = pathElement.getTotalLength();

    // Set initial state
    pathElement.style.strokeDasharray = `${length}`;
    pathElement.style.strokeDashoffset = `${length}`;

    animate(pathElement, {
      strokeDashoffset: [length, 0],
      ease: "outExpo",
      duration,
      delay,
    });
  }, [isVisible, duration, delay]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${typeof width === "number" ? width : 200} ${typeof height === "number" ? height : 50}`}
      fill="none"
      className={className}
    >
      <path
        ref={pathRef}
        d={getPath()}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

