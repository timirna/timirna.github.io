import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.wordmark} — ${site.role}`, template: `%s — ${site.wordmark}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.wordmark,
    title: `${site.wordmark} — ${site.role}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og/og.png", width: 1200, height: 630, alt: "TIMIR — Motion makes it matter." }],
  },
  twitter: { card: "summary_large_image", title: `${site.wordmark} — ${site.role}`, description: site.description, images: ["/og/og.png"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#F7F6F2" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Motion Designer",
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </body>
    </html>
  );
}
