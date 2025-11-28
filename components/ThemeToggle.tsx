"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { NeoButton } from "./ui/NeoButton";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NeoButton variant="ghost" size="icon" className="w-10 h-10 px-0 relative">
        <span className="sr-only">Toggle theme</span>
      </NeoButton>
    );
  }

  return (
    <NeoButton
      variant="ghost"
      size="icon"
      className="w-10 h-10 px-0 relative overflow-hidden"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${resolvedTheme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </NeoButton>
  );
}
