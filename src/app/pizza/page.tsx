import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import PizzaSection from "@/components/home/PizzaSection";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.pizza.title,
  description: seo.pages.pizza.description,
  path: "/pizza",
});

export default function PizzaPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "פיצה מהטאבון", path: "/pizza" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-8 md:pt-28">
        <SectionHeading as="h1" title={seo.pages.pizza.h1} align="center" />
      </div>

      <PizzaSection />
    </>
  );
}
