# Opera Café Patisserie — אתר תדמית

אתר תדמית פרימיום ל-Opera Café Patisserie (אופרה נתניה) — בית קינוחי הפירות
והפטיסרי של נתניה. נבנה עם Next.js (App Router), TypeScript, Tailwind CSS,
GSAP ScrollTrigger, React Three Fiber / Three.js ו-Framer Motion.

## התקנה והרצה

```bash
npm install
npm run dev
```

האתר יעלה על [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # בנייה לפרודקשן
npm start       # הרצת גרסת הפרודקשן שנבנתה
npm run lint    # ESLint
```

הפרויקט מוכן לפריסה ב-Vercel ללא הגדרות נוספות (`vercel deploy` / חיבור הריפו ל-Vercel).

## מבנה תיקיות עיקרי

```
src/
  app/                    # דפי Next.js App Router (route per folder)
  components/
    layout/               # Header, MobileMenu, MobileActionBar, Footer
    home/                 # קומפוננטות ספציפיות לדף הבית
    sections/             # About / Events / Contact
    three/                 # כל מנוע ה-3D (Canvas, Model, Layer, Scroll Experience)
    shared/               # PrimaryButton, SectionHeading, ImageCard וכו'
  data/
    siteContent.ts         # מקור אמת יחיד לכל טקסט/פרטי עסק/SEO/תפריטים
    dessertAnimationConfig.ts  # קונפיג אנימציית ה-3D (מיקומים, טיימינג, טקסטים)
  hooks/                  # useReducedMotion, useMediaQuery, usePerformanceTier
  lib/                    # seo.ts (Metadata + JSON-LD), gsapSetup.ts
public/
  images/{desserts,bakery,breakfast,pizza,interior}/
  models/opera-fruit-dessert.glb   # (לא קיים עדיין — ראו הוראות למטה)
```

כל טקסט עסקי, פרטי קשר, קישורים ותוכן תפריט מרוכזים ב-
[`src/data/siteContent.ts`](src/data/siteContent.ts). זהו הקובץ היחיד שצריך
לערוך כדי לעדכן תוכן — אין צורך לחפש טקסטים בתוך קומפוננטות.

## איך להחליף כל דבר

### לוגו
החליפו את `public/images/brand/opera-logo.svg` בלוגו האמיתי (מומלץ SVG). אם
מתקבל לוגו כ-PNG/JPG, עדכנו את הנתיב ב-`Header.tsx` ו-`Footer.tsx` בהתאם.

### תמונות
כל תמונה כרגע היא placeholder מ-Unsplash (URL מלא בתוך `siteContent.ts`). כדי
להחליף בתמונות אמיתיות:
1. הניחו את קובץ התמונה בתיקייה המתאימה תחת `public/images/...` (ראו README
   בכל תת-תיקייה לשם קובץ מומלץ).
2. עדכנו את שדה ה-`image`/`src` המתאים ב-`siteContent.ts` לנתיב המקומי, למשל
   `/images/desserts/mango-fruit-dessert.jpg`.

### מודל ה-GLB (קינוח הפירות בתלת-ממד)
כרגע רץ fallback איכותי שבנוי מ-primitives של Three.js (שכבות: מעטפת, מוס,
קרם, ליבה, קראנץ', בסיס). כדי להחליף במודל אמיתי:
1. הניחו קובץ בשם `opera-fruit-dessert.glb` בתיקיית `public/models/`.
2. ודאו ששמות ה-meshes בקובץ תואמים לשדה `meshName` בכל layer בקובץ
   `src/data/dessertAnimationConfig.ts` (`shell`, `mousse`, `cream`, `core`,
   `crunch`, `base`) — או עדכנו את השדות בקונפיג לשמות בפועל.
3. `DessertModel.tsx` מזהה אוטומטית שהקובץ קיים (בדיקת HEAD request) ועובר
   לטעינתו עם `useGLTF` במקום ה-primitives — אין צורך בשינוי קוד נוסף.

### טקסטים, תפריט, קטגוריות
הכול ב-`src/data/siteContent.ts`: כותרות, פסקאות, פריטי תפריט (`fruitDesserts`,
`breakfastSection`, `pizzaSection`), טקסטי SEO (`seo.pages`) וכו'.

### פרטי קשר וקישורי הזמנה/ניווט
באובייקט `business` בתוך `siteContent.ts`: טלפון, וואטסאפ, כתובת, קישורי Waze
ו-Google Maps, קישור הזמנת שולחן, אינסטגרם. **כל שדה המתויג `⚠️ TODO(client)`
בקובץ צריך אימות/החלפה בפועל לפני עלייה לאוויר.**

### שעות פתיחה וסוג כשרות
בכוונה **לא מוצגים** באתר החי (כפי שהתבקש) עד לקבלת מידע מאומת מהלקוח. השדה
`business.hoursDisplay` הוא `null` — כשיתקבל מידע מדויק, מלאו מחרוזת שם והוסיפו
תצוגה במקום הרלוונטי ב-Hero/Footer/Contact. סוג הכשרות המדויק (רבנות/בד״ץ וכו')
לא מוזכר — רק התג הכללי "כשר".

### אזור אירועים (אופציונלי)
ניתן לכבות לגמרי דרך `eventsConfig.enabled` ב-`siteContent.ts` (כשה-flag הוא
`false`, העמוד `/eruim` מחזיר 404 והקישור נעלם מהניווט). מומלץ להשאיר כבוי עד
לאישור סופי של השירות/הקיבולת מהלקוח.

### חיבור טפסים לשירות אמיתי
טופס צור קשר וטופס אירועים שולחים כרגע ל-API routes מקומיים
(`src/app/api/contact/route.ts`, `src/app/api/events/route.ts`) שמדמים הצלחה
בלי לשלוח הודעה בפועל. לחיבור אמיתי: Formspree / Resend / CRM — יש להחליף את
תוכן ה-handler בקריאה לשירות הרצוי (מבנה ה-payload כבר מוכן).

## מידע שעדיין דרוש מהלקוח לפני עלייה לאוויר

- שם רשמי / ח.פ. של העסק (ל-JSON-LD)
- שעות פתיחה מדויקות
- סוג כשרות/השגחה מדויק
- קואורדינטות GPS מדויקות
- קישור הזמנת שולחן אמיתי (Tabit / Ontopo / אחר)
- מספר/קישור WhatsApp Business רשמי
- חשבון האינסטגרם הרשמי (נמצא מועמד לא-מאומת במחקר: `lopera_netanya` — יש לאמת)
- שמות ומחירי מנות אמיתיים (קינוחי פירות, ארוחות בוקר, תפריט מלא)
- סיפור המותג לעמוד "אודות" (מקימים, שף פטיסרי, מקור השם Opera וכו')
- אישור סופי על שירות אירועים, קיבולת מקסימלית ונוסח העמוד
- דומיין סופי (כרגע `https://opera-netanya.co.il` כ-placeholder ב-`seo.baseUrl`)
- לוגו רשמי, תמונות מקצועיות (קינוחים/בייקרי/בוקר/פיצה/חלל), ומודל GLB של קינוח
  הפירות (אופציונלי — ה-fallback מוכן לשימוש)

## נגישות וביצועים

- תמיכה מלאה ב-`prefers-reduced-motion`: במקום חוויית ה-3D נטענת גרסה סטטית
  (`ReducedMotionFallback.tsx`) עם אותו סיפור תוכן.
- זיהוי גס של כוח המכשיר (`usePerformanceTier`) מוריד DPR/פוליגונים/צללים
  במכשירים חלשים, ועובר לגרסה הסטטית במכשירים חלשים מאוד.
- ה-Canvas של ה-3D נטען דינמית (`next/dynamic` עם `ssr:false`) ורק בצד הלקוח.
- מפת Google נטענת רק בלחיצה (lazy on interaction).
- ניווט מקלדת מלא, `:focus-visible`, קישור "דילוג לתוכן", alt לכל תמונה.
