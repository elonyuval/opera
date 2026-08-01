"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  paragraph?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  paragraph,
  align = "start",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const Heading = as;
  const alignClasses = align === "center" ? "text-center mx-auto items-center" : "text-right items-end";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-4 max-w-2xl ${alignClasses} ${className}`}
    >
      {eyebrow && (
        <span className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
          {eyebrow}
        </span>
      )}
      <Heading className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-ink">
        {title}
      </Heading>
      {paragraph && (
        <p className="text-base md:text-lg text-ink-soft leading-relaxed">
          {paragraph}
        </p>
      )}
    </motion.div>
  );
}
