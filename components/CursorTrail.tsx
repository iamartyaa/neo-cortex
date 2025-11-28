"use client";

import * as React from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pointsRef = React.useRef<Point[]>([]);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const animationRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      pointsRef.current = pointsRef.current.filter((point) => {
        point.age += 1;
        return point.age < 30; // Remove old points
      });

      if (pointsRef.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

        for (let i = 1; i < pointsRef.current.length - 1; i++) {
          const point = pointsRef.current[i];
          const nextPoint = pointsRef.current[i + 1];
          const midX = (point.x + nextPoint.x) / 2;
          const midY = (point.y + nextPoint.y) / 2;
          ctx.quadraticCurveTo(point.x, point.y, midX, midY);
        }

        // Create gradient
        const gradient = ctx.createLinearGradient(
          pointsRef.current[0].x,
          pointsRef.current[0].y,
          pointsRef.current[pointsRef.current.length - 1].x,
          pointsRef.current[pointsRef.current.length - 1].y
        );
        gradient.addColorStop(0, "rgba(255, 107, 157, 0)");
        gradient.addColorStop(0.5, "rgba(255, 107, 157, 0.5)");
        gradient.addColorStop(1, "rgba(0, 212, 170, 0.8)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Draw cursor dot
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6B9D";
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

