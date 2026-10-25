import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { CompareBar } from "@/components/vehicles/compare-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { dealerJsonLd } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Viaturas seminovas e oficina em Castelo Branco`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: site.name,
    title: `${site.name} — Viaturas seminovas e oficina em Castelo Branco`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        <JsonLd data={dealerJsonLd} />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <CompareBar />
        <WhatsAppFloat />
        <MobileActionBar />
        <CookieBanner />
      </body>
    </html>
  );
}
