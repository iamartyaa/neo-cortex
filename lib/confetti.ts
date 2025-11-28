"use client";

import confetti from "canvas-confetti";

export function fireConfetti() {
  // Fire from the left edge
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0, y: 0.6 },
    colors: ["#FF6B9D", "#00D4AA", "#A855F7", "#FBBF24"],
  });

  // Fire from the right edge
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 1, y: 0.6 },
    colors: ["#FF6B9D", "#00D4AA", "#A855F7", "#FBBF24"],
  });
}

export function fireStars() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["#FF6B9D", "#00D4AA", "#A855F7"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

export function fireEmoji() {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { y: 0.7 },
    shapes: ["circle"],
    colors: ["#FF6B9D", "#00D4AA", "#A855F7", "#FBBF24"],
  });
}

