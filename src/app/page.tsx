import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import DessertScrollExperienceLoader from "@/components/three/DessertScrollExperienceLoader";
import FruitDessertCollection from "@/components/home/FruitDessertCollection";
import ExperienceCards from "@/components/home/ExperienceCards";
import BreakfastSection from "@/components/home/BreakfastSection";
import PizzaSection from "@/components/home/PizzaSection";
import AtmosphereGallery from "@/components/home/AtmosphereGallery";
import InstagramGrid from "@/components/home/InstagramGrid";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.home.title,
  description: seo.pages.home.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <DessertScrollExperienceLoader />
      <FruitDessertCollection />
      <ExperienceCards />
      <BreakfastSection />
      <PizzaSection />
      <AtmosphereGallery />
      <InstagramGrid />
    </>
  );
}
