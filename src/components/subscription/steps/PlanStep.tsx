"use client";

import { useFormContext } from "react-hook-form";
import type { SubscriptionFormData } from "@/features/subscriptions/types/form";
import { subscriptionPlans } from "@/data/subscriptions";
import { formatEGP, cn } from "@/lib/utils";

export function PlanStep() {
  const { watch, setValue, formState: { errors } } = useFormContext<SubscriptionFormData>();
  const selected = watch("planId");

  return (
    <div>
      <h2 className="text-h3 text-text-primary">اختر خطة الاشتراك</h2>
      <p className="mt-2 text-body-sm text-text-secondary">خطط شهرية مرنة تناسب استخدامك.</p>

      <div className="mt-6 grid gap-3" role="radiogroup" aria-label="خطة الاشتراك">
        {subscriptionPlans.map((p) => {
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={active}
              data-cursor="button"
              onClick={() => setValue("planId", p.id, { shouldValidate: true, shouldTouch: true })}
              className={cn(
                "flex items-center justify-between gap-4 rounded-lg border p-5 text-start transition-all duration-200",
                active ? "border-brand-primary bg-brand-primary/5" : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-h4 text-text-primary">{p.name}</span>
                  {p.recommended && <span className="rounded-pill bg-brand-primary/10 px-2 py-0.5 text-caption text-brand-primary">الأكثر اختياراً</span>}
                </div>
                <p className="mt-1 text-body-sm text-text-secondary">
                  <span className="numeric">{p.washesPerMonth}</span> غسلات شهرياً • صلاحية {p.validity}
                </p>
              </div>
              <div className="shrink-0 text-end">
                <p className="text-h4 text-text-primary">
                  <span className="numeric">{formatEGP(p.monthlyPrice)}</span>
                  <span className="ms-1 text-caption text-text-secondary">ج.م</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {errors.planId && <p role="alert" className="mt-3 text-caption text-error">{errors.planId.message}</p>}
    </div>
  );
}
