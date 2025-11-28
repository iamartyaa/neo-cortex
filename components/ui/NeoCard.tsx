import * as React from "react";
import { cn } from "@/lib/utils";

const NeoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border-2 border-border bg-card text-card-foreground shadow-neo",
      className
    )}
    {...props}
  />
));
NeoCard.displayName = "NeoCard";

export { NeoCard };

