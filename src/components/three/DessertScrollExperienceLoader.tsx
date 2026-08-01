"use client";

import dynamic from "next/dynamic";
import LoadingFallback from "@/components/three/LoadingFallback";

const DessertScrollExperience = dynamic(
  () => import("@/components/three/DessertScrollExperience"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingFallback />
      </div>
    ),
  }
);

export default function DessertScrollExperienceLoader() {
  return <DessertScrollExperience />;
}
