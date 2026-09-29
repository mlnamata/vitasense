import Link from "next/link";
import { cn } from "@/lib/cn";

export default function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <Link
      href="/"
      aria-label="VitaSense — úvodní stránka"
      className={cn(
        "inline-flex items-center rounded-lg text-[22px] font-extrabold tracking-[-0.03em]",
        dark ? "text-white" : "text-slate-900",
        className
      )}
    >
      Vita<span className={dark ? "text-sage-300" : "text-sage-600"}>Sense</span>
    </Link>
  );
}
