import Link from "next/link";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-display text-7xl text-gold">404</span>
      <h1 className="font-display text-3xl text-ink">הדף שחיפשתם לא נמצא</h1>
      <p className="text-ink-soft">
        ייתכן שהקישור שונה או שהעמוד הוסר. אפשר לחזור לעמוד הבית או לצפות בתפריט.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <PrimaryButton href="/">חזרה לעמוד הבית</PrimaryButton>
        <PrimaryButton href="/tafrit" variant="secondary">
          לצפייה בתפריט
        </PrimaryButton>
      </div>
      <Link href="/tzor-kesher" className="text-sm text-ink-soft underline">
        או צרו איתנו קשר
      </Link>
    </div>
  );
}
