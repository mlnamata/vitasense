import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BESTSELLERS, SECTIONS, SHOP_PATH } from "@/lib/content";
import { getBestsellers } from "@/lib/data/products";

export default async function Bestsellers() {
  const products = await getBestsellers();

  return (
    <section id={SECTIONS.bestsellers} aria-labelledby="bestsellers-title" className="py-12 md:py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            id="bestsellers-title"
            eyebrow={BESTSELLERS.eyebrow}
            title={BESTSELLERS.title}
            subtitle={BESTSELLERS.subtitle}
          />
          <Link
            href={SHOP_PATH}
            className={buttonClass({
              variant: "secondary",
              size: "md",
              className: "group hidden shrink-0 md:inline-flex",
            })}
          >
            {BESTSELLERS.link}
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Swipeable row on phones, grid from sm up. */}
        <ul className="no-scrollbar relative -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-6 pt-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-12 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="w-[78%] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>

        <Link
          href={SHOP_PATH}
          className={buttonClass({ variant: "secondary", className: "mt-4 w-full md:hidden" })}
        >
          {BESTSELLERS.link}
        </Link>
      </Container>
    </section>
  );
}
