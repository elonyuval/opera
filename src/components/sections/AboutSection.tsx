import SectionHeading from "@/components/shared/SectionHeading";
import { aboutSection } from "@/data/siteContent";

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
      <SectionHeading title={aboutSection.title} align="center" />

      <div className="mt-10 flex flex-col gap-5 text-right">
        {aboutSection.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>

      {/* aboutSection.factsNeeded (src/data/siteContent.ts) — רשימת פרטים הדרושים מהלקוח.
          מפורטת גם ב-README; לא מוצגת כאן כדי לא לבלבל מבקרים באתר החי. */}
    </section>
  );
}
