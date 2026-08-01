/**
 * מקור אמת יחיד לכל התוכן העסקי, הטקסטים, פרטי הקשר, התפריטים וה-SEO של האתר.
 * כל שינוי טקסטואלי/עסקי צריך לקרות כאן ולא בתוך הקומפוננטות עצמן.
 *
 * שדות המסומנים ב-⚠️ TODO(client) חייבים אימות/מידע מהלקוח לפני עלייה לאוויר.
 */

export type MenuCategory =
  | "fruit-desserts"
  | "patisserie"
  | "bakery"
  | "breakfast"
  | "pizza"
  | "dairy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  category: MenuCategory;
  image: string;
  imageAlt: string;
  seasonal?: boolean;
  isPlaceholderName?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "desserts" | "breakfast" | "pizza" | "hands";
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  likes: string;
  caption: string;
}

export const business = {
  name: "Opera Café Patisserie",
  shortName: "Opera",
  legalNameTodo: "⚠️ TODO(client): שם רשמי/ח.פ. לצורך JSON-LD ומסמכים רשמיים",
  tagline: "בית קינוחי הפירות והפטיסרי של נתניה",
  subTagline:
    "מהבייקרי של הבוקר, דרך הפיצה מהטאבון ועד הקינוח שאי אפשר לא לצלם.",
  city: "נתניה",
  neighborhood: "אזור פולג",
  address: {
    street: "מפ״י 5",
    city: "נתניה",
    full: "מפ״י 5, נתניה",
    // ⚠️ TODO(client): קואורדינטות מדויקות (נמצא מיקום משוער בחיפוש, יש לאמת)
    lat: 32.3019,
    lng: 34.8676,
  },
  phone: "09-766-3696",
  phoneHref: "tel:+97297663696",
  // ⚠️ TODO(client): קישור וואטסאפ עסקי מדויק (מספר/וואטסאפ-ביזנס לינק)
  whatsappHref: "https://wa.me/97297663696",
  kosher: "כשר", // לא מציינים סוג השגחה מדויק ללא אימות מהלקוח
  // ⚠️ TODO(client): שעות פתיחה מדויקות. אין להציג באתר לפני קבלת אישור.
  // מחקר ראשוני העלה מועמדות (לא מאומתת): א'-ו' 8:00-19:00 — לא להציג עד אימות.
  hoursDisplay: null as string | null,
  // ⚠️ TODO(client): קישור הזמנת שולחן אמיתי (Tabit / Ontopo / טופס פנימי וכו')
  reservationHref: "#reservation-todo",
  // ⚠️ TODO(client): קישורי ניווט מדויקים
  wazeHref: "https://waze.com/ul?q=מפי%205%20נתניה&navigate=yes",
  googleMapsHref: "https://www.google.com/maps/search/?api=1&query=מפי+5+נתניה",
  // ⚠️ TODO(client): חשבון האינסטגרם הרשמי.
  // מחקר העלה מועמד לא-מאומת: instagram.com/lopera_netanya (ייתכן ואינו הסניף/העסק המדויק) — יש לאמת מול הלקוח לפני פרסום.
  instagramHref: "https://instagram.com/",
  email: null as string | null, // ⚠️ TODO(client)
};

export const eventsConfig = {
  // אזור אירועים אופציונלי — ניתן לכבות עד לאישור סופי מהלקוח על השירות
  enabled: true,
  // ⚠️ TODO(client): קיבולת מקסימלית, סוגי אירועים נתמכים, ומדיניות הזמנה סופית — לאישור לפני פרסום
};

export const navLinks = [
  { href: "/kinuchei-perot", label: "קינוחי פירות" },
  { href: "/tafrit", label: "תפריט" },
  { href: "/aruchot-boker", label: "ארוחות בוקר" },
  { href: "/odot", label: "אודות" },
  { href: "/tzor-kesher", label: "צור קשר" },
];

export const footerLinks = [
  { href: "/kinuchei-perot", label: "קינוחי פירות" },
  { href: "/tafrit", label: "תפריט" },
  { href: "/aruchot-boker", label: "ארוחות בוקר" },
  { href: "/pizza", label: "פיצה מהטאבון" },
  { href: "/odot", label: "אודות" },
  { href: "/eruim", label: "אירועים" },
  { href: "/tzor-kesher", label: "צור קשר והגעה" },
];

