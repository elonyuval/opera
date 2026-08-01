"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PEACH_MODEL_URL = "/models/peach-shell.glb";

/**
 * מציג את המודל התלת-ממדי האמיתי של האפרסק שנוצר מתמונת רפרנס אמיתית
 * (Higgsfield image-to-3D, מודל sam_3_3d). המודל נבנה משחזור תמונה בודדת
 * ("relief" דו-וחצי-ממדי) ולכן שטוח יחסית מאחור — לכן מפעילים עליו רק
 * "נדנוד" עדין (rocking) בטווח מוגבל, לא סיבוב מלא, כדי לא לחשוף את הצד
 * הדק. אם/כשיתקבל מודל GLB מלא (ראו public/models/README.md), אפשר
 * להחליף את הקומפוננטה הזו בחזרה לחוויה עם סיבוב מלא.
 */
export default function PeachHeroModel() {
  const { scene } = useGLTF(PEACH_MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeVertexNormals();
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          material.roughness = 0.35;
          material.metalness = 0;
        }
      }
    });
  }, [clonedScene]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.22;
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={2.6} rotation={[0.15, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(PEACH_MODEL_URL);
