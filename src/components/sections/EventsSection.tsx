"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import { eventsSection } from "@/data/siteContent";

type Status = "idle" | "submitting" | "success" | "error";

interface EventsSectionProps {
  headingLevel?: "h1" | "h2";
}

export default function EventsSection({ headingLevel = "h2" }: EventsSectionProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/events", {
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
    <section className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
      <SectionHeading
        as={headingLevel}
        title={eventsSection.title}
        paragraph={eventsSection.paragraph}
        align="center"
      />

      {/* eventsSection.internalNote (src/data/siteContent.ts) — הערה פנימית לצוות/לקוח בלבד, לא מוצגת למבקרי האתר */}

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
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
          סוג אירוע
          <input
            type="text"
            name="eventType"
            required
            placeholder="יום הולדת, מפגש משפחתי..."
            className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          מספר אורחים
          <input
            type="number"
            min={1}
            name="guests"
            className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
          תאריך רצוי
          <input
            type="date"
            name="date"
            className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
          הערה
          <textarea
            name="note"
            rows={4}
            className="rounded-lg border border-line bg-warm-white px-4 py-3 text-ink outline-none focus-visible:border-gold"
          />
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-warm-white transition-colors hover:bg-charcoal-soft disabled:opacity-60 sm:col-span-2"
        >
          {status === "submitting" ? "שולח..." : "שליחת פנייה"}
        </button>

        <div role="status" aria-live="polite" className="sm:col-span-2">
          {status === "success" && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
              הפנייה התקבלה! ניצור קשר בהקדם לתיאום האירוע.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              משהו השתבש בשליחה. אפשר לנסות שוב או להתקשר אלינו ישירות.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
