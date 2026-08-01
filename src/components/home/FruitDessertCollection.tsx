import SectionHeading from "@/components/shared/SectionHeading";
import ImageCard from "@/components/shared/ImageCard";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { fruitDesserts } from "@/data/siteContent";

export default function FruitDessertCollection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28" id="collection">
      <SectionHeading
        eyebrow="Fruit Desserts"
        title="קולקציית קינוחי הפירות"
        paragraph="קינוחי פטיסרי בעבודת יד, עם שכבות מפתיעות, מרקמים מדויקים ומראה שאי אפשר להתעלם ממנו."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {fruitDesserts.map((dessert) => (
          <ImageCard
            key={dessert.id}
            href={`/kinuchei-perot#${dessert.id}`}
            image={dessert.image}
            imageAlt={dessert.imageAlt}
            title={dessert.name}
            description={dessert.description}
            badge={dessert.seasonal ? "עונתי" : undefined}
            footer={
              <span className="text-sm font-semibold text-gold underline-offset-4 group-hover:underline">
                לפרטים ←
              </span>
            }
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PrimaryButton href="/kinuchei-perot" variant="secondary">
          לכל קולקציית קינוחי הפירות
        </PrimaryButton>
      </div>
    </section>
  );
}
