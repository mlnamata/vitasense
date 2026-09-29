import { FlaskConical, Gift, Leaf, PackageCheck, RotateCcw, Truck } from "lucide-react";
import { USPS } from "@/lib/content";

const ICONS = {
  truck: Truck,
  package: PackageCheck,
  flask: FlaskConical,
  leaf: Leaf,
  return: RotateCcw,
  gift: Gift,
} as const;

/** Endless benefit ticker. The list renders twice so the loop is seamless. */
export default function UspStrip() {
  const items = USPS.map(({ icon, text }) => {
    const Icon = ICONS[icon];
    return { Icon, text };
  });

  return (
    <div className="group overflow-hidden border-b border-slate-900/[0.06] bg-white/50">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {items.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex h-11 items-center gap-2 px-6 text-[13px] font-medium text-slate-600"
              >
                <Icon className="size-4 text-sage-600" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
