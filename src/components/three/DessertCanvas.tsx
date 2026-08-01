"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import type { ReactNode } from "react";

/** מפעיל clipping planes ברנדרר — נדרש לאפקט "פתיחת" הקינוח האמיתי */
function ClippingSetup() {
  const { gl } = useThree();
  /* eslint-disable react-hooks/immutability -- flipping a renderer flag on
     the stable WebGLRenderer instance is the standard react-three-fiber
     setup pattern, not React state mutation. */
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);
  /* eslint-enable react-hooks/immutability */
  return null;
}

interface DessertCanvasProps {
  children: ReactNode;
  dpr?: number;
  withContactShadow?: boolean;
  className?: string;
}

/**
 * עטיפה משותפת ל-Canvas של Three.js: מצלמה, תאורה יוקרתית ורכה וצל מגע עדין.
 * משמש גם ב-Hero (מצב idle) וגם ב-DessertScrollExperience (מצב מונע-גלילה).
 */
export default function DessertCanvas({
  children,
  dpr = 1.5,
  withContactShadow = true,
  className = "",
}: DessertCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0.4, 6.5], fov: 32 }}
        shadows
      >
        {/* אין background אטום בכוונה — ה-Canvas שקוף כדי שהקינוח "יצוף" ישירות
            על הרקע האמיתי של הדף, בלי מלבן/קופסה נראית לעין */}
        <ClippingSetup />
        <ambientLight intensity={0.65} color="#fff6e8" />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.1}
          color="#fff1d6"
          castShadow
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#e8c9ff" />
        <pointLight position={[0, -2, 2]} intensity={0.25} color="#ffd9a0" />

        <Suspense fallback={null}>
          {children}
          {withContactShadow && (
            <ContactShadows
              position={[0, -1.65, 0]}
              opacity={0.45}
              scale={8}
              blur={2.6}
              far={2.5}
              color="#3a2313"
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
