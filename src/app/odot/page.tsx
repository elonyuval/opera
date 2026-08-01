import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import AboutSection from "@/components/sections/AboutSection";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.about.title,
  description: seo.pages.about.description,
  path: "/odot",
});

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "אודות", path: "/odot" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6 pt-20 md:px-8 md:pt-28">
        <SectionHeading as="h1" title={seo.pages.about.h1} align="center" />
      </div>

      <AboutSection />
    </>
  );
}
