import Link from "next/link";
import { cn } from "@/lib/cn";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="VitaSense — úvodní stránka"
      className={cn(
        "inline-flex items-center rounded-lg text-[22px] font-extrabold tracking-[-0.03em] text-slate-900",
        className
      )}
    >
      Vita<span className="text-sage-600">Sense</span>
    </Link>
  );
}
