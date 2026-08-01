export default function LoadingFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        <span className="text-xs font-medium tracking-wide text-ink-soft">
          טוען חוויית תלת-ממד…
        </span>
      </div>
    </div>
  );
}
