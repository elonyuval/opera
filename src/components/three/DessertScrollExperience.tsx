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
import {
  scrollStages,
  dessertLayers,
  dessertExperienceConfig,
  type LayerId,
} from "@/data/dessertAnimationConfig";

export default function DessertScrollExperience() {
  const prefersReducedMotion = useReducedMotion();
  const performanceTier = usePerformanceTier();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const [activeStageId, setActiveStageId] = useState(scrollStages[0].id);
  const [revealedLabels, setRevealedLabels] = useState<LayerId[]>([]);
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

        const nextRevealed = dessertLayers
          .filter((layer) => self.progress >= layer.labelRevealAt && self.progress < 0.97)
          .map((layer) => layer.id);
        setRevealedLabels((prev) =>
          prev.length === nextRevealed.length &&
          prev.every((id, index) => id === nextRevealed[index])
            ? prev
            : nextRevealed
        );

        setShowFinalCta((prev) => {
          const next = self.progress > 0.94;
          return prev === next ? prev : next;
        });
      },
    });

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

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12">
          <div className="flex justify-center gap-2 pt-2">
            {revealedLabels.map((id) => {
              const layer = dessertLayers.find((l) => l.id === id);
              if (!layer) return null;
              return (
                <span
                  key={id}
                  className="rounded-full border border-gold/50 bg-warm-white/85 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-sm md:text-sm"
                >
                  {layer.label}
                </span>
              );
            })}
          </div>

          {showFinalCta && (
            <div className="pointer-events-auto mb-24 flex justify-center md:mb-16">
              <PrimaryButton href={dessertExperienceConfig.finalCta.href}>
                {dessertExperienceConfig.finalCta.label}
              </PrimaryButton>
            </div>
          )}
        </div>

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
