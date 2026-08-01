"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import {
  dessertLayers,
  scrollStages,
  shellOpenConfig,
  type DessertLayerConfig,
} from "@/data/dessertAnimationConfig";
import DessertLayer from "@/components/three/DessertLayer";
import { useLayerTransform } from "@/components/three/useLayerTransform";

const FULL_MODEL_URL = "/models/opera-fruit-dessert.glb";
const PEACH_SHELL_URL = "/models/peach-shell.glb";

const ROOT_Y = -0.2;
const SHELL_SCALE = 1.1;
const CLOSED_LOCAL_CLIP_Y = 4; // מעל הרשת כולה — כלום לא נחתך

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
    <group position={[0, ROOT_Y, 0]}>
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

function computeOpenAmount(t: number) {
  const { openStart, openEnd, closeStart, closeEnd } = shellOpenConfig;
  if (t <= openStart) return 0;
  if (t <= openEnd) return (t - openStart) / (openEnd - openStart);
  if (t <= closeStart) return 1;
  if (t <= closeEnd) return 1 - (t - closeStart) / (closeEnd - closeStart);
  return 0;
}

/**
 * המודל האמיתי היחיד באתר — משמש בדיוק אותו קומפוננטה גם ב-Hero (idle)
 * וגם באנימציית הסקרול. במקום פירוק ל-6 חלקים נפרדים (שנראה לא עקבי לצד
 * טקסטורת תמונה אמיתית), אותו mesh בדיוק "נחתך" בעדינות בעזרת clipping
 * planes: המכסה העליון מתרומם מעט וחושף דיסקת "מילוי" פשוטה — סגנון אחיד
 * לאורך כל החוויה, בלי לערבב פוטוריאליזם עם צורות גיאומטריות פשוטות.
 */
