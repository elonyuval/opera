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

      {/* הערה פנימית לצוות הפיתוח/לקוח — אינה מוצגת כטקסט שיווקי באתר החי */}
      <div className="mt-12 rounded-xl border border-dashed border-gold/40 bg-gold-light/20 p-5">
        <p className="mb-2 text-sm font-semibold text-ink">
          פרטים שעדיין דרושים מהלקוח להשלמת עמוד האודות:
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
          {aboutSection.factsNeeded.map((fact) => (
            <li key={fact}>{fact.replace("⚠️ TODO(client): ", "")}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
