import type { SubscriptionPlan } from "@/types/domain";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "الأساسية",
    monthlyPrice: 900,
    washesPerMonth: 4,
    includedServices: ["exterior"],
    benefits: ["حجز أسرع", "مواعيد مرنة", "أسعار ثابتة طوال الشهر"],
    validity: "شهر واحد",
    overLimitPrice: 180,
    terms: [
      "تُحتسب الغسلات خلال مدة صلاحية الاشتراك فقط.",
      "الغسلات غير المستخدمة لا تُرحّل للشهر التالي.",
    ],
  },
  {
    id: "plus",
    name: "المميزة",
    monthlyPrice: 1600,
    washesPerMonth: 8,
    includedServices: ["exterior", "interior"],
    benefits: [
      "أولوية في تحديد المواعيد",
      "تنظيف داخلي وخارجي",
      "خصم على الخدمات الإضافية",
    ],
    validity: "شهر واحد",
    overLimitPrice: 200,
    recommended: true,
    terms: [
      "تُحتسب الغسلات خلال مدة صلاحية الاشتراك فقط.",
      "عند تجاوز عدد الغسلات المتاحة يمكن إضافة غسلة برسوم إضافية واضحة.",
    ],
  },
  {
    id: "premium",
    name: "المتكاملة",
    monthlyPrice: 2600,
    washesPerMonth: 12,
    includedServices: ["full"],
    benefits: [
      "الباقة المتكاملة في كل زيارة",
      "أولوية قصوى في المواعيد",
      "مدير حساب مخصص",
    ],
    validity: "شهر واحد",
    overLimitPrice: 250,
    terms: [
      "تشمل الباقة المتكاملة في كل غسلة.",
      "عند تجاوز الحد يمكن الحجز برسوم إضافية واضحة قبل التأكيد.",
    ],
  },
];

export function getPlan(id: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find((p) => p.id === id);
}
