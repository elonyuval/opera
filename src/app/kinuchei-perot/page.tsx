import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { seo, fruitDesserts } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.fruitDesserts.title,
  description: seo.pages.fruitDesserts.description,
  path: "/kinuchei-perot",
});

export default function FruitDessertsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "בית", path: "/" },
    { name: "קינוחי פירות", path: "/kinuchei-perot" },
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
          eyebrow="Fruit Desserts"
          title={seo.pages.fruitDesserts.h1}
          paragraph="קינוחי פטיסרי בעבודת יד, עם שכבות מפתיעות, מרקמים מדויקים ומראה שאי אפשר להתעלם ממנו. שמות הקינוחים המוצגים כאן הם דמה — יוחלפו בשמות האמיתיים לאחר קבלתם מהלקוח."
          align="center"
        />

        <div className="mt-14 flex flex-col gap-16">
          {fruitDesserts.map((dessert, index) => (
            <article
              key={dessert.id}
              id={dessert.id}
              className={`grid scroll-mt-28 grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={dessert.image}
                  alt={dessert.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                {dessert.seasonal && (
                  <span className="absolute right-4 top-4 rounded-full bg-warm-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                    עונתי
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 text-right">
                <h2 className="font-display text-2xl text-ink md:text-3xl">
                  {dessert.name}
                  {dessert.isPlaceholderName && (
                    <span className="mr-2 align-middle text-xs font-normal text-ink-soft">
                      (שם דמה)
                    </span>
                  )}
                </h2>
                <p className="text-base leading-relaxed text-ink-soft">
                  {dessert.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dessert.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full border border-line bg-warm-white px-3 py-1 text-xs text-ink-soft"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <PrimaryButton href="/tafrit" variant="secondary">
            לתפריט המלא
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
