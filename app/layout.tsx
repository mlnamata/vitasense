import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND, HERO } from "@/lib/content";

/* latin-ext carries the Czech diacritics (ě, š, č, ř, ž, ů). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = `${BRAND.name} — Zdraví, které dává smysl`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  /* Absolute URLs for the social preview; on Vercel Next falls back to the deployment URL. */
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: title, template: `%s | ${BRAND.name}` },
  description: HERO.subtitle,
  applicationName: BRAND.name,
  openGraph: {
    title,
    description: HERO.subtitle,
    type: "website",
    locale: "cs_CZ",
    siteName: BRAND.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F8F6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={jakarta.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
