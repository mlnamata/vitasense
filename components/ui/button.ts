import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost-dark";
type Size = "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-2xl font-semibold transition duration-300 ease-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-sage-600 text-white shadow-cta hover:bg-sage-700",
  secondary:
    "bg-white/60 text-slate-800 ring-1 ring-inset ring-slate-900/10 hover:bg-white hover:ring-slate-900/20",
  light: "bg-white text-ink-900 hover:bg-sage-50",
  "ghost-dark": "text-white ring-1 ring-inset ring-white/20 hover:bg-white/10",
};

/* Heights are touch-first: 48px minimum, 56px for primary actions. */
const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

/** Button styling shared by <button> and <Link> so both look identical. */
export function buttonClass({
  variant = "primary",
  size = "lg",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
