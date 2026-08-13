"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "@/features/bookings/types/form";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

export function ScheduleStep() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<BookingFormData>();
  const type = watch("type");

  return (
    <div>
      <h2 className="text-h3 text-text-primary">الموقع والموعد</h2>
      <p className="mt-2 text-body-sm text-text-secondary">أين ومتى نصل إليك؟</p>

      {/* Timing */}
      <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="التوقيت">
        {([
          { v: "now", title: "الآن", desc: "يصل الفني خلال 60 دقيقة" },
          { v: "scheduled", title: "موعد لاحق", desc: "اختر التاريخ والوقت" },
        ] as const).map((opt) => {
          const active = type === opt.v;
          return (
            <button
              key={opt.v}
              type="button"
              role="radio"
              aria-checked={active}
              data-cursor="button"
              onClick={() => setValue("type", opt.v, { shouldTouch: true })}
              className={cn(
                "rounded-lg border p-4 text-start transition-all duration-200",
                active ? "border-brand-primary bg-brand-primary/5" : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <p className="text-body font-semibold text-text-primary">{opt.title}</p>
              <p className="mt-1 text-caption text-text-secondary">{opt.desc}</p>
            </button>
          );
        })}
      </div>

      {type === "scheduled" && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="التاريخ" htmlFor="b-date" error={errors.date?.message} required>
            <Input id="b-date" type="date" className="numeric" invalid={!!errors.date} {...register("date")} />
          </Field>
          <Field label="الوقت" htmlFor="b-time" error={errors.time?.message}>
            <Input id="b-time" type="time" className="numeric" {...register("time")} />
          </Field>
        </div>
      )}

      {/* Location */}
      <div className="mt-6 grid gap-4">
        <Field label="العنوان" htmlFor="b-address" error={errors.location?.addressLine?.message} required>
          <Input id="b-address" placeholder="الحي، الشارع، رقم المبنى" invalid={!!errors.location?.addressLine} {...register("location.addressLine")} />
        </Field>
        <Field label="المدينة" htmlFor="b-city" error={errors.location?.city?.message} required>
          <Input id="b-city" placeholder="المدينة" invalid={!!errors.location?.city} {...register("location.city")} />
        </Field>
        <Field label="ملاحظات للوصول (اختياري)" htmlFor="b-notes" hint="مثال: بوابة رقم 2، الدور الأرضي">
          <Textarea id="b-notes" placeholder="أي تفاصيل تساعد الفني على الوصول" {...register("location.notes")} />
        </Field>
      </div>

      <p className="mt-4 rounded-md bg-surface-tint px-4 py-3 text-caption text-text-secondary">
        سنؤكد توفر الخدمة في منطقتك قبل تنفيذ الطلب.
      </p>
    </div>
  );
}
