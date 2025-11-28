"use client";

export function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
  );
}

export function BrutalistShape1({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="currentColor"
        d="M45.7,-76.3C58.9,-69.3,69.1,-58.6,76.3,-46.5C83.5,-34.4,87.7,-20.9,85.6,-8.2C83.5,4.5,75.1,16.4,66.7,27.2C58.3,38,49.9,47.7,40.3,56.1C30.7,64.5,19.9,71.6,8.3,73.2C-3.3,74.8,-15.7,70.9,-27.3,65.1C-38.9,59.3,-49.7,51.6,-58.9,42.1C-68.1,32.6,-75.7,21.3,-78.6,8.9C-81.5,-3.5,-79.7,-17,-73.4,-28.6C-67.1,-40.2,-56.3,-49.9,-44.7,-57.5C-33.1,-65.1,-20.7,-70.6,-7.7,-72.3C5.3,-74,10.6,-71.9,32.5,-83.3"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function BrutalistStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BrutalistArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 50H90M90 50L60 20M90 50L60 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function BrutalistGridDots({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 opacity-20 ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" className="text-foreground" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}

