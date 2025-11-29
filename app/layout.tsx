import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neocortex.dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEO.CORTEX | AI & Software Engineering Blog",
    template: "%s | NEO.CORTEX",
  },
  description: "Decoding the singularity with bold design and raw code. A neo-brutalist blog exploring AI, machine learning, software engineering, and the future of technology.",
  keywords: [
    "AI",
    "artificial intelligence",
    "machine learning",
    "software engineering",
    "tech blog",
    "neo-brutalism",
    "coding",
    "programming",
    "deep learning",
    "neural networks",
    "GPT",
    "LLM",
    "computer vision",
    "web development",
  ],
  authors: [{ name: "NEO.CORTEX", url: siteUrl }],
  creator: "iamartyaa",
  publisher: "NEO.CORTEX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NEO.CORTEX",
    title: "NEO.CORTEX | AI & Software Engineering Blog",
    description: "Decoding the singularity with bold design and raw code. Exploring AI, machine learning, and the future of technology.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEO.CORTEX - AI & Software Engineering Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEO.CORTEX | AI & Software Engineering Blog",
    description: "Decoding the singularity with bold design and raw code.",
    creator: "@evilseyee",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NEO.CORTEX",
              description: "Decoding the singularity with bold design and raw code",
              url: siteUrl,
              author: {
                "@type": "Person",
                name: "iamartyaa",
                url: "https://github.com/iamartyaa",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/blog?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased flex flex-col min-h-screen noise-bg`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
