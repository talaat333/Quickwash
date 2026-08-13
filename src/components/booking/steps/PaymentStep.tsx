"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "@/features/bookings/types/form";
import type { Service } from "@/types/domain";
import { formatEGP, cn } from "@/lib/utils";

const methods = [
  { v: "cash", title: "الدفع نقداً", desc: "ادفع للفني عند تنفيذ الخدمة" },
  { v: "card", title: "الدفع بالبطاقة", desc: "دفع إلكتروني آمن عبر بوابة الدفع" },
] as const;

export function PaymentStep({ service }: { service?: Service }) {
  const { watch, setValue, formState: { errors } } = useFormContext<BookingFormData>();
  const selected = watch("paymentMethod");

  return (
    <div>
      <h2 className="text-h3 text-text-primary">طريقة الدفع</h2>
      <p className="mt-2 text-body-sm text-text-secondary">اختر الطريقة الأنسب لك.</p>

      <div className="mt-6 grid gap-3" role="radiogroup" aria-label="طريقة الدفع">
        {methods.map((m) => {
          const active = selected === m.v;
          return (
            <button
              key={m.v}
              type="button"
              role="radio"
              aria-checked={active}
              data-cursor="button"
              onClick={() => setValue("paymentMethod", m.v, { shouldValidate: true, shouldTouch: true })}
              className={cn(
                "flex items-center gap-4 rounded-lg border p-5 text-start transition-all duration-200",
                active ? "border-brand-primary bg-brand-primary/5" : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full", active ? "bg-brand-primary text-text-on-brand" : "bg-surface-muted text-text-secondary")}>
                {m.v === "cash" ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                )}
              </span>
              <div>
                <p className="text-body font-semibold text-text-primary">{m.title}</p>
                <p className="mt-0.5 text-caption text-text-secondary">{m.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {errors.paymentMethod && (
        <p role="alert" className="mt-3 text-caption text-error">{errors.paymentMethod.message}</p>
      )}

      {selected === "card" && (
        <p className="mt-4 rounded-md bg-surface-tint px-4 py-3 text-caption text-text-secondary">
          سيتم توجيهك لإتمام الدفع بشكل آمن عبر بوابة الدفع بعد تأكيد الطلب. لا نحتفظ ببيانات بطاقتك.
        </p>
      )}

      {service && (
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-body-sm text-text-secondary">الإجمالي التقديري</span>
          <span className="text-h4 text-text-primary">
            <span className="numeric">{formatEGP(service.startingPrice)}</span>
            <span className="ms-1 text-body-sm text-text-secondary">ج.م</span>
          </span>
        </div>
      )}
    </div>
  );
}
