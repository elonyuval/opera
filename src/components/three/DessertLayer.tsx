"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { DessertLayerConfig } from "@/data/dessertAnimationConfig";
import { useLayerTransform } from "@/components/three/useLayerTransform";

interface DessertLayerProps {
  config: DessertLayerConfig;
  /** ref משותף עם התקדמות הגלילה הנוכחית (0-1), נקרא בכל פריים בלי לגרום ל-re-render */
  progressRef: React.RefObject<number>;
  /** טווח ה-progress שבו השכבה הזו "נפתחת/מתפרקת" */
  explodeRange: [number, number];
  segments: number;
  /** מצב Hero: סיבוב איטי מתמיד, בלי פירוק לשכבות */
  idle?: boolean;
  idleRotationSpeed?: number;
}

/**
 * פרופיל "כיפת פטיסרי" (entremet mirror-glaze dome) עבור LatheGeometry —
 * במקום כדור פשוט: בטן רחבה, פסגה עם "נשיקה" קטנה למעלה וחלק תחתון מתכנס,
 * בדיוק כמו קינוח פרי מצופה גלייז אמיתי.
 */
function createDomeProfile(radius: number): THREE.Vector2[] {
  const points: [number, number][] = [
    [0, -0.98],
    [0.32, -0.94],
    [0.62, -0.8],
    [0.85, -0.55],
    [0.99, -0.22],
    [1, 0.08],
    [0.92, 0.38],
    [0.74, 0.64],
    [0.48, 0.85],
    [0.2, 0.96],
    [0, 1],
  ];
  return points.map(([x, y]) => new THREE.Vector2(x * radius, y * radius));
}

/**
 * geometry הבסיס לכל שכבה, בנוי כ-primitive של Three.js (LatheGeometry ל"כיפות"
 * הפרי/מוס/קרם, כדי לקבל צורת קינוח אלגנטית ולא כדור גנרי; Sphere לליבת הפרי
 * הקטנה; Cylinder לדיסקות הקראנץ' והבסיס).
 * החלפה ל-GLB אמיתי: ראו את ההסבר ב-src/data/dessertAnimationConfig.ts —
 * ברגע שקיים public/models/opera-fruit-dessert.glb, DessertModel.tsx
 * ישתמש ב-meshes מהקובץ במקום ב-primitives האלה.
 */
function useLayerGeometry(id: DessertLayerConfig["id"], segments: number) {
  return useMemo(() => {
    switch (id) {
      case "shell":
        return new THREE.LatheGeometry(createDomeProfile(1.05), segments);
      case "mousse":
        return new THREE.LatheGeometry(createDomeProfile(0.86), segments);
      case "cream":
        return new THREE.LatheGeometry(createDomeProfile(0.62), segments);
      case "core":
        return new THREE.SphereGeometry(
          0.28,
          Math.max(12, segments / 2),
          Math.max(12, segments / 2)
        );
      case "crunch":
        return new THREE.CylinderGeometry(0.82, 0.86, 0.16, segments);
      case "base":
        return new THREE.CylinderGeometry(1.1, 1.16, 0.22, segments);
      default:
        return new THREE.SphereGeometry(0.5, segments, segments);
    }
  }, [id, segments]);
}

export default function DessertLayer({
  config,
  progressRef,
  explodeRange,
  segments,
  idle = false,
  idleRotationSpeed = 0.12,
}: DessertLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useLayerGeometry(config.id, segments);

  useLayerTransform({
    groupRef,
    config,
    progressRef,
    explodeRange,
    idle,
    idleRotationSpeed,
  });

  return (
    <group ref={groupRef} name={config.meshName} scale={config.scale}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={config.color}
          roughness={config.material.roughness}
          metalness={config.material.metalness}
          transmission={config.material.transmission}
          clearcoat={config.material.clearcoat}
          clearcoatRoughness={config.material.clearcoatRoughness}
          opacity={config.material.opacity ?? 1}
          transparent={(config.material.opacity ?? 1) < 1}
          thickness={0.6}
        />
      </mesh>
    </group>
  );
}
