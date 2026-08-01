# מודל 3D אמיתי — opera-fruit-dessert.glb

הניחו כאן קובץ בשם `opera-fruit-dessert.glb` כדי להחליף את ה-fallback המבוסס primitives.

## דרישות למודל

- שמות ה-meshes בקובץ צריכים להתאים לשדה `meshName` בכל layer בקובץ
  `src/data/dessertAnimationConfig.ts`: `shell`, `mousse`, `cream`, `core`, `crunch`, `base`.
- אם שמות ה-meshes שונים (למשל מ-Blender), עדכנו את `meshName` בקונפיג בהתאם.
- מומלץ למודל של עד כמה מאות אלפי משולשים (polygons) כדי לשמור על ביצועים טובים במובייל.
- חומרים (materials) מוגדרים בתוך ה-GLB עצמו ידרסו את חומרי ה-fallback.

לאחר הנחת הקובץ, `DessertModel.tsx` יזהה אותו אוטומטית (בדיקת קיום קובץ) ויעבור
לטעינתו עם `useGLTF` במקום ה-primitives.
