"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartLine, Product } from "@/lib/types";
import * as cartStore from "./cartStore";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const MAX_QUANTITY = 20;

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback((product: Product, quantity = 1) => {
    const current = cartStore.getSnapshot();
    const existing = current.find((line) => line.product.id === product.id);

    cartStore.write(
      existing
        ? current.map((line) =>
            line === existing
              ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QUANTITY) }
              : line
          )
        : [...current, { product, quantity: Math.min(quantity, MAX_QUANTITY) }]
    );
  }, []);

  const remove = useCallback((productId: string) => {
    cartStore.write(
      cartStore.getSnapshot().filter((line) => line.product.id !== productId)
    );
  }, []);

  const clear = useCallback(() => cartStore.write([]), []);

  const setQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) return remove(productId);

      cartStore.write(
        cartStore
          .getSnapshot()
          .map((line) =>
            line.product.id === productId
              ? { ...line, quantity: Math.min(quantity, MAX_QUANTITY) }
              : line
          )
      );
    },
    [remove]
  );

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      count += line.quantity;
      subtotal += line.quantity * line.product.priceCzk;
    }
    return { lines, count, subtotal, isOpen, open, close, add, setQuantity, remove, clear };
  }, [lines, isOpen, open, close, add, setQuantity, remove, clear]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = use(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>.");
  return context;
}
