import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";

const bebas = localFont({
  src: "../../node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2",
  variable: "--font-bebas",
  display: "swap",
});

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

export const viewport: Viewport = { themeColor: "#141414", colorScheme: "dark" };

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${bebas.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
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
