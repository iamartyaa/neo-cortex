"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { NeoButton } from "./ui/NeoButton";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`back-to-top ${visible ? "visible" : ""}`}>
      <NeoButton
        onClick={scrollToTop}
        size="icon"
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </NeoButton>
    </div>
  );
}

