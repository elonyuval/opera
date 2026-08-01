import type { MetadataRoute } from "next";
import { seo, eventsConfig } from "@/data/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/kinuchei-perot", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/tafrit", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/aruchot-boker", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/pizza", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/odot", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/tzor-kesher", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  if (eventsConfig.enabled) {
    staticPaths.push({ path: "/eruim", priority: 0.6, changeFrequency: "monthly" as const });
  }

  return staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${seo.baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
