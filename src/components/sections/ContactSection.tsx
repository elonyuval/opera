"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Navigation, Phone, MessageCircle, CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { business, contactSection } from "@/data/siteContent";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [mapLoaded, setMapLoaded] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
      <SectionHeading as="h1" title={contactSection.title} align="center" />

      <div className="mt-6 flex flex-col items-center gap-2 text-ink-soft">
        {contactSection.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <PrimaryButton href={business.wazeHref} variant="secondary" external>
          <Navigation size={18} aria-hidden />
          ניווט ב-Waze
        </PrimaryButton>
        <PrimaryButton href={business.googleMapsHref} variant="secondary" external>
          <MapPin size={18} aria-hidden />
          פתיחה ב-Google Maps
        </PrimaryButton>
        <PrimaryButton href={business.phoneHref} variant="secondary" external>
          <Phone size={18} aria-hidden />
          התקשרו עכשיו
        </PrimaryButton>
        <PrimaryButton href={business.whatsappHref} variant="secondary" external>
          <MessageCircle size={18} aria-hidden />
          WhatsApp
        </PrimaryButton>
        <PrimaryButton href={business.reservationHref}>
          <CalendarCheck size={18} aria-hidden />
          הזמנת שולחן
        </PrimaryButton>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-cream-dark">
          {mapLoaded ? (
            <iframe
              title="מפה — Opera Café Patisserie"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                business.address.full
              )}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <button
              type="button"
              onClick={() => setMapLoaded(true)}
              className="flex flex-col items-center gap-3 p-8 text-center"
            >
              <MapPin size={32} className="text-gold" aria-hidden />
              <span className="font-semibold text-ink">טעינת המפה</span>
              <span className="text-sm text-ink-soft">
                לחיצה כאן תטען מפה אינטראקטיבית (נטענת רק לפי דרישה, לשיפור מהירות האתר)
              </span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            שם מלא
            <input
              type="text"
              name="name"
              required
              className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            טלפון
            <input
              type="tel"
              name="phone"
              required
              className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            הודעה
            <textarea
              name="message"
              rows={4}
              required
              className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-warm-white transition-colors hover:bg-charcoal-soft disabled:opacity-60"
          >
            {status === "submitting" ? "שולח..." : "שליחה"}
          </button>

          <div role="status" aria-live="polite">
            {status === "success" && (
              <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                משהו השתבש בשליחה. אפשר לנסות שוב או להתקשר אלינו ישירות.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
