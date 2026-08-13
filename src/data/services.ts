import type { Service } from "@/types/domain";

export const services: Service[] = [
  {
    id: "full",
    name: "الباقة المتكاملة",
    shortDescription:
      "عناية شاملة داخلية وخارجية بسيارتك، من الطلاء حتى أدق تفاصيل المقصورة.",
    startingPrice: 350,
    durationMinutes: 90,
    inclusions: [
      "تنظيف خارجي جاف وتلميع الطلاء",
      "تنظيف داخلي كامل للمقصورة",
      "عناية بالإطارات والجنوط",
      "تلميع التابلوه والأسطح",
    ],
    requiresPhotos: true,
    featured: true,
    image: "/images/services/full.jpg",
  },
  {
    id: "exterior",
    name: "التنظيف الخارجي",
    shortDescription:
      "غسيل جاف للهيكل الخارجي مع تلميع يعيد لمعان الطلاء دون خدش.",
    startingPrice: 200,
    durationMinutes: 45,
    inclusions: [
      "تنظيف الهيكل الخارجي بالكامل",
      "تلميع الطلاء بمنتجات احترافية",
      "عناية بالإطارات والجنوط",
    ],
    requiresPhotos: true,
    image: "/images/services/exterior.jpg",
  },
  {
    id: "interior",
    name: "التنظيف الداخلي",
    shortDescription:
      "تنظيف عميق للمقصورة والمقاعد والأسطح مع تعطير احترافي.",
    startingPrice: 180,
    durationMinutes: 50,
    inclusions: [
      "تنظيف المقاعد والأرضيات",
      "تلميع التابلوه والأسطح الداخلية",
      "تنظيف الزجاج من الداخل",
      "تعطير المقصورة",
    ],
    requiresPhotos: false,
    image: "/images/services/interior.jpg",
  },
  {
    id: "engine",
    name: "تنظيف المحرك",
    shortDescription:
      "تنظيف دقيق لحجرة المحرك بمنتجات آمنة تحافظ على مكوناتها.",
    startingPrice: 150,
    durationMinutes: 30,
    inclusions: [
      "إزالة الأتربة والزيوت من حجرة المحرك",
      "منتجات آمنة على المكونات الكهربائية",
      "تلميع الأسطح البلاستيكية",
    ],
    requiresPhotos: true,
    image: "/images/services/engine.jpg",
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
