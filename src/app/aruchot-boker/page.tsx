import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import BreakfastSection from "@/components/home/BreakfastSection";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.breakfast.title,
  description: seo.pages.breakfast.description,
  path: "/aruchot-boker",
});

export default function BreakfastPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "ארוחות בוקר", path: "/aruchot-boker" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-8 md:pt-28">
        <SectionHeading as="h1" title={seo.pages.breakfast.h1} align="center" />
      </div>

      <BreakfastSection />
    </>
  );
}
