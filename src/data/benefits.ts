export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    id: "waterless",
    title: "غسيل جاف بدون إهدار المياه",
    description: "نعتني بسيارتك بتقنيات جافة توفّر آلاف اللترات من المياه في كل غسلة.",
  },
  {
    id: "anywhere",
    title: "نصل إليك أينما كنت",
    description: "في المنزل أو العمل، يأتي فريقنا إلى موقعك في الوقت الذي يناسبك.",
  },
  {
    id: "team",
    title: "فريق متخصص ومدرب",
    description: "فنيون مدربون على أحدث أساليب العناية والتلميع الاحترافي.",
  },
  {
    id: "products",
    title: "منتجات عناية احترافية",
    description: "منتجات آمنة على الطلاء والأسطح، مختارة بعناية لأفضل نتيجة.",
  },
  {
    id: "booking",
    title: "حجز سريع وسهل",
    description: "احجز غسلتك في دقائق عبر الموقع أو التطبيق بخطوات واضحة.",
  },
  {
    id: "flexible",
    title: "خطط اشتراك مرنة",
    description: "باقات شهرية تناسب استخدامك وتحافظ على سيارتك دائماً في أفضل حال.",
  },
];
