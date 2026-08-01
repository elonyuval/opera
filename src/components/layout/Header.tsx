"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks, business } from "@/data/siteContent";
import PrimaryButton from "@/components/shared/PrimaryButton";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(251, 244, 233, 0.85)" : "rgba(251, 244, 233, 0)",
          borderColor: scrolled ? "rgba(230, 218, 195, 1)" : "rgba(230, 218, 195, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Opera Café Patisserie — לעמוד הבית">
            <Image
              src="/images/brand/opera-logo.svg"
              alt="Opera Café Patisserie"
              width={140}
              height={42}
              className="h-9 w-auto md:h-10"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="ניווט ראשי">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <PrimaryButton href={business.reservationHref} variant="primary">
              הזמנת שולחן
            </PrimaryButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-ink lg:hidden"
            aria-label="פתיחת תפריט ניווט"
            aria-expanded={menuOpen}
          >
            <Menu size={26} aria-hidden />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
