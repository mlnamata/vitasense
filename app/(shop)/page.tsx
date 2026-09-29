import Bestsellers from "@/components/sections/Bestsellers";
import Ecosystem from "@/components/sections/Ecosystem";
import Goals from "@/components/sections/Goals";
import Hero from "@/components/sections/Hero";
import Magazine from "@/components/sections/Magazine";
import Promos from "@/components/sections/Promos";
import Reviews from "@/components/sections/Reviews";
import UspStrip from "@/components/sections/UspStrip";
import Vision from "@/components/sections/Vision";

export default function HomePage() {
  return (
    <>
      <UspStrip />
      <Hero />
      <Goals />
      <Bestsellers />
      <Reviews />
      <Promos />
      <Vision />
      <Ecosystem />
      <Magazine />
    </>
  );
}
