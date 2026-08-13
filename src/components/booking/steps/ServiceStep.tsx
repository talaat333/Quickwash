"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "@/features/bookings/types/form";
import { services } from "@/data/services";
import { formatEGP, formatDuration, cn } from "@/lib/utils";

export function ServiceStep() {
  const { watch, setValue, formState } = useFormContext<BookingFormData>();
  const selected = watch("serviceId");

  return (
    <div>
      <h2 className="text-h3 text-text-primary">اختر الخدمة</h2>
      <p className="mt-2 text-body-sm text-text-secondary">حدد نوع العناية التي تريدها لسيارتك.</p>

      <div className="mt-6 grid gap-3" role="radiogroup" aria-label="الخدمة">
        {services.map((s) => {
          const active = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              data-cursor="button"
              onClick={() => setValue("serviceId", s.id, { shouldValidate: true, shouldTouch: true })}
              className={cn(
                "flex items-center justify-between gap-4 rounded-lg border p-5 text-start transition-all duration-200",
                active
                  ? "border-brand-primary bg-brand-primary/5 shadow-subtle"
                  : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-h4 text-text-primary">{s.name}</span>
                  {s.featured && (
                    <span className="rounded-pill bg-brand-primary/10 px-2 py-0.5 text-caption text-brand-primary">الأشمل</span>
                  )}
                </div>
                <p className="mt-1 text-body-sm text-text-secondary">{s.shortDescription}</p>
                <p className="mt-2 text-caption text-text-muted">{formatDuration(s.durationMinutes)}</p>
              </div>
              <div className="shrink-0 text-end">
                <span className="text-caption text-text-muted">من</span>
                <p className="text-h4 text-text-primary">
                  <span className="numeric">{formatEGP(s.startingPrice)}</span>
                  <span className="ms-1 text-caption text-text-secondary">ج.م</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {formState.errors.serviceId && (
        <p role="alert" className="mt-3 text-caption text-error">{formState.errors.serviceId.message}</p>
      )}
    </div>
  );
}
