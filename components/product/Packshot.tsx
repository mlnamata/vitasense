import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

/*
 * Drawn packaging used until real product photos exist. Everything is sized
 * in container units (cqw), so one component scales from a 64px cart
 * thumbnail to the hero — the parent only sets the width.
 */

type Props = {
  product: Pick<Product, "name" | "unit" | "format" | "category">;
  showLabel?: boolean;
  className?: string;
};

const PAPER = "#FBFAF7";
const RUBBER = "#262939";

const shade =
  "linear-gradient(90deg, rgb(15 23 42 / 0.22), rgb(255 255 255 / 0.14) 32%, rgb(255 255 255 / 0) 58%, rgb(15 23 42 / 0.3))";

export default function Packshot({ product, showLabel = true, className }: Props) {
  return (
    <div className={cn("@container relative", className)} aria-hidden="true">
      {/* Contact shadow */}
      <div
        className="absolute -bottom-[7cqw] left-1/2 h-[16cqw] w-[130cqw] -translate-x-1/2"
        style={{
          background: "radial-gradient(closest-side, rgb(30 41 59 / 0.28), transparent)",
        }}
      />
      {product.format === "drops" ? (
        <Dropper product={product} showLabel={showLabel} />
      ) : (
        <Jar product={product} showLabel={showLabel} />
      )}
    </div>
  );
}

function Jar({ product, showLabel }: Required<Omit<Props, "className">>) {
  const { accent } = product.category;

  return (
    <div className="relative flex flex-col items-center">
      {/* Lid */}
      <div
        className="relative h-[22cqw] w-[84cqw] overflow-hidden rounded-t-[6cqw] rounded-b-[2cqw]"
        style={{ backgroundColor: accent }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.1) 0 1.2cqw, transparent 1.2cqw 3.2cqw)",
          }}
        />
        <div className="absolute inset-0" style={{ background: shade }} />
      </div>
      {/* Collar */}
      <div className="h-[3cqw] w-[78cqw] bg-[#E6E1D7]" />
      {/* Body */}
      <div
        className="relative h-[112cqw] w-full overflow-hidden rounded-[13cqw]"
        style={{ backgroundColor: PAPER }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgb(30 41 59 / 0.1), rgb(255 255 255 / 0) 22%, rgb(255 255 255 / 0.75) 44%, rgb(255 255 255 / 0) 62%, rgb(30 41 59 / 0.13))",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[30cqw]"
          style={{
            background: "linear-gradient(180deg, transparent, rgb(30 41 59 / 0.06))",
          }}
        />
        {showLabel ? (
          <Label product={product} className="absolute inset-x-[9cqw] top-[20cqw]" />
        ) : (
          <div
            className="absolute inset-x-[22cqw] top-[48cqw] h-[8cqw] rounded-full"
            style={{ backgroundColor: accent }}
          />
        )}
      </div>
    </div>
  );
}

function Dropper({ product, showLabel }: Required<Omit<Props, "className">>) {
  const { accent } = product.category;

  return (
    <div className="relative flex flex-col items-center">
      {/* Pipette bulb */}
      <div
        className="relative h-[40cqw] w-[34cqw] overflow-hidden rounded-t-full rounded-b-[5cqw]"
        style={{ backgroundColor: RUBBER }}
      >
        <div className="absolute inset-0" style={{ background: shade }} />
      </div>
      {/* Screw cap */}
      <div
        className="relative -mt-[1cqw] h-[22cqw] w-[52cqw] overflow-hidden rounded-[3cqw]"
        style={{ backgroundColor: RUBBER }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.08) 0 1.4cqw, transparent 1.4cqw 3.6cqw)",
          }}
        />
        <div className="absolute inset-0" style={{ background: shade }} />
      </div>
      {/* Amber glass bottle */}
      <div
        className="relative h-[150cqw] w-full overflow-hidden rounded-t-[30cqw] rounded-b-[12cqw]"
        style={{ backgroundColor: accent }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgb(15 23 42 / 0.3), rgb(255 255 255 / 0.28) 26%, rgb(255 255 255 / 0) 46%, rgb(15 23 42 / 0.35))",
          }}
        />
        <div
          className={cn(
            "absolute inset-x-[7cqw] top-[40cqw] bottom-[16cqw] rounded-[4cqw]",
            showLabel && "px-[4cqw] pt-[12cqw]"
          )}
          style={{ backgroundColor: PAPER }}
        >
          {showLabel && <Label product={product} large />}
        </div>
      </div>
    </div>
  );
}

function Label({
  product,
  large = false,
  className,
}: {
  product: Props["product"];
  large?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.22em] text-slate-500",
          large ? "text-[7cqw]" : "text-[5cqw]"
        )}
      >
        VitaSense
      </span>
      <span
        className="mt-[4cqw] h-[1cqw] w-[16cqw] rounded-full"
        style={{ backgroundColor: product.category.accent }}
      />
      <span
        className={cn(
          "mt-[5cqw] text-balance font-bold leading-[1.05] tracking-[-0.02em] text-slate-800",
          large ? "text-[13cqw]" : "text-[10cqw]"
        )}
      >
        {product.name}
      </span>
      <span
        className={cn("mt-[5cqw] text-slate-500", large ? "text-[7cqw]" : "text-[5.5cqw]")}
      >
        {product.unit}
      </span>
    </div>
  );
}
