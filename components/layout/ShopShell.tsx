import CartDrawer from "@/components/cart/CartDrawer";
import CartProvider from "@/components/cart/CartProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Navbar from "@/components/layout/Navbar";

/** Storefront chrome: header, footer, tab bar and the cart. */
export default function ShopShell({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
