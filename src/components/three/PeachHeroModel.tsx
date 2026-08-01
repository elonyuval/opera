"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PEACH_MODEL_URL = "/models/peach-shell.glb";

interface PeachHeroModelProps {
  /** נקרא פעם אחת ברגע שהמודל האמיתי סיים להיטען ולהתרנדר */
  onReady?: () => void;
}

/**
 * מציג את המודל התלת-ממדי האמיתי של האפרסק, שנוצר מתמונת סטודיו איכותית
 * (Higgsfield: nano_banana ליצירת תמונה + Meshy image_to_3d עם טקסטורות
 * ו-PBR מלא להמרה ל-3D). בניגוד לגרסה הראשונה (Meta SAM-3, "הרמה" שטוחה
 * מתמונה בודדת מתוך קופסה עמוסה), המודל הזה נפח מלא יחסית — לכן מסתובב
 * סיבוב מלא ואיטי, לא רק "נדנוד".
 *
 * ⚠️ קובץ ה-GLB הזה גדול יחסית (~12MB, טקסטורות PBR באיכות גבוהה) כי כלי
 * דחיסת הטקסטורות המקומיים (sharp/libvips) לא פעלו בסביבת הפיתוח הזו.
 * מומלץ לדחוס אותו (gltf-transform optimize / KTX2) בסביבה תקינה לפני
 * production לביצועים מיטביים. הקומפוננטה טוענת אותו ברקע בלי לחסום את
 * הטעינה הראשונית של הדף (ראו Hero.tsx).
 */
export default function PeachHeroModel({ onReady }: PeachHeroModelProps) {
  const { scene } = useGLTF(PEACH_MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeVertexNormals();
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          material.roughness = 0.3;
          material.envMapIntensity = 1.1;
        }
      }
    });
  }, [clonedScene]);

  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on mount only
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    rotationRef.current += delta * 0.25;
    group.rotation.y = rotationRef.current;
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]} scale={1.55} rotation={[0.05, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(PEACH_MODEL_URL);
