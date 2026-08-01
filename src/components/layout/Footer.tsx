import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/shared/InstagramIcon";
import { business, footerLinks } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 md:px-8">
        <div className="flex flex-col gap-4 md:col-span-1">
          <Image
            src="/images/brand/opera-logo.svg"
            alt="Opera Café Patisserie"
            width={140}
            height={42}
            className="h-9 w-auto"
          />
          <p className="text-sm leading-relaxed text-ink-soft">
            בית קינוחי הפירות והפטיסרי של נתניה.
          </p>
        </div>

        <nav aria-label="ניווט פוטר" className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-ink">ניווט</span>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-ink">יצירת קשר</span>
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-gold"
          >
            <Phone size={16} aria-hidden />
            {business.phone}
          </a>
          <a
            href={business.googleMapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-gold"
          >
            <MapPin size={16} aria-hidden />
            {business.address.full}
          </a>
          <a
            href={business.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-gold"
          >
            <InstagramIcon size={16} />
            אינסטגרם
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-ink">מידע</span>
          <Link href="/privacy" className="text-sm text-ink-soft transition-colors hover:text-gold">
            מדיניות פרטיות
          </Link>
          <Link href="/accessibility" className="text-sm text-ink-soft transition-colors hover:text-gold">
            הצהרת נגישות
          </Link>
        </div>
      </div>

      <div className="border-t border-line px-6 py-5 text-center text-xs text-ink-soft md:px-8">
        © {new Date().getFullYear()} Opera Café Patisserie — כל הזכויות שמורות.
      </div>
    </footer>
  );
}
