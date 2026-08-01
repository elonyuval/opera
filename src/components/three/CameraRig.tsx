"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { scrollStages } from "@/data/dessertAnimationConfig";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getCameraTarget(t: number) {
  const clamped = clamp01(t);

  for (let i = 0; i < scrollStages.length; i += 1) {
    const stage = scrollStages[i];
    const [start, end] = stage.range;
    const isLast = i === scrollStages.length - 1;

    if (clamped <= end || isLast) {
      const prev = i === 0 ? stage : scrollStages[i - 1];
      const localT = clamp01((clamped - start) / Math.max(0.0001, end - start));
      return {
        distance: lerp(prev.cameraDistance, stage.cameraDistance, localT),
        height: lerp(prev.cameraHeight, stage.cameraHeight, localT),
      };
    }
  }

  return { distance: scrollStages[0].cameraDistance, height: scrollStages[0].cameraHeight };
}

interface CameraRigProps {
  progressRef: React.RefObject<number>;
}

/** מזיז את מצלמת ה-3D לפי התקדמות הגלילה — זום עדין וגובה משתנה בין השלבים */
export default function CameraRig({ progressRef }: CameraRigProps) {
  const { camera } = useThree();

  /* eslint-disable react-hooks/immutability -- imperative per-frame mutation
     of the three.js camera object is the standard react-three-fiber pattern;
     the camera instance is a stable mutable object, not React state. */
  useFrame(() => {
    const t = progressRef.current ?? 0;
    const { distance, height } = getCameraTarget(t);
    camera.position.z += (distance - camera.position.z) * 0.06;
    camera.position.y += (height - camera.position.y) * 0.06;
    camera.lookAt(0, -0.1, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}
