import Image from "next/image";
import { scrollStages, dessertLayers } from "@/data/dessertAnimationConfig";
import { fruitDesserts } from "@/data/siteContent";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { dessertExperienceConfig } from "@/data/dessertAnimationConfig";

/**
 * גרסה סטטית של סיפור קינוח הפירות — מוצגת במקום חוויית ה-3D הכבדה
 * כאשר prefers-reduced-motion פעיל או שהמכשיר מזוהה כחלש מדי.
 * שומרת על אותו סיפור תוכן, בלי אנימציית סקרול-3D.
 */
export default function ReducedMotionFallback() {
  const posterImage = fruitDesserts[0];

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-20 md:px-8">
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border border-line shadow-[0_20px_60px_-20px_rgba(42,29,20,0.4)]">
        <Image
          src={posterImage.image}
          alt={posterImage.imageAlt}
          fill
          sizes="(min-width: 768px) 480px, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-10">
        {scrollStages.map((stage) => (
          <p key={stage.id} className="text-center font-display text-2xl text-ink md:text-3xl">
            {stage.text}
          </p>
        ))}
      </div>

      <ul className="flex flex-wrap justify-center gap-3">
        {dessertLayers.map((layer) => (
          <li
            key={layer.id}
            className="rounded-full border border-gold/40 bg-gold-light/30 px-4 py-1.5 text-sm font-medium text-ink"
          >
            {layer.label}
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <PrimaryButton href={dessertExperienceConfig.finalCta.href}>
          {dessertExperienceConfig.finalCta.label}
        </PrimaryButton>
      </div>
    </section>
  );
}
