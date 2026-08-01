import type { MetadataRoute } from "next";
import { seo } from "@/data/siteContent";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${seo.baseUrl}/sitemap.xml`,
  };
}
