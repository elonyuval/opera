import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { business } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של אתר Opera Café Patisserie.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
      <SectionHeading as="h1" title="מדיניות פרטיות" align="center" />

      {/* ⚠️ TODO(client): נוסח משפטי סופי מומלץ בליווי עו״ד לפני עלייה לאוויר */}
      <div className="mt-10 flex flex-col gap-5 text-right text-ink-soft">
        <p>
          אנו אוספים מידע אישי (כגון שם, טלפון והודעה) רק כאשר אתם ממלאים טופס
          יצירת קשר או טופס פניית אירוע באתר, לצורך מענה לפנייתכם בלבד.
        </p>
        <p>המידע אינו נמכר או מועבר לצדדים שלישיים למטרות שיווק.</p>
        <p>
          לשאלות בנוגע למדיניות הפרטיות ניתן ליצור קשר בטלפון {business.phone}.
        </p>
      </div>
    </div>
  );
}
