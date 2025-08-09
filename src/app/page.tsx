import FeaturesSection from "@/components/sections/FeaturesSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <FeaturesSection />
    </>
  );
}