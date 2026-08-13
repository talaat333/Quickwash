"use client";

import { useFormContext } from "react-hook-form";
import type { SubscriptionFormData } from "@/features/subscriptions/types/form";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function DeliveryAddressStep() {
  const { register, formState: { errors } } = useFormContext<SubscriptionFormData>();
  return (
    <div>
      <h2 className="text-h3 text-text-primary">عنوان تسليم العقد</h2>
      <p className="mt-2 text-body-sm text-text-secondary">
        نسلّم عقد الاشتراك الورقي إلى هذا العنوان لتوقيعه.
      </p>
      <div className="mt-6 grid gap-4">
        <Field label="العنوان" htmlFor="s-address" error={errors.deliveryAddress?.addressLine?.message} required>
          <Input id="s-address" placeholder="الحي، الشارع، رقم المبنى" invalid={!!errors.deliveryAddress?.addressLine} {...register("deliveryAddress.addressLine")} />
        </Field>
        <Field label="المدينة" htmlFor="s-city" error={errors.deliveryAddress?.city?.message} required>
          <Input id="s-city" placeholder="المدينة" invalid={!!errors.deliveryAddress?.city} {...register("deliveryAddress.city")} />
        </Field>
        <Field label="ملاحظات (اختياري)" htmlFor="s-notes">
          <Textarea id="s-notes" placeholder="أي تفاصيل تساعد المندوب على الوصول" {...register("deliveryAddress.notes")} />
        </Field>
      </div>
    </div>
  );
}
