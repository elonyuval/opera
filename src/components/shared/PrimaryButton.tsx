"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
}

const variantClasses: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary:
    "bg-ink text-warm-white hover:bg-charcoal-soft border border-ink",
  secondary:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink/5",
  ghost: "bg-gold-light/40 text-ink border border-gold/40 hover:bg-gold-light",
};

export default function PrimaryButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: PrimaryButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${variantClasses[variant]} ${className}`;

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
