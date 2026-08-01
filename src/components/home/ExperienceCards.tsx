"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { experienceCards } from "@/data/siteContent";

export default function ExperienceCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {experienceCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={card.href}
              className="group relative block h-[420px] overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-gold"
            >
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-right">
                <h3 className="font-display text-2xl text-warm-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-warm-white/85">
                  {card.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
