// Anime.js animation utilities for NEO.CORTEX
// Modular animation presets for reuse across the site

export const easings = {
  // Smooth and snappy
  smooth: 'easeOutExpo',
  // Bouncy spring-like
  spring: 'spring(1, 80, 10, 0)',
  // Quick snap
  snap: 'easeOutQuart',
  // Dramatic entrance
  dramatic: 'easeOutQuint',
  // Elastic bounce
  elastic: 'easeOutElastic(1, .6)',
  // Linear for scroll sync
  linear: 'linear',
} as const;

export const durations = {
  fast: 400,
  normal: 600,
  slow: 800,
  dramatic: 1200,
} as const;

export const staggerPresets = {
  // From first to last
  cascade: { start: 0, from: 'first' as const },
  // From center outward
  explode: { start: 0, from: 'center' as const },
  // From last to first
  reverse: { start: 0, from: 'last' as const },
  // Random order
  random: { start: 0, from: 'random' as const },
} as const;

// Grid stagger for card layouts
export function createGridStagger(cols: number, rows: number) {
  return {
    grid: [cols, rows] as [number, number],
    from: 'center' as const,
    axis: undefined,
    start: 0,
    direction: 'normal' as const,
  };
}

