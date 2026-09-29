"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False during SSR and hydration, true once the client has taken over. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
