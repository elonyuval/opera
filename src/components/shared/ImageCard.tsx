"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ImageCardProps {
  href?: string;
  image: string;
  imageAlt: string;
  title: string;
  description?: string;
  badge?: string;
  footer?: ReactNode;
  priority?: boolean;
}

export default function ImageCard({
  href,
  image,
  imageAlt,
  title,
  description,
  badge,
  footer,
  priority = false,
}: ImageCardProps) {
  const body = (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-warm-white shadow-[0_8px_30px_-15px_rgba(42,29,20,0.35)]"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          priority={priority}
        />
        {badge && (
          <span className="absolute right-3 top-3 rounded-full bg-warm-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
            {badge}
          </span>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl text-ink">{title}</h3>
        {description && (
          <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
        )}
        {footer && <div className="mt-auto pt-3">{footer}</div>}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus-visible:outline-2 focus-visible:outline-gold rounded-2xl">
        {body}
      </Link>
    );
  }

  return body;
}
