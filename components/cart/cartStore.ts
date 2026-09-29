import type { CartLine } from "@/lib/types";

/*
 * Guest cart kept in localStorage, exposed as an external store for
 * useSyncExternalStore. Once users can sign in, `write` is where the
 * Supabase `cart_items` upsert goes; readers stay the same.
 */

const STORAGE_KEY = "vitasense.cart.v1";
const EMPTY: CartLine[] = [];

let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as CartLine[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keep several open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    lines = read();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot() {
  if (lines === null) lines = read();
  return lines;
}

export function getServerSnapshot() {
  return EMPTY;
}

export function write(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or full storage — the cart still works for this visit.
  }
  emit();
}
