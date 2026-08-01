"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { hero, fruitDesserts } from "@/data/siteContent";
import PrimaryButton from "@/components/shared/PrimaryButton";
import DessertCanvas from "@/components/three/DessertCanvas";
import DessertModel from "@/components/three/DessertModel";
import PeachHeroModel from "@/components/three/PeachHeroModel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { dessertExperienceConfig } from "@/data/dessertAnimationConfig";

const PEACH_MODEL_URL = "/models/peach-shell.glb";

/** בדיקת קיום מודל האפרסק האמיתי; אם נכשל — נופלים חזרה לקינוח ה-primitives */
function useHasPeachModel() {
  const [hasModel, setHasModel] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(PEACH_MODEL_URL, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setHasModel(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return hasModel;
}

export default function Hero() {
  const progressRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const performanceTier = usePerformanceTier();
  const hasPeachModel = useHasPeachModel();
  const useLightHero = prefersReducedMotion || performanceTier === "low";

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-6 md:px-8 lg:grid-cols-2 lg:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex flex-col items-start gap-6 text-right lg:order-1"
        >
          <span className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            {hero.eyebrow}
          </span>
          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            {hero.paragraph}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <PrimaryButton href={hero.ctaPrimary.href} variant="primary">
              {hero.ctaPrimary.label}
            </PrimaryButton>
            <PrimaryButton href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </PrimaryButton>
          </div>
          <p className="pt-4 text-sm text-ink-soft">{hero.trustLine}</p>
        </motion.div>

        <div className="order-1 h-[50vh] w-full lg:order-2 lg:h-[70vh]">
          {useLightHero ? (
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={fruitDesserts[0].image}
                alt={fruitDesserts[0].imageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <DessertCanvas dpr={1.5} withContactShadow className="h-full w-full">
              <Suspense fallback={null}>
                {hasPeachModel ? (
                  <PeachHeroModel />
                ) : (
                  <DessertModel
                    progressRef={progressRef}
                    segments={dessertExperienceConfig.geometrySegments.high}
                    idle
                    idleRotationSpeed={dessertExperienceConfig.idleRotationSpeed}
                  />
                )}
              </Suspense>
            </DessertCanvas>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="pointer-events-none flex justify-center pb-6 text-xs tracking-[0.3em] text-ink-soft"
        aria-hidden="true"
      >
        גללו למטה
      </motion.div>
    </section>
  );
}
