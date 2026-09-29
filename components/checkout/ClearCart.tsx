"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";

/** Empties the cart once an order has gone through. */
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => clear(), [clear]);
  return null;
}