export const hero = {
  eyebrow: "Opera Café Patisserie",
  title: "קינוחי פירות ופטיסרי בנתניה",
  paragraph:
    "הכירו את אופרה — בית קפה־פטיסרי עם קינוחים בעבודת יד, בייקרי טרי, ארוחות בוקר ופיצה נפוליטנית מהטאבון.",
  ctaPrimary: { label: "גלו את קינוחי הפירות", href: "/kinuchei-perot" },
  ctaSecondary: { label: "הזמינו שולחן", href: "#reservation-todo" },
  trustLine: `${business.kosher} | ${business.address.full} | ${business.phone}`,
};

/**
 * שמות הקינוחים כאן הם דמה בלבד (Mango / Strawberry / Lemon / Raspberry).
 * ⚠️ TODO(client): להחליף בשמות המוצרים האמיתיים ובתיאורים/רכיבים המדויקים.
 */
export const fruitDesserts: MenuItem[] = [
  {
    id: "mango",
    name: "מנגו",
    isPlaceholderName: true,
    description: "מוס מנגו עדין על בסיס פריך, שכבת קרם ולב פרי חמצמץ.",
    ingredients: ["מנגו", "מוס פירות", "קרם", "בסיס פריך"],
    category: "fruit-desserts",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "קינוח מנגו בעבודת יד — תמונת placeholder להחלפה",
    seasonal: true,
  },
  {
    id: "strawberry",
    name: "תות",
    isPlaceholderName: true,
    description: "שכבות תות טרי, קרם וניל עדין וקראנץ' שקדים.",
    ingredients: ["תות", "קרם וניל", "קראנץ' שקדים", "בסיס פריך"],
    category: "fruit-desserts",
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "קינוח תות בעבודת יד — תמונת placeholder להחלפה",
  },
  {
    id: "lemon",
    name: "לימון",
    isPlaceholderName: true,
    description: "קרם לימון חמצמץ, מרנג קליל ובסיס פריך חמאתי.",
    ingredients: ["לימון", "קרם הדר", "מרנג", "בסיס פריך"],
    category: "fruit-desserts",
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "קינוח לימון בעבודת יד — תמונת placeholder להחלפה",
  },
  {
    id: "raspberry",
    name: "פטל",
    isPlaceholderName: true,
    description: "מוס פטל עדין, ליבת פרי חמצמצה ושכבת קראנץ' דקה.",
    ingredients: ["פטל", "מוס פירות", "ליבת פרי", "קראנץ'"],
    category: "fruit-desserts",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "קינוח פטל בעבודת יד — תמונת placeholder להחלפה",
    seasonal: true,
  },
];

export const experienceCards = [
  {
    id: "patisserie",
    title: "פטיסרי",
    description: "יצירות בעבודת יד, שכבות מדויקות וטעמים שלא שוכחים.",
    href: "/kinuchei-perot",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "פטיסרי בעבודת יד — תמונת placeholder להחלפה",
  },
  {
    id: "bakery",
    title: "בייקרי",
    description: "מאפים מתוקים ומלוחים שיוצאים טריים מדי יום.",
    href: "/aruchot-boker",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "מאפים טריים מהבייקרי — תמונת placeholder להחלפה",
  },
  {
    id: "pizza",
    title: "מהטאבון",
    description: "פיצה נפוליטנית שמגיעה חמה ישר לשולחן.",
    href: "/pizza",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=75",
    imageAlt: "פיצה נפוליטנית מהטאבון — תמונת placeholder להחלפה",
  },
];

export const breakfastSection = {
  title: "ככה הבוקר אמור להיראות",
  paragraph:
    "קפה טוב, מאפים טריים, מנות בוקר ושולחן שמזמין להישאר עוד קצת.",
  image:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=75",
  imageAlt: "שולחן ארוחת בוקר עשיר — תמונת placeholder להחלפה",
  cta: { label: "לתפריט הבוקר", href: "/aruchot-boker" },
  // ⚠️ TODO(client): להחליף בשמות מנות, תיאורים ומחירים אמיתיים מהתפריט בפועל.
  // הפריטים כרגע הם קטגוריות כלליות וסבירות (לא שמות מנה ספציפיים בדויים).
  items: [
    { name: "מאפים טריים מהתנור", description: "קרואסונים ומאפים מתוקים ומלוחים, נאפים כל בוקר." },
    { name: "ביצים בסגנון הבית", description: "מוגשות עם לחם טרי ותוספות לבחירה." },
    { name: "סלט ירקות עונתי", description: "ירקות טריים לצד גבינות ולחמים מהבית." },
  ],
};

