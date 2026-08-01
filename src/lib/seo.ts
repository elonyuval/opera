import type { Metadata } from "next";
import { business, seo } from "@/data/siteContent";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  imagePath,
}: BuildMetadataInput): Metadata {
  const url = `${seo.baseUrl}${path}`;
  const image = imagePath ?? seo.defaultOgImage;

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: seo.siteName,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** JSON-LD מסוג Organization — מוצג פעם אחת ב-layout הראשי */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: seo.baseUrl,
    logo: `${seo.baseUrl}/images/brand/opera-logo.svg`,
    // ⚠️ TODO(client): קישורי רשתות חברתיות רשמיים (sameAs)
    sameAs: [business.instagramHref].filter(Boolean),
  };
}

/** JSON-LD מסוג Restaurant — מוצג פעם אחת ב-layout הראשי */
export function buildRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    // ⚠️ TODO(client): שם רשמי מדויק אם שונה מהמותג המסחרי
    name: business.name,
    servesCuisine: ["Bakery", "Patisserie", "Cafe", "Pizza"],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressCountry: "IL",
    },
    telephone: business.phone,
    // ⚠️ TODO(client): שעות פתיחה מדויקות ומאומתות
    openingHours: [],
    // ⚠️ TODO(client): סוג כשרות מדויק (לא מוצג עד אימות)
    servesCuisineNote: "כשר",
    priceRange: "$$", // ⚠️ TODO(client): טווח מחירים מדויק
    geo: {
      "@type": "GeoCoordinates",
      // ⚠️ TODO(client): קואורדינטות מדויקות
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    hasMenu: `${seo.baseUrl}/tafrit`,
    acceptsReservations: true,
    url: seo.baseUrl,
    // ⚠️ TODO(client): קישור הזמנת שולחן אמיתי
    sameAs: [business.instagramHref].filter(Boolean),
  };
}

/** JSON-LD מסוג BreadcrumbList לעמודים פנימיים */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${seo.baseUrl}${item.path}`,
    })),
  };
}
