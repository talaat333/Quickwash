export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
      <span className="sr-only">جارٍ التحميل…</span>
    </div>
  );
}
