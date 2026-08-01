"use client";

import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { galleryImages, atmosphereSection } from "@/data/siteContent";

export default function AtmosphereGallery() {
  const prefersReducedMotion = useReducedMotion();
  const images = [...galleryImages, ...galleryImages];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          title={atmosphereSection.title}
          paragraph={atmosphereSection.paragraph}
          align="center"
        />
      </div>

      <div className="relative mt-12 overflow-hidden">
        {prefersReducedMotion ? (
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:grid-cols-3 md:grid-cols-4 md:px-8">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div dir="ltr" className="flex w-max gap-4 px-4 animate-marquee">
            {images.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="relative h-72 w-56 shrink-0 overflow-hidden rounded-xl md:h-80 md:w-64"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
