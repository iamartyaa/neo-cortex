"use client";

import { useState } from "react";
import { NeoInput } from "./ui/NeoInput";
import { MagneticButton } from "./ui/MagneticButton";
import { fireConfetti } from "@/lib/confetti";
import { Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus("success");
    fireConfetti();
    
    // Reset after 3 seconds
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 3000);
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <NeoInput
        placeholder="your@email.com"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status !== "idle"}
        className="flex-1"
      />
      <MagneticButton 
        type="submit" 
        strength={0.25}
        disabled={status !== "idle"}
        className={`min-w-[140px] font-mono uppercase tracking-wider px-6 py-2 border-2 border-border shadow-neo font-bold ${
          status === "success" 
            ? "bg-secondary text-secondary-foreground" 
            : "bg-primary text-primary-foreground"
        } ${status !== "idle" ? "opacity-80" : ""}`}
      >
        {status === "idle" && "SUBSCRIBE"}
        {status === "loading" && (
          <span className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            LOADING
          </span>
        )}
        {status === "success" && (
          <span className="flex items-center justify-center">
            <Check className="h-4 w-4 mr-2" />
            SUCCESS!
          </span>
        )}
      </MagneticButton>
    </form>
  );
}
