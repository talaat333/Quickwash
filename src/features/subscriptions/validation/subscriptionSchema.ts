import { z } from "zod";

const phoneRegex = /^\+?[0-9\s-]{8,15}$/;

export const planStepSchema = z.object({
  planId: z.string().min(1, "اختر خطة اشتراك"),
});

export const subCustomerStepSchema = z.object({
  fullName: z.string().min(2, "أدخل الاسم الكامل"),
  phone: z.string().regex(phoneRegex, "رقم هاتف غير صحيح"),
  email: z.string().email("بريد إلكتروني غير صحيح").optional().or(z.literal("")),
});

export const deliveryAddressStepSchema = z.object({
  addressLine: z.string().min(3, "أدخل العنوان"),
  city: z.string().min(2, "أدخل المدينة"),
  notes: z.string().optional(),
});

export const agreementStepSchema = z.object({
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: "يجب الموافقة على شروط الاشتراك للمتابعة" }),
  }),
});

export const subscriptionSchema = z.object({
  plan: planStepSchema,
  customer: subCustomerStepSchema,
  deliveryAddress: deliveryAddressStepSchema,
  agreement: agreementStepSchema,
});

export type PlanStepValues = z.infer<typeof planStepSchema>;
export type SubCustomerStepValues = z.infer<typeof subCustomerStepSchema>;
export type DeliveryAddressStepValues = z.infer<typeof deliveryAddressStepSchema>;
export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;