export const pizzaSection = {
  title: "מהטאבון ישר לשולחן",
  paragraph: "פיצה נפוליטנית, בצק אוורירי ותפריט חלבי שנועד לחלוק.",
  image:
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1600&q=75",
  imageAlt: "פיצה נפוליטנית מהטאבון — תמונת placeholder להחלפה",
  cta: { label: "לתפריט המלוח", href: "/tafrit" },
};

export const atmosphereSection = {
  title: "באים בשביל האוכל. נשארים בשביל האווירה.",
  paragraph:
    "בוקר עם חברה, ארוחה משפחתית, דייט מתוק או רגע קטן באמצע היום.",
};

export const galleryImages: GalleryImage[] = [
  {
    id: "interior-1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70",
    alt: "חלל בית הקפה — תמונת placeholder להחלפה",
    category: "interior",
  },
  {
    id: "desserts-1",
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=70",
    alt: "הגשת קינוחים — תמונת placeholder להחלפה",
    category: "desserts",
  },
  {
    id: "breakfast-1",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=70",
    alt: "שולחן ארוחת בוקר — תמונת placeholder להחלפה",
    category: "breakfast",
  },
  {
    id: "pizza-1",
    src: "https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?auto=format&fit=crop&w=1200&q=70",
    alt: "הכנת פיצה בטאבון — תמונת placeholder להחלפה",
    category: "pizza",
  },
  {
    id: "hands-1",
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1200&q=70",
    alt: "ידיים בעבודת פטיסרי — תמונת placeholder להחלפה",
    category: "hands",
  },
  {
    id: "interior-2",
    src: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=1200&q=70",
    alt: "פינת ישיבה בבית הקפה — תמונת placeholder להחלפה",
    category: "interior",
  },
];

/**
 * נתוני mock בלבד לצורך תצוגת גריד בהשראת אינסטגרם.
 * לא נשלפת כרגע אינפורמציה אמיתית מה-API של אינסטגרם.
 */
export const instagramMock: InstagramPost[] = [
  {
    id: "ig-1",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=60",
    alt: "פוסט לדוגמה — קינוח פירות",
    likes: "1,204",
    caption: "קינוח היום 🍓",
  },
  {
    id: "ig-2",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=60",
    alt: "פוסט לדוגמה — קרואסונים טריים",
    likes: "982",
    caption: "בוקר טוב מהבייקרי",
  },
  {
    id: "ig-3",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=60",
    alt: "פוסט לדוגמה — פיצה מהטאבון",
    likes: "1,530",
    caption: "ישר מהטאבון",
  },
  {
    id: "ig-4",
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=600&q=60",
    alt: "פוסט לדוגמה — קינוח תות",
    likes: "2,011",
    caption: "אי אפשר בלי לצלם",
  },
  {
    id: "ig-5",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60",
    alt: "פוסט לדוגמה — שולחן ארוחת בוקר",
    likes: "874",
    caption: "בוקר עם חברות",
  },
  {
    id: "ig-6",
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=60",
    alt: "פוסט לדוגמה — קינוח לימון",
    likes: "1,145",
    caption: "חמצמץ ומושלם",
  },
];

export const aboutSection = {
  title: "פטיסרי שנולד כדי להפוך כל ביקור לחוויה",
  // ⚠️ TODO(client): טקסט כללי ומכובד, לא ממציא עובדות ספציפיות. להחליף בסיפור המותג האמיתי לאחר קבלתו.
  paragraphs: [
    "אופרה נולדה מתוך אהבה לפטיסרי מדויק ולקינוחי פירות שמשלבים טעם, מרקם ומראה בלתי נשכח.",
    "כל קינוח נולד מתשומת לב לפרטים הקטנים ומחיפוש מתמיד אחר האיזון המושלם בין פרי, קרם ופריכות.",
  ],
  factsNeeded: [
    "⚠️ TODO(client): מי הקים את המקום",
    "⚠️ TODO(client): מי אחראי על הפטיסרי (שם השף/ית)",
    "⚠️ TODO(client): מה מיוצר במקום בדיוק",
    "⚠️ TODO(client): מה מקור השם Opera",
    "⚠️ TODO(client): כיצד נולדה קולקציית קינוחי הפירות",
  ],
};

