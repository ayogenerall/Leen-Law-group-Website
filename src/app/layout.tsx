import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { DisclosureBar } from "@/components/layout/Disclosures";
import { getServiceLinks } from "@/lib/nav";
import { isPreview } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Leen Law Group | Consumer Support & Business Administration",
    template: "%s | Leen Law Group",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Leen Law Group | Consumer Support & Business Administration",
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Leen Law Group logo" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-512.png", type: "image/png", sizes: "512x512" }],
    apple: "/apple-touch-icon.png",
  },
  // Preview builds must never be indexed.
  robots: isPreview ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#101114",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const serviceLinks = getServiceLinks();
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-turquoise px-4 py-2.5 font-semibold text-obsidian transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        {isPreview && (
          <div role="status" className="fixed bottom-4 right-4 z-[90] max-w-[16rem] border border-amber-400/60 bg-obsidian/95 px-4 py-3 text-xs leading-relaxed text-amber-200 shadow-xl">
            <strong className="block uppercase tracking-[0.14em]">Content preview mode</strong>
            Draft and pending-verification content is visible. Never deploy with CONTENT_PREVIEW=true.
          </div>
        )}
        <Nav serviceLinks={serviceLinks} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <DisclosureBar />
        <Footer serviceLinks={serviceLinks} />
      </body>
    </html>
  );
}
