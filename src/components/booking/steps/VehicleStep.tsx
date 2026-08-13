"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "@/features/bookings/types/form";
import type { Service } from "@/types/domain";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { UploadField } from "@/components/ui/UploadField";

const vehicleTypes = ["سيدان", "دفع رباعي / SUV", "هاتشباك", "بيك أب", "أخرى"];

export function VehicleStep({ service }: { service?: Service }) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<BookingFormData>();
  const requiresPhotos = service?.requiresPhotos ?? false;
  const front = watch("vehicle.frontPhotoUrl");
  const rear = watch("vehicle.rearPhotoUrl");

  return (
    <div>
      <h2 className="text-h3 text-text-primary">بيانات السيارة</h2>
      <p className="mt-2 text-body-sm text-text-secondary">تساعدنا هذه التفاصيل على تجهيز الأدوات المناسبة.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="الماركة" htmlFor="v-brand" error={errors.vehicle?.brand?.message} required>
          <Input id="v-brand" placeholder="مثال: تويوتا" invalid={!!errors.vehicle?.brand} {...register("vehicle.brand")} />
        </Field>
        <Field label="الموديل" htmlFor="v-model" error={errors.vehicle?.model?.message} required>
          <Input id="v-model" placeholder="مثال: كورولا" invalid={!!errors.vehicle?.model} {...register("vehicle.model")} />
        </Field>
        <Field label="نوع السيارة" htmlFor="v-type" error={errors.vehicle?.bodyType?.message} required>
          <Select id="v-type" invalid={!!errors.vehicle?.bodyType} defaultValue="" {...register("vehicle.bodyType")}>
            <option value="" disabled>اختر النوع</option>
            {vehicleTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="سنة الصنع" htmlFor="v-year" error={errors.vehicle?.year?.message} required>
          <Input id="v-year" inputMode="numeric" placeholder="مثال: 2021" className="numeric text-start" invalid={!!errors.vehicle?.year} {...register("vehicle.year")} />
        </Field>
        <Field label="رقم اللوحة" htmlFor="v-plate" error={errors.vehicle?.plateNumber?.message} required className="sm:col-span-2">
          <Input id="v-plate" placeholder="أدخل رقم لوحة السيارة" invalid={!!errors.vehicle?.plateNumber} {...register("vehicle.plateNumber")} />
        </Field>
      </div>

      {requiresPhotos && (
        <div className="mt-6">
          <p className="mb-3 text-body-sm text-text-secondary">
            صور السيارة تساعد الفني على تقييم الحالة قبل الوصول.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <UploadField
              label="صورة أمامية"
              value={front}
              onChange={(url) => setValue("vehicle.frontPhotoUrl", url ?? "", { shouldTouch: true })}
            />
            <UploadField
              label="صورة خلفية"
              value={rear}
              onChange={(url) => setValue("vehicle.rearPhotoUrl", url ?? "", { shouldTouch: true })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
