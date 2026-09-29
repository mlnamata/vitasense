import Image from "next/image";
import Packshot from "@/components/product/Packshot";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

type Props = {
  product: Pick<Product, "name" | "unit" | "format" | "category" | "imageUrl">;
  /** Rendered width in px, for the image `sizes` hint. */
  size?: number;
  className?: string;
};

/** Small square product image for carts, order summaries and tables. */
export default function ProductThumb({ product, size = 80, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl",
        className
      )}
      style={{ backgroundColor: product.category.tint }}
    >
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-cover object-[50%_45%] scale-[1.35]"
        />
      ) : (
        <Packshot
          product={product}
          showLabel={false}
          className={cn("mt-[12%]", product.format === "drops" ? "w-[26%]" : "w-[40%]")}
        />
      )}
    </div>
  );
}
