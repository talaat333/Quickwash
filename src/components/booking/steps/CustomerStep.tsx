"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "@/features/bookings/types/form";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

export function CustomerStep() {
  const { register, formState: { errors } } = useFormContext<BookingFormData>();
  return (
    <div>
      <h2 className="text-h3 text-text-primary">بياناتك</h2>
      <p className="mt-2 text-body-sm text-text-secondary">لنتواصل معك ونؤكد موعد الخدمة.</p>

      <div className="mt-6 grid gap-4">
        <Field label="الاسم الكامل" htmlFor="cu-name" error={errors.customer?.fullName?.message} required>
          <Input id="cu-name" placeholder="اسمك الكامل" invalid={!!errors.customer?.fullName} {...register("customer.fullName")} />
        </Field>
        <Field label="رقم الهاتف" htmlFor="cu-phone" error={errors.customer?.phone?.message} required>
          <Input id="cu-phone" inputMode="tel" placeholder="01xxxxxxxxx" className="numeric text-start" invalid={!!errors.customer?.phone} {...register("customer.phone")} />
        </Field>
        <Field label="البريد الإلكتروني (اختياري)" htmlFor="cu-email" error={errors.customer?.email?.message}>
          <Input id="cu-email" type="email" placeholder="you@example.com" className="text-start" invalid={!!errors.customer?.email} {...register("customer.email")} />
        </Field>
      </div>
    </div>
  );
}
