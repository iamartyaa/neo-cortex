"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CounterAnimationProps {
  value: string | number;
  className?: string;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export function CounterAnimation({
  value,
  className = "",
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
}: CounterAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  // Parse the value to extract numeric part and suffix
  const parseValue = useCallback((val: string | number): { num: number; originalSuffix: string } => {
    const strVal = String(val);
    
    // Handle special cases like "∞"
    if (strVal === "∞" || strVal.includes("∞")) {
      return { num: -1, originalSuffix: "∞" };
    }
    
    // Extract number and suffix (K+, %, etc.)
    const match = strVal.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (match) {
      return { num: parseFloat(match[1]), originalSuffix: match[2] || suffix };
    }
    
    return { num: 0, originalSuffix: suffix };
  }, [suffix]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const { num, originalSuffix } = parseValue(value);
    
    // Handle special infinity case
    if (num === -1) {
      const timeoutId = setTimeout(() => {
        setDisplayValue("∞");
      }, delay);
      return () => clearTimeout(timeoutId);
    }

    // Simple easing function for smooth animation
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    let startTime: number | null = null;
    let animationId: number;

    const animateCount = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp + delay;
      }
      
      const elapsed = timestamp - startTime;
      
      if (elapsed < 0) {
        animationId = requestAnimationFrame(animateCount);
        return;
      }
      
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = num * easedProgress;
      
      const formatted = num >= 1000 
        ? Math.round(currentValue).toLocaleString()
        : num % 1 === 0 
          ? Math.round(currentValue)
          : currentValue.toFixed(1);
      
      setDisplayValue(`${prefix}${formatted}${originalSuffix}`);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animateCount);
      }
    };

    animationId = requestAnimationFrame(animateCount);
    
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, value, duration, delay, prefix, parseValue]);

  return (
    <span ref={containerRef} className={className}>
      {displayValue}
    </span>
  );
}
