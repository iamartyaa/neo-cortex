"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "ianand/neo-brutalist-blog"); // Placeholder - user will need to update
    script.setAttribute("data-repo-id", "R_kgDOL..."); // Placeholder
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOL..."); // Placeholder
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");

    ref.current.appendChild(script);
  }, [theme]);

  // Update theme when it changes
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: theme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }, [theme]);

  return <div ref={ref} className="w-full mt-10" />;
}

