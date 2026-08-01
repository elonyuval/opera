import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import type * as THREE from "three";
import type { DessertLayerConfig } from "@/data/dessertAnimationConfig";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface UseLayerTransformOptions {
  groupRef: RefObject<THREE.Object3D | null>;
  config: DessertLayerConfig;
  progressRef: RefObject<number>;
  explodeRange: [number, number];
  idle?: boolean;
  idleRotationSpeed?: number;
}

/**
 * הלוגיקה המשותפת שמניעה כל שכבה (הן ה-primitives והן meshes אמיתיים מ-GLB)
 * לפי התקדמות הגלילה: אינטרפולציה בין מיקום סגור לפתוח/מפורק, בלי re-render של React.
 */
export function useLayerTransform({
  groupRef,
  config,
  progressRef,
  explodeRange,
  idle = false,
  idleRotationSpeed = 0.12,
}: UseLayerTransformOptions) {
  const [start, end] = explodeRange;

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (idle) {
      group.position.set(
        config.closedPosition.x,
        config.closedPosition.y,
        config.closedPosition.z
      );
      group.rotation.y += idleRotationSpeed * delta;
      return;
    }

    const t = progressRef.current ?? 0;
    let amount: number;

    if (t <= 0.75) {
      amount = clamp01((t - start) / Math.max(0.0001, end - start));
    } else {
      amount = 1 - clamp01((t - 0.75) / 0.25);
    }

    group.position.set(
      lerp(config.closedPosition.x, config.explodedPosition.x, amount),
      lerp(config.closedPosition.y, config.explodedPosition.y, amount),
      lerp(config.closedPosition.z, config.explodedPosition.z, amount)
    );
    group.rotation.set(
      config.explodedRotation.x * amount,
      config.explodedRotation.y * amount,
      config.explodedRotation.z * amount
    );

    const idleSpin = t < 0.18 ? (1 - t / 0.18) * 0.0025 : 0;
    if (idleSpin) {
      group.rotation.y += idleSpin;
    }
  });
}
