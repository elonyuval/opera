import { NextResponse } from "next/server";

interface EventsPayload {
  name?: string;
  phone?: string;
  eventType?: string;
  guests?: string;
  date?: string;
  note?: string;
  honeypot?: string;
}

/**
 * Mock API route לפניות אירועים.
 * ⚠️ TODO: לחבר לשירות שליחה אמיתי (Formspree / Resend / CRM פנימי) לפני עלייה לאוויר.
 * השירות, הקיבולת המקסימלית והנוסח הסופי טעונים אישור מהלקוח (ראו EventsSection).
 */
export async function POST(request: Request) {
  let body: EventsPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name?.trim() || !body.phone?.trim() || !body.eventType?.trim()) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