function RealPeachExperience({
  progressRef,
  idle,
  idleRotationSpeed = 0.12,
}: {
  progressRef: React.RefObject<number>;
  idle?: boolean;
  idleRotationSpeed?: number;
}) {
  const { scene } = useGLTF(PEACH_SHELL_URL);
  const rootRef = useRef<THREE.Group>(null);
  const lidGroupRef = useRef<THREE.Group>(null);
  const capGroupRef = useRef<THREE.Group>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const bodyClipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), CLOSED_LOCAL_CLIP_Y),
    []
  );
  const lidClipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), -CLOSED_LOCAL_CLIP_Y),
    []
  );

  const { geometry, template } = useMemo<{
    geometry: THREE.BufferGeometry | null;
    template: THREE.Material | null;
  }>(() => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) meshes.push(child);
    });
    const firstMesh = meshes[0];
    if (!firstMesh) return { geometry: null, template: null };

    const merged = mergeVertices(firstMesh.geometry);
    merged.computeVertexNormals();
    const material = Array.isArray(firstMesh.material)
      ? firstMesh.material[0]
      : firstMesh.material;
    return { geometry: merged, template: material };
  }, [scene]);

  const bodyMaterial = useMemo(() => {
    const mat = (template?.clone() ?? new THREE.MeshPhysicalMaterial()) as THREE.MeshStandardMaterial;
    mat.roughness = 0.32;
    mat.envMapIntensity = 1.15;
    mat.clippingPlanes = [bodyClipPlane];
    mat.side = THREE.DoubleSide;
    return mat;
  }, [template, bodyClipPlane]);

  const lidMaterial = useMemo(() => {
    const mat = (template?.clone() ?? new THREE.MeshPhysicalMaterial()) as THREE.MeshStandardMaterial;
    mat.roughness = 0.32;
    mat.envMapIntensity = 1.15;
    mat.clippingPlanes = [lidClipPlane];
    mat.side = THREE.DoubleSide;
    return mat;
  }, [template, lidClipPlane]);

  /* eslint-disable react-hooks/immutability -- mutating the .constant of a
     stable THREE.Plane instance every frame is the standard react-three-fiber
     imperative-animation pattern (like mutating mesh.position/.rotation),
     not React state. */
  useFrame((_, delta) => {
    const root = rootRef.current;
    const lidGroup = lidGroupRef.current;
    const capGroup = capGroupRef.current;
    if (!root) return;

    root.rotation.y += idleRotationSpeed * delta * (idle ? 1 : 0.4);

    const t = idle ? 0 : progressRef.current ?? 0;
    const openAmount = idle ? 0 : computeOpenAmount(t);

    const localClipY = idle
      ? CLOSED_LOCAL_CLIP_Y
      : CLOSED_LOCAL_CLIP_Y + (shellOpenConfig.clipLocalY - CLOSED_LOCAL_CLIP_Y) * openAmount;
    const worldClipY = ROOT_Y + SHELL_SCALE * localClipY;

    bodyClipPlane.constant = worldClipY;
    lidClipPlane.constant = -worldClipY;

    if (lidGroup) {
      lidGroup.position.y = shellOpenConfig.lidLiftDistance * openAmount;
      lidGroup.rotation.y = openAmount * 0.35;
    }

    if (capGroup) {
      const capScale = Math.max(0.001, openAmount);
      capGroup.scale.set(capScale, capScale, capScale);
      capGroup.position.y = worldClipY - ROOT_Y + 0.02;
    }

    if (!idle) {
      shellOpenConfig.labels.forEach((label, index) => {
        const el = labelRefs.current[index];
        if (!el) return;
        const visible = t >= label.revealAt && t < shellOpenConfig.closeStart;
        el.style.opacity = visible ? "1" : "0";
      });
    } else {
      labelRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
    }
  });
  /* eslint-enable react-hooks/immutability */

  if (!geometry) return null;

  return (
    <group position={[0, ROOT_Y, 0]}>
      <group ref={rootRef} scale={SHELL_SCALE} rotation={[0.05, 0, 0]}>
        <mesh geometry={geometry} material={bodyMaterial} castShadow receiveShadow />
        <group ref={lidGroupRef}>
          <mesh geometry={geometry} material={lidMaterial} castShadow receiveShadow />
        </group>
        <group ref={capGroupRef} scale={0.001}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[shellOpenConfig.capRadius, 48]} />
            <meshPhysicalMaterial
              color={shellOpenConfig.capColor}
              roughness={0.55}
              clearcoat={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>

      {!idle &&
        shellOpenConfig.labels.map((label, index) => (
          <Html
            key={label.text}
            position={[1.1, 0.1 - index * 0.55, 0]}
            center
            zIndexRange={[10, 0]}
            pointerEvents="none"
          >
            <div
              ref={(el) => {
                labelRefs.current[index] = el;
              }}
              className="flex items-center gap-1.5 whitespace-nowrap opacity-0 transition-opacity duration-500"
            >
              <span className="h-px w-5 bg-gold/70" />
              <span className="rounded-full border border-gold/50 bg-warm-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                {label.text}
              </span>
            </div>
          </Html>
        ))}
    </group>
  );
}

/** הרכבת ה-fallback המקצועי מ-primitives — פעיל רק אם אין שום מודל תלת-ממדי אמיתי */
function PrimitiveDessert({
  progressRef,
  segments,
  idle,
  idleRotationSpeed,
}: DessertModelProps) {
  return (
    <group position={[0, ROOT_Y, 0]}>
      {dessertLayers.map((config) => (
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
    </group>
  );
}

export default function DessertModel(props: DessertModelProps) {
  const fullModelStatus = useHasModel(FULL_MODEL_URL);
  const peachShellStatus = useHasModel(PEACH_SHELL_URL);

  if (fullModelStatus === "found") {
    return (
      <Suspense fallback={<PrimitiveDessert {...props} />}>
        <GltfDessert {...props} />
      </Suspense>
    );
  }

  if (peachShellStatus === "found") {
    return (
      <Suspense fallback={<PrimitiveDessert {...props} />}>
        <RealPeachExperience
          progressRef={props.progressRef}
          idle={props.idle}
          idleRotationSpeed={props.idleRotationSpeed}
        />
      </Suspense>
    );
  }

  return <PrimitiveDessert {...props} />;
}
