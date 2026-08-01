/**
 * קונפיגורציה מרכזית לאנימציית ה-3D של קינוח הפירות לפי גלילה.
 *
 * כל המספרים כאן (מיקום/סיבוב/סקייל/טיימינג) ניתנים לעריכה בלי לגעת בקוד
 * הקומפוננטות עצמן (src/components/three/*).
 *
 * --- איך להחליף את ה-fallback במודל GLB אמיתי ---
 * 1. הניחו קובץ GLB בנתיב public/models/opera-fruit-dessert.glb
 * 2. ב-DessertModel.tsx, useGLTF כבר טוען את הקובץ אוטומטית אם הוא קיים
 *    (יש בדיקת fallback שנופלת חזרה ל-primitives אם הטעינה נכשלת).
 * 3. במודל ה-GLB, קראו לכל mesh בשם התואם לשדה `meshName` למטה
 *    (למשל "shell", "mousse", "cream", "core", "crunch", "base"),
 *    כדי ש-DessertLayer ימצא ויאנימציה כל mesh בנפרד לפי הקונפיג הזה.
 * 4. אם השמות שונים, עדכנו את `meshName` בכל layer בהתאם לשמות מה-DCC (בלנדר וכו').
 */

export type LayerId =
  | "shell"
  | "mousse"
  | "cream"
  | "core"
  | "crunch"
  | "base";

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface DessertLayerConfig {
  id: LayerId;
  /** שם ה-mesh המצופה בקובץ ה-GLB האמיתי */
  meshName: string;
  /** תווית עברית שמוצגת ליד השכבה בשלב הפירוק */
  label: string;
  /** צבע fallback (משמש רק ב-primitives, נעלם עם GLB אמיתי בעל חומרים משלו) */
  color: string;
  /** roughness/transmission/clearcoat של חומר ה-fallback */
  material: {
    roughness: number;
    metalness: number;
    transmission: number;
    clearcoat: number;
    clearcoatRoughness: number;
    opacity?: number;
  };
  /** מיקום כשהקינוח סגור/שלם (שלבים 1-2) */
  closedPosition: Vec3Tuple;
  /** מיקום כשהשכבה מפורקת ומרחפת (שלב 3) */
  explodedPosition: Vec3Tuple;
  /** סיבוב נוסף עדין בזמן הפירוק, ברדיאנים */
  explodedRotation: Vec3Tuple;
  /** קנה מידה יחסי של השכבה */
  scale: number;
  /** באיזה אחוז התקדמות גלילה (0-1) התווית של השכבה הזו מתחילה להופיע */
  labelRevealAt: number;
}

