import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  phone?: string;
  message?: string;
  honeypot?: string;
}

/**
 * Mock API route ליצירת קשר.
 * ⚠️ TODO: לחבר לשירות שליחה אמיתי (Formspree / Resend / CRM פנימי) לפני עלייה לאוויר.
 * כרגע רק מוודא תקינות בסיסית ומחזיר תגובת הצלחה, ללא שליחת הודעה בפועל.
 */
export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (body.honeypot) {
    // בוט כנראה מילא את השדה המוסתר — מחזירים "הצלחה" מזויפת בלי לעבד כלום
    return NextResponse.json({ ok: true });
  }

  if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
