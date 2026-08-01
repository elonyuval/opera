"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsapSetup";
import DessertCanvas from "@/components/three/DessertCanvas";
import DessertModel from "@/components/three/DessertModel";
import CameraRig from "@/components/three/CameraRig";
import ScrollTextStep from "@/components/three/ScrollTextStep";
import ReducedMotionFallback from "@/components/three/ReducedMotionFallback";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { scrollStages, dessertExperienceConfig } from "@/data/dessertAnimationConfig";

export default function DessertScrollExperience() {
  const prefersReducedMotion = useReducedMotion();
  const performanceTier = usePerformanceTier();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const [activeStageId, setActiveStageId] = useState(scrollStages[0].id);
  const [showFinalCta, setShowFinalCta] = useState(false);

  const useLightExperience = prefersReducedMotion || performanceTier === "low";

  useEffect(() => {
    if (useLightExperience) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: dessertExperienceConfig.scrub,
      onUpdate: (self) => {
        progressRef.current = self.progress;

        const stage = scrollStages.find(
          (s) => self.progress >= s.range[0] && self.progress <= s.range[1]
        );
        if (stage) {
          setActiveStageId((prev) => (prev === stage.id ? prev : stage.id));
        }

        setShowFinalCta((prev) => {
          const next = self.progress > 0.94;
          return prev === next ? prev : next;
        });
      },
    });

    // רענון מדידות ה-ScrollTrigger אחרי שהפונטים נטענו — מונע pin/scrub
    // שמתחיל במיקום שגוי בגלל שינוי גובה עדין כתוצאה מהחלפת פונט מאוחרת.
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      trigger.kill();
    };
  }, [useLightExperience]);

  if (useLightExperience) {
    return <ReducedMotionFallback />;
  }

  const segments = dessertExperienceConfig.geometrySegments[performanceTier];
  const dpr = dessertExperienceConfig.dpr[performanceTier];

  return (
    <section
      ref={wrapperRef}
      style={{ height: `${dessertExperienceConfig.sectionHeightVh}vh` }}
      className="relative"
      aria-label="חוויית קינוח הפירות התלת-ממדית לפי גלילה"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <DessertCanvas dpr={dpr} className="h-full w-full">
          <DessertModel progressRef={progressRef} segments={segments} />
          <CameraRig progressRef={progressRef} />
        </DessertCanvas>

        {showFinalCta && (
          <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center md:bottom-16">
            <div className="pointer-events-auto">
              <PrimaryButton href={dessertExperienceConfig.finalCta.href}>
                {dessertExperienceConfig.finalCta.label}
              </PrimaryButton>
            </div>
          </div>
        )}

        {scrollStages.map((stage) => (
          <ScrollTextStep
            key={stage.id}
            text={stage.text}
            active={activeStageId === stage.id && !showFinalCta}
          />
        ))}
      </div>
    </section>
  );
}
