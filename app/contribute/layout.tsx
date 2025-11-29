import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neocortex.dev";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Learn how to contribute to NEO.CORTEX. Submit your articles on AI, machine learning, and software engineering. Join our community of tech writers.",
  openGraph: {
    title: "Contribute to NEO.CORTEX",
    description: "Learn how to contribute articles on AI, machine learning, and software engineering to NEO.CORTEX.",
    url: `${siteUrl}/contribute`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contribute to NEO.CORTEX",
    description: "Learn how to contribute articles on AI, machine learning, and software engineering to NEO.CORTEX.",
  },
  alternates: {
    canonical: `${siteUrl}/contribute`,
  },
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

