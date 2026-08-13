"use client";

import { useFormContext } from "react-hook-form";
import type { SubscriptionFormData } from "@/features/subscriptions/types/form";
import type { SubscriptionPlan } from "@/types/domain";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatEGP } from "@/lib/utils";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-caption text-text-muted">{label}</dt>
      <dd className="text-end text-body-sm text-text-primary">{value}</dd>
    </div>
  );
}

export function SubReviewStep({ plan }: { plan?: SubscriptionPlan }) {
  const { getValues, register, formState: { errors } } = useFormContext<SubscriptionFormData>();
  const v = getValues();

  return (
    <div>
      <h2 className="text-h3 text-text-primary">مراجعة طلب الاشتراك</h2>
      <p className="mt-2 text-body-sm text-text-secondary">تأكد من التفاصيل ووافق على الشروط لإرسال الطلب.</p>

      <dl className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface px-5">
        <Row label="الخطة" value={plan?.name ?? "—"} />
        <Row label="القيمة الشهرية" value={plan ? `${formatEGP(plan.monthlyPrice)} ج.م` : "—"} />
        <Row label="عدد الغسلات" value={plan ? `${plan.washesPerMonth} شهرياً` : "—"} />
        <Row label="مقدّم الطلب" value={`${v.customer.fullName} • ${v.customer.phone}`} />
        <Row label="عنوان التسليم" value={`${v.deliveryAddress.addressLine}، ${v.deliveryAddress.city}`} />
      </dl>

      {plan && (
        <div className="mt-4 rounded-lg border border-border bg-surface-muted p-5">
          <p className="text-label uppercase tracking-widest text-text-muted">شروط الاشتراك</p>
          <ul className="mt-3 space-y-2">
            {plan.terms.map((t) => (
              <li key={t} className="flex items-start gap-2 text-body-sm text-text-secondary">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-primary" />
                {t}
              </li>
            ))}
            <li className="flex items-start gap-2 text-body-sm text-text-secondary">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-primary" />
              عند تجاوز عدد الغسلات المتاحة يمكن الحجز برسوم إضافية واضحة (<span className="numeric">{formatEGP(plan.overLimitPrice)}</span> ج.م للغسلة) وتظهر قبل التأكيد.
            </li>
          </ul>
        </div>
      )}

      <div className="mt-6">
        <Checkbox
          id="s-agree"
          label="قرأت ووافقت على شروط الاشتراك"
          {...register("agreedToTerms")}
        />
        {errors.agreedToTerms && (
          <p role="alert" className="mt-2 text-caption text-error">{errors.agreedToTerms.message}</p>
        )}
      </div>
    </div>
  );
}
