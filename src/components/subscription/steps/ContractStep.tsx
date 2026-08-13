"use client";

const stages = [
  { title: "تجهيز العقد", desc: "نجهّز عقد اشتراك ورقي ببياناتك والخطة المختارة." },
  { title: "تسليم العقد", desc: "يصل مندوبنا إلى عنوانك لتسليم العقد." },
  { title: "التوقيع", desc: "توقّع العقد لاعتماد شروط الاشتراك." },
  { title: "الاستلام والمراجعة", desc: "نستلم العقد الموقّع ونراجعه للاعتماد." },
  { title: "التفعيل", desc: "بعد الاعتماد يصبح اشتراكك نشطاً وتبدأ غسلاتك." },
];

export function ContractStep() {
  return (
    <div>
      <h2 className="text-h3 text-text-primary">كيف يتم تفعيل الاشتراك</h2>
      <p className="mt-2 text-body-sm text-text-secondary">
        الاشتراك لا يُفعّل فور الطلب. يمر بالخطوات التالية حتى يصبح نشطاً:
      </p>

      <ol className="mt-6 space-y-4">
        {stages.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-body-sm font-semibold text-brand-primary">
              <span className="numeric">{i + 1}</span>
            </span>
            <div className="pt-0.5">
              <p className="text-body font-semibold text-text-primary">{s.title}</p>
              <p className="mt-0.5 text-body-sm text-text-secondary">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 rounded-md bg-surface-tint px-4 py-3 text-caption text-text-secondary">
        سنبقيك على اطلاع بحالة طلبك في كل مرحلة حتى التفعيل.
      </p>
    </div>
  );
}
