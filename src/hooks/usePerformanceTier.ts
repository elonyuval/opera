"use client";

import { useSyncExternalStore } from "react";

export type PerformanceTier = "high" | "medium" | "low";

/**
 * הערכה גסה של כוח המכשיר כדי לבחור דרג איכות ל-3D (DPR, פוליגונים, צללים).
 * לא מדויק מדעית — מטרתו רק למנוע חוויית 3D כבדה על מכשירים חלשים.
 * מבוסס על מאפייני navigator שאינם משתנים בזמן ריצה, ולכן ה-subscribe הוא no-op.
 */
function computeTier(): PerformanceTier {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if ((memory !== undefined && memory <= 2) || cores <= 2) return "low";
  if (isMobile || cores <= 4) return "medium";
  return "high";
}

function subscribe() {
  return () => {};
}

function getServerSnapshot(): PerformanceTier {
  return "high";
}

export function usePerformanceTier(): PerformanceTier {
  return useSyncExternalStore(subscribe, computeTier, getServerSnapshot);
}
