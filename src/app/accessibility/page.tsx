import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { business } from "@/data/siteContent";

export const metadata: Metadata = buildMetadata({
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של אתר Opera Café Patisserie.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
      <SectionHeading as="h1" title="הצהרת נגישות" align="center" />

      <div className="mt-10 flex flex-col gap-5 text-right text-ink-soft">
        <p>
          אנו שואפים להנגיש את האתר לכלל הציבור, כולל אנשים עם מוגבלות, בהתאם
          לתקנות שוויון זכויות לאנשים עם מוגבלות. עמוד זה הוא טיוטת placeholder —
          ⚠️ יש להשלים בדיקת נגישות מלאה ולעדכן פרטי רכז נגישות לפני עלייה לאוויר.
        </p>
        <p>
          האתר תוכנן עם תמיכה בניווט מקלדת מלא, ניגודיות צבעים נאותה, טקסט חלופי
          לתמונות ותמיכה בהעדפת &ldquo;הפחתת תנועה&rdquo; (prefers-reduced-motion).
        </p>
        <p>
          נתקלתם בבעיית נגישות? נשמח שתיצרו קשר בטלפון {business.phone} ונטפל בפנייה
          בהקדם.
        </p>
      </div>
    </div>
  );
}
