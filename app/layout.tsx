import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEO.CORTEX | AI & Software Engineering",
  description: "Decoding the singularity with bold design and raw code.",
  keywords: ["tech", "AI", "software engineering", "neo-brutalism", "coding"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased flex flex-col min-h-screen noise-bg`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
