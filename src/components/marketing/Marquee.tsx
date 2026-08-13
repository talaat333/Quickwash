const items = [
  "بدون ماء",
  "يصل إليك أينما كنت",
  "وصول خلال 60 دقيقة",
  "تلميع احترافي",
  "منتجات آمنة على الطلاء",
  "فريق مدرّب",
  "خطط اشتراك مرنة",
  "توفير المياه",
];

function Dot() {
  return <span className="mx-6 inline-block h-1.5 w-1.5 rounded-full bg-brand-secondary align-middle" />;
}

/** Infinite horizontal marquee. Two copies for a seamless loop; static on reduced motion. */
export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap text-body-sm font-medium text-text-secondary">
          {t}
          <Dot />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-surface/60 py-4">
      <div className="flex animate-marquee">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
