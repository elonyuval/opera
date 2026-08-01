interface ScrollTextStepProps {
  text: string;
  active: boolean;
  align?: "start" | "center";
}

export default function ScrollTextStep({ text, active, align = "center" }: ScrollTextStepProps) {
  return (
    <p
      aria-hidden={!active}
      className={`pointer-events-none absolute inset-x-0 bottom-[8%] mx-auto max-w-xl px-6 font-display text-2xl text-ink transition-all duration-700 ease-out md:text-3xl ${
        align === "center" ? "text-center" : "text-right"
      } ${active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      {text}
    </p>
  );
}