/** שכבות הקינוח מהחוץ (מעטפת) פנימה עד הבסיס */
export const dessertLayers: DessertLayerConfig[] = [
  {
    id: "shell",
    meshName: "shell",
    label: "פרי",
    color: "#f0932b",
    material: {
      roughness: 0.08,
      metalness: 0,
      transmission: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    },
    closedPosition: { x: 0, y: 0, z: 0 },
    explodedPosition: { x: 0, y: 2.6, z: 0 },
    explodedRotation: { x: 0.05, y: 0.3, z: 0 },
    scale: 1,
    labelRevealAt: 0.42,
  },
  {
    id: "mousse",
    meshName: "mousse",
    label: "פרי",
    color: "#f6b85c",
    material: {
      roughness: 0.4,
      metalness: 0,
      transmission: 0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.35,
    },
    closedPosition: { x: 0, y: 0, z: 0 },
    explodedPosition: { x: 0, y: 1.55, z: 0 },
    explodedRotation: { x: 0, y: -0.2, z: 0 },
    scale: 0.93,
    labelRevealAt: 0.46,
  },
  {
    id: "cream",
    meshName: "cream",
    label: "קרם",
    color: "#fdf1e0",
    material: {
      roughness: 0.5,
      metalness: 0,
      transmission: 0,
      clearcoat: 0.2,
      clearcoatRoughness: 0.5,
    },
    closedPosition: { x: 0, y: 0, z: 0 },
    explodedPosition: { x: 0, y: 0.55, z: 0 },
    explodedRotation: { x: 0, y: 0.15, z: 0 },
    scale: 0.84,
    labelRevealAt: 0.52,
  },
  {
    id: "core",
    meshName: "core",
    label: "קראנץ'",
    color: "#e3543f",
    material: {
      roughness: 0.4,
      metalness: 0,
      transmission: 0.2,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    },
    closedPosition: { x: 0, y: 0, z: 0 },
    explodedPosition: { x: 0, y: -0.45, z: 0 },
    explodedRotation: { x: 0, y: -0.1, z: 0 },
    scale: 0.5,
    labelRevealAt: 0.58,
  },
  {
    id: "crunch",
    meshName: "crunch",
    label: "קראנץ'",
    color: "#8a5a34",
    material: {
      roughness: 0.85,
      metalness: 0,
      transmission: 0,
      clearcoat: 0,
      clearcoatRoughness: 1,
    },
    closedPosition: { x: 0, y: -0.75, z: 0 },
    explodedPosition: { x: 0, y: -1.4, z: 0 },
    explodedRotation: { x: 0, y: 0.25, z: 0 },
    scale: 0.9,
    labelRevealAt: 0.63,
  },
  {
    id: "base",
    meshName: "base",
    label: "הפתעה",
    color: "#6b4226",
    material: {
      roughness: 0.6,
      metalness: 0,
      transmission: 0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
    },
    closedPosition: { x: 0, y: -1.05, z: 0 },
    explodedPosition: { x: 0, y: -2.4, z: 0 },
    explodedRotation: { x: 0, y: -0.15, z: 0 },
    scale: 1.05,
    labelRevealAt: 0.68,
  },
];

export interface ScrollStageConfig {
  id: "whole" | "opening" | "explode" | "reassemble";
  /** טווח התקדמות הגלילה (0-1) שבו השלב הזה פעיל */
  range: [number, number];
  text: string;
  /** זום/מרחק מצלמה יעד בסוף השלב */
  cameraDistance: number;
  cameraHeight: number;
}

export const scrollStages: ScrollStageConfig[] = [
  {
    id: "whole",
    range: [0, 0.2],
    text: "מבחוץ — יצירת אמנות",
    cameraDistance: 6.5,
    cameraHeight: 0.4,
  },
  {
    id: "opening",
    range: [0.2, 0.4],
    text: "מבפנים — עולם שלם של מרקמים",
    cameraDistance: 5.2,
    cameraHeight: 0.6,
  },
  {
    id: "explode",
    range: [0.4, 0.75],
    text: "כל שכבה נוצרה כדי להשאיר טעם של עוד",
    cameraDistance: 7.5,
    cameraHeight: 1.1,
  },
  {
    id: "reassemble",
    range: [0.75, 1],
    text: "הכירו את קולקציית קינוחי הפירות של Opera",
    cameraDistance: 6,
    cameraHeight: 0.3,
  },
];

export const dessertExperienceConfig = {
  /** גובה כולל של ה-section הארוך, ביחידות vh */
  sectionHeightVh: 450,
  /** סיבוב איטי בשלב הראשון (רדיאנים לשנייה) */
  idleRotationSpeed: 0.12,
  /** האם להפעיל scrub מדויק (true) או מרווח scrub (מספר שניות "עיכוב") */
  scrub: 0.6,
  /** DPR מקסימלי לפי דרג ביצועים */
  dpr: {
    high: 2,
    medium: 1.5,
    low: 1,
  },
  /** מספר קטעי גיאומטריה (segments) לפי דרג ביצועים, משפיע על עדינות המשטחים */
  geometrySegments: {
    high: 64,
    medium: 32,
    low: 16,
  },
  finalCta: { label: "לצפייה בקולקציה", href: "/kinuchei-perot" },
};
