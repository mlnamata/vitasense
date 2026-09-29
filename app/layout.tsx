import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import CartProvider from "@/components/cart/CartProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Navbar from "@/components/layout/Navbar";
import { BRAND, HERO } from "@/lib/content";

/* latin-ext carries the Czech diacritics (ě, š, č, ř, ž, ů). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = `${BRAND.name} — Zdraví, které dává smysl`;

export const metadata: Metadata = {
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
      <body>
        <CartProvider>
          <a
            href="#obsah"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-sage-600 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          >
            Přeskočit na obsah
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="obsah">{children}</main>
          <Footer />
          <MobileTabBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
