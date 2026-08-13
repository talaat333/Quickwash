import { z } from "zod";

const phoneRegex = /^\+?[0-9\s-]{8,15}$/;
const currentYear = new Date().getFullYear();

export const serviceStepSchema = z.object({
  serviceId: z.enum(["full", "exterior", "interior", "engine"], {
    errorMap: () => ({ message: "اختر خدمة" }),
  }),
});

export const scheduleStepSchema = z
  .object({
    type: z.enum(["now", "scheduled"]),
    date: z.string().optional(),
    time: z.string().optional(),
    location: z.object({
      addressLine: z.string().min(3, "أدخل العنوان"),
      city: z.string().min(2, "أدخل المدينة"),
      notes: z.string().optional(),
    }),
  })
  .refine((v) => v.type === "now" || (!!v.date && !!v.time), {
    message: "حدد التاريخ والوقت",
    path: ["date"],
  });

export const vehicleStepSchema = z.object({
  brand: z.string().min(1, "أدخل الماركة"),
  model: z.string().min(1, "أدخل الموديل"),
  type: z.string().min(1, "اختر نوع السيارة"),
  year: z.coerce
    .number()
    .int()
    .min(1980, "سنة غير صحيحة")
    .max(currentYear + 1, "سنة غير صحيحة"),
  plateNumber: z.string().min(1, "أدخل رقم اللوحة"),
  frontPhotoUrl: z.string().optional(),
  rearPhotoUrl: z.string().optional(),
});

export const customerStepSchema = z.object({
  fullName: z.string().min(2, "أدخل الاسم الكامل"),
  phone: z.string().regex(phoneRegex, "رقم هاتف غير صحيح"),
  email: z.string().email("بريد إلكتروني غير صحيح").optional().or(z.literal("")),
});

export const paymentStepSchema = z.object({
  paymentMethod: z.enum(["cash", "card"], {
    errorMap: () => ({ message: "اختر طريقة الدفع" }),
  }),
});

/** Full booking model assembled across steps. */
export const bookingSchema = z.object({
  service: serviceStepSchema,
  schedule: scheduleStepSchema,
  vehicle: vehicleStepSchema.optional(),
  customer: customerStepSchema,
  payment: paymentStepSchema,
});

export type ServiceStepValues = z.infer<typeof serviceStepSchema>;
export type ScheduleStepValues = z.infer<typeof scheduleStepSchema>;
export type VehicleStepValues = z.infer<typeof vehicleStepSchema>;
export type CustomerStepValues = z.infer<typeof customerStepSchema>;
export type PaymentStepValues = z.infer<typeof paymentStepSchema>;
export type BookingFormValues = z.infer<typeof bookingSchema>;
