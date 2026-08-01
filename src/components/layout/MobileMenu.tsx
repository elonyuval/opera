"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { navLinks, business } from "@/data/siteContent";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="תפריט ניווט"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex flex-col bg-cream lg:hidden"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-xl text-ink">Opera</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-ink"
          aria-label="סגירת תפריט"
        >
          <X size={26} aria-hidden />
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-start gap-6 px-8 py-6" aria-label="ניווט מובייל">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.35 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-display text-3xl text-ink transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="border-t border-line px-8 py-6">
        <PrimaryButton href={business.reservationHref} className="w-full" >
          הזמנת שולחן
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
