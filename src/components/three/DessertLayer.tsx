"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
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
 * דיסקה עם קצוות מעוגלים (bullnose) עבור LatheGeometry — במקום גליל עם
 * פינות חדות (שנראה כמו "לבנה"/פאק הוקי), הקצוות רכים כמו שכבת קראנץ'/בסיס
 * אמיתית בפטיסרי.
 */
function createDiscProfile(radius: number, halfHeight: number): THREE.Vector2[] {
  const points: [number, number][] = [
    [0, -halfHeight],
    [radius * 0.86, -halfHeight],
    [radius, -halfHeight * 0.3],
    [radius, halfHeight * 0.3],
    [radius * 0.86, halfHeight],
    [0, halfHeight],
  ];
  return points.map(([x, y]) => new THREE.Vector2(x, y));
}

/**
 * geometry הבסיס לכל שכבה, בנוי כ-primitive של Three.js (LatheGeometry לכל
 * השכבות — כיפות לפרי/מוס/קרם, דיסקות מעוגלות-קצוות לקראנץ'/בסיס — כדי
 * לקבל צורות פטיסרי אלגנטיות ולא פרימיטיבים גיאומטריים "בוטים"; Sphere
 * קטן לליבת הפרי בלבד).
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
        return new THREE.LatheGeometry(createDiscProfile(0.84, 0.08), segments);
      case "base":
        return new THREE.LatheGeometry(createDiscProfile(1.13, 0.11), segments);
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
  const labelRef = useRef<HTMLDivElement>(null);
  const geometry = useLayerGeometry(config.id, segments);

  useLayerTransform({
    groupRef,
    config,
    progressRef,
    explodeRange,
    idle,
    idleRotationSpeed,
  });

  useFrame(() => {
    const label = labelRef.current;
    if (!label) return;
    if (idle) {
      label.style.opacity = "0";
      return;
    }
    const t = progressRef.current ?? 0;
    const visible = t >= config.labelRevealAt && t < 0.96;
    label.style.opacity = visible ? "1" : "0";
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

      {!idle && (
        <Html position={[1.35, 0, 0]} center zIndexRange={[10, 0]} pointerEvents="none">
          <div
            ref={labelRef}
            className="flex items-center gap-1.5 whitespace-nowrap opacity-0 transition-opacity duration-500"
            style={{ transform: "translateX(0)" }}
          >
            <span className="h-px w-5 bg-gold/70" />
            <span className="rounded-full border border-gold/50 bg-warm-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
              {config.label}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
