import { Truck } from "lucide-react";
import { ANNOUNCEMENT } from "@/lib/content";

export default function AnnouncementBar() {
  return (
    <div className="bg-sage-700 text-sage-50">
      <p className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-5 text-center text-[13px] font-medium">
        <Truck className="size-4 shrink-0" aria-hidden="true" />
        {ANNOUNCEMENT}
      </p>
    </div>
  );
}