export const eventsSection = {
  title: "חוגגים באופרה",
  paragraph:
    "אירועים משפחתיים ורגעים מיוחדים באווירה מעוצבת ועם תפריט חלבי.",
  internalNote:
    "⚠️ הערה פנימית: השירות, הקיבולת המקסימלית ונוסח העמוד חייבים אישור מהלקוח לפני פרסום פומבי.",
};

export const contactSection = {
  title: "מחכים לכם באופרה",
  details: [
    business.address.full,
    business.phone,
    business.neighborhood,
  ],
};

export const seo = {
  siteName: "Opera Café Patisserie | אופרה נתניה",
  // ⚠️ TODO(client): להחליף בדומיין הסופי לפני עלייה לאוויר
  baseUrl: "https://opera-netanya.co.il",
  // ⚠️ TODO(client): להחליף בתמונת OG רשמית מקומית (public/images/desserts/...) לאחר קבלת צילום אמיתי
  defaultOgImage:
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=75",
  pages: {
    home: {
      title: "אופרה נתניה | פטיסרי, קינוחי פירות ובית קפה כשר",
      description:
        "אופרה היא בית קפה־פטיסרי בנתניה עם קינוחי פירות, בייקרי טרי, ארוחות בוקר, פיצה נפוליטנית מהטאבון ותפריט חלבי כשר. צפו בתפריט והזמינו מקום.",
      h1: "קינוחי פירות ופטיסרי בנתניה",
    },
    fruitDesserts: {
      title: "קינוחי פירות בנתניה | קולקציית הפטיסרי של אופרה",
      description:
        "קולקציית קינוחי הפירות של אופרה נתניה — פטיסרי בעבודת יד עם שכבות מפתיעות ומראה שאי אפשר להתעלם ממנו.",
      h1: "קולקציית קינוחי הפירות של אופרה",
    },
    menu: {
      title: "תפריט אופרה נתניה | בית קפה־פטיסרי כשר",
      description:
        "התפריט המלא של אופרה נתניה: קינוחי פירות, פטיסרי, בייקרי, ארוחות בוקר, פיצה נפוליטנית ותפריט חלבי.",
      h1: "התפריט של אופרה",
    },
    breakfast: {
      title: "ארוחת בוקר בנתניה | תפריט הבוקר של אופרה",
      description:
        "ארוחת בוקר בנתניה באווירה מעוצבת — קפה, מאפים טריים ומנות בוקר באופרה, בית הקפה־פטיסרי של נתניה.",
      h1: "ארוחת בוקר בנתניה",
    },
    pizza: {
      title: "פיצה נפוליטנית בנתניה | פיצה מהטאבון באופרה",
      description:
        "פיצה נפוליטנית מהטאבון בנתניה, בתפריט חלבי שנועד לחלוק — באופרה, בית הקפה־פטיסרי של נתניה.",
      h1: "פיצה נפוליטנית מהטאבון בנתניה",
    },
    about: {
      title: "אודות אופרה | פטיסרי וקינוחי פירות בנתניה",
      description:
        "הכירו את אופרה — בית קפה־פטיסרי בנתניה שהפך את קינוחי הפירות והפטיסרי בעבודת יד לחוויה.",
      h1: "אודות אופרה",
    },
    events: {
      title: "אירועים קטנים בנתניה | אירוע חלבי באופרה",
      description:
        "אירועים משפחתיים ורגעים מיוחדים באווירה מעוצבת ועם תפריט חלבי, באופרה נתניה.",
      h1: "חוגגים באופרה",
    },
    contact: {
      title: "יצירת קשר והגעה | אופרה נתניה",
      description:
        "פרטי הגעה, ניווט והזמנת שולחן באופרה — בית הקפה־פטיסרי והמסעדה החלבית של נתניה, אזור פולג.",
      h1: "מחכים לכם באופרה",
    },
  },
  keywords: [
    "אופרה נתניה",
    "פטיסרי בנתניה",
    "קינוחים בנתניה",
    "קינוחי פירות בנתניה",
    "בית קפה בנתניה",
    "בית קפה כשר בנתניה",
    "מסעדה חלבית בנתניה",
    "ארוחת בוקר בנתניה",
    "פיצה נפוליטנית בנתניה",
    "בית קפה באזור פולג",
  ],
};
