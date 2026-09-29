import ProductCard from "@/components/product/ProductCard";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BESTSELLERS, SECTIONS } from "@/lib/content";
import { getBestsellers } from "@/lib/data/products";

export default async function Bestsellers() {
  const products = await getBestsellers();

  return (
    <section id={SECTIONS.shop} aria-labelledby="bestsellers-title" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          id="bestsellers-title"
          eyebrow={BESTSELLERS.eyebrow}
          title={BESTSELLERS.title}
          subtitle={BESTSELLERS.subtitle}
        />

        {/* Swipeable row on phones, grid from sm up. */}
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-6 pt-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-12 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="w-[78%] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
