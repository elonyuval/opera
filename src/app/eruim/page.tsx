import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventsSection from "@/components/sections/EventsSection";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo, eventsConfig } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.events.title,
  description: seo.pages.events.description,
  path: "/eruim",
});

export default function EventsPage() {
  if (!eventsConfig.enabled) {
    notFound();
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "אירועים", path: "/eruim" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EventsSection headingLevel="h1" />
    </>
  );
}
