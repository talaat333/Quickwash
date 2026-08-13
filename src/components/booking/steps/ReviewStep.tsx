"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "@/features/bookings/types/form";
import type { Service } from "@/types/domain";
import { formatEGP, formatDuration } from "@/lib/utils";

function Row({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <dt className="text-caption text-text-muted">{label}</dt>
        <dd className="mt-0.5 text-body-sm text-text-primary">{value}</dd>
      </div>
      {onEdit && (
        <button type="button" onClick={onEdit} className="shrink-0 text-caption text-brand-primary underline" data-cursor="button">
          تعديل
        </button>
      )}
    </div>
  );
}

export function ReviewStep({ service, onEdit }: { service?: Service; onEdit: (step: number) => void }) {
  const { getValues } = useFormContext<BookingFormData>();
  const v = getValues();

  const timing = v.type === "now" ? "الآن (خلال 60 دقيقة)" : `${v.date} ${v.time}`.trim();

  return (
    <div>
      <h2 className="text-h3 text-text-primary">مراجعة الطلب</h2>
      <p className="mt-2 text-body-sm text-text-secondary">تأكد من صحة التفاصيل قبل التأكيد.</p>

      <dl className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface px-5">
        <Row label="الخدمة" value={service?.name ?? "—"} onEdit={() => onEdit(0)} />
        <Row label="التوقيت" value={timing} onEdit={() => onEdit(1)} />
        <Row label="العنوان" value={`${v.location.addressLine}، ${v.location.city}`} onEdit={() => onEdit(1)} />
        <Row label="السيارة" value={`${v.vehicle.brand} ${v.vehicle.model} • ${v.vehicle.year}`} onEdit={() => onEdit(2)} />
        <Row label="مقدّم الطلب" value={`${v.customer.fullName} • ${v.customer.phone}`} onEdit={() => onEdit(3)} />
      </dl>

      {service && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-surface-tint px-5 py-4">
          <div>
            <p className="text-body-sm text-text-secondary">الإجمالي التقديري</p>
            <p className="text-caption text-text-muted">{formatDuration(service.durationMinutes)}</p>
          </div>
          <p className="text-h3 text-text-primary">
            <span className="numeric">{formatEGP(service.startingPrice)}</span>
            <span className="ms-1 text-body-sm text-text-secondary">ج.م</span>
          </p>
        </div>
      )}
      <p className="mt-3 text-caption text-text-muted">
        السعر النهائي يُحتسب ويُؤكَّد من قبل الفريق حسب حالة السيارة قبل بدء الخدمة.
      </p>
    </div>
  );
}
