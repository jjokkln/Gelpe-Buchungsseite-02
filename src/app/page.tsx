import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Gallery } from "@/components/landing/gallery";
import { Pricing } from "@/components/landing/pricing";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
        <Gallery />
        <Pricing />
      </main>
    </>
  );
}
