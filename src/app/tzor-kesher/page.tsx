import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.contact.title,
  description: seo.pages.contact.description,
  path: "/tzor-kesher",
});

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "צור קשר והגעה", path: "/tzor-kesher" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactSection />
    </>
  );
}
