"use client";

import { useFormContext } from "react-hook-form";
import type { SubscriptionFormData } from "@/features/subscriptions/types/form";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

export function SubCustomerStep() {
  const { register, formState: { errors } } = useFormContext<SubscriptionFormData>();
  return (
    <div>
      <h2 className="text-h3 text-text-primary">بياناتك</h2>
      <p className="mt-2 text-body-sm text-text-secondary">لنجهّز عقد الاشتراك ونتواصل معك.</p>
      <div className="mt-6 grid gap-4">
        <Field label="الاسم الكامل" htmlFor="s-name" error={errors.customer?.fullName?.message} required>
          <Input id="s-name" placeholder="اسمك الكامل" invalid={!!errors.customer?.fullName} {...register("customer.fullName")} />
        </Field>
        <Field label="رقم الهاتف" htmlFor="s-phone" error={errors.customer?.phone?.message} required>
          <Input id="s-phone" inputMode="tel" placeholder="01xxxxxxxxx" className="numeric text-start" invalid={!!errors.customer?.phone} {...register("customer.phone")} />
        </Field>
        <Field label="البريد الإلكتروني (اختياري)" htmlFor="s-email" error={errors.customer?.email?.message}>
          <Input id="s-email" type="email" placeholder="you@example.com" className="text-start" invalid={!!errors.customer?.email} {...register("customer.email")} />
        </Field>
      </div>
    </div>
  );
}
