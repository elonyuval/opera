import type { MetadataRoute } from "next";
import { business, seo } from "@/data/siteContent";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.siteName,
    short_name: business.shortName,
    description: seo.pages.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf4e9",
    theme_color: "#fbf4e9",
    lang: "he",
    dir: "rtl",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
