import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import ImageCard from "@/components/shared/ImageCard";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo, fruitDesserts, experienceCards, breakfastSection, pizzaSection } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.menu.title,
  description: seo.pages.menu.description,
  path: "/tafrit",
});

const menuCategories = [
  {
    id: "fruit-desserts",
    title: "קינוחי פירות",
    description: "קולקציית הדגל שלנו — קינוחי פטיסרי בשכבות מפתיעות.",
    href: "/kinuchei-perot",
  },
  {
    id: "patisserie-bakery",
    title: "פטיסרי ובייקרי",
    description: "יצירות בעבודת יד ומאפים טריים מדי יום.",
    href: "/",
  },
  {
    id: "breakfast",
    title: "ארוחות בוקר",
    description: breakfastSection.paragraph,
    href: "/aruchot-boker",
  },
  {
    id: "pizza",
    title: "פיצה נפוליטנית מהטאבון",
    description: pizzaSection.paragraph,
    href: "/pizza",
  },
];

export default function MenuPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "תפריט", path: "/tafrit" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          as="h1"
          title={seo.pages.menu.h1}
          paragraph="תפריט חלבי כשר — מהבייקרי של הבוקר, דרך הפיצה מהטאבון ועד קינוח הפירות שאי אפשר לא לצלם."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {menuCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col gap-2 rounded-2xl border border-line bg-warm-white p-6 transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-gold"
            >
              <h2 className="font-display text-xl text-ink">{category.title}</h2>
              <p className="text-sm leading-relaxed text-ink-soft">{category.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading title="קינוחי הפירות בתפריט" align="start" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fruitDesserts.map((dessert) => (
              <ImageCard
                key={dessert.id}
                href={`/kinuchei-perot#${dessert.id}`}
                image={dessert.image}
                imageAlt={dessert.imageAlt}
                title={dessert.name}
                description={dessert.description}
                badge={dessert.seasonal ? "עונתי" : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading title="העולמות של אופרה" align="start" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {experienceCards.map((card) => (
              <ImageCard
                key={card.id}
                href={card.href}
                image={card.image}
                imageAlt={card.imageAlt}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
