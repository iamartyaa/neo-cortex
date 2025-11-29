"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline: "bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground hover:shadow-neo hover:border-border",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "border-2 border-border shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          variants[variant],
          sizes[size],
          className
        )}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);
NeoButton.displayName = "NeoButton";

export { NeoButton };
