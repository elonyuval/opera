"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import {
  dessertLayers,
  scrollStages,
  type DessertLayerConfig,
} from "@/data/dessertAnimationConfig";
import DessertLayer from "@/components/three/DessertLayer";
import { useLayerTransform } from "@/components/three/useLayerTransform";

const FULL_MODEL_URL = "/models/opera-fruit-dessert.glb";
const PEACH_SHELL_URL = "/models/peach-shell.glb";

const shellConfig = dessertLayers.find((layer) => layer.id === "shell")!;
const restConfigs = dessertLayers.filter((layer) => layer.id !== "shell");

const openingStage = scrollStages.find((stage) => stage.id === "opening")!;
const explodeStage = scrollStages.find((stage) => stage.id === "explode")!;

function getExplodeRange(layerId: DessertLayerConfig["id"]): [number, number] {
  if (layerId === "shell") {
    return [openingStage.range[0], explodeStage.range[1]];
  }
  return [explodeStage.range[0], explodeStage.range[1]];
}

/** בודק אם קובץ GLB קיים בנתיב הנתון לפני שמנסים לטעון אותו עם useGLTF */
function useHasModel(url: string) {
  const [status, setStatus] = useState<"checking" | "found" | "missing">(
    "checking"
  );

  useEffect(() => {
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? "found" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return status;
}

interface DessertModelProps {
  progressRef: React.RefObject<number>;
  segments: number;
  idle?: boolean;
  idleRotationSpeed?: number;
}

function GltfLayerNode({
  config,
  node,
  progressRef,
  idle,
  idleRotationSpeed,
}: {
  config: DessertLayerConfig;
  node: THREE.Object3D;
  progressRef: React.RefObject<number>;
  idle?: boolean;
  idleRotationSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useLayerTransform({
    groupRef,
    config,
    progressRef,
    explodeRange: getExplodeRange(config.id),
    idle,
    idleRotationSpeed,
  });

  return (
    <group ref={groupRef}>
      <primitive object={node} />
    </group>
  );
}

/** טוען את public/models/opera-fruit-dessert.glb וממפה כל mesh לשכבה המתאימה לפי שם */
function GltfDessert({ progressRef, idle, idleRotationSpeed }: DessertModelProps) {
  const { nodes } = useGLTF(FULL_MODEL_URL) as unknown as {
    nodes: Record<string, THREE.Object3D>;
  };

  return (
    <group position={[0, -0.2, 0]}>
      {dessertLayers.map((config) => {
        const node = nodes[config.meshName];
        if (!node) return null;
        return (
          <GltfLayerNode
            key={config.id}
            config={config}
            node={node}
            progressRef={progressRef}
            idle={idle}
            idleRotationSpeed={idleRotationSpeed}
          />
        );
      })}
    </group>
  );
}

/**
 * המעטפת החיצונית (shell) האמיתית — מודל תלת-ממדי בעל טקסטורה שנוצר
 * מתמונת סטודיו איכותית (Higgsfield: nano_banana ליצירת תמונה, Meshy
 * image_to_3d עם PBR מלא להמרה ל-3D). מאחד את חוויית ה-Hero וה-scroll:
 * אותו מודל בדיוק מונפש בשני המקומות, לא שני קינוחים נפרדים.
 *
 * גיאומטריית ה-mesh מגיעה עם וורטקסים כפולים בכל פאה (כרגיל בכלי
 * reconstruction), ולכן מיזוג וורטקסים (mergeVertices) לפני חישוב
 * הנורמלים הכרחי — אחרת המשטח נראה מפוצל/"פיקסלי" גם באיכות פוליגונים
 * גבוהה, כי כל פאה מקבלת נורמל נפרד במקום החלקה בין פאות שכנות.
 */
function RealShellNode({
  progressRef,
  idle,
  idleRotationSpeed,
}: {
  progressRef: React.RefObject<number>;
  idle?: boolean;
  idleRotationSpeed?: number;
}) {
  const { scene } = useGLTF(PEACH_SHELL_URL);
  const groupRef = useRef<THREE.Group>(null);

  const preparedScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const merged = mergeVertices(child.geometry);
        merged.computeVertexNormals();
        child.geometry = merged;
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          material.roughness = 0.32;
          material.envMapIntensity = 1.15;
        }
      }
    });
    return cloned;
  }, [scene]);

  useLayerTransform({
    groupRef,
    config: shellConfig,
    progressRef,
    explodeRange: getExplodeRange("shell"),
    idle,
    idleRotationSpeed,
  });

  return (
    <group ref={groupRef} scale={1.1} rotation={[0.05, 0, 0]}>
      <primitive object={preparedScene} />
    </group>
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * קישוט קטן (עלה מנטה + חתיכת פרי) שמופיע ליד הצלחה בשלב החיבור מחדש בסוף
 * הסקרול ("מופיעים קישוט קטן, חתיכת פרי או רוטב"). במצב idle (Hero) מוצג קבוע
 * כדי להעשיר את התמונה הראשונית.
 */
function Garnish({
  progressRef,
  idle,
}: {
  progressRef: React.RefObject<number>;
  idle?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    if (idle) {
      group.scale.setScalar(1);
      return;
    }
    const t = progressRef.current ?? 0;
    const visibility = clamp01((t - 0.82) / 0.13) * (1 - clamp01((t - 0.985) / 0.015));
    group.scale.setScalar(visibility);
  });

  return (
    <group ref={groupRef} position={[0.78, -1.02, 0.5]} scale={idle ? 1 : 0}>
      <mesh rotation={[0.4, 0.5, 0.3]} scale={[1, 0.3, 0.55]} castShadow>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshPhysicalMaterial color="#4f7a3d" roughness={0.35} clearcoat={0.6} />
      </mesh>
      <mesh position={[0.24, 0.06, 0.04]} castShadow>
        <sphereGeometry args={[0.09, 14, 14]} />
        <meshPhysicalMaterial color="#c13f5e" roughness={0.25} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

interface InnerLayersProps extends DessertModelProps {
  useRealShell: boolean;
}

/** שכבות הפנים (מוס/קרם/ליבה/קראנץ'/בסיס) — תמיד primitives, כי אין תמונה של החתך הפנימי */
function InnerLayers({
  progressRef,
  segments,
  idle,
  idleRotationSpeed,
  useRealShell,
}: InnerLayersProps) {
  return (
    <group position={[0, -0.2, 0]}>
      {!useRealShell && (
        <DessertLayer
          key={shellConfig.id}
          config={shellConfig}
          progressRef={progressRef}
          explodeRange={getExplodeRange(shellConfig.id)}
          segments={segments}
          idle={idle}
          idleRotationSpeed={idleRotationSpeed}
        />
      )}
      {useRealShell && (
        <Suspense fallback={null}>
          <RealShellNode
            progressRef={progressRef}
            idle={idle}
            idleRotationSpeed={idleRotationSpeed}
          />
        </Suspense>
      )}
      {restConfigs.map((config) => (
        <DessertLayer
          key={config.id}
          config={config}
          progressRef={progressRef}
          explodeRange={getExplodeRange(config.id)}
          segments={segments}
          idle={idle}
          idleRotationSpeed={idleRotationSpeed}
        />
      ))}
      <Garnish progressRef={progressRef} idle={idle} />
    </group>
  );
}

export default function DessertModel(props: DessertModelProps) {
  const fullModelStatus = useHasModel(FULL_MODEL_URL);
  const peachShellStatus = useHasModel(PEACH_SHELL_URL);

  if (fullModelStatus === "found") {
    return (
      <Suspense fallback={<InnerLayers {...props} useRealShell={false} />}>
        <GltfDessert {...props} />
      </Suspense>
    );
  }

  return <InnerLayers {...props} useRealShell={peachShellStatus === "found"} />;
}
