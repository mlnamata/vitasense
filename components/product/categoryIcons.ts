import { Flower2, HeartPulse, Moon, ShieldPlus, Sprout, Zap, type LucideIcon } from "lucide-react";
import type { CategoryId } from "@/lib/types";

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  spanek: Moon,
  energie: Zap,
  imunita: ShieldPlus,
  rovnovaha: Flower2,
  srdce: HeartPulse,
  traveni: Sprout,
};
