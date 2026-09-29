import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

/** Two columns on phones like a shop app, four on desktop. */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} className="w-full" />
        </li>
      ))}
    </ul>
  );
}
