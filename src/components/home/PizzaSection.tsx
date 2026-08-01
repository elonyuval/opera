"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { pizzaSection } from "@/data/siteContent";

export default function PizzaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6 text-right">
          <span className="text-sm font-semibold tracking-[0.2em] text-gold-light uppercase">
            מהטאבון
          </span>
          <h2 className="font-display text-3xl leading-tight text-warm-white md:text-4xl lg:text-5xl">
            {pizzaSection.title}
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-warm-white/75 md:text-lg">
            {pizzaSection.paragraph}
          </p>
          <div>
            <PrimaryButton href={pizzaSection.cta.href} variant="ghost">
              {pizzaSection.cta.label}
            </PrimaryButton>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <motion.div style={{ y }} className="absolute inset-[-6%]">
            <Image
              src={pizzaSection.image}
              alt={pizzaSection.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
