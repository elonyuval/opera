"use client";

import Link from "next/link";
import { UtensilsCrossed, MapPin, Phone, CalendarCheck } from "lucide-react";
import { business } from "@/data/siteContent";

const actions = [
  { href: "/tafrit", label: "תפריט", Icon: UtensilsCrossed, external: false },
  { href: business.wazeHref, label: "ניווט", Icon: MapPin, external: true },
  { href: business.phoneHref, label: "התקשרות", Icon: Phone, external: true },
  { href: business.reservationHref, label: "הזמנה", Icon: CalendarCheck, external: false },
];

export default function MobileActionBar() {
  return (
    <nav
      aria-label="פס פעולות מהיר"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-warm-white/95 backdrop-blur md:hidden"
    >
      {actions.map(({ href, label, Icon, external }) => {
        const className =
          "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-ink transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold";
        return external ? (
          <a key={label} href={href} className={className}>
            <Icon size={20} aria-hidden />
            {label}
          </a>
        ) : (
          <Link key={label} href={href} className={className}>
            <Icon size={20} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
