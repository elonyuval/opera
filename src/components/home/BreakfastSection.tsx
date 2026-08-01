import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { breakfastSection } from "@/data/siteContent";

export default function BreakfastSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:order-1">
          <Image
            src={breakfastSection.image}
            alt={breakfastSection.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            title={breakfastSection.title}
            paragraph={breakfastSection.paragraph}
          />

          <ul className="flex flex-col gap-3">
            {breakfastSection.items.map((item) => (
              <li key={item.name} className="rounded-xl border border-line bg-warm-white p-4">
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-ink-soft">{item.description}</p>
              </li>
            ))}
          </ul>

          <div>
            <PrimaryButton href={breakfastSection.cta.href}>
              {breakfastSection.cta.label}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
